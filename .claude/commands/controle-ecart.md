---
description: Auditer l'écart entre un cas d'usage livré et le code (revue indépendante, fin d'itération ou avant fusion)
argument-hint: UC-###
---

Fais un **audit d'écart** entre la spec **$ARGUMENTS** et le code, comme un relecteur qui n'a pas participé à l'implémentation. Ne modifie rien : tu produis un rapport.

1. Lis le UC dans sa version courante, le catalogue, `specs/domain/modele-domaine.md`, les NFR de l'en-tête, `CLAUDE.md`.
2. Repère le code de la feature concernée, ses tests, ses `messages.ts`, ses routes, et la PR référencée dans la section 14.
3. Vérifie point par point et rends un tableau avec, pour chaque ligne, **conforme / écart / non vérifiable** et la preuve (fichier et ligne, nom du test) :
   - chaque étape du scénario nominal ;
   - chaque extension ;
   - chaque règle `RG-###-##` et chaque règle de domaine référencée ;
   - chaque donnée du tableau §7 (type, obligatoire, contraintes, défaut, message d'erreur) ;
   - chaque message `MSG-###-##` : présent dans `messages.ts` avec la bonne clé, texte identique, utilisé à l'endroit prévu ; signale tout texte visible qui n'a pas d'identifiant ;
   - chaque test `T-###-##` : un test automatisé nommé d'après lui existe, teste bien ce que la ligne décrit, et passe ;
   - la section Interface : zones, action principale, états, responsive, accessibilité ;
   - les NFR de l'en-tête.
4. Vérifie séparément les **règles de `CLAUDE.md`** : sens des dépendances, appels réseau, dépendances autorisées, textes en dur, données réelles, `any`, tests ignorés.
5. Termine par : le nombre d'écarts par catégorie (fonctionnel / texte / test / accessibilité / fondations), les trois écarts les plus importants, et ce que le UC aurait dû préciser pour éviter chaque écart fonctionnel — c'est cette dernière liste qui alimente le journal du POC (hypothèse H1).
