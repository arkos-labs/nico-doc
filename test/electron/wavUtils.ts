import fs from 'fs'

export function writeFloat32ToWav(float32Array: Float32Array, sampleRate: number, filePath: string) {
  // Convert Float32Array to Int16Array
  const int16Array = new Int16Array(float32Array.length)
  for (let i = 0; i < float32Array.length; i++) {
    let s = Math.max(-1, Math.min(1, float32Array[i]))
    int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7FFF
  }

  // Create WAV header
  const buffer = Buffer.alloc(44 + int16Array.byteLength)
  let offset = 0

  const writeString = (str: string) => {
    for (let i = 0; i < str.length; i++) {
      buffer.writeUInt8(str.charCodeAt(i), offset++)
    }
  }

  writeString('RIFF')
  buffer.writeUInt32LE(36 + int16Array.byteLength, offset)
  offset += 4
  writeString('WAVE')
  writeString('fmt ')
  buffer.writeUInt32LE(16, offset)
  offset += 4
  buffer.writeUInt16LE(1, offset) // PCM
  offset += 2
  buffer.writeUInt16LE(1, offset) // Channels (Mono)
  offset += 2
  buffer.writeUInt32LE(sampleRate, offset)
  offset += 4
  buffer.writeUInt32LE(sampleRate * 2, offset) // Byte rate
  offset += 4
  buffer.writeUInt16LE(2, offset) // Block align
  offset += 2
  buffer.writeUInt16LE(16, offset) // Bits per sample
  offset += 2
  writeString('data')
  buffer.writeUInt32LE(int16Array.byteLength, offset)
  offset += 4

  // Write PCM data
  for (let i = 0; i < int16Array.length; i++) {
    buffer.writeInt16LE(int16Array[i], offset)
    offset += 2
  }

  fs.writeFileSync(filePath, buffer)
}
