# Contact and Legal Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add polished Contact, Mentions légales, and Politique de confidentialité pages that match the existing site while clearly exposing which client information is still required before publication.

**Architecture:** Keep legal and contact identity values in one typed configuration module. Render legal content through a shared editorial page shell built on the existing `PageShell`; keep the Contact page separate because its disabled form preview has unique semantics. Add internal navigation through TanStack Router and avoid any network submission or storage.

**Tech Stack:** React 19, TypeScript, TanStack Start file routes, TanStack Router, Tailwind CSS 4, Lucide React, Vite, ESLint, Prettier.

## Global Constraints

- Preserve the established visual system in `src/components/site/Layout.tsx` and `src/components/site/SiloPage.tsx`.
- Do not invent a company address, legal form, registration number, contact channel, hosting provider, data controller, processor, legal basis, or retention period.
- Keep every contact control disabled and do not add a submit handler, server function, fetch call, external form action, storage, analytics, or dependency.
- Treat `ENERVIA RENOV` only as the known commercial name; do not imply that it is the registered corporate name.
- Keep all copy in French and all routes responsive and keyboard-readable.
- Do not edit `src/routeTree.gen.ts`; TanStack generates it during development/build.
- The project has no automated test framework and the user previously chose targeted ESLint, production build, and browser checks instead of adding one.
- This folder is not a Git repository, so commit steps are recorded as review checkpoints and cannot be executed until version control exists.

---

## File Map

- Create `src/lib/site-identity.ts`: typed source of truth for known and missing company/legal/privacy values.
- Create `src/components/site/InformationPage.tsx`: shared visual shell for legal and privacy pages.
- Create `src/routes/contact.tsx`: disabled contact-form preview and availability notice.
- Create `src/routes/mentions-legales.tsx`: preparatory legal notice rendered from centralized identity data.
- Create `src/routes/politique-de-confidentialite.tsx`: truthful V1 privacy policy.
- Modify `src/components/site/Layout.tsx`: add Contact and legal/privacy links without changing the main commercial hierarchy.
- Modify `src/routes/__root.tsx`: use the known commercial brand in site-wide metadata if the existing value is not sourced centrally.

### Task 1: Centralize Site Identity and Missing Legal Values

**Files:**
- Create: `src/lib/site-identity.ts`

**Interfaces:**
- Produces: `type PublicationValue = { status: "known"; value: string } | { status: "missing" }`
- Produces: `siteIdentity` with `commercialName`, `legalName`, `legalForm`, `capital`, `registeredAddress`, `registration`, `publicationDirector`, `contactEmail`, `contactPhone`, `host`, `dataController`, `rightsContact`, `retentionPeriod`, and `lastUpdated`
- Produces: `publicationLabel(value: PublicationValue): string`

- [ ] **Step 1: Establish the failing static contract check**

  Run:

  ```powershell
  rg -n "PublicationValue|siteIdentity|publicationLabel" src/lib/site-identity.ts
  ```

  Expected before creation: file-not-found/non-zero result.

- [ ] **Step 2: Implement the typed configuration**

  Set `commercialName` to the known value `ENERVIA RENOV`. Represent every unconfirmed legal value with `{ status: "missing" }`. Make `publicationLabel` return the real known value or `À compléter avant publication`.

- [ ] **Step 3: Verify the contract and formatting**

  Run:

  ```powershell
  npx prettier --check src/lib/site-identity.ts
  npx eslint src/lib/site-identity.ts
  ```

- [ ] **Step 4: Review checkpoint**

  Confirm the file contains no guessed identifiers, addresses, providers, emails, phone numbers, or retention periods. A Git commit is unavailable because the project has no `.git` directory.

### Task 2: Build the Shared Editorial Information Page

**Files:**
- Create: `src/components/site/InformationPage.tsx`

**Interfaces:**
- Consumes: `ReactNode` content and page-level `eyebrow`, `title`, `intro`, and optional `statusLabel`
- Produces: `InformationPage(props): JSX.Element`
- Depends on: `PageShell` from `src/components/site/Layout.tsx`

- [ ] **Step 1: Establish the failing component check**

  Run:

  ```powershell
  rg -n "export function InformationPage" src/components/site/InformationPage.tsx
  ```

  Expected before creation: file-not-found/non-zero result.

- [ ] **Step 2: Implement the shared page shell**

  Build a dark editorial hero followed by a stone content area, using the same max widths, copper accent, border treatment, display typography, and responsive spacing as `SiloPage`. Accept children so legal routes own their semantic sections.

