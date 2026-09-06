import { useEffect, useCallback } from 'react'
import { useMeetingStore } from '@/store/meetingStore'

// @ts-ignore
const ipc = window.ipcRenderer

export function useWhisper(onTranscript: (text: string) => void) {
  const { appendTranscript, setError, setModelReady, setModelProgress } = useMeetingStore()

  useEffect(() => {
    // Listeners IPC
    ipc.onTranscriptionProgress((data: any) => {
      console.log('[FRONTEND] Received transcription-progress:', data)
      if (data.status === 'progress') {
        setModelProgress(Math.round(data.progress))
      } else if (data.status === 'ready' || data.status === 'done') {
        console.log('[FRONTEND] Setting model ready to TRUE')
        setModelReady(true)
      }
    })

    ipc.onTranscriptionResult((text: string) => {
      // Ignorer les hallucinations courantes
      const lower = text.toLowerCase()
      if (
        lower.includes("sous-titres") ||
        lower.includes("amara.org") ||
        lower.length < 3
      ) {
        return
      }

      appendTranscript(text)
      onTranscript(text)
    })

    ipc.onTranscriptionError((err: string) => {
      console.error('[FRONTEND] Whisper Native Error:', err)
      setError(`Whisper Native Error: ${err}`)
    })

    // Demander l'initialisation du modèle natif
    console.log('[FRONTEND] Requesting initWhisper...')
    if (ipc.initWhisper) {
      ipc.initWhisper()
    } else {
      console.error('[FRONTEND] ipc.initWhisper is UNDEFINED!')
    }

    return () => {
      // Clean up si nécessaire
    }
  }, [appendTranscript, onTranscript, setError, setModelReady, setModelProgress])

  const sendAudioToWhisper = useCallback((audioData: Float32Array) => {
    // Send underlying ArrayBuffer to main process
    ipc.sendAudioChunk(audioData.buffer)
  }, [])

  return { sendAudioToWhisper }
}
