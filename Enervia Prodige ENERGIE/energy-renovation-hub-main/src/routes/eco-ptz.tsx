import { createFileRoute } from "@tanstack/react-router";
import { BASE_URL } from "@/lib/site-identity";
import { SiloPage } from "@/components/site/SiloPage";

const title = "Éco-PTZ 2026 : jusqu'à 50 000 € sans intérêts";
const description =
  "L'éco-PTZ finance jusqu'à 50 000 € de travaux de rénovation énergétique sans intérêts. Travaux éligibles, conditions et démarches complètes en 2026.";

export const Route = createFileRoute("/eco-ptz")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${BASE_URL}/eco-ptz` },
      { property: "og:image", content: `${BASE_URL}/og-default.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/eco-ptz` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Qui peut bénéficier de l'éco-PTZ en 2026 ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "L'éco-PTZ est accessible à tous les propriétaires (occupants ou bailleurs) d'un logement achevé avant le 1er janvier 1990, sans condition de revenus. Les locataires peuvent également en bénéficier avec l'accord du propriétaire. Le logement doit être la résidence principale du bénéficiaire.",
              },
            },
            {
              "@type": "Question",
              name: "Quel est le montant maximum de l'éco-PTZ en 2026 ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Le montant maximum de l'éco-PTZ est de 50 000 € pour une rénovation globale (rénovation d'ampleur). Il est de 30 000 € pour 3 types de travaux ou plus, de 25 000 € pour 2 types de travaux, et de 15 000 € pour 1 seul geste. Le prêt est sans intérêts et remboursable sur 20 ans maximum.",
              },
            },
            {
              "@type": "Question",
              name: "L'éco-PTZ est-il cumulable avec MaPrimeRénov' ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Oui, l'éco-PTZ est cumulable avec MaPrimeRénov' et les Certificats d'Économies d'Énergie (CEE). Il est particulièrement utile pour financer le reste à charge après déduction des aides. Depuis 2019, il n'y a plus de condition de revenus pour cumuler éco-PTZ et MaPrimeRénov'.",
              },
            },
            {
              "@type": "Question",
              name: "Dans quelle banque obtenir un éco-PTZ ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "L'éco-PTZ est distribué par les banques ayant signé une convention avec l'État. Les principales banques du réseau (Crédit Agricole, BNP Paribas, Société Générale, Caisse d'Épargne, Banque Populaire…) proposent généralement ce produit. Votre artisan RGE peut également vous orienter vers un partenaire bancaire.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <SiloPage
      slug="eco-ptz"
      eyebrow="Aides financières"
      h1="Éco-PTZ : financer jusqu'à 50 000 € de travaux sans intérêts."
      intro="L'éco-prêt à taux zéro permet de financer des travaux de rénovation énergétique sans payer d'intérêts. Sans condition de revenus, il est accessible à tous les propriétaires et vient compléter MaPrimeRénov' pour réduire le reste à charge à zéro."
      highlights={[
        {
          value: "50 000 €",
          label: "Montant maximum pour une rénovation globale (rénovation d'ampleur)",
        },
        {
          value: "0 %",
          label: "Taux d'intérêt — l'État compense les intérêts auprès des banques",
        },
        {
          value: "20 ans",
          label: "Durée maximale de remboursement, sans pénalité de remboursement anticipé",
        },
      ]}
      sections={[
        {
          heading: "01. Qu'est-ce que l'éco-PTZ ?",
          body: "L'éco-prêt à taux zéro (éco-PTZ) est un prêt bancaire sans intérêts destiné à financer des travaux de rénovation énergétique. L'État compense les intérêts directement auprès de la banque. Il est distribué par les établissements bancaires ayant signé une convention avec l'État.",
          bullets: [
            "Prêt sans intérêts : l'emprunteur ne rembourse que le capital emprunté",
            "Sans condition de revenus : accessible à tous les propriétaires",
            "Logement éligible : résidence principale achevée avant le 1er janvier 1990",
            "Propriétaires occupants et bailleurs éligibles",
          ],
          callout:
            "L'éco-PTZ n'est pas une aide directe : c'est un prêt qui doit être remboursé. Il réduit le coût du financement en supprimant les intérêts, mais ne diminue pas le montant total à rembourser.",
          image: {
            src: "/eco-ptz.png",
            alt: "Logo officiel de l'éco-prêt à taux zéro (éco-PTZ) — prêt sans intérêts pour la rénovation énergétique",
          },
        },
        {
          heading: "02. Montants selon les travaux",
          body: "Le montant de l'éco-PTZ dépend du nombre et du type de travaux financés. Depuis 2022, le plafond a été relevé à 50 000 € pour les projets de rénovation globale, ce qui en fait un outil de financement complet pour les projets ambitieux.",
          bullets: [
            "1 geste de travaux : jusqu'à 15 000 €",
            "2 gestes de travaux : jusqu'à 25 000 €",
            "3 gestes ou plus : jusqu'à 30 000 €",
            "Rénovation globale (rénovation d'ampleur) : jusqu'à 50 000 €",
          ],
          callout:
            "Un logement peut bénéficier de plusieurs éco-PTZ successifs, sous réserve que le montant total ne dépasse pas les plafonds réglementaires et que les prêts financent des travaux différents.",
        },
        {
          heading: "03. Travaux éligibles",
          body: "Les travaux éligibles à l'éco-PTZ sont définis par décret et couvrent l'ensemble des postes de rénovation énergétique. Les travaux doivent être réalisés par un artisan certifié RGE et concerner la résidence principale.",
          bullets: [
            "Isolation : combles, murs (ITE/ITI), planchers bas",
            "Chauffage et eau chaude sanitaire : PAC, chaudière biomasse, chauffe-eau thermodynamique",
            "Menuiseries extérieures : fenêtres, portes-fenêtres, portes d'entrée",
            "Ventilation : VMC simple ou double flux",
          ],
          callout:
            "Depuis 2020, les travaux d'assainissement non collectif ou d'adaptation du logement au vieillissement peuvent également être financés par l'éco-PTZ, dans des conditions spécifiques.",
        },
        {
          heading: "04. Démarches pour obtenir l'éco-PTZ",
          body: "La demande d'éco-PTZ s'effectue directement auprès d'une banque conventionnée. Le dossier comprend les devis des travaux et une attestation de l'artisan RGE. La banque instruit le dossier et verse les fonds selon l'avancement des travaux.",
          bullets: [
            "Étape 1 : obtenir les devis détaillés d'un artisan certifié RGE",
            "Étape 2 : déposer le dossier auprès d'une banque conventionnée avec l'État",
            "Étape 3 : la banque instruit et accorde le prêt (délai variable selon l'établissement)",
            "Étape 4 : les fonds sont versés au fur et à mesure des travaux, sur factures",
          ],
          callout:
            "Certaines banques ont suspendu temporairement la distribution de l'éco-PTZ. Appelez en amont pour vérifier la disponibilité avant de déposer un dossier.",
        },
        {
          heading: "05. Cumul avec les autres aides",
          body: "L'éco-PTZ est conçu pour compléter les aides directes (MaPrimeRénov', CEE) en finançant le reste à charge sans coût d'intérêts. La combinaison des trois dispositifs permet souvent de couvrir l'intégralité du projet pour les ménages modestes.",
          bullets: [
            "Cumulable avec MaPrimeRénov' (parcours par geste et accompagné)",
            "Cumulable avec les CEE (Coup de Pouce chauffage, isolation…)",
            "Cumulable avec la TVA réduite à 5,5 %",
            "Cumulable avec les aides locales (régions, EPCI, Habiter Mieux…)",
          ],
          callout:
            "Pour un ménage très modeste en rénovation d'ampleur : MaPrimeRénov' (80 %) + CEE Coup de Pouce + éco-PTZ pour le reste. Dans de nombreux cas, le reste à charge final peut être inférieur à 5 % du montant total des travaux.",
        },
      ]}
      faqs={[
        {
          question: "Qui peut bénéficier de l'éco-PTZ en 2026 ?",
          answer:
            "L'éco-PTZ est accessible à tous les propriétaires (occupants ou bailleurs) d'un logement achevé avant le 1er janvier 1990, sans condition de revenus. Le logement doit être la résidence principale du bénéficiaire.",
        },
        {
          question: "Quel est le montant maximum de l'éco-PTZ en 2026 ?",
          answer:
            "Le montant maximum est de 50 000 € pour une rénovation globale. Il est de 30 000 € pour 3 gestes ou plus, 25 000 € pour 2 gestes, et 15 000 € pour 1 seul geste. Le prêt est sans intérêts, remboursable sur 20 ans maximum.",
        },
        {
          question: "L'éco-PTZ est-il cumulable avec MaPrimeRénov' ?",
          answer:
            "Oui, l'éco-PTZ est cumulable avec MaPrimeRénov' et les CEE. Il est particulièrement utile pour financer le reste à charge après déduction des aides. Depuis 2019, il n'y a plus de condition de revenus pour cumuler éco-PTZ et MaPrimeRénov'.",
        },
        {
          question: "Dans quelle banque obtenir un éco-PTZ ?",
          answer:
            "L'éco-PTZ est distribué par les banques ayant signé une convention avec l'État. Les principales banques du réseau (Crédit Agricole, BNP Paribas, Société Générale, Caisse d'Épargne, Banque Populaire…) proposent généralement ce produit.",
        },
      ]}
    />
  ),
});
