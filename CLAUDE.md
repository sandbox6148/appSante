# CLAUDE.md — règles pour l'agent de code (casquette développeur)

Tu travailles sur **Vita**, une application web (PWA) personnelle de suivi de santé et de forme, développée selon un workflow **piloté par les spécifications**. Ce fichier est ta règle de conduite. Il s'applique à chaque session, sans exception. Réponds en français ; écris le code, les identifiants, les commits et les commentaires de code en anglais.

## 1. Sources de vérité, dans cet ordre

1. Le cas d'usage (`specs/use-cases/UC-###-*.md`) dont le statut est `prêt` ou `en implémentation` — **source fonctionnelle unique**.
2. Le modèle de domaine et le glossaire (`specs/domain/modele-domaine.md`) — vocabulaire et règles `RG-D##`.
3. Les exigences non fonctionnelles (`specs/nfr.md`).
4. Les décisions d'architecture acceptées (`specs/adr/`).
5. Ce fichier et `docs/conventions.md`.

Ce qui n'est pas dans ces sources n'existe pas. Tu ne complètes pas une spec avec ton bon sens : tu **demandes**.

## 2. Ce que tu ne fais jamais

- Implémenter un UC dont le statut n'est pas `prêt` (ou `en implémentation` si tu reprends ton propre travail).
- Modifier le contenu d'un UC (sections 1 à 13), le modèle de domaine, les NFR, le catalogue ou un ADR accepté. La seule section d'un UC que tu remplis est **14. Réalisation**, plus le statut dans l'en-tête et dans le catalogue aux transitions prévues (`prêt → en implémentation` au début, `en implémentation → livré` à la fusion).
- Inventer un texte d'interface : chaque texte visible vient de la section Messages du UC (`MSG-###-##`) et vit dans le `messages.ts` de la feature.
- Faire un appel réseau ailleurs que dans un adaptateur de `src/data/sources/`. Aucun domaine tiers, aucune télémétrie, aucune police externe.
- Écrire une donnée réelle (mesure, repas, export d'objet connecté, jeton) dans le dépôt. Les fixtures sont fictives et marquées comme telles.
- Ajouter une dépendance hors de la liste de l'ADR-001 sans la justifier dans la PR (et dans un ADR si elle est structurante).
- Pousser sur `main`, fusionner une PR dont la CI est rouge, ou marquer un test comme ignoré pour le faire passer.
- Contourner une règle de ce fichier parce que « c'est plus simple » : si une règle bloque, tu le dis et tu proposes un ADR.

## 3. Quand la spec ne suffit pas

Distingue toujours deux cas.

**Manque fonctionnel** (un comportement, une règle, un texte, un cas d'erreur que le UC ne dit pas ou dit de façon contradictoire) : tu n'interprètes pas. Tu ouvres un ticket **retour analyste** (template GitHub `retour-analyste`, label `type:retour-analyste` + `UC-###`) qui cite la section du UC, la question précise et, si utile, les options que tu vois. Tu poursuis le reste de l'implémentation si le point est isolable ; sinon tu t'arrêtes et tu le dis. Tu notes le ticket dans la section 14 du UC.

**Manque technique** (un choix d'implémentation que ni les ADR ni ce fichier ne tranchent) : tu prends la décision la plus simple compatible avec les ADR, tu la notes en une ligne dans la section 14 « Décisions techniques », et si elle engage l'architecture, tu rédiges un ADR `proposé` à partir du template.

Un doute sur la frontière entre les deux ? Traite-le comme fonctionnel.

## 4. Déroulé d'une implémentation (`/implementer-uc UC-###`)

1. **Lire** en entier : le UC, le modèle de domaine, les NFR référencées dans l'en-tête, les ADR, ce fichier. Vérifier le statut `prêt`.
2. **Table de correspondance** avant tout code : pour chaque étape du scénario, chaque extension, chaque règle `RG-`, chaque message `MSG-` et chaque test `T-`, indiquer où ça vivra (fichier, composant, test, niveau de test selon ADR-003). Présenter cette table et le plan, attendre la validation du développeur.
3. **Ouvrir la branche** `uc/UC-###-nom`, passer le statut à `en implémentation` (en-tête + catalogue) dans un premier commit `spec(UC-###): start implementation`.
4. **Implémenter dans l'ordre** : domaine (types, règles, tests unitaires) → données (schéma Dexie, migration, dépôt, tests) → écran (composants, composables, `messages.ts`, tests écran avec axe) → parcours (Playwright). Commits petits et nommés `feat(UC-###): …`.
5. **Contrôle d'écart** : reprendre la table du point 2 et pointer chaque ligne vers son implémentation ; tout écart est corrigé ou fait l'objet d'un ticket.
6. **Vérifier** localement : `npm run lint`, `npm run typecheck`, `npm run test`, `npm run test:e2e`, `npm run build`. Rien de rouge.
7. **Remplir** la section 14 du UC, ouvrir la PR avec le template (captures 360 / 768 / 1280 px), lister les vérifications manuelles à faire par le développeur (clavier, VoiceOver, mode avion, interruption).
8. Ne pas fusionner toi-même.

## 5. Déroulé d'une synchronisation (`/synchroniser NN`)

1. Lire le ticket `#NN`, son label `sync:*`, le UC concerné dans sa version courante, et — si la spec a changé — le diff de la dernière version du UC (`git log -p` sur le fichier).
2. `sync:code-seul` : le UC est la référence, le code est fautif ; écrire d'abord le test qui échoue (nommé d'après le `T-` concerné, ou un nouveau test de régression cité dans le ticket), puis corriger.
3. `sync:spec-et-code` : partir de la nouvelle version du UC comme d'une implémentation (§4), limitée aux lignes qui ont changé ; mettre à jour les tests dont le `T-` a changé.
4. Branche `ticket/NN-nom`, commits `fix(UC-###): #NN …` ou `feat(UC-###): #NN …`, PR avec `Closes #NN`, section 14 du UC mise à jour.

## 6. Règles de code

**Architecture** (ADR-001) : `app → features → { domain, data, shared }` ; `data → domain` ; `shared → domain` (types). `domain/` ne dépend de rien. Une feature ne dépend pas d'une autre feature. Un écran = une route nommée `uc-###-…`. Tous les textes d'une feature dans son `messages.ts`, clés = identifiants `MSG-###-##`.

**Nommage** : noms de notions strictement ceux de la colonne « En code » du glossaire (`BodyMeasurement`, `Meal`, `MealItem`, `ImportRun`…). Composants en PascalCase, composables `useXxx`, fichiers de test à côté du code (`*.test.ts`) sauf parcours dans `tests/e2e/`.

**Accessibilité** (NFR-01 à NFR-03) : HTML sémantique d'abord (`main`, `nav`, `h1` unique par écran, `button` pour une action, `a` pour une navigation) ; chaque champ a un `label` visible lié ; aide et erreur liées par `aria-describedby` ; erreur annoncée (`aria-live`) et focus déplacé sur le premier champ en erreur à la soumission ; focus toujours visible ; contraste ≥ 4,5:1 ; aucune information portée par la couleur seule ; cibles ≥ 44 px ; tout composant du kit `shared/ui` est livré avec son test axe. Les graphiques ont un résumé textuel et un tableau (NFR-02).

**Données** (ADR-001) : Dexie avec schéma versionné ; toute modification de schéma = nouvelle version + migration + test de migration ; les dépôts exposent des fonctions typées, aucun accès direct à Dexie depuis une feature ; toute donnée porte sa `source` (RG-D01) ; les imports sont idempotents sur (source, notion, date) (RG-D04).

**Formulaires** (NFR-05, NFR-06, NFR-29) : clavier adapté au type (`inputmode`), valeurs par défaut de la spec, brouillon conservé en cas d'interruption, action principale unique et atteignable en bas d'écran sur mobile, suppression annulable (RG-D09).

**Tests** (ADR-003) : chaque `T-###-##` a un test dont le nom commence par son identifiant ; règles de calcul testées avec valeurs de référence ; axe sur chaque état d'écran ; sources externes simulées par `msw` ; jamais de `test.skip` pour masquer un échec.

**Style** : TypeScript `strict`, pas de `any`, pas de `// @ts-ignore` ; ESLint et Prettier passent ; pas de commentaire qui paraphrase le code ; un commentaire seulement pour expliquer un *pourquoi* non évident, en citant la règle ou le UC (`// RG-D02: nights are keyed by wake date`).

## 7. Commits, branches, PR

Voir `docs/conventions.md`. En résumé : branches `uc/UC-###-nom`, `ticket/NN-nom`, `fondations/sujet` ; commits *Conventional Commits* avec `UC-###` en portée ; PR avec le template du dépôt ; jamais de `push --force` sur une branche partagée ; `main` protégée.

## 8. Ce que tu fais en début de session

Annonce en une ligne le UC ou le ticket sur lequel tu travailles, son statut, et la branche. Si le statut n'est pas celui attendu, arrête-toi et dis-le. Si tu constates une divergence entre le catalogue et l'en-tête du UC, dis-le aussi : c'est un signal pour le journal du POC.
