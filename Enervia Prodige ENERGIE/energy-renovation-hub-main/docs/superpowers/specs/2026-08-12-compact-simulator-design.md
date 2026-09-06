# Simulateur compact en cinq étapes — spécification

Date : 12 août 2026

## Objectif

Réduire fortement la longueur perçue du simulateur ENERVIA RENOV sans supprimer les informations nécessaires à son estimation prudente. Le parcours passe de dix écrans visibles à cinq étapes regroupées et supprime entièrement la colonne latérale listant toutes les étapes.

## Parcours

### Étape 1 — Mon logement

Regroupe le code postal, le statut propriétaire ou locataire et le type de bien. Le code postal est saisi dans un champ compact. Les deux groupes de choix utilisent des boutons courts sur une ou deux lignes. Le bouton Continuer valide l’ensemble de l’écran.

### Étape 2 — État actuel

Regroupe le chauffage principal et la surface habitable. Le chauffage utilise quatre boutons compacts. La surface utilise un curseur accompagné de sa valeur numérique. Le bouton Continuer valide l’écran.

### Étape 3 — Mon projet

Regroupe les travaux envisagés et la tranche de budget énergétique. Les travaux restent multisélectionnables avec les exclusions existantes pour Rénovation globale et Je ne sais pas encore. La dépense énergétique reste obligatoire, y compris le choix Je ne sais pas.

### Étape 4 — Mon estimation

Affiche directement le résultat personnalisé. Un récapitulatif compact et repliable apparaît au-dessus du résultat ; il ne constitue plus une étape indépendante. Ses actions Modifier renvoient vers l’une des trois premières étapes. Après validation de la modification, l’utilisateur revient directement à l’estimation.

La fourchette en pourcentage, l’éventuelle traduction annuelle en euros, la recommandation et les facteurs d’incertitude conservent les règles prudentes actuelles.

### Étape 5 — Recevoir le détail

Conserve les champs désactivés et le message indiquant que l’envoi sécurisé sera disponible plus tard. Aucune donnée n’est transmise ou stockée.

## Navigation

Une barre horizontale unique affiche Étape X sur 5, le nom de l’étape active et une jauge cuivre. Sur ordinateur, cinq libellés courts peuvent apparaître sous la jauge sans liste verticale ni grands marqueurs. Sur mobile, seul le numéro et le libellé actifs sont affichés.

Les boutons Revenir et Continuer restent au bas de la carte, sans barre fixe masquant le contenu. Recommencer reste disponible depuis l’estimation et les coordonnées avec confirmation légère.

## Direction visuelle

Le simulateur devient une seule carte claire, plus basse et plus large. Il conserve le fond blanc chaud, les bordures pierre, le texte vert profond, les surfaces sauge pâle et les actions cuivre. Les choix sont plus denses : icônes réduites, descriptions courtes, espacements resserrés et très peu d’arrondis.

La suppression de la colonne libère la largeur pour les questions et réduit la hauteur totale. Le résultat reste structuré en deux cartes sobres, mais le récapitulatif est replié par défaut afin de montrer immédiatement l’estimation.

## Architecture

Le modèle `simulator-model.ts` et le moteur `simulator-estimate.ts` ne changent pas. Seule l’orchestration de l’interface dans `Simulator.tsx` est remaniée. La version intégrée à l’accueil et la page `/simulation` utilisent toujours le même composant et le même état local.

Les anciens numéros d’écran sont remplacés par cinq étapes de navigation. Les actions Modifier ciblent les nouvelles étapes : logement, état actuel ou projet.

## Validation

- Les cinq étapes s’affichent dans le bon ordre.
- La liste verticale des dix étapes n’existe plus.
- Les validations empêchent de quitter un écran incomplet.
- Les exclusions de travaux restent fonctionnelles.
- Le récapitulatif compact contient toutes les réponses.
- Une modification revient directement à l’estimation.
- Le résultat reste visible avant les coordonnées.
- Aucun envoi réseau ni stockage persistant n’est ajouté.
- Le moteur conserve ses tests actuels.
- La page d’accueil et `/simulation` sont contrôlées sur ordinateur et mobile.
- Le rendu ne présente aucun débordement horizontal.
- Prettier, ESLint et le build de production passent.

## Hors périmètre

- modification des coefficients d’estimation ;
- connexion e-mail ou CRM ;
- ajout de nouvelles questions ;
- suivi publicitaire ;
- calcul d’aides publiques.
