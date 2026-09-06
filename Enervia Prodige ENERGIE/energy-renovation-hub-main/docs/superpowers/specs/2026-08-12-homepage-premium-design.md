# Refonte de la page d’accueil — Design V1

## Objectif

Transformer la page d’accueil de Rénov Premium en vitrine professionnelle d’une entreprise de rénovation énergétique haut de gamme. La page doit d’abord inspirer le sérieux et la maîtrise du bâtiment, puis orienter clairement vers le simulateur, avec une finition visuelle premium.

## Positionnement

- Priorité 1 : expertise institutionnelle et méthode structurée.
- Priorité 2 : conversion vers le simulateur d’aides.
- Priorité 3 : perception premium.
- Ton : clair, fiable, posé et concret.
- Aucun chiffre, avis, label, partenaire ou certification non vérifié.

## Direction visuelle

L’identité s’inspire des entreprises du bâtiment et cabinets d’architecture haut de gamme : photo immobilière immersive, anthracite profond, pierre claire, vert très sombre et accent bronze/cuivre. La photo existante de la maison et de la pompe à chaleur reste le visuel principal.

La typographie doit être plus architecturale et éditoriale que l’actuelle. Les titres utilisent une police de caractère distinctive, tandis que le corps reste très lisible. Les ombres sont rares, les bordures fines et les rayons contenus. Les animations sont sobres et respectent `prefers-reduced-motion`.

## Structure de la page

### 1. En-tête

- Logo Rénov Premium clairement identifiable.
- Navigation : Solutions, Aides 2026, Notre méthode.
- Numéro de téléphone conservé uniquement comme emplacement V1 tant qu’il n’est pas réel.
- Bouton principal : « Estimer mon projet ».
- Menu mobile accessible.

### 2. Hero

- Photo existante en grand format, avec composition asymétrique.
- Titre : « Rénovez votre maison. Améliorez durablement votre confort. »
- Texte : accompagnement du projet, estimation des aides et orientation vers des professionnels qualifiés.
- CTA principal : « Estimer mes aides ».
- CTA secondaire : « Découvrir notre méthode ».
- Encadré sobre précisant : estimation gratuite, sans engagement, coordonnées demandées à la fin.

### 3. Domaines d’expertise

Trois grandes cartes : chauffage, isolation et rénovation globale. Chaque carte présente les prestations existantes, une icône cohérente et un lien vers la page dédiée. L’ensemble privilégie de grandes surfaces, une hiérarchie claire et des interactions discrètes.

### 4. Méthode d’accompagnement

Présenter le parcours en trois étapes : évaluer le projet, préparer la réalisation, suivre les travaux et démarches. Le texte ne doit pas affirmer que Rénov Premium réalise une mission ou détient une certification qui n’a pas été confirmée.

### 5. Simulateur

Conserver le simulateur existant et sa logique. Le placer dans une section visuellement forte, avec un contexte rassurant et une progression immédiatement compréhensible. Les coordonnées restent demandées en dernière étape.

### 6. Engagements et prévention

Remplacer les faux indicateurs de performance par des engagements vérifiables : démarche sans engagement, données limitées à l’étude du projet et rappel de vigilance contre les offres frauduleuses. La mention sur l’isolation à 1 euro reste présente, avec un ton informatif.

### 7. Pied de page

Clarifier les expertises, les liens de navigation et la politique de contact. Ne pas présenter le code NAF ou d’autres informations légales comme validées tant qu’elles ne le sont pas.

## Responsive et accessibilité

- Mobile d’abord, sans débordement horizontal.
- Hero et CTA lisibles dès 320 px.
- Contrastes conformes à WCAG AA.
- Navigation utilisable au clavier et menu mobile correctement nommé.
- Images décoratives masquées aux technologies d’assistance ; images informatives avec texte alternatif.
- Zones interactives d’au moins 44 px.
- Respect de la réduction des animations.

## Architecture et périmètre technique

- Réutiliser TanStack Router, React, Tailwind CSS et Lucide déjà installés.
- Modifier principalement `src/routes/index.tsx`, `src/components/site/Layout.tsx` et `src/styles.css`.
- Extraire de petits composants de page uniquement si cela améliore réellement la lisibilité.
- Conserver les routes existantes et le fonctionnement du simulateur.
- Ne pas ajouter de dépendance sans nécessité.

## Vérification

- Exécuter le lint et le build de production.
- Vérifier la page aux largeurs mobile et desktop.
- Contrôler la navigation, les ancres, les liens et le simulateur.
- Vérifier l’absence d’affirmations commerciales non justifiées.
- Vérifier la lisibilité, les états de focus et `prefers-reduced-motion`.

## Hors périmètre V1

- Témoignages ou notes clients.
- Logos de certifications ou de partenaires.
- Statistiques de chantiers ou montants d’aides garantis.
- Galerie de réalisations réelles.
- Connexion à un CRM ou envoi réel de prospects.
