# Réseaux de chauffage collectifs — Spécification de conception

## Objectif

Compléter la page « Chauffage performant » avec une offre destinée aux bâtiments résidentiels collectifs et tertiaires équipés d'un chauffage collectif. Le contenu doit présenter clairement les interventions possibles, sans promesse de résultat ni économie chiffrée non vérifiée.

## Approches étudiées

1. **Ajouter une section distincte à la page chauffage existante — retenue.** Cette solution rend immédiatement l'offre visible, conserve la navigation actuelle et limite la complexité de la V1.
2. Créer une nouvelle page dédiée. Cette approche offrirait plus de place pour le référencement et les détails techniques, mais elle serait prématurée tant que l'offre commerciale et les informations du client ne sont pas finalisées.
3. Ajouter uniquement une carte ou une mention courte. Cette solution serait rapide, mais insuffisante pour expliquer les trois interventions et leurs publics.

## Emplacement et hiérarchie

La section sera ajoutée dans `src/routes/pompe-a-chaleur.tsx`, après les contenus consacrés aux solutions de production de chaleur et avant la partie « Dimensionnement et budget ».

Elle portera le titre **« Réseaux de chauffage collectifs »**. Une introduction indiquera explicitement qu'elle concerne :

- les bâtiments résidentiels collectifs ;
- les bâtiments tertiaires ;
- les installations alimentées par un chauffage collectif et un réseau hydraulique.

## Contenu

La section présentera trois interventions complémentaires :

### Désembouage du circuit de chauffage

Nettoyage du réseau pour retirer les boues et dépôts susceptibles de gêner la circulation de l'eau. Le texte restera descriptif et n'affirmera pas qu'une intervention est systématiquement nécessaire.

### Équilibrage hydraulique du réseau

Réglage de la distribution des débits entre les différentes branches, zones ou émetteurs du bâtiment afin de rechercher une diffusion plus homogène du chauffage.

### Régulation et pilotage du chauffage

Adaptation du fonctionnement de l'installation aux usages, aux horaires et aux zones du bâtiment, après examen des équipements existants et de leur compatibilité.

## Présentation visuelle

Le bloc réutilisera le composant et les styles déjà employés par `SiloPage`. Il conservera la palette claire, la typographie, les espacements et le niveau de contraste des autres pages. Aucun nouveau système graphique ne sera introduit.

Les trois interventions seront affichées comme une liste structurée au sein d'une même section afin d'éviter les répétitions. Un encadré précisera qu'un diagnostic de l'installation existante est nécessaire avant de recommander une intervention.

## Rédaction et limites

- Employer les termes techniques exacts : « désembouage », « équilibrage hydraulique » et « régulation ».
- Ne pas annoncer de pourcentage d'économie, de gain de performance garanti, de certification ou d'éligibilité à une aide.
- Ne pas limiter le texte aux copropriétés : le tertiaire doit être cité au même niveau que le résidentiel collectif.
- Ne pas présenter ces opérations comme automatiquement adaptées à toutes les installations.

## Vérification

- Vérifier que la nouvelle section apparaît dans le bon ordre sur ordinateur et mobile.
- Vérifier que le contenu ne crée pas de débordement et reste lisible dans le composant existant.
- Exécuter les contrôles TypeScript, les tests existants et la construction de production.
- Relire les accents, les accords et la terminologie française.

## Hors périmètre

- Création d'une nouvelle route consacrée au chauffage collectif.
- Formulaire de demande spécifique à cette prestation.
- Tarifs, économies estimées, aides financières ou garanties de performance.
- Modification de la navigation principale ou de la page d'accueil.
