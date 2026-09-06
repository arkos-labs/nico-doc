import type { RenovationProject, WorkType } from "./simulator-model.ts";

export type SavingsEstimate = {
  potential: string;
  percentRange: readonly [number, number];
  annualEuroRange?: readonly [number, number];
  scenarioTitle: string;
  scenarioBody: string;
  benefits: string[];
  uncertainties: string[];
  assumptionVersion: "v1-prudente-2026-08";
};

// Hypothèses internes prudentes destinées à orienter une V1. Elles ne constituent
// ni un barème officiel, ni un audit énergétique, ni une promesse de résultat.
const monthlyReference = { under100: 75, "100to150": 125, "150to250": 200, over250: 300 } as const;
const targetedWorks = new Set<WorkType>(["windows", "ventilation"]);
const insulationWorks = new Set<WorkType>(["roof", "walls"]);

function roundToTen(value: number): number {
  return Math.round(value / 10) * 10;
}

export function estimateSavings(project: RenovationProject): SavingsEstimate {
  const works = new Set(project.works);
  const hasGlobal = works.has("global");
  const isUnknown = works.has("unknown");
  const hasHeating = works.has("heating");
  const insulationCount = [...insulationWorks].filter((work) => works.has(work)).length;
  const preciseCount = project.works.filter(
    (work) => work !== "global" && work !== "unknown",
  ).length;

  let low = 5;
  let high = 12;
  let potential = "Potentiel à approfondir";

  if (hasGlobal) {
    [low, high] = [25, 45];
    potential = "Potentiel important à confirmer";
  } else if (isUnknown) {
    [low, high] = [5, 15];
  } else if (preciseCount >= 3 || (hasHeating && insulationCount > 0)) {
    [low, high] = [18, 35];
    potential = "Potentiel modéré à important";
  } else if (hasHeating || insulationCount > 0) {
    [low, high] = preciseCount > 1 ? [15, 28] : [12, 24];
    potential = "Potentiel modéré";
  } else if (project.works.some((work) => targetedWorks.has(work))) {
    [low, high] = preciseCount > 1 ? [8, 17] : [4, 10];
    potential = "Potentiel limité à modéré";
  }

  if (hasHeating && (project.heatingSystem === "fioul" || project.heatingSystem === "gaz")) {
    low += 2;
    high += 3;
  }
  if (project.propertyType === "appartement") {
    low -= 1;
    high -= 2;
  }
  if (project.surfaceArea < 50) high -= 1;
  if (project.surfaceArea > 180 && (hasGlobal || insulationCount > 0)) high += 1;
  low = Math.max(3, Math.min(low, 35));
  high = Math.max(low + 4, Math.min(high, 45));

  let scenarioTitle = "Commencer par identifier les priorités";
  let scenarioBody =
    "Une observation du bâti, du chauffage et des usages permettra de choisir les actions les plus cohérentes.";
  if (hasGlobal) {
    scenarioTitle = "Construire un parcours global et ordonné";
    scenarioBody =
      "Étudier ensemble l’enveloppe, la ventilation et les systèmes permet d’éviter des travaux isolés ou incompatibles.";
  } else if (hasHeating && insulationCount > 0) {
    scenarioTitle = "Réduire les besoins avant d’adapter le chauffage";
    scenarioBody =
      "Traiter les déperditions en priorité peut améliorer le confort et aider à dimensionner plus justement le futur chauffage.";
  } else if (insulationCount > 0) {
    scenarioTitle = "Prioriser l’enveloppe du logement";
    scenarioBody =
      "L’isolation sélectionnée vise d’abord à limiter les pertes de chaleur et à stabiliser le confort intérieur.";
  } else if (hasHeating) {
    scenarioTitle = "Étudier le chauffage dans son contexte";
    scenarioBody =
      "Le remplacement du système doit tenir compte de l’isolation, des émetteurs, du climat et des usages réels.";
  } else if (works.has("windows")) {
    scenarioTitle = "Traiter un point de confort ciblé";
    scenarioBody =
      "Les fenêtres peuvent réduire certaines infiltrations et sensations de paroi froide, sans résumer à elles seules la performance du logement.";
  }

  const reference =
    project.energySpendBracket === "unknown"
      ? undefined
      : monthlyReference[project.energySpendBracket];
  const annualEuroRange = reference
    ? ([
        roundToTen((reference * 12 * low) / 100),
        roundToTen((reference * 12 * high) / 100),
      ] as const)
    : undefined;

  const benefits = [
    "Un confort thermique potentiellement plus stable",
    "Une consommation mieux maîtrisée selon l’état initial",
  ];
  if (works.has("ventilation") || hasGlobal || insulationCount > 0)
    benefits.push("Une meilleure cohérence entre isolation et renouvellement d’air");

  return {
    potential,
    percentRange: [low, high],
    ...(annualEuroRange ? { annualEuroRange } : {}),
    scenarioTitle,
    scenarioBody,
    benefits,
    uncertainties: [
      "État initial et qualité de mise en œuvre",
      "Météo, habitudes et température de consigne",
      "Usages non concernés inclus dans la facture",
      "Évolution du prix des énergies",
    ],
    assumptionVersion: "v1-prudente-2026-08",
  };
}
