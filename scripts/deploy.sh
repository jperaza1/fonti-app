#!/usr/bin/env bash
# Build de Angular y publicación del dist en el sitio IIS cod-app.
# Desde la raíz del repo, en WSL:
#   npm run deploy
#   npm run deploy -- --skip-build
# La contraseña se lee de .deploy-password (está en .gitignore).

set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

skip_build=0
for arg in "$@"; do
  if [[ "$arg" == "--skip-build" ]]; then
    skip_build=1
  fi
done

if [[ "$skip_build" -eq 0 ]]; then
  npm run build
fi

if [[ ! -f dist/index.html || ! -f dist/web.config ]]; then
  echo "Falta dist/index.html o dist/web.config. El build tiene que terminar bien." >&2
  exit 1
fi

if [[ -z "${DEPLOY_PASSWORD:-}" && -f "$root/.deploy-password" ]]; then
  DEPLOY_PASSWORD="$(tr -d '\r\n' < "$root/.deploy-password")"
  export DEPLOY_PASSWORD
fi

if [[ -z "${DEPLOY_PASSWORD:-}" ]]; then
  read -r -s -p "Contraseña de Web Deploy: " DEPLOY_PASSWORD < /dev/tty
  echo
  export DEPLOY_PASSWORD
fi

if [[ -z "$DEPLOY_PASSWORD" ]]; then
  echo "La contraseña de Web Deploy está vacía." >&2
  exit 1
fi

if [[ "$DEPLOY_PASSWORD" == *","* ]]; then
  echo "Web Deploy separa los parámetros por comas. La contraseña no puede incluir una coma." >&2
  exit 1
fi

case ":${WSLENV:-}:" in
  *":DEPLOY_PASSWORD"*) ;;
  *) export WSLENV="${WSLENV:+$WSLENV:}DEPLOY_PASSWORD/u" ;;
esac

script_win="$(wslpath -w "$root/deploy.ps1")"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "$script_win" -SkipBuild
