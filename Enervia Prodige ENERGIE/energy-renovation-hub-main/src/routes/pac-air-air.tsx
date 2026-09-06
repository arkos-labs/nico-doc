import { createFileRoute } from "@tanstack/react-router";
import { BASE_URL } from "@/lib/site-identity";
import { SiloPage } from "@/components/site/SiloPage";

const title = "PAC air/air : climatisation réversible et chauffage pièce par pièce";
const description =
  "La pompe à chaleur air/air chauffe et rafraîchit chaque pièce indépendamment. Découvrez son fonctionnement, ses limites et comment bien la dimensionner en 2026.";

export const Route = createFileRoute("/pac-air-air")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${BASE_URL}/pac-air-air` },
      { property: "og:image", content: `${BASE_URL}/og-default.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/pac-air-air` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "La PAC air/air produit-elle de l'eau chaude sanitaire ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Non. La PAC air/air traite uniquement l'air ambiant. La production d'eau chaude sanitaire nécessite un équipement dédié : chauffe-eau thermodynamique, chauffe-eau électrique ou solaire.",
              },
            },
            {
              "@type": "Question",
              name: "Quelle est la différence entre SCOP et SEER ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Le SCOP (Seasonal Coefficient of Performance) mesure l'efficacité en mode chauffage sur une saison complète. Le SEER (Seasonal Energy Efficiency Ratio) mesure l'efficacité en mode rafraîchissement. Plus ces valeurs sont élevées, plus l'appareil est économe.",
              },
            },
            {
              "@type": "Question",
              name: "La PAC air/air est-elle éligible à MaPrimeRénov' ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "La PAC air/air est éligible à MaPrimeRénov' sous conditions : le logement doit être la résidence principale, construite depuis plus de 15 ans, et l'installateur doit être certifié RGE QualiPAC. Les montants varient selon les revenus du foyer.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <SiloPage
      slug="pac-air-air"
      eyebrow="Confort thermique"
      h1="PAC air/air : chauffage et rafraîchissement pièce par pièce."
      intro="Réversible par nature, la pompe à chaleur air/air chauffe en hiver et rafraîchit en été sans réseau hydraulique. Une solution souple, réactive et bien adaptée aux logements sans circuit d'eau."
      highlights={[
        {
          value: "Réversible",
          label: "Chauffage en hiver, rafraîchissement en été avec le même équipement",
        },
        {
          value: "R32",
          label: "Fluide frigorigène de dernière génération, GWP = 675",
        },
        {
          value: "SCOP > 4",
          label: "Efficacité saisonnière en chauffage sur les modèles récents Inverter",
        },
      ]}
      sections={[
        {
          heading: "01. Fonctionnement du cycle thermodynamique",
          body: "La PAC air/air extrait les calories de l'air extérieur via l'unité extérieure (évaporateur), les comprime pour élever leur température, puis les restitue à l'intérieur via l'unité intérieure (condenseur). En mode rafraîchissement, le cycle s'inverse : la chaleur de l'air intérieur est captée et rejetée à l'extérieur.",
          bullets: [
            "Technologie Inverter : compresseur à vitesse variable pour une régulation précise",
            "Fonctionnement jusqu'à −15 °C en mode chauffage sur les modèles récents",
            "Dégivrage automatique de l'unité extérieure sans interruption de confort",
            "Filtration de l'air intégré (anti-poussière, anti-allergènes selon les gammes)",
          ],
          callout:
            "En mode chauffage, pour 1 kWh d'électricité consommé, la PAC air/air restitue 3 à 5 kWh de chaleur selon les conditions extérieures.",
        },
        {
          heading: "02. Types d'unités intérieures",
          body: "La PAC air/air se décline en plusieurs configurations selon la surface à traiter, la hauteur sous plafond et l'architecture du logement. Le choix du type d'unité intérieure impacte directement le confort acoustique, la distribution de l'air et l'esthétique de l'installation.",
          bullets: [
            "Murale (split) : la plus courante, facile à installer, idéale par pièce",
            "Console au sol : alternative discrète sous une fenêtre, diffusion basse",
            "Cassette de plafond : intégration optimale en faux-plafond, 4 directions de diffusion",
            "Réseau gainable : solution centralisée, une seule unité pour tout le logement via gaines",
          ],
        },
        {
          heading: "03. Schéma de fonctionnement",
          body: "Le fluide frigorigène circule en circuit fermé entre l'unité extérieure et l'unité intérieure. En chauffage, il capte les calories de l'air extérieur pour les restituer à l'intérieur. En rafraîchissement, le cycle s'inverse.",
          visual: (
            <figure className="overflow-hidden rounded border border-[#d2ccc1] bg-white shadow-sm">
              <div className="border-b border-[#e8e2d8] bg-[#f8f5f0] px-5 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9a6034]">Schéma de fonctionnement</p>
                <p className="mt-0.5 text-xs font-semibold text-[#17221c]">Pompe à chaleur air / air — cycles chauffage &amp; rafraîchissement</p>
              </div>
              <img
                src="/schema-pac-air-air.webp"
                alt="Schéma de fonctionnement d'une pompe à chaleur air/air en mode chauffage et rafraîchissement"
                className="w-full"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="border-t border-[#e8e2d8] px-5 py-3 text-xs leading-5 text-[#8a948e]">
                En mode chauffage, la PAC extrait les calories de l'air extérieur et les restitue à l'intérieur via le fluide frigorigène. En mode rafraîchissement, le cycle s'inverse.
              </figcaption>
            </figure>
          ),
          callout:
            "Un entretien annuel des filtres et des unités (nettoyage, vérification du fluide) est indispensable pour maintenir les performances SCOP/SEER.",
        },
        {
          heading: "04. Contraintes acoustiques et réglementaires",
          body: "L'unité extérieure génère un niveau sonore qu'il est impératif d'anticiper lors de la conception du projet. La réglementation française encadre strictement les nuisances sonores des équipements de climatisation en milieu résidentiel.",
          bullets: [
            "Article R. 1336-7 du Code de la santé publique : émergence ≤ 5 dB(A) le jour, 3 dB(A) la nuit",
            "Distances minimales par rapport aux limites de propriété et aux ouvertures",
            "Supports antivibratiles et silent-blocs recommandés pour toutes les installations",
            "Déclaration préalable en mairie possible selon les règles d'urbanisme locales",
          ],
          callout:
            "Vérifiez les règles de copropriété et le PLU avant installation : certaines communes ou copropriétés imposent des restrictions supplémentaires.",
        },
        {
          heading: "05. Eau chaude sanitaire et compléments",
          body: "La PAC air/air ne produit pas d'eau chaude sanitaire. Pour un logement entièrement électrifié, il est nécessaire de prévoir un équipement dédié. Le chauffe-eau thermodynamique est la solution la plus économe, utilisant lui aussi les calories de l'air ambiant.",
          bullets: [
            "Chauffe-eau thermodynamique : COP de 2,5 à 3,5, compatible MaPrimeRénov'",
            "Chauffe-eau solaire individuel (CESI) : excellente solution en zone ensoleillée",
            "Chauffe-eau électrique à résistance : solution de secours ou d'appoint uniquement",
            "Prévoir l'emplacement et le volume (150 à 300 L selon le foyer) dès la conception",
          ],
          callout:
            "Un chauffe-eau thermodynamique peut réduire la facture ECS de 60 à 70 % par rapport à un chauffe-eau électrique classique.",
        },
      ]}
      faqs={[
        {
          question: "La PAC air/air produit-elle de l'eau chaude sanitaire ?",
          answer:
            "Non. La PAC air/air traite uniquement l'air ambiant. La production d'eau chaude sanitaire nécessite un équipement dédié : chauffe-eau thermodynamique, chauffe-eau électrique ou solaire.",
        },
        {
          question: "Quelle est la différence entre SCOP et SEER ?",
          answer:
            "Le SCOP (Seasonal Coefficient of Performance) mesure l'efficacité en mode chauffage sur une saison complète. Le SEER (Seasonal Energy Efficiency Ratio) mesure l'efficacité en mode rafraîchissement. Plus ces valeurs sont élevées, plus l'appareil est économe.",
        },
        {
          question: "La PAC air/air est-elle éligible à MaPrimeRénov' ?",
          answer:
            "La PAC air/air est éligible à MaPrimeRénov' sous conditions : le logement doit être la résidence principale, construite depuis plus de 15 ans, et l'installateur doit être certifié RGE QualiPAC. Les montants varient selon les revenus du foyer.",
        },
      ]}
    />
  ),
});
