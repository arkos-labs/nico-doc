import { createFileRoute } from "@tanstack/react-router";
import { BASE_URL } from "@/lib/site-identity";
import { SiloPage } from "@/components/site/SiloPage";

const title = "PAC vs chaudière gaz : comparatif complet pour faire le bon choix";
const description =
  "Pompe à chaleur ou chaudière gaz : coût d'installation, consommation, aides financières, bilan carbone. Comparatif objectif pour choisir le bon système de chauffage.";

export const Route = createFileRoute("/pompe-a-chaleur-vs-chaudiere-gaz")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${BASE_URL}/pompe-a-chaleur-vs-chaudiere-gaz` },
      { property: "og:image", content: `${BASE_URL}/og-default.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/pompe-a-chaleur-vs-chaudiere-gaz` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "La pompe à chaleur est-elle plus économique qu'une chaudière gaz ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Sur le long terme, une PAC air/eau présente généralement un coût de fonctionnement inférieur à une chaudière gaz condensation, grâce à un rendement (COP) de 3 à 5 contre 0,9 à 1 pour la chaudière. La rentabilité dépend du prix de l'électricité, de l'isolation du logement et du SCOP réel de l'équipement.",
              },
            },
            {
              "@type": "Question",
              name: "Peut-on remplacer une chaudière gaz par une PAC sans changer les radiateurs ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Oui, sous conditions. La PAC air/eau fonctionne en basse température (35–45 °C), ce qui nécessite des radiateurs surdimensionnés ou un plancher chauffant. Des radiateus à eau basse température ou un plancher chauffant maximisent les performances. Un diagnostics thermique préalable est indispensable.",
              },
            },
            {
              "@type": "Question",
              name: "Peut-on encore installer une chaudière gaz en 2026 ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "En 2026, l'installation d'une nouvelle chaudière gaz à condensation reste techniquement possible mais n'est plus éligible à MaPrimeRénov'. La réglementation européenne prévoit l'interdiction des nouvelles chaudières fonctionnant uniquement aux combustibles fossiles à partir de 2040 dans le cadre de la directive sur les performances énergétiques des bâtiments.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <SiloPage
      slug="pompe-a-chaleur-vs-chaudiere-gaz"
      eyebrow="Comparatif systèmes de chauffage"
      h1="PAC vs chaudière gaz : quel système choisir pour rénover son chauffage ?"
      intro="Remplacer une chaudière gaz par une pompe à chaleur est l'un des projets de rénovation les plus courants. Les deux technologies n'ont pas le même profil de coût, de confort ni d'impact environnemental. Voici un comparatif objectif pour éclairer votre décision."
      highlights={[
        {
          value: "COP 3–5",
          label: "Rendement d'une PAC : pour 1 kWh électrique consommé, 3 à 5 kWh de chaleur produits",
        },
        {
          value: "0 aide",
          label: "La chaudière gaz n'est plus éligible à MaPrimeRénov' depuis 2022",
        },
        {
          value: "−60 %",
          label: "Réduction des émissions de CO₂ estimée en passant du gaz à une PAC électrique",
        },
      ]}
      sections={[
        {
          heading: "01. Rendement et coût de fonctionnement",
          body: "Le principal avantage de la pompe à chaleur est son rendement (COP ou SCOP) très supérieur à celui d'une chaudière gaz. Là où la chaudière brûle du gaz avec un rendement de 90 à 100 %, la PAC capte l'énergie dans l'air ou le sol pour produire 3 à 5 fois plus d'énergie thermique que l'électricité consommée.",
          bullets: [
            "Chaudière gaz condensation : rendement 90–100 %, dépend du prix du gaz",
            "PAC air/eau : SCOP 3,5 à 5 selon le modèle et le climat",
            "En France en 2026 : coût moyen du gaz ~0,12 €/kWh, électricité ~0,25 €/kWh",
            "Avec un SCOP de 4, la PAC produit 1 kWh thermique pour 0,06 € → moins cher que le gaz",
            "L'écart de rentabilité dépend fortement de l'isolation du logement",
          ],
          callout:
            "Un logement mal isolé (DPE F ou G) bénéficiera moins du changement de chauffage. L'idéal est de traiter l'isolation avant ou simultanément au remplacement du système de chauffage.",
        },
        {
          heading: "02. Coût d'installation et aides financières",
          body: "L'investissement initial est sensiblement différent entre les deux solutions. La PAC bénéficie de subventions importantes via MaPrimeRénov' et les primes CEE, ce qui peut significativement réduire le reste à charge.",
          bullets: [
            "Chaudière gaz condensation : installation 3 000 à 6 000 € — aucune aide d'État en 2026",
            "PAC air/eau : installation 8 000 à 18 000 € selon la puissance et les travaux associés",
            "MaPrimeRénov' PAC air/eau : de 1 000 € (revenus supérieurs) à 5 000 € (revenus très modestes)",
            "Prime CEE Coup de Pouce Chauffage : peut atteindre 4 000 € supplémentaires",
            "Éco-PTZ : jusqu'à 50 000 € sans intérêts pour financer le reste à charge",
          ],
          callout:
            "Le cumul MaPrimeRénov' + CEE peut couvrir 40 à 60 % du coût de la PAC pour les ménages modestes, rendant la rentabilité de l'investissement nettement plus rapide.",
        },
        {
          heading: "03. Compatibilité avec l'installation existante",
          body: "La compatibilité de la PAC avec les émetteurs existants est un point crucial souvent sous-estimé. Une chaudière gaz peut fonctionner à haute température (70–80 °C), tandis qu'une PAC air/eau fonctionne de manière optimale en basse température (35–45 °C).",
          bullets: [
            "Plancher chauffant : totalement compatible avec la PAC basse température",
            "Radiateurs basse température : compatibles si bien dimensionnés",
            "Radiateurs classiques fonte ou acier : souvent sous-dimensionnés, remplacement possible",
            "Réseau hydraulique existant : peut être conservé si en bon état",
            "ECS (eau chaude sanitaire) : la PAC air/eau peut assurer la production si couplée à un ballon",
          ],
          callout:
            "Un bilan thermique du logement (calcul des déperditions selon NF EN 12831) est indispensable avant tout dimensionnement de PAC. Sans ce calcul, la PAC risque d'être sous-dimensionnée ou sur-dimensionnée.",
        },
        {
          heading: "04. Bilan carbone et réglementation",
          body: "Au-delà de l'économie, le choix entre PAC et chaudière gaz a un impact significatif sur les émissions de CO₂. La réglementation française et européenne s'oriente clairement vers la sortie progressive du chauffage au gaz dans les bâtiments résidentiels.",
          bullets: [
            "Chaudière gaz : ~230 g CO₂/kWh (combustion directe de gaz fossile)",
            "PAC électrique : ~30–50 g CO₂/kWh avec le mix électrique français (majoritairement nucléaire)",
            "Réduction des émissions : de −60 à −85 % selon le SCOP et le contenu carbone du réseau",
            "Directive UE EPBD : interdiction des nouvelles chaudières gaz fossile pur à partir de 2040",
            "Loi Climat et Résilience : les logements DPE G ne peuvent plus être loués depuis 2025",
          ],
        },
      ]}
      faqs={[
        {
          question: "Faut-il isoler avant de remplacer la chaudière gaz par une PAC ?",
          answer:
            "C'est fortement recommandé, mais pas toujours obligatoire. Une PAC fonctionne mieux dans un logement bien isolé (moins de besoins de chauffage = meilleur SCOP réel). Si le logement est très mal isolé, une rénovation globale (isolation + PAC) dans le cadre du parcours accompagné MaPrimeRénov' est souvent plus rentable qu'un changement de chaudière seul.",
        },
        {
          question: "La PAC peut-elle remplacer intégralement la chaudière gaz (chauffage + eau chaude) ?",
          answer:
            "Oui. Une PAC air/eau avec production d'eau chaude sanitaire (PAC combinée ou couplée à un ballon thermodynamique) peut assurer les deux fonctions. C'est la configuration la plus courante lors d'un remplacement complet de chaudière gaz.",
        },
        {
          question: "Peut-on garder la chaudière gaz en appoint de la PAC ?",
          answer:
            "Oui. Le montage bivalent PAC + chaudière gaz en appoint est techniquement possible. La chaudière gaz ne fonctionne alors que lors des pics de froid (< −10 °C), ce qui optimise le rendement global. Ce montage réduit cependant les aides disponibles et complique la maintenance.",
        },
        {
          question: "La chaudière gaz est-elle vraiment moins chère à l'usage qu'une PAC ?",
          answer:
            "Plus en 2026 dans la plupart des configurations. Avec un prix du gaz autour de 0,12 €/kWh et de l'électricité à 0,25 €/kWh, une PAC avec un SCOP de 4 revient à environ 0,063 €/kWh produit, contre 0,13 €/kWh pour la chaudière gaz (en tenant compte d'un rendement de 95 %). L'écart dépend toutefois fortement du tarif de souscription et de la puissance souscrite.",
        },
      ]}
    />
  ),
});
