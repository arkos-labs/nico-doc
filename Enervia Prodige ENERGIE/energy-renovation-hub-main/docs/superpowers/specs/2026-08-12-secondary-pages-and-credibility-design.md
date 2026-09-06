# Pages secondaires, crédibilité et métadonnées — Design

## Objectif

Aligner les pages Chauffage, Isolation et Aides 2026 sur l’identité premium de la page d’accueil, tout en supprimant les affirmations non vérifiées et en corrigeant la langue et les métadonnées globales.

## Assainissement des affirmations

- Supprimer le composant de certifications non vérifiées de toutes les pages visibles.
- Ne plus présenter RGE, Qualibat, QualiPac ou France Rénov’ comme certifications, partenaires ou garanties de Rénov Premium.
- Les termes réglementaires peuvent rester lorsqu’ils décrivent une condition générale d’un dispositif, avec une formulation informative et non commerciale.
- Supprimer les promesses de couverture d’artisans, les montants garantis et les formulations affirmant une prise en charge certaine.
- Présenter le simulateur comme une première estimation indicative, sans garantie d’éligibilité ni de montant.

## Base française et métadonnées

- Passer l’attribut racine de `lang="en"` à `lang="fr"`.
- Traduire intégralement les pages 404 et erreur.
- Réécrire la description globale sans affirmation RGE.
- Supprimer le chargement Google Fonts Montserrat/Inter devenu inutile.
- Conserver les titres et descriptions propres à chaque route, avec des formulations informatives.
- Ajouter une image Open Graph globale à partir du visuel hero existant si le système de build permet une URL publique fiable ; sinon ne pas inventer d’URL absolue.

## Modèle partagé des pages secondaires

`SiloPage` devient un modèle éditorial cohérent avec l’accueil. Il conserve une API déclarative pour éviter trois pages dupliquées.

### Hero

- Fond vert anthracite, accent cuivre et grande typographie éditoriale.
- Eyebrow, titre et introduction propres à chaque sujet.
- Panneau latéral « À retenir » avec trois points informatifs fournis par la route.
- CTA interne vers le contenu et CTA vers le simulateur.

### Sommaire

- Navigation interne générée depuis les sections.
- Ancres stables, lisibles et utilisables au clavier.

### Contenu

- Sections numérotées sur fond pierre clair.
- Alternance maîtrisée de texte, listes et encadrés informatifs.
- Bordures fines, absence de cartes génériques arrondies.
- Même échelle typographique, mêmes espacements et mêmes couleurs que l’accueil.

### FAQ

- FAQ courte générée depuis les données de chaque route.
- Utilisation de `details`/`summary` natifs pour l’accessibilité et l’absence de dépendance.
- Réponses prudentes, sans garantie de prix, d’aide ou d’éligibilité.

### CTA final

- Bloc sombre reprenant le style de l’accueil.
- Présentation du simulateur comme estimation indicative.
- Lien vers `/#simulateur`.

## Contenu des trois pages

### Chauffage

Comparer pompe à chaleur air/eau, air/air et géothermie, puis expliquer le dimensionnement, les contraintes et les fourchettes de prix à titre indicatif.

### Isolation

Présenter les combles, murs et planchers, expliquer l’ordre logique des travaux, les performances thermiques et les points de vigilance.

### Aides 2026

Présenter MaPrimeRénov’, CEE et éco-PTZ comme dispositifs à vérifier selon la situation. Éviter tout barème ou montant non sourcé dans l’interface.

## Responsive et accessibilité

- Mise en page cohérente de 320 px au desktop.
- Sommaire et hero empilés sur mobile.
- Contrastes WCAG AA, focus visible et zones tactiles suffisantes.
- Hiérarchie `h1`/`h2`/`h3` logique.
- Respect de `prefers-reduced-motion` déjà configuré.

## Architecture

- Modifier `src/components/site/SiloPage.tsx` pour le modèle partagé.
- Modifier les trois routes pour fournir les nouvelles données éditoriales.
- Modifier `src/routes/__root.tsx` pour la langue, les erreurs et les métadonnées.
- Modifier `src/components/site/Simulator.tsx` pour retirer les affirmations de couverture/certification et préciser le caractère indicatif.
- Retirer l’utilisation de `TrustBar`; supprimer le fichier uniquement s’il n’a plus aucun consommateur.
- Ne pas ajouter de dépendance.

## Vérification

- Rechercher toutes les occurrences de RGE, Qualibat, QualiPac, France Rénov’ et formulations garanties.
- Vérifier les trois pages en desktop et mobile.
- Vérifier les ancres, FAQ et CTA.
- Exécuter Prettier, lint ciblé et build de production.
