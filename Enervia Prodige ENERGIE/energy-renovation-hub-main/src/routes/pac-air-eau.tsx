import { createFileRoute } from "@tanstack/react-router";
import { BASE_URL } from "@/lib/site-identity";
import { SiloPage } from "@/components/site/SiloPage";

const title = "PAC air/eau : remplacement de chaudière et chauffage 2026";
const description =
  "La pompe à chaleur air/eau s'intègre dans un réseau hydraulique existant. Découvrez ses atouts, ses contraintes techniques et les aides disponibles en 2026.";

export const Route = createFileRoute("/pac-air-eau")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${BASE_URL}/pac-air-eau` },
      { property: "og:image", content: `${BASE_URL}/og-default.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/pac-air-eau` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "La PAC air/eau peut-elle remplacer une chaudière fioul ou gaz ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Oui, c'est même son usage principal. Elle se connecte au réseau hydraulique existant (radiateurs, plancher chauffant) sous réserve d'une étude de compatibilité des émetteurs et d'un dimensionnement précis.",
              },
            },
            {
              "@type": "Question",
              name: "Qu'est-ce que le fluide R290 et pourquoi est-il recommandé ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Le R290 (propane) est un fluide frigorigène naturel au très faible impact climatique (GWP = 3). Il permet d'atteindre de hautes températures de départ, compatibles avec les radiateurs existants, et s'inscrit dans la réglementation F-Gas qui interdit progressivement les anciens HFC.",
              },
            },
            {
              "@type": "Question",
              name: "Mon logement est-il éligible à MaPrimeRénov' pour une PAC air/eau ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "L'éligibilité dépend de vos revenus, du type de logement et de la certification RGE de l'installateur. Un rendez-vous préalable avec un conseiller France Rénov' est désormais obligatoire pour les rénovations ampleur. Vérifiez votre situation sur france-renov.gouv.fr.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <SiloPage
      slug="pac-air-eau"
      eyebrow="Chauffage bas carbone"
      h1="PAC air/eau : remplacez votre chaudière sans changer vos radiateurs."
      intro="La pompe à chaleur air/eau puise les calories de l'air extérieur pour alimenter votre circuit hydraulique existant. Radiateurs, plancher chauffant : une transition bas carbone sans tout refaire."
      highlights={[
        {
          value: "COP 3 à 5",
          label: "Pour 1 kWh électrique consommé, 3 à 5 kWh de chaleur produits",
        },
        {
          value: "R290",
          label: "Fluide propane naturel, GWP = 3, compatible hautes températures",
        },
        {
          value: "DTU 65.16",
          label: "Norme d'installation obligatoire, entreprise RGE QualiPAC requise",
        },
      ]}
      sections={[
        {
          heading: "01. Principe de fonctionnement",
          body: "La PAC air/eau capte les calories contenues dans l'air extérieur — même par grand froid jusqu'à −15 °C — et les transfère à l'eau du circuit de chauffage via un échangeur thermique. Un compresseur élève la température du fluide frigorigène pour atteindre la température de départ requise par vos émetteurs.",
          bullets: [
            "Cycle thermodynamique : évaporateur → compresseur → condenseur → détendeur",
            "Températures de départ jusqu'à 65–75 °C avec les nouveaux modèles haute température",
            "Compatible radiateurs acier, fonte, aluminium et plancher chauffant",
            "Mode dégivrage automatique intégré pour les périodes de gel",
          ],
          visual: (
            <figure className="overflow-hidden rounded border border-[#d2ccc1] bg-white shadow-sm">
              <div className="border-b border-[#e8e2d8] bg-[#f8f5f0] px-5 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9a6034]">Schéma de principe</p>
                <p className="mt-1 text-base font-semibold text-[#17221c]">Pompe à chaleur air / eau — circuit hydraulique</p>
              </div>
              <img
                src="/schema-pac-air-eau.webp"
                alt="Schéma de fonctionnement d'une pompe à chaleur air/eau montrant le transfert de calories de l'air extérieur vers le circuit hydraulique intérieur"
                className="w-full"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="border-t border-[#e8e2d8] px-5 py-3 text-xs leading-5 text-[#8a948e]">
                La PAC capte les calories de l'air extérieur et les transfère à l'eau du circuit de chauffage via un échangeur thermique. Compatible radiateurs et plancher chauffant.
              </figcaption>
            </figure>
          ),
          callout:
            "Plus la température de départ est basse (plancher chauffant, radiateurs surdimensionnés), plus le COP est élevé et la consommation électrique réduite.",
        },
        {
          heading: "02. Fluides frigorigènes et réglementation F-Gas",
          body: "La réglementation F-Gas européenne impose la suppression progressive des HFC à fort potentiel de réchauffement climatique (GWP > 150). Les nouveaux équipements migrent vers des fluides naturels ou de synthèse de dernière génération, offrant un bilan environnemental nettement amélioré.",
          bullets: [
            "R290 (propane) : GWP = 3, haute performance, compatible haute température",
            "R32 : GWP = 675, alternative courante sur les modèles split",
            "Interdiction progressive des fluides R410A (GWP = 2 088) à partir de 2025",
            "Choix du fluide conditionné par la puissance, la réglementation et l'usage",
          ],
          callout:
            "Exigez de votre installateur la fiche technique du fluide utilisé et vérifiez sa conformité F-Gas avant signature du devis.",
        },
        {
          heading: "03. Compatibilité avec l'installation existante",
          body: "Avant toute installation, un bilan thermique pièce par pièce et une analyse de l'installation existante sont indispensables. La compatibilité des émetteurs (surface, température de départ), la puissance électrique disponible et les contraintes acoustiques conditionneront la faisabilité du projet.",
          bullets: [
            "Calcul des déperditions réelles selon la RT existante (méthode Th-BCE)",
            "Vérification de la surface et du type des radiateurs pour le régime basse température",
            "Bilan électrique : triphasé souvent requis pour les modèles > 9 kW",
            "Implantation de l'unité extérieure : distances réglementaires et nuisances sonores",
          ],
          callout:
            "Un surdimensionnement génère des cycles courts (court-cyclage) qui dégradent le COP et usent prématurément le compresseur.",
        },
        {
          heading: "04. Production d'eau chaude sanitaire",
          body: "La PAC air/eau peut assurer la production d'eau chaude sanitaire (ECS) de plusieurs façons : ballon tampon intégré, chauffe-eau thermodynamique en appoint ou ballon de stockage dédié. L'intégration dépend des besoins du foyer, du volume disponible et des températures de départ.",
          bullets: [
            "Ballon tampon intégré : solution compacte, volume limité (150–300 L)",
            "Production en relève électrique lors des pics de demande (douches matinales)",
            "Anti-légionellose : cycle de chauffe à 60 °C automatique programmable",
            "Comptage séparé ECS/chauffage recommandé pour optimiser les usages",
          ],
        },
        {
          heading: "05. Aides financières et budget",
          body: "La PAC air/eau est éligible à MaPrimeRénov' (par geste ou rénovation d'ampleur) selon les revenus du foyer et les critères techniques. Les CEE (Certificats d'Économies d'Énergie) peuvent également se cumuler. Un rendez-vous France Rénov' est obligatoire avant les travaux d'ampleur.",
          bullets: [
            "MaPrimeRénov' par geste : montant selon catégorie de revenus (Bleu, Jaune, Violet, Rose)",
            "CEE : prime versée par les obligés, cumulable avec MaPrimeRénov'",
            "TVA réduite à 5,5 % pour les travaux de rénovation énergétique",
            "Éco-PTZ jusqu'à 50 000 € pour compléter le financement",
          ],
          callout:
            "Les montants d'aides indiqués dans le simulateur sont des estimations. Seul un conseiller France Rénov' habilité peut confirmer votre éligibilité et le montant définitif.",
        },
      ]}
      faqs={[
        {
          question: "La PAC air/eau peut-elle remplacer une chaudière fioul ou gaz ?",
          answer:
            "Oui, c'est même son usage principal. Elle se connecte au réseau hydraulique existant (radiateurs, plancher chauffant) sous réserve d'une étude de compatibilité des émetteurs et d'un dimensionnement précis.",
        },
        {
          question: "Qu'est-ce que le fluide R290 et pourquoi est-il recommandé ?",
          answer:
            "Le R290 (propane) est un fluide frigorigène naturel au très faible impact climatique (GWP = 3). Il permet d'atteindre de hautes températures de départ, compatibles avec les radiateurs existants, et s'inscrit dans la réglementation F-Gas qui interdit progressivement les anciens HFC.",
        },
        {
          question: "Mon logement est-il éligible à MaPrimeRénov' pour une PAC air/eau ?",
          answer:
            "L'éligibilité dépend de vos revenus, du type de logement et de la certification RGE de l'installateur. Un rendez-vous préalable avec un conseiller France Rénov' est désormais obligatoire pour les rénovations ampleur. Vérifiez votre situation sur france-renov.gouv.fr.",
        },
      ]}
    />
  ),
});
