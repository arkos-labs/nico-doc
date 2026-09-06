import { createFileRoute } from "@tanstack/react-router";
import { BASE_URL } from "@/lib/site-identity";
import { SiloPage } from "@/components/site/SiloPage";

const title = "Prime CEE 2026 : Coup de Pouce, démarches et montants";
const description =
  "Les Certificats d'Économies d'Énergie (CEE) financent vos travaux via les fournisseurs d'énergie. Primes Coup de Pouce, travaux éligibles, cumul avec MaPrimeRénov' 2026.";

export const Route = createFileRoute("/prime-cee")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${BASE_URL}/prime-cee` },
      { property: "og:image", content: `${BASE_URL}/og-default.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/prime-cee` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Qu'est-ce que la prime CEE Coup de Pouce ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "La prime Coup de Pouce est une bonification des Certificats d'Économies d'Énergie accordée pour certains travaux prioritaires (chauffage, isolation). Elle est versée par les fournisseurs d'énergie obligés (EDF, Total, Engie…) sous forme de chèque, virement ou bon d'achat. Son montant varie selon l'obligé et les travaux.",
              },
            },
            {
              "@type": "Question",
              name: "Peut-on cumuler la prime CEE et MaPrimeRénov' ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Oui, le cumul est possible sous réserve des règles d'écrêtement : le total des aides publiques ne peut pas dépasser 100 % du montant TTC des travaux. En pratique, les deux aides sont souvent compatibles, le CEE venant compléter MaPrimeRénov' pour réduire le reste à charge.",
              },
            },
            {
              "@type": "Question",
              name: "Quand signer le cadre de contribution CEE ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Le cadre de contribution CEE (document attestant que vous confiez la valorisation de vos CEE à l'obligé) doit être signé AVANT l'acceptation du devis de travaux. Toute signature du devis avant ce document entraîne la perte du droit à la prime CEE.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <SiloPage
      slug="prime-cee"
      eyebrow="Aides financières"
      h1="Prime CEE : les Certificats d'Économies d'Énergie expliqués."
      intro="Imposé par la loi aux fournisseurs d'énergie (EDF, Total, Engie…), le dispositif des CEE les oblige à financer des travaux d'économies d'énergie chez leurs clients. Résultat : des primes versées directement sur vos travaux, cumulables avec MaPrimeRénov'."
      highlights={[
        {
          value: "CEE",
          label: "Financement imposé aux fournisseurs d'énergie par la loi POPE depuis 2006",
        },
        {
          value: "Coup de Pouce",
          label: "Bonification pour travaux prioritaires : chauffage, isolation, rénovation globale",
        },
        {
          value: "Avant",
          label: "Le cadre de contribution doit être signé avant tout devis",
        },
      ]}
      sections={[
        {
          heading: "01. Principe du dispositif CEE",
          body: "Les Certificats d'Économies d'Énergie (CEE) ont été créés par la loi POPE en 2005. Ils imposent aux fournisseurs d'énergie (les « obligés ») de financer des travaux d'économies d'énergie réalisés par leurs clients, sous peine de pénalités financières. Ces obligés récupèrent des certificats en échange de chaque kWh économisé.",
          bullets: [
            "Obligés : EDF, Total Énergie, Engie, BP, Shell et tous les grands fournisseurs d'énergie",
            "Travaux éligibles définis par des fiches standardisées (BAR-TH-XX, BAR-EN-XX)",
            "Les montants de prime varient selon l'obligé, le type de travaux et les revenus",
            "Les particuliers peuvent confier leurs CEE à un délégataire ou négocier directement avec l'obligé",
          ],
          callout:
            "Comparez plusieurs offres CEE avant de vous engager : les montants proposés peuvent varier du simple au double entre les obligés pour les mêmes travaux.",
          image: {
            src: "/cee.png",
            alt: "Logo officiel des Certificats d'Économies d'Énergie (CEE) — dispositif obligatoire des fournisseurs d'énergie",
          },
        },
        {
          heading: "02. Primes Coup de Pouce",
          body: "Le Coup de Pouce est une bonification des CEE accordée pour les travaux les plus impactants. Les primes Coup de Pouce sont encadrées par l'État et offrent des montants plus élevés que les CEE classiques, avec des conditions spécifiques selon le type de travaux.",
          bullets: [
            "Coup de Pouce Chauffage : remplacement d'une chaudière fioul, gaz ou charbon par un équipement renouvelable (PAC, biomasse…)",
            "Coup de Pouce Isolation : combles, murs, planchers — avec bonification ménages modestes",
            "Coup de Pouce Rénovation Performante : rénovation globale avec MonAccompagnateurRénov'",
            "Montants majorés pour les ménages en situation de précarité énergétique",
          ],
          callout:
            "Les primes Coup de Pouce sont encadrées par une charte signée entre l'État et les obligés. Vérifiez que l'obligé ou le délégataire que vous contactez est bien signataire de la charte sur le site de l'ADEME.",
        },
        {
          heading: "03. Travaux éligibles aux CEE",
          body: "Les travaux éligibles sont définis par des fiches standardisées publiées par le ministère. Chaque fiche précise les conditions techniques, les performances minimales requises et la formule de calcul du nombre de kWh économisés (qui détermine le montant de prime).",
          bullets: [
            "BAR-TH-104 : pompe à chaleur air/eau ou géothermique",
            "BAR-TH-106 : chauffe-eau thermodynamique",
            "BAR-EN-101 : isolation des combles perdus",
            "BAR-EN-102 : isolation des murs (ITE ou ITI) — toujours éligible aux CEE même exclue de MPR par geste",
          ],
          callout:
            "L'isolation des murs (ITE/ITI) reste éligible aux CEE en 2026 même si elle est exclue du parcours par geste MaPrimeRénov'. C'est souvent la seule aide disponible pour ce geste hors rénovation d'ampleur.",
        },
        {
          heading: "04. Démarches : l'ordre à respecter",
          body: "L'ordre des signatures est crucial pour conserver le droit à la prime CEE. Un devis signé avant le cadre de contribution entraîne la perte irrémédiable de l'éligibilité. Certains artisans RGE proposent une gestion clé en main du dossier CEE — vérifiez qu'ils ne retiennent pas une part excessive de la prime.",
          bullets: [
            "Étape 1 : sélectionner un obligé ou délégataire et comparer les offres",
            "Étape 2 : signer le cadre de contribution CEE AVANT tout devis",
            "Étape 3 : faire réaliser les travaux par un artisan RGE",
            "Étape 4 : transmettre les justificatifs (facture, attestation sur l'honneur) à l'obligé",
          ],
          callout:
            "Certains délégataires proposent de préfinancer le montant de votre prime CEE, ce qui réduit votre reste à charge immédiat. Lisez bien les conditions : des frais de dossier ou un taux de cession peuvent s'appliquer.",
        },
        {
          heading: "05. Cumul avec MaPrimeRénov' et autres aides",
          body: "Les CEE sont cumulables avec MaPrimeRénov', l'éco-PTZ et la TVA réduite à 5,5 %. Des règles d'écrêtement s'appliquent : le total des aides publiques ne peut pas dépasser certains plafonds. En pratique, CEE + MaPrimeRénov' + éco-PTZ couvrent souvent l'essentiel du projet.",
          bullets: [
            "Cumul CEE + MaPrimeRénov' : possible, sous réserve d'écrêtement ANAH",
            "Cumul CEE + éco-PTZ : toujours possible, l'éco-PTZ n'est pas une aide publique directe",
            "TVA 5,5 % : s'applique sur la fourniture et la pose des travaux éligibles",
            "Aides locales (région, département) : généralement cumulables — vérifiez votre situation",
          ],
          callout:
            "Un conseiller France Rénov' peut calculer le montant total d'aides auxquelles vous avez droit en combinant CEE, MaPrimeRénov' et éco-PTZ. Ce service est gratuit.",
        },
      ]}
      faqs={[
        {
          question: "Qu'est-ce que la prime CEE Coup de Pouce ?",
          answer:
            "La prime Coup de Pouce est une bonification des Certificats d'Économies d'Énergie accordée pour certains travaux prioritaires (chauffage, isolation). Elle est versée par les fournisseurs d'énergie obligés sous forme de chèque, virement ou bon d'achat. Son montant varie selon l'obligé et les travaux.",
        },
        {
          question: "Peut-on cumuler la prime CEE et MaPrimeRénov' ?",
          answer:
            "Oui, le cumul est possible sous réserve des règles d'écrêtement : le total des aides ne peut pas dépasser 100 % du montant TTC des travaux. En pratique, les deux aides sont souvent compatibles, le CEE venant compléter MaPrimeRénov' pour réduire le reste à charge.",
        },
        {
          question: "Quand signer le cadre de contribution CEE ?",
          answer:
            "Le cadre de contribution CEE doit être signé AVANT l'acceptation du devis de travaux. Toute signature du devis avant ce document entraîne la perte du droit à la prime CEE.",
        },
      ]}
    />
  ),
});
