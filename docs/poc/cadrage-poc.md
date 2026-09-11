# Cadrage du POC — Spec-Driven Development sur « Vita »

| | |
|---|---|
| **Statut** | v1.0 — validé le 11 septembre 2026 |
| **Date** | 11 septembre 2026 |
| **Auteur** | Moi (projet personnel) |
| **Nom de code du produit** | Vita (provisoire, à renommer librement) |
| **Nature** | Projet personnel, sans lien avec le contexte professionnel |

---

## 1. Objet du POC

Ce POC a pour but d'**éprouver un workflow de développement piloté par les spécifications** (spec-driven development, SDD) en conditions réelles, de bout en bout, sur un projet que je maîtrise entièrement. Le workflow éprouvé est celui de l'*AI Unified Process* décrit par Simon Martinelli (*Spec-Driven Development – From Specs to Code with AI Agents*, Apress 2026), tel que je l'ai transposé : des cas d'usage identifiés (UC-###) comme artefact central, une approbation avant implémentation, une implémentation par un agent IA à partir de la spec, une revue humaine, puis un flux de synchronisation qui fait remonter tout ticket (bug ou évolution) vers le cas d'usage avant de toucher au code.

Le produit support est une **application web (PWA) de suivi de ma santé et de ma forme** : repas, plan d'entraînement, évolution physique, activité, sommeil et données de mes objets connectés (bague Oura Ring 5, Apple Watch Series 9), dans l'esprit d'un tableau de bord type Google Health.

Il faut le dire clairement dès le cadrage : **le produit est le support, le process est l'objet**. Si à la fin du POC l'application est incomplète mais que je sais précisément ce qui marche et ce qui coince dans le workflow, le POC est réussi. L'inverse — une belle application obtenue en contournant le process — est un échec.

## 2. Décisions de cadrage déjà prises

| Sujet | Décision | Motif |
|---|---|---|
| Ordre des travaux | Cadrage → inception → squelette du dépôt, avec un point de validation entre chaque étape | Ne pas spécifier avant d'avoir fixé ce qu'on mesure |
| Plateforme cible | Application web / PWA | Pas de dépendance à Xcode ; les données des objets connectés passent par des API ou des exports |
| Process de référence | Mon workflow spec-driven (AI Unified Process transposé), rôles cumulés par une seule personne | C'est ce workflow-là que je veux valider ou corriger |
| Hébergement du projet | Dépôt Git sur GitHub (issues, pull requests, labels) | Traçabilité ticket → UC → PR native, sans outillage supplémentaire |
| Séparation pro / perso | Stricte : aucune personne, aucun document, aucune donnée ni code issus du contexte professionnel | Voir §7 |

## 3. Ce que le POC doit éprouver

Le POC ne teste pas « si l'IA sait coder ». Il teste des hypothèses précises sur le workflow, chacune avec une façon de l'observer et de trancher.

| ID | Hypothèse | Comment on l'observe | Confirmée si… |
|---|---|---|---|
| **H1** | Un cas d'usage rédigé selon le template suffit à l'agent pour implémenter **sans interprétation** | Nombre de questions posées par l'agent avant/pendant l'implémentation ; nombre d'écarts entre spec et livraison relevés en revue | Sur la majorité des UC, zéro question de fond et zéro écart fonctionnel en revue |
| **H2** | Les **fondations** (règles pour l'agent, architecture, stratégie de tests) cadrent réellement l'agent | Violations de règles ou d'architecture détectées en revue de PR | Les violations diminuent d'un UC à l'autre et deviennent rares après ajustement des fondations |
| **H3** | Le flux « **nouveau cas d'usage** » est rejouable et son effort est prévisible | Temps de rédaction de la spec, temps d'implémentation, nombre de relances de l'agent, par UC | L'effort par UC de complexité comparable converge ; on sait estimer le suivant |
| **H4** | Le flux de **synchronisation** (ticket → UC → code) garde les specs et le code alignés | Audit d'écart spec/code après le traitement de plusieurs tickets | Aucun écart non documenté ; chaque changement de code est adossé à une version de UC |
| **H5** | La **traçabilité** ticket → UC-### → PR → tests tient sans outillage lourd | Pour un ticket choisi au hasard, remonter jusqu'aux tests et au code en moins de deux minutes | Chaîne complète retrouvable pour tous les tickets traités |
| **H6** | Le **passage de relais** analyste → développeur fonctionne même quand une seule personne porte les deux casquettes | Respect du protocole de séparation (§5) ; cas où j'ai « triché » notés au journal | Le protocole est tenable et les entorses restent exceptionnelles et documentées |
| **H7** | Les UC complétés par des exigences UI/accessibilité suffisent pour obtenir des **interfaces claires, accessibles et responsive** | Audit d'accessibilité (WCAG 2.1 AA) et revue UX de chaque écran livré | Peu de reprises UI après livraison ; les écarts d'accessibilité sont rares et corrigeables via la spec |

## 4. Périmètre

### 4.1 Le produit support

Domaines fonctionnels candidats, à détailler et prioriser pendant l'inception :

| Domaine | Ce qu'on y trouve | Sources de données |
|---|---|---|
| Repas | Journal des repas, aliments, apports (calories, macronutriments) | Saisie manuelle ; base ouverte de produits (Open Food Facts) en option |
| Entraînement | Plan d'entraînement, séances programmées, séances réalisées, exercices | Saisie manuelle ; séances détectées par la montre en option |
| Évolution physique | Poids, mensurations, photos avant/après, courbes | Saisie manuelle ; photos depuis l'appareil |
| Activité et sommeil | Pas, sport, sommeil, fréquence cardiaque, récupération | Oura (API cloud) ; Apple Watch via Apple Santé |
| Tableau de bord | Vue synthétique du jour, de la semaine, tendances | Agrégation des domaines précédents |

### 4.2 Ce que le POC construit réellement (v1)

Pour jouer la boucle complète plusieurs fois sans y passer des mois, le périmètre v1 est volontairement resserré et découpé en trois itérations. Le choix précis des UC se fera à l'inception ; le principe est le suivant :

| Itération | Objectif | Ce qu'elle éprouve |
|---|---|---|
| **0 — Fondations** | Squelette du dépôt, règles pour l'agent, architecture cible (ADR), stratégie de tests, socle applicatif vide mais exécutable | H2 |
| **1 — Boucle nominale** | 3 à 4 UC simples et indépendants (par ex. saisir une mensuration, saisir un repas, consulter le tableau de bord du jour) | H1, H3, H5, H7 |
| **2 — Synchronisation** | 1 UC « complexe » avec dépendance externe (par ex. importer les données Oura) + traitement d'au moins 3 tickets (2 bugs, 1 évolution) via le flux de synchronisation | H4, H5, H6 |

À l'issue de l'itération 2, un **bilan** clôt le POC (voir §9).

### 4.3 Hors périmètre

Sont explicitement exclus du POC : application native iOS/Android, multi-utilisateurs et gestion de comptes, publication sur un store, synchronisation temps réel avec les objets connectés, tout conseil de santé ou interprétation médicale, et toute optimisation de performance au-delà du confortable. Ces sujets pourront faire l'objet de UC ultérieurs, hors POC.

## 5. Le process éprouvé, appliqué en solo

### 5.1 La boucle

Le workflow se joue en cinq temps, dans l'ordre :

1. **Fondations** (hors boucle, une fois) : règles pour l'agent (`CLAUDE.md` / `AGENTS.md`), architecture logicielle (ADR), stratégie de tests, conventions de traçabilité.
2. **Inception** : vision produit, acteurs, liste des cas d'usage priorisés, glossaire et modèle de domaine initial, exigences non fonctionnelles.
3. **Nouveau cas d'usage** (répété) : rédiger UC-### → approuver → implémenter par l'agent → revoir les diffs → exécuter les tests → fusionner → tests « usine ».
4. **Recette et tickets** : utiliser l'application, créer un ticket par bug ou demande d'évolution, chaque ticket référençant le UC concerné.
5. **Synchronisation** (répété) : le ticket rouvre le UC → la spec est mise à jour d'abord → l'agent met le code en conformité → PR liée au ticket et au UC.

### 5.2 Trois casquettes, une seule personne : protocole de séparation

C'est le point le plus fragile du POC. Sans garde-fous, je vais naturellement corriger la spec pendant que je code, ou coder « ce que je voulais dire » plutôt que ce qui est écrit, et le POC ne prouvera rien. D'où un protocole explicite :

| Casquette | Où elle travaille | Ce qu'elle a le droit de faire | Ce qu'elle n'a pas le droit de faire |
|---|---|---|---|
| **Analyste** | Dossier `specs/` uniquement, dans une session d'IA qui n'a pas accès au code | Rédiger et faire évoluer les UC, le domaine, les NFR ; approuver un UC via la check-list de « prêt à implémenter » | Regarder le code pour décider ce qu'il faut écrire dans la spec |
| **Développeur** | Dépôt complet, dans un agent de code (Claude Code) | Implémenter à partir du UC approuvé, relire les diffs, faire tourner les tests, ouvrir la PR | Modifier un UC pendant l'implémentation ; si la spec est fausse ou incomplète, il crée un ticket « retour analyste » et s'arrête |
| **Métier** | L'application déployée localement, GitHub Issues | Tester, créer des tickets avec le template (bug / évolution), accepter ou refuser une livraison | Toucher aux specs ou au code |

Deux règles complémentaires. D'une part, une **séparation dans le temps** : je n'enchaîne jamais la rédaction et l'implémentation du même UC dans la même session de travail. D'autre part, l'**approbation est un acte tracé** : un commit dédié (`spec: approuve UC-012`) et un passage du statut du UC à « approuvé » ; l'agent de code ne travaille que sur un UC approuvé.

Toute entorse à ce protocole est consignée au journal (§6) : ce sont précisément ces entorses qui diront si le process est tenable ou s'il faut l'aménager.

### 5.3 Outillage

L'outillage est réduit au minimum et sans rapport avec un quelconque environnement professionnel : GitHub (dépôt, issues, pull requests, labels `UC-###`), Claude Code pour la casquette développeur, une session Claude sans accès au code pour la casquette analyste, et un journal d'observation dans le dépôt.

## 6. Mesures et journal d'observation

Le journal (`docs/poc/journal.md`) est le livrable le plus important du POC : il alimente le bilan. Il est tenu **à chaud**, à chaque étape, selon un gabarit fixe. Ce qui y est relevé :

| Moment | Mesures et observations |
|---|---|
| Par cas d'usage | Temps de rédaction de la spec ; nombre d'allers-retours avant approbation ; temps d'implémentation par l'agent ; nombre de questions posées par l'agent ; nombre de relances ; nombre d'écarts spec/livraison en revue ; nombre de tests générés et passés ; violations des fondations |
| Par ticket | Type (bug / évolution / retour analyste) ; UC concerné ; la spec a-t-elle été modifiée avant le code ? ; temps de traitement ; PR liée |
| Par entorse au protocole | Ce que j'ai fait, pourquoi, ce que ça révèle du process |
| En fin d'itération | Audit d'écart spec/code (ce que le code fait et que la spec ne dit pas, et inversement) ; ce que je changerais dans le template de UC ou les fondations |

Les temps sont notés en minutes et restent indicatifs : ce qui compte est la tendance d'un UC à l'autre, pas la précision.

## 7. Contraintes et règles du POC

**Séparation pro / perso.** Aucune personne de mon environnement professionnel n'intervient. Aucun document, template, fichier de règles, extrait de code ou donnée professionnels n'est copié dans le dépôt : tout ce qui sert au POC est **recréé de zéro** pour ce projet. Seule la méthode — le workflow lui-même, qui est une démarche publiée — est réutilisée. Le dépôt ne mentionne ni employeur, ni projet, ni outil interne.

**Données de santé personnelles.** L'application manipulera mes propres données de santé (mesures, photos, sommeil, fréquence cardiaque). Règles : approche *local-first* (les données restent sous mon contrôle, sur mon appareil ou un stockage que je maîtrise) ; aucun service tiers non maîtrisé en dehors des API officielles des objets connectés ; **aucune donnée réelle dans le dépôt** — les tests et les démonstrations utilisent des jeux de données fictifs ; les secrets (jetons d'API) restent hors du dépôt.

**Qualité d'interface.** L'accessibilité (WCAG 2.1 AA) et la conception responsive sont des exigences non fonctionnelles de premier rang, pas des finitions : elles figurent dans les fondations et sont vérifiées à chaque UC (hypothèse H7).

**Langue et conventions.** Les specs, le journal et les tickets sont en français. Le code, les identifiants et les messages de commit sont en anglais, sauf le préfixe des UC (`UC-###`) qui reste la clé de traçabilité commune.

## 8. Risques

| Risque | Effet | Parade |
|---|---|---|
| Temps personnel limité et irrégulier | POC qui s'éternise, mesures non comparables | Time-box (§9), UC volontairement petits, journal tenu à chaud |
| Accès aux données Apple Watch depuis une application web | Impossible d'importer sans app native | Décision d'architecture (ADR) dès l'itération 0 : export Apple Santé, raccourci iOS qui pousse vers l'application, ou passage par Oura (qui écrit aussi dans Apple Santé) ; repli = import manuel |
| Biais des rôles cumulés | Le POC ne prouve rien parce que j'ai contourné le process | Protocole de séparation (§5.2), entorses tracées |
| Dérive vers « construire l'app » | Le process passe au second plan | Rappel de l'objet (§1) en tête de journal ; une itération sans journal est une itération invalide |
| Évolution des API Oura / expiration de jetons | UC « complexe » bloqué | Jeu de données Oura fictif pour les tests ; l'import réel n'est qu'un cas de démonstration |
| Fondations trop ambitieuses | Itération 0 interminable | Fondations minimales et versionnées ; on les enrichit au fil des violations constatées |

## 9. Critères de réussite et de clôture

Le POC est **réussi** si, à la clôture, les sept hypothèses ont chacune un verdict argumenté par le journal (confirmée, infirmée, ou non concluante avec la raison), si la boucle « nouveau cas d'usage » a été jouée au moins quatre fois et le flux de synchronisation au moins trois fois, et si un **bilan écrit** propose des ajustements concrets : ce qu'il faut garder, modifier ou abandonner dans le workflow, le template de UC, le protocole de séparation et les fondations.

Le POC est **clôturé** quand l'itération 2 est terminée ou quand la time-box est atteinte, à la première des deux échéances. La time-box est à fixer à la validation de ce cadrage (proposition : huit semaines de travail personnel, à raison de quelques heures par semaine). Une clôture par time-box n'est pas un échec : le bilan porte alors sur ce qui a été joué.

Signaux d'alerte qui justifient un arrêt anticipé et un bilan intermédiaire : l'agent ne peut implémenter sans interprétation lourde sur plus de la moitié des UC ; les specs et le code divergent dès l'itération 1 ; l'effort par UC ne converge pas du tout.

## 10. Jalons

| Jalon | Contenu | Validation |
|---|---|---|
| J0 | Ce cadrage | Relecture et ajustements |
| J1 | Inception : vision, acteurs, liste des UC priorisés, modèle de domaine initial, NFR | Liste des UC v1 arrêtée |
| J2 | Squelette du dépôt et fondations (itération 0) | Dépôt poussé sur GitHub, socle exécutable |
| J3 | Fin d'itération 1 | 3 à 4 UC fusionnés, journal à jour, audit d'écart |
| J4 | Fin d'itération 2 | UC complexe fusionné, 3 tickets traités par synchronisation |
| J5 | Bilan | Verdict par hypothèse, recommandations |

## 11. Livrables du POC

Le cadrage (ce document), le journal d'observation, le dossier `specs/` complet (vision, domaine, UC, NFR, ADR), le code et ses tests dans le dépôt, les tickets et PR sur GitHub, et le bilan final.

## 12. Prochaine étape

Après validation de ce cadrage : rédaction de l'inception (J1), en commençant par la vision produit et la liste des cas d'usage candidats, que je prioriserai pour arrêter le périmètre de la v1.
