import PublicHeader from "../../components/PublicHeader.jsx";
import PublicFooter from "../../components/PublicFooter.jsx";
import { ShieldCheck, Zap, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-cream text-noir selection:bg-[#ed5518] selection:text-white">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-noir text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#ed5518]/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10 text-center">
          <h1 className="text-5xl md:text-8xl mb-8 leading-tight font-display">
            redéfinir le <br />
            <span className="italic text-[#ed5518]">dernier kilomètre</span>.
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-white/70 leading-relaxed font-light">
            One Connexion n'est pas qu'une société de livraison. Nous sommes le partenaire technologique et logistique
            qui sécurise la croissance des entreprises parisiennes à travers un service de messagerie d'élite.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-cream relative">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ed5518]/20 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#ed5518]">
                Notre Mission
              </div>
              <h2 className="text-4xl md:text-6xl font-display italic leading-tight">
                L'exigence absolue <br /> au cœur du B2B.
              </h2>
              <p className="text-xl text-noir/70 leading-relaxed font-light">
                Fondée sur le constat que la logistique urbaine est souvent le maillon faible de la chaîne de valeur,
                One Connexion a été créée pour apporter la rigueur du secteur du luxe et du médical à l'ensemble du tissu économique parisien.
              </p>
              <div className="grid grid-cols-2 gap-12 pt-4">
                <div>
                  <div className="text-4xl font-display italic text-[#ed5518]">15 min</div>
                  <div className="text-[10px] font-bold text-noir/40 uppercase tracking-widest mt-2">Réponse Devis</div>
                </div>
                <div>
                  <div className="text-4xl font-display italic text-[#ed5518]">24/7</div>
                  <div className="text-[10px] font-bold text-noir/40 uppercase tracking-widest mt-2">Service Dispatch</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-10 bg-[#ed5518]/5 rounded-full blur-3xl animate-pulse" />
              <div className="relative rounded-[40px] bg-noir shadow-2xl border border-white/5 aspect-square flex flex-col items-center justify-center p-12 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ed5518]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                <div className="h-24 w-24 rounded-3xl bg-white/5 flex items-center justify-center text-[#ed5518] mb-8 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  <ShieldCheck size={48} />
                </div>
                <div className="text-center">
                  <p className="text-white font-bold uppercase tracking-[0.4em] text-[10px] mb-4">Exigence de service</p>
                  <p className="text-white/40 text-xs font-medium uppercase tracking-widest">Standard Certifié Paris / IDF</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-noir text-white">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-7xl font-display italic">nos valeurs.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Fiabilité Absolue",
                desc: "Parce que vos colis sont cruciaux pour votre activité, nous traitons chaque mission avec un soin chirurgical."
              },
              {
                icon: Zap,
                title: "Réactivité Record",
                desc: "Dans une économie en flux tendus, nous faisons de la vitesse notre standard de service."
              },
              {
                icon: Users,
                title: "Proximité Humaine",
                desc: "Une équipe dédiée à Paris pour vous accompagner, loin des centres d'appels délocalisés."
              }
            ].map((value, i) => (
              <div key={i} className="p-12 rounded-[40px] bg-white/5 border border-white/10 hover:border-[#ed5518]/50 transition-all duration-500 group">
                <div className="h-16 w-16 bg-[#ed5518]/10 rounded-2xl flex items-center justify-center text-[#ed5518] mb-8 group-hover:bg-[#ed5518] group-hover:text-white transition-all duration-500">
                  <value.icon size={32} />
                </div>
                <h3 className="text-2xl font-display italic text-white mb-4">{value.title}</h3>
                <p className="text-white/60 leading-relaxed font-light">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement */}
      <section className="py-32 bg-cream overflow-hidden relative border-t border-noir/5">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-4xl md:text-7xl font-display italic mb-12">votre logistique mérite <br /> <span className="text-[#ed5518]">l'excellence</span>.</h2>
          <p className="text-xl text-noir/60 mb-16 italic font-light">
            "Nous ne nous contentons pas de transporter des objets, nous livrons votre promesse à vos clients."
          </p>
          <div className="flex justify-center">
            <Link to="/inscription" className="btn-premium px-12 py-5 text-lg">
              Devenir Partenaire B2B
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}




