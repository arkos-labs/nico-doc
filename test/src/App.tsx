import { useState, useCallback } from 'react'
import { Controls } from '@/components/Controls'
import { Transcript } from '@/components/Transcript'
import { Suggestions } from '@/components/Suggestions'
import { SettingsPanel } from '@/components/SettingsPanel'
import { useAudioCapture } from '@/hooks/useAudioCapture'
import { useWhisper } from '@/hooks/useWhisper'
import { useOllama } from '@/hooks/useOllama'
import { useMeetingStore } from '@/store/meetingStore'

export default function App() {
  const [showSettings, setShowSettings] = useState(false)
  const { error, clearError, isModelReady, modelProgress } = useMeetingStore()

  const { generateSuggestions } = useOllama()
  
  const handleQuestion = useCallback(
    (question: string) => {
      const transcript = useMeetingStore.getState().transcript.join(' ')
      generateSuggestions(question, transcript)
    },
    [generateSuggestions]
  )

  const { sendAudioToWhisper } = useWhisper(handleQuestion)
  const { start: startCapture, stop: stopCapture } = useAudioCapture(sendAudioToWhisper)

  const handleStart = useCallback(async () => {
    await startCapture()
  }, [startCapture])

  const handleStop = useCallback(() => {
    stopCapture()
  }, [stopCapture])

  return (
    <div className="relative flex flex-col w-full h-full rounded-2xl overflow-hidden text-slate-100 select-none shadow-2xl"
         style={{
           background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.6))',
           boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
           backdropFilter: 'blur(20px)',
           WebkitBackdropFilter: 'blur(20px)'
         }}>
      
      {/* Glow effect at the top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-indigo-500/20 blur-xl rounded-full pointer-events-none" />

      {/* Header draggable */}
      <div
        className="flex items-center justify-between px-4 pt-3 pb-2 relative z-10"
        style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>
          </div>
          <span className="text-xs font-semibold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent tracking-wide">
            AI Copilot
          </span>
        </div>
        <button
          onClick={() => setShowSettings((v) => !v)}
          style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
          className="text-slate-400 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-all"
          title="Paramètres"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        </button>
      </div>

      <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent mx-4 opacity-50" />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col relative z-10">
        {showSettings ? (
          <SettingsPanel onClose={() => setShowSettings(false)} />
        ) : !isModelReady ? (
          <div className="flex flex-col items-center justify-center flex-1 p-6 space-y-4">
            <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
            <div className="text-center">
              <p className="text-xs font-semibold text-slate-300">Initialisation de l'IA vocale...</p>
              <p className="text-[10px] text-slate-500 mt-1">
                {modelProgress < 100 
                  ? `Téléchargement en cours : ${modelProgress}%` 
                  : `Installation du modèle (peut prendre 30s)...`}
              </p>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300 ease-out" 
                style={{ width: `${modelProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <>
            <Controls onStart={handleStart} onStop={handleStop} />
            <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent mx-4 opacity-30" />
            <Transcript />
            <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent mx-4 opacity-30" />
            <Suggestions />
          </>
        )}
      </div>

      {/* Bandeau d'erreur */}
      {error && (
        <div className="mx-3 mb-3 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-200 text-[11px] flex justify-between items-center gap-2 backdrop-blur-md shadow-lg">
          <span className="flex-1">{error}</span>
          <button onClick={clearError} className="p-1 rounded-md hover:bg-red-500/20 text-red-400 hover:text-red-200 transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      )}
      
      {/* Decorative gradient border outline */}
      <div className="absolute inset-0 border border-slate-700/50 rounded-2xl pointer-events-none" />
    </div>
  )
}
