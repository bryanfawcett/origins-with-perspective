//! The talk, as data: `data/slides.json`, one record per slide.
//!
//! The shape is the `kind`; adding a slide is a record, adding a shape is a
//! variant here and a branch in `render.rs`.

use serde::Deserialize;

/// A run of copy with optional emphasis, kept as data rather than markup.
#[derive(Debug, Deserialize, Clone)]
pub struct Lede {
    pub text: String,
    /// Substrings to set in full-strength ink rather than body ink.
    #[serde(default)]
    pub mark: Vec<String>,
}

#[derive(Debug, Deserialize)]
pub struct Stop {
    pub period: String,
    pub place: String,
    pub role: String,
    pub detail: String,
}

#[derive(Debug, Deserialize)]
pub struct Item {
    pub term: String,
    pub href: Option<String>,
    pub detail: String,
}

#[derive(Debug, Deserialize)]
pub struct Column {
    pub heading: String,
    pub items: Vec<Item>,
}

#[derive(Debug, Deserialize)]
pub struct Card {
    pub heading: String,
    pub detail: String,
}

#[derive(Debug, Deserialize)]
#[serde(tag = "kind", rename_all = "lowercase")]
pub enum Slide {
    Title {
        title: String,
        mineral: String,
        eyebrow: String,
        display: [String; 2],
        standfirst: String,
        lede: Lede,
    },
    Statement {
        title: String,
        mineral: String,
        eyebrow: String,
        lede: Lede,
        pull: Option<String>,
        body: Option<Vec<Lede>>,
    },
    Journey {
        title: String,
        mineral: String,
        eyebrow: String,
        lede: Lede,
        stops: Vec<Stop>,
    },
    Columns {
        title: String,
        mineral: String,
        eyebrow: String,
        lede: Lede,
        #[serde(default)]
        columns: Vec<Column>,
        note: Option<String>,
        /// Take the heading, lede, columns and note from `data/site.json` instead
        /// of this record, so the slide is the Origins page's own content.
        #[serde(default)]
        from_site: Option<String>,
        /// One slide per column instead of all of them side by side. A slide that
        /// carries a dozen items is a page, not a slide; this gives each strand the
        /// stage to itself.
        #[serde(default)]
        split: bool,
    },
    Grid {
        title: String,
        mineral: String,
        eyebrow: String,
        lede: Lede,
        cards: Vec<Card>,
        note: Option<String>,
    },
}

impl Slide {
    pub fn title(&self) -> &str {
        match self {
            Slide::Title { title, .. }
            | Slide::Statement { title, .. }
            | Slide::Journey { title, .. }
            | Slide::Columns { title, .. }
            | Slide::Grid { title, .. } => title,
        }
    }

    pub fn mineral(&self) -> &str {
        match self {
            Slide::Title { mineral, .. }
            | Slide::Statement { mineral, .. }
            | Slide::Journey { mineral, .. }
            | Slide::Columns { mineral, .. }
            | Slide::Grid { mineral, .. } => mineral,
        }
    }

    pub fn eyebrow(&self) -> &str {
        match self {
            Slide::Title { eyebrow, .. }
            | Slide::Statement { eyebrow, .. }
            | Slide::Journey { eyebrow, .. }
            | Slide::Columns { eyebrow, .. }
            | Slide::Grid { eyebrow, .. } => eyebrow,
        }
    }

    pub fn lede(&self) -> &Lede {
        match self {
            Slide::Title { lede, .. }
            | Slide::Statement { lede, .. }
            | Slide::Journey { lede, .. }
            | Slide::Columns { lede, .. }
            | Slide::Grid { lede, .. } => lede,
        }
    }

    pub fn kind(&self) -> &'static str {
        match self {
            Slide::Title { .. } => "title",
            Slide::Statement { .. } => "statement",
            Slide::Journey { .. } => "journey",
            Slide::Columns { .. } => "columns",
            Slide::Grid { .. } => "grid",
        }
    }
}

/// The seven minerals, in the order the rail shows them (top to bottom).
pub const MINERALS: [&str; 7] =
    ["cobalt", "tanzanite", "malachite", "gold", "terracotta", "sodalite", "copper"];

/// The exported site data: only the part the deck reads.
#[derive(Debug, Deserialize)]
pub struct Site {
    pub origins_work: OriginsWork,
}

#[derive(Debug, Deserialize)]
pub struct OriginsWork {
    pub heading: String,
    pub lede: String,
    pub columns: Vec<WorkColumn>,
    pub note: String,
}

#[derive(Debug, Deserialize)]
pub struct WorkColumn {
    pub heading: String,
    pub items: Vec<WorkItem>,
}

#[derive(Debug, Deserialize)]
pub struct WorkItem {
    pub title: String,
    pub detail: String,
    pub href: Option<String>,
}

impl Slide {
    /// Fill a slide that names `from_site` from the exported data. Anything else is
    /// left exactly as written.
    pub fn apply_site(&mut self, site: &Site) {
        let Slide::Columns { title, lede, columns, note, from_site, .. } = self else { return };
        match from_site.as_deref() {
            Some("origins_work") => {
                let w = &site.origins_work;
                *title = w.heading.clone();
                *lede = Lede { text: w.lede.clone(), mark: Vec::new() };
                *columns = w
                    .columns
                    .iter()
                    .map(|c| Column {
                        heading: c.heading.clone(),
                        items: c
                            .items
                            .iter()
                            .map(|i| Item { term: i.title.clone(), href: i.href.clone(), detail: i.detail.clone() })
                            .collect(),
                    })
                    .collect();
                *note = Some(w.note.clone());
            }
            Some(other) => {
                eprintln!("unknown from_site source: {other}");
                std::process::exit(2);
            }
            None => {}
        }
    }
}

impl Slide {
    /// Replace a `split` columns slide with one slide per column. Every other slide
    /// comes back unchanged. The first keeps the lede; the last keeps the note.
    pub fn expand(self) -> Vec<Slide> {
        let Slide::Columns { title, mineral, eyebrow, lede, columns, note, from_site, split: true } = self else {
            return vec![self];
        };
        let count = columns.len();
        columns
            .into_iter()
            .enumerate()
            .map(|(i, column)| Slide::Columns {
                // The strand is the slide's heading, so the dots and the overview name it.
                title: column.heading.clone(),
                mineral: mineral.clone(),
                eyebrow: format!("{eyebrow} · {title} · {} of {count}", i + 1),
                lede: if i == 0 { lede.clone() } else { Lede { text: String::new(), mark: Vec::new() } },
                columns: vec![Column { heading: String::new(), items: column.items }],
                note: if i + 1 == count { note.clone() } else { None },
                from_site: from_site.clone(),
                split: false,
            })
            .collect()
    }
}
