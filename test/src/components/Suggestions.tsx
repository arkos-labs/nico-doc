import { useMeetingStore } from '@/store/meetingStore'

export function Suggestions() {
  const { suggestions, loadingSuggestions } = useMeetingStore()

  if (loadingSuggestions) {
    return (
      <div className="px-4 py-3 space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">
            IA Réfléchit...
          </p>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-4 rounded-md bg-white/5 animate-pulse overflow-hidden relative" style={{ width: `${75 + (i%2) * 15}%` }}>
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
          </div>
        ))}
      </div>
    )
  }

  if (!suggestions.length) return null

  return (
    <div className="px-4 py-3 space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop stopColor="#8b5cf6" offset="0%" />
              <stop stopColor="#d946ef" offset="100%" />
            </linearGradient>
          </defs>
          <path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M4.93 4.93l2.83 2.83"></path><path d="M16.24 16.24l2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="M4.93 19.07l2.83-2.83"></path><path d="M16.24 7.76l2.83-2.83"></path>
        </svg>
        <p className="text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
          Réponses Suggérées
        </p>
      </div>
      
      <div className="space-y-2">
        {suggestions.map((s, i) => (
          <div
            key={i}
            className="group relative flex gap-2.5 items-start p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] hover:border-indigo-500/30 transition-all duration-300 cursor-pointer overflow-hidden"
            onClick={() => navigator.clipboard.writeText(s)}
            title="Cliquer pour copier"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-indigo-500/0 group-hover:via-indigo-500/5 transition-all duration-500" />
            <div className="flex items-center justify-center w-4 h-4 mt-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[9px] font-bold shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
              {i + 1}
            </div>
            <span className="text-[11px] text-slate-300 group-hover:text-white leading-relaxed z-10 transition-colors">
              {s}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
