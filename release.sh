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
# The Worker is Rust too (crates/deck-worker, workers-rs). Cloudflare's build image has no
# Rust, so its compiled output is committed beside prebuilt/ and wrangler.toml's `main` points at it.
(cd crates/deck-worker && worker-build --release >/dev/null)
if [ "${1:-}" = "--check" ]; then
  diff -rq dist prebuilt >/dev/null && echo "prebuilt/ is up to date" || { echo "prebuilt/ is stale; run ./release.sh" >&2; exit 1; }
  diff -q crates/deck-worker/build/index_bg.wasm prebuilt-worker/index_bg.wasm >/dev/null && echo "prebuilt-worker/ is up to date" || { echo "prebuilt-worker/ is stale; run ./release.sh" >&2; exit 1; }
else
  rm -rf prebuilt && cp -R dist prebuilt
  rm -rf prebuilt-worker && mkdir prebuilt-worker && cp crates/deck-worker/build/index.js crates/deck-worker/build/index_bg.wasm prebuilt-worker/
  echo "prebuilt/: $(find prebuilt -type f | wc -l | tr -d ' ') files; prebuilt-worker/: $(find prebuilt-worker -type f | wc -l | tr -d ' ') files"
fi
