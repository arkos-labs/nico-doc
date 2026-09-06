import { type ReactNode } from "react";
import { ArrowDown, ArrowRight, Check, ChevronDown } from "lucide-react";
import { PageShell } from "./Layout";
import { BASE_URL } from "@/lib/site-identity";

export type SiloHighlight = { label: string; value: string };
export type SiloSection = {
  heading: string;
  body: string;
  bullets?: string[];
  callout?: string;
  /** Logo/image displayed in the left column (src path + alt + optional max width) */
  image?: { src: string; alt: string; maxWidth?: string };
  /** Optional visual block rendered below the body/bullets (SVG diagram, image…) */
  visual?: ReactNode;
};
export type SiloFaq = { question: string; answer: string };

function toAnchor(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function SiloPage({
  eyebrow,
  h1,
  intro,
  highlights,
  sections,
  faqs,
  slug,
}: {
  eyebrow: string;
  h1: string;
  intro: string;
  highlights: SiloHighlight[];
  sections: SiloSection[];
  faqs: SiloFaq[];
  /** URL slug (e.g. "pompe-a-chaleur") — used to generate BreadcrumbList JSON-LD */
  slug?: string;
}) {
  const breadcrumbSchema = slug
    ? JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE_URL}/` },
          { "@type": "ListItem", position: 2, name: h1.replace(/\.$/, ""), item: `${BASE_URL}/${slug}` },
        ],
      })
    : null;

  return (
    <PageShell>
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
        />
      )}
      <article>
        <header className="bg-[#111814] text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:px-12 lg:py-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d9a66e]">
                {eyebrow}
              </p>
              <h1 className="mt-4 max-w-4xl font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white">
                {h1}
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">{intro}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#comprendre"
                  className="inline-flex min-h-14 items-center gap-3 bg-[#b9783e] px-6 text-sm font-bold transition-colors hover:bg-[#c9894e]"
                >
                  Comprendre le sujet
                  <ArrowDown className="size-4" aria-hidden />
                </a>
                <a
                  href="/#simulateur"
                  className="inline-flex min-h-14 items-center gap-3 border border-white/30 px-6 text-sm font-semibold hover:border-white/60 hover:bg-white/5"
                >
                  Estimer mon projet
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              </div>
            </div>

            <aside className="border-t-4 border-[#b9783e] bg-[#f1eee6] p-7 text-[#17221c] sm:p-9">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#956032]">
                À retenir
              </p>
              <div className="mt-6">
                {highlights.map((item, index) => (
                  <div
                    key={item.label}
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

        <section id="comprendre" className="scroll-mt-20 bg-[#e8e3d8] py-14">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-[.38fr_1.62fr] lg:px-12">
            <p className="premium-eyebrow pt-1">Dans cette page</p>
            <nav
              className="grid border-l border-t border-[#c9c2b6] sm:grid-cols-2"
              aria-label="Sommaire de la page"
            >
              {sections.map((section, index) => (
                <a
                  key={section.heading}
                  href={`#${toAnchor(section.heading)}`}
                  className="flex min-h-16 items-center gap-4 border-b border-r border-[#c9c2b6] bg-[#f2efe8] px-5 text-sm font-semibold text-[#35433b] transition-colors hover:bg-white"
                >
                  <span className="text-[10px] font-bold text-[#9a6034]">0{index + 1}</span>
                  {section.heading}
                </a>
              ))}
            </nav>
          </div>
        </section>

        <div className="bg-[#f4f1ea]">
          {sections.map((section, index) => (
            <section
              key={section.heading}
              id={toAnchor(section.heading)}
              className="scroll-mt-24 border-b border-[#d6d0c5]"
            >
              <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[.38fr_1.62fr] lg:px-12">
                <div className="flex items-start justify-between lg:block">
                  <span className="font-display text-5xl font-medium text-[#b9783e]">
                    0{index + 1}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a948e] lg:mt-5 lg:block">
                    Repère pratique
                  </span>
                  {section.image && (
                    <div className="mt-8 hidden lg:flex lg:justify-center">
                      <img
                        src={section.image.src}
                        alt={section.image.alt}
                        style={{ maxWidth: section.image.maxWidth ?? "280px" }}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  )}
                </div>
                <div className="max-w-4xl">
                  <h2 className="font-display text-4xl font-medium leading-[1.06] tracking-[-0.045em] text-[#17221c] sm:text-5xl">
                    {section.heading}
                  </h2>
                  <p className="mt-6 text-base leading-8 text-[#5e6b63]">{section.body}</p>
                  {section.bullets?.length ? (
                    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 border-t border-[#d2ccc1] pt-4 text-sm leading-6 text-[#35433b]"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-[#a56838]" aria-hidden />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {section.visual ? (
                    <div className="mt-10">{section.visual}</div>
                  ) : null}
                  {section.callout ? (
                    <aside className="mt-9 border-l-4 border-[#b9783e] bg-[#e5dfd3] px-6 py-5 text-sm leading-7 text-[#435048]">
                      {section.callout}
                    </aside>
                  ) : null}
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="bg-[#e8e3d8] py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.55fr_1.45fr] lg:px-12">
            <div>
              <p className="premium-eyebrow">Questions fréquentes</p>
              <h2 className="mt-4 font-display text-4xl font-medium tracking-[-0.04em] text-[#17221c]">
                L'essentiel, clairement.
              </h2>
            </div>
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
          </div>
        </section>

        <section className="bg-[#f4f1ea] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-10 bg-[#17231d] p-8 text-white sm:p-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:p-16">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d9a66e]">
                Première estimation
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.045em] text-white sm:text-5xl">
                Situez votre projet avant d'aller plus loin.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70">
                Le simulateur fournit une orientation indicative. Les conditions et montants réels restent à vérifier auprès de l'Anah et de votre conseiller France Rénov'.
              </p>
            </div>
            <a
              href="/#simulateur"
              className="inline-flex min-h-14 items-center justify-center gap-3 bg-[#b9783e] px-6 text-sm font-bold hover:bg-[#c9894e] lg:justify-self-end"
            >
              Commencer l'estimation
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
