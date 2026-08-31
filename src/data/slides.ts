/**
 * The talk, as data.
 *
 * The deck used to be 1,345 lines of hand-written markup with the copy, the
 * layout and the styling interleaved — a wording change meant editing HTML.
 * The slides are typed records now, same as `src/data/` on bryanfawcett.com,
 * so a copy edit never means touching layout.
 *
 * `kind` picks the layout a slide gets. Adding a slide means adding a record
 * here; adding a *shape* means a new `kind` and a branch in Slide.astro.
 */
import type { MineralName } from '../brand/minerals.js';

/** A run of copy with optional emphasis, kept as data rather than markup. */
export interface Lede {
  text: string;
  /** Substrings to set in full-strength ink rather than body ink. */
  mark?: readonly string[];
}

interface Base {
  /** Shown in the slide's own corner, and in the contents. */
  title: string;
  /** The mineral this slide is keyed to — its rule, its marker, its dot. */
  mineral: MineralName;
}

export interface StatementSlide extends Base {
  kind: 'statement';
  eyebrow: string;
  lede: Lede;
  /** The one line the slide exists to land. */
  pull?: string;
  body?: readonly Lede[];
}

export interface JourneySlide extends Base {
  kind: 'journey';
  eyebrow: string;
  lede: Lede;
  stops: readonly { period: string; place: string; role: string; detail: string }[];
}

export interface ColumnsSlide extends Base {
  kind: 'columns';
  eyebrow: string;
  lede: Lede;
  columns: readonly {
    heading: string;
    items: readonly { term: string; href?: string; detail: string }[];
  }[];
  note?: string;
}

export interface GridSlide extends Base {
  kind: 'grid';
  eyebrow: string;
  lede: Lede;
  cards: readonly { heading: string; detail: string }[];
  note?: string;
}

export interface TitleSlide extends Base {
  kind: 'title';
  eyebrow: string;
  display: readonly [string, string];
  standfirst: string;
  lede: Lede;
}

export type Slide = TitleSlide | StatementSlide | JourneySlide | ColumnsSlide | GridSlide;

