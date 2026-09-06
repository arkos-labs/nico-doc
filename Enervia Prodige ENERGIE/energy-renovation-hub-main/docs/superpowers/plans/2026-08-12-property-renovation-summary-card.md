# Property Renovation Summary Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add one non-repetitive « Rénover mon bien » summary card below the three homepage expertise cards.

**Architecture:** Keep the three existing expertise links unchanged. Add a full-width internal anchor card in the same section that summarizes the two property types and points only to `#renover-mon-bien`, leaving external destinations and detailed descriptions in the dedicated section.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, Lucide React, Vite.

## Global Constraints

- Modify only `src/routes/index.tsx` unless validation reveals a necessary correction.
- Do not add external links or repeat detailed descriptions.
- Do not add dependencies.
- Validate with targeted format, lint, build, and desktop/mobile inspection.

---

### Task 1: Add and verify the summary card

**Files:**
- Modify: `src/routes/index.tsx`

**Interfaces:**
- Consumes: existing `#renover-mon-bien` anchor.
- Produces: one full-width summary card linking to `#renover-mon-bien`.

- [ ] **Step 1: Add the horizontal summary card**

Place it immediately after the existing three-card grid. Include the approved title, description, two short property-type labels, and « Choisir mon parcours » action.

- [ ] **Step 2: Preserve a non-repetitive hierarchy**

Use only the internal `#renover-mon-bien` href. Do not render either `lhenergies.fr` URL or reuse the longer descriptions from the detailed section.

- [ ] **Step 3: Validate code quality**

Run: `npx prettier --check src/routes/index.tsx && npx eslint src/routes/index.tsx`

Expected: exit code 0.

- [ ] **Step 4: Run the production build**

Run: `npm run build`

Expected: exit code 0.

- [ ] **Step 5: Inspect responsive rendering**

Verify a horizontal composition on desktop, a stacked composition on mobile, readable focus state, and correct scrolling to `#renover-mon-bien`.
