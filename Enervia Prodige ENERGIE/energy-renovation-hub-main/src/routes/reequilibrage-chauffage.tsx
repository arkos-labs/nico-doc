import { createFileRoute } from "@tanstack/react-router";
import { BASE_URL } from "@/lib/site-identity";
import { SiloPage } from "@/components/site/SiloPage";

const title = "Rééquilibrage hydraulique : optimisez votre réseau de chauffage";
const description =
  "Le rééquilibrage du réseau de chauffage (ou équilibrage hydraulique) permet d'harmoniser la température dans toutes vos pièces, de faire des économies d'énergie et de réduire les bruits.";

export const Route = createFileRoute("/reequilibrage-chauffage")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${BASE_URL}/reequilibrage-chauffage` },
      { property: "og:image", content: `${BASE_URL}/og-default.jpg` },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/reequilibrage-chauffage` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Pourquoi mes radiateurs sont-ils froids alors que la chaudière tourne ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Si les radiateurs proches de la chaudière sont brûlants et les plus éloignés sont froids, c'est le signe d'un mauvais équilibrage. L'eau choisit le chemin le plus court (le moins résistant). Le rééquilibrage hydraulique vient corriger ce problème.",
              },
            },
            {
              "@type": "Question",
              name: "Le rééquilibrage hydraulique fait-il faire des économies ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Oui, un bon équilibrage permet de réduire votre consommation d'énergie de 10 à 15 %. Il évite la surchauffe des pièces proches de la chaudière et permet d'abaisser la température générale de départ d'eau.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <SiloPage
      slug="reequilibrage-chauffage"
      eyebrow="Entretien & Optimisation"
      h1="Rééquilibrage hydraulique : l'art de répartir la chaleur."
      intro="Certains radiateurs sont brûlants tandis que d'autres restent froids ? L'équilibrage hydraulique corrige ce défaut. En réglant les débits de votre réseau, vous gagnez en confort, économisez jusqu'à 15% d'énergie et supprimez les bruits de circulation d'eau."
      highlights={[
        {
          value: "-15 %",
          label: "D'économies d'énergie réalisables en évitant les surchauffes localisées",
        },
        {
          value: "Homogène",
          label: "La température est lissée et identique dans toutes les pièces équipées",
        },
        {
          value: "Silence",
          label: "Finis les sifflements et bruits d'eau intempestifs dans les tuyaux",
        },
      ]}
      sections={[
        {
          heading: "01. Pourquoi faire un rééquilibrage ?",
          body: "Dans un circuit de chauffage central, l'eau chaude circule naturellement en empruntant le chemin qui offre le moins de résistance. Conséquence : les radiateurs situés près de la source de chaleur (chaudière ou PAC) sont sur-alimentés et chauffent trop, tandis que ceux situés en bout de circuit sont sous-alimentés et restent tièdes, voire froids.",
          bullets: [
            "Inconfort thermique : écarts de température importants selon les pièces",
            "Gaspillage énergétique : surchauffe inutile des premières pièces du circuit",
            "Nuisances sonores : l'excès de débit provoque des sifflements dans les vannes",
            "Usure prématurée : la pompe de circulation (circulateur) force inutilement",
          ],
          callout: "Le rééquilibrage hydraulique (ou réglage des organes de chauffe) est l'intervention technique qui consiste à corriger ces déséquilibres en bridant le débit là où il est excessif, pour le rediriger là où il manque.",
          visual: (
            <figure className="overflow-hidden rounded border border-[#d2ccc1] bg-white shadow-sm">
              <div className="border-b border-[#e8e2d8] bg-[#f8f5f0] px-5 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9a6034]">Schéma de principe</p>
                <p className="mt-1 text-base font-semibold text-[#17221c]">Réseau déséquilibré</p>
              </div>
              <img
                src="/reequilibrage-schema.png"
                alt="Schéma montrant un circuit de chauffage déséquilibré avec un radiateur trop chaud et un autre trop froid"
                className="w-full"
              />
              <figcaption className="border-t border-[#e8e2d8] px-5 py-3 text-xs leading-5 text-[#8a948e]">
                Sans réglage, l'eau chaude se dirige vers les premiers radiateurs (qui surchauffent), délaissant les radiateurs les plus éloignés (qui restent froids).
              </figcaption>
            </figure>
          ),
        },
        {
          heading: "02. Comment se déroule l'intervention ?",
          body: "L'opération doit être réalisée par un chauffagiste qualifié. Elle consiste à calculer les besoins réels de chaque émetteur (radiateur ou boucle de plancher chauffant) et à ajuster physiquement les débits de l'eau.",
          bullets: [
            "Réglage des tés (ou coudes) de réglage situés en sortie de chaque radiateur",
            "Installation ou ajustement de vannes d'équilibrage sur les colonnes principales",
            "Mise en place de robinets thermostatiques auto-équilibrants pour une gestion autonome",
            "Ajustement de la vitesse du circulateur et de la courbe de chauffe",
          ],
        },
        {
          heading: "03. Rééquilibrage et Désembouage : le duo gagnant",
          body: "Très souvent, un réseau de chauffage déséquilibré est aussi un réseau emboué. La boue (corrosion, calcaire, micro-organismes) obstrue les tuyaux et aggrave les problèmes de circulation d'eau.",
          bullets: [
            "Il est vivement conseillé d'effectuer un désembouage hydrodynamique avant tout rééquilibrage.",
            "Régler un réseau propre garantit une performance optimale et durable de votre installation.",
            "L'association des deux prestations redonne à votre système (notamment aux pompes à chaleur) son rendement d'origine (COP optimisé).",
          ],
        },
      ]}
      faqs={[
        {
          question: "Quand faut-il prévoir un rééquilibrage du réseau ?",
          answer:
            "L'équilibrage est fortement recommandé lors de l'installation d'une nouvelle pompe à chaleur ou chaudière, lors du remplacement ou de l'ajout de radiateurs, ou tout simplement si vous constatez que certaines pièces sont systématiquement plus froides que d'autres ou que vos canalisations sont bruyantes.",
        },
        {
          question: "Est-ce qu'on doit équilibrer un plancher chauffant ?",
          answer:
            "Absolument. Un plancher chauffant est divisé en plusieurs boucles (circuits). Si ces boucles ne sont pas équilibrées au niveau de la nourrice (collecteur), les petites pièces chaufferont beaucoup trop vite par rapport aux grandes pièces à vivre.",
        },
        {
          question: "Puis-je équilibrer mon réseau moi-même ?",
          answer:
            "C'est déconseillé. Bien qu'il suffise d'une clé Allen pour tourner un té de réglage, définir le bon débit pour chaque radiateur nécessite des calculs de perte de charge et des mesures précises que seul un professionnel maîtrise pour obtenir un résultat homogène.",
        },
      ]}
    />
  )
});
