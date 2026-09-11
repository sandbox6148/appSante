# Vita

Application web personnelle (PWA) de suivi de santé et de forme — repas, plan d'entraînement, évolution physique, activité, sommeil et données d'objets connectés — développée selon un **workflow piloté par les spécifications** (spec-driven development, SDD). Le produit est le support ; l'objet du dépôt est d'éprouver ce workflow de bout en bout, en solo, avec un agent de code.

Projet strictement personnel : aucune donnée réelle dans le dépôt, aucun service tiers en dehors des API officielles des sources de données, aucun lien avec un quelconque contexte professionnel.

## Où lire quoi

| Je veux… | Fichier |
|---|---|
| Comprendre pourquoi ce dépôt existe et ce qu'on y mesure | [docs/poc/cadrage-poc.md](docs/poc/cadrage-poc.md) |
| Comprendre comment on travaille (les deux flux, l'approbation, « fini ») | [docs/workflow.md](docs/workflow.md) |
| Connaître les identifiants, branches, commits, labels | [docs/conventions.md](docs/conventions.md) |
| Savoir comment changer de casquette sans tricher | [docs/poc/protocole-casquettes.md](docs/poc/protocole-casquettes.md) |
| Lire ce que le produit doit faire | [specs/](specs/README.md) — vision, domaine, NFR, catalogue des UC, ADR |
| Voir ce que l'agent de code a le droit de faire | [CLAUDE.md](CLAUDE.md) |
| Noter une observation sur le process | [docs/poc/journal.md](docs/poc/journal.md) |

## État

| Jalon | Contenu | État |
|---|---|---|
| J0 | Cadrage du POC | validé le 11 septembre 2026 |
| J1 | Inception : vision, catalogue de 23 UC, modèle de domaine, 31 NFR | validée le 11 septembre 2026 |
| J2 | Squelette du dépôt : templates, ADR proposés, règles de l'agent, commandes, CI, journal | en cours — ADR-001 à 003 à accepter |
| Itération 0 | Socle applicatif (`/fondations`) | à faire |
| Itération 1 | UC-003, UC-007, UC-004, UC-020 | à faire |
| Itération 2 | UC-015, UC-016, ticket d'évolution sur UC-020, tickets de recette | à faire |
| J5 | Bilan | à faire |

## Démarrer

**Casquette développeur — fondations (une fois).** Relire et accepter les ADR ([specs/adr/](specs/adr/)) en passant leur statut à `accepté`. Puis, dans Claude Code à la racine du dépôt : `/fondations`. Le socle Vue 3 + TypeScript + Vite décrit par l'ADR-001 et l'ADR-003 est construit sur la branche `fondations/socle` ; la PR est revue, fusionnée, et la CI complète s'active (elle est sautée tant que `package.json` n'existe pas).

**Casquette analyste — un cas d'usage.** Ouvrir une session Claude avec **seulement** `specs/` et `docs/` attachés. Copier [specs/use-cases/_template-uc.md](specs/use-cases/_template-uc.md) en `UC-###-nom.md`, rédiger, mettre à jour le catalogue, passer la check-list d'approbation ([docs/workflow.md](docs/workflow.md) §5) dans une PR de spec, fusionner. Le UC est `prêt`.

**Casquette développeur — un cas d'usage.** Dans Claude Code, sur `main` à jour, une autre demi-journée : `/implementer-uc UC-###`. L'agent produit la table de correspondance, attend la validation, implémente, ouvre la PR. Revue, vérifications manuelles, fusion.

**Casquette métier — recette.** `npm run build && npm run preview`, utiliser l'application, créer des tickets avec les templates (bug, évolution). L'analyste les qualifie ; le développeur les traite avec `/synchroniser NN`.

**Outillage GitHub.** Après avoir poussé le dépôt : protéger `main` (PR obligatoire, CI requise), puis créer les labels : `./scripts/github-labels.sh UC-003 UC-007 UC-004 UC-020`.

## Vérifier la cohérence des specs

```
node scripts/check-specs.mjs
```

Liens, identifiants, statuts (UC ↔ catalogue), unicité des `RG-`/`MSG-`/`T-`, et — une fois le socle en place — présence d'un test automatisé pour chaque test d'acceptation d'un UC livré.
