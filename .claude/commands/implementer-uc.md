---
description: Implémenter un cas d'usage approuvé à partir de sa spec (flux « nouveau cas d'usage »)
argument-hint: UC-###
---

Implémente le cas d'usage **$ARGUMENTS** en suivant strictement `CLAUDE.md` §4.

Étapes, dans l'ordre, sans en sauter :

1. Trouve le fichier `specs/use-cases/$ARGUMENTS-*.md`. Vérifie que son statut est `prêt` (en-tête **et** catalogue). Si ce n'est pas le cas, arrête-toi et dis-le. Annonce le UC, sa version, et la branche que tu vas créer.
2. Lis en entier le UC, `specs/domain/modele-domaine.md`, les NFR listées dans l'en-tête du UC, les ADR de `specs/adr/` au statut `accepté`, et `CLAUDE.md`.
3. Avant tout code, produis la **table de correspondance** : une ligne par étape du scénario nominal, par extension, par règle `RG-`, par message `MSG-` et par test `T-`, avec la colonne « où » (fichier / composant / fonction / test et niveau ADR-003). Signale dans une section à part tout point du UC que tu juges **ambigu, manquant ou contradictoire** : pour chacun, prépare le texte du ticket « retour analyste » (section du UC, question, options). N'implémente pas ces points tant que je n'ai pas tranché entre « ouvrir le ticket » et « c'est bien dans la spec, relis ». Attends ma validation de la table et du plan.
4. Crée la branche `uc/$ARGUMENTS-<nom>`, passe le statut à `en implémentation` dans l'en-tête et le catalogue, commit `spec($ARGUMENTS): start implementation`.
5. Implémente dans l'ordre domaine → données → écran → parcours, avec les tests de chaque niveau, en commits `feat($ARGUMENTS): …` petits et nommés. Chaque texte visible vient de la section Messages du UC et vit dans `messages.ts` sous sa clé `MSG-`.
6. Fais le **contrôle d'écart** : reprends la table du point 3 et remplis la colonne « implémenté dans » ; tout écart est corrigé ou fait l'objet d'un ticket.
7. Lance `npm run lint`, `npm run typecheck`, `npm run test`, `npm run test:e2e`, `npm run build`, `npm run check:specs`. Rien de rouge.
8. Remplis la section **14. Réalisation** du UC (PR, écarts, décisions techniques, retours analyste ouverts). Ouvre la PR avec le template, captures 360 / 768 / 1280 px jointes.
9. Termine par le **compte rendu pour le journal du POC** (`docs/poc/journal.md`, entrée du UC) : nombre de questions posées et lesquelles, nombre de points ambigus détectés, relances, temps approximatif, décisions techniques hors ADR, règles de `CLAUDE.md` qui t'ont gêné.

Ne fusionne pas la PR. Ne modifie aucune section du UC autre que l'en-tête (statut) et la section 14.
