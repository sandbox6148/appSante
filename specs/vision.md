# Vision produit — Vita

| | |
|---|---|
| **Statut** | v1.0 — validé le 11 septembre 2026 (jalon J1, inception) |
| **Date** | 11 septembre 2026 |
| **Documents liés** | [Catalogue des cas d'usage](use-cases/catalogue.md) · [Modèle de domaine](domain/modele-domaine.md) · [Exigences non fonctionnelles](nfr.md) · [Cadrage du POC](../docs/poc/cadrage-poc.md) |

## 1. Le problème

Mes données de santé et de forme existent, mais elles sont éparpillées et ne se parlent pas. Le sommeil, la récupération et l'activité sont dans l'application Oura ; les séances de sport, les pas et la fréquence cardiaque sont dans Apple Santé via l'Apple Watch ; les repas ne sont notés nulle part ou dans une application à part ; le plan d'entraînement vit dans des notes ; le poids, les mensurations et les photos sont dans la pellicule du téléphone ou dans un tableur.

Conséquence : je ne peux répondre simplement à trois questions pourtant élémentaires. **Où j'en suis aujourd'hui** (ai-je bien dormi, qu'ai-je mangé, quelle séance est prévue) ? **Est-ce que je tiens mon plan** (séances faites, apports, régularité) ? **Est-ce que mon corps évolue** dans la direction voulue, sur plusieurs mois ?

## 2. La vision

> Un seul endroit, à moi, où voir ma santé et ma forme au quotidien — ce que je mange, ce que je fais, comment je dors et récupère, et comment mon corps évolue — pour tenir un plan et constater les progrès.

Vita est une application web installable (PWA) à usage strictement personnel. Elle **agrège** ce que les objets connectés mesurent déjà, **accueille** ce qu'aucun capteur ne mesure (repas, mensurations, photos, plan d'entraînement), et **restitue** l'ensemble sous une forme lisible et comparable dans le temps, dans l'esprit d'un tableau de bord type Google Health.

## 3. Ce que Vita n'est pas

Vita n'est pas un coach ni un outil d'interprétation médicale : elle affiche des données et des tendances, elle ne diagnostique rien et ne prescrit rien. Elle n'est pas un réseau social ni un service multi-utilisateurs. Elle ne remplace pas les applications Oura et Apple Santé, qui restent la source de vérité pour leurs propres données ; elle les consolide.

## 4. L'utilisateur et ses moments d'usage

Il n'y a qu'un utilisateur : moi. Plutôt qu'un persona, ce qui guide la conception, ce sont les **moments** où l'application est ouverte, car ils dictent l'appareil, le temps disponible et l'attention.

| Moment | Contexte | Ce que je veux faire | Contrainte de conception |
|---|---|---|---|
| **Le matin** | Téléphone, 30 secondes | Voir la nuit passée, ma récupération, la séance prévue | Un écran, sans défilement pour l'essentiel |
| **Aux repas** | Téléphone, souvent debout, une main | Noter ce que je mange | Saisie en moins d'une minute, valeurs par défaut intelligentes, répétition facile |
| **En séance** | Téléphone, mains occupées, salle ou extérieur | Suivre la séance prévue, cocher les séries, noter les charges | Grandes cibles tactiles, lecture à distance, tolérance aux interruptions |
| **Chaque semaine** | Téléphone ou ordinateur, quelques minutes | Prendre poids et mensurations, une photo, importer les données de la semaine | Rituel guidé, comparaison immédiate avec la fois précédente |
| **Régulièrement** | Ordinateur, temps calme | Regarder les tendances, ajuster le plan, créer la période suivante | Confort de lecture, courbes, vue d'ensemble |

## 5. Objectifs produit

Ces objectifs sont mesurables et servent de critères d'acceptation transverses ; les cas d'usage y font référence.

| ID | Objectif | Mesure |
|---|---|---|
| **O-01** | Toute saisie courante (une mesure, un repas) se fait en moins d'une minute sur téléphone | Chronométrage en recette |
| **O-02** | Le tableau de bord du jour répond à « où j'en suis aujourd'hui » sur un seul écran mobile | Revue UX ; pas d'information essentielle sous la ligne de flottaison |
| **O-03** | Les données des objets connectés arrivent sans ressaisie | Import Oura en un geste ; Apple Santé selon la décision d'architecture |
| **O-04** | L'évolution physique est lisible sur 1, 3, 6 et 12 mois | Courbes et comparaisons de photos disponibles sur ces horizons |
| **O-05** | Je reste propriétaire de mes données | Stockage sous mon contrôle, export complet possible, aucune télémétrie |
| **O-06** | L'application est utilisable par tous les moyens d'interaction | Conformité WCAG 2.1 AA vérifiée à chaque livraison |

## 6. Acteurs

| Acteur | Type | Rôle vis-à-vis de Vita |
|---|---|---|
| **Utilisateur** | Humain, principal | Moi. Saisit, planifie, importe, consulte. Seul acteur humain ; pas de gestion de comptes. |
| **Oura Cloud** | Système externe | Fournit, via son API officielle, le sommeil, la récupération (readiness), l'activité, la fréquence cardiaque et les séances détectées par la bague. |
| **Apple Santé** | Système externe | Détient les données de l'Apple Watch (pas, séances, fréquence cardiaque, énergie). Pas d'API web : le mode d'accès (export, raccourci iOS, passage par Oura) est une décision d'architecture. |
| **Open Food Facts** | Système externe | Base ouverte de produits alimentaires, pour éviter de saisir les valeurs nutritionnelles à la main. |
| **Appareil** | Système | Fournit l'appareil photo, le stockage local et les capacités hors ligne du navigateur. |

## 7. Domaines fonctionnels

| Domaine | Ce qu'il couvre | Cas d'usage |
|---|---|---|
| Profil et objectifs | Mes caractéristiques stables (taille, unités) et les cibles que je me fixe | UC-001, UC-002 |
| Évolution physique | Poids, mensurations, photos avant/après, courbes | UC-003 à UC-006 |
| Repas | Journal alimentaire, aliments, apports | UC-007 à UC-010 |
| Entraînement | Plans, séances prévues et réalisées, progression | UC-011 à UC-014 |
| Objets connectés | Connexion et import des données Oura et Apple Santé, consultation du sommeil, de la récupération et de l'activité | UC-015 à UC-019 |
| Tableau de bord | Vue du jour et bilan de la semaine | UC-020, UC-021 |
| Données | Export, sauvegarde et restauration | UC-022, UC-023 |

Le détail, la priorisation et l'estimation de chaque cas d'usage sont dans le [catalogue](use-cases/catalogue.md).

## 8. Périmètre de la v1 (POC)

Conformément au cadrage, la v1 se limite à ce qui permet de jouer le workflow plusieurs fois :

- **Itération 1** — la boucle nominale sur quatre cas d'usage simples et indépendants : enregistrer une mesure corporelle (UC-003), consulter l'évolution de mes mesures (UC-004), enregistrer un repas (UC-007), consulter le tableau de bord du jour (UC-020, dans sa version alimentée uniquement par les saisies manuelles).
- **Itération 2** — le flux de synchronisation autour d'un cas d'usage complexe : configurer l'accès à Oura (UC-015) puis importer mes données Oura (UC-016), et au moins trois tickets, dont une **demande d'évolution volontaire** : enrichir le tableau de bord du jour (UC-020) avec les données Oura importées. Cette évolution est prévue dès maintenant parce qu'elle fera passer un UC déjà livré par le flux ticket → spec → code, ce que le POC doit précisément observer.

Tout le reste du catalogue est « plus tard » : réalisable après le POC, en continuant le même workflow.

## 9. Principes de conception

Ces principes s'appliquent à tous les cas d'usage et sont déclinés en exigences vérifiables dans les [NFR](nfr.md).

**Mobile d'abord.** La saisie se fait au téléphone ; l'analyse se fait indifféremment au téléphone ou à l'ordinateur. Chaque écran est conçu pour 360 px de large avant d'être élargi.

**Moins de saisie, plus d'import.** Tout ce qu'un capteur mesure est importé, jamais ressaisi. Ce qui doit être saisi propose des valeurs par défaut (la date du jour, la dernière valeur connue, le repas de la veille à la même heure) et permet la répétition en un geste.

**Clair et sobre.** Une action principale par écran, une hiérarchie visuelle nette, des libellés en français courant, des chiffres accompagnés de leur unité et de leur date. Pas de gamification, pas de notifications intrusives, pas de jugement (« mauvaise nuit », « excès ») : des faits et des tendances.

**Accessible par construction.** Navigation au clavier, contrastes, libellés et messages d'erreur explicites, focus visible, cibles tactiles suffisantes, compatibilité lecteur d'écran : vérifiés à chaque livraison, pas en fin de projet.

**Local d'abord.** Les données vivent sur mon appareil, l'application fonctionne hors ligne pour la consultation et la saisie, et seul l'import a besoin du réseau. Je peux tout exporter.

**Jamais de perte de saisie.** Une saisie interrompue (appel, changement d'application, perte de réseau) est retrouvée en l'état.

## 10. Décisions d'architecture attendues à l'itération 0

Trois décisions conditionnent les cas d'usage et seront prises sous forme d'ADR dans les fondations, avant le premier UC : **ADR-001** le socle applicatif (application web seule avec stockage local, ou petit service personnel en complément), **ADR-002** le mode d'accès aux données Apple Santé, **ADR-003** la stratégie de tests par cas d'usage.

## 11. Hypothèses et questions ouvertes

- L'API Oura donne accès aux données par jeton personnel, ce qui suffit pour un usage mono-utilisateur sans flux d'autorisation complexe (à vérifier lors de l'ADR-001 et du UC-015).
- Oura écrit aussi dans Apple Santé : selon l'ADR-002, une seule passerelle Apple Santé pourrait couvrir les deux appareils, ou au contraire Oura pourrait rester la source directe et Apple Santé ne servir que pour la montre.
- Les photos d'évolution restent locales à l'appareil ; leur volume à long terme et leur sauvegarde relèvent du UC-023.
