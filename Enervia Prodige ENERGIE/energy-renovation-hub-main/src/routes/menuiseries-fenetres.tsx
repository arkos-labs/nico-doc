import { createFileRoute } from "@tanstack/react-router";
import { BASE_URL } from "@/lib/site-identity";
import { SiloPage } from "@/components/site/SiloPage";

const title = "Menuiseries et fenêtres : double vitrage, triple vitrage et portes isolantes";
const description =
  "Remplacement de fenêtres simple vitrage par du double ou triple vitrage : comparatif des performances, matériaux de châssis et aides disponibles en 2026.";

export const Route = createFileRoute("/menuiseries-fenetres")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${BASE_URL}/menuiseries-fenetres` },
      { property: "og:image", content: `${BASE_URL}/og-default.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/menuiseries-fenetres` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Double vitrage ou triple vitrage : lequel choisir ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Le double vitrage (Uw ≤ 1,3 W/m².K) convient à la majorité des rénovations. Le triple vitrage (Uw ≤ 0,8 W/m².K) est recommandé pour les maisons très bien isolées, les régions froides ou les projets BBC. Le surcoût du triple vitrage est rentable principalement en zones climatiques H1 et H2.",
              },
            },
            {
              "@type": "Question",
              name: "Les fenêtres sont-elles éligibles à MaPrimeRénov' en 2026 ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Oui, le remplacement de fenêtres simple vitrage par du double vitrage performant reste éligible à MaPrimeRénov' par geste en 2026. La fenêtre doit atteindre Uw ≤ 1,3 W/m².K et l'installateur doit être certifié RGE Qualibat ou RGE Ferebat.",
              },
            },
            {
              "@type": "Question",
              name: "Quel matériau de châssis choisir : PVC, aluminium ou bois ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Le PVC est le plus économique et le moins conducteur thermiquement. L'aluminium à rupture de pont thermique est plus durable et esthétique mais plus cher. Le bois offre d'excellentes performances et un bilan carbone favorable mais demande un entretien régulier. Chaque matériau a ses avantages selon le budget et le contexte.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <SiloPage
      slug="menuiseries-fenetres"
      eyebrow="Menuiseries"
      h1="Fenêtres et menuiseries : remplacer le simple vitrage pour gagner en confort."
      intro="Les fenêtres single vitrage sont de véritables passoires thermiques. Leur remplacement par des menuiseries performantes améliore l'isolation acoustique, réduit les déperditions et supprime l'effet paroi froide."
      highlights={[
        {
          value: "10–15 %",
          label: "Des déperditions thermiques passent par les fenêtres dans un logement mal isolé",
        },
        {
          value: "Uw ≤ 1,3",
          label: "Coefficient de transmission thermique exigé pour bénéficier de MaPrimeRénov'",
        },
        {
          value: "Triple flux",
          label: "Triple vitrage Uw ≤ 0,8 W/m².K recommandé pour les rénovations BBC",
        },
      ]}
      sections={[
        {
          heading: "01. Double vitrage performant",
          body: "Le double vitrage à isolation renforcée (VIR) est le standard de la rénovation résidentielle. Il associe deux lames de verre séparées par un espaceur rempli de gaz isolant (argon ou krypton) et un revêtement à faible émissivité (couche low-e) pour limiter les échanges de chaleur par rayonnement.",
          bullets: [
            "Coefficient Uw : 1,0 à 1,3 W/m².K selon le châssis et le vitrage",
            "Gaz de remplissage argon (standard) ou krypton (plus performant, plus cher)",
            "Couche low-e : réduit les pertes par rayonnement de 30 à 50 %",
            "Facteur solaire g : à arbitrer selon l'orientation (captage solaire hiver vs surchauffe été)",
          ],
          callout:
            "Un double vitrage avec Uw ≤ 1,3 W/m².K élimine l'effet de paroi froide qui génère le sentiment d'inconfort près des fenêtres en hiver.",
        },
        {
          heading: "02. Triple vitrage",
          body: "Le triple vitrage ajoute une troisième lame de verre et un second espace de gaz, permettant d'atteindre des Uw inférieurs à 0,8 W/m².K. C'est la solution des maisons à énergie positive (BEPOS) et des rénovations BBC, mais son surcoût doit être mis en regard du gain réel selon la zone climatique.",
          bullets: [
            "Coefficient Uw : 0,6 à 0,9 W/m².K selon les modèles",
            "Recommandé en zone H1 (Grand Est, Alpes, Pyrénées) et pour les maisons très isolées",
            "Poids plus élevé : vérifier la résistance des dormants et des faux-plafonds",
            "Facteur solaire g plus faible : moins de captage solaire passif en hiver",
          ],
          callout:
            "En zone H3 (Sud de la France), le triple vitrage offre des gains marginaux par rapport au double vitrage VIR et son surcoût est rarement justifié.",
        },
        {
          heading: "03. Matériaux de châssis",
          body: "Le châssis contribue aux performances thermiques globales de la menuiserie. Chaque matériau présente un compromis entre performances, esthétique, durabilité et coût. Le coefficient Uw indiqué sur le produit intègre toujours le châssis et le vitrage.",
          bullets: [
            "PVC : excellent isolant, économique, sans entretien, durée de vie 30–40 ans",
            "Aluminium à rupture de pont thermique (RPT) : durable, esthétique, recyclable",
            "Bois : excellent isolant, bilan carbone favorable, entretien quinquennal obligatoire",
            "Mixte bois/aluminium : performances du bois + protection extérieure de l'alu",
          ],
        },
        {
          heading: "04. Portes et baies vitrées",
          body: "Au-delà des fenêtres, les portes d'entrée et les baies vitrées constituent des points sensibles de l'enveloppe thermique. Leur remplacement participe à l'amélioration globale de l'étanchéité à l'air et des performances d'isolation.",
          bullets: [
            "Porte d'entrée : UD ≤ 1,5 W/m².K recommandé (seuil MaPrimeRénov')",
            "Baie vitrée coulissante : Uw ≤ 1,7 W/m².K pour les grandes surfaces",
            "Véranda ou extension vitrée : réglementation thermique spécifique à vérifier",
            "Volets roulants à lame isolante : amélioration notable des performances nocturnes",
          ],
          callout:
            "Les joints de dormant et la qualité de la pose conditionnent l'étanchéité à l'air. Une fenêtre performante mal posée peut générer des infiltrations d'air importantes.",
        },
        {
          heading: "05. Aides financières en 2026",
          body: "Le remplacement de menuiseries reste éligible à MaPrimeRénov' par geste en 2026 sous conditions de performance. Les CEE peuvent être cumulés pour réduire le reste à charge.",
          bullets: [
            "MaPrimeRénov' par geste : 40 à 100 €/fenêtre selon la catégorie de revenus",
            "Condition : Uw ≤ 1,3 W/m².K (ou Uw ≤ 0,8 pour le triple vitrage)",
            "CEE fiche BAR-EN-104 : prime pour le remplacement de simple vitrage",
            "TVA réduite à 5,5 % sur la fourniture et la pose",
          ],
          callout:
            "La pose doit être réalisée par un artisan certifié RGE Qualibat ou RGE Ferebat pour déclencher MaPrimeRénov'. Vérifiez la certification avant signature du devis.",
        },
      ]}
      faqs={[
        {
          question: "Double vitrage ou triple vitrage : lequel choisir ?",
          answer:
            "Le double vitrage (Uw ≤ 1,3 W/m².K) convient à la majorité des rénovations. Le triple vitrage (Uw ≤ 0,8 W/m².K) est recommandé pour les maisons très bien isolées, les régions froides ou les projets BBC. Le surcoût du triple vitrage est rentable principalement en zones climatiques H1 et H2.",
        },
        {
          question: "Les fenêtres sont-elles éligibles à MaPrimeRénov' en 2026 ?",
          answer:
            "Oui, le remplacement de fenêtres simple vitrage par du double vitrage performant reste éligible à MaPrimeRénov' par geste en 2026. La fenêtre doit atteindre Uw ≤ 1,3 W/m².K et l'installateur doit être certifié RGE Qualibat ou RGE Ferebat.",
        },
        {
          question: "Quel matériau de châssis choisir : PVC, aluminium ou bois ?",
          answer:
            "Le PVC est le plus économique et le moins conducteur thermiquement. L'aluminium à rupture de pont thermique est plus durable et esthétique mais plus cher. Le bois offre d'excellentes performances et un bilan carbone favorable mais demande un entretien régulier. Chaque matériau a ses avantages selon le budget et le contexte.",
        },
      ]}
    />
  ),
});
