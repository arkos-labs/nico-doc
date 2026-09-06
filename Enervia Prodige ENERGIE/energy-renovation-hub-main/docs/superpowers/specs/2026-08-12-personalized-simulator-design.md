# Simulateur personnalisé — spécification de conception

Date : 12 août 2026

## Objectif

Refondre le simulateur ENERVIA RENOV pour obtenir une expérience claire, premium et crédible, capable de qualifier un projet de rénovation et de présenter un potentiel d’économies prudent avant la demande de coordonnées. Le même moteur doit alimenter une version intégrée à l’accueil et une page `/simulation` destinée aux campagnes publicitaires.

## Principes

- Le simulateur informe et qualifie ; il ne remplace pas une étude énergétique.
- Aucun montant d’aide, gain, classement DPE ou économie n’est garanti.
- Toute fourchette est décrite comme indicative, non contractuelle et dépendante des réponses.
- Les réponses restent dans l’état local du navigateur tant qu’aucun service d’envoi n’est connecté.
- Aucun faux signal social, faux calcul officiel ou message de rareté n’est affiché.
- La version claire validée visuellement reprend la palette pierre, blanc chaud, vert profond et cuivre du site.

## Architecture produit

Le simulateur est composé de trois unités indépendantes :

1. un modèle typé décrivant les réponses et les choix disponibles ;
2. un moteur pur transformant un projet complet en scénario prudent et explicable ;
3. une interface multi-étapes réutilisable sur l’accueil et la route `/simulation`.

La page d’accueil conserve le simulateur dans sa section actuelle. La route `/simulation` place le même parcours au premier plan, avec un header allégé, une introduction courte et aucune distraction commerciale avant le résultat. Les deux surfaces partagent le même état, les mêmes validations, le même calcul et les mêmes composants.

## Parcours

Le parcours comprend dix écrans logiques :

1. code postal du logement ;
2. statut : propriétaire ou locataire ;
3. type : maison individuelle ou appartement ;
4. chauffage actuel : fioul, gaz, électricité ou bois ;
5. surface habitable ;
6. travaux envisagés, avec sélection multiple ;
7. budget énergétique mensuel ;
8. récapitulatif modifiable ;
9. première estimation personnalisée ;
10. coordonnées et demande de détail.

Les travaux proposés sont :

- chauffage ou pompe à chaleur ;
- isolation des combles ou de la toiture ;
- isolation des murs ;
- remplacement des fenêtres ;
- ventilation ;
- rénovation globale ;
- je ne sais pas encore.

« Rénovation globale » et « Je ne sais pas encore » sont exclusifs des autres choix. Sélectionner l’un désélectionne les choix incompatibles ; sélectionner une action précise retire ces choix exclusifs.

Les tranches de budget énergétique mensuel sont : moins de 100 €, de 100 à 150 €, de 150 à 250 €, plus de 250 €, et « Je ne sais pas ».

## Navigation et modification

Les étapes à choix unique avancent automatiquement après sélection lorsque cela reste compréhensible. Les étapes à choix multiple utilisent un bouton Continuer explicite. Les étapes texte et surface valident leurs données avant progression.

Le récapitulatif regroupe localisation, statut, type de bien, surface, chauffage, travaux et tranche de dépense. Chaque groupe dispose d’un bouton Modifier qui renvoie à l’étape correspondante. Le simulateur mémorise que l’utilisateur vient du récapitulatif : après validation de la correction, il revient directement au récapitulatif au lieu de rejouer les étapes suivantes.

Un bouton Recommencer efface uniquement l’état local du simulateur après une confirmation légère et revient au premier écran.

## Modèle d’estimation

La dépense annuelle de référence est dérivée de la tranche mensuelle à l’aide d’une valeur médiane interne. Pour les tranches ouvertes, une valeur prudente documentée est utilisée. Si l’utilisateur choisit « Je ne sais pas », aucune économie en euros n’est affichée ; seul le potentiel qualitatif apparaît.

Le moteur classe d’abord le projet dans un scénario :

- action ciblée : potentiel limité à modéré ;
- isolation ou chauffage structurant : potentiel modéré ;
- plusieurs travaux complémentaires : potentiel modéré à important ;
- rénovation globale : potentiel important à confirmer par une étude ;
- projet indéterminé : potentiel à approfondir.

Le moteur calcule ensuite une plage de réduction prudente à partir de règles internes versionnées. Les coefficients ne sont jamais présentés comme des barèmes officiels. Ils tiennent compte du chauffage actuel, du type de bien, de la surface, des travaux retenus et de leur cohérence. Les actions ne sont pas additionnées directement : un plafonnement évite de cumuler artificiellement leurs effets.

