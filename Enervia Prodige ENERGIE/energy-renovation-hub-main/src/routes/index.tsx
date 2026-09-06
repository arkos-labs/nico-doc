import { createFileRoute, Link } from "@tanstack/react-router";
import { BASE_URL } from "@/lib/site-identity";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  ClipboardCheck,
  ExternalLink,
  Flame,
  Home,
  Info,
  LockKeyhole,
  ShieldCheck,
  ThermometerSun,
} from "lucide-react";
import { PageShell } from "@/components/site/Layout";
import { Simulator } from "@/components/site/Simulator";
import { propertyRenovationLinks } from "@/lib/property-renovation";
import heroImage from "@/assets/hero-renovation.jpg";

const title = "Chauffage, isolation et aides 2026 | ENERVIA";
const description =
  "Évaluez votre projet de rénovation énergétique : chauffage, isolation et premières estimations des aides disponibles en 2026.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${BASE_URL}/` },
      { property: "og:image", content: `${BASE_URL}/og-default.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [
      { rel: "canonical", href: `${BASE_URL}/` },
      { rel: "preload", href: heroImage, as: "image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://www.enervia.fr/#website",
              name: "ENERVIA",
              description,
              url: "https://www.enervia.fr",
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Qu'est-ce que MaPrimeRénov' et qui peut en bénéficier en 2026 ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "MaPrimeRénov' est une aide de l'État versée par l'Agence nationale de l'habitat (Anah) pour financer des travaux de rénovation énergétique. En 2026, elle est accessible à tous les propriétaires occupants, bailleurs et copropriétaires, sous conditions de ressources. Le montant varie de 15 % à 90 % du coût des travaux selon le revenu fiscal de référence du foyer.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Qu'est-ce qu'une rénovation globale performante ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Une rénovation globale (ou rénovation d'ampleur) est un ensemble de travaux combinés permettant de faire passer un logement d'au moins deux niveaux de classe DPE, avec pour objectif d'atteindre la classe B ou C. Elle est obligatoirement accompagnée d'un audit énergétique réglementaire et ouvre droit aux subventions MaPrimeRénov' Parcours accompagné, avec un plafond pouvant atteindre 70 000 €.",
                  },
                },
                {
                  "@type": "Question",
                  name: "L'isolation à 1 euro est-elle encore disponible ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Non. Les offres d'isolation à 1 € ont été supprimées en 2021 suite à de nombreuses fraudes. Depuis cette date, les travaux d'isolation sont financés par MaPrimeRénov' et les Certificats d'Économies d'Énergie (CEE), sous conditions de ressources et avec des artisans certifiés RGE.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Qu'est-ce que la certification RGE et pourquoi est-elle obligatoire ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Le label RGE (Reconnu Garant de l'Environnement) est une qualification délivrée par des organismes agréés (Qualibat, Qualit'EnR…) aux artisans ayant suivi des formations spécifiques (FEEBAT) et réussi des audits de chantier. Sans artisan RGE, le particulier ne peut pas prétendre à MaPrimeRénov', aux primes CEE ni à l'éco-PTZ.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Quelle est la différence entre un DPE et un audit énergétique réglementaire ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Le DPE (Diagnostic de Performance Énergétique, valable 10 ans) indique la classe énergétique du logement (de A à G). L'audit énergétique réglementaire (valable 5 ans) va plus loin : il propose au moins deux scénarios de travaux chiffrés permettant d'atteindre la classe B, et est obligatoire depuis 2023 pour la vente des passoires thermiques (F et G) en monopropriété.",
                  },
                },
              ],
            },
            {
              "@type": "HowTo",
              name: "Comment préparer son projet de rénovation énergétique avec ENERVIA ?",
              description: "Méthode en 3 étapes pour obtenir une estimation personnalisée et mobiliser les aides disponibles.",
              step: [
                {
                  "@type": "HowToStep",
                  position: 1,
                  name: "Évaluer votre logement",
                  text: "Renseignez les caractéristiques de votre bien (type, surface, chauffage actuel, travaux envisagés) via notre simulateur en ligne pour obtenir une première estimation indicative.",
                },
                {
                  "@type": "HowToStep",
                  position: 2,
                  name: "Clarifier les solutions adaptées",
                  text: "Un conseiller ENERVIA analyse votre situation, identifie les travaux prioritaires et calcule les aides auxquelles vous êtes éligible (MaPrimeRénov', CEE, éco-PTZ).",
                },
                {
                  "@type": "HowToStep",
                  position: 3,
                  name: "Préparer la réalisation",
                  text: "Sélection des artisans RGE du réseau, suivi du chantier et accompagnement dans les démarches administratives jusqu'au versement des subventions.",
                },
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

const expertises = [
  {
    to: "/pompe-a-chaleur" as const,
    number: "01",
    icon: Flame,
    eyebrow: "Performance thermique",
    title: "Chauffage",
    text: "Remplacez vos anciens équipements par une pompe à chaleur haute température (fluides écologiques R290 ou R32), rigoureusement dimensionnée selon la norme NF EN 12831.",
    items: ["PAC air/eau et réseau hydraulique", "PAC air/air (SCOP/SEER)", "Dimensionnement géothermique"],
  },
  {
    to: "/isolation-thermique" as const,
    number: "02",
    icon: ThermometerSun,
    eyebrow: "Confort de l’enveloppe",
    title: "Isolation",
    text: "Supprimez les ponts thermiques et maîtrisez l'étanchéité à l'air (Q4Pa-surf) avec une isolation par l'extérieur (ITE) ou sous toiture conforme aux normes NF DTU 45.10 et 45.11.",
    items: ["Combles et toiture (R ≥ 7 m².K/W)", "Murs par l’extérieur (ITE)", "Ventilation couplée (VMC)"],
  },
  {
    to: "/aides-financieres-2026" as const,
    number: "03",
    icon: Home,
    eyebrow: "Vision d’ensemble",
    title: "Rénovation globale",
    text: "Structurer plusieurs travaux dans un parcours coordonné via un audit énergétique réglementaire, en optimisant votre éligibilité à MaPrimeRénov' et aux CEE.",
    items: ["Audit énergétique réglementaire", "Scénario de travaux performants", "Optimisation des aides 2026"],
  },
];


function Index() {
  return (
    <PageShell>
      <section className="relative isolate min-h-[calc(100svh-76px)] overflow-hidden bg-[#111814] text-white">
        <img
          src={heroImage}
          alt="Maison rénovée équipée d’une pompe à chaleur extérieure"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[64%_center]"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(13,20,16,.97)_0%,rgba(13,20,16,.88)_43%,rgba(13,20,16,.42)_72%,rgba(13,20,16,.12)_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-black/25 to-transparent" />

        <div className="mx-auto flex min-h-[calc(100svh-76px)] max-w-[1440px] flex-col justify-end px-5 pb-0 pt-20 sm:px-8 lg:px-12">
          <div className="grid items-end gap-12 pb-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(310px,.58fr)] lg:gap-16 lg:pb-20">
            <div className="max-w-4xl motion-safe:animate-[reveal-up_.8s_ease-out_both]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e2ad70]">
                Rénovation énergétique sur mesure
              </p>
              <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.8rem,6.3vw,6.1rem)] font-medium leading-[.96] tracking-[-0.055em] text-white">
                Rénovez votre maison.{" "}
                <span className="text-white/68">Améliorez durablement votre confort.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-white/62 sm:text-lg">
                De l’évaluation de votre projet à l’orientation vers des solutions adaptées, avancez
                avec une méthode claire et une première lecture des aides possibles.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  to="/simulation" hash="simulateur"
                  className="inline-flex min-h-14 items-center gap-3 bg-[#b9783e] px-6 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#c9894e]"
                >
                  Estimer mes économies <ArrowRight className="size-4" aria-hidden />
                </Link>
                <Link
                  to="/notre-methode"
                  className="inline-flex min-h-14 items-center gap-3 border border-white/35 px-6 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
                >
                  Découvrir notre méthode <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>

            <aside className="border-t-4 border-[#b9783e] bg-[#f1eee6]/95 p-7 text-[#17221c] shadow-[0_24px_70px_rgba(0,0,0,.28)] backdrop-blur-md motion-safe:animate-[reveal-up_.8s_.18s_ease-out_both] sm:p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#956032]">
                Votre projet en trois étapes
              </p>
              <h2 className="mt-3 font-display text-3xl font-medium leading-tight tracking-[-0.035em]">
                Une première estimation, simplement.
              </h2>
              <div className="mt-7">
                {[
                  "Décrivez votre logement",
                  "Précisez les travaux envisagés",
                  "Obtenez une première estimation",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 border-t border-[#cec8bc] py-4 text-sm text-[#536158]"
                  >
                    <span className="grid size-7 shrink-0 place-items-center bg-[#23382d] text-[10px] font-bold text-white">
                      0{index + 1}
                    </span>
                    {item}
                  </div>
                ))}
              </div>
              <Link
                to="/simulation" hash="simulateur"
                className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-[#8f572a] hover:text-[#6f411e]"
              >
                Commencer l’estimation <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </aside>
          </div>

          <div className="grid border-t border-white/15 bg-[#17221c]/90 backdrop-blur-md sm:grid-cols-3">
            {[
              [ClipboardCheck, "Estimation gratuite"],
              [ShieldCheck, "Sans engagement"],
              [LockKeyhole, "Coordonnées à la dernière étape"],
            ].map(([Icon, label], index) => (
              <div
                key={label as string}
                className={`flex min-h-16 items-center justify-center gap-3 px-5 text-center text-xs font-medium text-white/70 ${index < 2 ? "border-b border-white/10 sm:border-b-0 sm:border-r" : ""}`}
              >
                <Icon className="size-4 text-[#d6a269]" aria-hidden /> {label as string}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f0ede5] py-24 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
            <div>
              <p className="premium-eyebrow">Nos expertises</p>
              <p className="mt-4 max-w-sm text-sm leading-7 text-[#68736c]">
                Une rénovation cohérente commence par une lecture juste des besoins du logement.
              </p>
            </div>
            <h2 className="max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.045em] text-[#17221c] sm:text-5xl lg:text-6xl">
              Des solutions pensées pour la performance et le confort.
            </h2>
          </div>

          <div className="mt-16 grid border-l border-t border-[#cac4b8] lg:grid-cols-3">
            {expertises.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group relative flex min-h-[490px] flex-col border-b border-r border-[#cac4b8] bg-[#f6f3ec] p-7 transition-colors hover:bg-white sm:p-9"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold tracking-[0.16em] text-[#986138]">
                    {item.number}
                  </span>
                  <item.icon className="size-6 text-[#395448]" aria-hidden />
                </div>
                <div className="mt-auto pt-16">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8b948e]">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-3 font-display text-4xl font-medium tracking-[-0.04em] text-[#17221c]">
                    {item.title}
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-[#647168]">{item.text}</p>
                  <ul className="mt-7 space-y-3 border-t border-[#d8d3c9] pt-6">
                    {item.items.map((service) => (
                      <li key={service} className="flex items-center gap-3 text-sm text-[#35443c]">
                        <Check className="size-4 text-[#a86d3d]" aria-hidden />
                        {service}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-[#875229]">
                    Découvrir cette solution{" "}
                    <ArrowUpRight
                      className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <a
            href="#renover-mon-bien"
            className="group grid border-x border-b border-[#cac4b8] bg-[#23382d] text-white transition-colors hover:bg-[#2b4437] lg:grid-cols-[1.15fr_.85fr]"
          >
            <div className="border-b border-white/15 p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#d9a66e]">
                    Une entrée, deux parcours
                  </p>
                  <h3 className="mt-4 font-display text-4xl font-medium tracking-[-0.04em] text-white sm:text-5xl">
                    Rénover mon bien
                  </h3>
                </div>
                <Building2 className="size-7 shrink-0 stroke-[1.4] text-white/45" aria-hidden />
              </div>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55">
                Immeuble collectif ou maison individuelle : trouvez le parcours adapté à votre
                projet.
              </p>
            </div>
            <div className="flex flex-col justify-between gap-10 p-7 sm:p-10 lg:p-12">
              <div className="flex flex-wrap gap-3">
                {["Immeuble", "Maison individuelle"].map((label) => (
                  <span
                    key={label}
                    className="rounded border border-white/30 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-colors group-hover:border-white/50 group-hover:bg-white/10 sm:text-base"
                  >
                    {label}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-3 text-sm font-bold text-[#e0ad74]">
                Choisir mon parcours
                <ArrowDown
                  className="size-4 transition-transform group-hover:translate-y-1"
                  aria-hidden
                />
              </span>
            </div>
          </a>
        </div>
      </section>

      <section
        id="renover-mon-bien"
        className="scroll-mt-20 bg-[#111814] py-24 text-white sm:py-28 lg:py-36"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div>
              <p className="premium-eyebrow text-[#d9a66e]">Rénover mon bien</p>
              <p className="mt-4 max-w-sm text-sm leading-7 text-white/70">
                Choisissez le parcours qui correspond à la nature de votre projet immobilier.
              </p>
            </div>
            <h2 className="max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              Chaque bâtiment mérite une approche adaptée.
            </h2>
          </div>

          <div className="mt-16 grid border-l border-t border-white/15 lg:grid-cols-2">
            {propertyRenovationLinks.map((item, index) => {
              const Icon = index === 0 ? Building2 : Home;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="group flex min-h-[360px] flex-col border-b border-r border-white/15 p-7 transition-colors hover:bg-white/[.04] sm:p-10 lg:min-h-[420px] lg:p-12"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-bold tracking-[0.2em] text-[#d9a66e]">
                      {item.number}
                    </span>
                    <Icon className="size-7 stroke-[1.4] text-white/45" aria-hidden />
                  </div>
                  <div className="mt-auto flex flex-1 flex-col pt-16">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">
                      Parcours dédié
                    </p>
                    <h3 className="mt-4 max-w-lg font-display text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl">
                      {item.title}
                    </h3>
                    <p className="mt-6 flex-1 max-w-xl text-sm leading-7 text-white/70">
                      {item.description}
                    </p>
                    <span className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-[#d9a66e]">
                      Découvrir ce parcours
                      <ExternalLink
                        className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        aria-hidden
                      />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>


      <section id="simulateur" className="scroll-mt-20 bg-[#e8e3d8] py-24 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[.65fr_1.35fr] lg:gap-20">
            <div>
              <p className="premium-eyebrow">Votre estimation</p>
              <h2 className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-[-0.045em] text-[#17221c] sm:text-5xl">
                Donnez forme à votre projet.
              </h2>
              <p className="mt-6 text-sm leading-7 text-[#657169]">
                Décrivez votre logement et les travaux envisagés pour obtenir une première
                fourchette d’économies. Le résultat apparaît avant les coordonnées.
              </p>
              <div className="mt-8 space-y-4 border-t border-[#c9c2b6] pt-7">
                {["Parcours gratuit", "Résultat expliqué", "Aucune donnée transmise"].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm font-medium text-[#35433b]"
                    >
                      <Check className="size-4 text-[#9a6034]" aria-hidden />
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>
            <Simulator />
          </div>
        </div>
      </section>

      <section className="bg-[#f6f3ec] py-12">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-start gap-6 border border-[#d4cec2] bg-white p-6 sm:p-8">
            <div className="flex size-12 shrink-0 items-center justify-center bg-[#aa6c3b] text-white">
              <Info className="size-6 stroke-[2]" aria-hidden />
            </div>
            <div>
              <h2 className="font-display text-2xl font-medium tracking-[-0.02em] text-[#17221c]">
                L’isolation à 1 € est terminée, mais les aides continuent.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#657169]">
                Si les offres à 1 euro n'existent plus, nous continuons bien sûr à isoler votre logement ! 
                Aujourd'hui, pour débloquer les meilleures aides financières, il est souvent nécessaire de 
                réaliser un ensemble d'au moins <strong>deux gestes de travaux</strong> (par exemple : coupler l'isolation 
                avec le remplacement de vos fenêtres, ou avec l'isolation de vos combles). Nous vous aidons 
                à concevoir ce projet pour maximiser vos subventions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
