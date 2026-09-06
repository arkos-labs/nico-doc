# Documentation complète — Energy Renovation Hub (Enervia Renov)

> Dernière mise à jour : 13 août 2026  
> Statut : En développement actif — déploiement Vercel en place

---

## 1. Vue d'ensemble

**Energy Renovation Hub** est le site web vitrine et de génération de leads de **Enervia Renov**, une entreprise spécialisée dans la rénovation énergétique en France. Le site vise à :

- Informer les propriétaires et bailleurs sur les travaux de rénovation (PAC, isolation, VMC, menuiseries…)
- Présenter les aides financières disponibles (MaPrimeRénov', CEE, Éco-PTZ)
- Fournir un simulateur d'économies d'énergie interactif
- Capturer des leads via un formulaire de contact avec envoi d'e-mail automatique

---

## 2. Stack technique

| Catégorie | Technologie | Version |
|---|---|---|
| Framework | TanStack Start (React SSR/SSG) | 1.168.x |
| Bundler | Vite | 8.x |
| Langage | TypeScript | 5.8 |
| UI composants | shadcn/ui + Radix UI | — |
| CSS | Tailwind CSS | 4.x |
| Validation | Zod | 3.24 |
| Formulaires | React Hook Form + @hookform/resolvers | 7.x |
| Routing | TanStack Router (file-based) | 1.170.x |
| Requêtes | TanStack Query | 5.x |
| E-mail | Nodemailer (Gmail SMTP) | — |
| Graphiques | Recharts | 2.x |
| Icônes | Lucide React | 0.575 |
| Déploiement | Vercel (Nitro / Cloudflare Workers) | — |
| Runtime serveur | Nitro 3 (beta) | 3.0.x |
| Linting/Format | ESLint 9 + Prettier | — |

### Particularités d'architecture

Le projet utilise **TanStack Start**, un méta-framework SSR basé sur TanStack Router avec rendu côté serveur via Nitro. Chaque route peut déclarer ses métadonnées (`<head>`, balises Open Graph, JSON-LD) directement dans la définition de route — ce qui permet un SEO solide sans bibliothèque tierce.

Le fichier `src/routeTree.gen.ts` est **auto-généré** par le plugin TanStack Router et ne doit pas être modifié manuellement.

---

## 3. Structure du projet

```
energy-renovation-hub-main/
├── src/
│   ├── routes/                    # Pages (file-based routing)
│   │   ├── __root.tsx             # Layout racine (Header + Footer + SEO global)
│   │   ├── index.tsx              # Page d'accueil
│   │   ├── simulation.tsx         # Simulateur d'économies
│   │   ├── contact.tsx            # Formulaire de contact
│   │   ├── notre-methode.tsx      # Page "Notre méthode"
│   │   ├── aides-financieres-2026.tsx
│   │   ├── maprimerenov.tsx
│   │   ├── prime-cee.tsx
│   │   ├── eco-ptz.tsx
│   │   ├── pompe-a-chaleur.tsx
│   │   ├── pac-air-air.tsx
│   │   ├── pac-air-eau.tsx
│   │   ├── pac-geothermie.tsx
│   │   ├── isolation-thermique.tsx
│   │   ├── isolation-combles.tsx
│   │   ├── isolation-murs.tsx
│   │   ├── isolation-planchers.tsx
│   │   ├── menuiseries-fenetres.tsx
│   │   ├── vmc-ventilation.tsx
│   │   ├── reequilibrage-chauffage.tsx
│   │   ├── renovation-ampleur.tsx
│   │   ├── renovation-maison-individuelle.tsx
│   │   ├── renovation-immeuble.tsx
│   │   ├── mentions-legales.tsx
│   │   ├── politique-de-confidentialite.tsx
│   │   └── api/
│   │       └── contact.ts         # Endpoint API envoi d'e-mail
│   ├── components/
│   │   ├── site/                  # Composants métier
│   │   │   ├── Layout.tsx         # Header, Footer, PageShell, navigation
│   │   │   ├── Simulator.tsx      # Simulateur multi-étapes (composant principal)
│   │   │   ├── SimulationShell.tsx
│   │   │   ├── SiloPage.tsx       # Template page silo SEO
│   │   │   ├── InformationPage.tsx
│   │   │   └── PacAirAirSchema.tsx  # Schéma visuel PAC air/air
│   │   └── ui/                    # Composants shadcn/ui (standard, ne pas modifier)
│   │       └── [accordion, alert, avatar, badge, button, calendar, card,
│   │           carousel, chart, checkbox, dialog, drawer, dropdown-menu,
│   │           form, input, label, popover, progress, radio-group, select,
│   │           separator, sheet, sidebar, skeleton, slider, sonner, switch,
│   │           table, tabs, textarea, toggle, tooltip…]
│   ├── lib/
│   │   ├── site-identity.ts       # Infos de marque (nom, téléphone, adresse, SEO)
│   │   ├── simulator-model.ts     # Modèle de données + validation Zod du simulateur
│   │   ├── simulator-estimate.ts  # Moteur de calcul des économies estimées
│   │   ├── simulator-estimate.test.ts  # Tests unitaires du moteur
│   │   ├── property-renovation.ts # Types liés à la rénovation immobilière
│   │   ├── error-capture.ts       # Capture d'erreurs SSR
│   │   ├── error-page.ts          # Page d'erreur 500 HTML
│   │   ├── lovable-error-reporting.ts
│   │   └── utils.ts               # cn() utility (clsx + tailwind-merge)
│   ├── hooks/
│   │   └── use-mobile.tsx         # Hook détection mobile (breakpoint)
│   ├── assets/
│   │   └── hero-renovation.jpg    # Image hero
│   ├── styles.css                 # Variables CSS globales + Tailwind base
│   ├── router.tsx                 # Création du router TanStack
│   ├── start.ts                   # Point d'entrée client
│   └── server.ts                  # Point d'entrée serveur Nitro/Cloudflare
├── public/
│   ├── logo.png / logfo.png       # Logos Enervia Renov
│   ├── favicon.ico
│   ├── logo-maprimerenov.svg      # Logos des aides officielles
│   ├── logo-cee.svg
│   ├── logo-france-renov.svg
│   ├── logo-ecoptz.svg
│   ├── maprimerenov.png / cee.png / eco-ptz.png / france-renov.png
│   ├── schema-pac-air-air.png     # Schémas techniques des équipements
│   ├── schema-pac-air-eau.png
│   ├── schema-pac-geothermie.png
│   ├── schema-isolation-combles.png
│   ├── schema-isolation-murs.png
│   ├── reequilibrage-schema.png
│   ├── robots.txt                 # SEO crawling rules
│   └── llms.txt                   # Instructions pour les LLM (IA)
├── docs/
│   └── charte-typographique-enervia.html  # Charte graphique de la marque
├── package.json
├── vite.config.ts
├── tsconfig.json
├── components.json                # Config shadcn/ui
└── .env.local                     # Variables d'environnement (non commité)
```

---

## 4. Pages et routes

### 4.1 Page d'accueil — `/`

**Fichier :** `src/routes/index.tsx`

Page principale de présentation. Structure en sections :

- **Hero** : accroche principale avec CTA vers simulateur et contact
- **Missions/Services** : carte des types de travaux proposés
- **Aides financières** : présentation des dispositifs (MaPrimeRénov', CEE, Éco-PTZ)
- **Processus** : étapes de l'accompagnement (diagnostic → devis → travaux)
- **Témoignages** ou réassurance
- **CTA final** : vers contact/simulateur

Métadonnées : titre, description, Open Graph, JSON-LD (schema `Organization` + `LocalBusiness`).

---

### 4.2 Simulateur — `/simulation`

**Fichier :** `src/routes/simulation.tsx`  
**Composant principal :** `src/components/site/Simulator.tsx`

Page avec un simulateur multi-étapes permettant d'estimer les économies d'énergie potentielles.

**Sections de la page :**
- Header avec titre et garanties (données conservées en local, non contractuel, sans engagement)
- Le simulateur lui-même (`<Simulator variant="campaign" />`)
- Footer disclamer avec icône ShieldCheck

**Métadonnées JSON-LD :** `WebApplication` (simulateur d'aides et d'économies d'énergie)

---

### 4.3 Contact — `/contact`

**Fichier :** `src/routes/contact.tsx`

Page formulaire de contact. Soumet vers l'API `/api/contact`.

**Champs du formulaire :**
- Nom (obligatoire)
- Adresse e-mail (obligatoire)
- Téléphone (optionnel)
- Type de projet (sélection)
- Surface estimée (optionnel)
- Message (obligatoire, minimum 10 caractères)
- Consentement RGPD (case à cocher obligatoire)

**Comportement :** validation côté client (React Hook Form + Zod), soumission vers l'API, affichage d'un message de succès ou d'erreur.

---

### 4.4 Notre méthode — `/notre-methode`

**Fichier :** `src/routes/notre-methode.tsx`

Page expliquant l'approche d'Enervia Renov : diagnostic préalable, audit énergétique, coordination des travaux, suivi.

---

### 4.5 Aides financières 2026 — `/aides-financieres-2026`

**Fichier :** `src/routes/aides-financieres-2026.tsx`

Page hub des aides de l'État. Présente et compare les trois dispositifs principaux avec des tableaux et explications.

---

### 4.6 MaPrimeRénov' — `/maprimerenov`

**Fichier :** `src/routes/maprimerenov.tsx`

Page dédiée à l'aide MaPrimeRénov'. Contenu : conditions d'éligibilité, montants, procédure, FAQ.

---

### 4.7 Prime CEE — `/prime-cee`

**Fichier :** `src/routes/prime-cee.tsx`

Page dédiée aux Certificats d'Économies d'Énergie. Contenu : fonctionnement du dispositif, travaux éligibles, démarches.

---

### 4.8 Éco-PTZ — `/eco-ptz`

**Fichier :** `src/routes/eco-ptz.tsx`

Page dédiée à l'Éco-Prêt à Taux Zéro. Contenu : plafonds de financement, conditions, combinaison avec MaPrimeRénov'.

---

### 4.9 Pompe à chaleur (hub) — `/pompe-a-chaleur`

**Fichier :** `src/routes/pompe-a-chaleur.tsx`

Page hub sur les pompes à chaleur en général. Liens vers les sous-pages spécialisées (air/air, air/eau, géothermie).

---

### 4.10 PAC air/air — `/pac-air-air`

**Fichier :** `src/routes/pac-air-air.tsx`  
**Composant schéma :** `src/components/site/PacAirAirSchema.tsx`

Page dédiée à la pompe à chaleur air/air : fonctionnement, avantages, limitations, aides disponibles. Inclut un schéma visuel interactif du système.

---

### 4.11 PAC air/eau — `/pac-air-eau`

**Fichier :** `src/routes/pac-air-eau.tsx`

Page dédiée à la pompe à chaleur air/eau : fonctionnement (extraction air extérieur → eau chaude), planchers chauffants, radiateurs basse température, aides.

---

### 4.12 PAC géothermie — `/pac-geothermie`

**Fichier :** `src/routes/pac-geothermie.tsx`

Page dédiée à la géothermie (capteurs enterrés horizontaux ou verticaux). Avantages de la stabilité du sol, rendement élevé, coûts d'installation.

---

### 4.13 Isolation thermique (hub) — `/isolation-thermique`

**Fichier :** `src/routes/isolation-thermique.tsx`

Page hub sur l'isolation en général. Liens vers combles, murs, planchers.

---

### 4.14 Isolation des combles — `/isolation-combles`

**Fichier :** `src/routes/isolation-combles.tsx`

Page dédiée à l'isolation des combles perdus et aménagés. Matériaux, déperditions thermiques, aides CEE et MaPrimeRénov'.

---

### 4.15 Isolation des murs — `/isolation-murs`

**Fichier :** `src/routes/isolation-murs.tsx`

Page dédiée à l'isolation thermique par l'extérieur (ITE) et par l'intérieur (ITI). Comparatif, ponts thermiques, aides.

---

### 4.16 Isolation des planchers — `/isolation-planchers`

**Fichier :** `src/routes/isolation-planchers.tsx`

Page dédiée à l'isolation des planchers bas (sur vide sanitaire ou sous-sol). Technique, matériaux, gains thermiques.

---

### 4.17 Menuiseries et fenêtres — `/menuiseries-fenetres`

**Fichier :** `src/routes/menuiseries-fenetres.tsx`

Page sur le remplacement des fenêtres et portes. Double/triple vitrage, Uw, Sw, éligibilité aux aides.

---

### 4.18 VMC et ventilation — `/vmc-ventilation`

**Fichier :** `src/routes/vmc-ventilation.tsx`

Page sur la ventilation mécanique contrôlée (VMC simple et double flux). Qualité de l'air intérieur, économies d'énergie, aides.

---

### 4.19 Rééquilibrage de chauffage — `/reequilibrage-chauffage`

**Fichier :** `src/routes/reequilibrage-chauffage.tsx`

Page sur l'optimisation de la distribution de chauffage dans un immeuble ou maison. Schéma technique, économies réalisables.

---

### 4.20 Rénovation d'ampleur — `/renovation-ampleur`

**Fichier :** `src/routes/renovation-ampleur.tsx`

Page sur les rénovations globales permettant de changer de classe DPE. Conditions MaPrimeRénov' Parcours Accompagné, Mon Accompagnateur Rénov'.

---

### 4.21 Rénovation maison individuelle — `/renovation-maison-individuelle`

**Fichier :** `src/routes/renovation-maison-individuelle.tsx`

Page dédiée aux propriétaires de maisons individuelles. Parcours type, aides spécifiques, témoignages.

---

### 4.22 Rénovation immeuble — `/renovation-immeuble`

**Fichier :** `src/routes/renovation-immeuble.tsx`

Page dédiée à la copropriété et aux bailleurs. Rénovation collective, syndics, financement mutualisé.

---

### 4.23 Mentions légales — `/mentions-legales`

**Fichier :** `src/routes/mentions-legales.tsx`

Page légale obligatoire : éditeur du site, hébergeur, directeur de publication, propriété intellectuelle.

---

### 4.24 Politique de confidentialité — `/politique-de-confidentialite`

**Fichier :** `src/routes/politique-de-confidentialite.tsx`

Page RGPD : données collectées (formulaire de contact uniquement), durée de conservation, droits des utilisateurs, DPO.

---

## 5. API serveur

### POST `/api/contact`

**Fichier :** `src/routes/api/contact.ts`

Endpoint qui reçoit les soumissions du formulaire de contact et envoie un e-mail au destinataire configuré.

**Payload attendu (JSON) :**
```json
{
  "name": "string (min 2 chars)",
  "email": "string (email valide)",
  "phone": "string (optionnel)",
  "projectType": "string",
  "surface": "string (optionnel)",
  "message": "string (min 10 chars)",
  "rgpd": true
}
```

**Traitement :**
1. Parse du body JSON
2. Sanitisation de tous les champs (trim + limite 2000 chars)
3. Validation serveur (nom, email, message, rgpd)
4. Création d'un transporter Nodemailer via Gmail SMTP
5. Envoi d'un e-mail HTML stylisé (template inline aux couleurs d'Enervia Renov)
6. Retour `{ success: true }` ou message d'erreur

**E-mail envoyé :**
- Design HTML avec header sombre, tableau des informations, bloc message
- `replyTo` sur l'adresse de l'internaute (répondre directement depuis le client mail)
- Sujet : `🏠 Nouveau lead — [projectType] — [name]`

**Variables d'environnement requises :**
```
GMAIL_USER=votre.adresse@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx   # App Password Google (pas le mot de passe normal)
LEAD_RECIPIENT_EMAIL=contact@enerviaa.com  # Destinataire final (défaut : contact@enerviaa.com)
```

> ⚠️ Le mot de passe Gmail doit être un **App Password** généré dans les paramètres de sécurité Google (compte → Sécurité → Mots de passe des applications). Le compte doit avoir la validation en 2 étapes activée.

---

## 6. Composants métier

### 6.1 `Layout.tsx` — Navigation et structure globale

**Fichier :** `src/components/site/Layout.tsx`

Contient tous les éléments de mise en page partagés :

- **`<Header />`** : navigation principale avec logo, menu desktop (dropdowns par catégorie), menu mobile (drawer/sheet), CTA "Demander un devis"
- **`<Footer />`** : liens, informations légales, coordonnées, réseaux sociaux
- **`<PageShell />`** : wrapper page standard (Header + children + Footer)
- **`<NavLink />`** : composant lien de navigation actif/inactif

La navigation est organisée en catégories :
- Nos travaux → PAC, Isolation, Menuiseries, VMC, Rééquilibrage
- Aides financières → MaPrimeRénov', CEE, Éco-PTZ, Hub 2026
- Notre méthode
- Simulateur
- Contact

---

### 6.2 `Simulator.tsx` — Simulateur multi-étapes

**Fichier :** `src/components/site/Simulator.tsx` (36 KB — composant principal)

Simulateur de rénovation énergétique en plusieurs étapes. Permet à l'utilisateur de décrire son projet pour obtenir une estimation d'économies.

**Étapes du simulateur :**
1. **Code postal** — localisation du logement
2. **Statut** — propriétaire ou locataire
3. **Type de bien** — maison individuelle ou appartement
4. **Chauffage actuel** — fioul, gaz, électricité, bois
5. **Surface habitable** — en m² (slider ou saisie)
6. **Types de travaux envisagés** — sélection multiple parmi : chauffage/PAC, combles, murs, fenêtres, ventilation, rénovation globale, "je ne sais pas encore"
7. **Dépenses énergétiques mensuelles** — fourchette pour calibrer les économies en euros
8. **Résultats** — affichage de l'estimation avec fourchette en % et en euros/an

**Fonctionnalités :**
- Navigation avant/arrière entre les étapes
- Validation par étape (impossible de passer à l'étape suivante si invalide)
- État conservé uniquement en mémoire navigateur (pas de cookie, pas de serveur)
- Affichage conditionnel : certains travaux sont exclusifs ("global" et "je ne sais pas" désélectionnent les autres)
- Résultat avec scénario narratif personnalisé selon le projet
- CTA de prise de contact depuis les résultats

**Prop `variant` :** `"campaign"` (affiché sur la page `/simulation`) ou d'autres variantes possibles intégrées dans d'autres pages.

---

### 6.3 `SiloPage.tsx` — Template page silo SEO

**Fichier :** `src/components/site/SiloPage.tsx`

Composant template réutilisé par la plupart des pages de contenu (PAC, isolation, aides…). Structure standardisée :

- Hero avec titre H1, sous-titre, CTA
- Contenu principal (accordéon FAQ, tableaux, listes)
- Barre latérale ou section d'appel à l'action
- Section réassurance (garanties, certifications)

---

### 6.4 `PacAirAirSchema.tsx` — Schéma visuel PAC

**Fichier :** `src/components/site/PacAirAirSchema.tsx`

Schéma SVG ou composant React illustrant le fonctionnement d'une PAC air/air (unité extérieure → unité intérieure → pièce). Composant pédagogique visuel.

---

### 6.5 `InformationPage.tsx`

**Fichier :** `src/components/site/InformationPage.tsx`

Template simplifié pour les pages d'information (mentions légales, politique de confidentialité). Mise en page texte sans fioritures.

---

## 7. Bibliothèque métier (`src/lib/`)

### 7.1 `site-identity.ts` — Identité de la marque

Exporte un objet `siteIdentity` centralisé contenant toutes les informations de l'entreprise :
- Nom commercial, nom légal
- Téléphone, e-mail de contact
- Adresse physique
- URL du site
- Descriptions SEO (courte et longue)
- Données pour le JSON-LD `LocalBusiness`

Utilisé par toutes les routes pour les métadonnées et le footer.

---

### 7.2 `simulator-model.ts` — Modèle de données du simulateur

Définit les types et la validation Zod du formulaire simulateur :

**Schéma Zod `RenovationProjectSchema` :**
- `postalCode` : string 5 chiffres
- `status` : `"proprietaire"` | `"locataire"`
- `propertyType` : `"maison"` | `"appartement"`
- `heatingSystem` : `"fioul"` | `"gaz"` | `"electricite"` | `"bois"`
- `surfaceArea` : number (10–400 m²)
- `works` : array of `WorkType` (min 1)
- `energySpendBracket` : fourchette de dépenses mensuelles

**Types de travaux (`WorkType`) :**
`heating` | `roof` | `walls` | `windows` | `ventilation` | `global` | `unknown`

**Fonctions utilitaires :**
- `toggleWorkSelection()` — gère la logique de sélection exclusive (global/unknown)
- `getProjectValidationErrors()` — retourne les erreurs Zod par champ
- `workLabel()` / `energySpendLabel()` — labels affichage

---

### 7.3 `simulator-estimate.ts` — Moteur d'estimation

Contient la logique de calcul des économies d'énergie estimées.

**Type de retour `SavingsEstimate` :**
```typescript
{
  potential: string;               // "Potentiel modéré", "Potentiel important à confirmer"…
  percentRange: [number, number];  // ex: [18, 35] → "18 à 35 %"
  annualEuroRange?: [number, number]; // ex: [360, 700] → "360 à 700 €/an"
  scenarioTitle: string;           // Titre du scénario personnalisé
  scenarioBody: string;            // Description narrative du scénario
  benefits: string[];              // Liste des bénéfices attendus
  uncertainties: string[];         // Facteurs d'incertitude (avertissements)
  assumptionVersion: string;       // "v1-prudente-2026-08"
}
```

**Logique de calcul (`estimateSavings`) :**

Fourchettes de base (% d'économies) ajustées par règles :

| Scénario | Fourchette basse | Fourchette haute |
|---|---|---|
| Rénovation globale | 25 % | 45 % |
| Chauffage + isolation (≥2 travaux) | 18 % | 35 % |
| Chauffage seul ou isolation seule | 12 % | 24 % |
| Fenêtres / ventilation seules | 4 % | 10 % |
| Inconnu | 5 % | 15 % |

**Bonus/malus :**
- +2 à +3 points si remplacement fioul ou gaz (fort gain attendu)
- -1 à -2 points si appartement (enveloppe partagée, gains moindres)
- Ajustements mineurs selon la surface

**Calcul en euros/an :** basé sur la fourchette de dépenses mensuelles saisie × 12 × % estimé.

**Données de référence mensuelles :**
- < 100 € → référence 75 €/mois
- 100–150 € → 125 €/mois
- 150–250 € → 200 €/mois
- > 250 € → 300 €/mois

> Ces hypothèses sont qualifiées de "prudentes" et non contractuelles (version `v1-prudente-2026-08`).

---

### 7.4 `simulator-estimate.test.ts` — Tests unitaires

Fichier de tests pour le moteur d'estimation. Valide les cas principaux : rénovation globale, PAC + isolation, cas dégénérés.

---

### 7.5 `utils.ts`

```typescript
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs) { return twMerge(clsx(inputs)); }
```

Standard shadcn/ui utility pour combiner les classes Tailwind.

---

### 7.6 `error-capture.ts` / `error-page.ts`

Gestion des erreurs SSR. `error-capture.ts` capture les erreurs non gérées dans le contexte serveur. `error-page.ts` génère une page HTML 500 simple à renvoyer au navigateur en cas d'erreur catastrophique.

---

## 8. Configuration SEO

Chaque route déclare ses propres métadonnées via la fonction `head()` de TanStack Start :

```typescript
export const Route = createFileRoute("/ma-page")({
  head: () => ({
    meta: [
      { title: "Titre | Enervia Renov" },
      { name: "description", content: "..." },
      { property: "og:title", content: "..." },
      { property: "og:description", content: "..." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/ma-page" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({ /* schema.org */ }),
      },
    ],
  }),
});
```

**Schémas JSON-LD utilisés :**
- `Organization` + `LocalBusiness` (accueil)
- `WebApplication` (simulateur)
- `WebPage` / `FAQPage` (pages de contenu)
- `Service` (pages de travaux)
- `BreadcrumbList` (navigation)

**`public/robots.txt`** : présent, contrôle l'accès des crawlers.

**`public/llms.txt`** : fichier d'instructions pour les LLM (nouveau standard, explique le contexte du site aux IA qui le consultent).

---

## 9. Déploiement

### Vercel

Le projet est configuré pour Vercel via `.vercel/repo.json`. Le build Nitro génère un `.output/` avec :
- `server/` : workers Cloudflare (runtime edge)
- `public/` : assets statiques

**Commandes :**
```bash
npm run dev       # Serveur de développement local
npm run build     # Build production
npm run preview   # Prévisualisation locale du build
```

### Variables d'environnement à configurer sur Vercel

```
GMAIL_USER=              # Adresse Gmail expéditrice
GMAIL_APP_PASSWORD=      # App Password Google à 16 caractères
LEAD_RECIPIENT_EMAIL=    # E-mail de réception des leads
```

---

## 10. Charte graphique

Définie dans `docs/charte-typographique-enervia.html`.

**Palette de couleurs principale :**
- Fond sable/beige : `#f2efe7` (fond général des sections)
- Fond sable foncé : `#e7ebe3`
- Vert foncé (textes) : `#17221c`
- Vert moyen : `#45554b`, `#617067`
- Orange/cuivre (accentuation) : `#9a6034`, `#b9783e`, `#a45f2d`
- Orange clair (CTA) : `#d9a66e`
- Noir profond (header) : `#111814`

**Typographie :**
- Titres : `font-display` (serif élégant — probablement DM Serif Display)
- Corps : `DM Sans` (sans-serif lisible)
- Style général : premium, sobre, inspiré des agences de rénovation haut de gamme

---

## 11. Ce qui reste à faire

### 🔴 Prioritaire — Fonctionnel manquant

1. **Intégration Google Maps / Places API**
   - Autocomplétion d'adresse dans le formulaire de contact et/ou le simulateur
   - Validation du code postal via l'API Google
   - Carte de localisation sur la page contact

2. **Configuration des variables d'environnement Gmail sur Vercel**
   - `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `LEAD_RECIPIENT_EMAIL` à saisir dans le dashboard Vercel
   - Tester l'envoi e-mail en production

### 🟡 Important — Contenu et qualité

3. **Photos réelles** (assets)
   - Remplacer l'image `hero-renovation.jpg` placeholder par des photos du chantier/équipe
   - Photos pour les pages de travaux (PAC installée, isolation en cours…)

4. **Témoignages clients réels**
   - Ajouter des avis authentiques avec noms/villes sur la home et pages services

5. **Contenu textuel à finaliser**
   - Vérifier les coordonnées exactes dans `site-identity.ts` (adresse, téléphone, e-mail)
   - Ajuster les mentions légales (numéro SIRET, adresse exacte du siège)
   - Politique de confidentialité : vérifier les durées de conservation et contacts DPO

6. **Certifications et labels**
   - Ajouter le badge RGE (Reconnu Garant de l'Environnement) si applicable
   - Logos partenaires / labels qualité

### 🟢 Améliorations futures

7. **Analytics**
   - Intégrer Google Analytics 4 ou Plausible (respect RGPD)
   - Tracking des conversions formulaire

8. **CRM / Intégration leads**
   - Envoyer les leads vers un CRM (HubSpot, Brevo, Pipedrive…) en plus de l'e-mail
   - Ou vers une feuille Google Sheets via Google Sheets API

9. **Chatbot ou widget de prise de rendez-vous**
   - Calendly ou Cal.com pour la prise de RDV directe

10. **Blog / actualités**
    - Section articles pour le SEO longue traîne (nouvelles aides, guides travaux…)

11. **Optimisation images**
    - Les schémas techniques (PNG > 1 MB) devraient être convertis en WebP ou SVG optimisé
    - Lazy loading et tailles responsives

12. **Tests end-to-end**
    - Playwright ou Cypress pour tester le parcours simulateur et le formulaire de contact

---

## 12. Comment contribuer / développer

```bash
# Installer les dépendances
npm install

# Démarrer en développement
npm run dev
# → http://localhost:3000

# Linter
npm run lint

# Formatter
npm run format

# Build production
npm run build

# Prévisualiser le build
npm run preview
```

**Ajouter une nouvelle page :**
1. Créer `src/routes/ma-nouvelle-page.tsx`
2. Le router TanStack regénère automatiquement `src/routeTree.gen.ts` au prochain `npm run dev`
3. Ajouter le lien dans `src/components/site/Layout.tsx`

**Modifier l'identité de marque :** uniquement dans `src/lib/site-identity.ts`

**Modifier le moteur du simulateur :** uniquement dans `src/lib/simulator-estimate.ts` (puis mettre à jour les tests)

---

*Documentation générée le 13 août 2026.*