- [ ] **Step 3: Verify semantics and style**

  Confirm the component has one page-level `h1`, exposes no fake content, and does not introduce a competing design token set.

- [ ] **Step 4: Run targeted checks**

  Run:

  ```powershell
  npx prettier --check src/components/site/InformationPage.tsx
  npx eslint src/components/site/InformationPage.tsx
  ```

- [ ] **Step 5: Review checkpoint**

  Compare the classes with `Layout.tsx` and `SiloPage.tsx`. A Git commit is unavailable because the project has no `.git` directory.

### Task 3: Create the Preparatory Legal Notice

**Files:**
- Create: `src/routes/mentions-legales.tsx`

**Interfaces:**
- Consumes: `InformationPage`, `siteIdentity`, `publicationLabel`
- Produces: TanStack file route `/mentions-legales` with French metadata

- [ ] **Step 1: Establish the failing route check**

  Run:

  ```powershell
  Test-Path src/routes/mentions-legales.tsx
  ```

  Expected before creation: `False`.

- [ ] **Step 2: Implement route metadata and preparatory status**

  Add an exact title, description, canonical path, Open Graph metadata, and a visible `Version préparatoire` status.

- [ ] **Step 3: Implement the legal sections**

  Render editor identification, company registration details, publication director, contact, hosting, intellectual property, responsibility, and external links. Render every missing value through `publicationLabel`; group the missing publication requirements in a prominent warning card.

- [ ] **Step 4: Run targeted checks**

  Run:

  ```powershell
  npx prettier --check src/routes/mentions-legales.tsx
  npx eslint src/routes/mentions-legales.tsx
  rg -n "@|SIREN.{0,8}[0-9]{9}|SIRET.{0,8}[0-9]{14}|\+33|0[1-9](?:[ .-]?[0-9]{2}){4}" src/routes/mentions-legales.tsx
  ```

  The final scan must find no invented contact or registration value.

- [ ] **Step 5: Review checkpoint**

  Compare page sections with the approved design and official French categories. A Git commit is unavailable because the project has no `.git` directory.

### Task 4: Create the Truthful V1 Privacy Policy

**Files:**
- Create: `src/routes/politique-de-confidentialite.tsx`

**Interfaces:**
- Consumes: `InformationPage`, `siteIdentity`, `publicationLabel`, TanStack `Link`
- Produces: TanStack file route `/politique-de-confidentialite` with French metadata

- [ ] **Step 1: Establish the failing route check**

  Run:

  ```powershell
  Test-Path src/routes/politique-de-confidentialite.tsx
  ```

  Expected before creation: `False`.

- [ ] **Step 2: Implement route metadata and current-state notice**

  State unambiguously that the Contact form is inactive and that the simulator does not currently send data to a server or email service.

- [ ] **Step 3: Implement privacy sections**

  Cover future data categories, purposes, pending legal basis, recipients, pending retention period, security, user rights, CNIL complaint rights, and pending rights-contact channel. Link internally to `/contact` without claiming the contact form works.

- [ ] **Step 4: Run targeted checks**

  Run:

  ```powershell
  npx prettier --check src/routes/politique-de-confidentialite.tsx
  npx eslint src/routes/politique-de-confidentialite.tsx
  rg -n "garanti|certifié|conservées? pendant|jours|mois|ans" src/routes/politique-de-confidentialite.tsx
  ```

  Review every match so the page makes no unsupported assurance or invented retention promise.

- [ ] **Step 5: Review checkpoint**

  Confirm current behavior and future behavior are clearly separated. A Git commit is unavailable because the project has no `.git` directory.

### Task 5: Create the Inactive Contact Experience

**Files:**
- Create: `src/routes/contact.tsx`

**Interfaces:**
- Consumes: `PageShell`, TanStack `Link`, Lucide icons
- Produces: TanStack file route `/contact` with a disabled form preview and French metadata

- [ ] **Step 1: Establish the failing route check**

  Run:

  ```powershell
  Test-Path src/routes/contact.tsx
  ```

  Expected before creation: `False`.

- [ ] **Step 2: Implement the page hero and availability card**

  Match the site hero treatment and add a visible `Bientôt disponible` explanation that no request can currently be submitted online.

- [ ] **Step 3: Implement the disabled semantic form preview**

  Use a disabled `fieldset` containing labeled name, email, phone, project-type, and message controls. Use `type="button"` for the disabled action and omit `action`, `method`, `onSubmit`, `fetch`, server calls, and storage. Add a first-level privacy notice linking to `/politique-de-confidentialite`.

