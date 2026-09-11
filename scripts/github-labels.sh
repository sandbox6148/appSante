#!/usr/bin/env bash
# Creates the labels used by the workflow on the GitHub repository (needs the gh CLI, authenticated).
#   ./scripts/github-labels.sh            → type:* and sync:* labels
#   ./scripts/github-labels.sh UC-003     → also creates the label for that UC (idempotent)
set -euo pipefail

label() { # name color description
  gh label create "$1" --color "$2" --description "$3" --force >/dev/null && echo "label $1"
}

label "type:bug"              "d73a4a" "Comportement observé ≠ attendu (casquette métier)"
label "type:evolution"        "a2eeef" "Demande d'évolution (casquette métier)"
label "type:retour-analyste"  "fbca04" "La spec ne suffit pas : question de l'agent/développeur à l'analyste"
label "sync:code-seul"        "0e8a16" "Qualifié : le UC est bon, le code est fautif"
label "sync:spec-et-code"     "1d76db" "Qualifié : le UC change, puis le code"
label "sync:sans-suite"       "e4e669" "Qualifié : comportement conforme et voulu, ou hors périmètre"

for uc in "$@"; do
  if [[ "$uc" =~ ^UC-[0-9]{3}$ ]]; then
    label "$uc" "5319e7" "Cas d'usage $uc"
  else
    echo "ignored: $uc (expected UC-###)" >&2
  fi
done
