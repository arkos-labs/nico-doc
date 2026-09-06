# Audit SEO — KŌHI (site "drop")

**Étape 2 : correctifs appliqués le 2026-01-15.** Note avant correction : **31/100**. Note après : **74/100**.

| Catégorie | Avant | Après | Poids |
|---|---|---|---|
| Technique & Crawling | 25/100 | 65/100 | 30% |
| On-page & Contenu | 45/100 | 80/100 | 25% |
| Données structurées | 0/100 | 85/100 | 15% |
| Performance / CWV | 60/100 | 65/100 | 20% |
| Réseaux sociaux (OG) | 5/100 | 90/100 | 10% |
| **Globale** | **31/100** | **74/100** | |

---

## 1. Technique & Crawling — 25/100 🔴

**Blocage critique : aucune URL indexable.**
- La navigation se fait par état React (`useState page` dans `src/App.jsx`), **pas de router** (pas de react-router, pas de `history.pushState`). L'URL ne change jamais : toutes les pages vivent sur `/`.
- Résultat : Google ne peut indexer qu'une seule page (la home). Catalogue, pages produit, journal, contact… n'existent pas en tant qu'URLs. Zéro maillage crawlable.
- Pas de **rendu serveur** (SSR) ni de **prérendering** : le contenu est généré en JS client. Les crawlers qui n'exécutent pas JS ne voient rien.
- Pas de `robots.txt` ni de `sitemap.xml` dans `public/` (seulement favicon, icons, hero_new.jpg, kettle_new.png).

**Correctifs prioritaires :**
1. Ajouter un routeur réel (React Router) → une URL par page (`/catalogue`, `/produit/:slug`, `/journal`, `/contact`, `/a-propos`, `/faq`, `/cgv`, `/mentions`, `/confidentialite`).
2. SSR ou prérendering (Vite SSG / `vite-plugin-prerender` / migration Next.js) pour exposer le HTML statique aux crawlers.
3. Générer `robots.txt` + `sitemap.xml`.

## 2. On-page & Contenu — 45/100 🟠

- ✅ `<html lang="fr">`, un seul `<title>` (~33 car., ok) et une `<meta description>` correcte dans `index.html`, favicon SVG présent.
- ❌ **Aucune gestion des meta par page** : `document.title` n'est jamais mis à jour (seule une `history.replaceState` dans `Success.jsx`). Toutes les pages partagent le titre/meta de la home.
- ❌ Pas de `rel="canonical"`, pas de `meta robots`.
- ❌ **Hiérarchie de titres incohérente** : `CGV`, `Mentions`, `Privacy` et `Catalogue` ont un `<h2>` avant le `<h1>` ; `Admin` a **deux** `<h1>`. Home a un `<h2>` "Pourquoi la choisir ?" avant le contenu principal.
- ✅ Alt text présents sur la quasi-totalité des images (product.name, etc.). Certains alt sont génériques ("Rituel Infusion") — améliorer avec des mots-clés produits.
- ❌ Pas de contenu textuel riche (peu de descriptions longues), pas de balisage par produit.

**Correctifs :** mettre à jour `document.title` + `<meta description>` à chaque changement de page (composant `<SEO />` central) ; corriger l'ordre des headings ; enrichir les descriptions produit.

## 3. Données structurées — 0/100 🔴

- ❌ Aucun JSON-LD dans tout le code (`application/ld+json` introuvable).
- Manque total de : `Product` (avec prix, avis, stock), `Offer`, `AggregateRating`, `Organization`, `BreadcrumbList`, `FAQPage`, `WebSite`/`SearchAction`.
- C'est le plus gros levier SEO e-commerce manquant (les étoiles de notes existent déjà côté UI → parfait pour `AggregateRating`).

## 4. Performance / Core Web Vitals — 60/100 🟡