- [ ] **Step 4: Run targeted security checks**

  Run:

  ```powershell
  npx prettier --check src/routes/contact.tsx
  npx eslint src/routes/contact.tsx
  rg -n "onSubmit|fetch\(|createServerFn|action=|method=|localStorage|sessionStorage" src/routes/contact.tsx
  ```

  Expected: no submission or storage implementation.

- [ ] **Step 5: Review checkpoint**

  Confirm disabled state is communicated in text and not only by color. A Git commit is unavailable because the project has no `.git` directory.

### Task 6: Integrate Navigation and Central Brand Data

**Files:**
- Modify: `src/components/site/Layout.tsx`
- Modify: `src/routes/__root.tsx`

**Interfaces:**
- Consumes: `siteIdentity.commercialName`
- Produces: Contact entry in navigation, footer links for Contact, Mentions légales, and Politique de confidentialité, consistent site metadata

- [ ] **Step 1: Establish the failing navigation check**

  Run:

  ```powershell
  rg -n 'to="/(contact|mentions-legales|politique-de-confidentialite)"' src/components/site/Layout.tsx
  ```

  Expected before integration: no matches.

- [ ] **Step 2: Add Contact without crowding the commercial navigation**

  Add Contact as a restrained desktop/mobile navigation entry while preserving the existing hierarchy and simulator CTA.

- [ ] **Step 3: Add footer utility navigation**

  Add accessible internal links to all three pages and render the known commercial name from central configuration. Preserve the existing three-column balance on desktop and clean stacking on mobile.

- [ ] **Step 4: Align root metadata**

  Replace duplicated site-name metadata with the known commercial name from `siteIdentity` while preserving the neutral, verifiable description.

- [ ] **Step 5: Run targeted checks**

  Run:

  ```powershell
  npx prettier --check src/components/site/Layout.tsx src/routes/__root.tsx
  npx eslint src/components/site/Layout.tsx src/routes/__root.tsx
  rg -n 'to="/(contact|mentions-legales|politique-de-confidentialite)"' src/components/site/Layout.tsx
  ```

- [ ] **Step 6: Review checkpoint**

  Confirm desktop and mobile navigation expose the same Contact destination and the footer exposes all legal destinations. A Git commit is unavailable because the project has no `.git` directory.

### Task 7: Validate Build, Behavior, and Visual Consistency

**Files:**
- Verify: all files created or modified in Tasks 1–6

**Interfaces:**
- Produces: production build and desktop/mobile visual evidence

- [ ] **Step 1: Format only the touched files**

  Run:

  ```powershell
  npx prettier --write src/lib/site-identity.ts src/components/site/InformationPage.tsx src/components/site/Layout.tsx src/routes/__root.tsx src/routes/contact.tsx src/routes/mentions-legales.tsx src/routes/politique-de-confidentialite.tsx
  ```

- [ ] **Step 2: Run targeted lint**

  Run:

  ```powershell
  npx eslint src/lib/site-identity.ts src/components/site/InformationPage.tsx src/components/site/Layout.tsx src/routes/__root.tsx src/routes/contact.tsx src/routes/mentions-legales.tsx src/routes/politique-de-confidentialite.tsx
  ```

- [ ] **Step 3: Build the production bundle**

  Run:

  ```powershell
  npm run build
  ```

  Expected: exit code 0 and generated TanStack routes for all three paths.

- [ ] **Step 4: Run the local production preview**

  Run `npm run preview` on an available local port and keep the process running for browser validation.

- [ ] **Step 5: Verify routes and disabled behavior in a browser**

  Visit `/contact`, `/mentions-legales`, and `/politique-de-confidentialite`. Confirm status 200, French metadata, functional internal links, disabled form controls, and absence of a submission request when the disabled action is activated.

- [ ] **Step 6: Capture desktop and mobile evidence**

  Capture at least the Contact and Mentions légales pages at approximately 1440 px and 390 px widths. Compare header, footer, typography, spacing, surfaces, copper accents, and overflow with the homepage and secondary pages.

- [ ] **Step 7: Perform the final truthfulness scan**

  Run:

  ```powershell
  rg -n "Lorem|TBD|TODO|exemple@|example.com|SIREN.{0,8}[0-9]{9}|SIRET.{0,8}[0-9]{14}" src/routes/contact.tsx src/routes/mentions-legales.tsx src/routes/politique-de-confidentialite.tsx src/lib/site-identity.ts
  ```

  Expected: no placeholder examples or fabricated legal identifiers. The approved user-facing phrase `À compléter avant publication` is valid and must remain.

- [ ] **Step 8: Final review checkpoint**

  Record validation results and screenshot paths for the user. A Git commit is unavailable because the project has no `.git` directory.
