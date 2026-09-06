# Petit formulaire guidé — spécification

Date : 12 août 2026

## Objectif

Conserver l’environnement éditorial actuel des pages tout en réduisant le simulateur à une petite carte centrée. Une seule question principale est visible à la fois. Le scénario personnalisé apparaît uniquement après la saisie de toutes les informations relatives au logement et aux travaux, puis avant les coordonnées.

## Parcours

Le formulaire utilise sept étapes de projet, suivies d’un écran de coordonnées séparé :

1. situation : propriétaire ou locataire ;
2. logement : code postal et maison ou appartement ;
3. chauffage principal ;
4. surface habitable ;
5. travaux envisagés, avec sélection multiple ;
6. budget énergétique mensuel ;
7. scénario personnalisé et économies potentielles ;
8. coordonnées, désactivées dans la V1.

L’utilisateur ne voit jamais une liste de toutes les étapes. L’en-tête de la carte affiche uniquement `Étape X sur 7` pendant les questions, avec une ligne de progression très fine. Le scénario est présenté comme l’aboutissement du questionnaire et non comme une question supplémentaire.

## Carte du formulaire

La carte est centrée et limitée à une largeur proche de 620 px sur ordinateur. Elle utilise un fond blanc chaud, une bordure pierre fine et un discret trait cuivre supérieur. Sa hauteur s’adapte au contenu sans occuper toute la page.

Chaque écran contient :

- un petit indicateur d’étape ;
- un titre éditorial centré ;
- éventuellement une phrase courte ;
- les contrôles de réponse ;
- une séparation ;
- Précédent à gauche et Continuer à droite.

Les choix simples sont affichés sous forme de deux à quatre petites cartes avec une icône, un titre et une seule courte explication. Les travaux peuvent former une grille plus dense. Le résultat peut exceptionnellement utiliser une carte plus large afin de rester lisible.

## Navigation et modification

Précédent conserve toutes les réponses. Continuer valide seulement l’écran actuel. Les choix uniques ne déclenchent plus automatiquement le passage à l’écran suivant.

Sur le scénario final, un lien discret `Modifier mes réponses` ouvre un récapitulatif compact. Chaque action Modifier renvoie à l’étape concernée ; après validation, l’utilisateur revient directement au scénario.

## Scénario final

Le titre principal est `Voici le scénario qui correspond à votre logement.` Il apparaît seulement lorsque situation, logement, chauffage, surface, travaux et dépense énergétique sont renseignés.

Le scénario conserve :

- le niveau de potentiel ;
- la recommandation personnalisée ;
- la fourchette indicative en pourcentage ;
- la traduction annuelle en euros lorsque possible ;
- les facteurs d’incertitude ;
- la mention non contractuelle.

Le moteur et ses coefficients restent inchangés.

## Intégration

Sur l’accueil et `/simulation`, les titres, textes et arguments autour du formulaire restent présents. Seule la carte interne devient plus petite et centrée. Le même composant continue d’être réutilisé aux deux endroits.

## Données et sécurité

Toutes les réponses restent dans l’état React de la page. Aucun stockage persistant, envoi réseau, formulaire actif ou suivi publicitaire n’est ajouté. Les coordonnées restent désactivées et apparaissent uniquement après le scénario.

## Validation

- La carte respecte la largeur compacte sur ordinateur et mobile.
- Une seule question principale est visible à la fois.
- Aucun sommaire complet des étapes n’apparaît.
- Les validations bloquent un écran incomplet.
- Les travaux exclusifs conservent leur fonctionnement.
- Le scénario n’apparaît qu’après toutes les réponses projet.
- Modifier renvoie au bon écran puis revient au scénario.
- Le moteur conserve ses cinq tests.
- Aucun réseau ou stockage n’est utilisé.
- Prettier, ESLint et le build passent.
- Les captures de l’accueil et de `/simulation` sont contrôlées sur ordinateur et mobile.
