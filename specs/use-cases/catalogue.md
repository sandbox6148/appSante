# Catalogue des cas d'usage — Vita

| | |
|---|---|
| **Statut** | v1.0 — validé le 11 septembre 2026 (jalon J1, inception) |
| **Date** | 11 septembre 2026 |
| **Documents liés** | [Vision](../vision.md) · [Modèle de domaine](../domain/modele-domaine.md) · [NFR](../nfr.md) · [Cadrage du POC](../../docs/poc/cadrage-poc.md) |

Ce catalogue est la **liste de référence** des cas d'usage (UC) de Vita. Chaque UC y a un identifiant unique et définitif, un objectif en une phrase, une priorité et une estimation de complexité. Le catalogue ne contient pas le détail des UC : chaque UC priorisé fait l'objet d'un fichier `UC-###-nom.md` dans ce dossier, rédigé selon le template, puis approuvé avant implémentation.

## 1. Conventions

**Identifiant.** `UC-###`, numéro séquentiel attribué une fois pour toutes dans l'ordre du catalogue ; un UC abandonné garde son numéro et passe au statut « abandonné », jamais réattribué. Les UC sont groupés par domaine dans le catalogue, mais la numérotation reste unique et continue.

**Nom.** Un verbe à l'infinitif et un objet, du point de vue de l'utilisateur (« Enregistrer un repas »), jamais du point de vue du système.

**Niveau.** Tous les UC du catalogue sont au niveau *objectif utilisateur* : ce qu'on vient faire dans l'application en une séance d'utilisation. Les sous-fonctions (par exemple « créer un aliment à la volée » pendant la saisie d'un repas) sont décrites comme des extensions ou des sous-flux **dans** le UC qui les utilise, pas comme des UC séparés, sauf si elles constituent aussi un objectif en soi.

**Complexité.** S (un écran, une notion, pas de dépendance externe), M (plusieurs écrans ou plusieurs notions, calculs), L (dépendance externe, import, ou logique métier substantielle). C'est une estimation d'inception, revue à la rédaction.

**Priorité.** *It. 1* et *It. 2* : périmètre de la v1 (POC), conformément au cadrage. *Plus tard* : hors POC, à traiter ensuite avec le même workflow.

