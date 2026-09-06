# Personalized Simulator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the existing aid-amount simulator with a light premium renovation simulator that produces a cautious personalized energy-savings range, supports an editable review step, and works both on the homepage and a dedicated `/simulation` advertising page.

**Architecture:** Move project types, labels, validation rules, and the pure estimation engine out of the React component. Rebuild `Simulator` as a reusable local-state wizard with explicit review, result, and disabled-contact states. Reuse it on the homepage and inside a focused campaign shell without persistence or network calls.

**Tech Stack:** React 19, TypeScript, Zod, TanStack Start/Router, Tailwind CSS 4, Lucide React, Node 22 built-in test runner, Vite, ESLint, Prettier.

## Global Constraints

- Follow `docs/superpowers/specs/2026-08-12-personalized-simulator-design.md`.
- Preserve the approved light palette: warm stone, warm white, deep forest text, pale sage, and copper accents.
- Do not display an official-aid calculation, exact guaranteed result, fake social proof, simulated official lookup, urgency device, or certification.
- Do not send, persist, log, or track answers. No `fetch`, server function, form action, local storage, session storage, analytics, or CRM integration.
- Keep the final contact controls disabled until a separate secure-email phase.
- Use internal, documented modeling assumptions; label every percentage/euro range indicative and non-contractual.
- Do not add a third-party test dependency. Run pure TypeScript tests with Node 22 `--experimental-strip-types --test`.
- Do not modify generated `src/routeTree.gen.ts` manually.
- Work on the existing `main` branch only because the user explicitly chose direct inline execution; do not rewrite history or discard unrelated files.

---

## File Map

- Create `src/lib/simulator-model.ts`: project schema, choice values, display labels, completeness validation, and work-selection normalization.
- Create `src/lib/simulator-estimate.ts`: pure, versioned savings engine and recommendation builder.
- Create `src/lib/simulator-estimate.test.ts`: deterministic cases for ranges, exclusions, and unknown spending.
- Rewrite `src/components/site/Simulator.tsx`: light reusable wizard with progress, editing, review, result, and disabled contact.
- Create `src/components/site/SimulationShell.tsx`: focused campaign-page header/footer wrapper.
- Create `src/routes/simulation.tsx`: dedicated advertising route using the shared simulator.
- Modify `src/routes/index.tsx`: update homepage simulator introduction and remove the redundant outer white card.
- Modify `src/components/site/Layout.tsx`: make simulator CTAs route-safe from any page by linking to `/simulation` or the homepage anchor intentionally.
- Modify `src/routes/politique-de-confidentialite.tsx`: keep the current no-transmission statement accurate after the UI rewrite.

### Task 1: Define the Project Model and Selection Rules

**Files:**
- Create: `src/lib/simulator-model.ts`
- Test: `src/lib/simulator-estimate.test.ts`

**Interfaces:**
- Produces: `RenovationProjectSchema`, `RenovationProject`, `RenovationDraft`
- Produces: `WorkType`, `EnergySpendBracket`, `workOptions`, `energySpendOptions`
- Produces: `toggleWorkSelection(current: WorkType[], selected: WorkType): WorkType[]`
- Produces: `getProjectValidationErrors(draft: RenovationDraft): Record<string, string>`

- [ ] **Step 1: Write failing selection tests**

  Cover: selecting `global` removes every precise work; selecting `unknown` removes every other work; selecting a precise work removes `global`/`unknown`; toggling a selected precise work removes it.

- [ ] **Step 2: Run tests and confirm module-not-found failure**

  Run:

  ```powershell
  node --experimental-strip-types --test src/lib/simulator-estimate.test.ts
  ```

- [ ] **Step 3: Implement model, schemas, labels, and normalization**

  Use string unions rather than TypeScript enums. Project fields: `postalCode`, `status`, `propertyType`, `heatingSystem`, `surfaceArea`, `works`, and `energySpendBracket`. Keep contact fields outside the project schema because the V1 contact state is disabled.

- [ ] **Step 4: Add completeness tests**

  Assert invalid postal code, missing works, missing spending bracket, and valid `unknown` values behave as specified.

- [ ] **Step 5: Run tests and targeted lint**

  ```powershell
  node --experimental-strip-types --test src/lib/simulator-estimate.test.ts
  npx eslint src/lib/simulator-model.ts src/lib/simulator-estimate.test.ts
  ```

- [ ] **Step 6: Commit checkpoint**

  Commit only the model and its tests with a focused French commit message if the worktree is clean enough to isolate these files.

### Task 2: Implement the Cautious Savings Engine

**Files:**
- Create: `src/lib/simulator-estimate.ts`
- Modify: `src/lib/simulator-estimate.test.ts`

**Interfaces:**
- Consumes: complete `RenovationProject`
- Produces: `SavingsEstimate` containing `potential`, `percentRange`, optional `annualEuroRange`, `scenarioTitle`, `scenarioBody`, `benefits`, `uncertainties`, and `assumptionVersion`
- Produces: `estimateSavings(project: RenovationProject): SavingsEstimate`

