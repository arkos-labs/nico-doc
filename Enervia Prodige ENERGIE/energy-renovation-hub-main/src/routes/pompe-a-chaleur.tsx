import { createFileRoute, Link } from "@tanstack/react-router";
import { BASE_URL } from "@/lib/site-identity";
import { ArrowRight } from "lucide-react";
import { SiloPage } from "@/components/site/SiloPage";

const title = "Pompe à chaleur : comprendre les solutions en 2026";
const description =
  "Air/eau, air/air ou géothermie : comprendre les usages, contraintes et critères de choix d'une pompe à chaleur pour un projet de rénovation.";

export const Route = createFileRoute("/pompe-a-chaleur")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${BASE_URL}/pompe-a-chaleur` },
      { property: "og:image", content: `${BASE_URL}/og-default.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/pompe-a-chaleur` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Une pompe à chaleur convient-elle à toutes les maisons ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Non, l'isolation, les émetteurs, la puissance électrique disponible, le climat et les contraintes d'implantation doivent être rigoureusement étudiés avant de retenir cette solution.",
              },
            },
            {
              "@type": "Question",
              name: "Faut-il isoler avant de changer de chauffage ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Traiter les déperditions thermiques peut réduire le besoin de chauffage et éviter d'investir dans un équipement surdimensionné lors des travaux. Cela dépend toutefois de l'état réel et avéré du logement.",
              },
            },
            {
              "@type": "Question",
              name: "Le simulateur confirme-t-il les montants des aides ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Non, il fournit une première indication globale. L'éligibilité, les conditionnements techniques (certifications RGE) et le montant définitif doivent être vérifiés auprès des organismes compétents.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <SiloPage
      slug="pompe-a-chaleur"
      eyebrow="Chauffage performant"
      h1="Choisir une pompe à chaleur adaptée au logement."
      intro="Une pompe à chaleur ne se choisit pas uniquement selon la surface. L'isolation, les émetteurs existants, le climat et les usages du foyer déterminent la solution à étudier."
      highlights={[
        {
          value: "Air / eau",
          label: "Idéale avec le fluide écologique R290 pour un réseau hydraulique existant",
        },
        { value: "Air / air", label: "Performante en fluide R32 pour un confort pièce par pièce" },
        {
          value: "Géothermie",
          label: "Une source d'énergie d'une stabilité exceptionnelle (RGE Forage)",
        },
      ]}
      sections={[
        {
          heading: "01. Pompe à chaleur air/eau",
          body: "Conçue pour alimenter un circuit de chauffage hydraulique existant, la PAC air/eau récupère les calories de l'air extérieur pour chauffer l'eau de votre réseau. L'intégration des nouveaux fluides frigorigènes écologiques comme le R290 (propane) révolutionne la rénovation en permettant d'atteindre de hautes températures sans recourir aux anciens HFC fortement émetteurs de gaz à effet de serre (réglementation F-Gas).",
          bullets: [
            "Se substitue idéalement à une ancienne chaudière fioul ou gaz",
            "Production d'Eau Chaude Sanitaire (ECS) parfaitement intégrable",
            "Performances tributaires de la zone climatique et d'un dimensionnement millimétré",
            "Installation devant respecter le DTU 65.16 relatif aux pompes à chaleur",
          ],
          visual: (
            <Link
              to="/pac-air-eau"
              className="group inline-flex items-center gap-3 border border-[#b9783e] px-5 py-3 text-sm font-semibold text-[#b9783e] transition-colors hover:bg-[#b9783e] hover:text-white"
            >
              En savoir plus sur la PAC air/eau
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          ),
          callout:
            "Une étude thermique approfondie évite tout surdimensionnement coûteux ou sous-dimensionnement inconfortable.",
        },
        {
          heading: "02. Pompe à chaleur air/air",
          body: "La PAC air/air chauffe et rafraîchit l'air intérieur via des unités (murales, consoles ou réseau gainable), offrant une régulation thermique pièce par pièce très réactive. Contrairement aux modèles air/eau, elle ne s'interface pas avec un réseau hydraulique et ne produit généralement pas d'eau chaude sanitaire.",
          bullets: [
            "Anticipation rigoureuse de l'impact acoustique (art. R. 1336-7 du Code de la santé publique)",
            "Entretien régulier des filtres impératif pour maintenir le rendement (SCOP/SEER)",
            "Utilise majoritairement le fluide R32 pour un faible impact environnemental",
            "Un chauffe-eau thermodynamique indépendant sera généralement nécessaire",
          ],
          visual: (
            <Link
              to="/pac-air-air"
              className="group inline-flex items-center gap-3 border border-[#b9783e] px-5 py-3 text-sm font-semibold text-[#b9783e] transition-colors hover:bg-[#b9783e] hover:text-white"
            >
              En savoir plus sur la PAC air/air
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          ),
          callout:
            "En mode chauffage, le fluide frigorigène capte les calories de l'air extérieur (même à −15 °C) et les restitue à l'intérieur. En mode rafraîchissement, le cycle s'inverse.",
        },
        {
          heading: "03. Géothermie",
          body: "La pompe à chaleur géothermique puise une énergie thermique extrêmement stable dans le sol via un captage horizontal ou vertical, garantissant des rendements exceptionnels indépendamment de la température extérieure. Cette technologie de pointe s'affranchit des cycles de dégivrage hivernaux propres aux systèmes aérothermiques.",
          bullets: [
            "Exige une étude géologique approfondie du terrain et des autorisations (Code minier)",
            "Investissement initial lissé par la longévité exceptionnelle des capteurs",
            "Faiblesse des coûts d'exploitation et valorisation immédiate du patrimoine",
            "Intervention d'une entreprise certifiée RGE QualiPAC et RGE Forage incontournable",
          ],
          visual: (
            <Link
              to="/pac-geothermie"
              className="group inline-flex items-center gap-3 border border-[#b9783e] px-5 py-3 text-sm font-semibold text-[#b9783e] transition-colors hover:bg-[#b9783e] hover:text-white"
            >
              En savoir plus sur la géothermie
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          ),
        },
        {
          heading: "04. Réseaux de Chauffage Collectifs",
          body: "Pour les bâtiments résidentiels et tertiaires, l'état initial du réseau hydraulique et son équilibrage priment avant tout remplacement de générateur. Un diagnostic complet est nécessaire pour vérifier la compatibilité des infrastructures existantes avec l'intégration d'une nouvelle chaufferie haute performance.",
          bullets: [
            "Désembouage : Éliminer les boues magnétiques et dépôts obstruant les réseaux",
            "Équilibrage hydraulique : Régler précisément la distribution des débits et des pressions",
            "Régulation et pilotage : Déployer des systèmes de Gestion Technique du Bâtiment (GTB)",
            "Indispensable pour adapter la production aux usages réels et aux variations climatiques",
          ],
          callout:
            "L'état du réseau hydraulique et ses réglages doivent être examinés avant de recommander toute intervention.",
        },
        {
          heading: "06. Comparer les technologies",
          body: "Selon la configuration de votre logement, ses émetteurs et votre terrain disponible, une technologie sera plus adaptée qu'une autre. Chaque page détaille les contraintes spécifiques, les performances et les conditions d'éligibilité aux aides.",
          visual: (
            <div className="grid gap-4 sm:grid-cols-3">
              {([
                { to: "/pac-air-eau", label: "PAC air/eau", desc: "Réseau hydraulique existant · Remplacement chaudière · R290" },
                { to: "/pac-air-air", label: "PAC air/air", desc: "Sans circuit d'eau · Réversible · Confort pièce par pièce" },
                { to: "/pac-geothermie", label: "Géothermie", desc: "COP 4–6 · Captage sol · Performances stables toute l'année" },
              ] as const).map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="group flex flex-col justify-between gap-4 border border-[#d2ccc1] bg-white p-5 transition-colors hover:border-[#b9783e] hover:bg-[#fdf9f4]"
                >
                  <div>
                    <p className="font-display text-lg font-medium tracking-tight text-[#17221c]">{item.label}</p>
                    <p className="mt-1.5 text-xs leading-5 text-[#667169]">{item.desc}</p>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-[#9a6034] transition-transform group-hover:translate-x-1">
                    Voir la page <ArrowRight className="size-3.5" aria-hidden />
                  </span>
                </Link>
              ))}
            </div>
          ),
        },
        {
          heading: "05. Dimensionnement et Budget",
          body: "Le dimensionnement d'un équipement thermique exige un calcul des déperditions réelles pièce par pièce, reléguant les estimations approximatives basées sur la seule surface à des pratiques obsolètes. Une analyse précise sécurise l'investissement matériel et garantit la maîtrise des consommations électriques futures.",
          bullets: [
            "Vérification de la puissance et du raccordement de l'alimentation électrique (triphasé)",
            "Intégration des mesures d'atténuation acoustique dès la conception",
            "Comparaison approfondie de devis détaillés (matériel, pose, adaptations séparés)",
            "Audit rigoureux du plan de financement (aides) et du reste à charge réel",
          ],
          callout:
            "Les aides éventuelles et le reste à charge doivent être vérifiés selon la situation du foyer et les critères d'éligibilité RGE.",
        },
      ]}
      faqs={[
        {
          question: "Une pompe à chaleur convient-elle à toutes les maisons ?",
          answer:
            "Non, l'isolation, les émetteurs, la puissance électrique disponible, le climat et les contraintes d'implantation doivent être rigoureusement étudiés avant de retenir cette solution.",
        },
        {
          question: "Faut-il isoler avant de changer de chauffage ?",
          answer:
            "Traiter les déperditions thermiques peut réduire le besoin de chauffage et éviter d'investir dans un équipement surdimensionné lors des travaux. Cela dépend toutefois de l'état réel et avéré du logement.",
        },
        {
          question: "Le simulateur confirme-t-il les montants des aides ?",
          answer:
            "Non, il fournit une première indication globale. L'éligibilité, les conditionnements techniques (certifications RGE) et le montant définitif doivent être vérifiés auprès des organismes compétents.",
        },
      ]}
    />
  ),
});