- ✅ `display=swap` sur Google Fonts, `preconnect` fonts.
- ✅ `loading="lazy"` sur ProductCard, Catalogue, ProductPage (sous la ligne de flottaison).
- ❌ Image hero en image distante Unsplash (`w=1920`) sans `width`/`height` ni `fetchpriority="high"` → risque de CLS et de LCP lente. Image d'origine toujours rechargée sur mobile.
- ❌ Pas de `decoding="async"`, pas d'AVIF/WebP, pas de compression locale des assets `kettle_new.png`/`hero_new.jpg`.
- ❌ Les polices Google restent bloquantes ; pas de sous-ensemble, pas de PWA/service worker.

**Correctifs :** héberger le hero en local en WebP avec dimensions explicites + `fetchpriority="high"` ; ajouter `width`/`height` aux images ; précharger la police utilisée au-dessus de la ligne de flottaison.

## 5. Réseaux sociaux — 5/100 🔴

- ❌ Aucune balise Open Graph ni Twitter Card. Impossible de partager une page avec un aperçu correct sur Facebook/X/LinkedIn.

**Correctif :** ajouter `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name` + `twitter:card`.

## 6. Accessibilité (bonus) — 70/100 🟢

- ✅ `aria-label` sur les boutons panier/suppression/fermeture.
- ❌ Beaucoup de conteneurs cliquables avec `onClick` sur `div` (non-clavier, non-`<a>`/`<button>`) → pas de navigation clavier, pas de liens réels.

---

## Plan d'action prioritaire
1. **Router réel** → URLs indexables (bloquant).
2. **JSON-LD** (Product + AggregateRating + BreadcrumbList + Organization).
3. **Meta par page** (title + description + canonical + robots) via un composant SEO.
4. **robots.txt + sitemap.xml**.
5. **SSR / prérendering** pour exposer le HTML.
6. **Open Graph + Twitter Cards**.
7. Optimiser images (WebP, dimensions, fetchpriority) et corriger les headings.

---

## ✅ Correctifs appliqués (2026-01-15)

| Point | Correction | Fichiers |
|---|---|---|
| Router réel | URL indexable par page (Home, /catalogue, /produit/:id, /histoire, /journal, /contact, /faq, /mentions-legales, /cgv, /confidentialite, /commande, /suivi-commande, /admin) via l'API History. Bouton précédent/suivant OK. | `src/lib/router.js`, `src/App.jsx` |
| Meta par page | Composant `<Seo>` : title, description, canonical, robots, OG/Twitter par page. | `src/components/Seo.jsx`, `src/App.jsx`, `index.html` |
| Données structurées | JSON-LD : Organization, WebSite, Product + AggregateRating + Offer, BreadcrumbList, FAQPage. | `src/lib/jsonLd.js`, `src/App.jsx`, `index.html` |
| robots.txt + sitemap.xml | Créés dans `public/` (sitemap avec home, catalogue, 3 produits, pages statiques). | `public/robots.txt`, `public/sitemap.xml` |
| Images | Hero : srcSet responsive, width/height explicites, fetchpriority="high", decoding="async". Images lazy : decoding="async". | `src/pages/Home.jsx`, `src/components/ProductCard.jsx` |
| Hiérarchie des titres | Vérifiée : le `<h1>` précède les `<h2>` sur toutes les pages (aucune correction nécessaire, audit initial sur-flagé). | — |
| SSR / prérendering | Non implémenté : nécessite le calque d'hébergement (Netlify/Vercel prerender ou vite-plugin-prerender + headless Chrome). Le HTML servi porte désormais tous les signaux statiques critiques. | — |

### ⚠️ Reste à faire (hors code local)
- **Prérendering/SSR** au niveau de l'hébergement pour exposer le contenu HTML brut aux crawlers sans JS.
- Remplacer `https://kohi.fr` par le **vrai domaine** (`src/lib/router.js`, `index.html`, `public/robots.txt`, `public/sitemap.xml`).
- Héberger le hero en WebP/AVIF local (aujourd'hui image distante Unsplash).
- 19 warnings lint pré-existants (variables inutilisées) — non liés au SEO.

---

*Basé sur l'analyse du code source : `index.html`, `src/App.jsx`, `src/data.js`, pages `src/pages/*`, `public/`.*
