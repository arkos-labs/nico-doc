import { createFileRoute } from "@tanstack/react-router";
import { BASE_URL } from "@/lib/site-identity";
import { SiloPage } from "@/components/site/SiloPage";

const title = "VMC double flux : ventilation saine et performante";
const description =
  "VMC simple flux, double flux avec échangeur : comparatif des systèmes, performances thermiques et conditions d'installation pour une maison bien isolée.";

export const Route = createFileRoute("/vmc-ventilation")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${BASE_URL}/vmc-ventilation` },
      { property: "og:image", content: `${BASE_URL}/og-default.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/vmc-ventilation` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Quelle est la différence entre VMC simple flux et double flux ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "La VMC simple flux extrait l'air vicié et laisse entrer l'air neuf par des entrées d'air en façade, sans récupération de chaleur. La VMC double flux extrait l'air vicié ET insuffle l'air neuf filtré et préchauffé via un échangeur thermique, permettant de récupérer jusqu'à 90 % de la chaleur de l'air sortant.",
              },
            },
            {
              "@type": "Question",
              name: "La VMC double flux est-elle obligatoire pour une rénovation BBC ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Non, elle n'est pas obligatoire au sens réglementaire. Mais pour atteindre le label BBC Rénovation ou les meilleures classes DPE (A ou B), une VMC double flux est fortement recommandée car elle compense les pertes thermiques par renouvellement d'air dans un bâtiment très étanche.",
              },
            },
            {
              "@type": "Question",
              name: "Quel entretien faut-il prévoir pour une VMC ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Une VMC simple flux nécessite le nettoyage annuel des bouches d'extraction et la vérification des débits. La VMC double flux exige en plus le remplacement régulier des filtres (tous les 3 à 6 mois) et le nettoyage de l'échangeur thermique annuellement.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <SiloPage
      slug="vmc-ventilation"
      eyebrow="Qualité de l'air"
      h1="VMC : ventiler efficacement pour préserver la qualité de l'air et l'isolation."
      intro="Plus un logement est isolé, plus la ventilation est critique. Une VMC bien dimensionnée renouvelle l'air, élimine l'humidité et, avec la double flux, récupère jusqu'à 90 % de la chaleur extraite."
      highlights={[
        {
          value: "90 %",
          label: "De la chaleur de l'air extrait récupérée par l'échangeur d'une VMC double flux",
        },
        {
          value: "Réglementation",
          label: "Arrêté du 24 mars 1982 : la ventilation est obligatoire dans tout logement",
        },
        {
          value: "Air sain",
          label: "Renouvellement d'air continu pour éliminer CO₂, COV, humidité et allergènes",
        },
      ]}
      sections={[
        {
          heading: "01. VMC simple flux autoréglable",
          body: "La VMC simple flux est la solution la plus répandue en France. Un caisson centralisé extrait l'air vicié depuis les pièces humides (cuisine, salles de bain, WC) par des gaines. L'air neuf entre par des entrées d'air fixes en façade dans les pièces de vie. Aucune récupération de chaleur.",
          bullets: [
            "Débit d'extraction constant (autoréglable) ou variable selon le taux d'humidité (hygroréglable)",
            "Hygroréglable de type B : recommandée, adapte les débits aux besoins réels",
            "Coût d'installation accessible : 800 à 2 000 € selon la surface",
            "Entretien : nettoyage annuel des bouches + vérification des débits",
          ],
          callout:
            "La VMC hygroréglable de type B est la solution minimum recommandée par la réglementation pour les logements existants. Elle adapte les débits au taux d'humidité réel.",
        },
        {
          heading: "02. VMC double flux avec récupération de chaleur",
          body: "La VMC double flux traite simultanément l'air entrant et l'air sortant. Un échangeur thermique transfère la chaleur de l'air vicié extrait vers l'air neuf insufflé, sans les mélanger. Le résultat : un renouvellement d'air complet avec des pertes thermiques divisées par 5 à 10.",
          bullets: [
            "Efficacité de l'échangeur : 75 à 93 % selon les modèles (label Passivhaus)",
            "Filtration de l'air entrant : filtres G4, F7 ou Hepa selon les gammes",
            "Insufflation d'air tempéré dans les pièces de vie (chambres, salon)",
            "Caisson double flux centralisé ou unités décentralisées pièce par pièce",
          ],
          callout:
            "La VMC double flux est particulièrement indiquée après des travaux d'isolation renforcée : plus le logement est étanche, plus les gains de la double flux sont importants.",
        },
        {
          heading: "03. Étanchéité à l'air et ventilation",
          body: "L'isolation et la ventilation sont indissociables. Un logement rénové sans VMC performante accumule humidité, condensation et COV. Inversement, une VMC sans isolation thermique performante ventile à perte. Les deux gestes se renforcent mutuellement.",
          bullets: [
            "Test de perméabilité à l'air (BlowerDoor) recommandé après isolation renforcée",
            "Objectif BBC Rénovation : n50 ≤ 1 m³/h.m² de paroi (très étanche)",
            "Ponts thermiques résiduels révélés par thermographie infrarouge",
            "VMC double flux indispensable pour les rénovations visant les labels A ou B DPE",
          ],
        },
        {
          heading: "04. Ventilation décentralisée (VRC)",
          body: "Alternative à la VMC centralisée, les ventilateurs récupérateurs de chaleur (VRC) décentralisés s'installent en façade, pièce par pièce. Chaque unité assure l'extraction et l'insufflation avec récupération de chaleur sans réseau de gaines. Idéal pour les rénovations difficiles à gaîner.",
          bullets: [
            "Installation sans réseau de gaines : idéal pour les logements difficiles",
            "Fonctionnement alterné (extraction puis insufflation) sur accumulation thermique",
            "Rendement légèrement inférieur aux doubles flux centralisées (70–80 %)",
            "Pose possible pièce par pièce, sans travaux lourds de placo ou faux-plafond",
          ],
          callout:
            "La VRC décentralisée est une bonne solution pour les appartements en copropriété ou les logements avec des contraintes architecturales importantes.",
        },
        {
          heading: "05. Réglementation et aides",
          body: "La ventilation est obligatoire dans tout logement selon l'arrêté du 24 mars 1982. Le remplacement d'une VMC ancienne ou l'installation d'une VMC double flux peut bénéficier de CEE. La VMC double flux est également valorisée dans les dossiers de rénovation d'ampleur.",
          bullets: [
            "CEE (fiche BAR-TH-125) : prime pour l'installation d'une VMC double flux",
            "TVA réduite à 5,5 % sur la fourniture et la pose",
            "Artisan certifié RGE QualAir recommandé pour bénéficier des CEE",
            "Entretien obligatoire : nettoyage des filtres tous les 3–6 mois, échangeur annuellement",
          ],
          callout:
            "Les montants des CEE pour la VMC double flux varient selon les obligés. Comparez les offres de plusieurs fournisseurs d'énergie pour obtenir la meilleure prime.",
        },
      ]}
      faqs={[
        {
          question: "Quelle est la différence entre VMC simple flux et double flux ?",
          answer:
            "La VMC simple flux extrait l'air vicié et laisse entrer l'air neuf par des entrées d'air en façade, sans récupération de chaleur. La VMC double flux extrait l'air vicié ET insuffle l'air neuf filtré et préchauffé via un échangeur thermique, permettant de récupérer jusqu'à 90 % de la chaleur de l'air sortant.",
        },
        {
          question: "La VMC double flux est-elle obligatoire pour une rénovation BBC ?",
          answer:
            "Non, elle n'est pas obligatoire au sens réglementaire. Mais pour atteindre le label BBC Rénovation ou les meilleures classes DPE (A ou B), une VMC double flux est fortement recommandée car elle compense les pertes thermiques par renouvellement d'air dans un bâtiment très étanche.",
        },
        {
          question: "Quel entretien faut-il prévoir pour une VMC ?",
          answer:
            "Une VMC simple flux nécessite le nettoyage annuel des bouches d'extraction et la vérification des débits. La VMC double flux exige en plus le remplacement régulier des filtres (tous les 3 à 6 mois) et le nettoyage de l'échangeur thermique annuellement.",
        },
      ]}
    />
  ),
});
