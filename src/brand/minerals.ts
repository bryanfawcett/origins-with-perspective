/**
 * The seven Mzizi minerals.
 *
 * Mirrored from the Mzizi design system (mzizi.dev/api/v1, `minerals` family)
 * so the site builds without a network call. Each mineral carries the origin
 * and meaning it was named for — that provenance is the point of the palette,
 * not decoration.
 *
 * The site is a cyanotype: pale line work on a deep blue ground. `hex` is
 * therefore Mzizi's dark-surface value, the one that holds contrast against
 * that ground. `onLight` keeps the paper-readable value so the same file can
 * serve a light property (StationKit, bundu.org) without a second source of
 * truth.
 */

export interface Mineral {
  /** Token name, used to build the CSS custom property `--mineral-<name>`. */
  readonly name: string;
  /** Value this site draws in. Holds contrast against the deep blue ground. */
  readonly hex: string;
  /** Paper-readable value, for a light property consuming the same tokens. */
  readonly onLight: string;
  /** Companion tone for container fills. */
  readonly container: string;
  /** Where the stone is mined. */
  readonly origin: string;
  /** What it stands for in the system. */
  readonly symbolism: string;
  /** What it is for, in interface terms. */
  readonly usage: string;
}

export const MINERALS = [
  {
    name: 'cobalt',
    hex: '#00B0FF',
    onLight: '#0047AB',
    container: '#E3F2FD',
    origin: 'Katanga (DRC) and the Zambian Copperbelt',
    symbolism: 'Digital future, trust, knowledge',
    usage: 'Links, focus rings, informational states',
  },
  {
    name: 'tanzanite',
    hex: '#B388FF',
    onLight: '#4B0082',
    container: '#F3E5F5',
    origin: 'Merelani Hills, Tanzania',
    symbolism: 'Premium, creativity, connection',
    usage: 'Primary brand accent',
  },
  {
    name: 'malachite',
    hex: '#64FFDA',
    onLight: '#004D40',
    container: '#E0F2F1',
    origin: 'Congo Copper Belt',
    symbolism: 'Growth, nature, success',
    usage: 'Success states, positive actions',
  },
  {
    name: 'gold',
    hex: '#FFD740',
    onLight: '#9A6F00',
    container: '#FFF8E1',
    origin: 'Ghana, South Africa, Mali',
    symbolism: 'Honey, rewards, warmth',
    usage: 'Achievements and highlights',
  },
  {
    name: 'terracotta',
    hex: '#E1B07E',
    onLight: '#A0522D',
    container: '#F5E6D3',
    origin: 'the Pan-African Sahel',
    symbolism: 'Earth, community, grounding',
    usage: 'Community surfaces, warmth',
  },
  {
    name: 'sodalite',
    hex: '#3D5AFE',
    onLight: '#283593',
    container: '#E8EAF6',
    origin: 'the Kunene River, Namibia and South Africa',
    symbolism: 'Intelligence, depth, reasoning',
    usage: 'AI surfaces, deep-reasoning states',
  },
  {
    name: 'copper',
    hex: '#FF8A65',
    onLight: '#BF5A36',
    container: '#FBE4DA',
    origin: 'the Central African Copperbelt, Zambia and DRC',
    symbolism: 'Connection, foundation, stewardship',
    usage: 'Ecosystem identity, the commons',
  },
] as const satisfies readonly Mineral[];

export type MineralName = (typeof MINERALS)[number]['name'];

const BY_NAME = new Map<string, Mineral>(MINERALS.map((m) => [m.name, m]));

/** Look a mineral up by name. Typed so a typo fails at compile time. */
export function mineral(name: MineralName): Mineral {
  const found = BY_NAME.get(name);
  /* c8 ignore next 3 -- unreachable while MineralName is derived from MINERALS */
  if (!found) {
    throw new Error(`Unknown mineral: ${name}`);
  }
  return found;
}

/** `var(--mineral-cobalt)` — for inline styles and component props. */
export function mineralVar(name: MineralName): string {
  return `var(--mineral-${name})`;
}

/**
 * Key an element to a mineral: `style={keyedTo('cobalt')}`.
 *
 * Everything that carries a mineral reads one property, `--mineral`, and this
 * is the only place the declaration is written. It used to be eight — panels
 * set `--panel-mineral`, schedule rows `--row-mineral`, journey stops
 * `--stop-mineral`, the mineral key just `--m` — eight names for one idea, so
 * changing how a mineral is expressed meant finding all eight. Prefer the
 * `mineral` prop on `<Panel>`; use this for the plain elements that are not
 * panels.
 */
export function keyedTo(name: MineralName): string {
  return `--mineral: ${mineralVar(name)}`;
}
