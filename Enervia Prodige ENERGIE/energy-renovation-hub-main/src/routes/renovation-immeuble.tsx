import { createFileRoute } from "@tanstack/react-router";
import { BASE_URL } from "@/lib/site-identity";
import { SiloPage } from "@/components/site/SiloPage";

const title = "Rénovation d'immeuble : accompagnement des copropriétés en 2026";
const description =
  "Tout savoir sur la rénovation énergétique d'un immeuble collectif : audit obligatoire, plan pluriannuel de travaux, MaPrimeRénov' Copropriété et financement des parties communes.";

export const Route = createFileRoute("/renovation-immeuble")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${BASE_URL}/renovation-immeuble` },
      { property: "og:image", content: `${BASE_URL}/og-default.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/renovation-immeuble` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Qu'est-ce que le Plan Pluriannuel de Travaux (PPT) en copropriété ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Le Plan Pluriannuel de Travaux (PPT) est obligatoire depuis 2023 pour les copropriétés de plus de 15 ans. Il liste les travaux nécessaires sur 10 ans, dont les travaux énergétiques, et est voté en assemblée générale. Il est établi à partir d'un projet de plan rédigé par un professionnel qualifié.",
              },
            },
            {
              "@type": "Question",
              name: "La copropriété peut-elle bénéficier de MaPrimeRénov' ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Oui, via le dispositif MaPrimeRénov' Copropriété. Il finance les travaux sur les parties communes visant un gain énergétique d'au moins 35 %. Le taux de base est de 25 % du montant des travaux, avec des bonifications selon le gain énergétique atteint. Un accompagnateur Rénov' (MAR) est obligatoire.",
              },
            },
            {
              "@type": "Question",
              name: "Un audit énergétique est-il obligatoire avant la rénovation d'un immeuble ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Oui, pour les copropriétés de plus de 50 lots avec chauffage collectif, un audit énergétique réglementaire est obligatoire. Il permet d'établir l'état des lieux et de proposer des scénarios de travaux. Il est obligatoire pour accéder à MaPrimeRénov' Copropriété.",
              },
            },
            {
              "@type": "Question",
              name: "Combien de copropriétaires doivent voter pour lancer les travaux ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Les travaux d'amélioration de l'immeuble, dont la rénovation énergétique, sont votés à la majorité absolue (article 25 de la loi du 10 juillet 1965) lors de l'assemblée générale des copropriétaires. En cas d'échec, un second vote à la majorité simple (article 24) peut être organisé si le projet a recueilli au moins un tiers des voix.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <SiloPage
      slug="renovation-immeuble"
      eyebrow="Rénovation collective"
      h1="Rénovation d'immeuble : le parcours dédié aux copropriétés."
      intro="La rénovation énergétique d'un bâtiment collectif suit un cadre réglementaire spécifique : audit obligatoire, vote en assemblée générale, MaPrimeRénov' Copropriété. Un accompagnement structuré est indispensable pour mobiliser les copropriétaires et optimiser les aides."
      highlights={[
        {
          value: "35 %",
          label: "Gain énergétique minimum requis pour MaPrimeRénov' Copropriété",
        },
        {
          value: "PPT",
          label: "Plan Pluriannuel de Travaux obligatoire pour toute copropriété de + 15 ans",
        },
        {
          value: "MAR",
          label: "MonAccompagnateurRénov' obligatoire pour les rénovations d'ampleur collectives",
        },
      ]}
      sections={[
        {
          heading: "01. Audit énergétique réglementaire",
          body: "L'audit énergétique est le point de départ de tout projet de rénovation d'immeuble. Il dresse un état des lieux précis de la consommation du bâtiment, identifie les postes de déperdition (toiture, murs, menuiseries, chauffage collectif) et propose plusieurs scénarios de travaux avec leur impact sur la performance et les charges.",
          bullets: [
            "Obligatoire pour les copropriétés de + 50 lots avec chauffage collectif",
            "Réalisé par un bureau d'études thermiques certifié (qualification OPQIBI ou équivalente)",
            "Prérequis pour accéder à MaPrimeRénov' Copropriété",
            "Intégré au Plan Pluriannuel de Travaux (PPT) voté en AG",
          ],
          callout:
            "Un audit mal conduit peut compromettre l'éligibilité aux aides. Vérifiez que le prestataire est inscrit sur l'annuaire France Rénov' et détient une qualification reconnue.",
        },
        {
          heading: "02. Plan Pluriannuel de Travaux (PPT)",
          body: "Le PPT est obligatoire depuis 2023 pour toutes les copropriétés de plus de 15 ans. Ce document planifie les travaux nécessaires sur une période de 10 ans, intègre les enjeux énergétiques et sert de feuille de route pour l'assemblée générale. Il conditionne l'accès à certains dispositifs d'aide.",
          bullets: [
            "Obligatoire pour les copropriétés de + 200 lots depuis 2023, + 50 lots depuis 2024, toutes copropriétés depuis 2025",
            "Établi par un professionnel qualifié sur la base de l'état de l'immeuble",
            "Voté en assemblée générale à la majorité simple",
            "Doit être actualisé tous les 10 ans ou après des travaux importants",
          ],
          callout:
            "Le PPT est un outil stratégique, pas une formalité. Une copropriété qui l'utilise comme levier peut séquencer les travaux pour maximiser les aides disponibles chaque année.",
        },
        {
          heading: "03. Vote en assemblée générale",
          body: "La décision de lancer des travaux de rénovation énergétique relève de l'assemblée générale des copropriétaires. Le cadre juridique impose des majorités spécifiques selon la nature des travaux. La mobilisation en amont des copropriétaires est un facteur clé de succès.",
          bullets: [
            "Majorité absolue (art. 25) pour les travaux d'amélioration : 50 % + 1 des tantièmes",
            "Passerelle art. 25-1 : second vote à majorité simple si ≥ 1/3 des voix au premier tour",
            "Le syndic prépare et soumet le dossier technique complet à l'AG",
            "Un accompagnateur Rénov' (MAR) peut animer les réunions d'information préalables",
          ],
          callout:
            "Informer les copropriétaires avant l'AG — économies sur les charges, valorisation des lots, obligations DPE — est aussi important que le dossier technique lui-même.",
        },
        {
          heading: "04. MaPrimeRénov' Copropriété",
          body: "MaPrimeRénov' Copropriété finance les travaux portant sur les parties communes de l'immeuble. Elle est versée au syndicat des copropriétaires et répercutée sur les quotes-parts de chaque copropriétaire. Le gain énergétique minimal de 35 % conditionne l'accès au dispositif.",
          bullets: [
            "Taux de base : 25 % du montant des travaux éligibles HT",
            "Bonification de + 10 % si gain énergétique ≥ 50 % (sortie des étiquettes E, F, G)",
            "Bonification supplémentaire pour les ménages modestes au sein de la copropriété",
            "Plafond de dépenses éligibles : 25 000 € par logement",
          ],
          callout:
            "La prime est versée à la livraison des travaux, après contrôle par un organisme mandaté par l'ANAH. Prévoyez un plan de financement intermédiaire avec la banque de la copropriété.",
        },
        {
          heading: "05. Travaux éligibles et gestes prioritaires",
          body: "Pour atteindre le seuil de 35 % de gain énergétique requis, les travaux portent en général sur l'enveloppe du bâtiment (toiture, façades, planchers bas) et les équipements collectifs (chaufferie, ventilation). La combinaison de plusieurs gestes est souvent nécessaire.",
          bullets: [
            "Isolation de la toiture terrasse ou des combles collectifs",
            "Isolation thermique par l'extérieur (ITE) des façades",
            "Remplacement de la chaufferie collective (PAC collective, chaudière biomasse)",
            "Installation ou rénovation de la ventilation collective (VMC double flux)",
          ],
          callout:
            "Un système de chauffage collectif renouvelable (PAC, réseau de chaleur urbain) peut à lui seul améliorer significativement le DPE collectif et faciliter l'atteinte du seuil de 35 %.",
        },
        {
          heading: "06. Financement et accompagnement",
          body: "Le bouclage financier d'un projet de rénovation collective combine plusieurs sources. L'éco-PTZ copropriété permet de préfinancer les travaux sans avance de trésorerie pour les copropriétaires. Le MAR (MonAccompagnateurRénov') est obligatoire et pris en charge à 100 % pour les copropriétés fragiles.",
          bullets: [
            "Éco-PTZ copropriété : jusqu'à 50 000 € par logement, sans intérêts",
            "CEE (Certificats d'Économies d'Énergie) : prime versée par les obligés, cumulable",
            "TVA réduite à 5,5 % sur les travaux de rénovation énergétique",
            "MonAccompagnateurRénov' (MAR) : pris en charge jusqu'à 100 % pour copropriétés fragiles",
          ],
          callout:
            "France Rénov' propose un espace dédié aux copropriétés avec un simulateur d'aides et un annuaire d'accompagnateurs agréés. Commencez par une prise de contact avec un conseiller avant tout engagement.",
        },
      ]}
      faqs={[
        {
          question: "Qu'est-ce que le Plan Pluriannuel de Travaux (PPT) en copropriété ?",
          answer:
            "Le Plan Pluriannuel de Travaux (PPT) est obligatoire depuis 2023 pour les copropriétés de plus de 15 ans. Il liste les travaux nécessaires sur 10 ans, dont les travaux énergétiques, et est voté en assemblée générale. Il est établi à partir d'un projet de plan rédigé par un professionnel qualifié.",
        },
        {
          question: "La copropriété peut-elle bénéficier de MaPrimeRénov' ?",
          answer:
            "Oui, via le dispositif MaPrimeRénov' Copropriété. Il finance les travaux sur les parties communes visant un gain énergétique d'au moins 35 %. Le taux de base est de 25 % du montant des travaux, avec des bonifications selon le gain énergétique atteint. Un accompagnateur Rénov' (MAR) est obligatoire.",
        },
        {
          question: "Un audit énergétique est-il obligatoire avant la rénovation d'un immeuble ?",
          answer:
            "Oui, pour les copropriétés de plus de 50 lots avec chauffage collectif, un audit énergétique réglementaire est obligatoire. Il permet d'établir l'état des lieux et de proposer des scénarios de travaux. Il est obligatoire pour accéder à MaPrimeRénov' Copropriété.",
        },
        {
          question: "Combien de copropriétaires doivent voter pour lancer les travaux ?",
          answer:
            "Les travaux d'amélioration de l'immeuble, dont la rénovation énergétique, sont votés à la majorité absolue (article 25 de la loi du 10 juillet 1965) lors de l'assemblée générale des copropriétaires. En cas d'échec, un second vote à la majorité simple (article 24) peut être organisé si le projet a recueilli au moins un tiers des voix.",
        },
      ]}
    />
  ),
});
