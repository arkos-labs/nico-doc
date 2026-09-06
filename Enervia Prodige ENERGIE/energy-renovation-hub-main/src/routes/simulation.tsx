import { createFileRoute } from "@tanstack/react-router";
import { Check, ShieldCheck } from "lucide-react";
import { Simulator } from "@/components/site/Simulator";
import { PageShell } from "@/components/site/Layout";
import { BASE_URL,  siteIdentity } from "@/lib/site-identity";

const title = `Estimer mes économies d’énergie | ${siteIdentity.commercialName}`;
const description =
  "Décrivez votre logement et vos travaux pour obtenir une première fourchette indicative d’économies d’énergie.";

export const Route = createFileRoute("/simulation")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${BASE_URL}/simulation` },
      { property: "og:image", content: `${BASE_URL}/og-default.jpg` },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/simulation` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Simulateur d'Aides et d'Économies d'Énergie",
          url: "/simulation",
          description: "Outil de simulation pour évaluer les économies d'énergie potentielles (PAC, ITE) et l'éligibilité aux aides financières (MaPrimeRénov', CEE) pour la rénovation globale.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "All"
        }),
      },
    ],
  }),
  component: SimulationPage,
});

function SimulationPage() {
  return (
    <PageShell>
      <section className="px-5 pb-8 pt-14 sm:px-8 sm:pb-10 sm:pt-18 lg:px-12 bg-[#f2efe7]">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#a45f2d]">
              Simulation énergétique
            </p>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-medium leading-[1.04] tracking-[-0.045em] sm:text-6xl">
              Découvrez le potentiel de votre projet.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#617067]">
              Obtenez une première évaluation de vos besoins thermiques et de votre éligibilité aux aides financières de l'État (MaPrimeRénov', primes CEE) en amont de votre audit énergétique réglementaire.
            </p>
          </div>
          <div className="grid gap-3 border-t border-[#cec7bb] pt-6 text-sm text-[#45554b]">
            {[
              "Réponses conservées uniquement dans le navigateur",
              "Estimation indicative et non contractuelle",
              "Aucun engagement",
            ].map((item) => (
              <p key={item} className="flex items-center gap-3">
                <Check className="size-4 text-[#9a6034]" aria-hidden />
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>
      <section id="simulateur" className="scroll-mt-28 px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12 bg-[#f2efe7]">
        <Simulator variant="campaign" />
      </section>
      <section className="border-t border-[#d2cbbf] bg-[#e7ebe3] px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl items-start gap-4 text-xs leading-6 text-[#5b685f]">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#496153]" aria-hidden />
          <p>
            Ce simulateur fournit une orientation à partir des informations saisies. Une étude
            adaptée au logement reste nécessaire avant de choisir des travaux ou de s’engager.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
