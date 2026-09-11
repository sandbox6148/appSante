# Exigences non fonctionnelles — Vita

| | |
|---|---|
| **Statut** | v1.0 — validé le 11 septembre 2026 (jalon J1, inception) |
| **Date** | 11 septembre 2026 |
| **Documents liés** | [Vision](vision.md) · [Catalogue des UC](use-cases/catalogue.md) · [Modèle de domaine](domain/modele-domaine.md) |

Les exigences ci-dessous s'appliquent à **tous** les cas d'usage, sauf mention contraire. Chacune est formulée pour être vérifiable et indique comment elle est vérifiée. Un UC les référence par leur identifiant (`NFR-##`) et peut les préciser (par exemple un temps de réponse plus strict) mais pas les affaiblir. Elles sont reprises dans les fondations du dépôt (règles pour l'agent, stratégie de tests) à l'itération 0.

## 1. Accessibilité

| ID | Exigence | Vérification |
|---|---|---|
| **NFR-01** | Conformité **WCAG 2.1 niveau AA** sur tous les écrans livrés. En particulier : tout est utilisable au clavier seul, avec un ordre de tabulation logique et un focus toujours visible ; chaque champ a un libellé visible et programmatique ; les erreurs de saisie sont identifiées à côté du champ, décrites en texte et annoncées aux technologies d'assistance ; les contrastes respectent 4,5:1 (texte) et 3:1 (composants et graphiques) ; l'information n'est jamais portée par la couleur seule ; les contenus restent lisibles et fonctionnels à 200 % de zoom et à 320 px de large ; les changements dynamiques (apports recalculés, import terminé) sont annoncés. | Audit automatisé (axe) sur chaque page dans les tests + revue manuelle au clavier et au lecteur d'écran (VoiceOver) à chaque UC livré |
| **NFR-02** | Les **graphiques** (courbes d'évolution, sommeil) ont un équivalent textuel : un résumé (valeur actuelle, variation, minimum, maximum sur la période) et un accès aux données sous forme de tableau. | Revue manuelle au lecteur d'écran |
| **NFR-03** | Les **cibles tactiles** mesurent au moins 44 × 44 px, avec un espacement suffisant pour éviter les erreurs de doigt, en particulier dans les écrans utilisés en séance ou aux repas. | Revue de l'écran à 360 px ; test sur téléphone |

## 2. Responsive et mobile d'abord

| ID | Exigence | Vérification |
|---|---|---|
| **NFR-04** | Chaque écran est conçu et vérifié d'abord à **360 px** de large, puis à 768 px et 1280 px ; aucun défilement horizontal ; les tableaux se réorganisent ou se font défiler dans leur propre conteneur. | Captures aux trois largeurs dans la revue de chaque UC |
| **NFR-05** | Les actions de saisie fréquentes (mesure, repas) sont réalisables à **une main** sur téléphone : action principale atteignable en bas d'écran, claviers adaptés au type de donnée (numérique pour les valeurs), pas de saisie libre là où une liste ou une valeur par défaut suffit. | Revue UX de chaque UC de saisie |
| **NFR-06** | Aucune saisie en cours n'est perdue en cas d'interruption (changement d'application, appel, mise en veille, perte de réseau) : le formulaire est retrouvé en l'état à la réouverture. | Test manuel du scénario d'interruption sur téléphone |

## 3. Application installable et hors ligne

| ID | Exigence | Vérification |
|---|---|---|
| **NFR-07** | L'application est une **PWA installable** sur iPhone (Safari) et sur ordinateur, avec icône, écran de démarrage et mode plein écran. | Installation testée sur les deux cibles |
| **NFR-08** | La **consultation et la saisie fonctionnent hors ligne** ; seuls les imports et la recherche Open Food Facts nécessitent le réseau, et l'absence de réseau est signalée clairement à ces endroits, sans erreur technique. | Test en mode avion sur les UC livrés |
| **NFR-09** | Une nouvelle version de l'application est proposée sans casser les données existantes : les données locales sont **migrées** automatiquement quand leur structure change. | Test de migration dans la stratégie de tests (ADR-003) |

## 4. Données personnelles et sécurité

| ID | Exigence | Vérification |
|---|---|---|
| **NFR-10** | **Local d'abord** : toutes les données (mesures, repas, photos, données importées) sont stockées sur l'appareil de l'utilisateur ; aucune donnée n'est envoyée à un service tiers en dehors des appels aux API officielles des sources (Oura, Open Food Facts) strictement nécessaires à l'import. | Revue des appels réseau (aucun domaine autre que ceux des sources) |
| **NFR-11** | **Aucune télémétrie**, aucun traceur, aucune police ou ressource chargée depuis un domaine tiers à l'exécution. | Revue des appels réseau |
| **NFR-12** | Les **secrets** (jeton Oura) sont stockés localement, jamais dans le dépôt, jamais affichés en clair après saisie (masqués, avec possibilité de révéler), et retirables en un geste. | Revue de code ; test du UC-015 |
| **NFR-13** | Le dépôt ne contient **aucune donnée réelle** de l'utilisateur : les tests, les captures et les démonstrations utilisent des jeux de données fictifs, identifiés comme tels. | Revue de chaque PR |
| **NFR-14** | L'utilisateur peut à tout moment **exporter** l'intégralité de ses données dans un format ouvert et lisible, et **effacer** toutes ses données de l'appareil. | UC-022 ; fonction d'effacement testée |

## 5. Performance

| ID | Exigence | Vérification |
|---|---|---|
| **NFR-15** | Le tableau de bord du jour s'affiche en moins de **2 secondes** à l'ouverture sur un téléphone de milieu de gamme, avec un an de données. | Mesure sur jeu de données fictif d'un an |
| **NFR-16** | Toute interaction locale (recalcul des apports, filtrage, changement de période) répond en moins de **200 ms** ; au-delà, un indicateur de progression est affiché. | Mesure dans les tests d'interface |
| **NFR-17** | Un import Oura d'une semaine se termine en moins de **30 secondes** et affiche sa progression ; il peut être interrompu sans corrompre les données. | Test du UC-016 avec API simulée |

## 6. Imports et intégrité des données

| ID | Exigence | Vérification |
|---|---|---|
| **NFR-18** | Tout import est **idempotent** (RG-D04) et **journalisé** (notion Import) : l'utilisateur peut voir quand, quoi et combien a été importé, et les erreurs rencontrées, en langage clair. | Tests d'idempotence dans le UC d'import |
| **NFR-19** | Une erreur de source externe (jeton invalide, API indisponible, réponse inattendue) est **expliquée à l'utilisateur** avec l'action possible (renouveler le jeton, réessayer plus tard) et ne laisse jamais l'application dans un état incohérent. | Tests des cas d'erreur avec API simulée |
| **NFR-20** | Les calculs (apports, variations, moyennes) sont **déterministes** et testés unitairement avec des valeurs de référence. | Tests unitaires |

## 7. Qualité, tests et traçabilité

| ID | Exigence | Vérification |
|---|---|---|
| **NFR-21** | Chaque UC livré est couvert par des **tests automatisés** correspondant à ses tests d'acceptation (`T-###-##`), exécutés à chaque PR ; une PR dont les tests échouent n'est pas fusionnée. | Intégration continue sur le dépôt |
| **NFR-22** | Le code de chaque UC est **traçable** vers son identifiant : la PR référence le UC, les tests portent l'identifiant du test d'acceptation, et l'écran affiche son UC dans une info de version accessible aux seuls besoins de recette (non visible en usage normal). | Revue de chaque PR |
| **NFR-23** | Les règles d'architecture et de code fixées dans les fondations sont **vérifiables automatiquement** quand c'est possible (lint, formatage, dépendances autorisées) pour que l'agent et la revue ne reposent pas seulement sur la lecture. | Outils de vérification dans la CI |

## 8. Langue, formats et compatibilité

| ID | Exigence | Vérification |
|---|---|---|
| **NFR-24** | L'interface est en **français** ; les dates, nombres et unités suivent les conventions françaises (jour/mois/année, virgule décimale à l'affichage, unités métriques, RG-D06). | Revue de chaque écran |
| **NFR-25** | Navigateurs cibles : **Safari iOS** de la version courante et de la précédente (usage principal, PWA sur iPhone) ; Chrome et Firefox de bureau, versions courantes. | Tests d'interface sur ces navigateurs |
| **NFR-26** | Le vocabulaire de l'interface est celui du [glossaire](domain/modele-domaine.md) : un même concept porte le même nom partout (écran, message, aide). | Revue de chaque écran |

## 9. Principes de clarté d'interface

Ces principes sont les déclinaisons vérifiables des principes de conception de la vision ; ils s'appliquent à chaque écran.

| ID | Exigence | Vérification |
|---|---|---|
| **NFR-27** | **Une action principale par écran**, visuellement dominante ; les actions secondaires sont présentes mais en retrait ; les actions destructrices sont distinguées et annulables (RG-D09). | Revue UX de chaque UC |
| **NFR-28** | Toute valeur affichée est accompagnée de son **unité et de sa date** (ou de sa période) ; toute valeur importée indique sa **source**. | Revue UX de chaque UC |
| **NFR-29** | Les **valeurs par défaut** réduisent la saisie : date du jour, dernière valeur connue, moment de la journée déduit de l'heure, dernier repas comparable proposé en reprise. Elles sont toujours modifiables. | Revue UX des UC de saisie |
| **NFR-30** | Chaque écran a un **état vide** utile (que faire quand il n'y a pas encore de donnée), un **état de chargement** et un **état d'erreur** rédigés, jamais un écran blanc ou un message technique. | Revue UX de chaque UC |
| **NFR-31** | Les textes sont **neutres et factuels** : pas de jugement de valeur sur les données (RG-D08), pas de jargon technique, pas d'anglicisme quand un mot français courant existe. | Revue des textes de chaque UC |
