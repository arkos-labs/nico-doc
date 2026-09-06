import assert from "node:assert/strict";
import test from "node:test";
import { estimateSavings } from "./simulator-estimate.ts";
import {
  getProjectValidationErrors,
  toggleWorkSelection,
  type RenovationProject,
} from "./simulator-model.ts";

const base: RenovationProject = {
  postalCode: "35000",
  status: "proprietaire",
  propertyType: "maison",
  heatingSystem: "gaz",
  surfaceArea: 110,
  works: ["windows"],
  energySpendBracket: "100to150",
};

test("les choix globaux et indéterminés sont exclusifs", () => {
  assert.deepEqual(toggleWorkSelection(["roof", "walls"], "global"), ["global"]);
  assert.deepEqual(toggleWorkSelection(["roof"], "unknown"), ["unknown"]);
  assert.deepEqual(toggleWorkSelection(["global"], "walls"), ["walls"]);
  assert.deepEqual(toggleWorkSelection(["roof", "walls"], "roof"), ["walls"]);
});

test("la validation accepte les choix inconnus mais refuse un projet incomplet", () => {
  assert.equal(
    Object.keys(
      getProjectValidationErrors({ ...base, works: ["unknown"], energySpendBracket: "unknown" }),
    ).length,
    0,
  );
  assert.ok(getProjectValidationErrors({ ...base, postalCode: "35", works: [] }).postalCode);
  assert.ok(getProjectValidationErrors({ ...base, postalCode: "35", works: [] }).works);
});

test("un parcours cohérent reste supérieur à une action ciblée et plafonné", () => {
  const targeted = estimateSavings(base);
  const coherent = estimateSavings({ ...base, works: ["roof", "heating", "ventilation"] });
  const global = estimateSavings({ ...base, works: ["global"], surfaceArea: 250 });
  assert.ok(coherent.percentRange[0] > targeted.percentRange[0]);
  assert.ok(global.percentRange[1] <= 45);
});

test("une dépense inconnue ne produit aucun montant en euros", () => {
  const result = estimateSavings({ ...base, energySpendBracket: "unknown" });
  assert.equal(result.annualEuroRange, undefined);
});

test("la fourchette monétaire découle de la référence annuelle", () => {
  const result = estimateSavings(base);
  assert.deepEqual(result.percentRange, [4, 10]);
  assert.deepEqual(result.annualEuroRange, [60, 150]);
});
