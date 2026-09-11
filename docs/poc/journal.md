# Journal d'observation du POC

> **Rappel de l'objet du POC** : le produit est le support, le process est l'objet. Une itération sans journal est une itération invalide ([cadrage](cadrage-poc.md) §6 et §8). Ce journal est tenu **à chaud**, à chaque session, par la casquette du moment. Il alimente le [bilan](bilan.md).

Les temps sont en minutes, indicatifs. Les gabarits d'entrée sont en fin de document (§7) : copier, ne pas remplir de mémoire plusieurs jours après.

## 1. Chronologie

| Date | Casquette | Session | Résumé | Entrée détaillée |
|---|---|---|---|---|
| 2026-09-11 | — | Cadrage (J0) | Cadrage rédigé et validé ; 7 hypothèses, 3 itérations, protocole de casquettes | §2 |
| 2026-09-11 | Analyste | Inception (J1) | Vision, catalogue de 23 UC, modèle de domaine, 31 NFR rédigés et validés | §2 |
| 2026-09-11 | — | Squelette (J2) | Dépôt, templates, ADR proposés, CLAUDE.md, commandes, CI, journal | §2 |

## 2. Jalons J0 à J2 — observations

**Cadrage (J0).** Le plus utile a été de fixer les hypothèses avant tout le reste : elles ont immédiatement dicté ce que le journal doit relever. Décisions prises au cadrage : web/PWA, workflow spec-driven en solo, dépôt GitHub, séparation stricte pro/perso.

**Inception (J1).** Rédigée en une passe. Points à surveiller pour la suite : le catalogue a été priorisé sans avoir encore rédigé un seul UC — la complexité S/M/L est une estimation qu'il faudra confronter à l'effort réel (H3) ; le modèle de domaine a été écrit avant les UC, on notera à chaque UC s'il a fallu le modifier (§4 du modèle).

**Squelette (J2).** Les ADR-001 à 003 sont au statut `proposé` : ils doivent être relus et acceptés par la casquette développeur avant `/fondations`. Le template de UC a quinze sections ; c'est volontairement exigeant, et le premier UC (UC-003) servira à mesurer si c'est tenable pour un UC de complexité S.

## 3. Itération 0 — fondations

*(à remplir par la casquette développeur après `/fondations`)*

| Mesure | Valeur |
|---|---|
| Temps total | |
| ADR modifiés avant acceptation (lesquels, pourquoi) | |
| Questions posées par l'agent | |
| Décisions techniques non couvertes par les ADR | |
| Règles de `CLAUDE.md` gênantes ou ambiguës | |
| CI verte du premier coup ? | |

## 4. Itération 1 — boucle nominale

### UC-003 — Enregistrer une mesure corporelle

| Mesure | Valeur |
|---|---|
| **Rédaction (analyste)** | |
| Temps de rédaction | |
| Allers-retours avant approbation | |
| Sections du template difficiles ou inutiles | |
| Modèle de domaine modifié ? | |
| **Implémentation (développeur)** | |
| Temps d'implémentation | |
| Questions posées par l'agent (lesquelles) | |
| Points ambigus détectés par l'agent → tickets retour analyste | |
| Relances nécessaires | |
| Écarts au contrôle d'écart (fonctionnel / texte / test / accessibilité / fondations) | |
| Violations des fondations en revue | |
| Tests `T-` : nombre spécifié / automatisés / verts | |
| Décisions techniques hors ADR | |
| **Tests usine (analyste)** | |
| Résultat, écarts → tickets | |
| **Ce que je changerais** (template, fondations, protocole) | |

### UC-007 — Enregistrer un repas

*(même gabarit)*

### UC-004 — Consulter l'évolution de mes mesures

*(même gabarit)*

### UC-020 — Consulter le tableau de bord du jour (v1)

*(même gabarit)*

### Fin d'itération 1

| Mesure | Valeur |
|---|---|
| Audit d'écart spec/code global (`/controle-ecart` sur les 4 UC) | |
| Convergence de l'effort par UC (H3) | |
| Ajustements décidés du template / des fondations / du protocole | |

## 5. Itération 2 — synchronisation

### UC-015 — Configurer l'accès à Oura

*(gabarit UC ; noter le résultat du spike CORS de l'ADR-001)*

### UC-016 — Importer mes données Oura

*(gabarit UC)*

### Tickets

| Ticket | Type | UC | Qualification (`sync:*`) | Spec modifiée avant le code ? | Temps | PR | Aurait-il pu être évité par une spec plus précise ? |
|---|---|---|---|---|---|---|---|
| | | | | | | | |

### Fin d'itération 2

| Mesure | Valeur |
|---|---|
| Audit d'écart après tickets (H4) | |
| Traçabilité : ticket pris au hasard → UC → PR → tests, en moins de 2 min ? (H5) | |

## 6. Entorses au protocole

| Date | Casquette | Ce que j'ai fait | Pourquoi | Ce que ça révèle |
|---|---|---|---|---|
| | | | | |

## 7. Gabarits

**Session analyste** : date, UC, temps, allers-retours, sections difficiles, modèle de domaine modifié (oui/non, quoi), hésitations.

**Session développeur** : date, UC ou ticket, temps, questions de l'agent (texte), points ambigus → tickets, relances, écarts par catégorie, violations des fondations, tests spécifiés / automatisés / verts, décisions techniques hors ADR, envie de toucher à la spec (oui/non).

**Session métier** : date, application construite depuis `main` (oui/non), moment d'usage joué, tickets créés (numéros), ressenti en deux lignes.

**Entorse** : date, casquette, fait, motif, enseignement.
