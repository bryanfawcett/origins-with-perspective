/**
 * The deck's design tokens — mirrored from bryanfawcett.com.
 *
 * This is the branding layer, copied rather than imported: the deck is its own
 * Worker in its own repo, and a build here must not depend on the site's. Keep
 * the values identical to `src/brand/tokens.ts` on bryanfawcett.com; if they
 * drift, the deck stops matching the page that embeds it.
 *
 * The site is a cyanotype — a real blueprint, but a print rather than a wash:
 * near-black ground with a blue cast, line work in white. Dark only: there is
 * no light ramp and no theme toggle by design.
 *
 * "Ink" here means the colour a line is drawn in, which on a cyanotype is the
 * pale one. The ground is the near-black.
 */

import { MINERALS } from './minerals.js';

/**
 * The sheet, with wells cut into it.
 *
 * The model inverted here, and the reason is worth keeping. Panels used to sit
 * *above* the page ground and the ground was near-black, which left only one
 * direction to go for separation — up — and up is where the light is. So a
 * panel had to be lighter than the sheet to be seen at all, and the whole page
 * read as glossy: bright rectangles floating on black.
 *
 * Now the sheet is the matte board and the panels are recessed into it. The
 * near-black the site was built on (#05090F) is still there, but it is the
 * *panel* colour — which is where the reading happens, so the ink sits on the
 * darkest surface on the page rather than the lightest. Ink on a panel measures
 * Lc 105 against 99 before.
 *
 * The ladder is still monotonic and every step is still visible, measured in
 * CIE L* rather than by eye — APCA clamps to 0 between two near-black surfaces,
 * so it cannot judge this end of the range at all. Sheet to panel is dL* 9.7;
 * the pairing readers complained about was dL* 0.6.
 */
export const SHEET = {
  /** The deepest well — the QR ground and the media wells. */
  deep: '#01040A',
  /**
   * Panel fill.
   *
   * Opaque, and recessed below the sheet. It used to be a 0.86-alpha wash so
   * the lighting gradient showed through, which is exactly what made a panel
   * indistinguishable from the page: the two were the same paint. A well has
   * its own floor.
   */
  wash: '#05090F',
  /** A shallower recess — chips and inset fields. */
  washLight: '#0B1119',
  /** Grouped regions: barely sunk, just enough to group. */
  mid: '#10161F',
  /**
   * The sheet itself — the matte board everything is cut into.
   *
   * Lifted from #05090F. That was a near-black with a blue cast under a set of
   * lighting radials, and the radials were doing the work of making it look
   * like a surface. A matte board does not need them.
   */
  base: '#18202C',
  /** The few things that genuinely sit above the sheet: menus, hover, the title block. */
  raised: '#2A3749',
} as const;

/**
 * The drawn line, at the weights a technical pen offers.
 *
 * White rather than the old pale blue: against a near-black ground the blue
 * cast only muddied it, and the base has been lifted from #F2F6FB now that the
 * panels are recessed rather than raised — the ink has a darker surface under
 * it, so it can afford to be brighter without glare. Full-strength ink on a
 * panel measures Lc 105.
 *
 * The alpha steps are the site's real contrast control. `faint` and `hair` are
 * line work only: see RULE below for why the grid does not share them.
 */
export const INK = {
  /** Full-strength line and heading text. */
  base: '#FBFCFE',
  /**
   * Body copy inside panels.
   *
   * These were all set about one step too light once. `soft` at 0.72 measured
   * Lc 62.6 on a panel, which APCA says needs 17.5px at weight 600 — while
   * every label using it ran at 10-11px. Raised until the sizes the design
   * actually uses are the sizes APCA allows.
   */
  body: 'rgb(251 252 254 / 0.97)',
  /** Secondary text and dimension labels. */
  soft: 'rgb(251 252 254 / 0.94)',
  /** Panel borders, column rules, section rules. Non-text only. */
  faint: 'rgb(251 252 254 / 0.42)',
  /** The lightest line work. Non-text only. */
  hair: 'rgb(251 252 254 / 0.24)',
  /** Fill inside stroked display type, so the outline still reads as solid. */
  drafted: 'rgb(251 252 254 / 0.34)',
} as const;