export const SLIDES: readonly Slide[] = [
  {
    kind: 'title',
    title: 'Origins',
    mineral: 'cobalt',
    eyebrow: 'Equity · The assumptions we make in learning',
    display: ['Origins', 'with perspective'],
    standfirst: 'A Zimbabwe perspective on human potential',
    lede: {
      text: 'I want to bring something to our equity lens today, and it starts with origins — both where I came from and where education itself began.',
      mark: ['origins'],
    },
  },

  {
    kind: 'statement',
    title: 'My Zimbabwe origins',
    mineral: 'malachite',
    eyebrow: 'Sheet 01 · Where I am from',
    lede: {
      text: 'I am from Zimbabwe — the only team member here who is a citizen of a non-first-world country.',
      mark: ['Zimbabwe'],
    },
    pull: 'Skills meant survival and success, not grades or good school names.',
    body: [
      {
        text: 'Growing up in Zimbabwe in the 90s, 2000s and 2010s taught me something fundamental about what capability actually is.',
      },
      {
        text: 'When infrastructure fails regularly, when you must collaborate to solve problems no textbook covers, when innovation means the difference between thriving and merely surviving — you develop a different understanding of what intelligence really looks like.',
      },
    ],
  },

  {
    kind: 'statement',
    title: 'Capability over credentials',
    mineral: 'gold',
    eyebrow: 'Sheet 02 · What actually counted',
    lede: {
      text: 'In Zimbabwe I learned that real-world success comes from adapting, collaborating, and solving unexpected problems.',
      mark: ['adapting, collaborating, and solving unexpected problems'],
    },
    pull: 'Not from following the traditional pathway of good grades → good college → good job.',
    body: [
      {
        text: 'You succeeded based on what you could actually do — your ability to think critically, adapt quickly, and work with others on real problems. Capability mattered more than credentials.',
        mark: ['do'],
      },
    ],
  },

  {
    kind: 'statement',
    title: "Education's true origins",
    mineral: 'copper',
    eyebrow: 'Sheet 03 · Where this came from',
    lede: {
      text: "That perspective made me curious about education's origins. The greatest centres of learning — ancient Alexandria, the Renaissance academies — focused on developing minds capable of original thought and real-world application.",
      mark: ["education's origins"],
    },
    pull: 'When did we shift from cultivating intellectual excellence to measuring test-taking ability?',
    body: [
      {
        text: 'Scholars were evaluated on their ability to contribute new knowledge, engage in meaningful discourse, and solve complex problems — not on their capacity for memorisation under artificial constraints.',
      },
      {
        text: 'When did we begin filtering our most promising minds on their performance in artificial, high-pressure situations rather than their capacity for deep thinking?',
      },
    ],
  },

  {
    kind: 'statement',
    title: 'Fresh eyes on our work',
    mineral: 'sodalite',
    eyebrow: 'Sheet 04 · Where I sit now',
    lede: {
      text: 'Many of you know me as the IT guy — but that is one part of it. Technology and innovation coordination, AI tooling, the Toddle transition.',
      mark: ['the IT guy'],
    },
    pull: 'We are introducing technologies that recall information instantly, while still assessing students on their ability to memorise it under time pressure.',
    body: [
      {
        text: 'My Zimbabwe background gives me a particular lens: I have seen what happens when we measure actual capability instead of academic performance. And I am wondering what we might be missing.',
      },
    ],
  },

  {
    kind: 'journey',
    title: 'The path here',
    mineral: 'tanzanite',
    eyebrow: 'Sheet 05 · How I got here',
    lede: {
      text: 'Zimbabwe to South Africa to Japan to Singapore. Classroom to server room to strategy — which is why I keep asking questions that sit awkwardly between all three.',
    },
    stops: [
      {
        period: '2012',
        place: 'Zimbabwe',
        role: 'Head of Products, eLearning Solutions',
        detail:
          'Took digital content and Intel Teach training into Zimbabwean schools — running 21st-century learning workshops in computer labs that often had no reliable power.',
      },
      {
        period: '2012 – 2013',
        place: 'Harare, Zimbabwe',
        role: "Teacher, St John's College",
        detail:
          'Geography, IT and History for Forms 1–3, plus cricket, field hockey and the Grade 8 outdoor education camp. My first view of assessment from the other side of the desk.',
      },
      {
        period: '2014 – 2016',
        place: 'Johannesburg, South Africa',
        role: 'Teacher, then Assistant Principal, St John the Baptist',
        detail:
          'Built hands-on Cambridge Checkpoint and IGCSE curriculum for students from underserved communities in Roodepoort, then moved into administration, instructional technology and campus infrastructure.',
      },
      {
        period: '2016 – present',
        place: 'Africa, remote',
        role: 'Founder, Nyuchi Africa',
        detail:
          'A decade of building digital infrastructure for African communities under the Ubuntu philosophy — "I am because we are". Learning, language, news, events, travel.',
      },
      {
        period: '2019 – 2023',
        place: 'Osaka, Japan',
        role: 'ICT Coordinator & Network Manager, Osaka YMCA International School',
        detail:
          'Stood up the technology for an entire new high school campus — network, CCTV, classroom tech, device management across five operating systems — and built the behaviour and medical data reporting the school ran on.',
      },
      {
        period: '2023 – present',
        place: 'Singapore',
        role: 'Technology & Innovation Coordinator, Singapore American School',
        detail:
          'Arrived here through IT infrastructure and privacy & governance. Now working on how technology changes what teaching and learning can actually look like.',
      },
    ],
  },

  {
    kind: 'columns',
    title: "What I'm building",
    mineral: 'malachite',
    eyebrow: 'Sheet 06 · The work',
    lede: {
      text: 'Two halves of the same question — one inside a school, one across a continent.',
    },
    columns: [
      {
        heading: 'Singapore American School',
        items: [
          {
            term: 'AI tooling for educators',
            detail:
              'Introducing tools that recall and synthesise information instantly — which is exactly what makes the assessment question urgent.',
          },
          {
            term: 'The Toddle transition',
            detail:
              'Moving how we plan, document and report on learning, which means deciding what is worth capturing in the first place.',
          },
          {
            term: 'Educator Eval & the Digital Toolkit',
            detail:
              'Platforms for evaluation, growth conversations, shared tools, and a single place for institutional knowledge to live.',
          },
          {
            term: 'Privacy & governance',
            detail:
              'The groundwork before any of this: student data handled properly, systems that hold up to scrutiny.',
          },
        ],
      },
      {
        heading: 'Nyuchi Africa',
        items: [
          {
            term: 'Nyuchi Learning',
            href: 'https://learning.nyuchi.com',
            detail: 'Open-source K-12 digital transformation frameworks, built for African schools.',
          },
          {
            term: 'Nyuchi Lingo',
            href: 'https://lingo.nyuchi.com',
            detail: 'A language learning platform for African languages.',
          },
          {
            term: 'Mukoko',
            href: 'https://mukoko.com',
            detail:
              'A privacy-focused social platform, and pan-African news aggregated from trusted regional sources.',
          },
          {
            term: 'Nhimbe',
            href: 'https://nhimbe.com',
            detail:
              'Community events and gatherings — named for the Shona tradition of working a field together.',
          },
        ],
      },
    ],
    note: 'The Nyuchi work was built for places where credentials were never the thing that got you through. That is the same instinct I bring to the work at school.',
  },

  {
    kind: 'grid',
    title: 'The conceptual age',
    mineral: 'cobalt',
    eyebrow: 'Sheet 07 · What the work asks for',
    lede: {
      text: 'Daniel Pink calls this the Conceptual Age — where the skills that drove success in Zimbabwe become the skills that drive success everywhere.',
      mark: ['Conceptual Age'],
    },
    cards: [
      {
        heading: 'Critical thinking',
        detail:
          'Analysing complex problems, questioning assumptions, and synthesising solutions from multiple perspectives.',
      },
      {
        heading: 'Creativity',
        detail:
          'Innovation and design thinking that creates new possibilities and approaches to challenges.',
      },
      {
        heading: 'Collaboration',
        detail:
          'Working effectively with diverse teams to achieve shared goals and build collective understanding.',
      },
      {
        heading: 'Communication',
        detail:
          'Sharing ideas clearly, building bridges between perspectives, and creating meaningful dialogue.',
      },
    ],
    note: 'Looking at our seven core capabilities, how might we capture these more fully in how we assess learning?',
  },

  {
    kind: 'grid',
    title: "Let's explore together",
    mineral: 'terracotta',
    eyebrow: 'Sheet 08 · The questions',
    lede: {
      text: 'This connects directly to our equity framework: what assumptions are we making about students, and how can we challenge those assumptions?',
    },
    cards: [
      {
        heading: 'Different perspectives',
        detail:
          'What might we discover about how different minds demonstrate understanding? How do cultural backgrounds shape what we recognise as intelligence?',
      },
      {
        heading: 'Cultural lens',
        detail:
          'How do different backgrounds shape what we see as intelligence? What valuable ways of knowing might we be overlooking?',
      },
      {
        heading: 'Hidden barriers',
        detail:
          'Could our assessment methods create unintended barriers? Are there brilliant minds we are filtering out before we recognise their potential?',
      },
      {
        heading: 'Strategic alignment',
        detail:
          'How might we better showcase our seven capabilities through tools like Toddle? What opportunities exist to capture learning in new ways?',
      },
    ],
  },

  {
    kind: 'statement',
    title: 'The questions that matter',
    mineral: 'gold',
    eyebrow: 'Sheet 09 · Close',
    lede: {
      text: 'I do not have answers — just questions from someone seeing our work through a different lens.',
    },
    pull: 'As the only team member from a non-first-world country, I wonder: are there brilliant minds we are missing because we are measuring the wrong things?',
    body: [
      {
        text: 'What are your thoughts? What have you noticed about how different students demonstrate these capabilities?',
      },
      { text: 'Thank you for this journey of discovery.' },
    ],
  },
] as const;
