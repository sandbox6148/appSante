# ADR-003 — Stratégie de tests : un test automatisé par test d'acceptation, à trois niveaux

| | |
|---|---|
| **Statut** | proposé (à accepter par la casquette développeur avant l'itération 0) |
| **Date** | 11 septembre 2026 |
| **Décideur** | Casquette développeur |
| **Concerne** | Tous les UC ; NFR-01, NFR-13, NFR-18 à NFR-23 ; hypothèses H1, H4, H5 du POC |

## Contexte

Dans le workflow, les **tests d'acceptation du UC** (`T-###-##`) sont écrits par l'analyste avant l'implémentation et constituent le contrat. Le développeur (via l'agent) doit les transformer en tests automatisés traçables (NFR-21, NFR-22), y ajouter ce que l'acceptation ne couvre pas (calculs, accessibilité automatisable, régressions) et garder l'ensemble assez rapide pour tourner à chaque PR. Les sources externes (Oura, Open Food Facts) ne doivent jamais être appelées en test (NFR-13, données fictives). Il faut aussi que le **contrôle d'écart** spec ↔ code (définition de « fini », point 5) s'appuie sur quelque chose de mécanique.

## Options considérées

### Option A — Tout en bout en bout (Playwright)

Chaque `T-###-##` devient un scénario navigateur.

Avantages : fidèle à l'usage, un seul niveau à maintenir.

Inconvénients : lent, fragile, inadapté aux règles de calcul et aux cas limites ; couverture d'accessibilité partielle.

### Option B — Trois niveaux, chaque test d'acceptation placé au niveau le plus bas qui le prouve

Domaine (unitaire), écran (composant monté avec base en mémoire et audit axe), parcours (bout en bout sur le scénario nominal et les extensions qui traversent plusieurs écrans).

Avantages : rapide, précis, accessibilité auditée à chaque écran, cas limites couverts au niveau unitaire.

Inconvénients : il faut décider du niveau de chaque test ; l'agent doit être guidé pour ne pas tout mettre au niveau composant.

### Option C — Tests d'acceptation exécutables en langage naturel (Gherkin + glue)

Avantages : le tableau du UC devient le test.

Inconvénients : une couche de glue à maintenir pour un seul utilisateur ; la traçabilité par identifiant suffit à l'objectif.

## Décision

**Option B.** Règles :

| Règle | Contenu |
|---|---|
| Traçabilité | Chaque `T-###-##` a **exactement un** test automatisé principal dont le nom commence par son identifiant (`T-003-01 …`). Le script `scripts/check-specs.mjs` vérifie qu'aucun test d'acceptation d'un UC `livré` n'est orphelin. |
| Niveau domaine | Vitest, sans DOM. Règles de calcul (apports, variations, moyennes), validations, règles `RG-` : tests avec valeurs de référence (NFR-20). Toute règle du UC a au moins un test ici. |
| Niveau écran | Vitest + `@vue/test-utils` + `happy-dom`, base Dexie sur `fake-indexeddb`. Un test par écran et par état (vide, chargement, erreur, succès) ; audit **axe** sans violation sur chaque état (NFR-01) ; vérification des textes par identifiant `MSG-###-##` (l'écran affiche le texte de `messages.ts`, jamais une chaîne en dur). |
| Niveau parcours | Playwright sur Chromium et **WebKit** (cible Safari, NFR-25), aux largeurs 360 et 1280 px : le scénario nominal de chaque UC, les extensions qui changent d'écran, le scénario hors ligne pour les UC de saisie (NFR-08) et le scénario d'interruption de saisie (NFR-06). Captures automatiques jointes à la PR (NFR-04). |
| Sources externes | Jamais appelées. `msw` simule les API (réponses fictives versionnées dans `tests/fixtures/`), y compris les cas d'erreur (NFR-19) et le rejeu pour l'idempotence (NFR-18). |
| Données | Fixtures fictives, nommées par notion et scénario ; un jeu « un an de données » généré pour NFR-15. Aucune donnée réelle (NFR-13). |
| Vérifications manuelles | Ne sont pas automatisables et restent dans la définition de « fini » : lecteur d'écran (VoiceOver), navigation clavier complète, mode avion sur téléphone. Elles sont cochées dans la PR. |
| CI | Lint, `vue-tsc`, tests domaine et écran, build, puis parcours ; une PR rouge n'est pas fusionnée. |

## Conséquences

L'itération 0 livre : la configuration Vitest (deux projets : `domain` sans DOM, `ui` avec `happy-dom`), `fake-indexeddb`, `vitest-axe`, `msw`, Playwright avec les deux navigateurs et les deux largeurs, un test de fumée par niveau, et le workflow CI. Le template de UC impose déjà les tests d'acceptation en « Étant donné / Quand / Alors » avec données fictives : la commande `/implementer-uc` demande à l'agent de produire d'abord la table de correspondance `T-###-## → fichier de test → niveau`, avant de coder.

Coût accepté : les tests Playwright WebKit sont plus lents en CI ; ils restent limités au scénario nominal et aux extensions multi-écrans.

## Points à vérifier

- Stabilité de `happy-dom` avec Dexie + `fake-indexeddb` (sinon `jsdom`).
- Disponibilité de WebKit dans l'exécuteur CI (paquets système Playwright).
- Temps total de la CI après quatre UC : objectif sous dix minutes.
