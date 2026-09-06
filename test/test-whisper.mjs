import { pipeline, env } from '@huggingface/transformers'

env.backends.onnx.wasm.wasmPaths = undefined

async function test() {
  console.log('Initializing transcriber...')
  try {
    const transcriber = await pipeline('automatic-speech-recognition', 'onnx-community/whisper-base', {
      dtype: 'fp32'
    })
    console.log('Transcriber initialized!')
    
    // create dummy 1 second of silence 16kHz float32
    const dummyAudio = new Float32Array(16000)
    console.log('Transcribing dummy audio...')
    const res = await transcriber(dummyAudio, {
      language: 'fr',
      task: 'transcribe',
      without_timestamps: true
    })
    console.log('Result:', res)
  } catch(e) {
    console.error('Error:', e)
  }
}

test()
