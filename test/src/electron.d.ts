interface ElectronAPI {
  toggleClickThrough: (enabled: boolean) => void
  resizeWindow: (size: { width: number; height: number }) => void
  hideWindow: () => void
  platform: string
}

declare interface Window {
  electronAPI: ElectronAPI
}
