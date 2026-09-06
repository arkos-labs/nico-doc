# Small Guided Form Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn the compact simulator into a small centered one-question-at-a-time form while keeping the existing surrounding page and showing the personalized scenario only after every project answer.

**Architecture:** Keep the model and estimator unchanged. Rework only `Simulator.tsx`: seven question/result screens plus disabled contact, a 620 px question card, minimal progress, explicit navigation, and edit-return mapping. Allow the result screen to expand wider for readable recommendations.

**Tech Stack:** React 19, TypeScript, TanStack Router, Tailwind CSS 4, Lucide React, Node test runner, Vite, ESLint, Prettier.

## Global Constraints

- Follow `docs/superpowers/specs/2026-08-12-small-step-form-design.md`.
- Preserve all surrounding homepage and `/simulation` content.
- Do not modify `simulator-model.ts` or `simulator-estimate.ts`.
- Do not add network, storage, active contact submission, or tracking.
- Preserve current uncommitted feature files and generated route tree.

---

### Task 1: Build the Small Question Card

**Files:**
- Modify: `src/components/site/Simulator.tsx`

**Interfaces:**
- Consumes: existing project draft and model choices
- Produces: seven project screens and one disabled-contact screen

- [ ] Replace grouped five-step screens with situation, logement, chauffage, surface, travaux, budget, scenario, and contact screens.
- [ ] Limit question screens to approximately 620 px and center them.
- [ ] Show only current step number and a thin line; remove all step-name lists.
- [ ] Use explicit Previous/Continue controls; do not auto-advance unique choices.
- [ ] Validate only the current screen before continuing.
- [ ] Run Prettier and ESLint on `Simulator.tsx`.

### Task 2: Position the Scenario at the End of Project Details

**Files:**
- Modify: `src/components/site/Simulator.tsx`

**Interfaces:**
- Consumes: complete `RenovationProject` and `estimateSavings`
- Produces: final project scenario before contact

- [ ] Gate the result behind completion of all six project-information screens.
- [ ] Use the exact heading `Voici le scénario qui correspond à votre logement.`
- [ ] Keep savings, recommendation, uncertainties, and non-contractual notice.
- [ ] Add a collapsed `Modifier mes réponses` summary mapped to the six question screens.
- [ ] Return directly to the scenario after editing.
- [ ] Keep contact as the following disabled screen.

### Task 3: Validate Behavior and Rendering

**Files:**
- Verify: `src/components/site/Simulator.tsx`
- Verify: `src/lib/simulator-estimate.test.ts`

**Interfaces:**
- Produces: verified small form on homepage and `/simulation`

- [ ] Run the five existing estimator tests.
- [ ] Run Prettier, ESLint, and production build.
- [ ] Complete every question in the browser and confirm the scenario appears only after budget.
- [ ] Edit a project answer from the scenario and confirm direct return.
- [ ] Verify disabled contact, no fetch/XHR, and empty local/session storage.
- [ ] Capture desktop/mobile form and scenario screens; confirm no overflow.
