import { createFileRoute } from "@tanstack/react-router";
import { BASE_URL } from "@/lib/site-identity";
import { SiloPage } from "@/components/site/SiloPage";

const title = "Isolation des combles : la priorité de toute rénovation énergétique";
const description =
  "Les combles sont responsables de 25 à 30 % des déperditions thermiques. Soufflage, rouleaux ou panneaux : comparatif des techniques et des aides disponibles en 2026.";

export const Route = createFileRoute("/isolation-combles")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${BASE_URL}/isolation-combles` },
      { property: "og:image", content: `${BASE_URL}/og-default.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/isolation-combles` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Quelle épaisseur d'isolation faut-il pour les combles perdus ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "La réglementation recommande une résistance thermique R ≥ 7 m².K/W pour les combles perdus, soit environ 30 à 40 cm de laine soufflée selon le matériau. C'est le seuil exigé pour bénéficier de MaPrimeRénov'.",
              },
            },
            {
              "@type": "Question",
              name: "Combles perdus ou combles aménagés : quelle différence ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Dans les combles perdus (non habitables), on isole le plancher du grenier. Dans les combles aménagés (habitables), on isole la toiture par l'intérieur (sarking ou rampants). Les techniques et coûts diffèrent significativement.",
              },
            },
            {
              "@type": "Question",
              name: "L'isolation des combles est-elle éligible à MaPrimeRénov' en 2026 ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Oui, l'isolation des combles (toiture et rampants) reste éligible à MaPrimeRénov' par geste en 2026. Elle fait partie des gestes prioritaires reconnus par l'ANAH. Un artisan RGE est obligatoire pour bénéficier des aides.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <SiloPage
      slug="isolation-combles"
      eyebrow="Isolation thermique"
      h1="Isolation des combles : jusqu'à 30 % de déperditions à éliminer en priorité."
      intro="Le toit est le premier poste de déperditions thermiques d'un logement. Bien isoler les combles, qu'ils soient perdus ou aménagés, est le geste de rénovation au meilleur rapport coût/efficacité."
      highlights={[
        {
          value: "25–30 %",
          label: "Des déperditions thermiques passent par le toit dans un logement mal isolé",
        },
        {
          value: "R ≥ 7",
          label: "Résistance thermique minimale requise pour les aides MaPrimeRénov'",
        },
        {
          value: "2 à 5 ans",
          label: "Retour sur investissement moyen pour l'isolation des combles perdus",
        },
      ]}
      sections={[
        {
          heading: "01. Combles perdus : le soufflage",
          body: "Pour les combles non habitables (dits « perdus »), le soufflage de laine minérale (laine de verre ou de roche) ou de ouate de cellulose est la technique la plus économique et la plus rapide. Des machines projetent le matériau en vrac sur le plancher du grenier pour atteindre l'épaisseur cible.",
          bullets: [
            "Mise en œuvre rapide : une journée pour la plupart des maisons individuelles",
            "Coût moyen : 20 à 35 €/m² fourniture et pose selon le matériau",
            "Laine de verre ou de roche : bon rapport prix/performance, résistant au feu",
            "Ouate de cellulose : matériau biosourcé, régulation hygrométrique naturelle",
          ],
          callout:
            "Avant soufflage, vérifiez l'état de la charpente, l'absence de mérule et la présence d'un frein-vapeur côté chaud (sous le plancher du grenier).",
          visual: (
            <figure className="overflow-hidden rounded border border-[#d2ccc1] bg-white shadow-sm">
              <div className="border-b border-[#e8e2d8] bg-[#f8f5f0] px-5 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9a6034]">Schéma de principe</p>
                <p className="mt-1 text-base font-semibold text-[#17221c]">Isolation des combles — soufflage et rampants</p>
              </div>
              <img
                src="/schema-isolation-combles.webp"
                alt="Schéma de principe de l'isolation des combles perdus par soufflage de laine minérale et de l'isolation des rampants pour combles aménagés"
                className="w-full"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="border-t border-[#e8e2d8] px-5 py-3 text-xs leading-5 text-[#8a948e]">
                Combles perdus : soufflage en vrac sur le plancher du grenier (R ≥ 7). Combles aménagés : isolation entre et sous-chevrons avec frein-vapeur côté chaud.
              </figcaption>
            </figure>
          ),
        },
        {
          heading: "02. Combles perdus : rouleaux et panneaux",
          body: "En complément ou en alternative au soufflage, les rouleaux de laine minérale ou les panneaux rigides permettent une isolation en deux couches croisées pour limiter les ponts thermiques. Cette technique est plus adaptée aux combles accessibles et bien planes.",
          bullets: [
            "Pose en deux couches croisées pour supprimer les ponts thermiques aux solives",
            "Panneaux rigides en fibre de bois ou PSE : résistance à l'humidité accrue",
            "Nécessite une sous-toiture étanche à l'air pour éviter les infiltrations",
            "Compatible avec un accès pompier (trappe d'accès obligatoire à maintenir)",
          ],
        },
        {
          heading: "03. Combles aménagés : isolation des rampants",
          body: "Lorsque les combles sont habitables, l'isolation se fait par l'intérieur le long des rampants de toiture. La technique la plus courante est l'isolation entre et sous-chevrons, associée à un frein-vapeur et un doublage intérieur. Le sarking (isolation sous couverture) est réservé aux travaux de réfection de toiture.",
          bullets: [
            "Entre-chevrons + sous-chevrons : solution la plus répandue en rénovation",
            "Frein-vapeur obligatoire côté chaud pour éviter les condensations dans la paroi",
            "Sarking : isolation au-dessus des chevrons lors d'une réfection de couverture",
            "Vérification de la ventilation de la lame d'air sous couverture (VMC indispensable)",
          ],
          callout:
            "Les combles aménagés nécessitent une attention particulière à l'étanchéité à l'air : chaque défaut génère des ponts thermiques et des risques de condensation.",
        },
        {
          heading: "04. Matériaux et performances",
          body: "Le choix du matériau isolant dépend de la performance thermique recherchée, du budget, de l'exigence environnementale et des contraintes techniques du chantier. Chaque matériau présente des caractéristiques spécifiques à évaluer avec l'entreprise.",
          bullets: [
            "Laine de verre : λ ≈ 0,032–0,040 W/m.K, économique, réaction au feu A1",
            "Laine de roche : λ ≈ 0,034–0,042 W/m.K, résistance au feu supérieure",
            "Ouate de cellulose : λ ≈ 0,038–0,042 W/m.K, biosourcée, recyclée",
            "Fibre de bois : λ ≈ 0,038–0,052 W/m.K, déphasage thermique estival excellent",
          ],
          callout:
            "La valeur λ (lambda) mesure la conductivité thermique : plus elle est faible, plus le matériau isole. La résistance R = épaisseur / λ.",
        },
        {
          heading: "05. Aides et éligibilité",
          body: "L'isolation des combles et de la toiture est éligible à MaPrimeRénov' par geste en 2026. C'est l'un des gestes de rénovation les mieux aidés, avec des montants significatifs pour les ménages aux revenus modestes.",
          bullets: [
            "MaPrimeRénov' par geste : de 25 à 75 €/m² selon la catégorie de revenus",
            "CEE (Certificats d'Économies d'Énergie) cumulables avec MaPrimeRénov'",
            "TVA réduite à 5,5 % sur la fourniture et la pose",
            "Artisan certifié RGE Qualibat ou RGE QualiRenov obligatoire",
          ],
          callout:
            "L'isolation des combles perdus par soufflage est souvent la première recommandation des conseillers France Rénov' en raison de son excellent rapport coût/efficacité.",
        },
      ]}
      faqs={[
        {
          question: "Quelle épaisseur d'isolation faut-il pour les combles perdus ?",
          answer:
            "La réglementation recommande une résistance thermique R ≥ 7 m².K/W pour les combles perdus, soit environ 30 à 40 cm de laine soufflée selon le matériau. C'est le seuil exigé pour bénéficier de MaPrimeRénov'.",
        },
        {
          question: "Combles perdus ou combles aménagés : quelle différence ?",
          answer:
            "Dans les combles perdus (non habitables), on isole le plancher du grenier. Dans les combles aménagés (habitables), on isole la toiture par l'intérieur (sarking ou rampants). Les techniques et coûts diffèrent significativement.",
        },
        {
          question: "L'isolation des combles est-elle éligible à MaPrimeRénov' en 2026 ?",
          answer:
            "Oui, l'isolation des combles (toiture et rampants) reste éligible à MaPrimeRénov' par geste en 2026. Elle fait partie des gestes prioritaires reconnus par l'ANAH. Un artisan RGE est obligatoire pour bénéficier des aides.",
        },
      ]}
    />
  ),
});
