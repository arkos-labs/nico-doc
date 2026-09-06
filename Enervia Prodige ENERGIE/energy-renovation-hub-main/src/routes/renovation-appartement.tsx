import { createFileRoute } from "@tanstack/react-router";
import { BASE_URL } from "@/lib/site-identity";
import { SiloPage } from "@/components/site/SiloPage";

const title = "Rénovation énergétique d'un appartement : aides et travaux 2026";
const description =
  "Propriétaire d'un appartement ? Isolation, VMC, fenêtres, PAC air/air : quels travaux sont possibles, quelles aides obtenir en 2026, parties communes et parties privatives.";

export const Route = createFileRoute("/renovation-appartement")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${BASE_URL}/renovation-appartement` },
      { property: "og:image", content: `${BASE_URL}/og-default.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/renovation-appartement` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "MaPrimeRénov' est-elle accessible aux propriétaires d'appartement ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Oui. Les propriétaires occupants d'un appartement peuvent bénéficier de MaPrimeRénov' pour des travaux dans les parties privatives (remplacement de fenêtres, PAC air/air, chauffe-eau thermodynamique, VMC). Pour les travaux en parties communes, c'est MaPrimeRénov' Copropriété qui s'applique.",
              },
            },
            {
              "@type": "Question",
              name: "Peut-on installer une pompe à chaleur dans un appartement ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Oui, sous conditions. La PAC air/air (climatisation réversible) est la solution la plus adaptée aux appartements sans réseau hydraulique. Elle nécessite l'accord de la copropriété pour la pose de l'unité extérieure et doit respecter la réglementation acoustique (R. 1336-7 du Code de la santé publique).",
              },
            },
            {
              "@type": "Question",
              name: "L'isolation des murs est-elle possible dans un appartement ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "L'isolation des murs dans un appartement se fait généralement par l'intérieur (ITI), côté parties privatives. L'isolation par l'extérieur (ITE) est une décision collective qui relève de la copropriété et doit être votée en assemblée générale. Les deux démarches permettent d'accéder à des aides différentes.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <SiloPage
      slug="renovation-appartement"
      eyebrow="Rénovation en copropriété"
      h1="Rénover son appartement : travaux possibles, aides et règles de copropriété."
      intro="La rénovation énergétique d'un appartement suit des règles spécifiques liées au statut de copropriété. Certains travaux relèvent des parties privatives (et de vos seules décisions), d'autres des parties communes (vote en assemblée générale requis). Les aides disponibles diffèrent selon le cas."
      highlights={[
        {
          value: "Privatives",
          label: "Fenêtres, PAC air/air, VMC, chauffe-eau : travaux à votre initiative",
        },
        {
          value: "Communes",
          label: "ITE, toiture, chauffage collectif : décision de la copropriété en AG",
        },
        {
          value: "MPR Copro",
          label: "MaPrimeRénov' Copropriété : aide collective pour les travaux en parties communes",
        },
      ]}
      sections={[
        {
          heading: "01. Travaux dans les parties privatives",
          body: "Un propriétaire peut engager seul des travaux d'amélioration énergétique dans son appartement, sans accord de la copropriété, pour autant qu'ils ne modifient pas l'aspect extérieur de l'immeuble ni les parties communes.",
          bullets: [
            "Remplacement des fenêtres (sauf si le règlement de copropriété l'encadre)",
            "Installation d'une VMC dans les pièces privatives",
            "Pose d'un chauffe-eau thermodynamique ou d'un chauffe-eau solaire individuel",
            "Isolation thermique des murs par l'intérieur (ITI)",
            "PAC air/air (climatisation réversible) — unité intérieure et extérieure",
            "Isolation des planchers hauts ou bas appartenant aux parties privatives",
          ],
          callout:
            "Vérifiez toujours le règlement de copropriété avant d'engager des travaux. Certains règlements imposent des contraintes sur l'aspect des fenêtres ou l'emplacement des unités extérieures de climatisation.",
        },
        {
          heading: "02. Travaux en parties communes et rôle de la copropriété",
          body: "Les travaux touchant aux parties communes (façades, toiture, cage d'escalier, chauffage collectif) nécessitent un vote en assemblée générale. La copropriété peut bénéficier de MaPrimeRénov' Copropriété pour financer ces travaux collectifs.",
          bullets: [
            "Isolation thermique par l'extérieur (ITE) : façades = parties communes",
            "Isolation de la toiture terrasse ou de la toiture inclinée",
            "Remplacement de la chaudière collective ou du réseau de chauffage",
            "Rénovation globale de l'immeuble avec MonAccompagnateurRénov'",
            "Vote à la majorité absolue (article 25 de la loi du 10 juillet 1965) pour les travaux d'amélioration",
          ],
          callout:
            "MaPrimeRénov' Copropriété finance jusqu'à 25 % des travaux de rénovation énergétique en parties communes, avec une bonification si la copropriété atteint un gain d'au moins 35 % d'énergie.",
        },
        {
          heading: "03. MaPrimeRénov' pour les appartements en parties privatives",
          body: "Les propriétaires occupants d'appartements peuvent solliciter MaPrimeRénov' pour des travaux dans leurs parties privatives, sous les mêmes conditions que les propriétaires de maisons individuelles : logement résidence principale de plus de 15 ans, artisan RGE, dossier déposé avant les travaux.",
          bullets: [
            "Remplacement des fenêtres (double ou triple vitrage Uw ≤ 1,3)",
            "Chauffe-eau thermodynamique (COP ≥ 2,5)",
            "PAC air/air pour les logements sans réseau hydraulique",
            "VMC double flux (avec ou sans échangeur thermique)",
            "Isolation des planchers bas ou hauts dans les parties privatives",
          ],
          callout:
            "Le parcours par geste MaPrimeRénov' est le plus adapté pour les appartements, car la rénovation d'ampleur (parcours accompagné) implique généralement des travaux sur l'enveloppe globale de l'immeuble, donc des décisions collectives.",
        },
        {
          heading: "04. Contraintes acoustiques et accord de voisinage",
          body: "L'installation d'une pompe à chaleur air/air dans un appartement impose de respecter des règles acoustiques strictes. L'unité extérieure génère un bruit qui peut affecter les voisins.",
          bullets: [
            "Respect du Code de la santé publique : émergence sonore ≤ 5 dB(A) le jour, ≤ 3 dB(A) la nuit",
            "Information préalable du syndic et des voisins mitoyens recommandée",
            "Supports antivibratiles obligatoires pour limiter les transmissions solidiennes",
            "Positionnement de l'unité extérieure : éviter les façades en vis-à-vis des fenêtres de voisins",
            "Dans certaines communes : déclaration préalable de travaux requise pour la climatisation",
          ],
        },
      ]}
      faqs={[
        {
          question: "Faut-il l'accord de la copropriété pour changer ses fenêtres ?",
          answer:
            "Pas toujours. Le remplacement de fenêtres dans les parties privatives ne nécessite généralement pas d'accord de la copropriété, sauf si le règlement de copropriété impose des contraintes sur l'aspect des menuiseries (couleur, matériau). En cas de doute, consultez votre syndic avant d'engager les travaux.",
        },
        {
          question: "Un appartement peut-il bénéficier du parcours accompagné MaPrimeRénov' ?",
          answer:
            "Individuellement, non. Le parcours accompagné (rénovation d'ampleur) vise une amélioration globale du logement qui passe le plus souvent par des travaux sur l'enveloppe extérieure. Dans un immeuble, c'est la copropriété qui engage ce type de rénovation via MaPrimeRénov' Copropriété.",
        },
        {
          question: "L'éco-PTZ est-il accessible pour un appartement ?",
          answer:
            "Oui. L'éco-PTZ (éco-prêt à taux zéro) est accessible aux propriétaires d'appartement pour des travaux dans leurs parties privatives, sous les mêmes conditions que pour une maison individuelle : travaux éligibles réalisés par un artisan RGE, logement achevé depuis plus de 2 ans.",
        },
      ]}
    />
  ),
});