- [ ] **Step 1: Write failing engine tests**

  Add cases for: unknown spending returns no euro range; one targeted action stays below a coherent multi-work scenario; global renovation is capped; apartment adjustment remains within the global cap; euro bounds equal rounded annual reference spending multiplied by percentage bounds.

- [ ] **Step 2: Run tests and confirm failure**

  ```powershell
  node --experimental-strip-types --test src/lib/simulator-estimate.test.ts
  ```

- [ ] **Step 3: Implement versioned assumptions**

  Define named constants for monthly reference values, base scenario ranges, heating/property adjustments, and final caps. Add comments stating these are conservative product-model assumptions, not official schedules or an energy audit. Avoid direct addition of every work coefficient.

- [ ] **Step 4: Implement contextual recommendations**

  Prioritize envelope before heating when both are selected; mention ventilation coherence when insulation is selected; keep window-only copy modest; return an exploratory recommendation for `unknown`.

- [ ] **Step 5: Run all engine tests, formatting, and lint**

  ```powershell
  node --experimental-strip-types --test src/lib/simulator-estimate.test.ts
  npx prettier --check src/lib/simulator-model.ts src/lib/simulator-estimate.ts src/lib/simulator-estimate.test.ts
  npx eslint src/lib/simulator-model.ts src/lib/simulator-estimate.ts src/lib/simulator-estimate.test.ts
  ```

- [ ] **Step 6: Commit checkpoint**

  Commit the engine and green tests separately if unrelated user changes are not included.

### Task 3: Rebuild the Reusable Light Simulator Frame

**Files:**
- Rewrite: `src/components/site/Simulator.tsx`

**Interfaces:**
- Consumes: model choices, validation, `toggleWorkSelection`, `estimateSavings`
- Produces: `Simulator({ variant?: "embedded" | "campaign" }): JSX.Element`

- [ ] **Step 1: Remove misleading legacy behavior**

  Delete aid-base calculation, income question, fake city notifications, official-barème loader, contact lead schema, simulated submission, `montant exact`, and current rounded-card visual structure.

- [ ] **Step 2: Implement the responsive light frame**

  Desktop: pale-sage progress sidebar plus warm-white content panel. Mobile: compact current-step label and thin progress bar. Use square/subtle corners, fine borders, deep-green text, and copper selection/action states.

- [ ] **Step 3: Implement steps 1–5**

  Add validated postal code, status, property type, heating, and surface controls. Preserve values when navigating backward.

- [ ] **Step 4: Implement multi-select works and spending steps**

  Render all approved work types with accessible pressed state and use `toggleWorkSelection`. Require at least one work. Add the five approved spending choices.

- [ ] **Step 5: Implement edit-return state**

  Store `returnToReview`. A `Modifier` action opens the mapped step; the next valid confirmation returns to review. Normal progression continues sequentially.

- [ ] **Step 6: Run targeted static checks**

  ```powershell
  rg -n "barèmes|MaPrimeRénov|montant exact|Un foyer|aidBase|heatingBonus|fetch\(|localStorage|sessionStorage|createServerFn" src/components/site/Simulator.tsx
  npx eslint src/components/site/Simulator.tsx
  ```

  Expected: no misleading or persistence/network implementation.

- [ ] **Step 7: Commit checkpoint**

  Commit the rebuilt question flow if isolated from unrelated changes.

### Task 4: Add Review, Personalized Result, and Disabled Contact

**Files:**
- Modify: `src/components/site/Simulator.tsx`

**Interfaces:**
- Consumes: complete project, `estimateSavings`, label maps
- Produces: review screen, result screen, disabled contact screen, reset action

- [ ] **Step 1: Implement the editable review screen**

  Show every answer in grouped rows with icon, human-readable value, and `Modifier` button. Validate completeness before entering review. Add a reset action with an inline confirmation state.

- [ ] **Step 2: Implement the first result before contact**

  Show potential label, percentage range, optional annual euro range, scenario priorities, benefits, and uncertainty list. Display `Estimation indicative, non contractuelle` next to the figures.

- [ ] **Step 3: Implement the disabled contact state**

  Use a disabled fieldset for name, email, phone, and preferred contact time. Use a disabled `type="button"`; do not add a form action or submission handler. Explain that secure sending will be connected later and link to privacy policy.

- [ ] **Step 4: Implement navigation between review, result, and contact**

  Allow returning from result to review and from contact to result without losing answers. Keep the first personalized range visible before coordinates.

- [ ] **Step 5: Run security and copy checks**

  ```powershell
  rg -n "onSubmit|fetch\(|createServerFn|action=|method=|localStorage|sessionStorage|garanti|exact" src/components/site/Simulator.tsx
  npx prettier --check src/components/site/Simulator.tsx
  npx eslint src/components/site/Simulator.tsx
  ```

- [ ] **Step 6: Commit checkpoint**

  Commit the complete reusable simulator once its local checks pass.

### Task 5: Integrate the Homepage Version

**Files:**
- Modify: `src/routes/index.tsx`

**Interfaces:**
- Consumes: `Simulator` in embedded mode
- Produces: revised homepage simulator section

