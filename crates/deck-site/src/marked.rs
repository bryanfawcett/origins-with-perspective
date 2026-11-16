//! A run of copy with some of its phrases lifted to full-strength ink.
//!
//! The emphasis is data (`mark: ["Zimbabwe"]` on the slide record) rather than
//! markup buried in the copy. Splitting on the phrases, instead of replacing into
//! an HTML string, means no apostrophe or ampersand in the talk is an escaping
//! question: maud escapes every run.

use crate::model::Lede;

#[derive(Debug, PartialEq, Eq)]
pub struct Run {
    pub text: String,
    pub on: bool,
}

/// Cut the text into plain and marked runs.
///
/// Longest phrase first, so a mark that contains another is not shredded by it,
/// and each phrase is matched once: marking every occurrence of a common word
/// would emphasise half the slide. (Same rules as the TypeScript this replaces.)
pub fn split(lede: &Lede) -> Vec<Run> {
    let mut parts = vec![Run { text: lede.text.clone(), on: false }];

    let mut marks: Vec<&String> = lede.mark.iter().collect();
    marks.sort_by_key(|m| std::cmp::Reverse(m.chars().count()));

    for phrase in marks {
        let mut done = false;
        let mut next = Vec::with_capacity(parts.len() + 2);
        for part in parts {
            if done || part.on {
                next.push(part);
                continue;
            }
            let Some(at) = part.text.find(phrase.as_str()) else {
                next.push(part);
                continue;
            };
            done = true;
            let (before, rest) = part.text.split_at(at);
            let after = &rest[phrase.len()..];
            for run in [
                Run { text: before.to_string(), on: false },
                Run { text: phrase.clone(), on: true },
                Run { text: after.to_string(), on: false },
            ] {
                if !run.text.is_empty() {
                    next.push(run);
                }
            }
        }
        parts = next;
    }
    parts
}

#[cfg(test)]
mod tests {
    use super::*;

    fn lede(text: &str, mark: &[&str]) -> Lede {
        Lede { text: text.into(), mark: mark.iter().map(|m| m.to_string()).collect() }
    }

    fn runs(l: &Lede) -> Vec<(String, bool)> {
        split(l).into_iter().map(|r| (r.text, r.on)).collect()
    }

    #[test]
    fn plain_text_is_one_run() {
        assert_eq!(runs(&lede("nothing marked", &[])), vec![("nothing marked".into(), false)]);
    }

    #[test]
    fn a_phrase_is_cut_out_with_its_surroundings() {
        assert_eq!(
            runs(&lede("I am from Zimbabwe — and proud.", &["Zimbabwe"])),
            vec![
                ("I am from ".into(), false),
                ("Zimbabwe".into(), true),
                (" — and proud.".into(), false),
            ]
        );
    }

    #[test]
    fn only_the_first_occurrence_is_marked() {
        let r = runs(&lede("do and do again", &["do"]));
        assert_eq!(r.iter().filter(|(_, on)| *on).count(), 1);
        assert_eq!(r[0], ("do".to_string(), true));
    }

    #[test]
    fn a_phrase_at_the_start_or_end_leaves_no_empty_run() {
        assert_eq!(
            runs(&lede("origins matter", &["origins"])),
            vec![("origins".into(), true), (" matter".into(), false)]
        );
        assert_eq!(
            runs(&lede("it all starts with origins", &["origins"])),
            vec![("it all starts with ".into(), false), ("origins".into(), true)]
        );
    }

    #[test]
    fn the_longer_phrase_wins_over_one_it_contains() {
        let r = runs(&lede("adapting, collaborating and more", &["adapting", "adapting, collaborating"]));
        assert_eq!(r[0], ("adapting, collaborating".to_string(), true));
    }

    #[test]
    fn a_phrase_that_is_absent_changes_nothing() {
        assert_eq!(runs(&lede("hello", &["goodbye"])), vec![("hello".into(), false)]);
    }

    #[test]
    fn markup_characters_stay_text() {
        // maud escapes runs; the split itself must not touch them.
        assert_eq!(runs(&lede("Tom & Jerry's <b>", &["&"])).len(), 3);
    }
}
