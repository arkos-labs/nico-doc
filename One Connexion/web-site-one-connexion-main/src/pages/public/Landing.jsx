import { Link } from "react-router-dom";
import PublicHeader from "../../components/PublicHeader.jsx";
import PublicFooter from "../../components/PublicFooter.jsx";
import Hero3D from "../../components/home/Hero3D.jsx";
import { ArrowUpRight, Check, Minus, Plus, ShieldCheck, Zap, Globe, Package, User } from "lucide-react";
import { useState } from "react";

const trustLogos = [
  "Maison R", "Atelier 9", "Studio V", "L'Artisan Paris", "Galerie 75"
];

const processes = [
  {
    id: "01",
    title: "Expression du besoin",
    desc: "Plis, colis ou tournées régulières. Votre demande est enregistrée en 30 secondes."
  },
  {
    id: "02",
    title: "Assignation d'élite",
    desc: "Un chauffeur qualifié, formé aux standards du luxe, prend en charge votre mission."
  },
  {
    id: "03",
    title: "Validation sécurisée",
    desc: "Preuve de livraison interactive et rapport détaillé disponible à l'instant même."
  },
];

const stats = [
  { value: "45min", label: "Temps moyen d'enlèvement" },
  { value: "99.8%", label: "Taux de réussite opérationnelle" },
  { value: "24/7", label: "Disponibilité du dispatch" },
  { value: "0", label: "Engagement de volume" },
];

const faqs = [
  { q: "Comment fonctionne la facturation ?", a: "Nous regroupons toutes vos interventions mensuelles dans une facture unique, claire et structurée au format Factur-X, simplifiant ainsi votre gestion administrative." },
  { q: "Quelles zones couvrez-vous ?", a: "Nous opérons principalement sur Paris et toute l'Île-de-France, avec des solutions de transport nationales disponibles sur demande spécifique." },
  { q: "Vos chauffeurs sont-ils formés ?", a: "Oui, chaque opérateur subit une formation rigoureuse sur les protocoles de sécurité, la courtoisie et les spécificités des secteurs sensibles (luxe, médical, juridique)." },
  { q: "Quelle est la valeur d'assurance ?", a: "Chaque transport est couvert par notre assurance ad valorem incluse, protégeant vos marchandises jusqu'à 50 000€ par expédition." },
];


