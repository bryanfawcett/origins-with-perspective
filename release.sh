#!/usr/bin/env bash
# Build the deck from source and refresh prebuilt/, which is what Cloudflare deploys.
#
# The deck is Rust (a static-site generator and a WebAssembly driver), and Cloudflare's
# build image is not set up to compile either, so the built output is committed and the
# Cloudflare build (`npm run build`) just copies it into dist/. Run this after any change
# to crates/, assets/, data/ or public/, and commit prebuilt/ with it.
#
#   ./release.sh            # rebuild, refresh prebuilt/
#   ./release.sh --check    # fail if prebuilt/ is stale (CI)
set -euo pipefail
cd "$(dirname "$0")"
./build.sh
if [ "${1:-}" = "--check" ]; then
  diff -rq dist prebuilt >/dev/null && echo "prebuilt/ is up to date" || { echo "prebuilt/ is stale; run ./release.sh" >&2; exit 1; }
else
  rm -rf prebuilt && cp -R dist prebuilt
  echo "prebuilt/: $(find prebuilt -type f | wc -l | tr -d ' ') files"
fi
