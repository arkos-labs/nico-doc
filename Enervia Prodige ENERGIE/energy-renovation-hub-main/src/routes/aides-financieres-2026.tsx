import { createFileRoute, Link } from "@tanstack/react-router";
import { BASE_URL } from "@/lib/site-identity";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronDown,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { PageShell } from "@/components/site/Layout";

const title = "Aides à la rénovation énergétique en 2026 | ENERVIA";
const description =
  "MaPrimeRénov', CEE, Éco-PTZ : comprendre les aides 2026 avec les barèmes à jour, les travaux éligibles et les conditions après la réforme de janvier 2026.";

export const Route = createFileRoute("/aides-financieres-2026")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${BASE_URL}/aides-financieres-2026` },
      { property: "og:image", content: `${BASE_URL}/og-default.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/aides-financieres-2026` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "L'isolation des murs est-elle encore finançable en 2026 ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "L'isolation murale (ITE/ITI) n'est plus éligible au parcours par geste MaPrimeRénov' depuis le 1er janvier 2026. Elle reste finançable via le parcours accompagné (rénovation d'ampleur) et les Certificats d'Économies d'Énergie (CEE).",
              },
            },
            {
              "@type": "Question",
              name: "Peut-on cumuler plusieurs dispositifs ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Oui, le cumul de MaPrimeRénov' et des Certificats d'Économies d'Énergie (CEE) est possible sous conditions, en respectant les règles d'écrêtement imposées par l'Anah. L'éco-PTZ peut également financer le reste à charge.",
              },
            },
            {
              "@type": "Question",
              name: "Faut-il déposer une demande avant les travaux ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Absolument. Il est strictement impératif de déposer votre dossier d'aide (MPR ou CEE) et d'attendre l'accord officiel avant la signature du moindre devis ou le versement d'un acompte, sous peine de perdre toute éligibilité.",
              },
            },
            {
              "@type": "Question",
              name: "Le montant du simulateur est-il garanti ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Non. Toute simulation est indicative. Seule l'instruction officielle de votre dossier par l'Anah ou le délégataire CEE, basée sur vos revenus fiscaux de référence (RFR) et l'audit énergétique, fait foi.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: AidesPage,
});

function AidLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mb-8 overflow-hidden rounded border border-[#d9d2c7] bg-white shadow-sm">
      <img src={src} alt={alt} className="h-20 w-auto max-w-full object-contain" />
    </div>
  );
}

function SectionNumber({ n }: { n: string }) {
  return (
    <span className="font-display text-5xl font-medium text-[#b9783e]">{n}</span>
  );
}

type FaqItem = { question: string; answer: string };

function FaqBlock({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="border-t border-[#c6bfb3]">
      {faqs.map((faq) => (
        <details key={faq.question} className="group border-b border-[#c6bfb3]">
          <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-6 py-5 text-base font-semibold text-[#243229] marker:content-none">
            {faq.question}
            <ChevronDown
              className="size-5 shrink-0 text-[#996137] transition-transform group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <p className="max-w-3xl pb-6 text-sm leading-7 text-[#627067]">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

function AidesPage() {
  return (
    <PageShell>
      <article>
        {/* ── HERO ── */}
        <header className="bg-[#111814] text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:px-12 lg:py-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d9a66e]">
                Financer un projet
              </p>
              <h1 className="mt-4 max-w-4xl font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white">
                Comprendre les aides avant de s'engager.
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                Plusieurs dispositifs peuvent contribuer au financement d'une rénovation énergétique.
                Leur accès dépend du logement, du foyer, des travaux et des règles applicables à la
                date de la demande.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#maprimerenov"
                  className="inline-flex min-h-14 items-center gap-3 bg-[#b9783e] px-6 text-sm font-bold transition-colors hover:bg-[#c9894e]"
                >
                  Voir les dispositifs
                  <ArrowRight className="size-4" aria-hidden />
                </a>
                <Link
                  to="/simulation" hash="simulateur"
                  className="inline-flex min-h-14 items-center gap-3 border border-white/30 px-6 text-sm font-semibold hover:border-white/60 hover:bg-white/5"
                >
                  Estimer mon projet
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>

            {/* Highlights */}
            <aside className="border-t-4 border-[#b9783e] bg-[#f1eee6] p-7 text-[#17221c] sm:p-9">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#956032]">
                Les 3 piliers du financement
              </p>
              <div className="mt-6">
                {[
                  { value: "MaPrimeRénov'", label: "Aide publique Anah selon revenus (RFR) et type de travaux" },
                  { value: "CEE", label: "Primes Coup de Pouce des fournisseurs d'énergie obligés" },
                  { value: "Éco-PTZ", label: "Prêt sans intérêts jusqu'à 50 000 € pour le reste à charge" },
                ].map((item, index) => (
                  <div
                    key={item.value}
                    className="border-t border-[#cec8bc] py-5 first:border-t-0 first:pt-0"
                  >
                    <div className="flex gap-4">
                      <span className="text-xs font-bold text-[#9a6034]">0{index + 1}</span>
                      <div>
                        <p className="font-display text-xl font-medium tracking-[-0.025em]">
                          {item.value}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-[#667169]">{item.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </header>

        {/* ── ALERTE RÉFORME JANVIER 2026 ── */}
        <div className="bg-[#fff8f0] border-b border-[#f0dcc0]">
          <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-12">
            <div className="flex gap-4 items-start">
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-[#b9783e]" aria-hidden />
              <div>
                <p className="text-sm font-bold text-[#7a4a1a]">
                  Réforme en vigueur depuis le 1er janvier 2026
                </p>
                <p className="mt-1 text-sm leading-6 text-[#7a4a1a]/80">
                  L'isolation des murs (ITE/ITI) et les chaudières biomasse ne sont plus éligibles au
                  parcours par geste MaPrimeRénov'. Ces travaux restent finançables via le{" "}
                  <strong>parcours accompagné</strong> (rénovation d'ampleur) et les <strong>CEE</strong>.
                  Le guichet MPR a rouvert le <strong>23 février 2026</strong> après une fermeture temporaire.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SOMMAIRE ── */}
        <section className="bg-[#e8e3d8] py-14">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-[.38fr_1.62fr] lg:px-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8a948e] pt-1">
              Dans cette page
            </p>
            <nav className="grid border-l border-t border-[#c9c2b6] sm:grid-cols-2" aria-label="Sommaire">
              {[
                { href: "#maprimerenov", label: "MaPrimeRénov' (MPR)" },
                { href: "#cee", label: "Certificats d'Économies d'Énergie" },
                { href: "#ecoptz", label: "L'Éco-PTZ et le reste à charge" },
                { href: "#conformite", label: "Préparer un dossier en conformité" },
              ].map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex min-h-16 items-center gap-4 border-b border-r border-[#c9c2b6] bg-[#f2efe8] px-5 text-sm font-semibold text-[#35433b] transition-colors hover:bg-white"
                >
                  <span className="text-[10px] font-bold text-[#9a6034]">0{i + 1}</span>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* ── SECTION 1 : MaPrimeRénov' ── */}
        <section id="maprimerenov" className="scroll-mt-24 border-b border-[#d6d0c5] bg-[#f4f1ea]">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[.6fr_1.4fr] lg:px-12">
            <div className="flex flex-col lg:block">
              <div className="flex items-start justify-between lg:block">
                <SectionNumber n="01" />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a948e] lg:mt-5 lg:block">
                  Aide publique
                </span>
              </div>
              <div className="mt-8 text-center flex justify-center">
                <img src="/maprimerenov.png" alt="Logo MaPrimeRénov'" className="w-full max-w-[280px] h-auto object-contain origin-center mx-auto" />
              </div>
            </div>
            <div className="max-w-4xl">
              <h2 className="font-display text-4xl font-medium leading-[1.06] tracking-[-0.045em] text-[#17221c] sm:text-5xl">
                MaPrimeRénov' (MPR) et Rénovation d'Ampleur
              </h2>
              <p className="mt-6 text-base leading-8 text-[#5e6b63]">
                Pilotée par l'Agence Nationale de l'Habitat (Anah), MaPrimeRénov' est le pilier du
                financement public. Depuis la réforme de 2026, deux parcours coexistent : le{" "}
                <strong>parcours par geste</strong> (travaux isolés) et le{" "}
                <strong>parcours accompagné</strong> (rénovation d'ampleur, anciennement « parcours
                accompagné »). Un rendez-vous préalable avec un conseiller France Rénov' est désormais
                obligatoire avant tout dépôt de dossier.
              </p>

              {/* Tableau catégories de revenus */}
              <div className="mt-8 overflow-hidden border border-[#d2ccc1]">
                <div className="grid grid-cols-3 bg-[#17221c] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white">
                  <span>Catégorie</span>
                  <span className="text-center">Par geste</span>
                  <span className="text-center">Rénovation d'ampleur</span>
                </div>
                {[
                  { cat: "🔵 Bleu — Très modestes", geste: "Taux maximal", ampleur: "80 % (plaf. 30–40 k€)" },
                  { cat: "🟡 Jaune — Modestes", geste: "Taux élevé", ampleur: "60 %" },
                  { cat: "🟣 Violet — Intermédiaires", geste: "Taux réduit", ampleur: "45 %" },
                  { cat: "🌸 Rose — Supérieurs", geste: "Non éligible", ampleur: "10 %" },
                ].map((row, i) => (
                  <div
                    key={row.cat}
                    className={`grid grid-cols-3 px-5 py-4 text-sm ${i % 2 === 0 ? "bg-white" : "bg-[#f9f7f4]"} border-t border-[#e4dfd8]`}
                  >
                    <span className="font-medium text-[#243229]">{row.cat}</span>
                    <span className="text-center text-[#556059]">{row.geste}</span>
                    <span className="text-center text-[#556059]">{row.ampleur}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-[#8a948e]">
                * Catégories calculées selon le Revenu Fiscal de Référence (RFR) du foyer. Plafonds
                différents en Île-de-France. Vérifiez votre catégorie sur{" "}
                <a
                  href="https://france-renov.gouv.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9a6034] underline underline-offset-2 hover:text-[#b9783e]"
                >
                  france-renov.gouv.fr
                </a>.
              </p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Audit énergétique réglementaire requis pour la rénovation d'ampleur",
                  "Rendez-vous France Rénov' obligatoire avant tout dépôt de dossier (2026)",
                  "Travaux réalisés par des entreprises certifiées RGE exclusivement",
                  "ITE/ITI et chaudières biomasse exclues du parcours par geste depuis jan. 2026",
                  "Plafond travaux : 30 000 € HT (+2 classes DPE) ou 40 000 € HT (+3 classes)",
                  "Dossier déposé avant les travaux — aucune rétroactivité possible",
                ].map((b) => (
                  <li key={b} className="flex gap-3 border-t border-[#d2ccc1] pt-4 text-sm leading-6 text-[#35433b]">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#a56838]" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <aside className="mt-9 border-l-4 border-[#b9783e] bg-[#e5dfd3] px-6 py-5 text-sm leading-7 text-[#435048]">
                Les barèmes et plafonds d'écrêtement évoluent chaque année. Consultez{" "}
                <a
                  href="https://france-renov.gouv.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#8f552f] underline underline-offset-2"
                >
                  france-renov.gouv.fr
                </a>{" "}
                ou le{" "}
                <a
                  href="https://maprimerenov.gouv.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#8f552f] underline underline-offset-2"
                >
                  portail MaPrimeRénov'
                </a>{" "}
                pour figer votre enveloppe avant tout engagement.
              </aside>
              <div className="mt-10">
                <Link
                  to="/maprimerenov"
                  className="inline-flex min-h-14 items-center gap-3 bg-[#b9783e] px-6 text-sm font-bold text-white transition-colors hover:bg-[#c9894e]"
                >
                  En savoir plus sur MaPrimeRénov'
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2 : CEE ── */}
        <section id="cee" className="scroll-mt-24 border-b border-[#d6d0c5] bg-[#f4f1ea]">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[.6fr_1.4fr] lg:px-12">
            <div className="flex flex-col lg:block">
              <div className="flex items-start justify-between lg:block">
                <SectionNumber n="02" />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a948e] lg:mt-5 lg:block">
                  Prime énergie
                </span>
              </div>
              <div className="mt-8 text-center flex justify-center">
                <img src="/cee.png" alt="Logo CEE" className="w-full max-w-[400px] h-auto object-contain transform scale-125 origin-center mx-auto" />
              </div>
            </div>
            <div className="max-w-4xl">
              <h2 className="font-display text-4xl font-medium leading-[1.06] tracking-[-0.045em] text-[#17221c] sm:text-5xl">
                Les Certificats d'Économies d'Énergie (CEE)
              </h2>
              <p className="mt-6 text-base leading-8 text-[#5e6b63]">
                Instauré par la loi POPE, le dispositif des CEE oblige les fournisseurs d'énergie
                (les « obligés ») à financer des travaux d'efficacité énergétique. Les primes «{" "}
                <strong>Coup de Pouce</strong> » sont bonifiées pour certains types de travaux. Depuis
                le 1er octobre 2025, les PAC air/eau et eau/eau sont éligibles au Coup de Pouce
                Chauffage, et depuis le 1er janvier 2026, les réseaux de chaleur urbains et les
                systèmes solaires combinés le sont également.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Comparer les primes des différents obligés avant toute signature",
                  "Signature du cadre de contribution CEE exigée avant l'acceptation du devis",
                  "Conformité technique stricte (COP minimum, résistance thermique R…)",
                  "L'isolation murale (ITE/ITI) reste finançable par CEE même exclue de MPR par geste",
                  "PAC air/eau éligible au Coup de Pouce Chauffage depuis octobre 2025",
                  "Cumul CEE + MaPrimeRénov' possible sous réserve des règles d'écrêtement",
                ].map((b) => (
                  <li key={b} className="flex gap-3 border-t border-[#d2ccc1] pt-4 text-sm leading-6 text-[#35433b]">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#a56838]" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <aside className="mt-9 border-l-4 border-[#b9783e] bg-[#e5dfd3] px-6 py-5 text-sm leading-7 text-[#435048]">
                Les CEE sont instruits par des organismes privés (délégataires ou obligés). Leurs
                conditions varient — comparez toujours plusieurs offres avant de vous engager avec un
                opérateur. Retrouvez les fiches d'opérations standardisées sur{" "}
                <a
                  href="https://www.ecologie.gouv.fr/politiques-publiques/dispositif-certificats-deconomies-denergie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#8f552f] underline underline-offset-2"
                >
                  ecologie.gouv.fr
                </a>.
              </aside>
              <div className="mt-10">
                <Link
                  to="/prime-cee"
                  className="inline-flex min-h-14 items-center gap-3 bg-[#b9783e] px-6 text-sm font-bold text-white transition-colors hover:bg-[#c9894e]"
                >
                  En savoir plus sur les CEE
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3 : Éco-PTZ ── */}
        <section id="ecoptz" className="scroll-mt-24 border-b border-[#d6d0c5] bg-[#f4f1ea]">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[.6fr_1.4fr] lg:px-12">
            <div className="flex flex-col lg:block">
              <div className="flex items-start justify-between lg:block">
                <SectionNumber n="03" />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a948e] lg:mt-5 lg:block">
                  Prêt sans intérêts
                </span>
              </div>
              <div className="mt-8">
                <img src="/eco-ptz.png" alt="Éco-prêt 0%" className="w-full max-w-[180px] lg:max-w-[220px] h-auto object-contain" />
              </div>
            </div>
            <div className="max-w-4xl">
              <h2 className="font-display text-4xl font-medium leading-[1.06] tracking-[-0.045em] text-[#17221c] sm:text-5xl">
                L'Éco-PTZ et le financement du reste à charge
              </h2>
              <p className="mt-6 text-base leading-8 text-[#5e6b63]">
                Une fois les primes MPR et CEE déduites, le montant restant — le{" "}
                <strong>reste à charge</strong> — peut être financé par l'Éco-prêt à taux zéro
                (Éco-PTZ). Ce prêt ne génère aucun intérêt bancaire, l'État prenant en charge la
                bonification auprès des établissements partenaires. Depuis le 1er juillet 2025, la
                condition d'éligibilité pour la rénovation globale est un gain d'au moins{" "}
                <strong>2 classes DPE</strong>.
              </p>

              {/* Plafonds Éco-PTZ */}
              <div className="mt-8 overflow-hidden border border-[#d2ccc1]">
                <div className="grid grid-cols-2 bg-[#1c4f8c] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white">
                  <span>Type de travaux</span>
                  <span className="text-right">Montant max.</span>
                </div>
                {[
                  { type: "Action unique éligible", montant: "15 000 €" },
                  { type: "Deux actions éligibles", montant: "25 000 €" },
                  { type: "Trois actions ou plus", montant: "30 000 €" },
                  { type: "Rénovation globale / MPR éligible", montant: "50 000 €" },
                ].map((row, i) => (
                  <div
                    key={row.type}
                    className={`grid grid-cols-2 px-5 py-4 text-sm ${i % 2 === 0 ? "bg-white" : "bg-[#f9f7f4]"} border-t border-[#e4dfd8]`}
                  >
                    <span className="text-[#243229]">{row.type}</span>
                    <span className="text-right font-semibold text-[#1c4f8c]">{row.montant}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-[#8a948e]">
                Remboursement sur 20 ans maximum. Accordé par un établissement bancaire partenaire.
              </p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Aucun intérêt bancaire, l'État compense la bonification",
                  "Cumulable avec MaPrimeRénov' et les primes CEE",
                  "Formulaire Éco-PTZ à compléter par l'artisan RGE avec le devis",
                  "Accordé par une banque partenaire — vérifiez leur liste auprès de l'ADEME",
                ].map((b) => (
                  <li key={b} className="flex gap-3 border-t border-[#d2ccc1] pt-4 text-sm leading-6 text-[#35433b]">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#a56838]" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link
                  to="/eco-ptz"
                  className="inline-flex min-h-14 items-center gap-3 bg-[#b9783e] px-6 text-sm font-bold text-white transition-colors hover:bg-[#c9894e]"
                >
                  En savoir plus sur l'Éco-PTZ
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4 : Conformité dossier ── */}
        <section id="conformite" className="scroll-mt-24 border-b border-[#d6d0c5] bg-[#f4f1ea]">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[.38fr_1.62fr] lg:px-12">
            <div className="flex flex-col lg:block">
              <div className="flex items-start justify-between lg:block">
                <SectionNumber n="04" />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a948e] lg:mt-5 lg:block">
                  Rigueur administrative
                </span>
              </div>
              <div className="mt-8 text-center flex justify-center">
                <img src="/france-renov.png" alt="Logo France Rénov'" className="w-full max-w-[400px] h-auto object-contain transform scale-150 origin-center mx-auto" />
              </div>
            </div>
            <div className="max-w-4xl">
              <h2 className="font-display text-4xl font-medium leading-[1.06] tracking-[-0.045em] text-[#17221c] sm:text-5xl">
                Préparer un dossier en conformité
              </h2>
              <p className="mt-6 text-base leading-8 text-[#5e6b63]">
                Le montage d'un dossier de subvention exige une rigueur chronologique stricte. Le
                non-respect de l'ordre des étapes, une certification RGE expirée au jour de la
                signature ou des mentions manquantes sur les devis entraînent systématiquement le
                rejet des primes, sans recours possible.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Rendez-vous obligatoire avec un conseiller France Rénov' avant le dépôt (2026)",
                  "Dossier déposé et accepté avant toute signature de devis ou versement d'acompte",
                  "Vérification de la validité RGE de l'entreprise à la date exacte de signature",
                  "Devis détaillant fournitures, pose, certifications techniques et sous-traitants",
                  "Vigilance contre la fraude et le démarchage téléphonique (interdit en rénovation)",
                  "Contrôle de conformité post-travaux possible par un organisme COFRAC",
                ].map((b) => (
                  <li key={b} className="flex gap-3 border-t border-[#d2ccc1] pt-4 text-sm leading-6 text-[#35433b]">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#a56838]" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <aside className="mt-9 border-l-4 border-[#b9783e] bg-[#e5dfd3] px-6 py-5 text-sm leading-7 text-[#435048]">
                <strong>Ce site propose des estimations à visée pédagogique.</strong> Aucun résultat
                ne constitue un accord de subvention ni une offre contractuelle. Contactez un
                conseiller France Rénov' au{" "}
                <a
                  href="tel:0808800700"
                  className="font-semibold text-[#8f552f] underline underline-offset-2"
                >
                  0808 800 700
                </a>{" "}
                (service public, appel gratuit) pour une orientation personnalisée.
              </aside>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-[#e8e3d8] py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.55fr_1.45fr] lg:px-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8a948e]">
                Questions fréquentes
              </p>
              <h2 className="mt-4 font-display text-4xl font-medium tracking-[-0.04em] text-[#17221c]">
                L'essentiel, clairement.
              </h2>
            </div>
            <FaqBlock
              faqs={[
                {
                  question: "L'isolation des murs est-elle encore finançable en 2026 ?",
                  answer:
                    "L'isolation murale (ITE/ITI) n'est plus éligible au parcours par geste MaPrimeRénov' depuis le 1er janvier 2026. Elle reste finançable via le parcours accompagné (rénovation d'ampleur) et les Certificats d'Économies d'Énergie (CEE), qui maintiennent des primes sur ce poste.",
                },
                {
                  question: "Peut-on cumuler plusieurs dispositifs ?",
                  answer:
                    "Oui, le cumul MaPrimeRénov' + CEE est possible sous conditions, en respectant les règles d'écrêtement de l'Anah (financement maximal = coût réel des travaux). L'Éco-PTZ peut ensuite couvrir le reste à charge sans intérêts.",
                },
                {
                  question: "Faut-il déposer une demande avant les travaux ?",
                  answer:
                    "Absolument. Il est strictement impératif de déposer votre dossier MPR ou CEE et d'attendre l'accord officiel avant toute signature de devis ou versement d'acompte, sous peine de perdre définitivement l'éligibilité.",
                },
                {
                  question: "Le montant du simulateur est-il garanti ?",
                  answer:
                    "Non. Toute simulation est indicative et à visée pédagogique. Seule l'instruction officielle de votre dossier par l'Anah, basée sur vos revenus fiscaux de référence (RFR) et l'audit énergétique, constitue un engagement.",
                },
              ]}
            />
          </div>
        </section>

        {/* ── CTA simulateur ── */}
        <section className="bg-[#f4f1ea] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-10 bg-[#17231d] p-8 text-white sm:p-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:p-16">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d9a66e]">
                Première estimation
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.045em] text-white sm:text-5xl">
                Situez votre projet avant d'aller plus loin.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/52">
                Le simulateur fournit une orientation indicative. Les conditions et montants réels
                restent à vérifier auprès de l'Anah et de votre conseiller France Rénov'.
              </p>
            </div>
            <Link
              to="/simulation" hash="simulateur"
              className="inline-flex min-h-14 items-center justify-center gap-3 bg-[#b9783e] px-6 text-sm font-bold hover:bg-[#c9894e] lg:justify-self-end"
            >
              Commencer l'estimation
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </section>

        {/* ── Disclaimer légal ── */}
        <div className="border-t border-[#d2cbbf] bg-[#e7ebe3] px-5 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-7xl items-start gap-4 text-xs leading-6 text-[#5b685f]">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#496153]" aria-hidden />
            <p>
              Les informations présentées sur cette page sont issues de sources officielles (Anah,
              ecologie.gouv.fr, economie.gouv.fr) et mises à jour en août 2026. Elles ont une
              vocation pédagogique et ne constituent pas un conseil juridique ou financier. Les
              montants, conditions et plafonds peuvent évoluer — vérifiez toujours auprès des
              organismes compétents avant tout engagement.
            </p>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
