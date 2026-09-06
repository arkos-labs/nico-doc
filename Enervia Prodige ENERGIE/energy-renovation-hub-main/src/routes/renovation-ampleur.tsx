import { createFileRoute } from "@tanstack/react-router";
import { BASE_URL } from "@/lib/site-identity";
import { SiloPage } from "@/components/site/SiloPage";

const title = "Rénovation d'ampleur 2026 : aides maximales MaPrimeRénov'";
const description =
  "La rénovation d'ampleur ouvre droit aux aides les plus élevées de MaPrimeRénov'. Gain de 2 classes DPE, MonAccompagnateurRénov' obligatoire : tout savoir sur ce parcours.";

export const Route = createFileRoute("/renovation-ampleur")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${BASE_URL}/renovation-ampleur` },
      { property: "og:image", content: `${BASE_URL}/og-default.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/renovation-ampleur` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Qu'est-ce qu'une rénovation d'ampleur exactement ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Une rénovation d'ampleur est un projet de travaux permettant d'améliorer la performance énergétique d'un logement d'au moins 2 classes DPE et d'atteindre au minimum la classe E (voire D pour certaines aides). Elle doit traiter au minimum deux postes d'isolation parmi : toiture, murs, planchers bas, menuiseries — en plus d'un système de chauffage performant.",
              },
            },
            {
              "@type": "Question",
              name: "Le MonAccompagnateurRénov' (MAR) est-il vraiment obligatoire ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Oui, depuis 2024, le recours à un MonAccompagnateurRénov' (MAR) agréé par l'Anah est obligatoire pour bénéficier de MaPrimeRénov' dans le cadre du parcours accompagné (rénovation d'ampleur). Le MAR aide à élaborer le projet, à sélectionner les entreprises RGE et à constituer le dossier d'aides.",
              },
            },
            {
              "@type": "Question",
              name: "Quel est le taux d'aide maximum en rénovation d'ampleur ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Pour les ménages très modestes (catégorie Bleu), le taux de MaPrimeRénov' peut atteindre 80 % du montant des travaux éligibles, dans la limite de 40 000 € d'aides. En ajoutant les CEE Coup de Pouce et l'éco-PTZ pour le reste, le reste à charge final peut être inférieur à 5 %.",
              },
            },
            {
              "@type": "Question",
              name: "Combien coûte le MonAccompagnateurRénov' ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "La prestation du MAR est prise en charge à 100 % pour les ménages très modestes et modestes (catégories Bleu et Jaune). Pour les ménages intermédiaires et supérieurs, une participation reste à charge, mais elle est plafonnée et financée en partie par MaPrimeRénov'. Le MAR ne peut pas être rémunéré par les entreprises de travaux.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <SiloPage
      slug="renovation-ampleur"
      eyebrow="Aides financières"
      h1="Rénovation d'ampleur : le parcours accompagné pour des aides maximales."
      intro="La rénovation d'ampleur est le dispositif le plus ambitieux de MaPrimeRénov'. En traitant plusieurs postes simultanément et en gagnant au moins 2 classes DPE, vous accédez aux taux d'aide les plus élevés — jusqu'à 80 % du montant des travaux pour les ménages très modestes."
      highlights={[
        {
          value: "2 classes",
          label: "Gain DPE minimum requis — et atteinte d'au moins la classe E",
        },
        {
          value: "80 %",
          label: "Taux d'aide MaPrimeRénov' pour les ménages très modestes (catégorie Bleu)",
        },
        {
          value: "MAR",
          label: "MonAccompagnateurRénov' agréé — obligatoire et pris en charge jusqu'à 100 %",
        },
      ]}
      sections={[
        {
          heading: "01. Définition et conditions de la rénovation d'ampleur",
          body: "La rénovation d'ampleur, aussi appelée parcours accompagné, est définie par un décret précis. Elle impose un projet cohérent traitant plusieurs postes énergétiques pour atteindre un niveau de performance significatif. Ce n'est pas une simple addition de gestes — c'est une stratégie globale.",
          bullets: [
            "Gain minimal de 2 classes DPE (ex : de F à D, ou de E à C)",
            "Atteinte d'au moins la classe E à l'issue des travaux",
            "Au moins 2 gestes d'isolation parmi : toiture, murs, planchers, menuiseries",
            "Système de chauffage performant (PAC, biomasse) ou réseau de chaleur renouvelable",
          ],
          callout:
            "Un logement classé G qui passe en E répond aux critères, mais un MAR conseillera souvent d'aller jusqu'à D ou C pour maximiser les gains à long terme et anticiper les interdictions de location (passoires thermiques).",
          image: {
            src: "/france-renov.png",
            alt: "Logo France Rénov' — service public de la rénovation énergétique de l'habitat",
            maxWidth: "380px",
          },
        },
        {
          heading: "02. Le rôle du MonAccompagnateurRénov' (MAR)",
          body: "Le MAR est un professionnel agréé par l'Anah qui accompagne le ménage de la conception du projet jusqu'à la réception des travaux. Son rôle est d'assurer la cohérence technique du projet, d'aider à la sélection des entreprises et de constituer les dossiers d'aides.",
          bullets: [
            "Réalise ou vérifie l'audit énergétique préalable",
            "Aide à définir le scénario de travaux optimal selon le budget et les aides disponibles",
            "Assiste à la comparaison des devis et vérifie la qualification RGE des entreprises",
            "Assure le suivi de chantier et l'assistance à la réception des travaux",
          ],
          callout:
            "Le MAR est indépendant des entreprises de travaux : il est interdit par la réglementation de recevoir une rémunération des artisans RGE. Cette indépendance est la garantie d'un conseil objectif sur le scénario de travaux.",
        },
        {
          heading: "03. Aides disponibles et montants",
          body: "Le parcours accompagné ouvre droit à des aides bien supérieures au parcours par geste. Les taux varient selon la catégorie de revenus du foyer (Bleu, Jaune, Violet, Rose) et le gain énergétique atteint. Des bonifications supplémentaires s'appliquent pour les gains les plus importants.",
          bullets: [
            "🔵 Bleu (très modestes) : jusqu'à 80 % — plafond de 40 000 € d'aides",
            "🟡 Jaune (modestes) : jusqu'à 60 % — plafond de 35 000 €",
            "🟣 Violet (intermédiaires) : jusqu'à 45 % — plafond de 25 000 €",
            "🌸 Rose (supérieurs) : 10 % — plafond de 10 000 €",
          ],
          callout:
            "Les plafonds de dépenses éligibles sont de 70 000 € HT pour une maison individuelle. Au-delà, les travaux restent réalisables mais ne génèrent pas d'aide supplémentaire.",
        },
        {
          heading: "04. Audit énergétique obligatoire",
          body: "L'audit énergétique réglementaire est le point de départ obligatoire du parcours accompagné. Il ne peut pas être remplacé par un simple DPE. L'audit doit être réalisé par un auditeur certifié avant toute décision de travaux.",
          bullets: [
            "Réalisé par un auditeur RGE mention audit ou qualifié OPQIBI 1905",
            "Intègre une visite sur site et des calculs thermiques détaillés",
            "Propose a minima 2 scénarios de travaux chiffrés avec le gain DPE associé",
            "Son coût est partiellement pris en charge dans le cadre de MaPrimeRénov' ampleur",
          ],
          callout:
            "Ne confondez pas audit énergétique réglementaire et DPE (Diagnostic de Performance Énergétique). Le DPE constate la situation actuelle. L'audit simule plusieurs scénarios de travaux et leurs impacts — c'est un outil de décision, pas de constat.",
        },
        {
          heading: "05. Financement du reste à charge",
          body: "Après MaPrimeRénov' ampleur, le reste à charge peut encore être significatif pour les ménages aux revenus intermédiaires ou supérieurs. L'éco-PTZ (jusqu'à 50 000 €) et les CEE Coup de Pouce Rénovation Performante viennent compléter le plan de financement.",
          bullets: [
            "CEE Coup de Pouce Rénovation Performante : prime bonifiée pour les rénovations globales",
            "Éco-PTZ Rénovation Globale : jusqu'à 50 000 € sans intérêts",
            "TVA réduite à 5,5 % sur l'ensemble des travaux éligibles",
            "Aides locales : certaines régions et collectivités abondent le financement",
          ],
          callout:
            "Pour un ménage très modeste, la combinaison MaPrimeRénov' ampleur (80 %) + CEE Coup de Pouce + éco-PTZ pour le solde peut ramener le reste à charge effectif à moins de 3 000 € pour un projet de 40 000 €.",
        },
        {
          heading: "06. Étapes et calendrier du parcours",
          body: "Le parcours accompagné suit un calendrier strict. Il faut compter en moyenne 12 à 18 mois entre le premier contact avec France Rénov' et la réception finale des travaux. Anticipez les délais administratifs et les disponibilités des artisans RGE.",
          bullets: [
            "Mois 1 : rendez-vous France Rénov' et choix du MAR",
            "Mois 2–3 : audit énergétique, élaboration du scénario et dépôt du dossier MPR",
            "Mois 3–4 : obtention de l'accord de principe, sélection des entreprises RGE",
            "Mois 4–12 : réalisation des travaux, suivi par le MAR",
          ],
          callout:
            "Ne démarrez aucun travaux avant l'accord de principe de l'Anah. Les travaux réalisés avant l'accord ne sont pas finançables par MaPrimeRénov', même si le dossier a été déposé.",
        },
      ]}
      faqs={[
        {
          question: "Qu'est-ce qu'une rénovation d'ampleur exactement ?",
          answer:
            "Une rénovation d'ampleur est un projet permettant d'améliorer la performance énergétique d'un logement d'au moins 2 classes DPE et d'atteindre au minimum la classe E. Elle doit traiter au minimum deux postes d'isolation en plus d'un système de chauffage performant.",
        },
        {
          question: "Le MonAccompagnateurRénov' (MAR) est-il vraiment obligatoire ?",
          answer:
            "Oui, depuis 2024, le MAR agréé est obligatoire pour bénéficier de MaPrimeRénov' dans le cadre du parcours accompagné. Il aide à élaborer le projet, à sélectionner les entreprises RGE et à constituer le dossier d'aides.",
        },
        {
          question: "Quel est le taux d'aide maximum en rénovation d'ampleur ?",
          answer:
            "Pour les ménages très modestes (catégorie Bleu), le taux de MaPrimeRénov' peut atteindre 80 % du montant des travaux éligibles, dans la limite de 40 000 € d'aides. En ajoutant les CEE et l'éco-PTZ, le reste à charge peut être inférieur à 5 %.",
        },
        {
          question: "Combien coûte le MonAccompagnateurRénov' ?",
          answer:
            "La prestation du MAR est prise en charge à 100 % pour les ménages très modestes et modestes (catégories Bleu et Jaune). Pour les autres catégories, une participation reste à charge mais elle est plafonnée et partiellement financée par MaPrimeRénov'.",
        },
      ]}
    />
  ),
});