**Statut** (cycle de vie d'un UC) : `identifié` → `en rédaction` → `prêt` (approuvé, implémentable) → `en implémentation` → `livré` → éventuellement `à synchroniser` quand un ticket le rouvre, puis de nouveau `prêt` → `livré`. Un UC peut aussi être `abandonné`.

## 2. Catalogue

### Profil et objectifs

| ID | Cas d'usage | Objectif | Dépend de | Complexité | Priorité | Statut |
|---|---|---|---|---|---|---|
| **UC-001** | Renseigner mon profil | Saisir taille, date de naissance, unités et sources de préférence, pour que les calculs (IMC, apports cibles) et les affichages soient corrects. | — | S | Plus tard | identifié |
| **UC-002** | Définir un objectif | Fixer une cible sur une grandeur suivie (poids, pas, sommeil, apport) avec une échéance, pour la voir rapportée sur le tableau de bord et les courbes. | UC-001 | S | Plus tard | identifié |

### Évolution physique

| ID | Cas d'usage | Objectif | Dépend de | Complexité | Priorité | Statut |
|---|---|---|---|---|---|---|
| **UC-003** | Enregistrer une mesure corporelle | Noter à une date mon poids et, au choix, mes mensurations, en moins d'une minute, avec la dernière valeur connue proposée par défaut. | — | S | **It. 1** | identifié |
| **UC-004** | Consulter l'évolution de mes mesures | Voir, par grandeur, la courbe et la variation sur 1, 3, 6 et 12 mois, et la liste des mesures pour les corriger ou les supprimer. | UC-003 | S | **It. 1** | identifié |
| **UC-005** | Ajouter une photo d'évolution | Prendre ou choisir une photo à une date sous un angle donné, stockée localement. | — | M | Plus tard | identifié |
| **UC-006** | Comparer mes photos avant/après | Mettre côte à côte deux photos du même angle à deux dates, avec les mesures correspondantes. | UC-005, UC-003 | M | Plus tard | identifié |

### Repas

| ID | Cas d'usage | Objectif | Dépend de | Complexité | Priorité | Statut |
|---|---|---|---|---|---|---|
| **UC-007** | Enregistrer un repas | Noter ce que j'ai mangé à un moment de la journée, à partir de mes aliments ou en créant un aliment à la volée, et voir les apports calculés. Inclut la reprise d'un repas précédent en un geste. | — | M | **It. 1** | identifié |
| **UC-008** | Gérer mes aliments | Consulter, modifier, supprimer mes aliments et leurs portions usuelles ; marquer des favoris. | UC-007 | S | Plus tard | identifié |
| **UC-009** | Rechercher un aliment dans Open Food Facts | Trouver un produit par nom ou code-barres et l'ajouter à mes aliments avec ses valeurs nutritionnelles. | UC-007 | L | Plus tard | identifié |
| **UC-010** | Consulter mon bilan alimentaire | Voir les apports du jour et de la semaine, par repas et par nutriment, rapportés à mes objectifs. | UC-007 | M | Plus tard | identifié |

### Entraînement

| ID | Cas d'usage | Objectif | Dépend de | Complexité | Priorité | Statut |
|---|---|---|---|---|---|---|
| **UC-011** | Créer un plan d'entraînement | Définir une période, un objectif et des séances modèles par jour de semaine, avec leurs exercices et prescriptions. | — | L | Plus tard | identifié |
| **UC-012** | Réaliser une séance prévue | Dérouler la séance modèle du jour, cocher les séries, ajuster charges et répétitions, terminer la séance. | UC-011 | L | Plus tard | identifié |
| **UC-013** | Enregistrer une séance libre | Noter une séance faite hors plan (course, sortie vélo, séance improvisée) avec ses exercices ou sa durée. | — | M | Plus tard | identifié |
| **UC-014** | Consulter ma progression sur un exercice | Voir l'historique des charges, répétitions ou temps d'un exercice, et le meilleur résultat. | UC-012 ou UC-013 | M | Plus tard | identifié |

### Objets connectés

| ID | Cas d'usage | Objectif | Dépend de | Complexité | Priorité | Statut |
|---|---|---|---|---|---|---|
| **UC-015** | Configurer l'accès à Oura | Enregistrer mon jeton d'accès personnel, vérifier qu'il fonctionne, le remplacer ou le retirer. | — | S | **It. 2** | identifié |
| **UC-016** | Importer mes données Oura | Récupérer sommeil, récupération, activité et séances détectées sur une période, sans doublon en cas de rejeu, et voir le résultat de l'import. | UC-015 | **L** | **It. 2** | identifié |
| **UC-017** | Importer mes données Apple Santé | Récupérer pas, séances, fréquence cardiaque et énergie de l'Apple Watch selon le mode d'accès retenu (ADR-002). | ADR-002 | L | Plus tard | identifié |
| **UC-018** | Consulter mon sommeil et ma récupération | Voir, par nuit et par semaine, durée, phases, efficacité, score, fréquence cardiaque au repos et variabilité. | UC-016 | M | Plus tard | identifié |
| **UC-019** | Consulter mon activité | Voir, par jour et par semaine, pas, distance, énergie active et séances. | UC-016 ou UC-017 | M | Plus tard | identifié |

### Tableau de bord

| ID | Cas d'usage | Objectif | Dépend de | Complexité | Priorité | Statut |
|---|---|---|---|---|---|---|
| **UC-020** | Consulter le tableau de bord du jour | Voir sur un écran où j'en suis aujourd'hui : dernière mesure et variation, repas et apports du jour, et — après l'évolution prévue en itération 2 — nuit passée, récupération et activité. | UC-003, UC-007 ; puis UC-016 | M | **It. 1**, puis évolution en **It. 2** | identifié |
| **UC-021** | Consulter le bilan de la semaine | Voir la semaine écoulée : régularité des séances, moyennes de sommeil et d'activité, apports moyens, variation de poids. | UC-020 | M | Plus tard | identifié |

### Données

| ID | Cas d'usage | Objectif | Dépend de | Complexité | Priorité | Statut |
|---|---|---|---|---|---|---|
| **UC-022** | Exporter mes données | Obtenir une copie complète et lisible de toutes mes données dans un format ouvert. | — | M | Plus tard | identifié |
| **UC-023** | Sauvegarder et restaurer mes données | Produire une sauvegarde complète (photos comprises) et la restaurer sur un autre appareil ou après réinstallation. | — | L | Plus tard | identifié |

## 3. Périmètre v1 par itération

### Itération 1 — boucle nominale

Quatre UC simples et indépendants les uns des autres (sauf UC-004 qui lit ce que UC-003 écrit, et UC-020 qui agrège UC-003 et UC-007), pour rejouer quatre fois le flux « nouveau cas d'usage » dans des conditions comparables.

| Ordre | UC | Pourquoi celui-là |
|---|---|---|
| 1 | UC-003 Enregistrer une mesure corporelle | Le plus simple : un formulaire, une notion. Sert d'étalon pour les mesures d'effort et de rodage du template. |
| 2 | UC-007 Enregistrer un repas | Formulaire plus riche (lignes, calculs, création à la volée) : éprouve le template sur des extensions et des règles de calcul. |
| 3 | UC-004 Consulter l'évolution de mes mesures | Première restitution (courbe, périodes) : éprouve la spécification d'un écran de consultation et son accessibilité (données graphiques). |
| 4 | UC-020 Consulter le tableau de bord du jour (v1, saisies manuelles) | Agrégation de plusieurs notions ; livré volontairement dans une version qui sera étendue en itération 2. |

### Itération 2 — synchronisation

| Ordre | Élément | Pourquoi |
|---|---|---|
| 5 | UC-015 Configurer l'accès à Oura | Petit UC préalable, isole la gestion du secret. |
| 6 | UC-016 Importer mes données Oura | Le UC complexe du POC : dépendance externe, idempotence, gestion d'erreurs, données de test fictives. |
| 7 | Ticket d'évolution sur UC-020 | Enrichir le tableau de bord avec les données Oura : un UC livré repasse par spec → approbation → code. |
| 8 | Au moins deux tickets de bug | Issus de la recette « casquette métier » des UC de l'itération 1 ; traités par le flux de synchronisation. |

### Plus tard

Tout le reste du catalogue (UC-001, 002, 005, 006, 008 à 014, 017 à 019, 021 à 023), dans un ordre à décider après le bilan du POC. Suggestion de premier lot post-POC : UC-001 (profil), UC-005/006 (photos), UC-011/012 (entraînement), UC-023 (sauvegarde, indispensable avant d'accumuler des données réelles).

## 4. Traçabilité

Chaque UC détaillé référence : les objectifs produit qu'il sert (`O-##`), les règles de domaine qu'il applique (`RG-D##`) et ses règles propres (`RG-###-##`), les exigences non fonctionnelles qui le contraignent (`NFR-##`), ses tests d'acceptation (`T-###-##`) et, une fois livré, la ou les pull requests et les tickets qui l'ont fait évoluer. Les conventions complètes sont fixées dans les fondations du dépôt (itération 0).
