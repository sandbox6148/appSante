# Protocole de séparation des casquettes

Une seule personne joue l'analyste, le développeur et le métier. Ce protocole rend la séparation **mécanique** plutôt que volontaire : chaque casquette a son outil, son point d'entrée, sa check-list de début et de fin de session. Toute entorse est consignée dans le [journal](journal.md) — c'est une donnée du POC (hypothèse H6), pas une faute.

## 1. Vue d'ensemble

| Casquette | Outil | Point d'entrée | Ce qu'elle voit | Ce qu'elle produit |
|---|---|---|---|---|
| **Analyste** | Session Claude (chat ou Cowork) à laquelle on n'attache **que le dossier `specs/`** et `docs/` — jamais `src/` ni `tests/` | Le catalogue, le template de UC, la check-list « prêt à implémenter » | Specs uniquement | UC, mises à jour du domaine et des NFR, qualification des tickets |
| **Développeur** | Claude Code dans le dépôt complet | Les commandes `/fondations`, `/implementer-uc`, `/synchroniser`, `/controle-ecart` | Tout le dépôt, mais n'écrit que du code, des tests, la section 14 des UC, des ADR | Code, tests, PR |
| **Métier** | L'application construite depuis `main` (`npm run preview`, ou sur le téléphone), GitHub Issues (sur téléphone de préférence) | Les templates d'issue bug et évolution | L'application, rien d'autre | Tickets |

## 2. Règles de changement de casquette

1. **Une session, une casquette.** On ne change pas de casquette au milieu d'une session d'outil. Changer de casquette = fermer la session, ouvrir l'outil de l'autre casquette.
2. **Jamais la spec et le code du même UC dans la même demi-journée.** Entre l'approbation d'un UC et le lancement de `/implementer-uc`, il y a au minimum une nuit — ou, à défaut, un autre UC entre les deux. Le but est de lire sa propre spec comme un étranger.
3. **L'approbation est un acte.** L'analyste passe la check-list point par point (docs/workflow.md §5), coche les treize points dans la description de la PR de spec, et fusionne. Sans PR de spec fusionnée, le UC n'est pas `prêt`, et Claude Code refusera de l'implémenter (`CLAUDE.md` §2).
4. **Le développeur ne corrige jamais la spec.** Si, en implémentant, l'envie vient de « juste ajuster un mot dans le UC », c'est un ticket retour analyste. Même si la correction est évidente. Surtout si elle est évidente : c'est précisément ce que le POC mesure.
5. **Le métier ne connaît pas la spec.** En recette, on utilise l'application sans relire le UC, et on décrit ce qu'on observe et ce qu'on attendait, avec ses mots. La confrontation au UC est le travail de l'analyste, à la qualification.
6. **Les retours analyste sont traités par l'analyste.** Un ticket `type:retour-analyste` est ouvert par le développeur et fermé par l'analyste (mise à jour du UC, nouvelle version, réapprobation) dans une autre session.

## 3. Check-lists de session

### Analyste — début

- Je n'ai attaché que `specs/` et `docs/` à la session.
- J'ai sous les yeux : le catalogue, le glossaire, le template, la check-list « prêt à implémenter ».
- Je note l'heure de début dans le journal.

### Analyste — fin

- Le UC est complet ou son statut dit clairement où il en est.
- Toute notion ou règle nouvelle est dans le modèle de domaine.
- La PR de spec est ouverte (ou fusionnée si approbation).
- Journal : temps passé, points où j'ai hésité, ce que le template ne prévoyait pas.

### Développeur — début

- Je suis dans Claude Code, sur `main` à jour, sans modification en attente.
- Je lance la commande de la tâche (`/implementer-uc UC-###` ou `/synchroniser NN`) et rien d'autre ; je ne « prépare » pas le terrain à la main.
- Je note l'heure de début.

### Développeur — fin

- La PR est ouverte avec le template, la CI est verte, les captures sont jointes.
- J'ai fait les vérifications manuelles (clavier, VoiceOver, mode avion, interruption) et coché la PR.
- La section 14 du UC est remplie.
- Journal : compte rendu de l'agent recopié et complété (questions, relances, écarts, décisions techniques, temps).
- Si j'ai eu envie de toucher à la spec : je l'ai dit dans le journal.

### Métier — début

- L'application est construite depuis `main` (`npm run build && npm run preview`), pas depuis une branche.
- Je n'ai pas relu le UC avant de tester.
- J'utilise l'application comme un utilisateur, dans le moment d'usage prévu (le matin, après un repas…), idéalement sur le téléphone.

### Métier — fin

- Chaque anomalie ou souhait est un ticket distinct, avec le template, décrit avec mes mots, et le UC si je le connais (sinon « je ne sais pas »).
- Journal : nombre de tickets, ressenti d'usage en deux lignes.

## 4. Entorses : comment les consigner

Dans le journal, section « Entorses au protocole », une ligne par entorse : date, casquette, ce que j'ai fait, pourquoi ça m'a paru nécessaire, ce que ça révèle (spec insuffisante ? protocole trop rigide ? outil inadapté ?). L'entorse n'annule pas le travail ; elle est une observation.

## 5. Ce que le protocole ne couvre pas

Les fondations (itération 0) sont un travail de développeur hors boucle : les ADR sont écrits et acceptés par la casquette développeur, sans passage par l'analyste. Le cadrage et le bilan du POC sont écrits hors casquette, par « moi » tout court.
