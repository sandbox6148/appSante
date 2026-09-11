---
description: Traiter un ticket qualifié par l'analyste (flux « synchronisation » ticket → UC → code)
argument-hint: numéro du ticket GitHub
---

Traite le ticket **#$ARGUMENTS** en suivant strictement `CLAUDE.md` §5.

1. Lis le ticket (`gh issue view $ARGUMENTS` si `gh` est disponible, sinon je te colle son contenu), son label de type et son label `sync:*`. S'il n'a pas de label `sync:code-seul` ou `sync:spec-et-code`, il n'a pas été qualifié par l'analyste : arrête-toi et dis-le. Identifie le UC concerné par son label `UC-###`.
2. Lis la version courante du UC. Si le label est `sync:spec-et-code`, vérifie que le statut du UC est revenu à `prêt` avec une nouvelle version, et récupère le diff de la spec (`git log -p --follow -- specs/use-cases/UC-###-*.md`, dernière modification). Si le UC est encore `à synchroniser`, arrête-toi : la spec n'est pas prête.
3. Présente ton analyse avant tout code : ce que dit le ticket, ce que dit le UC, quelles lignes de la spec ont changé (le cas échéant), quels tests `T-###-##` sont concernés, et le plan. Attends ma validation.
4. Crée la branche `ticket/$ARGUMENTS-<nom>`.
5. `sync:code-seul` : écris d'abord le test qui reproduit le défaut (nommé d'après le `T-` concerné s'il existe, sinon `regression #$ARGUMENTS …`), constate qu'il échoue, puis corrige. Commits `fix(UC-###): #$ARGUMENTS …`.
   `sync:spec-et-code` : traite les lignes modifiées de la spec comme une mini-implémentation (`CLAUDE.md` §4) : table de correspondance limitée aux changements, code, tests mis à jour ou ajoutés pour chaque `T-` modifié. Commits `feat(UC-###): #$ARGUMENTS …` ou `fix(UC-###): #$ARGUMENTS …` selon le type du ticket.
6. Contrôle d'écart sur les lignes concernées, puis `npm run lint`, `npm run typecheck`, `npm run test`, `npm run test:e2e`, `npm run build`, `npm run check:specs`.
7. Mets à jour la section 14 du UC (PR, écarts), ouvre la PR avec le template et `Closes #$ARGUMENTS` dans la description.
8. Compte rendu pour le journal du POC (entrée du ticket) : la spec a-t-elle été modifiée avant le code, questions posées, temps approximatif, et surtout : **le ticket aurait-il pu être évité par une spec plus précise ?** Si oui, dis en une phrase ce qui manquait.

Ne fusionne pas. Ne modifie pas la spec.
