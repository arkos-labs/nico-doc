import PublicHeader from "../../components/PublicHeader.jsx";
import PublicFooter from "../../components/PublicFooter.jsx";
import { ArrowUpRight, MousePointerClick, UserCheck, ShieldCheck, MapPin, Search, Clock, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    id: "01",
    title: "Expression du besoin",
    desc: "En quelques clics sur votre tableau de bord, définissez les points d'enlèvement et de livraison, le type de véhicule et le degré d'urgence.",
    details: "Notre interface intuitive mémorise vos adresses récurrentes et vos préférences de facturation pour une saisie en moins de 30 secondes.",
    icon: MousePointerClick
  },
  {
    id: "02",
    title: "Assignation d'élite",
    desc: "Notre algorithme de dispatch intelligent identifie instantanément le chauffeur le plus proche et le plus qualifié pour votre mission.",
    details: "Chaque chauffeur One Connexion est un professionnel chevronné, équipé des outils de tracking les plus performants et formé aux protocoles de sécurité.",
    icon: UserCheck
  },
  {
    id: "03",
    title: "Tracking & Livraison",
    desc: "Suivez votre coursier en temps réel sur une carte interactive et recevez des notifications à chaque étape clé.",
    details: "Dès la remise effectuée, vous recevez une preuve de livraison (POD) numérique avec signature, nom du réceptionnaire et photo si nécessaire.",
    icon: Search
  }
];

export default function Logistique() {
  return (
    <div className="min-h-screen bg-cream text-noir selection:bg-[#ed5518] selection:text-white">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-noir text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#ed5518]/10 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-8xl mb-8 leading-tight font-display">
              une logistique <br />
              <span className="italic text-[#ed5518]">sans friction</span>.
            </h1>
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-light">
              La technologie au service de l'excellence opérationnelle. Découvrez comment One Connexion simplifie vos flux de transport quotidiens.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 bg-cream">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
            {steps.map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="mb-8 flex items-baseline gap-4">
                  <span className="text-5xl font-display italic text-[#ed5518]/20 group-hover:text-[#ed5518]/100 transition-colors duration-500">{step.id}</span>
                  <step.icon className="text-[#ed5518]" size={32} />
                </div>
                <h2 className="text-3xl mb-6 font-display italic">{step.title}</h2>
                <p className="text-lg text-noir/90 font-medium mb-4">{step.desc}</p>
                <p className="text-noir/60 font-light leading-relaxed">{step.details}</p>
                
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/4 -right-10 w-20 h-px bg-noir/10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-noir text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <h2 className="text-4xl md:text-6xl font-display italic leading-tight">
                l'infrastructure <br /> du <span className="text-[#ed5518]">futur</span>.
              </h2>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#ed5518]">
                    <Smartphone size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Web App Responsive</h3>
                    <p className="text-white/60 font-light">Commandez depuis votre bureau ou en déplacement. Notre plateforme est optimisée pour tous vos terminaux.</p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#ed5518]">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Sécurité Certifiée</h3>
                    <p className="text-white/60 font-light">Vos données et vos marchandises sont protégées par les meilleurs protocoles de sécurité du marché.</p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#ed5518]">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Support 24/7</h3>
                    <p className="text-white/60 font-light">Une question ? Un imprévu ? Nos dispatchers sont disponibles en permanence pour vous assister.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-[#ed5518]/20 blur-[100px] rounded-full scale-75 animate-pulse" />
              <div className="relative bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 aspect-square flex flex-col justify-center">
                <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-white/40 uppercase tracking-widest text-xs font-bold">Statut en direct</span>
                    <span className="flex items-center gap-2 text-[#ed5518] text-xs font-bold uppercase tracking-widest">
                      <span className="w-2 h-2 rounded-full bg-[#ed5518] animate-ping" />
                      En cours
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-[#ed5518]" />
                    </div>
                    <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-white/40">
                      <span>Enlèvement</span>
                      <span>Transit</span>
                      <span>Livré</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="text-2xl font-display italic">12:45</div>
                      <div className="text-[10px] uppercase tracking-widest text-white/40 mt-1">Heure estimée</div>
                    </div>
                    <div>
                      <div className="text-2xl font-display italic">2.4 km</div>
                      <div className="text-[10px] uppercase tracking-widest text-white/40 mt-1">Distance</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-cream">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl md:text-6xl mb-12 font-display">prêt à simplifier vos envois ?</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <Link to="/inscription" className="btn-premium px-12 py-5 text-lg">
              Créer mon espace client
            </Link>
            <Link to="/contact" className="text-noir font-bold tracking-widest uppercase text-sm border-b border-noir pb-1 hover:text-[#ed5518] hover:border-[#ed5518] transition-all">
              Démo personnalisée
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
