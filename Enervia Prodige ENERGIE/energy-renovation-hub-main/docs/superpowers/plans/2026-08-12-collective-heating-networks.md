# Collective Heating Networks Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a clear, non-repetitive section about collective heating network maintenance and regulation for residential and tertiary buildings.

**Architecture:** Extend the existing declarative `sections` data passed to `SiloPage`; no new route or component is required. The shared page component will automatically add the section to the page summary and render it responsively with the established visual system.

**Tech Stack:** React 19, TypeScript, TanStack Router, Tailwind CSS, Vite.

## Global Constraints

- Preserve the existing `/pompe-a-chaleur` route and shared `SiloPage` API.
- Reuse the existing page styles; add no dependency and no new design system.
- Mention residential collective and tertiary buildings equally.
- Use the exact terms “désembouage”, “équilibrage hydraulique”, and “régulation”.
- Make no quantified savings, eligibility, certification, or performance guarantee.

---

### Task 1: Add the collective heating networks section

**Files:**

- Modify: `src/routes/pompe-a-chaleur.tsx`

**Interfaces:**

- Consumes: existing `SiloPage` prop `sections: SiloSection[]`.
- Produces: one additional `SiloSection` rendered in the summary and main content.

- [ ] **Step 1: Establish the baseline**

Run: `npm run build`

Expected: the existing application builds successfully before the content change.

- [ ] **Step 2: Add the section in the approved order**

Insert a section after “Géothermie” and before “Dimensionnement et budget” with:

```tsx
{
  heading: "Réseaux de chauffage collectifs",
  body: "Dans les bâtiments résidentiels collectifs et tertiaires équipés d’un chauffage collectif, l’état du réseau hydraulique et la qualité de ses réglages doivent être examinés avant de recommander une intervention.",
  bullets: [
    "Désembouage : retirer les boues et dépôts susceptibles de gêner la circulation de l’eau",
    "Équilibrage hydraulique : régler la distribution des débits entre les zones et les émetteurs",
    "Régulation et pilotage : adapter le fonctionnement aux usages, aux horaires et aux différentes zones",
    "Compatibilité à vérifier avec la chaudière collective et les équipements existants",
  ],
  callout:
    "Un diagnostic du réseau et de ses équipements est nécessaire pour déterminer les opérations adaptées. Ces interventions ne produisent pas les mêmes effets sur toutes les installations.",
},
```

- [ ] **Step 3: Format and inspect the focused diff**

Run: `npx prettier --check src/routes/pompe-a-chaleur.tsx`

Expected: the route file respects project formatting.

Run: `git diff --check -- src/routes/pompe-a-chaleur.tsx`

Expected: no whitespace errors.

- [ ] **Step 4: Verify production compilation**

Run: `npm run build`

Expected: Vite completes successfully with the new section.

- [ ] **Step 5: Verify content and responsive rendering**

Open `/pompe-a-chaleur` at desktop and mobile widths. Confirm that:

- “Réseaux de chauffage collectifs” appears in the page summary;
- the section appears after “Géothermie” and before “Dimensionnement et budget”;
- the four bullets remain legible without horizontal overflow;
- the diagnostic callout uses the existing visual treatment;
- residential collective and tertiary audiences are both visible;
- no unsupported quantified claim appears.

- [ ] **Step 6: Commit the focused implementation**

Run: `git add src/routes/pompe-a-chaleur.tsx docs/superpowers/plans/2026-08-12-collective-heating-networks.md`

Run: `git commit -m "Ajouter les réseaux de chauffage collectifs"`

Expected: only the route change and this plan are included in the commit.
