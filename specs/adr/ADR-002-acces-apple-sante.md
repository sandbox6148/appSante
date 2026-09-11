# ADR-002 — Accès aux données Apple Santé (Apple Watch) depuis une application web

| | |
|---|---|
| **Statut** | proposé (décision attendue avant la rédaction du UC-017 ; n'influence pas les itérations 1 et 2) |
| **Date** | 11 septembre 2026 |
| **Décideur** | Casquette développeur |
| **Concerne** | UC-017, UC-019, UC-020, UC-021 ; NFR-10, NFR-18, NFR-19 ; RG-D04, RG-D05 |

## Contexte

Les données de l'Apple Watch (pas, séances, fréquence cardiaque, énergie active, sommeil si la montre est portée la nuit) sont détenues par Apple Santé sur l'iPhone. Apple n'expose **aucune API web ou cloud** pour y accéder : seule une application iOS native, via HealthKit, y a accès programmatique. Vita étant une application web (cadrage), il faut un moyen de faire sortir ces données de l'iPhone vers l'application, sans service tiers non maîtrisé (NFR-10) et de façon rejouable sans doublon (RG-D04).

La bague Oura, elle, dispose d'une API cloud (UC-016) ; l'application Oura écrit aussi dans Apple Santé, mais l'inverse n'est pas vrai : les données propres à la montre ne remontent pas dans l'API Oura. Le passage par Oura ne couvre donc pas le besoin.

## Options considérées

### Option A — Export complet d'Apple Santé, importé dans Vita

L'app Santé permet d'exporter toutes les données (`export.zip` contenant `export.xml`). Vita lit ce fichier via le sélecteur de fichiers et en extrait les notions utiles.

Avantages : aucune dépendance, aucun outil supplémentaire, historique complet disponible en une fois.

Inconvénients : fichier volumineux (plusieurs centaines de Mo après quelques années), export manuel long et fastidieux, inadapté à un usage hebdomadaire ; analyse XML en flux à implémenter côté navigateur.

### Option B — Raccourci iOS qui exporte les échantillons récents dans un fichier JSON

L'app Raccourcis (Apple, préinstallée) sait lire des échantillons de santé (« Rechercher des échantillons de santé ») sur une période et écrire un fichier dans Fichiers/iCloud Drive, à la demande ou par automatisation quotidienne. Vita importe ce JSON via le sélecteur de fichiers, avec un **schéma de fichier défini par le UC-017**.

Avantages : gratuit, natif, automatisable, fichiers petits (une semaine de données), format sous notre contrôle, rejouable sans doublon par (source, notion, date).

Inconvénients : le raccourci est un artefact à maintenir hors du dépôt de code (mais on peut en versionner la description) ; l'import reste un geste (choisir le fichier) ; les capacités de l'action « santé » de Raccourcis évoluent avec iOS.

### Option C — Application tierce d'export automatique vers un point de réception

Des applications iOS du commerce exportent Apple Santé en JSON/CSV vers un stockage ou une URL, en tâche de fond.

Avantages : automatisation la plus complète.

Inconvénients : dépendance à un éditeur tiers payant qui lit toutes les données de santé ; un point de réception réseau contredit l'option A de l'ADR-001 ; contraire à l'esprit de NFR-10.

### Option D — Application iOS native compagnon

Écartée pour le POC : contraire au cadrage (application web) ; pourra être reconsidérée après le POC si l'usage le justifie.

## Décision

**Option B** pour l'usage courant, **complétée par l'option A** pour un chargement initial de l'historique si le besoin apparaît (UC distinct, hors POC). Le UC-017 spécifiera le schéma JSON attendu, la période par défaut (les 8 derniers jours, pour recouvrir la semaine et absorber un import manqué grâce à l'idempotence) et le comportement en cas de fichier hors schéma (NFR-19). La description du raccourci (actions, période, nom de fichier) sera versionnée dans `docs/raccourci-apple-sante.md` pour pouvoir le recréer.

## Conséquences

Aucun impact sur les itérations 1 et 2 du POC. Le tableau de bord (UC-020) et le bilan (UC-021) doivent prévoir la coexistence de deux sources pour une même notion (RG-D05) : pas Oura et pas Apple Santé, sommeil Oura et sommeil Watch — avec source de préférence par notion. L'adaptateur `src/data/sources/applehealth/` ne fera **aucun appel réseau** : il lit un fichier.

## Points à vérifier

- Les échantillons de santé accessibles à Raccourcis sur la version d'iOS en usage (pas, distance, énergie active, séances avec type et durée, fréquence cardiaque, sommeil) — à vérifier par un essai avant la rédaction du UC-017.
- La possibilité d'automatiser l'exécution quotidienne du raccourci sans confirmation.
- Le volume d'un export complet (option A) et le temps d'analyse dans le navigateur, si cette option est activée.
