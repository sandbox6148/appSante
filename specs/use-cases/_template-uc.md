---
id: UC-000
titre: Verbe à l'infinitif + objet
domaine: Évolution physique | Repas | Entraînement | Objets connectés | Tableau de bord | Profil et objectifs | Données
acteur: Utilisateur
statut: en rédaction
version: 0.1
priorite: It. 1 | It. 2 | Plus tard
complexite: S | M | L
objectifs: [O-01]
nfr: [NFR-01, NFR-04]
regles_domaine: [RG-D01]
depend_de: []
approuve_le:
pr: []
tickets: []
---

<!--
  TEMPLATE DE CAS D'USAGE — Vita
  Copier ce fichier en UC-###-nom.md, remplir l'en-tête, puis chaque section.
  Les commentaires <!-- --> sont des consignes de rédaction : les supprimer une fois la section écrite.
  Règle d'or : ce document est la SEULE source fonctionnelle de l'agent qui implémentera.
  Tout ce qui n'y est pas écrit sera soit demandé (ticket « retour analyste »), soit absent du produit.
  Vocabulaire : uniquement celui du glossaire (specs/domain/modele-domaine.md).
  Check-list d'approbation : docs/workflow.md §5.
-->

# UC-000 — Titre du cas d'usage

## 1. Résumé

<!-- Deux à trois phrases : ce que l'utilisateur veut obtenir, dans quel moment d'usage (cf. vision §4), et ce qui fait que c'est réussi de son point de vue. -->

## 2. Acteurs et déclencheur

| | |
|---|---|
| **Acteur principal** | Utilisateur |
| **Acteurs secondaires** | <!-- Oura Cloud, Apple Santé, Open Food Facts, Appareil — ou « aucun » --> |
| **Déclencheur** | <!-- Ce qui amène l'utilisateur à ouvrir ce cas d'usage : « le matin, après le réveil », « à la fin d'un repas », « chaque dimanche »… --> |
| **Moment d'usage** | <!-- Le matin / Aux repas / En séance / Chaque semaine / Régulièrement --> |

## 3. Préconditions

<!-- État requis avant de commencer. Une par ligne, vérifiable. Exemple : « Aucune » ou « Un jeton Oura valide est enregistré (UC-015) ». -->

## 4. Postconditions

**En cas de succès :** <!-- ce qui est vrai après le scénario nominal : données créées/modifiées, ce que l'utilisateur voit. -->

**Garanties minimales (même en cas d'échec ou d'abandon) :** <!-- ce qui reste vrai quoi qu'il arrive : aucune donnée partielle enregistrée, saisie en cours conservée (NFR-06)… -->

## 5. Scénario nominal

<!--
  Étapes numérotées. Chaque étape est une action de l'utilisateur OU une réponse du système, jamais les deux.
  Formulation : « L'utilisateur … » / « Le système … ». Pas de détail d'interface ici (ça vient en §9), mais les données échangées sont nommées avec le glossaire.
  Terminer sur un état observable.
-->

1. L'utilisateur …
2. Le système …
3. …

## 6. Extensions

<!--
  Une extension par cas alternatif ou d'erreur, rattachée à l'étape qu'elle interrompt : « 3a », « 3b », « 5a »…
  Forme : condition → étapes → où reprend le scénario (« retour en 3 » ou « fin du cas d'usage »).
  Penser à : donnée invalide, donnée manquante, doublon, abandon, interruption (NFR-06), absence de réseau si acteur externe, erreur de l'acteur externe (NFR-19).
-->

**3a. Condition** :
1. Le système …
2. Retour en 3.

## 7. Données

<!-- Une ligne par donnée saisie ou affichée. Nom = glossaire. Le message d'erreur renvoie à un MSG-###-## de la section 10. -->

| Donnée (glossaire) | Type / unité | Obligatoire | Contraintes | Valeur par défaut | Erreur → message |
|---|---|---|---|---|---|
| | | | | | |

## 8. Règles

<!-- Règles propres à ce UC, testables. Référencer les règles de domaine (RG-D##) appliquées sans les recopier. -->

| ID | Règle |
|---|---|
| **RG-000-01** | |

Règles de domaine appliquées : RG-D01, …

## 9. Interface

<!--
  Description STRUCTURELLE de chaque écran (pas de maquette pixel, mais assez pour que l'agent ne choisisse rien de fonctionnel) :
  - zones et ordre de lecture (du haut vers le bas, ce qui est visible sans défilement à 360 px)
  - action principale (une seule) et actions secondaires
  - états : vide, chargement, erreur, succès (NFR-30) — avec les messages de la section 10
  - comportement responsive : ce qui change à 768 px et 1280 px
  - accessibilité spécifique : ordre de focus, ce qui est annoncé, équivalents textuels, cibles (NFR-01 à NFR-03)
  - navigation : d'où on vient, où on va après
  Une maquette peut être jointe dans specs/ui/ et référencée ici ; elle illustre, elle ne remplace pas la description.
-->

### 9.1 Écran « … »

**Zones et ordre de lecture**

**Action principale** :

**États** : vide — chargement — erreur — succès

**Responsive** :

**Accessibilité** :

**Navigation** :

## 10. Messages

<!-- TOUS les textes visibles : titres d'écran, libellés de champs, aides, boutons, erreurs, confirmations, états vides, annonces aux technologies d'assistance. Français courant, neutre (NFR-31). L'agent n'invente aucun texte. -->

| ID | Contexte | Texte |
|---|---|---|
| **MSG-000-01** | Titre de l'écran | |
| **MSG-000-02** | Libellé du champ … | |
| **MSG-000-03** | Erreur : … | |
| **MSG-000-04** | État vide | |
| **MSG-000-05** | Confirmation de succès (annoncée) | |

## 11. Exigences non fonctionnelles spécifiques

<!-- Seulement ce qui précise ou renforce une NFR pour ce UC (ex. : « la saisie complète prend moins de 45 s », « fonctionne hors ligne y compris l'étape 4 »). Sinon : « Aucune au-delà des NFR référencées dans l'en-tête ». -->

## 12. Hors périmètre et questions ouvertes

<!-- Ce que ce UC ne couvre volontairement pas (et quel UC le couvrira). Toute question encore ouverte doit être résolue ou déclarée hors périmètre avant l'approbation. -->

## 13. Tests d'acceptation

<!--
  Un test par chemin : le scénario nominal, puis chaque extension. Données fictives précises (valeurs, dates).
  Chaque test cite les règles qu'il vérifie. Le développeur implémentera un test automatisé par ligne, nommé avec l'identifiant.
-->

| ID | Vérifie | Étant donné | Quand | Alors |
|---|---|---|---|---|
| **T-000-01** | Scénario nominal ; RG-000-01 | | | |
| **T-000-02** | Extension 3a | | | |

## 14. Réalisation

<!-- Rempli par la casquette développeur, seule section du UC qu'elle modifie. -->

| | |
|---|---|
| **PR** | |
| **Date de livraison** | |
| **Écarts constatés** | <!-- « Aucun » ou liste : point du UC, écart, décision (corrigé / ticket #NN) --> |
| **Décisions techniques** | <!-- choix non couverts par les ADR, en une ligne chacun ; si structurant → ADR --> |
| **Retours analyste ouverts** | <!-- tickets #NN --> |

## 15. Historique

| Version | Date | Motif | Ticket |
|---|---|---|---|
| 0.1 | | Création | — |
