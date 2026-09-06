import { useState } from 'react'
import { useMeetingStore } from '@/store/meetingStore'

export function SettingsPanel({ onClose }: { onClose: () => void }) {
  const { apiKeys, meetingContext, setApiKeys, setMeetingContext } = useMeetingStore()
  const [groqKey, setGroqKey] = useState(apiKeys.groq)
  const [context, setContext] = useState(meetingContext)

  const save = () => {
    setApiKeys({ groq: groqKey })
    setMeetingContext(context)
    onClose()
  }

  return (
    <div className="px-5 py-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-2 mb-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Configuration</p>
      </div>

      <div className="space-y-3">
        <div className="space-y-1.5 relative group bg-indigo-900/20 p-3 rounded-lg border border-indigo-500/20">
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" /> Connecté à Ollama (Local)
          </label>
          <p className="text-xs text-slate-400 mt-1">
            Modèle configuré : <span className="font-mono text-indigo-300">llama3.1:8b-instruct-q4_K_M</span><br/>
            Les données restent 100% locales et privées.
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-indigo-400" /> Contexte de la réunion
          </label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Ex: Entretien d'embauche pour le poste de développeur React..."
            rows={3}
            className="w-full bg-slate-900/50 text-slate-200 text-xs rounded-lg px-3 py-2 outline-none border border-slate-700/50 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600 resize-none shadow-inner scrollbar-none"
          />
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          onClick={save}
          className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_20px_rgba(79,70,229,0.5)]"
        >
          Sauvegarder
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-slate-300 text-[11px] font-bold uppercase tracking-wider transition-all"
        >
          Annuler
        </button>
      </div>
    </div>
  )
}
