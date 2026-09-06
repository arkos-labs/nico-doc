import { createFileRoute } from "@tanstack/react-router";
import { BASE_URL } from "@/lib/site-identity";
import { SiloPage } from "@/components/site/SiloPage";

const title = "Géothermie : pompe à chaleur sol/eau pour des rendements exceptionnels";
const description =
  "La PAC géothermique puise une énergie stable dans le sol via captage horizontal ou vertical. Performances, contraintes d'installation et conditions d'éligibilité en 2026.";

export const Route = createFileRoute("/pac-geothermie")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${BASE_URL}/pac-geothermie` },
      { property: "og:image", content: `${BASE_URL}/og-default.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/pac-geothermie` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Quelle surface de terrain faut-il pour un captage horizontal ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "La surface nécessaire est généralement 1,5 à 2 fois la surface habitable du logement. Pour une maison de 120 m², comptez 180 à 240 m² de terrain libre, non bâti, non goudronné et non planté d'arbres.",
              },
            },
            {
              "@type": "Question",
              name: "Faut-il une autorisation pour forer un puits géothermique ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Oui. Le forage est soumis au Code minier et nécessite une déclaration en mairie (formulaire Cerfa n° 13837) ainsi qu'une autorisation préfectorale selon la profondeur. Une entreprise certifiée RGE Forage est obligatoire.",
              },
            },
            {
              "@type": "Question",
              name: "La géothermie est-elle plus rentable que l'aérothermie ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Sur le long terme, oui. Le COP de la géothermie (4 à 6) est supérieur à celui de l'aérothermie (3 à 5) car la température du sol est stable. L'investissement initial est plus élevé (forage) mais les coûts d'exploitation sont inférieurs et la durée de vie des capteurs dépasse 50 ans.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <SiloPage
      slug="pac-geothermie"
      eyebrow="Énergie renouvelable"
      h1="Géothermie : des performances stables toute l'année, indépendantes du climat."
      intro="La pompe à chaleur géothermique exploite la chaleur constante du sol, été comme hiver. Sans cycles de dégivrage, sans perte de rendement par grand froid : la solution la plus stable du marché."
      highlights={[
        {
          value: "COP 4 à 6",
          label: "Rendement supérieur à l'aérothermie grâce à la stabilité thermique du sol",
        },
        {
          value: "+ 50 ans",
          label: "Durée de vie des capteurs enterrés, investissement amorti sur le long terme",
        },
        {
          value: "RGE Forage",
          label: "Certification obligatoire pour l'entreprise réalisant le captage",
        },
      ]}
      sections={[
        {
          heading: "01. Principe de la géothermie de surface",
          body: "Contrairement à l'aérothermie qui dépend des variations de température de l'air extérieur, la géothermie exploite la stabilité thermique du sous-sol. À partir de quelques mètres de profondeur, la température oscille entre 10 et 15 °C toute l'année, quelle que soit la saison.",
          bullets: [
            "Température du sol stable : +10 à +15 °C en France métropolitaine à 1–2 m",
            "Aucun cycle de dégivrage nécessaire, contrairement aux PAC aérothermiques",
            "Performances constantes en hiver, même lors des vagues de froid prolongées",
            "Source d'énergie classée renouvelable par la directive européenne 2009/28/CE",
          ],
          visual: (
            <figure className="overflow-hidden rounded border border-[#d2ccc1] bg-white shadow-sm">
              <div className="border-b border-[#e8e2d8] bg-[#f8f5f0] px-5 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9a6034]">Schéma de principe</p>
                <p className="mt-1 text-base font-semibold text-[#17221c]">Pompe à chaleur géothermique — captage et circuit hydraulique</p>
              </div>
              <img
                src="/schema-pac-geothermie.webp"
                alt="Schéma de fonctionnement d'une pompe à chaleur géothermique montrant le captage de chaleur dans le sol via des sondes et son transfert au circuit de chauffage"
                className="w-full"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="border-t border-[#e8e2d8] px-5 py-3 text-xs leading-5 text-[#8a948e]">
                La PAC géothermique capte l'énergie thermique stable du sous-sol via des capteurs horizontaux ou des sondes verticales forées, et la transfère au circuit de chauffage intérieur.
              </figcaption>
            </figure>
          ),
          callout:
            "La géothermie de surface (< 200 m) est à distinguer de la géothermie profonde, réservée à des usages industriels ou de réseaux de chaleur.",
        },
        {
          heading: "02. Captage horizontal",
          body: "Le captage horizontal consiste à enfouir des tubes à glycol (capteurs) à 60–120 cm de profondeur sur une grande surface. L'eau glycolée capte les calories du sol et les transfère à la PAC. C'est la solution la plus simple techniquement, mais elle exige une grande surface de terrain.",
          bullets: [
            "Surface nécessaire : 1,5 à 2 fois la surface habitable (ex. : 180–240 m² pour 120 m²)",
            "Profondeur d'enfouissement : 60 à 120 cm selon la réglementation locale",
            "Terrain libre de tout bâtiment, revêtement imperméable ou plantation d'arbres",
            "Coût inférieur au forage vertical, mise en œuvre plus rapide",
          ],
          callout:
            "La surface captante ne peut être bâtie, goudronnée ou plantée d'arbres — elle doit rester perméable et végétalisée pour recharger thermiquement le sol.",
        },
        {
          heading: "03. Captage vertical (sondes géothermiques)",
          body: "Lorsque la surface de terrain est limitée, le captage vertical par sondes forées est la solution retenue. Des tubes en U sont descendus dans des forages de 50 à 200 m de profondeur. Cette technique exploite des températures de sol plus stables et plus élevées, avec une emprise au sol minimale.",
          bullets: [
            "Profondeur de forage : 50 à 200 m selon les besoins et la géologie locale",
            "Emprise au sol minimale : idéal pour les terrains de taille réduite",
            "Soumis au Code minier : déclaration Cerfa n° 13837, autorisation préfectorale",
            "Durée de vie des sondes > 50 ans, coulis de scellement à l'eau de ciment obligatoire",
          ],
          callout:
            "Une étude géologique préalable (test de réponse thermique) est fortement recommandée pour dimensionner correctement les sondes et éviter une sous-performance.",
        },
        {
          heading: "04. Certifications et cadre réglementaire",
          body: "L'installation d'une PAC géothermique est strictement encadrée pour protéger les ressources en eau souterraine. Le foreur doit impérativement disposer de la certification RGE Forage, et les travaux doivent être déclarés auprès des autorités compétentes.",
          bullets: [
            "Certification RGE QualiPAC obligatoire pour l'installateur de la PAC",
            "Certification RGE Forage obligatoire pour l'entreprise réalisant le captage",
            "Déclaration DREAL selon la profondeur (Code de l'environnement L214-1)",
            "Respect des distances vis-à-vis des puits, forages et périmètres de captage AEP",
          ],
        },
        {
          heading: "05. Budget et aides disponibles",
          body: "Le coût d'une installation géothermique est plus élevé qu'une PAC aérothermique, principalement en raison du forage. Toutefois, les performances supérieures et la longévité des capteurs assurent une rentabilité sur le moyen-long terme. Les aides sont les mêmes que pour toute PAC.",
          bullets: [
            "Coût total : 15 000 à 30 000 € selon configuration (captage + PAC + raccordement)",
            "MaPrimeRénov' applicable selon les revenus et critères RGE",
            "CEE cumulables avec les autres aides d'État",
            "TVA réduite à 5,5 % sur la fourniture et la pose",
          ],
          callout:
            "Le retour sur investissement se calcule sur 15 à 25 ans selon le coût de l'électricité et les performances de l'installation. Les capteurs eux-mêmes durent plus de 50 ans.",
        },
      ]}
      faqs={[
        {
          question: "Quelle surface de terrain faut-il pour un captage horizontal ?",
          answer:
            "La surface nécessaire est généralement 1,5 à 2 fois la surface habitable du logement. Pour une maison de 120 m², comptez 180 à 240 m² de terrain libre, non bâti, non goudronné et non planté d'arbres.",
        },
        {
          question: "Faut-il une autorisation pour forer un puits géothermique ?",
          answer:
            "Oui. Le forage est soumis au Code minier et nécessite une déclaration en mairie (formulaire Cerfa n° 13837) ainsi qu'une autorisation préfectorale selon la profondeur. Une entreprise certifiée RGE Forage est obligatoire.",
        },
        {
          question: "La géothermie est-elle plus rentable que l'aérothermie ?",
          answer:
            "Sur le long terme, oui. Le COP de la géothermie (4 à 6) est supérieur à celui de l'aérothermie (3 à 5) car la température du sol est stable. L'investissement initial est plus élevé (forage) mais les coûts d'exploitation sont inférieurs et la durée de vie des capteurs dépasse 50 ans.",
        },
      ]}
    />
  ),
});
