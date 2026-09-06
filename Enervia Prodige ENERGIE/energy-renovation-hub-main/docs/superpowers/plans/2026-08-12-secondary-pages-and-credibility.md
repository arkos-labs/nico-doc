# Secondary Pages and Credibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove unverified claims, correct French language and metadata, and rebuild the three secondary pages with the homepage’s premium architectural design.

**Architecture:** Expand the shared `SiloPage` into a declarative editorial template that accepts highlights, sections, and FAQs. Keep page-specific content in the three route modules, while global language/error metadata and simulator wording are corrected independently.

**Tech Stack:** React 19, TypeScript, TanStack Router, Tailwind CSS 4, Lucide React, Vite.

## Global Constraints

- Do not add dependencies.
- Do not present RGE, Qualibat, QualiPac, or France Rénov’ as company credentials or partnerships.
- Keep regulatory references only as general information.
- Reuse the homepage palette, typography, borders, spacing, and CTA style.
- Preserve all route paths and simulator state logic.
- Validate using targeted lint, Prettier, production build, and browser screenshots.

---

### Task 1: Correct global language, errors, and metadata

**Files:**
- Modify: `src/routes/__root.tsx`

**Interfaces:**
- Produces: French document language, French error experiences, neutral global metadata.

- [ ] **Step 1:** Set `lang="fr"` and translate 404/error titles, descriptions, and actions.
- [ ] **Step 2:** Replace the RGE-based global description with neutral renovation-estimation wording.
- [ ] **Step 3:** Remove obsolete Google Fonts preconnect and stylesheet entries.
- [ ] **Step 4:** Run `npx prettier --check src/routes/__root.tsx && npx eslint src/routes/__root.tsx`.

### Task 2: Remove unverified trust and simulator claims

**Files:**
- Modify: `src/components/site/Simulator.tsx`
- Delete if unused: `src/components/site/Trust.tsx`

**Interfaces:**
- Produces: simulator wording describing an indicative estimate without claimed artisan coverage.

- [ ] **Step 1:** Replace artisan coverage and certification language with neutral project-location and eligibility context.
- [ ] **Step 2:** Review every simulator subtitle/result for guaranteed eligibility, guaranteed aid, or company credential claims and rewrite them conservatively.
- [ ] **Step 3:** Remove `TrustBar` use from the shared content template; delete its file if no consumer remains.
- [ ] **Step 4:** Search `src` for `RGE|Qualibat|QualiPac|France Rénov` and classify any remaining occurrence as either neutral regulation or an issue to remove.

### Task 3: Build the premium shared editorial template

**Files:**
- Modify: `src/components/site/SiloPage.tsx`

**Interfaces:**
- Consumes: `eyebrow`, `h1`, `intro`, `highlights`, `sections`, and `faqs`.
- Produces: premium hero, internal summary navigation, numbered content, FAQ, and simulator CTA.

- [ ] **Step 1:** Extend exported data types for highlight items, section bullets/callouts, and FAQ entries.
- [ ] **Step 2:** Rebuild hero using the homepage dark green, copper accent, editorial typography, and a three-item highlight panel.
- [ ] **Step 3:** Generate stable section anchors and an internal summary navigation.
- [ ] **Step 4:** Render numbered editorial sections on stone surfaces with optional bullets and callouts.
- [ ] **Step 5:** Add native accessible FAQ disclosure elements.
- [ ] **Step 6:** Add a dark final CTA describing the simulator as indicative.

### Task 4: Rewrite the three route configurations

**Files:**
- Modify: `src/routes/pompe-a-chaleur.tsx`
- Modify: `src/routes/isolation-thermique.tsx`
- Modify: `src/routes/aides-financieres-2026.tsx`

**Interfaces:**
- Consumes: expanded `SiloPage` interface from Task 3.
- Produces: unique highlights, editorial sections, FAQs, titles, and descriptions for each route.

- [ ] **Step 1:** Rewrite heating metadata/content without QualiPac or installer claims.
- [ ] **Step 2:** Rewrite insulation metadata/content without Qualibat or guaranteed DPE improvement claims.
- [ ] **Step 3:** Rewrite aid metadata/content with verification caveats and no unsourced guaranteed amount.
- [ ] **Step 4:** Ensure all three pages supply exactly three highlights and at least three FAQ entries.

### Task 5: Verify integration and responsive design

**Files:**
- Verify all files modified in Tasks 1–4.

**Interfaces:**
- Produces: verified French, claim-safe, responsive secondary pages.

- [ ] **Step 1:** Run targeted Prettier and ESLint for all modified files.
- [ ] **Step 2:** Run `npm run build` and require exit code 0.
- [ ] **Step 3:** Search for unverified credentials and review every remaining match.
- [ ] **Step 4:** Inspect all three pages at desktop width and at least one at mobile width.
- [ ] **Step 5:** Verify section anchors, FAQ controls, CTA link, 404 language, and document language.
