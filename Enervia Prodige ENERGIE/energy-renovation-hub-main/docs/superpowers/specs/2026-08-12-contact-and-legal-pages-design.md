# Pages Contact et légales — spécification de conception

Date : 12 août 2026

## Objectif

Compléter la V1 du site ENERVIA RENOV avec trois pages cohérentes avec l’ensemble de l’expérience existante : Contact, Mentions légales et Politique de confidentialité. Le projet client ne dispose pas encore de ses coordonnées ni de son identité juridique définitive. La V1 doit donc rester transparente, ne rien inventer et permettre une finalisation rapide lorsque ces informations seront disponibles.

## Périmètre

Créer les routes suivantes :

- `/contact`
- `/mentions-legales`
- `/politique-de-confidentialite`

Ajouter des accès discrets et cohérents depuis la navigation pertinente et le pied de page. Le simulateur et l’envoi réel d’e-mails restent hors périmètre de cette étape.

## Cohérence visuelle globale

Les nouvelles pages doivent donner l’impression d’avoir toujours appartenu au site. Elles réutilisent `SiteHeader`, `SiteFooter` et le langage visuel déjà établi : fond anthracite et vert profond, surfaces pierre, accent cuivre, typographie éditoriale, grands espaces, bordures fines, cartes sobres et boutons existants. Les largeurs, rayons, contrastes, états interactifs et ruptures responsive suivent les autres pages du site.

Aucun mini-design-system parallèle ne sera créé. Les adaptations propres aux contenus juridiques se limitent à des composants éditoriaux réutilisables : en-tête de page, sommaire éventuel, sections numérotées, encarts d’information et liste de champs à finaliser.

## Page Contact

La page présente un titre clair, une courte introduction et une carte de contact indiquant que le service en ligne sera bientôt disponible. Elle affiche une prévisualisation professionnelle du futur formulaire avec les champs nom, e-mail, téléphone, type de projet et message.

Le formulaire est volontairement inactif : les contrôles sont désactivés, aucun gestionnaire d’envoi n’est attaché et aucune donnée n’est stockée ou transmise. Le bouton porte un libellé explicite tel que « Envoi bientôt disponible ». Un texte informe le visiteur qu’aucune demande ne peut encore être déposée en ligne.

Le contenu ne montre aucune adresse e-mail, adresse postale ou numéro de téléphone fictif.

## Page Mentions légales

La page suit une structure conforme aux catégories attendues pour un site professionnel français :

- identification de l’éditeur ;
- forme juridique et capital, le cas échéant ;
- siège social ;
- immatriculation et numéro SIREN/SIRET ;
- directeur ou directrice de la publication ;
- moyen de contact ;
- prestataire d’hébergement ;
- propriété intellectuelle ;
- responsabilité et liens externes.

Les données indisponibles sont regroupées dans un encart clairement intitulé « Informations à compléter avant publication ». Elles ne sont pas remplacées par des exemples susceptibles d’être confondus avec des renseignements réels. La page porte la mention « Version préparatoire » tant que ces données manquent.

## Page Politique de confidentialité

La politique explique l’état réel de la V1 : le formulaire Contact est inactif et le simulateur ne transmet actuellement aucune demande à un serveur ou à un service d’e-mail. Elle décrit les catégories de données visibles dans les interfaces sans prétendre qu’elles sont déjà collectées.

Elle comporte les sections suivantes :

- responsable du traitement à compléter ;
- données concernées lors de la future activation ;
- finalités prévues ;
- base légale à confirmer avant activation ;
- destinataires et sous-traitants à compléter ;
- durée de conservation à définir ;
- sécurité et hébergement ;
- droits d’accès, rectification, effacement, limitation et opposition ;
- droit de réclamation auprès de la CNIL ;
- contact d’exercice des droits à compléter ;
- date de mise à jour.

Une mention de premier niveau est placée près du formulaire inactif et renvoie vers cette politique. Avant toute activation d’un formulaire, la politique devra être mise à jour avec le responsable, la base légale, la durée, les destinataires et le canal d’exercice des droits.

## Configuration centralisée

Les informations variables sont regroupées dans un module dédié afin d’éviter les divergences entre le footer et les pages : nom commercial, raison sociale, forme juridique, capital, adresse, SIREN/SIRET, responsable de publication, coordonnées, hébergeur, responsable du traitement, délai de conservation et date de mise à jour.

Les valeurs inconnues utilisent un état explicite dans le code plutôt que de fausses chaînes juridiques. Les composants rendent alors un libellé uniforme « À compléter avant publication ».

## Navigation et métadonnées

Chaque route possède un titre et une description en français, sobres et exacts. Le footer contient les trois liens. Le header conserve sa hiérarchie commerciale actuelle ; seul un accès Contact peut y être ajouté si cela reste cohérent avec la navigation existante. Les liens fonctionnent avec le routeur interne et ne provoquent pas de rechargement complet.

## Accessibilité et responsive

Les titres suivent une hiérarchie logique, les champs désactivés restent associés à leurs libellés et l’état indisponible n’est pas communiqué uniquement par la couleur. Les contrastes, focus, tailles tactiles et retours à la ligne sont vérifiés sur ordinateur et mobile. La mise en page juridique demeure lisible sans colonnes trop étroites.

## Validation

La réalisation sera validée par :

- formatage Prettier des fichiers concernés ;
- ESLint ciblé ;
- build de production ;
- navigation vers les trois routes et vérification des liens ;
- contrôle qu’aucune soumission réseau n’est possible depuis le formulaire ;
- captures et inspection visuelle sur ordinateur et mobile ;
- vérification de l’absence de coordonnées ou d’identifiants inventés.

## Conditions de publication finale

La version commerciale ne pourra être considérée comme juridiquement finalisée qu’après réception et validation par le client de son identité légale, de ses coordonnées, de son hébergeur, de son responsable de traitement, de son canal d’exercice des droits et de ses choix de conservation. La connexion du simulateur et du formulaire fera l’objet d’une étape séparée avec validation serveur, secrets côté serveur et protection anti-spam.
