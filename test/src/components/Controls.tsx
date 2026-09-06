import { useMeetingStore } from '@/store/meetingStore'

interface ControlsProps {
  onStart: () => void
  onStop: () => void
}

export function Controls({ onStart, onStop }: ControlsProps) {
  const { isListening, isClickThrough, setClickThrough } = useMeetingStore()

  const handleToggleClickThrough = () => {
    const next = !isClickThrough
    setClickThrough(next)
    window.electronAPI?.toggleClickThrough(next)
  }

  return (
    <div className="flex items-center gap-3 px-4 py-3">
      {/* Bouton start / stop */}
      {!isListening ? (
        <button
          onClick={onStart}
          className="group relative flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(79,70,229,0.4)] hover:shadow-[0_0_20px_rgba(79,70,229,0.6)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          Démarrer
        </button>
      ) : (
        <button
          onClick={onStop}
          className="group relative flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(225,29,72,0.4)] hover:shadow-[0_0_20px_rgba(225,29,72,0.6)]"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          Arrêter
        </button>
      )}

      {/* Indicateur live */}
      <div className="flex items-center gap-1.5">
        <div className={`w-1.5 h-1.5 rounded-full ${isListening ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-slate-600'}`} />
        <span className={`text-[10px] font-bold tracking-widest uppercase ${isListening ? 'text-emerald-400' : 'text-slate-500'}`}>
          {isListening ? 'En Direct' : 'En Pause'}
        </span>
      </div>

      <div className="flex-1" />

      {/* Toggle click-through */}
      <button
        onClick={handleToggleClickThrough}
        title={isClickThrough ? 'Réactiver les clics' : 'Mode fantôme (pass-through)'}
        className={`flex items-center justify-center p-1.5 rounded-lg transition-all ${isClickThrough ? 'bg-indigo-500/20 text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.2)]' : 'hover:bg-white/10 text-slate-400 hover:text-white'}`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
      </button>

      {/* Fermer */}
      <button
        onClick={() => window.electronAPI?.hideWindow()}
        className="flex items-center justify-center p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        title="Masquer l'interface"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
      </button>
    </div>
  )
}
