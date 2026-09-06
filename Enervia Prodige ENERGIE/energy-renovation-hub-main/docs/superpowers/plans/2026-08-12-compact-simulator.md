# Compact Simulator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Compress the existing simulator from ten visible screens into five grouped steps and remove the vertical progress column while preserving its estimation engine and data fields.

**Architecture:** Keep `simulator-model.ts` and `simulator-estimate.ts` unchanged. Rework only `Simulator.tsx` so each of the first three screens owns a group of related inputs, the fourth combines a collapsible review with the result, and the fifth keeps the disabled contact preview. Use one horizontal progress header for embedded and campaign variants.

**Tech Stack:** React 19, TypeScript, TanStack Router, Tailwind CSS 4, Lucide React, Node test runner, Vite, ESLint, Prettier.

## Global Constraints

- Follow `docs/superpowers/specs/2026-08-12-compact-simulator-design.md`.
- Do not change calculation assumptions or model fields.
- Do not add persistence, network calls, analytics, or active contact submission.
- Remove the entire vertical ten-step list on desktop and mobile.
- Preserve the approved light visual system and both consumers: homepage and `/simulation`.
- Keep unrelated working-tree changes intact.

---

### Task 1: Replace Ten-Screen Navigation with Five Grouped Steps

**Files:**
- Modify: `src/components/site/Simulator.tsx`

**Interfaces:**
- Consumes: existing `RenovationDraft`, validation, work normalization, estimation engine
- Produces: five-step local wizard and horizontal progress header

- [ ] **Step 1: Establish the failing static checks**

  Confirm `TOTAL_STEPS = 10`, the vertical `<aside>`, and the ten `stepNames` are present before editing.

- [ ] **Step 2: Implement five-step progress**

  Set labels to Mon logement, État actuel, Mon projet, Mon estimation, Recevoir le détail. Render number, active label, copper progress line, and desktop-only compact labels. Remove the vertical aside and its connecting markers.

- [ ] **Step 3: Group the first three input screens**

  Step 1 contains postal code, status, and property type. Step 2 contains heating and surface. Step 3 contains multi-select works and energy spending. Each step has one explicit Continue action and validates all required fields in its group.

- [ ] **Step 4: Run targeted static checks**

  ```powershell
  rg -n "TOTAL_STEPS = 10|Localisation|Votre situation|Type de bien|Chauffage actuel|Budget énergie|Récapitulatif|Votre potentiel|Vos coordonnées" src/components/site/Simulator.tsx
  npx eslint src/components/site/Simulator.tsx
  ```

  The old ten-item navigation must be absent; question labels may remain in content or summaries.

### Task 2: Combine Review and Result

**Files:**
- Modify: `src/components/site/Simulator.tsx`

**Interfaces:**
- Consumes: complete project and current `estimateSavings` result
- Produces: step 4 result with collapsible compact review

- [ ] **Step 1: Add collapsed review state**

  Render a native button with `aria-expanded` above the result. Default it to collapsed and expose the summary rows only when opened.

- [ ] **Step 2: Remap edit actions**

  Location/status/property edits target step 1; heating/surface edits target step 2; works/spending edits target step 3. After Continue, `returnToResult` sends the user directly back to step 4.

- [ ] **Step 3: Keep result before contact**

  Display recommendation, percentage/euro range, uncertainty list, and non-contractual wording directly on step 4. Step 5 remains the disabled contact state.

- [ ] **Step 4: Verify static safety**

  ```powershell
  rg -n "fetch\(|createServerFn|localStorage|sessionStorage|onSubmit|action=" src/components/site/Simulator.tsx
  npx prettier --check src/components/site/Simulator.tsx
  npx eslint src/components/site/Simulator.tsx
  ```

### Task 3: Validate the Compact Experience

**Files:**
- Verify: `src/components/site/Simulator.tsx`
- Verify: `src/lib/simulator-estimate.test.ts`

**Interfaces:**
- Produces: verified homepage and campaign simulator

- [ ] **Step 1: Run existing engine tests**

  ```powershell
  node --experimental-strip-types --test src/lib/simulator-estimate.test.ts
  ```

- [ ] **Step 2: Run lint and production build**

  ```powershell
  npx eslint src/components/site/Simulator.tsx
  npm run build
  ```

- [ ] **Step 3: Exercise the five-step browser flow**

  Complete grouped steps 1–3, confirm the result appears at step 4, expand the review, modify surface through step 2, return directly to step 4, then reach disabled contact at step 5.

- [ ] **Step 4: Verify homepage and mobile rendering**

  Capture `/simulation` and the homepage simulator at desktop/mobile widths. Confirm no vertical step list, no overflow, compact height, readable grouped controls, and no request/storage activity.

- [ ] **Step 5: Final review**

  Run Prettier check, ESLint, engine tests, build, truthfulness/security scan, and inspect `git status` without staging unrelated files.
