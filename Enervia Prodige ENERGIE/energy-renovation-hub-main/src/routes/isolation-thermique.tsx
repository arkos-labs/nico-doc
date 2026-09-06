import { createFileRoute, Link } from "@tanstack/react-router";
import { BASE_URL } from "@/lib/site-identity";
import { ArrowRight } from "lucide-react";
import { SiloPage } from "@/components/site/SiloPage";

const title = "Isolation thermique : combles, murs et planchers en 2026";
const description =
  "Comprendre l’isolation des combles, des murs et des planchers : usages, performances attendues et points de vigilance pour préparer un projet.";

export const Route = createFileRoute("/isolation-thermique")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${BASE_URL}/isolation-thermique` },
      { property: "og:image", content: `${BASE_URL}/og-default.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/isolation-thermique` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Quelle zone faut-il isoler en premier ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "La toiture et les combles doivent être isolés en priorité, car ils représentent jusqu'à 30 % des déperditions thermiques d'une maison construite avant les réglementations thermiques. Viennent ensuite les murs (25 %), les surfaces vitrées et les planchers bas. Une rénovation globale coordonnée reste l'approche la plus recommandée.",
              },
            },
            {
              "@type": "Question",
              name: "L’isolation extérieure change-t-elle la façade ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Oui, l'isolation thermique par l'extérieur (ITE) implique la pose de matériaux isolants sur les murs existants, ajoutant une surépaisseur de 12 à 20 centimètres. Cela modifie l'aspect des modénatures et nécessite un nouveau revêtement. Une déclaration préalable de travaux en mairie est systématiquement requise.",
              },
            },
            {
              "@type": "Question",
              name: "L’isolation garantit-elle deux classes DPE supplémentaires ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "L'amélioration de l'enveloppe réduit drastiquement les besoins de chauffage, mais le saut formel de deux classes DPE dépend du niveau de performance initial, de l'énergie de chauffage et de la surface. Seul un audit énergétique réglementaire peut projeter avec exactitude le gain de classes DPE.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <SiloPage
      slug="isolation-thermique"
      eyebrow="Enveloppe du bâtiment"
      h1="Traiter les déperditions dans le bon ordre."
      intro="Une isolation cohérente améliore le confort et réduit les besoins de chauffage. Le diagnostic du bâti aide à hiérarchiser les zones à traiter sans déplacer l’humidité ni créer de nouveaux désordres."
      highlights={[
        { value: "Toiture et combles", label: "25 à 30 % - Une zone prioritaire à examiner dans de nombreuses maisons" },
        { value: "Murs extérieurs", label: "20 à 25 % - Un poste majeur qui demande le traitement des points singuliers" },
        { value: "Ventilation et fuites d'air", label: "20 à 25 % - Indispensable pour maîtriser l’humidité après isolation" },
      ]}
      sections={[
        {
          heading: "01. Combles et toiture",
          body: "L’isolation des combles perdus ou de la toiture vise à limiter les échanges thermiques par le haut du bâtiment, zone où l'air chaud s'accumule naturellement par convection. La méthode de mise en œuvre dépend strictement de l’usage des combles, de la nature de la charpente et de l’état du support initial.",
          bullets: [
            "Soufflage mécanisé de laine minérale ou de ouate (norme NF DTU 45.11)",
            "Capots de protection ignifugés obligatoires sur les spots encastrés",
            "Panneaux ou rouleaux semi-rigides imposés sous rampants (NF DTU 45.10)",
            "Membrane pare-vapeur continue et indépendante côté chaud obligatoire",
          ],
          callout:
            "Pour être éligible aux aides financières (MaPrimeRénov'), la résistance thermique doit atteindre un seuil minimal de R ≥ 7 m².K/W pour les combles perdus et R ≥ 6 m².K/W pour les rampants.",
        },
        {
          heading: "02. Murs par l’extérieur",
          body: "L’isolation thermique par l’extérieur (ITE) enveloppe les façades du bâtiment d'un manteau continu. Cette technique limite drastiquement les déperditions et neutralise la majorité des ponts thermiques (notamment au niveau des nez de dalles et des refends) tout en préservant intégralement la surface habitable intérieure et l'inertie thermique des murs porteurs.",
          bullets: [
            "Déclaration Préalable (DP) en mairie requise (PLU et Architecte Bâtiments de France)",
            "Appuis de fenêtres, descentes d’eaux pluviales et menuiseries à intégrer dès la conception",
            "Traitement du soubassement primordial pour empêcher les remontées capillaires",
            "Résistance thermique requise pour les primes : R ≥ 3,7 m².K/W",
          ],
        },
        {
          heading: "03. Planchers bas",
          body: "L’isolation d’un plancher bas peut être réalisée en sous-face (par le dessous) lorsqu’une cave, un garage non chauffé ou un vide sanitaire reste accessible. Elle améliore notamment la sensation de sol froid dans les pièces du rez-de-chaussée, augmentant le ressenti thermique de plusieurs degrés sans nécessiter une élévation de la température de consigne.",
          bullets: [
            "Hauteur libre minimale indispensable pour permettre à l'artisan d'intervenir",
            "Canalisations d'eau situées du côté froid à calorifuger contre le gel",
            "Fixations (chevillage mécanique ou collage) adaptées à la nature du plancher",
            "Objectif réglementaire pour débloquer les primes : R ≥ 3,0 m².K/W",
          ],
        },
        {
          heading: "05. Approfondir par poste de travaux",
          body: "Chaque composante de l'enveloppe thermique a ses propres règles techniques, ses matériaux et ses conditions d'éligibilité aux aides. Ces pages détaillent chaque poste pour préparer votre projet.",
          visual: (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {([
                { to: "/isolation-combles", label: "Combles et toiture", desc: "Soufflage, rouleaux, rampants · R ≥ 7 m².K/W · Priorité n°1" },
                { to: "/isolation-murs", label: "Murs (ITE / ITI)", desc: "Par l'extérieur ou l'intérieur · Ponts thermiques · Autorisations" },
                { to: "/isolation-planchers", label: "Planchers bas", desc: "Vide sanitaire, sous-sol · Sans perte de surface · R ≥ 3" },
                { to: "/menuiseries-fenetres", label: "Fenêtres et menuiseries", desc: "Double et triple vitrage · Uw ≤ 1,3 · PVC, alu, bois" },
                { to: "/vmc-ventilation", label: "VMC et ventilation", desc: "Simple flux, double flux · Récupération de chaleur 90 %" },
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
          heading: "04. Ventilation et ordre des travaux",
          body: "En renforçant l’étanchéité de l’enveloppe du bâtiment pour supprimer les fuites d'air, l’isolation modifie profondément les équilibres d’air et d’humidité à l'intérieur du logement. La ventilation, l'étanchéité des menuiseries et le mode de chauffage doivent donc être considérés dans une même réflexion globale.",
          bullets: [
            "Identifier les sources d’humidité avant de fermer les parois (remontées capillaires)",
            "Installation d'une VMC (simple ou double flux) impérative pour évacuer la vapeur d'eau",
            "Prioriser la réduction des besoins (isolation) avant le remplacement des systèmes de production",
            "Réévaluer le besoin de chauffage après l'amélioration de l'enveloppe",
          ],
          callout:
            "Le gain énergétique global ou le saut formel de classe DPE ne peut pas être garanti sans un calcul conventionnel (audit énergétique réglementaire).",
        },
      ]}
      faqs={[
        {
          question: "Quelle zone faut-il isoler en premier ?",
          answer:
            "La toiture et les combles doivent être isolés en priorité, car ils représentent jusqu'à 30 % des déperditions thermiques d'une maison construite avant les réglementations thermiques. Viennent ensuite les murs (25 %), les surfaces vitrées et les planchers bas. Une rénovation globale coordonnée reste l'approche la plus recommandée.",
        },
        {
          question: "L’isolation extérieure change-t-elle la façade ?",
          answer:
            "Oui, l'isolation thermique par l'extérieur (ITE) implique la pose de matériaux isolants sur les murs existants, ajoutant une surépaisseur de 12 à 20 centimètres. Cela modifie l'aspect des modénatures et nécessite un nouveau revêtement. Une déclaration préalable de travaux en mairie est systématiquement requise.",
        },
        {
          question: "L’isolation garantit-elle deux classes DPE supplémentaires ?",
          answer:
            "L'amélioration de l'enveloppe réduit drastiquement les besoins de chauffage, mais le saut formel de deux classes DPE dépend du niveau de performance initial, de l'énergie de chauffage et de la surface. Seul un audit énergétique réglementaire peut projeter avec exactitude le gain de classes DPE.",
        },
      ]}
    />
  ),
});