/**
 * Matte board, not a lit surface.
 *
 * These used to be four saturated radials at 0.22–0.72 alpha, and between them
 * they were what made the page read as glossy: a bright pool top left, a dark
 * one bottom right, and a blue cast over both. That is a sheen. A matte surface
 * scatters instead — it has a fall, but a shallow and almost colourless one,
 * and what texture it has comes from the tooth of the paper rather than from
 * the light.
 *
 * So the radials are held to a quarter of what they were and most of the blue
 * is out of them; the grain in global.css does the rest of the work and is
 * turned up to meet it. Raising these back up is how the gloss returns.
 */
export const GROUND = {
  /** The lit corner, top left — a fall of light, not a highlight. */
  lit: 'rgb(38 48 64 / 0.12)',
  /** The shaded corner, bottom right. */
  shade: 'rgb(2 4 8 / 0.30)',
  /** A second, weaker source. */
  glow: 'rgb(32 42 58 / 0.07)',
  /** The pool of dark it leaves. */
  pool: 'rgb(2 4 8 / 0.22)',
  /** Fall-off at the margins, as a board has where it has been handled. */
  vignette: 'rgb(1 2 5 / 0.42)',
} as const;

/** Marks made by hand rather than by pen. */
export const MARKS = {
  /**
   * Margin notes and the signature — chalk on a blueprint, not graphite.
   *
   * Lightened from `#E3BE86`, which measured Lc 69 over the painted ground and
   * so wanted a 20px minimum for a note set at 17px in Chinese. Chalk is the
   * paler mark anyway.
   */
  pencil: '#EDD0A6',
  /**
   * The approval stamp's red — rules, borders and the focus ring.
   *
   * Non-text, and comfortably over the 3:1 WCAG 2.2 (1.4.11) asks of a focus
   * indicator. Do not use it for lettering: see `stampInk`.
   */
  stamp: '#FF7A5C',
  /**
   * The stamp's lettering.
   *
   * A 2px rule and a 15px word have different contrast floors — Lc 45 against
   * Lc 75 — and the stamp is both at once. Setting the words in the rule's red
   * measured Lc 34, which APCA puts at a 67px minimum: unreadable at any size
   * the stamp could be. So the red stays the red for everything drawn, and the
   * words take a paler tint of it. Keeping one colour for both means either an
   * illegible stamp or a washed-out focus ring.
   */
  stampInk: '#FFBCAC',
  /** Cast shadow under a drafted panel. */
  shadow: 'rgb(0 0 0 / 0.55)',
  /** The hairline inset that gives a panel its thickness. */
  inset: 'rgb(242 246 251 / 0.06)',
} as const;

/**
 * Line-length caps.
 *
 * Measured, not guessed. Cormorant is an unusually narrow face — about 6.8px
 * per character at 18px — so a 37rem column runs to 87 characters, well past
 * the 45-85 that stays comfortable to track. Anything holding running prose
 * takes `--measure`; larger type takes `--measure-wide`, which is the same
 * character count at a bigger size.
 */
export const MEASURE = {
  base: '33rem',
  wide: '28rem',
} as const;

/**
 * The mono label — one size floor and one weight, set once.
 *
 * APCA's minimum size is a function of contrast *and* weight, and the two
 * trade against each other: at the ink these labels use, weight 400 asks for
 * 16.5px and weight 600 asks for 14.6px. The labels are tracked uppercase in
 * a mono face, where 15px is the size the layout wants and 400 is simply too
 * light to carry it — which is the other half of what readers meant by "the
 * text is too thin".
 *
 * So the weight is a token, not a per-rule decision: `base` is the smallest a
 * label may be anywhere, `lg` is for the ones carrying a section's name rather
 * than a figure number, and `weight` goes with both. Dropping the weight back
 * to 400 puts every label using it under the APCA floor.
 */
