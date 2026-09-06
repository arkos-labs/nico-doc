import PublicHeader from "../../components/PublicHeader.jsx";
import PublicFooter from "../../components/PublicFooter.jsx";
import { useState } from "react";
import { Minus, Plus, MessageCircle, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Général",
    faqs: [
      { q: "Quelles zones couvrez-vous ?", a: "Nous opérons principalement sur Paris et toute l'Île-de-France (75, 77, 78, 91, 92, 93, 94, 95). Pour des livraisons nationales ou internationales au départ de Paris, veuillez contacter notre service commercial." },
      { q: "Quels sont vos horaires d'intervention ?", a: "Nos coursiers interviennent 24h/24 et 7j/7. Pour les interventions de nuit, les week-ends et les jours fériés, il est recommandé de réserver à l'avance via votre interface client." },
      { q: "Quels types de véhicules proposez-vous ?", a: "Notre flotte comprend des vélos, des scooters, des voitures, des fourgonnettes (break, 6m3, 12m3) et des camions 20m3 avec hayon pour répondre à tous vos besoins de volume." }
    ]
  },
  {
    name: "Facturation & Tarifs",
    faqs: [
      { q: "Comment fonctionne la facturation ?", a: "Nous regroupons toutes vos interventions mensuelles dans une facture unique, claire et structurée au format Factur-X, envoyée en début de mois." },
      { q: "Existe-t-il des frais d'ouverture de compte ?", a: "Non, l'ouverture d'un compte One Connexion est totalement gratuite et sans engagement de volume minimum." },
      { q: "Comment sont calculés les prix ?", a: "Nos tarifs sont basés sur la distance entre les points, le type de véhicule sélectionné et le degré d'urgence (Normal, Urgent, Direct)." }
    ]
  },
  {
    name: "Sécurité & Assurance",
    faqs: [
      { q: "Quelles sont vos garanties d'assurance ?", a: "Chaque transport est couvert par notre assurance Responsabilité Civile Professionnelle. Pour vos marchandises de valeur, une assurance ad valorem est incluse jusqu'à 50 000€ par expédition." },
      { q: "Vos chauffeurs sont-ils formés ?", a: "Oui, chaque chauffeur suit un parcours d'intégration rigoureux portant sur les protocoles de sécurité, la courtoisie et les spécificités de nos clients (luxe, médical, juridique)." },
      { q: "Puis-je suivre ma livraison en temps réel ?", a: "Absolument. Dès que le chauffeur est en route, vous disposez d'un lien de tracking en temps réel avec position GPS et estimation précise de l'heure d'arrivée." }
    ]
  }
];

export default function FAQPage() {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="min-h-screen bg-cream text-noir selection:bg-[#ed5518] selection:text-white">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-noir text-white text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ed5518]/10 blur-[150px] rounded-full" />
        </div>

        <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
          <h1 className="text-5xl md:text-8xl mb-8 leading-tight font-display">
            centre d'<span className="italic text-[#ed5518]">aide</span>.
          </h1>
          <p className="text-xl text-white/70 leading-relaxed font-light max-w-2xl mx-auto">
            Retrouvez les réponses aux questions les plus fréquentes. Notre équipe reste à votre entière disposition pour tout complément d'information.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-24 bg-cream">
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-20">
            {categories.map((category, catIdx) => (
              <div key={catIdx}>
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#ed5518] mb-12 border-b border-noir/10 pb-4">{category.name}</h2>
                <div className="space-y-1">
                  {category.faqs.map((f, i) => {
                    const faqId = `${catIdx}-${i}`;
                    return (
                      <div key={i} className="border-b border-noir/5 py-8">
                        <button
                          onClick={() => setActiveFaq(activeFaq === faqId ? null : faqId)}
                          className="w-full flex items-center justify-between text-left group"
                        >
                          <span className="text-2xl font-display group-hover:text-[#ed5518] transition-colors">{f.q}</span>
                          <div className="flex-shrink-0 ml-4 transition-transform duration-300 group-hover:scale-110">
                            {activeFaq === faqId ? <Minus size={24} /> : <Plus size={24} />}
                          </div>
                        </button>
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeFaq === faqId ? 'max-h-96 mt-6' : 'max-h-0'}`}>
                          <p className="text-noir/70 text-lg leading-relaxed max-w-2xl font-light">
                            {f.a}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Contact */}
      <section className="py-24 bg-noir text-white">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="bg-white/5 border border-white/10 rounded-[40px] p-12 md:p-20 text-center">
            <h2 className="text-3xl md:text-5xl font-display italic mb-12">encore une <span className="text-[#ed5518]">question</span> ?</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#ed5518] flex items-center justify-center mx-auto mb-6">
                  <Phone size={20} />
                </div>
                <h3 className="font-bold uppercase tracking-widest text-xs">Appelez-nous</h3>
                <p className="text-white/60 font-light">01 89 71 34 22</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#ed5518] flex items-center justify-center mx-auto mb-6">
                  <Mail size={20} />
                </div>
                <h3 className="font-bold uppercase tracking-widest text-xs">Écrivez-nous</h3>
                <p className="text-white/60 font-light">contact@one-connexion.fr</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#ed5518] flex items-center justify-center mx-auto mb-6">
                  <MessageCircle size={20} />
                </div>
                <h3 className="font-bold uppercase tracking-widest text-xs">Chat Direct</h3>
                <p className="text-white/60 font-light">Disponible 24/7 sur l'App</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
