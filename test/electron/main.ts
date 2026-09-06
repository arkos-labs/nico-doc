import { app, BrowserWindow, ipcMain, screen, Menu, Tray, nativeImage } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

const isDev = process.env.NODE_ENV === 'development'

let mainWindow: BrowserWindow | null = null
let tray: Tray | null = null
let isClickThrough = false

function createOverlayWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  mainWindow = new BrowserWindow({
    // Taille initiale de l'overlay
    width: 440,
    height: 320,
    x: width - 460,
    y: height - 360,

    // Overlay transparent always-on-top
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: false,
    resizable: true,
    hasShadow: false,
    roundedCorners: true,

    // Sécurité Electron
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false, // requis pour getUserMedia / getDisplayMedia
      webSecurity: true,
    },
  })

  // Passe au-dessus de Meet, Zoom, Teams (niveau OS)
  mainWindow.setAlwaysOnTop(true, 'screen-saver')
  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })

  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL)
    // DevTools détaché pour voir les erreurs React
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  } else {
    mainWindow.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function createTray() {
  // Icône système tray (fallback image vide si pas d'icône)
  const icon = nativeImage.createEmpty()
  tray = new Tray(icon)
  tray.setToolTip('AI Meeting Copilot')

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Afficher / Masquer',
      click: () => {
        if (mainWindow?.isVisible()) {
          mainWindow.hide()
        } else {
          mainWindow?.show()
        }
      },
    },
    {
      label: 'Mode click-through',
      type: 'checkbox',
      checked: false,
      click: (item) => {
        isClickThrough = item.checked
        mainWindow?.setIgnoreMouseEvents(isClickThrough, { forward: true })
      },
    },
    { type: 'separator' },
    {
      label: 'Quitter',
      click: () => app.quit(),
    },
  ])

  tray.setContextMenu(contextMenu)
}

// ─── IPC Handlers ─────────────────────────────────────────────────────────────

// Toggle click-through (l'overlay devient invisible aux clics)
ipcMain.on('toggle-click-through', (_event, enabled: boolean) => {
  isClickThrough = enabled
  mainWindow?.setIgnoreMouseEvents(enabled, { forward: true })
})

// Resize dynamique selon le contenu (collapsed / expanded)
ipcMain.on('resize-window', (_event, { width, height }: { width: number; height: number }) => {
  if (mainWindow) {
    mainWindow.setSize(width, height, true)
  }
})

// Minimiser dans le tray
ipcMain.on('hide-window', () => {
  mainWindow?.hide()
})


// ─── Whisper ONNX Runtime Node ────────────────────────────────────────────────
let transcriber: any = null
let initPromise: Promise<any> | null = null

async function initTranscriber() {
  if (transcriber) return transcriber
  if (initPromise) return initPromise

  initPromise = (async () => {
    try {
      console.log('[BACKEND] Importing transformers...')
      // Import dynamically to avoid breaking the startup if not compiled yet
      const { pipeline, env } = await import('@huggingface/transformers')
      console.log('[BACKEND] Transformers imported successfully.')
      
      // Set ONNX backend to node
      env.backends.onnx.wasm.wasmPaths = undefined // Disable WASM
      
      console.log('[BACKEND] Creating pipeline...')
      const t = await pipeline('automatic-speech-recognition', 'onnx-community/whisper-base', {
        dtype: 'fp32',
        progress_callback: (data: any) => {
          if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send('transcription-progress', data)
          }
        }
      })
      console.log('[BACKEND] Pipeline created successfully.')
      
      transcriber = t
      return t
    } catch (err) {
      console.error('[BACKEND] Error in initPromise:', err)
      throw err
    }
  })()
  
  return initPromise
}

ipcMain.on('audio-chunk', async (event, arrayBuffer) => {
  if (!arrayBuffer) return
  try {
    const float32Array = new Float32Array(arrayBuffer)
    const t = await initTranscriber()
    
    const result = await t(float32Array, {
      language: 'fr',
      task: 'transcribe',
      without_timestamps: true,
    })
    
    if (result && result.text) {
      const text = result.text.trim()
      if (text.length > 0) {
        event.reply('transcription-result', text)
      }
    }
  } catch (err: any) {
    console.error('Whisper Native Error:', err)
    event.reply('transcription-error', err.message || err.toString())
  }
})

ipcMain.on('init-whisper', async (event) => {
  console.log('[BACKEND] Received init-whisper request from frontend')
  try {
    console.log('[BACKEND] Starting initTranscriber...')
    await initTranscriber()
    console.log('[BACKEND] initTranscriber finished. Sending ready event to frontend.')
    event.reply('transcription-progress', { status: 'ready' })
  } catch (err: any) {
    console.error('Whisper Native Init Error:', err)
    event.reply('transcription-error', err.message || err.toString())
  }
})

// ─── App lifecycle ─────────────────────────────────────────────────────────────

app.whenReady().then(() => {
  // Permissions getUserMedia / getDisplayMedia pour la capture audio
  app.commandLine.appendSwitch('enable-features', 'WebRTCPipeWireCapturer')

  createOverlayWindow()
  createTray()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createOverlayWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// Autoriser getUserMedia dans le renderer
app.on('web-contents-created', (_event, contents) => {
  contents.session.setPermissionRequestHandler((_webContents, permission, callback) => {
    const allowedPermissions = ['media', 'audioCapture', 'videoCapture', 'displayCapture']
    if (allowedPermissions.includes(permission)) {
      callback(true)
    } else {
      callback(false)
    }
  })
})
