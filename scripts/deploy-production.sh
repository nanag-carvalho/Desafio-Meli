#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
project_file="$repo_root/.vercel/project.json"

if [[ ! -f "$project_file" ]]; then
  echo "Projeto Vercel não vinculado: falta .vercel/project.json" >&2
  exit 1
fi

remote_url="$(git -C "$repo_root" remote get-url origin)"
local_commit="$(git -C "$repo_root" rev-parse HEAD)"
remote_commit="$(git ls-remote "$remote_url" refs/heads/main | cut -f1)"

if [[ "$local_commit" != "$remote_commit" ]]; then
  echo "A branch local difere de origin/main. Envie as mudanças ao Git antes do deploy." >&2
  exit 1
fi

deployment_dir="$(mktemp -d "${TMPDIR:-/tmp}/mercado-play-deploy.XXXXXX")"
trap 'rm -rf "$deployment_dir"' EXIT

git clone --quiet --depth 1 "$remote_url" "$deployment_dir/source"
site_dir="$deployment_dir/site"
mkdir -p "$site_dir/alta" "$site_dir/.vercel"

for page in index.html arvore-de-oportunidades.html raciocinio-de-design.html wireflow.html registro-de-iteracoes.html case.css vercel.json; do
  cp "$deployment_dir/source/$page" "$site_dir/$page"
done
cp -R "$deployment_dir/source/assets" "$site_dir/assets"
cp -R "$deployment_dir/source/alta/dist" "$site_dir/alta/dist"
cp "$project_file" "$site_dir/.vercel/project.json"

echo "Publicando o commit ${remote_commit:0:7} (case e protótipo; sem apresentação)."
(cd "$site_dir" && env -u VERCEL_TOKEN npx --yes vercel --prod --yes)
