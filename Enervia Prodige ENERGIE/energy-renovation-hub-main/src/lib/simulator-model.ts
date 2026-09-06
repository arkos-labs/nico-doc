import { z } from "zod";

export const workTypes = [
  "heating",
  "roof",
  "walls",
  "windows",
  "ventilation",
  "global",
  "unknown",
] as const;
export type WorkType = (typeof workTypes)[number];

export const energySpendBrackets = [
  "under100",
  "100to150",
  "150to250",
  "over250",
  "unknown",
] as const;
export type EnergySpendBracket = (typeof energySpendBrackets)[number];

export const RenovationProjectSchema = z.object({
  postalCode: z.string().regex(/^\d{5}$/, "Saisissez un code postal à 5 chiffres."),
  status: z.enum(["proprietaire", "locataire"]),
  propertyType: z.enum(["maison", "appartement"]),
  heatingSystem: z.enum(["fioul", "gaz", "electricite", "bois"]),
  surfaceArea: z.number().min(10).max(400),
  works: z.array(z.enum(workTypes)).min(1, "Sélectionnez au moins un type de travaux."),
  energySpendBracket: z.enum(energySpendBrackets),
});

export type RenovationProject = z.infer<typeof RenovationProjectSchema>;
export type RenovationDraft = Partial<Omit<RenovationProject, "works">> & { works: WorkType[] };

export const workOptions: ReadonlyArray<{ value: WorkType; label: string; description: string }> = [
  {
    value: "heating",
    label: "Chauffage ou pompe à chaleur",
    description: "Étudier un système plus adapté au logement",
  },
  {
    value: "roof",
    label: "Combles ou toiture",
    description: "Limiter les pertes de chaleur par le haut",
  },
  {
    value: "walls",
    label: "Isolation des murs",
    description: "Améliorer l’enveloppe et le confort intérieur",
  },
  {
    value: "windows",
    label: "Fenêtres",
    description: "Traiter les menuiseries et les sensations de paroi froide",
  },
  {
    value: "ventilation",
    label: "Ventilation",
    description: "Renouveler l’air et maîtriser l’humidité",
  },
  {
    value: "global",
    label: "Rénovation globale",
    description: "Construire un parcours cohérent de plusieurs travaux",
  },
  {
    value: "unknown",
    label: "Je ne sais pas encore",
    description: "Identifier d’abord les priorités du logement",
  },
];

export const energySpendOptions: ReadonlyArray<{ value: EnergySpendBracket; label: string }> = [
  { value: "under100", label: "Moins de 100 € par mois" },
  { value: "100to150", label: "De 100 à 150 € par mois" },
  { value: "150to250", label: "De 150 à 250 € par mois" },
  { value: "over250", label: "Plus de 250 € par mois" },
  { value: "unknown", label: "Je ne sais pas" },
];

export function toggleWorkSelection(current: WorkType[], selected: WorkType): WorkType[] {
  if (selected === "global" || selected === "unknown") {
    return current.includes(selected) ? [] : [selected];
  }
  const precise = current.filter((work) => work !== "global" && work !== "unknown");
  return precise.includes(selected)
    ? precise.filter((work) => work !== selected)
    : [...precise, selected];
}

export function getProjectValidationErrors(draft: RenovationDraft): Record<string, string> {
  const result = RenovationProjectSchema.safeParse(draft);
  if (result.success) return {};
  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) errors[String(issue.path[0])] ??= issue.message;
  return errors;
}

export const labels = {
  status: { proprietaire: "Propriétaire", locataire: "Locataire" },
  propertyType: { maison: "Maison individuelle", appartement: "Appartement" },
  heatingSystem: { fioul: "Fioul", gaz: "Gaz", electricite: "Électricité", bois: "Bois" },
} as const;

export function workLabel(work: WorkType): string {
  return workOptions.find((option) => option.value === work)?.label ?? work;
}

export function energySpendLabel(value: EnergySpendBracket): string {
  return energySpendOptions.find((option) => option.value === value)?.label ?? value;
}
