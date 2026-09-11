# specs/ — les spécifications de Vita

Ce dossier est la **source de vérité fonctionnelle**. Tout ce que l'application fait est écrit ici avant d'être construit ; tout ce qui n'y est pas écrit n'existe pas. C'est le seul dossier (avec `docs/`) que la casquette analyste voit.

| Fichier | Rôle | Qui le modifie |
|---|---|---|
| [vision.md](vision.md) | Pourquoi Vita existe, pour qui, dans quels moments, avec quels objectifs mesurables (`O-##`), acteurs, principes de conception | Analyste |
| [domain/modele-domaine.md](domain/modele-domaine.md) | Glossaire (français → nom en code), modèle conceptuel, règles de domaine transverses (`RG-D##`) | Analyste (au fil des UC) |
| [nfr.md](nfr.md) | Exigences non fonctionnelles (`NFR-##`), chacune avec son mode de vérification | Analyste |
| [use-cases/catalogue.md](use-cases/catalogue.md) | Liste de référence des cas d'usage (`UC-###`), priorités, complexité, statuts | Analyste ; statut aussi par le développeur aux transitions prévues |
| [use-cases/_template-uc.md](use-cases/_template-uc.md) | Template d'un cas d'usage (15 sections) | — |
| `use-cases/UC-###-*.md` | Les cas d'usage détaillés | Analyste (sections 1–13, 15) ; développeur (section 14, statut) |
| [adr/](adr/) | Décisions d'architecture (`ADR-###`) et leur template | Développeur |
| `ui/` | Maquettes et schémas d'écran, référencés depuis les UC | Analyste |

Cycle de vie d'un UC, check-list d'approbation et définition de « fini » : [docs/workflow.md](../docs/workflow.md). Identifiants et nommage : [docs/conventions.md](../docs/conventions.md). Cohérence vérifiée par `node scripts/check-specs.mjs`.
