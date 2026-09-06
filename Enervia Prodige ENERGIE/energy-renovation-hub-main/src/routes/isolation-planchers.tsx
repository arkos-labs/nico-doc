import { createFileRoute } from "@tanstack/react-router";
import { BASE_URL } from "@/lib/site-identity";
import { SiloPage } from "@/components/site/SiloPage";

const title = "Isolation des planchers bas : vide sanitaire, sous-sol et dalle";
const description =
  "Les planchers bas représentent 7 à 10 % des déperditions. Isolation par le dessous (vide sanitaire) ou par le dessus (chape) : techniques, matériaux et aides en 2026.";

export const Route = createFileRoute("/isolation-planchers")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${BASE_URL}/isolation-planchers` },
      { property: "og:image", content: `${BASE_URL}/og-default.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/isolation-planchers` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Peut-on isoler un plancher par le dessous depuis un vide sanitaire ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Oui, c'est la technique de référence pour les planchers sur vide sanitaire. Des panneaux rigides ou de la laine minérale sont fixés sous le plancher depuis l'intérieur du vide sanitaire, sans travaux lourds ni perte de surface habitable.",
              },
            },
            {
              "@type": "Question",
              name: "Quelle résistance thermique minimum pour un plancher bas ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "La réglementation thermique pour la rénovation (RT Ex) recommande R ≥ 3 m².K/W pour les planchers bas sur vide sanitaire ou sous-sol non chauffé. C'est également le seuil requis pour l'éligibilité aux aides MaPrimeRénov'.",
              },
            },
            {
              "@type": "Question",
              name: "L'isolation du plancher bas est-elle compatible avec un plancher chauffant existant ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Oui, à condition d'isoler par le dessous (en vide sanitaire ou sous-sol). Une isolation par le dessus recouvrira les tubes chauffants et réduira fortement les performances du plancher chauffant. Consultez un professionnel avant d'engager les travaux.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <SiloPage
      slug="isolation-planchers"
      eyebrow="Isolation thermique"
      h1="Isolation des planchers bas : éliminer le froid venant du sol."
      intro="Souvent négligée, l'isolation des planchers bas traite le froid qui remonte du vide sanitaire ou du sous-sol. Un geste complémentaire aux autres travaux pour un confort thermique complet."
      highlights={[
        {
          value: "7–10 %",
          label: "Des déperditions thermiques passent par les planchers bas non isolés",
        },
        {
          value: "R ≥ 3",
          label: "Résistance thermique minimale requise (m².K/W) pour les aides",
        },
        {
          value: "Sans perte",
          label: "D'espace habitable en isolant par le dessous depuis le vide sanitaire",
        },
      ]}
      sections={[
        {
          heading: "01. Isolation par le dessous (vide sanitaire)",
          body: "Pour les logements avec vide sanitaire accessible, l'isolation s'effectue depuis le dessous du plancher. Des panneaux rigides (PSE, PIR, laine de roche) sont collés ou fixés mécaniquement sous le plancher sans toucher à la surface de vie. C'est la solution privilégiée : sans perturbation des occupants et sans perte de surface.",
          bullets: [
            "Panneaux rigides PSE ou PIR : λ ≈ 0,022–0,038 W/m.K, résistance à l'humidité",
            "Laine de roche en vide sanitaire : bonne tenue mécanique, résistance au feu",
            "Fixation mécanique (chevilles) ou collage selon la nature du support",
            "Hauteur minimale de vide sanitaire recommandée : 40–50 cm pour intervenir",
          ],
          callout:
            "Avant les travaux, vérifiez l'état du vide sanitaire : ventilation, absence d'humidité excessive, état de la structure. Un vide sanitaire mal ventilé peut concentrer le radon.",
        },
        {
          heading: "02. Isolation par le dessus (chape ou plancher rapporté)",
          body: "Lorsque le vide sanitaire est inaccessible ou inexistant (dalle sur terre-plein), l'isolation peut s'effectuer par le dessus avant la pose d'une chape ou d'un plancher rapporté. Cette technique est souvent réalisée lors d'une rénovation lourde ou d'un changement de revêtement de sol.",
          bullets: [
            "Panneaux de polystyrène extrudé (XPS) sous chape : très résistants à la compression",
            "PSE sous plancher flottant : solution économique pour les rénovations légères",
            "Perte de hauteur sous plafond : anticiper l'impact sur les portes et escaliers",
            "Incompatible avec un plancher chauffant hydraulique existant sans étude préalable",
          ],
        },
        {
          heading: "03. Isolation sur sous-sol ou cave non chauffé",
          body: "Pour les logements avec sous-sol ou cave non chauffés, le plancher du rez-de-chaussée est la frontière thermique. La technique est similaire à celle du vide sanitaire : isoler le plafond du sous-sol depuis l'intérieur de celui-ci, ce qui correspond au plancher bas du logement.",
          bullets: [
            "Fixation sous le plancher du RDC depuis l'intérieur du sous-sol",
            "Panneaux rigides ou semi-rigides selon la régularité du support",
            "Traitez également les parois du sous-sol si elles jouxtent le volume chauffé",
            "Pare-vapeur non nécessaire dans ce sens de pose (pas de condensation vers le bas)",
          ],
          callout:
            "Un sous-sol peut devenir un espace semi-chauffé (garage, cave à température modérée) si l'on isole ses murs plutôt que le plancher — analyser les deux scénarios avec un professionnel.",
        },
        {
          heading: "04. Matériaux et performances",
          body: "Les planchers bas sont soumis à des contraintes mécaniques (charge des occupants) et hygrométriques (humidité du sol) qui orientent le choix des matériaux. La résistance à l'humidité et la tenue mécanique priment sur d'autres critères.",
          bullets: [
            "XPS (polystyrène extrudé) : λ ≈ 0,028–0,035 W/m.K, imputrescible, résistant",
            "PIR (polyisocyanurate) : λ ≈ 0,022–0,025 W/m.K, très mince, haute performance",
            "PSE graphité : λ ≈ 0,030–0,033 W/m.K, bon rapport performance/prix",
            "Laine de roche semi-rigide : si hygrométrie maîtrisée, bon comportement au feu",
          ],
        },
        {
          heading: "05. Aides financières disponibles",
          body: "L'isolation des planchers bas est éligible à MaPrimeRénov' par geste et aux CEE. Comme pour tout geste d'isolation, un artisan certifié RGE est obligatoire pour déclencher les aides.",
          bullets: [
            "MaPrimeRénov' par geste : de 7 à 14 €/m² selon la catégorie de revenus",
            "CEE cumulables avec MaPrimeRénov' pour réduire le reste à charge",
            "TVA réduite à 5,5 % sur la fourniture et la pose",
            "Artisan certifié RGE Qualibat ou RGE QualiRenov obligatoire",
          ],
          callout:
            "L'isolation des planchers bas offre un retour sur investissement intéressant, notamment dans les logements avec vide sanitaire non isolé et ressenti de « sol froid ».",
        },
      ]}
      faqs={[
        {
          question: "Peut-on isoler un plancher par le dessous depuis un vide sanitaire ?",
          answer:
            "Oui, c'est la technique de référence pour les planchers sur vide sanitaire. Des panneaux rigides ou de la laine minérale sont fixés sous le plancher depuis l'intérieur du vide sanitaire, sans travaux lourds ni perte de surface habitable.",
        },
        {
          question: "Quelle résistance thermique minimum pour un plancher bas ?",
          answer:
            "La réglementation thermique pour la rénovation (RT Ex) recommande R ≥ 3 m².K/W pour les planchers bas sur vide sanitaire ou sous-sol non chauffé. C'est également le seuil requis pour l'éligibilité aux aides MaPrimeRénov'.",
        },
        {
          question: "L'isolation du plancher bas est-elle compatible avec un plancher chauffant existant ?",
          answer:
            "Oui, à condition d'isoler par le dessous (en vide sanitaire ou sous-sol). Une isolation par le dessus recouvrira les tubes chauffants et réduira fortement les performances du plancher chauffant. Consultez un professionnel avant d'engager les travaux.",
        },
      ]}
    />
  ),
});
