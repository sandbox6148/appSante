# ADR-001 — Socle applicatif : application web locale d'abord, Vue 3 + TypeScript + Vite

| | |
|---|---|
| **Statut** | proposé (à accepter par la casquette développeur avant l'itération 0) |
| **Date** | 11 septembre 2026 |
| **Décideur** | Casquette développeur |
| **Concerne** | Tous les UC ; NFR-07 à NFR-14, NFR-23, NFR-25 |

## Contexte

Vita est une application web installable, mono-utilisateur, dont les données doivent rester sous le contrôle de l'utilisateur (NFR-10), fonctionner hors ligne (NFR-08) et survivre aux mises à jour (NFR-09). Le POC exige un socle **simple à cadrer pour un agent de code** (règles vérifiables automatiquement, NFR-23) et **rapide à mettre en place**, puisque l'objet du POC est le workflow et non l'architecture. La stack Vue 3 + TypeScript + Vite est un choix de cadrage déjà acté.

Deux questions restent à trancher ici : faut-il un composant serveur, et quelles briques techniques précises l'agent a-t-il le droit d'utiliser.

## Options considérées

### Option A — Application web seule, données dans le navigateur

Une SPA/PWA servie en statique ; toutes les données dans IndexedDB ; les imports (Oura, Open Food Facts) appelés directement depuis le navigateur.

Avantages : zéro infrastructure, zéro hébergement de données, conformité immédiate à « local d'abord » et « aucune télémétrie », un seul langage, un seul dépôt, tests simples.

Inconvénients : la sauvegarde et la restauration (UC-023) reposent sur l'utilisateur ; Safari peut purger le stockage d'un site peu utilisé (atténué pour une PWA installée et par `navigator.storage.persist()`) ; les API externes doivent autoriser les appels depuis un navigateur (CORS), ce qui **n'est pas garanti pour l'API Oura**.

### Option B — Application web + petit service personnel

La même SPA, plus un service Node minimal (auto-hébergé) qui relaie les appels aux API externes et conserve une copie des données.

Avantages : contourne toute limitation CORS, sauvegarde centralisée, import planifiable.

Inconvénients : une infrastructure à héberger, sécuriser et maintenir pour un usage personnel ; deux déploiements ; le POC gagne en complexité sans gagner en enseignement sur le workflow.

### Option C — Application complète avec base de données serveur

Écartée : contraire à « local d'abord » et disproportionnée pour un utilisateur unique.

## Décision

**Option A**, avec une clause de sortie : si l'API Oura refuse les appels depuis le navigateur, un **relais minimal** (fonction serverless ou petit service) sera ajouté par un ADR-004 limité à ce rôle, sans stockage de données. Cette hypothèse est vérifiée par un spike au tout début du UC-015, avant toute rédaction détaillée du UC-016.

### Briques retenues

| Rôle | Choix | Motif |
|---|---|---|
| Langage et outillage | TypeScript en mode `strict`, Vite | Erreurs détectées à la compilation ; règles vérifiables par l'agent |
| Framework UI | Vue 3, Composition API, `<script setup>` | Acté au cadrage ; SFC lisibles pour la revue |
| Routage | Vue Router | Standard, historique navigateur, un écran = une route nommée par UC |
| État partagé | Pinia, uniquement pour l'état transversal (profil, préférences, connexion Oura) ; l'état d'un écran reste dans ses composables | Éviter un magasin global fourre-tout |
| Persistance | IndexedDB via Dexie, schéma versionné avec migrations | Migrations explicites (NFR-09), requêtes par index, Blobs pour les photos |
| PWA | `vite-plugin-pwa` (Workbox) : précache de l'application, stratégie hors ligne, manifeste | NFR-07, NFR-08 |
| Styles | CSS natif avec propriétés personnalisées (tokens dans `src/shared/styles/tokens.css`), styles scopés par composant ; pas de framework CSS utilitaire | Lisibilité pour la revue, maîtrise du contraste et du focus, pas de classe magique |
| Composants d'interface | Composants maison dans `src/shared/ui/` (champ de formulaire avec libellé, aide et erreur liés ; bouton ; liste ; feuille ; annonce) ; pas de bibliothèque de composants | Accessibilité maîtrisée de bout en bout (NFR-01) ; le kit grandit UC par UC |
| Graphiques | SVG maison avec équivalent tableau (NFR-02) ; aucune bibliothèque tant qu'un UC ne l'exige pas | Accessibilité et légèreté |
| Dates | `date-fns` (locale `fr`) et `Intl` pour le formatage | Éviter les erreurs de fuseau ; RG-D02 |
| Accès réseau | Un adaptateur par source (`src/data/sources/oura/`, `…/openfoodfacts/`) ; aucun appel réseau ailleurs | NFR-10, NFR-11 vérifiables par lint |
| Qualité | ESLint (config plate) avec `eslint-plugin-vue` et `eslint-plugin-vuejs-accessibility`, Prettier, `vue-tsc` | NFR-23 |
| Tests | Voir ADR-003 | |

### Architecture du code

```
src/
  app/          # démarrage, App.vue, routeur, coquille (navigation, en-tête), enregistrement du service worker
  domain/       # types du glossaire et règles pures (calculs, validations) — aucune dépendance à Vue ni à Dexie
  data/         # base Dexie (schéma, migrations), dépôts (repositories) par notion, adaptateurs de sources externes
  features/     # un dossier par domaine fonctionnel : measurements, meals, training, connected, dashboard, profile, data
    <feature>/
      views/        # écrans (une route = un écran, nommé d'après le UC)
      components/   # composants propres au domaine
      composables/  # logique d'écran (useXxx)
      messages.ts   # tous les textes de la feature, clés = MSG-###-##
  shared/       # kit UI accessible, styles/tokens, utilitaires (format, dates), composables transverses
tests/
  fixtures/     # données fictives par notion
  e2e/          # scénarios Playwright par UC
```

Sens des dépendances autorisé : `app → features → { domain, data, shared }` ; `data → domain` ; `shared → domain` (types seulement). Jamais `domain → *`, jamais `features → features` (on passe par `domain`/`data`). Cette règle est vérifiée par ESLint (règles de restriction d'import) dès l'itération 0.

### Dépendances autorisées

`vue`, `vue-router`, `pinia`, `dexie`, `date-fns`, `vite-plugin-pwa` ; en développement : `typescript`, `vite`, `vue-tsc`, `vitest`, `@vue/test-utils`, `happy-dom`, `axe-core`, `vitest-axe`, `@playwright/test`, `msw`, `eslint`, `eslint-plugin-vue`, `eslint-plugin-vuejs-accessibility`, `prettier`, `fake-indexeddb`. Toute autre dépendance est justifiée dans la PR et, si elle est structurante, dans un ADR.

## Conséquences

L'itération 0 met en place ce socle avec un écran d'accueil vide, la base Dexie version 1 sans table, le manifeste PWA, le lint, les tests (un test de fumée par niveau) et la CI. Les UC ne décrivent jamais ces choix techniques : ils s'appliquent d'office. Les photos (UC-005) sont stockées en Blob dans IndexedDB ; l'export (UC-022) et la sauvegarde (UC-023) sont des UC à part entière parce qu'en local d'abord, la sauvegarde est de la responsabilité de l'utilisateur.

L'hébergement (pour installer la PWA sur iPhone, il faut HTTPS) est **hors décision** pour le POC : usage sur ordinateur via `vite preview`, et sur téléphone via le réseau local ou un hébergement statique choisi plus tard. Aucun choix de socle n'en dépend.

## Points à vérifier

- **CORS de l'API Oura** depuis un navigateur — spike au démarrage du UC-015 ; si négatif, ADR-004 (relais minimal).
- **Persistance du stockage sur Safari iOS** pour une PWA installée — vérifier `navigator.storage.persist()` et documenter le comportement dans le UC-023.
- **Poids des photos** dans IndexedDB à long terme — mesurer à l'UC-005.