Le résultat monétaire est obtenu en appliquant la plage de réduction à la dépense énergétique annuelle de référence. Les deux bornes sont arrondies de façon lisible. La plage en pourcentage et la plage annuelle en euros sont toujours accompagnées de la mention « estimation indicative, non contractuelle ».

## Résultat personnalisé

Le résultat visible avant les coordonnées comprend :

- un niveau de potentiel en mots ;
- une fourchette indicative de réduction de consommation ;
- une fourchette annuelle en euros lorsque la dépense est connue ;
- un scénario priorisé adapté aux travaux et au chauffage ;
- deux ou trois bénéfices attendus, sans garantie ;
- les facteurs susceptibles de modifier le résultat.

La recommandation privilégie l’enveloppe du bâtiment avant le remplacement du chauffage lorsqu’une isolation et un chauffage sont sélectionnés. La ventilation est signalée comme point de cohérence lorsqu’un projet d’isolation est prévu. Un projet limité aux fenêtres n’est pas présenté comme une rénovation globale.

Les facteurs d’incertitude affichés incluent l’état initial, la météo, les habitudes, les autres usages inclus dans la facture, les choix techniques, la qualité de mise en œuvre et l’évolution des prix de l’énergie.

## Coordonnées et état de la V1

Après le premier résultat, l’utilisateur peut poursuivre vers les coordonnées pour demander un détail complet. Tant que l’envoi sécurisé n’est pas connecté, cet écran reste clairement inactif : les champs et le bouton sont désactivés, aucune validation de lead n’entraîne un envoi, et un message explique que le service sera bientôt disponible.

La politique de confidentialité doit continuer d’indiquer qu’aucune donnée n’est transmise. Elle devra être actualisée au moment de la connexion réelle du formulaire.

## Direction visuelle

Le simulateur utilise une grande surface blanc chaud sur fond pierre. Sur ordinateur, une colonne latérale claire présente la progression et une zone principale affiche l’étape. Sur mobile, la progression devient une ligne compacte avec numéro d’étape, libellé et jauge.

Les cartes utilisent des bordures fines, peu ou pas d’arrondi, des ombres discrètes et des états sélectionnés au cuivre. Les titres emploient la typographie éditoriale du site ; le corps conserve une sans-serif très lisible. Le vert profond structure les titres et les encarts de recommandation, sans grande masse sombre. Les boutons principaux sont cuivre ; les actions secondaires restent textuelles ou bordées.

Le récapitulatif utilise des lignes sobres avec icône, valeur et action Modifier. Le résultat utilise deux cartes : une recommandation vert sauge très clair et une carte d’estimation blanc cassé avec hypothèses visibles.

## Page publicitaire `/simulation`

La page dédiée possède des métadonnées propres et un message d’introduction direct. Le simulateur est visible immédiatement après une courte promesse prudente. Le header conserve l’identité ENERVIA RENOV et un retour à l’accueil, mais retire les menus susceptibles d’interrompre le parcours. Le footer garde les liens légaux.

Aucune référence à une campagne, aucune source publicitaire et aucun paramètre de suivi n’est stocké dans cette V1. L’instrumentation publicitaire sera une étape distincte, soumise aux choix de consentement et de confidentialité.

## Gestion des erreurs

- Un code postal doit contenir cinq chiffres.
- La surface doit rester dans la plage admise par le simulateur.
- Au moins un choix de travaux est requis.
- Une tranche de dépense doit être sélectionnée, y compris « Je ne sais pas ».
- Les erreurs apparaissent près du champ et sont annoncées de façon accessible.
- Un projet incomplet ne peut pas accéder au récapitulatif ni au calcul.
- Le moteur retourne un résultat qualitatif valide même sans montant de dépense.

## Validation

La réalisation doit vérifier :

- chaque règle de calcul sur des cas représentatifs et aux limites ;
- les exclusions entre rénovation globale, indécision et travaux précis ;
- l’accès au récapitulatif seulement avec un projet complet ;
- le retour direct au récapitulatif après modification ;
- la cohérence entre résultat qualitatif, pourcentage et montant annuel ;
- l’absence de montant lorsque la dépense est inconnue ;
- l’absence de requête réseau, de stockage persistant et de faux signal social ;
- la version accueil et la route `/simulation` ;
- la navigation clavier, les libellés et les messages d’erreur ;
- l’affichage ordinateur et mobile sans débordement ;
- Prettier, ESLint et le build de production.

## Hors périmètre

- envoi d’e-mails ou stockage des leads ;
- calcul officiel des aides ;
- audit énergétique, DPE ou dimensionnement technique ;
- suivi publicitaire et analytique ;
- promesse contractuelle d’économie ;
- connexion à un CRM.
