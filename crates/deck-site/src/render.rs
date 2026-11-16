//! The deck as HTML: the shell, the five slide shapes, and the controls.
//!
//! Markup and class names follow the Astro version this replaces, so the
//! behaviours that depend on them (the no-script fallback, focus, announcements)
//! carry over unchanged.

use maud::{DOCTYPE, Markup, PreEscaped, html};

use crate::marked;
use crate::model::{Lede, MINERALS, Slide, keyed};

const CANONICAL: &str = "https://origins-with-perspective.nyuchi.workers.dev/";
pub const TITLE: &str = "Origins with a Perspective on Human Potential — Bryan Fawcett";
pub const DESCRIPTION: &str = "A talk on equity and the assumptions we make in learning: what growing up in Zimbabwe taught me about measuring capability instead of credentials.";

fn marked(lede: &Lede) -> Markup {
    html! {
        @for run in marked::split(lede) {
            @if run.on { em.marked { (run.text) } } @else { (run.text) }
        }
    }
}

fn slide(s: &Slide, index: usize, total: usize) -> Markup {
    let figure = format!("{:02} / {:02}", index + 1, total);
    let label = format!("Slide {} of {}: {}", index + 1, total, s.title());

    // `tabindex="0"` because a slide is its own scroll container: some overflow
    // (the journey carries six stops), and a scrollable region that cannot take
    // focus is one a keyboard user cannot scroll. Only one slide is ever
    // non-inert, so this adds exactly one tab stop.
    html! {
        section.slide tabindex="0" data-kind=(s.kind()) data-title=(s.title())
            style=(keyed(s.mineral())) aria-label=(label) {
            div.slide__shell {
                p.fig { (figure) }

                @if let Slide::Title { display, standfirst, lede, eyebrow, .. } = s {
                    header.title {
                        p.eyebrow { (eyebrow) }
                        h1.title__display {
                            span.title__line { (display[0]) }
                            " "
                            span."title__line title__line--drafted" { (display[1]) }
                        }
                        p."title__standfirst" { (standfirst) }
                        p.lede { (marked(lede)) }
                    }
                } @else {
                    header."slide__head" {
                        p.eyebrow { (s.eyebrow()) }
                        h2."slide__title" { (s.title()) }
                        p.lede { (marked(s.lede())) }
                    }
                }

                @match s {
                    Slide::Statement { pull, body, .. } => {
                        div.statement {
                            @if let Some(pull) = pull { p.pull { (pull) } }
                            @if let Some(body) = body {
                                @for p in body { p."statement__p" { (marked(p)) } }
                            }
                        }
                    }
                    Slide::Journey { stops, .. } => {
                        ol.journey {
                            @for stop in stops {
                                li."journey__stop" {
                                    p."journey__meta" { (stop.period) " · " (stop.place) }
                                    // Wrapped: as bare siblings these auto-place into
                                    // successive grid cells and the detail lands back
                                    // under the date.
                                    div."journey__body" {
                                        h3."journey__role" { (stop.role) }
                                        p."journey__detail" { (stop.detail) }
                                    }
                                }
                            }
                        }
                    }
                    Slide::Columns { columns, note, .. } => {
                        div.columns {
                            @for col in columns {
                                section.column {
                                    h3."column__head" { (col.heading) }
                                    ul."column__list" {
                                        @for item in &col.items {
                                            li {
                                                span."column__term" {
                                                    @if let Some(href) = &item.href {
                                                        a href=(href) target="_blank" rel="noopener noreferrer" { (item.term) }
                                                    } @else { (item.term) }
                                                }
                                                span."column__detail" { (item.detail) }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        @if let Some(note) = note { p.note { (note) } }
                    }
                    Slide::Grid { cards, note, .. } => {
                        ul.cards {
                            @for card in cards {
                                li.card {
                                    h3."card__head" { (card.heading) }
                                    p."card__detail" { (card.detail) }
                                }
                            }
                        }
                        @if let Some(note) = note { p.note { (note) } }
                    }
                    Slide::Title { .. } => {}
                }
            }
        }
    }
}

/// The contents: every slide at a glance, one tap to jump. Opened with `O`.
fn overview(slides: &[Slide]) -> Markup {
    let total = slides.len();
    html! {
        div.overview #overview hidden role="dialog" aria-modal="true" aria-label="All slides" {
            div."overview__inner" {
                p."overview__head" { "All slides" span { "Esc to close" } }
                ol."overview__grid" {
                    @for (i, s) in slides.iter().enumerate() {
                        li {
                            button."overview__item" type="button" data-go=(i)
                                style=(keyed(s.mineral()))
                                aria-label=(format!("Slide {} of {}: {}", i + 1, total, s.title())) {
                                span."overview__n" { (format!("{:02}", i + 1)) }
                                span."overview__t" { (s.title()) }
                            }
                        }
                    }
                }
            }
        }
    }
}

fn controls(slides: &[Slide]) -> Markup {
    let total = slides.len();
    html! {
        // A real nav landmark with real buttons, not a decorative dot strip:
        // this is how the deck is driven, so it is reachable by tab and announced
        // as what it is.
        nav.controls aria-label="Slides" {
            button."controls__step" type="button" data-step="-1" aria-label="Previous slide" {
                span aria-hidden="true" { "←" }
            }
            ol."controls__marks" {
                @for (i, s) in slides.iter().enumerate() {
                    li {
                        button."controls__mark" type="button" data-go=(i)
                            style=(format!("--mineral: var(--mineral-{})", s.mineral()))
                            aria-label=(format!("Slide {} of {}: {}", i + 1, total, s.title())) {
                            span."controls__tip" aria-hidden="true" { (s.title()) }
                        }
                    }
                }
            }
            button."controls__step" type="button" data-step="1" aria-label="Next slide" {
                span aria-hidden="true" { "→" }
            }
            p."controls__count" {
                span data-current-slide { "1" }
                span."controls__of" { "/" }
                (total)
            }
            button."controls__tool" type="button" data-action="overview" aria-label="All slides (O)" { "All" }
            button."controls__tool" type="button" data-action="fullscreen" aria-label="Full screen (F)" { "Full" }
        }
    }
}

pub fn page(slides: &[Slide]) -> Markup {
    html! {
        (DOCTYPE)
        html lang="en" class="no-js" {
            head {
                meta charset="utf-8";
                meta name="viewport" content="width=device-width, initial-scale=1";
                title { (TITLE) }
                meta name="description" content=(DESCRIPTION);
                link rel="canonical" href=(CANONICAL);
                link rel="icon" href="/favicon.svg" type="image/svg+xml";

                meta property="og:type" content="website";
                meta property="og:title" content=(TITLE);
                meta property="og:description" content=(DESCRIPTION);
                meta property="og:url" content=(CANONICAL);
                meta name="twitter:card" content="summary_large_image";

                // The site's own stack, in the site's own order: the Bundu
                // standard first, then the site tokens and fonts, then this
                // deck's layout.
                link rel="stylesheet" href="/bundu-tokens.css";
                link rel="stylesheet" href="/bundu-color-scheme.css";
                link rel="stylesheet" href="/tokens.css";
                link rel="stylesheet" href="/fonts.css";
                link rel="stylesheet" href="/ground.css";
                link rel="stylesheet" href="/deck.css";
                // The driver is Rust, compiled to WebAssembly. This loader is the
                // only JavaScript, and it is generated.
                script type="module" src="/pkg/loader.js" {}
            }
            body {
                // The sheet, and the ruling over it. Absolute rather than fixed: a
                // ground that slides under the content as you move is the one
                // thing paper never does.
                div."sheet-ground" aria-hidden="true" {}
                div.blueprint aria-hidden="true" {}

                // The brand signature: seven segments, one per mineral, down the edge.
                div."mineral-rail" aria-hidden="true" {
                    @for m in MINERALS {
                        span style=(format!("background: var(--mineral-{m})")) {}
                    }
                }

                a."skip-link" href="#deck" { "Skip to the talk" }

                // The stage: a fixed 16:9 frame, scaled to the window. Slides are
                // drawn on it and never scroll, so the talk reads as a show rather
                // than a page. On a narrow screen it falls back to a scrolling slide.
                main.deck #deck {
                    div.stage {
                        @for (i, s) in slides.iter().enumerate() { (slide(s, i, slides.len())) }
                    }
                }

                div.progress aria-hidden="true" { span {} }

                (overview(slides))

                (controls(slides))

                // Announced to a screen reader on every move. Hidden slides are
                // inert to assistive tech, so without this a move would be silent.
                p."visually-hidden" role="status" aria-live="polite" data-announce {}

                (PreEscaped(""))
            }
        }
    }
}
