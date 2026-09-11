---
description: Construire le socle applicatif de l'itération 0 à partir des ADR acceptés
---

Tu démarres l'**itération 0 — fondations** de Vita. Lis d'abord, en entier : `CLAUDE.md`, `specs/adr/ADR-001-socle-applicatif.md`, `specs/adr/ADR-003-strategie-de-tests.md`, `specs/nfr.md`, `docs/conventions.md`. Vérifie que les ADR-001 et ADR-003 ont le statut `accepté` ; sinon arrête-toi et dis-le.

Objectif : un socle **vide mais exécutable et vérifiable**, sur la branche `fondations/socle`, qui satisfait exactement ce que l'ADR-001 et l'ADR-003 décrivent — ni plus, ni moins. Aucune fonctionnalité métier.

Avant de coder, présente un plan en étapes avec, pour chaque étape, les fichiers créés et la commande qui prouve qu'elle fonctionne. Attends ma validation.

Le socle comprend :

1. Le projet Vite + Vue 3 + TypeScript `strict`, avec l'arborescence `src/app`, `src/domain`, `src/data`, `src/features`, `src/shared`, `tests/fixtures`, `tests/e2e` (dossiers vides documentés par un `README.md` d'une ligne quand ils n'ont pas encore de contenu).
2. `App.vue` avec une coquille accessible : `lang="fr"`, un `header` avec le nom de l'application, une `nav` vide prête à recevoir les écrans, un `main` avec un écran d'accueil qui affiche un état vide rédigé (texte dans `src/features/dashboard/messages.ts` avec une clé provisoire `MSG-000-01`, à remplacer par le UC-020), un lien d'évitement.
3. `src/shared/styles/tokens.css` (couleurs avec contrastes vérifiés, espacements, typographie, focus visible, cibles 44 px) et une réinitialisation minimale.
4. Vue Router avec la route d'accueil ; Pinia initialisé sans magasin.
5. Dexie : `src/data/db.ts` version 1 sans table, avec le mécanisme de migration en place et un test qui ouvre la base sur `fake-indexeddb`.
6. `vite-plugin-pwa` : manifeste (nom, icônes de substitution, couleur, affichage `standalone`, langue `fr`), service worker en précache, enregistrement dans `src/app`.
7. ESLint (config plate) avec `eslint-plugin-vue`, `eslint-plugin-vuejs-accessibility` et les règles de restriction d'import qui font respecter le sens des dépendances de l'ADR-001 ; Prettier ; scripts `lint`, `format`, `typecheck`.
8. Vitest en deux projets (`domain` sans DOM, `ui` avec `happy-dom`), `vitest-axe`, `msw` configuré mais sans gestionnaire ; un test de fumée par projet (dont un audit axe de l'écran d'accueil).
9. Playwright sur Chromium et WebKit, aux largeurs 360 et 1280 px, avec un test de fumée qui ouvre l'accueil et vérifie le titre ; captures dans `test-results/`.
10. `package.json` avec les scripts : `dev`, `build`, `preview`, `lint`, `format`, `typecheck`, `test`, `test:e2e`, `check:specs` (qui lance `node scripts/check-specs.mjs`).
11. `.github/workflows/ci.yml` déjà présent : vérifie qu'il exécute bien ces scripts et ajuste-le si nécessaire.

Contraintes : uniquement les dépendances listées dans l'ADR-001 ; aucun appel réseau ; aucun texte d'interface en dur dans un composant ; commits petits en `chore(fondations): …` ; à la fin, `npm run lint && npm run typecheck && npm run test && npm run build && npm run test:e2e` doit passer, et tu me donnes la liste des vérifications manuelles à faire (installation de la PWA, navigation clavier, VoiceOver).

Ne fusionne pas. Ouvre la PR avec le template et note dans `docs/poc/journal.md` (entrée « Itération 0 ») le temps passé, les questions que tu as dû poser et les décisions techniques que les ADR ne couvraient pas.
