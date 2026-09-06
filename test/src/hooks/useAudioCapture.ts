import { useRef, useCallback } from 'react'
import { useMeetingStore } from '@/store/meetingStore'

export function useAudioCapture(onAudioChunk: (chunk: Float32Array) => void) {
  const audioContextRef = useRef<AudioContext | null>(null)
  const processorRef = useRef<ScriptProcessorNode | null>(null)
  const bufferRef = useRef<Float32Array>(new Float32Array(0))
  const setError = useMeetingStore((s) => s.setError)

  const start = useCallback(async () => {
    try {
      const micStream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, sampleRate: 16000 },
        video: false,
      })

      let systemStream: MediaStream | null = null
      try {
        systemStream = await navigator.mediaDevices.getDisplayMedia({
          audio: true,
          video: false,
        } as DisplayMediaStreamOptions)
        systemStream.getVideoTracks().forEach((t) => t.stop())
      } catch {
        console.warn('Audio système non disponible')
      }

      const audioCtx = new window.AudioContext({ sampleRate: 16000 })
      audioContextRef.current = audioCtx
      
      const destination = audioCtx.createMediaStreamDestination()
      
      const micSource = audioCtx.createMediaStreamSource(micStream)
      micSource.connect(destination)

      if (systemStream && systemStream.getAudioTracks().length > 0) {
        const sysSource = audioCtx.createMediaStreamSource(systemStream)
        sysSource.connect(destination)
      }

      // Process raw audio
      const processor = audioCtx.createScriptProcessor(4096, 1, 1)
      processorRef.current = processor
      
      const source = audioCtx.createMediaStreamSource(destination.stream)
      source.connect(processor)
      processor.connect(audioCtx.destination)

      const CHUNK_SIZE = 16000 * 5 // 5 seconds at 16kHz
      
      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0)
        
        // Append to buffer
        const newBuffer = new Float32Array(bufferRef.current.length + inputData.length)
        newBuffer.set(bufferRef.current)
        newBuffer.set(inputData, bufferRef.current.length)
        bufferRef.current = newBuffer

        // If we have enough data (5 seconds), send it and clear buffer
        if (bufferRef.current.length >= CHUNK_SIZE) {
          // Calculate RMS volume to detect silence
          let sumSquares = 0
          for (let i = 0; i < bufferRef.current.length; i++) {
            sumSquares += bufferRef.current[i] * bufferRef.current[i]
          }
          const rms = Math.sqrt(sumSquares / bufferRef.current.length)

          // Only send if volume is above a threshold (ignore silence/static)
          if (rms > 0.005) {
            onAudioChunk(new Float32Array(bufferRef.current))
          }
          
          bufferRef.current = new Float32Array(0)
        }
      }

    } catch (err) {
      setError(`Erreur capture audio : ${(err as Error).message}`)
    }
  }, [onAudioChunk, setError])

  const stop = useCallback(() => {
    processorRef.current?.disconnect()
    processorRef.current = null
    audioContextRef.current?.close()
    audioContextRef.current = null
    bufferRef.current = new Float32Array(0)
  }, [])

  return { start, stop }
}
