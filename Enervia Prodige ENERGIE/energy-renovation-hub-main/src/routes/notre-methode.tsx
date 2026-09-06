import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calculator, ClipboardList, FileCheck2, HardHat, ShieldCheck, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/site/Layout";

const title = "Notre méthode de rénovation énergétique — ENERVIA";
const description = "Découvrez notre approche rigoureuse et transparente pour garantir la réussite de votre rénovation énergétique de A à Z.";

export const Route = createFileRoute("/notre-methode")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${BASE_URL}/notre-methode` },
      { property: "og:image", content: `${BASE_URL}/og-default.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/notre-methode` }],
  }),
  component: NotreMethodePage,
});

const steps = [
  {
    number: "01",
    icon: Calculator,
    title: "Évaluation & Simulation",
    text: "Tout commence par une étude approfondie de votre situation. Nous analysons les caractéristiques de votre logement et vos besoins pour vous proposer une première simulation financière claire et réaliste.",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Audit & Visite Technique",
    text: "Un expert se déplace chez vous pour valider la faisabilité technique. Si nécessaire, un audit énergétique réglementaire est réalisé pour vous ouvrir l'accès aux meilleures subventions (rénovation globale).",
  },
  {
    number: "03",
    icon: FileCheck2,
    title: "Montage Financier & Aides",
    text: "Fini le casse-tête administratif ! Nous nous occupons de monter et déposer vos dossiers d'aides (MaPrimeRénov', CEE, Éco-PTZ) pour figer votre enveloppe avant la signature du moindre devis.",
  },
  {
    number: "04",
    icon: HardHat,
    title: "Réalisation des Travaux",
    text: "Vos travaux sont exécutés par notre réseau d'artisans locaux, rigoureusement sélectionnés et 100% certifiés RGE. Nous coordonnons l'ensemble et veillons au respect strict des normes de qualité.",
  },
  {
    number: "05",
    icon: ShieldCheck,
    title: "Réception & Garanties",
    text: "À la fin du chantier, nous contrôlons avec vous la conformité de chaque installation. Vous bénéficiez d'un suivi sur le long terme et de toutes les garanties décennales pour une tranquillité absolue.",
  },
];

const engagements = [
  "Transparence totale : aucun frais caché ni mauvaise surprise.",
  "Un seul interlocuteur dédié du début à la fin de votre projet.",
  "Artisans 100% locaux et certifiés RGE (Reconnu Garant de l'Environnement).",
  "Gestion complète des démarches administratives à votre place.",
];

function NotreMethodePage() {
  return (
    <PageShell>
      <article>
        {/* ── HERO ── */}
        <header className="bg-[#111814] text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
            <div className="mx-auto max-w-4xl text-center motion-safe:animate-[reveal-up_.8s_ease-out_both]">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d9a66e]">
                Notre philosophie
              </p>
              <h1 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.04em] text-white">
                De l'idée à la réalisation : <br/>
                <span className="text-white/60">l'exigence à chaque étape.</span>
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                Parce qu'une rénovation énergétique est un projet de vie engageant, nous avons conçu 
                une approche rigoureuse, totalement transparente et sans mauvaise surprise pour 
                garantir votre confort thermique durable.
              </p>
            </div>
          </div>
        </header>

        {/* ── TIMELINE (PROCESS) ── */}
        <section className="bg-[#f4f1ea] py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl font-medium tracking-[-0.035em] text-[#17221c] sm:text-5xl">
                Un accompagnement de A à Z.
              </h2>
              <p className="mt-6 text-base leading-8 text-[#5e6b63]">
                Notre méthode ne laisse rien au hasard. Nous vous guidons à travers un processus 
                structuré en 5 étapes clés, conçu pour maximiser vos aides et assurer une qualité 
                d'exécution irréprochable.
              </p>
            </div>

            <div className="mt-20">
              {steps.map((step, index) => (
                <div 
                  key={step.number} 
                  className="relative grid gap-8 border-t border-[#d2ccc1] py-12 sm:grid-cols-[1fr_2fr] lg:gap-16 lg:py-16"
                >
                  <div className="flex items-start gap-6">
                    <span className="font-display text-6xl font-medium text-[#c4b9a3]">
                      {step.number}
                    </span>
                    <div className="mt-2 flex size-14 items-center justify-center rounded-full bg-[#17221c] text-[#d9a66e]">
                      <step.icon className="size-6 stroke-[1.5]" aria-hidden />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-3xl font-medium text-[#17221c]">
                      {step.title}
                    </h3>
                    <p className="mt-5 max-w-2xl text-base leading-8 text-[#5e6b63]">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENTS ── */}
        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:px-12 lg:gap-20">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#956032]">
                Pourquoi nous faire confiance
              </p>
              <h2 className="mt-4 font-display text-4xl font-medium tracking-[-0.03em] text-[#17221c]">
                Nos engagements.
              </h2>
              <p className="mt-6 text-base leading-8 text-[#5e6b63]">
                Nous savons à quel point il peut être complexe de naviguer dans l'univers de la rénovation. 
                C'est pourquoi nous avons pris des engagements forts pour vous offrir la meilleure expérience 
                possible, loin des fausses promesses.
              </p>
            </div>
            <div className="rounded-2xl bg-[#f8f6f2] p-8 sm:p-10 border border-[#e8e4db]">
              <ul className="space-y-6">
                {engagements.map((text) => (
                  <li key={text} className="flex gap-4">
                    <CheckCircle2 className="mt-1 size-6 shrink-0 text-[#b9783e]" aria-hidden />
                    <span className="text-base font-medium leading-7 text-[#243229]">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── CALL TO ACTION ── */}
        <section className="bg-[#17221c] py-24 sm:py-32">
          <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
            <h2 className="font-display text-4xl font-medium tracking-[-0.03em] text-white sm:text-5xl">
              Prêt à franchir la première étape ?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Démarrez votre projet dès aujourd'hui en réalisant une estimation gratuite. 
              Découvrez les aides auxquelles vous avez droit et le budget à prévoir.
            </p>
            <div className="mt-10 flex justify-center">
              <Link
                to="/simulation" hash="simulateur"
                className="inline-flex min-h-14 items-center gap-3 bg-[#b9783e] px-8 text-base font-bold text-white transition-transform hover:-translate-y-1 hover:bg-[#c9894e] hover:shadow-[0_10px_30px_rgba(185,120,62,0.3)]"
              >
                Estimer mon projet maintenant
                <ArrowRight className="size-5" aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