export const LABEL = {
  base: '0.9375rem',
  lg: '1rem',
  weight: '600',
} as const;

/**
 * The spacing scale.
 *
 * There wasn't one. Padding, margin and gap were written as literals and had
 * drifted to twenty-seven distinct values between 0.125rem and 4rem — 1.1rem
 * next to 1.125rem next to 1.25rem, none of them meaning anything different.
 * A scale nobody can name is a scale nobody can adjust: tightening the site by
 * a notch meant finding two hundred declarations and deciding each one again.
 *
 * These ten are the values the design was already reaching for most often, so
 * adopting them moved nothing on the page. The genuine one-offs that remain
 * are left as literals rather than snapped to the nearest step — a number that
 * is deliberately not on the scale should look like one.
 */
export const SPACE = {
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '2rem',
  8: '2.5rem',
  9: '3rem',
  10: '4rem',
} as const;

/**
 * How a mineral is drawn, wherever it is drawn.
 *
 * A mineral is never the colour of a word (see MINERALS and CLAUDE.md — on this
 * ground the seven measure Lc 25-48 as lettering). It is a mark beside the word
 * or under it, and this is how thick that mark is. It was written `3px` in five
 * separate rules across four views; now the rules read the token and the weight
 * of every mineral mark on the site is one edit.
 */
export const MINERAL = {
  weight: '3px',
} as const;

/** Grid geometry for the blueprint ruling. */
export const GRID = {
  minor: '24px',
  major: '120px',
} as const;

/**
 * The ruling's own ink, held well below the drawn line's.
 *
 * The blueprint grid used to be painted in `--ink-faint` and `--ink-hair` —
 * the same two tokens that draw the column rules and the panel borders. That
 * coupling is what made the ruling the site's worst contrast problem: those
 * alphas exist to make *line work* read, and raising them for that purpose
 * raised the grid with them. Under `plus-lighter` a major crossing was
 * compositing to rgb(106 112 120) over a ground of rgb(5 9 15), so any text
 * unlucky enough to cross one was scored against a ground twenty times
 * brighter than the sheet.
 *
 * These are the ruling's alphas and nothing else's. A major line lands about
 * 19/255 above the sheet and a crossing about 36 — legible as ground, far too
 * dark to eat a text block's contrast. Raising them is not a styling choice;
 * it is a contrast regression.
 */
export const RULE = {
  /** Major grid line, at 120px. */
  major: 'rgb(242 246 251 / 0.16)',
  /** Minor grid line, at 24px. */
  minor: 'rgb(242 246 251 / 0.09)',
} as const;

