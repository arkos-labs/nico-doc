import { useEffect, useRef } from 'react'
import { useMeetingStore } from '@/store/meetingStore'

export function Transcript() {
  const transcript = useMeetingStore((s) => s.transcript)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll vers le bas
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [transcript])

  if (!transcript.length) {
    return (
      <div className="px-4 py-6 flex flex-col items-center justify-center opacity-50">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 mb-2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>
        <p className="text-[11px] text-slate-400 font-medium tracking-wide">
          En attente de voix...
        </p>
      </div>
    )
  }

  // Affiche les 3 dernières phrases
  const recent = transcript.slice(-3)

  return (
    <div className="px-4 py-3 space-y-1.5 max-h-[100px] overflow-y-auto scrollbar-none relative">
      {/* Soft gradient mask for fading out old text */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-[rgba(15,23,42,0.9)] to-transparent pointer-events-none z-10" />
      
      {recent.map((line, i) => {
        const isLast = i === recent.length - 1;
        return (
          <p
            key={i}
            className={`text-xs leading-relaxed transition-all duration-300 ${
              isLast 
                ? 'text-white font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' 
                : 'text-slate-400 opacity-70 blur-[0.3px]'
            }`}
          >
            {line}
          </p>
        )
      })}
      <div ref={bottomRef} />
    </div>
  )
}