export default function Landing() {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="bg-cream text-noir min-h-screen selection:bg-[#ed5518] selection:text-white font-body">
      <PublicHeader />

      {/* Hero */}
      <Hero3D />

      {/* Trust Bar */}
      <section className="bg-cream py-12 border-b border-noir/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            {trustLogos.map((logo) => (
              <span key={logo} className="text-xl md:text-2xl font-display italic tracking-widest">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Excellence Section */}
      <section className="py-24 md:py-40 bg-cream">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center">
            <div className="space-y-10 text-center max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-8xl font-display leading-none text-noir">
                l'exigence <br />
                <span className="italic text-[#ed5518]">comme standard</span>.
              </h2>
              <p className="text-xl md:text-2xl text-noir/70 leading-relaxed font-light mx-auto">
                One Connexion n'est pas un simple service de coursier. Nous sommes le prolongement de votre promesse client. Pour les marques où chaque détail compte, notre logistique devient un véritable levier de différenciation.
              </p>
              <div className="flex flex-col md:flex-row justify-center items-center gap-12 pt-8">
                <div className="flex items-center gap-4 text-noir font-bold uppercase tracking-widest text-xs">
                  <div className="h-10 w-10 rounded-full bg-[#ed5518]/10 flex items-center justify-center text-[#ed5518]">
                    <ShieldCheck size={20} />
                  </div>
                  Assurance Ad Valorem incluse
                </div>
                <div className="flex items-center gap-4 text-noir font-bold uppercase tracking-widest text-xs">
                  <div className="h-10 w-10 rounded-full bg-[#ed5518]/10 flex items-center justify-center text-[#ed5518]">
                    <Globe size={20} />
                  </div>
                  Flotte multi-véhicules éco-responsable
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-40 bg-noir text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-24 text-center">
            <h2 className="text-5xl md:text-8xl font-display leading-none mb-4">
              trois gestes, <br />
              <span className="italic text-[#ed5518]">zéro friction</span>.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
            {processes.map((step, i) => (
              <div key={i} className="space-y-8 group">
                <div className="text-6xl md:text-8xl font-display italic text-white/5 group-hover:text-[#ed5518]/20 transition-colors duration-500">Étape {step.id}</div>
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-display italic">{step.title}</h3>
                  <p className="text-white/60 text-lg leading-relaxed font-light">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Section - High-End Bento Grid */}
      <section className="py-24 md:py-48 bg-cream border-t border-noir/5 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ed5518]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-noir/[0.02] blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto mb-32">
            <div className="flex items-center gap-6 mb-8 animate-in fade-in slide-in-from-left duration-700">
               <div className="h-[1px] w-12 bg-[#ed5518]"></div>
               <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#ed5518]">Écosystème d'Excellence</span>
            </div>
            <h2 className="text-6xl md:text-[9rem] text-noir leading-[0.85] font-display animate-in fade-in slide-in-from-bottom duration-1000">
              un partenaire <br />
              <span className="italic text-[#ed5518]">qui pense</span> <br />
              comme votre marque.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-8 min-h-[900px]">
            {/* LUXE - Big Card (Span 4x1) */}
            <div className="md:col-span-4 md:row-span-1 group relative p-12 md:p-16 rounded-[3rem] bg-white border border-noir/5 overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-[#ed5518]/5">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#ed5518]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="space-y-8">
                  <div className="h-16 w-16 rounded-2xl bg-cream flex items-center justify-center border border-noir/5 group-hover:rotate-6 transition-transform">
                    <Globe className="text-[#ed5518]" size={32} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl md:text-5xl font-display italic text-noir">Luxe & Fashion</h3>
                    <p className="text-xl text-noir/80 leading-relaxed font-semibold max-w-xl">
                      Mannequins, shooting, portants suspendus. Le soin absolu pour vos collections.
                    </p>
                  </div>
                </div>
                <div className="mt-12 flex flex-wrap gap-4">
                  {["Véhicules capitonnés", "Confidentialité absolue", "Livraison sur cintre"].map(t => (
                    <span key={t} className="px-5 py-2 rounded-full bg-cream/50 text-[9px] font-bold uppercase tracking-widest text-noir/40">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* JURIDIQUE - Small Card (Span 2x1) */}
            <div className="md:col-span-2 md:row-span-1 group relative p-12 rounded-[3rem] bg-noir text-white overflow-hidden transition-all duration-700 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ed5518]/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="space-y-6">
                  <ShieldCheck className="text-[#ed5518]" size={40} />
                  <h3 className="text-3xl font-display italic">Juridique & Finance</h3>
                  <p className="text-sm text-white/60 leading-relaxed font-light line-clamp-3">
                    Discrétion totale et protocoles de remise sécurisés pour vos documents critiques.
                  </p>
                </div>
                <Link to="/contact" className="mt-10 h-12 w-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#ed5518] hover:border-[#ed5518] transition-all">
                  <ArrowUpRight size={20} />
                </Link>
              </div>
            </div>

            {/* MEDICAL - Medium Card (Span 3x1) */}
            <div className="md:col-span-3 md:row-span-1 group relative p-12 rounded-[3rem] bg-white border border-noir/5 overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/5">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/p6.png')] opacity-[0.03] pointer-events-none"></div>
              <div className="relative z-10 space-y-8">
                <Zap className="text-[#ed5518]" size={36} />
                <div className="space-y-4">
                  <h3 className="text-3xl md:text-4xl font-display italic text-noir">Médical & Tech</h3>
                  <p className="text-lg text-noir/70 leading-relaxed font-medium">
                    Urgence vitale ou composants sensibles. Le transport maîtrisé sous contrainte.
                  </p>
                </div>
                <div className="flex gap-2">
                  {["Haute urgence", "Traçabilité"].map(t => (
                    <span key={t} className="px-3 py-1.5 rounded-lg border border-noir/5 text-[8px] font-bold uppercase tracking-widest text-noir/30">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* EVENT - Medium Card (Span 3x1) */}
            <div className="md:col-span-3 md:row-span-1 group relative p-12 rounded-[3rem] bg-[#ed5518]/5 border border-[#ed5518]/10 overflow-hidden transition-all duration-700 hover:bg-[#ed5518]/10">
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                        <ArrowUpRight className="text-[#ed5518]" size={24} />
                     </div>
                     <h3 className="text-3xl md:text-4xl font-display italic text-noir">Event & Showroom</h3>
                  </div>
                  <p className="text-lg text-noir/80 leading-relaxed font-medium">
                    Installation éphémère ou réassort express. Soyez prêt au moment M.
                  </p>
                  <p className="text-sm text-noir/50 leading-relaxed font-light max-w-md">
                    De la préparation de l'événement au démontage, nous synchronisons nos équipes.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-3">
                   <div className="px-4 py-2 rounded-full bg-noir text-white text-[9px] font-bold uppercase tracking-[0.2em]">Flexibilité 24/7</div>
                   <div className="px-4 py-2 rounded-full bg-white text-noir text-[9px] font-bold uppercase tracking-[0.2em] border border-noir/5">Opérations sur site</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 md:py-40 bg-noir text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl mb-6 text-white leading-tight font-display italic">la performance, mesurée.</h2>
            <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-bold">L'excellence opérationnelle au service de votre image</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 border-t border-white/10 pt-20">
            {stats.map((s, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl md:text-7xl font-display italic text-[#ed5518] mb-4">{s.value}</div>
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-40 bg-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto mb-24 text-center">
            <h2 className="text-5xl md:text-7xl text-noir mb-6 font-display italic">on vous <br /> <span className="text-[#ed5518]">répond</span>.</h2>
            <p className="text-noir/60 text-lg font-light">Tout ce qu'il faut savoir pour démarrer une collaboration fluide.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-noir/10 pb-6 pt-6">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <span className="text-xl md:text-2xl font-display italic group-hover:text-[#ed5518] transition-colors">{faq.q}</span>
                  {activeFaq === idx ? <Minus size={20} /> : <Plus size={20} />}
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${activeFaq === idx ? 'max-h-40 mt-6' : 'max-h-0'}`}>
                  <p className="text-noir/60 leading-relaxed font-light">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-cream py-32 md:py-48 text-center relative overflow-hidden border-t border-noir/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ed5518]/5 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-6xl md:text-9xl text-noir mb-12 font-display leading-none">
            faisons <br /> <span className="italic text-[#ed5518]">connaissance</span>.
          </h2>
          <p className="text-noir/80 text-xl md:text-2xl mb-16 max-w-2xl mx-auto font-light leading-relaxed">
            Établissons ensemble le standard d'excellence de vos prochaines livraisons. Nos experts sont à votre disposition pour concevoir une solution sur-mesure.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10">
            <Link to="/inscription" className="btn-premium px-12 py-5 text-lg shadow-xl shadow-orange-500/20">
              Ouvrir un compte
            </Link>
            <Link to="/contact" className="text-noir font-bold tracking-widest uppercase text-sm border-b border-noir/80 hover:border-[#ed5518] transition-colors pb-1">
              Parlons logistique
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
