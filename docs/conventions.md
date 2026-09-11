# Conventions — identifiants, nommage, traçabilité

Ces conventions sont appliquées par les trois casquettes et vérifiées, quand c'est possible, par `scripts/check-specs.mjs` en CI.

## 1. Identifiants

| Préfixe | Portée | Forme | Exemple | Attribué par |
|---|---|---|---|---|
| `O-##` | Objectif produit | Séquentiel, dans la [vision](../specs/vision.md) | `O-01` | Analyste |
| `NFR-##` | Exigence non fonctionnelle | Séquentiel, dans [nfr.md](../specs/nfr.md) | `NFR-01` | Analyste |
| `RG-D##` | Règle de domaine transverse | Séquentiel, dans le [modèle de domaine](../specs/domain/modele-domaine.md) | `RG-D04` | Analyste |
| `UC-###` | Cas d'usage | Séquentiel continu, dans le [catalogue](../specs/use-cases/catalogue.md) ; jamais réattribué | `UC-003` | Analyste |
| `RG-###-##` | Règle propre à un UC | `###` = numéro du UC, `##` séquentiel dans le UC | `RG-003-02` | Analyste |
| `MSG-###-##` | Texte d'interface d'un UC | idem | `MSG-003-05` | Analyste |
| `T-###-##` | Test d'acceptation d'un UC | idem | `T-003-01` | Analyste |
| `ADR-###` | Décision d'architecture | Séquentiel, dans [specs/adr](../specs/adr/) | `ADR-001` | Développeur |
| `#NN` | Ticket | Numéro d'issue GitHub | `#12` | Métier (ou développeur pour un retour analyste) |

Un identifiant est **stable** : on ne renumérote jamais. Un élément supprimé garde son numéro avec la mention « supprimé (motif, ticket) » dans l'historique du UC.

## 2. Fichiers

| Artefact | Emplacement | Nom |
|---|---|---|
| Cas d'usage | `specs/use-cases/` | `UC-###-nom-en-kebab-case.md` (nom = titre du UC sans article, ex. `UC-003-enregistrer-mesure-corporelle.md`) |
| Décision d'architecture | `specs/adr/` | `ADR-###-sujet.md` |
| Maquette ou schéma d'écran | `specs/ui/` | `UC-###-nom-ecran.png` ou `.html` (export d'outil de design), référencé depuis le UC |
| Journal du POC | `docs/poc/journal.md` | — |
| Données de test | `tests/fixtures/` | Fictives, nommées par notion et scénario ; jamais issues d'un export réel |

## 3. Langues

Les specs, le journal, les tickets, les PR et les textes d'interface sont en **français**. Le code, les identifiants de code, les noms de fichiers de code, les messages de commit et les commentaires de code sont en **anglais**. Les noms des notions en code sont ceux de la colonne « En code » du glossaire.

## 4. Branches

| Type | Nom | Créée par | Fusionnée quand |
|---|---|---|---|
| Spec d'un UC | `spec/UC-###` | Analyste | UC approuvé (`prêt`) |
| Spec mise à jour après ticket | `spec/UC-###-ticket-NN` | Analyste | UC réapprouvé |
| Implémentation d'un UC | `uc/UC-###-nom` | Développeur | Définition de « fini » satisfaite |
| Traitement d'un ticket | `ticket/NN-nom` | Développeur | idem |
| Fondations | `fondations/sujet` | Développeur | ADR accepté et CI verte |

`main` est protégée : on n'y pousse jamais directement, tout passe par une PR, même pour une spec.

## 5. Messages de commit

Format *Conventional Commits* avec le UC en portée :

```
<type>(<portée>): <résumé à l'impératif, en anglais>

<corps optionnel>
```

| Type | Usage |
|---|---|
| `spec` | Création, modification ou approbation d'un UC ou d'un document de specs — portée = `UC-###`, `domain`, `nfr`, `vision`, `catalogue` |
| `adr` | Création ou changement de statut d'un ADR — portée = `ADR-###` |
| `feat` | Implémentation d'un UC ou d'une évolution — portée = `UC-###` |
| `fix` | Correction d'un bug — portée = `UC-###`, ticket cité dans le résumé (`#NN`) |
| `test` | Tests seuls |
| `chore` | Outillage, dépendances, CI |
| `docs` | Documentation hors specs (README, journal, workflow) |

Exemples : `spec(UC-003): approve v1.0`, `feat(UC-003): add body measurement form`, `fix(UC-007): #12 recompute intake when quantity is cleared`, `spec(UC-020): v1.1 — #15 add Oura sleep and readiness`.

## 6. Tickets (issues GitHub)

Un ticket est créé avec l'un des trois templates : **bug**, **évolution**, **retour analyste**. Il porte un label de type (`type:bug`, `type:evolution`, `type:retour-analyste`), le label du UC concerné (`UC-###`, créé au besoin avec `scripts/github-labels.sh`) et, après qualification par l'analyste, un label de synchronisation (`sync:code-seul`, `sync:spec-et-code`, `sync:sans-suite`). Le titre commence par le UC : `UC-007 — les apports ne se recalculent pas quand on vide la quantité`.

## 7. Pull requests

Le template de PR impose : le UC (et le ticket, le cas échéant) en tête, la check-list de la définition de « fini », les captures aux trois largeurs, et le **contrôle d'écart** (tableau étape / extension / règle / message → où c'est implémenté, ou écart documenté). Une PR de spec est plus courte : elle contient la check-list « prêt à implémenter ».

## 8. Traçabilité de bout en bout

| De | Vers | Par |
|---|---|---|
| Ticket `#NN` | UC | Label `UC-###` et titre du ticket |
| UC | Version de UC | Ligne d'historique (version, date, ticket, motif) |
| UC | Code | PR référencée dans la section « Réalisation » ; branche et commits portant `UC-###` |
| UC | Tests | Nom du test automatisé contenant `T-###-##` |
| Test | Exigence | Le test d'acceptation cite les règles `RG-` et NFR qu'il vérifie |
| Écran | UC | Identifiant du UC dans les informations de version de l'application (NFR-22) |
| PR | Ticket | `Closes #NN` dans la description |

Le journal du POC ne fait pas partie de la traçabilité produit : c'est l'instrument d'observation du process, distinct des artefacts qu'il observe.
