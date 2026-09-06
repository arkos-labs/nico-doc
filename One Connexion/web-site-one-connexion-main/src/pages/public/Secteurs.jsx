import PublicHeader from "../../components/PublicHeader.jsx";
import PublicFooter from "../../components/PublicFooter.jsx";
import { ArrowUpRight, Shield, Clock, Users, Zap, Briefcase, HeartPulse, Sparkles, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const secteurs = [
  {
    title: "Luxe & Fashion",
    icon: Sparkles,
    desc: "Mannequins, shooting, portants suspendus. Le soin absolu pour vos collections.",
    extended: "Des chauffeurs formés aux exigences de la haute couture. Chaque pièce est traitée avec le plus grand respect, des ateliers jusqu'aux boutiques.",
    features: ["Véhicules capitonnés", "Confidentialité absolue", "Livraison sur cintre", "Gestion des retours showrooms"],
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
    link: "/coursier-b2b-paris"
  },
  {
    title: "Juridique & Finance",
    icon: Building2,
    desc: "Discrétion totale et protocoles de remise sécurisés pour vos documents critiques.",
    extended: "Nous garantissons l'intégrité de vos plis confidentiels, contrats et actes notariés, remis exclusivement en main propre contre signature certifiée.",
    features: ["Remise en main propre", "Suivi temps réel", "Protocoles stricts", "Archivage numérique des preuves"],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop",
    link: "/coursier-juridique-paris"
  },
  {
    title: "Médical & Tech",
    icon: HeartPulse,
    desc: "Urgence vitale ou composants sensibles. Le transport maîtrisé sous contrainte.",
    extended: "Une logistique de précision répondant aux normes de sécurité, que ce soit pour des urgences biologiques ou la livraison de matériel high-tech délicat.",
    features: ["Haute urgence", "Matériel sécurisé", "Traçabilité", "Respect de la chaîne du froid (option)"],
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=2069&auto=format&fit=crop",
    link: "/coursier-dentiste-paris"
  },
  {
    title: "Event & Showroom",
    icon: Briefcase,
    desc: "Installation éphémère ou réassort express. Soyez prêt au moment M.",
    extended: "De la préparation de l'événement au démontage, nous synchronisons nos équipes pour assurer une fluidité logistique parfaite en coulisses.",
    features: ["Opérations sur site", "Manutention dédiée", "Flexibilité 24/7", "Coordination multi-sites"],
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop",
    link: "/coursier-evenementiel-paris"
  },
  {
    title: "Automobile & Industrie",
    icon: Zap,
    desc: "Pièces critiques ou documents d'immatriculation. Flux tendus maîtrisés.",
    extended: "Pour les concessions et garages, nous assurons l'approvisionnement ultra-rapide en pièces détachées et le transport sécurisé de documents administratifs.",
    features: ["Réaction flash pièces détachées", "Transport documents Cerfa", "Tournées inter-garages", "Livraison lourde/encombrante"],
    image: "https://images.unsplash.com/photo-1492144534655-ad79c964c9d7?auto=format&fit=crop&q=80",
    link: "/coursier-automobile-paris"
  },
  {
    title: "Optique & Santé",
    icon: Shield,
    desc: "Précision et soin pour vos dispositifs optiques et médicaux.",
    extended: "Nous accompagnons les opticiens et laboratoires dans le transfert quotidien de montures, verres et matériel de précision avec une manipulation experte.",
    features: ["Protection produits fragiles", "Navettes Labo-Boutique", "Urgence verres progressifs", "Livraison client final"],
    image: "https://images.unsplash.com/photo-1511556532299-8f660fc56cff?auto=format&fit=crop&q=80",
    link: "/coursier-opticien-paris"
  }
];

export default function Secteurs() {
  return (
    <div className="min-h-screen bg-cream text-noir selection:bg-[#ed5518] selection:text-white">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-noir text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#ed5518]/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-8xl mb-8 leading-tight font-display">
              centre expertises <br />
              <span className="italic text-[#ed5518]">sectorielles</span>.
            </h1>
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-light">
              Parce que chaque métier a ses propres codes et ses propres urgences, One Connexion déploie des protocoles logistiques sur-mesure pour les secteurs les plus exigeants.
            </p>
          </div>
        </div>
      </section>

      {/* Secteurs List */}
      <section className="py-24 bg-cream">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="space-y-32">
            {secteurs.map((secteur, idx) => (
              <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}>
                <div className="flex-1 space-y-8">
                  <div className="inline-flex items-center gap-3 text-[#ed5518]">
                    <secteur.icon size={32} />
                    <span className="font-bold uppercase tracking-[0.2em] text-sm">{secteur.title}</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-display italic leading-tight">{secteur.desc}</h2>
                  <p className="text-lg text-noir/70 leading-relaxed font-light">
                    {secteur.extended}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    {secteur.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ed5518]" />
                        <span className="text-sm font-medium uppercase tracking-wider text-noir/60">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-8">
                    <Link to={secteur.link} className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest border-b border-noir pb-2 hover:text-[#ed5518] hover:border-[#ed5518] transition-all">
                      Découvrir notre expertise {secteur.title} <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </div>
                
                <div className="flex-1 w-full lg:w-auto relative group">
                  <div className="absolute -inset-4 bg-[#ed5518]/5 rounded-[40px] blur-2xl transform rotate-3 transition-transform group-hover:rotate-6 duration-700"></div>
                  <div className="relative aspect-[4/5] md:aspect-video lg:aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl">
                    <img 
                      src={secteur.image} 
                      alt={secteur.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-noir/60 to-transparent opacity-60"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & CTA */}
      <section className="py-24 bg-noir text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl md:text-6xl mb-12 font-display">votre secteur n'est pas listé ?</h2>
          <p className="text-xl text-white/70 mb-16 font-light">
            Notre agilité nous permet de nous adapter à toutes les contraintes logistiques. Parlons de vos besoins spécifiques.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <Link to="/contact" className="btn-premium px-12 py-5 text-lg">
              Contacter un expert
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
