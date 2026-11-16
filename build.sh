#!/usr/bin/env bash
# Build the deck: static HTML from deck-site, the driver from deck-client as WebAssembly.
#   ./build.sh          # writes dist/
set -euo pipefail
cd "$(dirname "$0")"
cargo run -q -p deck-site
cargo build -q -p deck-client --target wasm32-unknown-unknown --release
wasm-bindgen --target web --no-typescript --out-dir dist/pkg target/wasm32-unknown-unknown/release/deck_client.wasm
echo "dist/: $(find dist -type f | wc -l | tr -d ' ') files, wasm $(wc -c < dist/pkg/deck_client_bg.wasm | tr -d ' ') bytes"
