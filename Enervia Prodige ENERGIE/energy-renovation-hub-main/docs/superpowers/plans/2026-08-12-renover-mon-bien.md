# Rénover Mon Bien Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a premium two-card « Rénover mon bien » homepage section and an accessible header dropdown pointing to the same two external renovation services.

**Architecture:** Store both labels, descriptions, and URLs in one shared typed data module. Consume that data in the shared header and homepage so the links cannot drift, while keeping the current premium visual system and responsive behavior.

**Tech Stack:** React 19, TypeScript, TanStack Router, Tailwind CSS 4, Lucide React, Vite.

## Global Constraints

- No new dependencies.
- Links open in the current tab; never add `target="_blank"`.
- Preserve existing routes and simulator behavior.
- The project has no Git repository, so commit steps cannot run.
- Validate with targeted lint, Prettier, production build, and desktop/mobile browser inspection.

---

### Task 1: Create the shared renovation-link model

**Files:**
- Create: `src/lib/property-renovation.ts`

**Interfaces:**
- Produces: `propertyRenovationLinks`, a readonly array containing `number`, `title`, `shortTitle`, `description`, and `href`.
- Consumes: no application state.

- [ ] **Step 1: Create the typed shared data array**

Add the exact two supplied URLs and concise descriptions for building and individual-house renovation.

- [ ] **Step 2: Confirm that neither URL is duplicated in another modified file**

Run: `rg -n "lhenergies\.fr" src`

Expected: both URL strings appear only in `src/lib/property-renovation.ts`.

### Task 2: Add the accessible header dropdown

**Files:**
- Modify: `src/components/site/Layout.tsx`

**Interfaces:**
- Consumes: `propertyRenovationLinks` from Task 1.
- Produces: desktop dropdown state and mobile renovation sub-links.

- [ ] **Step 1: Add controlled desktop dropdown state**

Add a « Rénover mon bien » button with `aria-expanded` and `aria-controls`. Close the dropdown after a destination is selected and when the mobile menu closes.

- [ ] **Step 2: Render the two desktop destinations**

Use ordinary `<a>` elements without `target`. Include an external-navigation icon as decoration and retain visible focus styles.

- [ ] **Step 3: Render mobile sub-links**

Add a visible « Rénover mon bien » group label followed by both destinations in the existing mobile panel.

- [ ] **Step 4: Validate the layout file**

Run: `npx prettier --check src/components/site/Layout.tsx && npx eslint src/components/site/Layout.tsx`

Expected: exit code 0.

### Task 3: Add the homepage section

**Files:**
- Modify: `src/routes/index.tsx`

**Interfaces:**
- Consumes: `propertyRenovationLinks` from Task 1.
- Produces: `#renover-mon-bien`, a responsive two-card section between expertise and method.

- [ ] **Step 1: Add the section introduction**

Use the eyebrow « Rénover mon bien », a concise architectural heading, and explanatory copy that does not invent services or guarantees.

- [ ] **Step 2: Render the two cards from shared data**

Use a dark premium surface, persistent title and description, numbered identity, and an explicit « Découvrir » action. Cards stack on mobile and sit side by side on desktop.

- [ ] **Step 3: Confirm same-tab navigation**

Run: `rg -n "target=|propertyRenovationLinks" src/routes/index.tsx src/components/site/Layout.tsx`

Expected: shared data is consumed by both files and no new-tab target is present.

### Task 4: Verify the integrated feature

**Files:**
- Verify: `src/lib/property-renovation.ts`
- Verify: `src/components/site/Layout.tsx`
- Verify: `src/routes/index.tsx`

**Interfaces:**
- Consumes: completed implementation.
- Produces: verified desktop and mobile navigation and section layouts.

- [ ] **Step 1: Run targeted quality checks**

Run: `npx prettier --check src/lib/property-renovation.ts src/components/site/Layout.tsx src/routes/index.tsx && npx eslint src/lib/property-renovation.ts src/components/site/Layout.tsx src/routes/index.tsx`

Expected: exit code 0.

- [ ] **Step 2: Run the production build**

Run: `npm run build`

Expected: exit code 0.

- [ ] **Step 3: Inspect desktop behavior**

Verify dropdown opening, both exact href values, same-tab behavior, section placement, and two-column cards.

- [ ] **Step 4: Inspect mobile behavior**

Verify grouped sub-links, no overflow, stacked cards, and usable focus/click targets.
