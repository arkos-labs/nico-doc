# Premium Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the Rénov Premium homepage as a credible, conversion-focused, premium building-company experience without displaying unverified claims.

**Architecture:** Keep the existing TanStack Router page and simulator behavior. Refactor the homepage markup into focused local presentation units, update the shared header/footer for the new visual language and mobile navigation, and extend the global design tokens with the approved architectural palette and motion rules.

**Tech Stack:** React 19, TypeScript, TanStack Router, Tailwind CSS 4, Lucide React, Vite.

## Global Constraints

- Do not add dependencies.
- Preserve every existing route and the `Simulator` component behavior.
- Do not display unverified certifications, statistics, customer ratings, legal identifiers, partner logos, or guaranteed aid amounts.
- Reuse `src/assets/hero-renovation.jpg` as the homepage hero image.
- Meet keyboard-accessibility, visible-focus, responsive-layout, and reduced-motion requirements.
- The project has no Git repository; commit steps are documented but cannot run until Git is initialized or restored.

---

## File Map

- `src/routes/index.tsx`: homepage content, hero, expertise cards, method, simulator framing, and fraud warning.
- `src/components/site/Layout.tsx`: shared premium header, accessible mobile menu, and credible footer content.
- `src/styles.css`: architectural typography, palette, shadows, reusable presentation utilities, focus styles, and motion reduction.

### Task 1: Establish the architectural design system

**Files:**
- Modify: `src/styles.css`

**Interfaces:**
- Produces: Tailwind theme tokens and reusable CSS utilities consumed by `Layout.tsx` and `index.tsx`.
- Consumes: existing Tailwind CSS 4 theme variables.

- [ ] **Step 1: Record the current validation baseline**

Run: `npm run lint`

Expected: note all pre-existing lint failures before editing so they are not confused with regressions.

- [ ] **Step 2: Run the current production build**

Run: `npm run build`

Expected: the current app builds, or any existing failure is recorded.

- [ ] **Step 3: Replace generic design tokens with the approved palette**

Update `src/styles.css` with charcoal, deep architectural green, warm stone, bronze/copper accent, high-contrast text, restrained radii, and precise shadows. Replace the Montserrat/Inter display treatment with a distinctive editorial display stack and a readable body stack, while retaining safe fallbacks.

- [ ] **Step 4: Add shared interaction and motion rules**

Add visible `:focus-visible` treatment, refined hover transitions, hero entrance utilities, and a `prefers-reduced-motion: reduce` block that removes nonessential motion.

- [ ] **Step 5: Validate the stylesheet integration**

Run: `npm run build`

Expected: Tailwind compiles all tokens and utilities without unknown-class or CSS syntax errors.

- [ ] **Step 6: Commit the design-system task when Git is available**

Run: `git add src/styles.css && git commit -m "style: establish premium renovation design system"`

### Task 2: Rebuild the shared header and footer

**Files:**
- Modify: `src/components/site/Layout.tsx`

**Interfaces:**
- Consumes: TanStack `Link`, Lucide icons, and design tokens from Task 1.
- Produces: `SiteHeader`, `SiteFooter`, and unchanged `PageShell({ children }: { children: ReactNode })`.

- [ ] **Step 1: Replace the header visual structure**

Create a compact architectural wordmark, desktop navigation for Solutions, Aides 2026, and Notre méthode, plus the primary « Estimer mon projet » action. Do not show the placeholder phone number as real contact information.

- [ ] **Step 2: Add an accessible mobile navigation**

Use a native button with an explicit accessible name, `aria-expanded`, and a controlled menu state. Ensure every navigation target remains keyboard reachable and the main CTA remains visible on small screens.

- [ ] **Step 3: Rewrite the footer without unverified claims**

Keep useful expertise links and a concise privacy/contact statement. Remove the unverified RGE assertion and code NAF. Add the current year without implying unavailable company details.

- [ ] **Step 4: Check TypeScript and lint feedback**

Run: `npm run lint`

Expected: no new errors in `src/components/site/Layout.tsx`; unrelated baseline failures may remain documented.

- [ ] **Step 5: Build the shared layout**

Run: `npm run build`

Expected: all route pages compile with the updated shared layout.

- [ ] **Step 6: Commit the shared-layout task when Git is available**

Run: `git add src/components/site/Layout.tsx && git commit -m "feat: refine premium site navigation and footer"`

### Task 3: Recompose the homepage hero and trust message

**Files:**
- Modify: `src/routes/index.tsx`

