#!/usr/bin/env bash
set -euo pipefail

REPO="$(cd "$(dirname "$0")/../.." && pwd)"
WORK="${ARCHIVE_WORKDIR:-$(mktemp -d)}"
OUT="$REPO/public"
VERSIONS=("v1:57072e5" "v2:8828966" "v3:1b9b7c8")

for entry in "${VERSIONS[@]}"; do
  version="${entry%%:*}"
  commit="${entry##*:}"
  dir="$WORK/$version"
  echo "== $version ($commit)"
  rm -rf "$dir"
  git -C "$REPO" worktree remove --force "$dir" 2>/dev/null || true
  git -C "$REPO" worktree add --force --detach "$dir" "$commit" >/dev/null
  python3 "$REPO/scripts/archives/sanitize.py" "$dir" "$version"
  (cd "$dir" && npm ci --no-audit --no-fund --loglevel=error && npx vite build --logLevel warn)
  dist="$dir/$(cd "$dir" && node -e 'const s=require("fs").readFileSync("vite.config.ts","utf8");const m=s.match(/outDir:\s*["\x27]([^"\x27]+)/);console.log(m?m[1]:"dist")')"
  python3 "$REPO/scripts/archives/prune.py" "$dist" "$version"
  rm -rf "$OUT/$version"
  cp -R "$dist" "$OUT/$version"
  git -C "$REPO" worktree remove --force "$dir"
done
