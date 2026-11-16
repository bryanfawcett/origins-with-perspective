#!/usr/bin/env bash
# Pull the shared identity from the site repo: the design tokens, @bundu/ui's
# tokens and colour-scheme, and the self-hosted fonts (Latin only; the deck has
# no Chinese). The deck owns its layout (assets/deck.css); everything it shares
# with bryanfawcett.com comes from here, so the two cannot drift by copy-paste.
#
#   ./scripts-sync.sh [path-to-bryanfawcett.com-repo]   # default ../personal-website
#   ./scripts-sync.sh --check [path]                    # fail if the copies are stale (CI)
set -euo pipefail
cd "$(dirname "$0")"
check=0; [ "${1:-}" = "--check" ] && { check=1; shift; }
SITE="${1:-../personal-website}"
[ -f "$SITE/src/styles/tokens.css" ] || { echo "not the site repo: $SITE" >&2; exit 2; }

OUT=assets; [ $check = 1 ] && OUT=$(mktemp -d)
mkdir -p "$OUT/fonts" "$OUT/data"
cp "$SITE/src/styles/tokens.css" "$OUT/tokens.css"
# The exported site data: the Origins work section the deck's work slide is built from.
cp "$SITE/src/data/generated/site.json" "$OUT/data/site.json"
cp "$SITE/node_modules/@bundu/ui/styles/tokens.css" "$OUT/bundu-tokens.css"
cp "$SITE/node_modules/@bundu/ui/styles/color-scheme.css" "$OUT/bundu-color-scheme.css"
cp "$SITE/public/fonts/OFL.txt" "$OUT/fonts/OFL.txt"
for f in "$SITE"/public/fonts/*.woff2; do
  case "$(basename "$f")" in noto-serif-sc-*) continue;; esac
  cp "$f" "$OUT/fonts/"
done
python3 - "$SITE/src/styles/global.css" "$OUT/ground.css" <<'PY'
# The ground and the ruling (layers 1 and 2), lifted verbatim so the deck's sheet
# is the site's sheet.
import sys
css = open(sys.argv[1]).read()
a = css.index('/* ==================== LAYER 1')
b = css.index('/* ============================== layout')
open(sys.argv[2], 'w').write(css[a:b].rstrip() + '\n')
print(f"ground.css: {css[a:b].count(chr(10))} lines")
PY
python3 - "$SITE/src/styles/fonts.css" "$OUT/fonts.css" <<'PY'
import re, sys
src, out = sys.argv[1:3]
css = open(src).read()
head = css[: css.index('@font-face')] if '@font-face' in css else ''
blocks = re.findall(r'@font-face\s*\{.*?\}', css, re.S)
keep = [b for b in blocks if 'noto-serif-sc' not in b]
open(out, 'w').write(head + '\n\n'.join(keep) + '\n')
print(f"fonts.css: kept {len(keep)} of {len(blocks)} faces")
PY
# The deck reads the site data from data/, beside its own slides.
if [ $check = 0 ]; then mkdir -p data && mv "$OUT/data/site.json" data/site.json && rmdir "$OUT/data"; fi
if [ $check = 1 ]; then
  cmp -s "$OUT/data/site.json" data/site.json || { echo "data/site.json is stale; run ./scripts-sync.sh" >&2; exit 1; }
  rm -rf "$OUT/data"
  diff -rq -x deck.css "$OUT" assets >/dev/null && echo "shared identity is in step with the site" || { echo "assets/ is stale; run ./scripts-sync.sh" >&2; exit 1; }
fi
