import React from 'react'

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
      
      {/* Animated Glowing blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      {/* Navigation */}
      <nav className="relative z-10 container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">AI Copilot</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">Fonctionnalités</a>
          <a href="#pricing" className="hover:text-white transition-colors">Tarifs</a>
          <button className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">Connexion</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-8">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          Votre arme secrète en direct
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
          Le Copilote IA pour vos <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-rose-400 text-glow">
            Entretiens & Ventes.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          Une application discrète qui écoute vos réunions en temps réel et vous souffle les meilleures réponses à l'écran. Décrochez le job de vos rêves ou signez plus de clients.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <button className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] transition-all">
            Télécharger pour Windows
          </button>
          <button className="px-8 py-4 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-lg transition-all">
            Télécharger pour Mac
          </button>
        </div>

        {/* Mockup */}
        <div className="relative w-full max-w-4xl rounded-2xl border border-slate-800 bg-slate-900/50 p-2 shadow-2xl backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] to-transparent bottom-0 h-1/2 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop" 
            alt="Vidéo conférence" 
            className="w-full h-[500px] object-cover rounded-xl opacity-60"
          />
          {/* Fausse UI flottante */}
          <div className="absolute top-20 right-10 w-80 rounded-xl border border-indigo-500/30 bg-slate-900/80 backdrop-blur-md shadow-2xl z-20 overflow-hidden">
            <div className="px-4 py-2 bg-indigo-500/10 border-b border-indigo-500/20 text-xs font-bold text-indigo-400 flex items-center justify-between">
              🎙 AI Copilot
              <span className="text-[10px] text-emerald-400 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"/> LIVE</span>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-xs text-slate-400 italic">"C'est un peu au-dessus de notre budget..."</p>
              <div className="space-y-2">
                <div className="p-2 rounded bg-indigo-500/20 border border-indigo-500/30 text-indigo-100 text-xs shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                  💡 1. Mettez en avant le retour sur investissement (ROI).
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10 text-slate-300 text-xs">
                  💡 2. Proposez d'enlever une fonctionnalité pour réduire le prix.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features */}
      <section id="features" className="relative z-10 bg-slate-900/30 border-y border-slate-800 py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Conçu pour la performance.</h2>
            <p className="text-slate-400">Aucun bot n'entre dans la réunion. C'est 100% privé.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Temps réel absolu</h3>
              <p className="text-slate-400 text-sm">Alimenté par Groq et Deepgram, l'IA vous répond en moins de 500ms.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
              <div className="w-12 h-12 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2">Indétectable</h3>
              <p className="text-slate-400 text-sm">L'application tourne sur votre ordinateur. Personne d'autre ne la voit.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
              <div className="w-12 h-12 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400 mb-4">🌐</div>
              <h3 className="text-xl font-bold mb-2">Universel</h3>
              <p className="text-slate-400 text-sm">Fonctionne avec Zoom, Google Meet, Teams, Discord, etc.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 text-center text-slate-500 text-sm">
        <p>© 2026 AI Meeting Copilot. Tous droits réservés.</p>
      </footer>
    </div>
  )
}