export const TYPE = {
  /**
   * The big drafted lockups, and nothing else.
   *
   * Cormorant's x-height is 0.386 em — measured off the vendored file, against
   * 0.46–0.53 for a face cut for running text. At a 17px body size its
   * lowercase renders about 6.6px tall, which is why readers called the text
   * thin: it is not the weight, it is that the letters are a third smaller
   * than the size implies. At 4rem, in a two-word lockup, that delicacy is
   * exactly what makes it worth keeping.
   */
  display: "'Cormorant Garamond', ui-serif, Georgia, serif",
  /**
   * Everything a reader actually reads.
   *
   * IBM Plex Serif sits at 0.516 and is the sibling of the Plex Mono already
   * carrying every label on the site, so the voice stays industrial rather
   * than literary — which suits a drawing sheet better than a Garamond did.
   */
  serif: "'IBM Plex Serif', ui-serif, Georgia, serif",
  /** Labels, figures, dimensions, the title block. */
  mono: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  /** Margin notes and the signature — written, not set. */
  hand: "'Caveat', ui-rounded, cursive",
  /*
   * Chinese, and every face in it is a serif.
   *
   * That is the whole of the fix, and it was a real bug: this stack used to
   * end `'Songti SC', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
   * sans-serif`. The first three entries are serifs and the last four are
   * sans, so which one a reader got depended entirely on their platform — a
   * Mac found Songti and set the body in a serif, a Windows machine fell past
   * Songti to Microsoft YaHei and set it in a sans, beside Latin that was
   * serif either way. Same page, two different pairings. `STSong` and `SimSun`
   * are the Mac and Windows serifs, and the generic at the end is `serif`, so
   * the pairing is now the same everywhere.
   *
   * Nothing here is self-hosted. Measured: an exact subset of the 880 Han
   * characters this site currently sets costs 149 kB per weight in Noto Serif
   * SC, and it would have to be re-cut on every build — the blog renders from
   * Sanity per request, so a post published without a rebuild would fall
   * outside the subset mid-sentence. The content-independent alternative,
   * GB2312 Level 1, is 699 kB per weight; Google's own unicode-range chunking
   * delivers about 1.6 MB to a Chinese reader. Against three woff2 families
   * totalling 480 kB, none of those is a trade worth making for a face every
   * platform already ships a good version of. Latin runs first in the stack so
   * a proper noun inside a Chinese sentence still sets in Plex.
   */
  cjk: "'IBM Plex Serif', ui-serif, 'Noto Serif CJK SC', 'Source Han Serif SC', 'Songti SC', 'STSong', 'SimSun', serif",
  /**
   * The mono equivalent: Latin from IBM Plex, Han from the system.
   *
   * `Mzizi CJK Label` is not a font — it is the size-adjusted alias declared in
   * global.css, and it has to sit ahead of the real family names so the Han in
   * a label is scaled up before the unadjusted faces are reached. Latin still
   * comes from Plex, which is listed first and is untouched by the adjust.
   */
  cjkMono:
    "'IBM Plex Mono', ui-monospace, 'Mzizi CJK Label', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
} as const;

/**
 * Render every token as CSS custom properties on `:root`.
 *
 * Generated at build time rather than hand-maintained, so the TypeScript above
 * stays the single source of truth and the two cannot drift.
 */
export function tokensToCss(): string {
  const lines: string[] = [':root {'];

  lines.push('  /* Mzizi minerals — the rail and the accents */');
  for (const m of MINERALS) {
    lines.push(`  --mineral-${m.name}: ${m.hex};`);
    lines.push(`  --mineral-${m.name}-container: ${m.container};`);
  }

  const groups: ReadonlyArray<readonly [string, string, Readonly<Record<string, string>>]> = [
    ['Sheet', 'sheet', SHEET],
    ['Ground', 'ground', GROUND],
    ['Ink', 'ink', INK],
    ['Measure', 'measure', MEASURE],
    ['Marks', '', MARKS],
    ['Label', 'label', LABEL],
    ['Space', 'space', SPACE],
    ['Mineral', 'mineral', MINERAL],
    ['Grid', 'grid', GRID],
    ['Rule', 'rule', RULE],
    ['Type', '', TYPE],
  ];

  for (const [label, prefix, group] of groups) {
    lines.push(`  /* ${label} */`);
    for (const [key, value] of Object.entries(group)) {
      lines.push(`  --${varName(prefix, key)}: ${value};`);
    }
  }

  lines.push('}');
  return lines.join('\n');
}

/**
 * `--sheet-deep`, `--ink-soft`, `--pencil`.
 *
 * A `base` key means "the group's own name", so INK.base becomes `--ink`
 * rather than `--ink-base`.
 */
function varName(prefix: string, key: string): string {
  const kebabbed = kebab(key);
  if (!prefix) return kebabbed;
  return kebabbed === 'base' ? prefix : `${prefix}-${kebabbed}`;
}

function kebab(value: string): string {
  return value.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
}
