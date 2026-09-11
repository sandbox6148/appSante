<!-- Titre de la PR : « UC-### — <titre du UC> » ou « #NN — <titre du ticket> » ou « spec(UC-###) — approbation v1.0 » -->

## Référence

- Cas d'usage : UC-### (version x.y)
- Ticket : #NN — ou « aucun »
- Type : implémentation / synchronisation `sync:code-seul` / synchronisation `sync:spec-et-code` / spec / fondations

<!-- ======= PR DE SPEC : garder cette section, supprimer les suivantes ======= -->

## Check-list « prêt à implémenter » (docs/workflow.md §5)

- [ ] 1. Résumé en trois phrases
- [ ] 2. Acteur, déclencheur, pré et postconditions
- [ ] 3. Scénario nominal numéroté, état observable final
- [ ] 4. Extensions pour chaque cas d'erreur, alternative, interruption
- [ ] 5. Données complètes (glossaire, type, obligatoire, contraintes, défaut, message)
- [ ] 6. Règles identifiées et testables, règles de domaine référencées
- [ ] 7. Interface décrite structurellement (zones, action principale, états, 360 px, accessibilité)
- [ ] 8. Tous les textes dans Messages
- [ ] 9. Tests d'acceptation couvrant nominal et extensions, données fictives
- [ ] 10. Objectifs et NFR référencés
- [ ] 11. Vocabulaire du glossaire ; modèle de domaine mis à jour si besoin
- [ ] 12. Aucune question ouverte bloquante
- [ ] 13. Pas de solution technique dans le UC

<!-- ======= PR DE CODE : garder les sections suivantes ======= -->

## Contrôle d'écart spec ↔ livraison

| Élément du UC | Implémenté dans | Statut |
|---|---|---|
| Étape 1 | | conforme / écart (#NN) |
| Extension 3a | | |
| RG-###-01 | | |
| MSG-###-01 … | `features/<f>/messages.ts` | |
| T-###-01 | `…test.ts` (niveau) | vert |

## Définition de « fini » (docs/workflow.md §6)

- [ ] Chaque `T-###-##` a un test automatisé nommé d'après lui, et il passe
- [ ] Lint, types, tests domaine et écran, audit axe, parcours, build : verts en CI
- [ ] Revue manuelle : navigation clavier complète
- [ ] Revue manuelle : lecteur d'écran (VoiceOver) sur chaque écran livré
- [ ] Revue manuelle : interruption de saisie (si le UC saisit des données) ; mode avion (si le UC fonctionne hors ligne)
- [ ] Captures à 360, 768 et 1280 px jointes ci-dessous
- [ ] Contrôle d'écart complet ; écarts corrigés ou tickets ouverts
- [ ] Fondations respectées : dépendances de l'ADR-001, sens des imports, aucun appel réseau hors adaptateurs, aucun texte en dur, aucune donnée réelle, aucun secret
- [ ] Section 14 « Réalisation » du UC remplie ; statut et catalogue à jour
- [ ] Journal du POC complété

## Captures

<!-- 360 px / 768 px / 1280 px, et les états vide / erreur si pertinents -->

## Décisions techniques hors ADR

<!-- une ligne par décision, ou « aucune » -->

## Pour le journal du POC

- Questions posées par l'agent :
- Points ambigus → tickets retour analyste :
- Relances :
- Temps approximatif :
