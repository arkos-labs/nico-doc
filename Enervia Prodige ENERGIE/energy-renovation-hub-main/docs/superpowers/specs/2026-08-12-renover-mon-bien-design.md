# Section « Rénover mon bien » — Design

## Objectif

Ajouter un accès professionnel et visible vers deux parcours externes de rénovation, depuis la page d’accueil et la navigation principale.

## Navigation

Le header desktop reçoit une entrée « Rénover mon bien » avec un menu déroulant accessible. Il contient :

- « Rénovation d’immeuble » vers `https://lhenergies.fr/lhenergiesServices/Renover_mon_immeuble/Coproprietes` ;
- « Rénovation de maison individuelle » vers `https://lhenergies.fr/lhenergiesServices/Renover_mon_immeuble/Monoproprietaire_d_immeuble`.

Le menu s’ouvre au clic et reste utilisable au clavier. Il expose son état avec `aria-expanded`. Sur mobile, les deux liens sont affichés sous un libellé « Rénover mon bien » dans le panneau de navigation.

Tous les liens externes s’ouvrent dans l’onglet courant. Aucun attribut `target="_blank"` n’est utilisé.

## Section d’accueil

La section est placée entre « Nos expertises » et « Notre méthode ». Elle reprend l’identité architecturale validée avec un fond sombre et deux grandes cartes numérotées :

1. Rénovation d’immeuble — destinée aux projets de copropriété et aux bâtiments collectifs.
2. Rénovation de maison individuelle — destinée aux propriétaires souhaitant rénover une maison.

Chaque carte contient un titre, une description courte et une action explicite avec une icône de lien externe. Les cartes sont côte à côte sur desktop et empilées sur mobile.

## Contraintes

- Ne pas dupliquer les URLs ailleurs dans le code : déclarer une source de données unique réutilisable par le header et, si une extraction partagée est raisonnable, par la page d’accueil.
- Conserver le style premium existant et les contrastes WCAG AA.
- Conserver les routes et le simulateur existants.
- Ne pas ajouter de dépendance.

## Vérification

- Vérifier l’ouverture et la fermeture du menu au clic.
- Vérifier les URLs des deux liens dans le header desktop, le menu mobile et la section, sans déclencher de navigation pendant les contrôles.
- Vérifier le parcours clavier, les noms accessibles et l’absence de `target="_blank"`.
- Vérifier les mises en page desktop et mobile.
- Exécuter le lint ciblé et le build de production.
