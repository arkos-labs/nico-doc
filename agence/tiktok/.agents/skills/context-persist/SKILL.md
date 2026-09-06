---
version: 0.1.0
name: context-persist
description: |
  Persiste le contexte d'une conversation longue sur disque pour ne jamais oublier
  et économiser le contexte. Détecte automatiquement le projet dont on parle
  (sans que l'utilisateur ait à le préciser ni à annoncer une longue session),
  écrit un résumé vivant, un journal de décisions et des notes dans un dossier
  dédié par projet, recharge l'état en début de session et compacte les échanges
  pour rester concis. Use when: toute conversation susceptible de durer ("on
  continue", "on reprend", "garde en mémoire"), ou dès qu'on change de sujet.
argument-hint: "[sujet ou étape actuelle de la conversation]"
---

# Context Persist — Mémoire longue durée

Truc pour durer **des heures** de conversation sans saturer le contexte ni perdre
le fil. Le principe : écrire sur disque ce qui compte, à chaque étape importante,
et ne garder en mémoire (contexte) que le strict nécessaire.

**L'utilisateur n'a rien à déclarer** : pas besoin qu'il dise "on va parler des
heures" ni qu'il précise le projet. Le skill détecte tout seul de quoi on parle.

---

## 1. Détection automatique du projet

À chaque début de session **et à chaque changement de sujet**, déterminer le
projet en cours :

1. **Contexte d'abord** : regarder le dossier de travail actuel (`pwd`),
   sa structure, les fichiers/dossiers présents (ex. `skills/`, `out/`, un nom
   de dossier parlant).
2. **Sujet ensuite** : le premier message de l'utilisateur parle généralement du
   projet (film, vidéo, site, pub, etc.).
3. **Historique** : si une mémoire existe déjà pour ce projet, la recharger.

Dériver un **nom de projet court et stable** (ex. `tiktok-demo`, `pub-sneakers`,
`film-noir`). **Toute la mémoire de ce projet vit dans un dossier dédié.**

---

## 2. Structure des fichiers (par projet)

Créer (si absent) un dossier de mémoire par projet : `context-mem/<projet>/`.
Exemple : `context-mem/tiktok-demo/`. Chaque projet garde ses fichiers séparés,
donc on peut passer d'un projet à l'autre sans mélanger les états.

| Fichier | Rôle |
|---|---|
| `context-mem/<projet>/etat.md` | Résumé **vivant** et court du projet (objectif, où on en est, prochaines étapes). **Le plus important.** |
| `context-mem/<projet>/journal.md` | Journal chronologique des **décisions** et avancées majeures. |
| `context-mem/<projet>/notes.md` | Détails, données, références, idées — trop lourds pour `etat.md`. |

Le nom du projet est écrit en tête de chaque fichier pour éviter toute confusion.

## Workflow

### Démarrage de session

Dès qu'on active ce skill :

1. **Détecter le projet** (voir section 1).
2. Lire `context-mem/<projet>/etat.md` (s'il existe) et charger mentalement l'état.
3. Lire `journal.md` si besoin de rappel de contexte.
4. Faire un résumé ultra-court au début (1-2 lignes max) : projet détecté + où on en était.

### Pendant la conversation

- **Changement de sujet ?** → redétecter le projet, basculer sur sa mémoire
  (`etat.md` du nouveau projet).
- **Après chaque décision, résultat ou étape franchie** : mettre à jour `etat.md`
  et ajouter une ligne au `journal.md`. Le faire **immédiatement**, pas en lot.
- **Quand une info devient trop grosse pour la mémoire** : la déplacer dans
  `notes.md` et ne garder en tête qu'un pointeur ("voir notes.md → truc X").
- **Déclencheurs de checkpoint** : après ~10 échanges, à chaque changement de
  sujet majeur, et toujours avant une interruption ou fin de session.

### Fin de session / pause

1. Finaliser `etat.md` du projet courant : objectif, progrès, **prochaine étape précise**.
2. Vérifier que `journal.md` contient les décisions clés.
3. Annoncer brièvement que la mémoire est sauvegardée.

### Reprise

1. Relire `etat.md` du projet courant (détection automatique).
2. Annoncer en 1-2 lignes le projet + l'état, demander par quoi reprendre.

---

## Format de `etat.md`

```markdown
# État — <projet>

## Objectif
<une phrase claire>

## Où on en est
<2-4 lignes, état actuel>

## Prochaines étapes
- [ ] <étape suivante>
- [ ] <plus tard>

## En cours
<ce qui est en cours MAINTENANT, sinon "rien">

## Notes / pointeurs
- voir notes.md → <sujet>
```

## Format de `journal.md`

```markdown
## <AAAA-MM-JJ HH:MM>
- **Décision** : <quoi>
- **Pourquoi** : <une ligne>
- **Avancée** : <ce qui a été fait>
```

---

## Points d'attention

- **Un seul fichier de vérité par projet** : `etat.md` est la source de vérité
  pour "où on en est" dans ce projet.
- **Ne jamais laisser `etat.md` devenir obsolète** : s'il ne reflète plus la
  réalité, le réécrire entièrement plutôt que de le laisser trainer.
- **Journal court** : une ligne par entrée, pas des paragraphes.
- **Nom de projet cohérent** : réutiliser le même nom de dossier d'une session
  à l'autre pour le même projet, sinon la mémoire se fragmente.
- **Ne pas demander de dossier** : le projet est détecté, pas déclaré.

## Fin

À la fin d'une session longue, rappeler à l'utilisateur que la mémoire est dans
`context-mem/<projet>/` et qu'il suffira de dire "on continue" pour reprendre.