- [ ] **Step 1: Update the section promise**

  Replace aid-focused wording with cautious savings and project-priority wording. State that the first range appears before coordinates.

- [ ] **Step 2: Remove redundant card nesting**

  Let the simulator own its approved light frame; preserve the surrounding stone section and editorial introduction.

- [ ] **Step 3: Verify homepage metadata and claims**

  Remove remaining homepage references that imply an aid calculation if they describe the simulator itself.

- [ ] **Step 4: Run targeted checks**

  ```powershell
  npx prettier --check src/routes/index.tsx
  npx eslint src/routes/index.tsx
  rg -n "montant exact|aides mobilisables|Estimer mes aides" src/routes/index.tsx
  ```

- [ ] **Step 5: Commit checkpoint**

  Commit homepage integration separately if possible.

### Task 6: Create the Focused `/simulation` Advertising Page

**Files:**
- Create: `src/components/site/SimulationShell.tsx`
- Create: `src/routes/simulation.tsx`
- Modify: `src/components/site/Layout.tsx`

**Interfaces:**
- Consumes: `Simulator({ variant: "campaign" })`, `siteIdentity`
- Produces: `/simulation` route with focused header, legal footer, and route-safe CTAs

- [ ] **Step 1: Create the campaign shell**

  Header: ENERVIA RENOV identity plus `Retour à l’accueil`. Footer: copyright and Contact/Mentions légales/Confidentialité links. Do not include solution menus or external renovation links.

- [ ] **Step 2: Create route and metadata**

  Add an exact French title, neutral description, canonical `/simulation`, Open Graph metadata, concise hero, and the shared simulator immediately below it.

- [ ] **Step 3: Make global simulator CTAs route-safe**

  Ensure CTAs clicked from secondary pages reach `/simulation`; homepage-local CTAs may keep `#simulateur` where intentional.

- [ ] **Step 4: Run route checks**

  ```powershell
  npx prettier --check src/components/site/SimulationShell.tsx src/routes/simulation.tsx src/components/site/Layout.tsx
  npx eslint src/components/site/SimulationShell.tsx src/routes/simulation.tsx src/components/site/Layout.tsx
  rg -n "utm|analytics|localStorage|sessionStorage" src/routes/simulation.tsx src/components/site/SimulationShell.tsx
  ```

- [ ] **Step 5: Commit checkpoint**

  Commit the campaign route and navigation integration.

### Task 7: Validate Behavior, Build, and Visual Fidelity

**Files:**
- Verify: every file from Tasks 1–6
- Modify only if a validation finding requires a focused fix

**Interfaces:**
- Produces: green calculation tests, lint/build results, and desktop/mobile screenshots

- [ ] **Step 1: Run calculation tests**

  ```powershell
  node --experimental-strip-types --test src/lib/simulator-estimate.test.ts
  ```

- [ ] **Step 2: Format and lint touched files**

  ```powershell
  npx prettier --write src/lib/simulator-model.ts src/lib/simulator-estimate.ts src/lib/simulator-estimate.test.ts src/components/site/Simulator.tsx src/components/site/SimulationShell.tsx src/components/site/Layout.tsx src/routes/index.tsx src/routes/simulation.tsx src/routes/politique-de-confidentialite.tsx
  npx eslint src/lib/simulator-model.ts src/lib/simulator-estimate.ts src/lib/simulator-estimate.test.ts src/components/site/Simulator.tsx src/components/site/SimulationShell.tsx src/components/site/Layout.tsx src/routes/index.tsx src/routes/simulation.tsx src/routes/politique-de-confidentialite.tsx
  ```

- [ ] **Step 3: Build production output**

  ```powershell
  npm run build
  ```

- [ ] **Step 4: Exercise the main browser flow**

  On `/simulation`, complete a multi-work scenario with a known spend, verify review labels, modify surface and return directly to review, view percentage/euro ranges, continue to disabled contact, go back, then reset. Confirm no submission request or persistent browser storage.

- [ ] **Step 5: Exercise edge cases**

  Verify invalid postal code, no works, `global` exclusivity, `unknown` exclusivity, unknown spending with no euro range, browser back/forward stability, and mobile fixed controls not covering content.

- [ ] **Step 6: Capture and inspect visuals**

  Capture homepage embedded simulator and `/simulation` review/result screens at approximately 1440 px and 390 px. Compare against the approved light mockup: pale sidebar, warm-white body, deep-green typography, copper actions, restrained borders, no large dark block, and no horizontal overflow.

- [ ] **Step 7: Run final truthfulness/security scan**

  ```powershell
  rg -n "barèmes officiels|MaPrimeRénov|montant exact|Un foyer à|garanti|certifié|fetch\(|createServerFn|localStorage|sessionStorage|onSubmit|action=" src/components/site/Simulator.tsx src/lib/simulator-estimate.ts src/routes/simulation.tsx
  ```

- [ ] **Step 8: Final integration checkpoint**

  Review `git status`, keep unrelated user changes untouched, and commit only the simulator feature files if they can be isolated safely.
