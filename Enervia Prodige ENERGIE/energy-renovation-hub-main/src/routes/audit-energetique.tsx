import { createFileRoute } from "@tanstack/react-router";
import { BASE_URL } from "@/lib/site-identity";
import { SiloPage } from "@/components/site/SiloPage";

const title = "Audit énergétique réglementaire 2026 : obligation et démarches";
const description =
  "L'audit énergétique réglementaire est obligatoire avant la vente de logements classés F ou G. Contenu, coût, validité et différence avec le DPE : tout comprendre.";

export const Route = createFileRoute("/audit-energetique")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${BASE_URL}/audit-energetique` },
      { property: "og:image", content: `${BASE_URL}/og-default.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/audit-energetique` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Qui est concerné par l'obligation d'audit énergétique ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "L'audit énergétique réglementaire est obligatoire depuis le 1er avril 2023 pour la vente de maisons individuelles et d'immeubles en monopropriété classés F ou G au DPE. Il sera étendu aux logements classés E à partir de 2025, puis aux logements classés D à partir de 2034.",
              },
            },
            {
              "@type": "Question",
              name: "Quelle est la différence entre un DPE et un audit énergétique ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Le DPE (valable 10 ans) indique la classe énergétique du logement (A à G) et consommation en kWh/m². L'audit énergétique réglementaire (valable 5 ans) va plus loin : il propose au minimum deux scénarios de travaux chiffrés permettant d'atteindre la classe B, avec estimation du coût, des économies d'énergie et des aides mobilisables.",
              },
            },
            {
              "@type": "Question",
              name: "Combien coûte un audit énergétique réglementaire ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Le coût d'un audit énergétique réglementaire varie selon la taille et la complexité du logement. Il est réalisé par un auditeur certifié RGE. Cet audit est une étape obligatoire pour accéder au parcours accompagné MaPrimeRénov' (rénovation d'ampleur), dont il est intégralement intégrable dans le plan de financement.",
              },
            },
            {
              "@type": "Question",
              name: "L'audit énergétique est-il obligatoire pour obtenir MaPrimeRénov' ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Oui, pour le parcours accompagné (rénovation d'ampleur). L'audit énergétique réglementaire est obligatoire et doit être réalisé avant le début des travaux. Il est en revanche facultatif pour le parcours par geste (travaux isolés) de MaPrimeRénov'.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <SiloPage
      slug="audit-energetique"
      eyebrow="Réglementation énergétique"
      h1="Audit énergétique réglementaire : l'étape clé avant toute rénovation globale."
      intro="Obligatoire depuis 2023 pour la vente des passoires thermiques (F et G), l'audit énergétique réglementaire est aussi la porte d'entrée du parcours accompagné MaPrimeRénov'. Il va bien au-delà du DPE : il propose des scénarios de travaux concrets et chiffrés."
      highlights={[
        {
          value: "Obligatoire",
          label: "Pour la vente de logements classés F et G en monopropriété depuis avril 2023",
        },
        {
          value: "5 ans",
          label: "Durée de validité de l'audit, contre 10 ans pour le DPE",
        },
        {
          value: "Classe B",
          label: "Objectif cible des scénarios de travaux proposés dans l'audit",
        },
      ]}
      sections={[
        {
          heading: "01. Qu'est-ce que l'audit énergétique réglementaire ?",
          body: "L'audit énergétique réglementaire est une étude approfondie du logement réalisée par un auditeur certifié RGE (Reconnu Garant de l'Environnement). Il va bien au-delà du simple DPE en proposant des scénarios de travaux chiffrés et hiérarchisés pour améliorer significativement la performance énergétique du logement.",
          bullets: [
            "Analyse complète de l'enveloppe du bâtiment (toiture, murs, fenêtres, planchers)",
            "Étude des systèmes de chauffage, de ventilation et de production d'eau chaude",
            "Proposition d'au moins deux scénarios de travaux atteignant la classe B",
            "Estimation des économies d'énergie, du coût des travaux et des aides mobilisables",
            "Identification des aides financières applicables (MaPrimeRénov', CEE, éco-PTZ)",
          ],
          callout:
            "L'audit énergétique réglementaire est obligatoire pour accéder au parcours accompagné MaPrimeRénov' (rénovation d'ampleur), qui ouvre droit aux taux d'aide les plus élevés.",
        },
        {
          heading: "02. Quand l'audit est-il obligatoire ?",
          body: "La loi Climat et Résilience a instauré l'obligation de fournir un audit énergétique lors de la vente de certains logements. Le calendrier d'entrée en vigueur est progressif selon la classe DPE du bien.",
          bullets: [
            "Depuis le 1er avril 2023 : logements classés F et G en monopropriété",
            "À partir de 2025 : extension aux logements classés E (en cours de confirmation réglementaire)",
            "À partir de 2034 : extension aux logements classés D",
            "Concerne les maisons individuelles et les immeubles en monopropriété (un seul propriétaire)",
            "Ne concerne pas encore les lots de copropriété",
          ],
          callout:
            "Un logement vendu sans l'audit obligatoire peut engager la responsabilité du vendeur et faire l'objet d'une action en garantie des vices cachés.",
        },
        {
          heading: "03. Contenu d'un audit réglementaire",
          body: "L'arrêté du 4 mai 2022 fixe précisément le contenu obligatoire de l'audit énergétique réglementaire. Il doit obligatoirement être réalisé par un professionnel certifié selon des méthodes de calcul réglementaires (3CL-DPE ou méthode de simulation thermique dynamique).",
          bullets: [
            "État des lieux complet du logement et de ses systèmes énergétiques",
            "Estimation de la consommation d'énergie actuelle en kWh EP/m².an",
            "Proposition d'au moins 2 scénarios de travaux progressifs ou globaux",
            "Chaque scénario inclut : gain de classe DPE, coût estimatif, aides financières",
            "Le scénario le plus ambitieux doit viser la classe B ou A",
            "Durée de validité de l'audit : 5 ans",
          ],
        },
        {
          heading: "04. Audit et MaPrimeRénov' parcours accompagné",
          body: "Pour les projets de rénovation d'ampleur (gain d'au moins 2 classes DPE), l'audit énergétique réglementaire est le point de départ obligatoire. Il permet de définir le programme de travaux, de mandater un MonAccompagnateurRénov' (MAR) et d'accéder aux taux d'aide les plus élevés de MaPrimeRénov'.",
          bullets: [
            "Audit obligatoire avant tout engagement de travaux dans le parcours accompagné",
            "Le MAR (MonAccompagnateurRénov') s'appuie sur l'audit pour piloter le projet",
            "Le coût de l'audit est intégrable dans le plan de financement MaPrimeRénov'",
            "Taux d'aide pouvant atteindre 80 % pour les ménages très modestes",
            "Plafond de travaux aidés : jusqu'à 70 000 € dans le parcours accompagné",
          ],
          callout:
            "Un audit réalisé avant les travaux est aussi un levier de négociation lors d'une vente : il permet d'anticiper les objections de l'acheteur et de valoriser le potentiel de rénovation du bien.",
        },
      ]}
      faqs={[
        {
          question: "Qui peut réaliser un audit énergétique réglementaire ?",
          answer:
            "L'audit doit être réalisé par un professionnel certifié : bureau d'études thermiques disposant de la certification RGE Audit, architecte ou thermicien qualifié. L'auditeur doit être indépendant du maître d'ouvrage et des entreprises de travaux.",
        },
        {
          question: "L'audit énergétique est-il pris en charge par les aides ?",
          answer:
            "Dans le cadre du parcours accompagné MaPrimeRénov', le coût de l'audit énergétique réglementaire est éligible à une prise en charge partielle. Par ailleurs, certaines collectivités locales proposent des aides complémentaires. Renseignez-vous auprès de votre conseiller France Rénov'.",
        },
        {
          question: "Un DPE suffit-il pour vendre un logement classé F ou G ?",
          answer:
            "Non. Depuis le 1er avril 2023, un DPE ne suffit plus pour les logements classés F ou G en monopropriété : un audit énergétique réglementaire complet doit être annexé à la promesse de vente et à l'acte définitif.",
        },
        {
          question: "Quelle est la durée de validité d'un audit énergétique ?",
          answer:
            "L'audit énergétique réglementaire est valable 5 ans, contre 10 ans pour le DPE. Au-delà, un nouvel audit doit être commandé si le bien n'a pas encore fait l'objet de travaux de rénovation.",
        },
      ]}
    />
  ),
});
