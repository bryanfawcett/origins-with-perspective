# Origins with a Perspective on Human Potential

A talk on equity and the assumptions we make in learning — what growing up in
Zimbabwe taught me about measuring capability instead of credentials, and how
that shapes the technology work I do now.

📖 **Canonical page**: https://bryanfawcett.com/origins-with-perspective
🌍 **The deck**: https://origins-with-perspective.nyuchi.workers.dev

The presentation here is the deck as it was delivered. The canonical page on
[bryanfawcett.com](https://bryanfawcett.com) carries the same argument with more
context and embeds this deck. Keep the two in step when the content changes.

## It is a deck, not a page

One slide on screen at a time, and moving between them is a discrete step:

| | |
|---|---|
| **Forward** | `→` · `Space` · `PageDown` · swipe left · the `→` control |
| **Back** | `←` · `Shift`+`Space` · `PageUp` · swipe right · the `←` control |
| **Jump** | `Home` / `End`, the mineral dots, or a `#3` in the URL |

Every slide has an address — `#1` is the first — so a link into the talk lands
on the right slide and the back button walks it.

How it degrades is part of the design:

- **No JavaScript** → every slide visible, stacked. That is what the deck was
  before it was a deck, and a good fallback.
- **Print** → the same stacked layout, so *save as PDF* gives handouts rather
  than one slide and nine blanks.
- **A slide taller than the viewport** scrolls inside itself, and is focusable
  so a keyboard can reach that scroll.
- **`prefers-reduced-motion`** drops the transition and keeps the step.

## Design

The deck runs on the same branding layer as bryanfawcett.com — a cyanotype: a
matte board with a blue cast, line work in white, panels cut into it as wells,
and the seven Mzizi minerals down the binding edge. `src/brand/` is **mirrored**
from the site rather than imported: this is its own Worker in its own repo and
a build here must not depend on the site's. Keep the values identical, or the
deck stops matching the page that embeds it.

Colour, spacing and type come from `src/brand/tokens.ts`; never a literal. A
mineral is a mark beside a word or a rule beneath it, never the colour of the
word — on this ground the seven measure Lc 25–48 as lettering.

## Content

The talk is data. `src/data/slides.ts` holds one typed record per slide, and
`kind` picks its shape (`title`, `statement`, `journey`, `columns`, `grid`).
A copy edit never means touching layout; a new slide is a record; a new *shape*
is a `kind` and a branch in `src/components/Slide.astro`.

## Accessibility

- **axe-core** (WCAG 2.2 AA + best-practice): **0 violations**, every slide, at
  1440px and 390px.
- **APCA**: every text block clears the minimum size for its contrast at its
  weight, on every slide, at both widths.
- Real `<nav>`/`<main>`/`<section>` landmarks, 44px targets, a live region that
  announces each move, and `inert` on the slides that are off screen so they
  are neither tabbable nor readable while hidden.

## Structure

```text
src/
  brand/       tokens.ts, minerals.ts — mirrored from bryanfawcett.com
  data/        slides.ts — the talk, as typed records
  layouts/     Deck.astro — the sheet, the rail, the slide driver
  components/  Slide.astro (the five shapes), Marked.astro (emphasis from data)
  styles/      global.css, fonts.css (generated)
  pages/       index.astro — a wrapper around the loop
public/
  fonts/       self-hosted woff2, Latin + Latin Extended
  _headers     frame-ancestors, so the deck can be embedded
```

## Commands

```bash
npm run dev     # dev server
npm run check   # astro check — must stay at 0 errors
npm run build   # static build to dist/
```

Cloudflare's GitHub app deploys the Worker on push to `main`. It is an
assets-only Worker — every route is prerendered, so there is no `main` in
`wrangler.toml`, and the framing policy lives in `public/_headers` where the
asset layer actually reads it.
