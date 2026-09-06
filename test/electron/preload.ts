import { contextBridge, ipcRenderer } from 'electron'

// Types exposés au renderer
export interface ElectronAPI {
  toggleClickThrough: (enabled: boolean) => void
  resizeWindow: (size: { width: number; height: number }) => void
  hideWindow: () => void
  platform: string
}

contextBridge.exposeInMainWorld('electronAPI', {
  toggleClickThrough: (enabled: boolean) =>
    ipcRenderer.send('toggle-click-through', enabled),

  resizeWindow: (size: { width: number; height: number }) =>
    ipcRenderer.send('resize-window', size),

  hideWindow: () =>
    ipcRenderer.send('hide-window'),

  platform: process.platform,
})

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },
  
  // Whisper API
  initWhisper: () => ipcRenderer.send('init-whisper'),
  sendAudioChunk: (arrayBuffer: ArrayBuffer) => ipcRenderer.send('audio-chunk', arrayBuffer),
  onTranscriptionResult: (callback: (text: string) => void) => {
    ipcRenderer.on('transcription-result', (_, text) => callback(text))
  },
  onTranscriptionError: (callback: (error: string) => void) => {
    ipcRenderer.on('transcription-error', (_, error) => callback(error))
  },
  onTranscriptionProgress: (callback: (data: any) => void) => {
    ipcRenderer.on('transcription-progress', (_, data) => callback(data))
  }
})
