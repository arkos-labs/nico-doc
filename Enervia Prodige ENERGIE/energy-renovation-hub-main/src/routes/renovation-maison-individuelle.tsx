import { createFileRoute } from "@tanstack/react-router";
import { BASE_URL } from "@/lib/site-identity";
import { SiloPage } from "@/components/site/SiloPage";

const title = "Rénover sa maison individuelle : guide et aides 2026";
const description =
  "Audit énergétique, isolation, chauffage, aides MaPrimeRénov' : tout ce qu'il faut savoir pour rénover efficacement votre maison individuelle en 2026.";

export const Route = createFileRoute("/renovation-maison-individuelle")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${BASE_URL}/renovation-maison-individuelle` },
      { property: "og:image", content: `${BASE_URL}/og-default.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/renovation-maison-individuelle` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Par où commencer une rénovation énergétique de maison individuelle ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Le point de départ recommandé est un audit énergétique réglementaire réalisé par un professionnel certifié. Il établit le diagnostic complet de votre maison, identifie les postes de déperdition et propose des scénarios de travaux chiffrés. Pour une rénovation d'ampleur, un rendez-vous préalable avec un conseiller France Rénov' est désormais obligatoire.",
              },
            },
            {
              "@type": "Question",
              name: "Qu'est-ce qu'une rénovation d'ampleur et pourquoi est-ce important ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Une rénovation d'ampleur désigne un ensemble de travaux permettant de passer d'au moins deux classes DPE et d'atteindre au minimum la classe C. Elle ouvre droit aux aides les plus importantes de MaPrimeRénov' (parcours accompagné). Un MonAccompagnateurRénov' (MAR) agréé est obligatoire pour bénéficier de ces aides renforcées.",
              },
            },
            {
              "@type": "Question",
              name: "Peut-on cumuler MaPrimeRénov' et les CEE pour rénover sa maison ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Oui. MaPrimeRénov' (aides ANAH) et les CEE (Certificats d'Économies d'Énergie versés par les fournisseurs d'énergie) sont cumulables. En ajoutant l'éco-PTZ (jusqu'à 50 000 €) et la TVA réduite à 5,5 %, le reste à charge peut être significativement réduit, surtout pour les ménages aux revenus modestes.",
              },
            },
            {
              "@type": "Question",
              name: "Faut-il un artisan RGE pour bénéficier des aides ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Oui, le recours à un artisan certifié RGE (Reconnu Garant de l'Environnement) est obligatoire pour bénéficier de MaPrimeRénov', des CEE et de l'éco-PTZ. Vérifiez la validité de la certification sur le site france-renov.gouv.fr avant de signer tout devis.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <SiloPage
      slug="renovation-maison-individuelle"
      eyebrow="Rénovation individuelle"
      h1="Rénovation de maison individuelle : une approche globale, étape par étape."
      intro="Améliorer durablement son confort tout en réduisant ses charges : c'est l'objectif d'une rénovation énergétique bien conduite. De l'audit initial au choix des travaux, chaque étape compte pour maximiser les performances et les aides disponibles."
      highlights={[
        {
          value: "Audit",
          label: "Point de départ obligatoire pour toute rénovation d'ampleur financée",
        },
        {
          value: "2 classes",
          label: "Gain DPE minimum requis pour accéder au parcours accompagné MaPrimeRénov'",
        },
        {
          value: "50 000 €",
          label: "Montant maximum de l'éco-PTZ pour financer les travaux sans intérêts",
        },
      ]}
      sections={[
        {
          heading: "01. Audit énergétique : poser le bon diagnostic",
          body: "L'audit énergétique réglementaire est la première étape d'une rénovation sérieuse. Réalisé par un professionnel certifié, il analyse l'ensemble de l'enveloppe et des systèmes de votre maison — isolation, chauffage, ventilation, menuiseries — et propose des scénarios de travaux classés par priorité et par rentabilité.",
          bullets: [
            "Obligatoire pour accéder au parcours accompagné MaPrimeRénov' ampleur",
            "Réalisé par un auditeur certifié (qualification RGE mention audit ou OPQIBI 1905)",
            "Propose a minima deux scénarios : un geste prioritaire et une rénovation globale",
            "Coût : 500 à 1 500 € selon la taille du logement, partiellement pris en charge",
          ],
          callout:
            "Un audit réglementaire n'est pas un simple DPE. Il intègre une visite sur site et des calculs thermiques détaillés. Méfiez-vous des offres « d'audit à distance » qui ne correspondent pas aux exigences réglementaires.",
        },
        {
          heading: "02. Définir le bon scénario de travaux",
          body: "Une rénovation énergétique efficace traite les postes de déperdition dans le bon ordre. L'enveloppe du bâtiment (isolation) doit être traitée en priorité avant de redimensionner le système de chauffage — un chauffage surdimensionné sur une maison mal isolée consomme davantage et se dégrade plus vite.",
          bullets: [
            "Priorité 1 : combles et toiture (25–30 % des déperditions)",
            "Priorité 2 : murs — ITE ou ITI selon la configuration (20–25 %)",
            "Priorité 3 : menuiseries et pont thermiques (10–15 %)",
            "Priorité 4 : système de chauffage et ECS, redimensionné après isolation",
          ],
          callout:
            "Traiter le chauffage avant l'isolation revient à chauffer l'extérieur. L'ordre des travaux conditionne directement les économies réelles et la durée de vie des équipements.",
        },
        {
          heading: "03. Isolation : l'enveloppe en premier",
          body: "L'isolation de la maison individuelle porte sur trois postes principaux : la toiture (combles perdus ou aménagés), les murs (ITE recommandée) et les planchers bas. Chaque poste a ses contraintes techniques, ses matériaux adaptés et ses niveaux d'aide spécifiques.",
          bullets: [
            "Combles perdus : soufflage R ≥ 7 m².K/W — solution la plus rentable",
            "Murs extérieurs : ITE (R ≥ 3,7) ou ITI selon l'état de la façade",
            "Plancher bas sur vide sanitaire ou sous-sol : R ≥ 3 m².K/W",
            "Menuiseries : double ou triple vitrage Uw ≤ 1,3 W/m².K",
          ],
          callout:
            "L'isolation des combles perdus est souvent le premier geste recommandé par les conseillers France Rénov' : retour sur investissement de 2 à 5 ans, peu de contraintes techniques, montant d'aide significatif.",
        },
        {
          heading: "04. Chauffage : passer au renouvelable",
          body: "Après avoir réduit les déperditions par l'isolation, le redimensionnement du système de chauffage devient pertinent. La pompe à chaleur air/eau s'impose comme la solution de référence pour remplacer une chaudière fioul ou gaz : elle s'intègre dans le circuit hydraulique existant et produit 3 à 5 kWh de chaleur pour 1 kWh électrique consommé.",
          bullets: [
            "PAC air/eau : remplacement direct de la chaudière sur le réseau hydraulique",
            "PAC air/air : solution split pour les maisons sans réseau hydraulique",
            "Chaudière à granulés (biomasse) : alternative pour les zones rurales mal desservies",
            "Chauffe-eau thermodynamique pour la production d'eau chaude sanitaire",
          ],
          callout:
            "Après isolation, la puissance nécessaire au chauffage est souvent réduite de 30 à 50 %. Un nouveau bilan thermique est indispensable avant tout devis pour éviter le surdimensionnement.",
        },
        {
          heading: "05. Ventilation : ne pas oublier la qualité de l'air",
          body: "Une maison mieux isolée est aussi plus étanche à l'air. Sans ventilation adaptée, l'humidité s'accumule et génère moisissures, condensation et dégradation des matériaux. L'installation d'une VMC double flux est fortement recommandée dès lors que l'étanchéité à l'air est améliorée.",
          bullets: [
            "VMC simple flux autoréglable : solution d'entrée de gamme, largement répandue",
            "VMC double flux : récupère 70 à 90 % de la chaleur de l'air extrait",
            "Éligible aux CEE et à MaPrimeRénov' dans le cadre d'une rénovation d'ampleur",
            "Entretien annuel obligatoire des bouches et filtres pour maintenir les performances",
          ],
          callout:
            "Une maison rénovée sans VMC adaptée peut voir son taux d'humidité augmenter significativement en hiver. La qualité de l'air intérieur est un enjeu de santé, pas seulement de confort.",
        },
        {
          heading: "06. Aides financières disponibles en 2026",
          body: "Le financement d'une rénovation de maison individuelle repose sur plusieurs dispositifs cumulables. MaPrimeRénov' par geste (travaux isolés) et MaPrimeRénov' ampleur (rénovation globale avec MAR) sont les deux piliers, complétés par les CEE, l'éco-PTZ et la TVA réduite.",
          bullets: [
            "MaPrimeRénov' par geste : isolation combles, murs, planchers, PAC, VMC — selon revenus",
            "MaPrimeRénov' ampleur : 40 à 70 % du montant des travaux selon revenus et gain DPE",
            "CEE : prime énergie versée par les obligés, cumulable avec MPR",
            "Éco-PTZ : jusqu'à 50 000 € sans intérêts, remboursable sur 20 ans",
          ],
          callout:
            "Pour les ménages très modestes (catégorie Bleu), le reste à charge peut être inférieur à 10 % du montant total des travaux dans le cadre d'une rénovation d'ampleur. Un conseiller France Rénov' peut simuler précisément votre situation.",
        },
      ]}
      faqs={[
        {
          question: "Par où commencer une rénovation énergétique de maison individuelle ?",
          answer:
            "Le point de départ recommandé est un audit énergétique réglementaire réalisé par un professionnel certifié. Il établit le diagnostic complet de votre maison, identifie les postes de déperdition et propose des scénarios de travaux chiffrés. Pour une rénovation d'ampleur, un rendez-vous préalable avec un conseiller France Rénov' est désormais obligatoire.",
        },
        {
          question: "Qu'est-ce qu'une rénovation d'ampleur et pourquoi est-ce important ?",
          answer:
            "Une rénovation d'ampleur désigne un ensemble de travaux permettant de passer d'au moins deux classes DPE et d'atteindre au minimum la classe C. Elle ouvre droit aux aides les plus importantes de MaPrimeRénov' (parcours accompagné). Un MonAccompagnateurRénov' (MAR) agréé est obligatoire pour bénéficier de ces aides renforcées.",
        },
        {
          question: "Peut-on cumuler MaPrimeRénov' et les CEE pour rénover sa maison ?",
          answer:
            "Oui. MaPrimeRénov' (aides ANAH) et les CEE (Certificats d'Économies d'Énergie versés par les fournisseurs d'énergie) sont cumulables. En ajoutant l'éco-PTZ (jusqu'à 50 000 €) et la TVA réduite à 5,5 %, le reste à charge peut être significativement réduit, surtout pour les ménages aux revenus modestes.",
        },
        {
          question: "Faut-il un artisan RGE pour bénéficier des aides ?",
          answer:
            "Oui, le recours à un artisan certifié RGE (Reconnu Garant de l'Environnement) est obligatoire pour bénéficier de MaPrimeRénov', des CEE et de l'éco-PTZ. Vérifiez la validité de la certification sur le site france-renov.gouv.fr avant de signer tout devis.",
        },
      ]}
    />
  ),
});