**Interfaces:**
- Consumes: `PageShell`, `heroImage`, TanStack `Link`, and Lucide icons.
- Produces: responsive hero, project-estimate panel, and three honest assurance statements linking to `#simulateur` and `#methode`.

- [ ] **Step 1: Remove unsupported homepage claims**

Delete the maximum-aid amount, satisfaction rating, RGE/Qualibat certification, annual verification claim, and guaranteed aid-deduction language.

- [ ] **Step 2: Build the approved immersive hero**

Use `heroImage` as the full visual field with a controlled dark gradient. Add the approved headline, supporting copy, primary « Estimer mes aides » anchor, and secondary « Découvrir notre méthode » anchor.

- [ ] **Step 3: Add the project-estimate panel**

Present the three truthful steps: describe the home, specify the project, receive an initial estimate. The panel must stack below the hero copy on mobile.

- [ ] **Step 4: Add the assurance strip**

Display only « Estimation gratuite », « Sans engagement », and « Coordonnées à la dernière étape ».

- [ ] **Step 5: Verify semantic structure**

Confirm a single `h1`, logical heading order, decorative image handling, descriptive link labels, and anchors with appropriate scroll offsets.

- [ ] **Step 6: Run validation**

Run: `npm run lint && npm run build`

Expected: no new homepage TypeScript or lint errors and a successful production build.

- [ ] **Step 7: Commit the hero task when Git is available**

Run: `git add src/routes/index.tsx && git commit -m "feat: rebuild premium homepage hero"`

### Task 4: Redesign expertise, method, simulator, and prevention sections

**Files:**
- Modify: `src/routes/index.tsx`

**Interfaces:**
- Consumes: existing route paths and unchanged `<Simulator />`.
- Produces: premium expertise cards, `#methode`, simulator framing, commitments, and fraud-prevention content.

- [ ] **Step 1: Rebuild the expertise section**

Keep the three existing route destinations and service lists, but replace the pastel card treatment with large architectural cards, restrained icons, descriptive copy, and persistent visible discovery links.

- [ ] **Step 2: Rebuild the method section**

Add `id="methode"` and present evaluation, preparation, and project follow-up as a structured three-step sequence. Phrase every step as guidance or process intent, not an unverified contractual guarantee.

- [ ] **Step 3: Reframe the simulator**

Keep `<Simulator />` unchanged. Place it within a visually distinct high-contrast section with concise reassurance and a clear heading hierarchy.

- [ ] **Step 4: Integrate commitments and fraud prevention**

Use a compact editorial block for privacy, no-obligation positioning, and the existing warning that one-euro insulation offers ended in 2021. Avoid presenting legal advice.

- [ ] **Step 5: Remove unused imports and dead presentation data**

Delete icons, arrays, and classes made obsolete by the redesign so `index.tsx` stays focused.

- [ ] **Step 6: Run validation**

Run: `npm run lint && npm run build`

Expected: successful production build; no new lint failures in the modified homepage.

- [ ] **Step 7: Commit the section redesign when Git is available**

Run: `git add src/routes/index.tsx && git commit -m "feat: redesign homepage service and conversion sections"`

### Task 5: Responsive and accessibility verification

**Files:**
- Modify if needed: `src/routes/index.tsx`
- Modify if needed: `src/components/site/Layout.tsx`
- Modify if needed: `src/styles.css`

**Interfaces:**
- Consumes: completed homepage and shared layout.
- Produces: verified layouts at 320 px, 768 px, and desktop width.

- [ ] **Step 1: Start the local preview**

Run: `npm run dev`

Expected: the homepage loads without runtime errors.

- [ ] **Step 2: Inspect desktop layout**

At approximately 1440 px, verify hero image composition, text readability, panel alignment, navigation, expertise cards, method flow, simulator, and footer.

- [ ] **Step 3: Inspect tablet and mobile layouts**

At 768 px and 320 px, verify no horizontal overflow, hero stacking, CTA wrapping, mobile menu operation, readable cards, and usable simulator controls.

- [ ] **Step 4: Inspect keyboard and reduced-motion behavior**

Tab through the header, page actions, service links, simulator controls, and footer. Confirm visible focus, correct menu state, logical tab order, and no essential information conveyed only by animation.

- [ ] **Step 5: Re-run final automated checks**

Run: `npm run lint && npm run build`

Expected: build succeeds and any lint output contains no new errors caused by the homepage work.

- [ ] **Step 6: Commit verification fixes when Git is available**

Run: `git add src/routes/index.tsx src/components/site/Layout.tsx src/styles.css && git commit -m "fix: polish responsive premium homepage"`
