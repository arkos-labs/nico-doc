import { createFileRoute } from "@tanstack/react-router";
import { BASE_URL } from "@/lib/site-identity";
import { SiloPage } from "@/components/site/SiloPage";

const title = "Isolation des murs : ITE et ITI pour éliminer les ponts thermiques";
const description =
  "L'isolation thermique par l'extérieur (ITE) ou par l'intérieur (ITI) traite 20 à 25 % des déperditions. Comparatif des techniques, contraintes réglementaires et aides 2026.";

export const Route = createFileRoute("/isolation-murs")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${BASE_URL}/isolation-murs` },
      { property: "og:image", content: `${BASE_URL}/og-default.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/isolation-murs` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "L'ITE est-elle éligible à MaPrimeRénov' en 2026 ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Depuis le 1er janvier 2026, l'isolation thermique par l'extérieur (ITE) est exclue du dispositif MaPrimeRénov' par geste. Elle reste éligible dans le cadre d'une rénovation d'ampleur (parcours accompagné MonAccompagnateurRénov'). Un rendez-vous préalable France Rénov' est obligatoire.",
              },
            },
            {
              "@type": "Question",
              name: "ITE ou ITI : quelle solution choisir ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "L'ITE est préférable techniquement car elle traite les ponts thermiques structurels et préserve l'inertie thermique des murs. Elle exige une autorisation d'urbanisme. L'ITI est moins coûteuse et ne nécessite pas d'autorisation, mais réduit la surface habitable et ne traite pas les ponts thermiques.",
              },
            },
            {
              "@type": "Question",
              name: "Faut-il une autorisation pour faire une ITE ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Oui. L'ITE modifie l'aspect extérieur du bâtiment et nécessite une déclaration préalable de travaux en mairie (voire un permis de construire dans les zones protégées). Vérifiez les règles du PLU et consultez votre mairie avant d'engager les travaux.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <SiloPage
      slug="isolation-murs"
      eyebrow="Isolation thermique"
      h1="Isolation des murs : ITE ou ITI, traiter 20 % des déperditions."
      intro="Les murs sont responsables de 20 à 25 % des pertes de chaleur d'un logement. L'isolation thermique par l'extérieur (ITE) ou par l'intérieur (ITI) sont deux approches complémentaires selon la configuration du bâtiment."
      highlights={[
        {
          value: "20–25 %",
          label: "Des déperditions thermiques passent par les murs dans un logement mal isolé",
        },
        {
          value: "ITE",
          label: "Technique de référence : traite les ponts thermiques sans perte de surface",
        },
        {
          value: "R ≥ 3,7",
          label: "Résistance thermique minimale exigée pour les murs (rénovation ampleur)",
        },
      ]}
      sections={[
        {
          heading: "01. Isolation Thermique par l'Extérieur (ITE)",
          body: "L'ITE consiste à envelopper les murs du bâtiment d'un manteau isolant continu posé par l'extérieur, recouvert d'un enduit ou d'un bardage. C'est la solution techniquement la plus efficace car elle supprime les ponts thermiques structurels et préserve l'inertie thermique des murs existants.",
          bullets: [
            "Suppression des ponts thermiques aux jonctions mur/plancher et mur/refend",
            "Préservation de l'inertie thermique des murs (confort d'été amélioré)",
            "Aucune perte de surface habitable à l'intérieur",
            "Réfection de façade intégrée : deux travaux en un seul chantier",
          ],
          callout:
            "Depuis le 1er janvier 2026, l'ITE est exclue de MaPrimeRénov' par geste. Elle reste finançable dans le cadre d'une rénovation d'ampleur (parcours MonAccompagnateurRénov').",
          visual: (
            <figure className="overflow-hidden rounded border border-[#d2ccc1] bg-white shadow-sm">
              <div className="border-b border-[#e8e2d8] bg-[#f8f5f0] px-5 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9a6034]">Schéma comparatif</p>
                <p className="mt-1 text-base font-semibold text-[#17221c]">ITE vs ITI — isolation des murs</p>
              </div>
              <img
                src="/schema-isolation-murs.webp"
                alt="Schéma comparatif de l'isolation thermique par l'extérieur (ITE) et par l'intérieur (ITI) montrant le traitement des ponts thermiques et la perte de surface habitable"
                className="w-full"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="border-t border-[#e8e2d8] px-5 py-3 text-xs leading-5 text-[#8a948e]">
                ITE : manteau isolant continu en façade, sans perte de surface, ponts thermiques traités. ITI : isolation côté intérieur, moins coûteuse mais avec perte de 5 à 10 cm par mur.
              </figcaption>
            </figure>
          ),
        },
        {
          heading: "02. Autorisations d'urbanisme pour l'ITE",
          body: "L'ITE modifie l'aspect extérieur du bâtiment, ce qui la soumet à des obligations déclaratives auprès de la mairie. Ces démarches sont à anticiper impérativement avant tout début de chantier, sous peine d'infraction aux règles d'urbanisme.",
          bullets: [
            "Déclaration préalable de travaux obligatoire dans la plupart des communes",
            "Permis de construire requis en zone protégée (secteur sauvegardé, ABF)",
            "Vérification du PLU : recul, prospect, hauteur, aspect des façades",
            "Copropriété : accord de l'assemblée générale requis pour les parties communes",
          ],
          callout:
            "Dans les secteurs soumis à l'avis de l'Architecte des Bâtiments de France (ABF), les matériaux et couleurs sont imposés. Consultez votre mairie en amont.",
        },
        {
          heading: "03. Isolation Thermique par l'Intérieur (ITI)",
          body: "L'ITI consiste à poser un isolant sur la face interne des murs extérieurs, derrière un doublage (plaque de plâtre sur ossature ou collée). Moins coûteuse et plus simple à mettre en œuvre, elle ne nécessite aucune autorisation d'urbanisme mais présente des limitations techniques.",
          bullets: [
            "Aucune autorisation d'urbanisme requise",
            "Coût d'installation inférieur à l'ITE (pas d'échafaudage)",
            "Réduction de la surface habitable (5 à 10 cm perdus par mur traité)",
            "Ne supprime pas les ponts thermiques structurels (planchers, refends)",
          ],
          callout:
            "L'ITI doit s'accompagner d'un frein-vapeur côté chaud et d'une ventilation performante (VMC) pour éviter les condensations dans la paroi et les risques de moisissures.",
        },
        {
          heading: "04. Matériaux isolants pour les murs",
          body: "Le choix du matériau dépend de la technique retenue (ITE ou ITI), des performances visées, du budget et des exigences environnementales. Les matériaux biosourcés sont de plus en plus valorisés dans les critères d'attribution des aides.",
          bullets: [
            "Polystyrène expansé (PSE) : le plus courant en ITE enduit, λ ≈ 0,032–0,038 W/m.K",
            "Laine de roche : excellent pour l'ITE bardage et l'ITI (réaction au feu)",
            "Fibre de bois : biosourcé, excellent déphasage thermique, λ ≈ 0,038–0,052 W/m.K",
            "Laine de verre : standard en ITI sur ossature, λ ≈ 0,032–0,040 W/m.K",
          ],
        },
        {
          heading: "05. Aides disponibles en 2026",
          body: "Depuis le 1er janvier 2026, l'ITE est exclue du dispositif MaPrimeRénov' par geste. L'ITI reste éligible sous conditions. Dans les deux cas, la rénovation d'ampleur (parcours accompagné) permet d'accéder à des aides plus importantes.",
          bullets: [
            "ITI : toujours éligible à MaPrimeRénov' par geste avec un artisan RGE",
            "ITE : éligible uniquement dans le cadre d'une rénovation d'ampleur (MPR ampleur)",
            "CEE cumulables dans les deux cas avec les aides ANAH",
            "TVA réduite à 5,5 % sur la fourniture et la pose des deux solutions",
          ],
          callout:
            "Pour une rénovation d'ampleur incluant l'ITE, un MonAccompagnateurRénov' (MAR) agréé est obligatoire pour bénéficier de MaPrimeRénov' ampleur. France Rénov' peut vous orienter.",
        },
      ]}
      faqs={[
        {
          question: "L'ITE est-elle éligible à MaPrimeRénov' en 2026 ?",
          answer:
            "Depuis le 1er janvier 2026, l'isolation thermique par l'extérieur (ITE) est exclue du dispositif MaPrimeRénov' par geste. Elle reste éligible dans le cadre d'une rénovation d'ampleur (parcours accompagné MonAccompagnateurRénov'). Un rendez-vous préalable France Rénov' est obligatoire.",
        },
        {
          question: "ITE ou ITI : quelle solution choisir ?",
          answer:
            "L'ITE est préférable techniquement car elle traite les ponts thermiques structurels et préserve l'inertie thermique des murs. Elle exige une autorisation d'urbanisme. L'ITI est moins coûteuse et ne nécessite pas d'autorisation, mais réduit la surface habitable et ne traite pas les ponts thermiques.",
        },
        {
          question: "Faut-il une autorisation pour faire une ITE ?",
          answer:
            "Oui. L'ITE modifie l'aspect extérieur du bâtiment et nécessite une déclaration préalable de travaux en mairie (voire un permis de construire dans les zones protégées). Vérifiez les règles du PLU et consultez votre mairie avant d'engager les travaux.",
        },
      ]}
    />
  ),
});
