//! The slideshow driver: what makes a set of sections behave like a show.
//!
//! One slide is on screen at a time, on a fixed stage, and moving between them is
//! a discrete step with a direction, not a scroll position. Beyond stepping it
//! gives a presenter the usual tools: fullscreen (`F`), an all-slides overview
//! (`O`), a progress bar, and addresses (`#3`) for every slide.
//!
//! How it degrades matters as much as how it works:
//!
//! - **Without this module every slide is visible, stacked.** `no-js` is on
//!   `<html>` from the start and `start` removes it, so a reader who never gets
//!   the script gets the whole talk as a page.
//! - **`hidden` and `inert` together.** An off-screen slide must not be reachable
//!   by tab or readable by a screen reader; `hidden` alone does not stop focus in
//!   every engine, `inert` does.
//! - **The hash is a slide's address**, 1-based, so a link lands on the right
//!   slide and the back button walks the deck.

use std::{cell::Cell, cell::RefCell, rc::Rc};

use wasm_bindgen::{JsCast, JsValue, prelude::*};
use web_sys::{
    AddEventListenerOptions, Document, Event, EventTarget, FocusOptions, HtmlElement,
    KeyboardEvent, TouchEvent, Window,
};

/// A swipe counts only if it is deliberate: this far, and more across than down,
/// so scrolling never pages the deck.
const SWIPE_PX: f64 = 60.0;

struct Deck {
    window: Window,
    document: Document,
    root: HtmlElement,
    surface: Option<HtmlElement>,
    stage: Option<HtmlElement>,
    controls: Option<HtmlElement>,
    overview: Option<HtmlElement>,
    overview_items: Vec<HtmlElement>,
    slides: Vec<HtmlElement>,
    marks: Vec<HtmlElement>,
    counter: Option<HtmlElement>,
    announce: Option<HtmlElement>,
    index: usize,
}

type Shared = Rc<RefCell<Deck>>;

fn query_all(document: &Document, selector: &str) -> Vec<HtmlElement> {
    let Ok(list) = document.query_selector_all(selector) else { return Vec::new() };
    (0..list.length())
        .filter_map(|i| list.item(i))
        .filter_map(|n| n.dyn_into::<HtmlElement>().ok())
        .collect()
}

fn query_one(document: &Document, selector: &str) -> Option<HtmlElement> {
    document.query_selector(selector).ok().flatten().and_then(|e| e.dyn_into().ok())
}

impl Deck {
    /// The slide the URL names; `#1` is the first, because that is what a reader
    /// would guess. Anything else is the first slide.
    fn from_hash(&self) -> usize {
        let hash = self.window.location().hash().unwrap_or_default();
        match hash.trim_start_matches('#').parse::<i64>() {
            Ok(n) if !self.slides.is_empty() => (n - 1).clamp(0, self.slides.len() as i64 - 1) as usize,
            _ => 0,
        }
    }

    fn overview_open(&self) -> bool {
        self.overview.as_ref().is_some_and(|o| !o.hidden())
    }

    fn set_overview(&mut self, open: bool) {
        let Some(overview) = &self.overview else { return };
        overview.set_hidden(!open);
        // While the overview is up, the show behind it is not part of the page.
        for part in [&self.stage, &self.controls].into_iter().flatten() {
            let _ = part.toggle_attribute_with_force("inert", open);
        }
        if open {
            if let Some(item) = self.overview_items.get(self.index) {
                let _ = item.focus();
            }
        } else if let Some(slide) = self.slides.get(self.index) {
            let options = FocusOptions::new();
            options.set_prevent_scroll(true);
            let _ = slide.focus_with_options(&options);
        }
    }

    fn toggle_fullscreen(&self) {
        if self.document.fullscreen_element().is_some() {
            self.document.exit_fullscreen();
        } else {
            let _ = self.root.request_fullscreen();
        }
    }

    fn show(&mut self, next: i64, push: bool, moved: bool) {
        if self.slides.is_empty() {
            return;
        }
        let before = self.index;
        self.index = next.clamp(0, self.slides.len() as i64 - 1) as usize;
        let moved = moved && self.index != before;

        // The direction the next slide arrives from, for the transition.
        if self.index != before {
            if let Some(surface) = &self.surface {
                let _ = surface.set_attribute("data-dir", if self.index > before { "next" } else { "prev" });
            }
        }

        for (i, slide) in self.slides.iter().enumerate() {
            let on = i == self.index;
            slide.set_hidden(!on);
            let _ = slide.toggle_attribute_with_force("inert", !on);
            if on {
                slide.set_scroll_top(0);
            }
        }

        for (i, mark) in self.marks.iter().enumerate() {
            let current = i == self.index;
            let _ = mark.class_list().toggle_with_force("is-current", current);
            // `aria-current` is the one that carries meaning; the class is paint.
            if current {
                let _ = mark.set_attribute("aria-current", "true");
            } else {
                let _ = mark.remove_attribute("aria-current");
            }
        }
        for (i, item) in self.overview_items.iter().enumerate() {
            if i == self.index {
                let _ = item.set_attribute("aria-current", "true");
            } else {
                let _ = item.remove_attribute("aria-current");
            }
        }

        // How far through the talk, as 0..1, for the progress bar.
        let _ = self.root.style().set_property(
            "--progress",
            &((self.index + 1) as f64 / self.slides.len() as f64).to_string(),
        );

        if let Some(counter) = &self.counter {
            counter.set_text_content(Some(&(self.index + 1).to_string()));
        }
        if let Some(announce) = &self.announce {
            let title = self.slides[self.index].get_attribute("data-title").unwrap_or_default();
            announce.set_text_content(Some(&format!(
                "Slide {} of {}. {}",
                self.index + 1,
                self.slides.len(),
                title
            )));
        }

        let address = format!("#{}", self.index + 1);
        if push && self.window.location().hash().unwrap_or_default() != address {
            if let Ok(history) = self.window.history() {
                let _ = history.replace_state_with_url(&JsValue::NULL, "", Some(&address));
            }
        }

        // Move focus onto the slide that is now showing. Without this, focus stays
        // on whichever control was clicked while the content around it changes.
        // `preventScroll` because the slide is a fixed frame.
        if moved && !self.overview_open() {
            let options = FocusOptions::new();
            options.set_prevent_scroll(true);
            let _ = self.slides[self.index].focus_with_options(&options);
        }
    }
}

fn step(deck: &Shared, by: i64) {
    let mut d = deck.borrow_mut();
    let next = d.index as i64 + by;
    d.show(next, true, true);
}

fn jump(deck: &Shared, to: usize) {
    let mut d = deck.borrow_mut();
    d.show(to as i64, true, true);
    if d.overview_open() {
        d.set_overview(false);
    }
}

fn on<F: FnMut(Event) + 'static>(target: &EventTarget, event: &str, passive: Option<bool>, f: F) {
    let closure = Closure::<dyn FnMut(Event)>::new(f);
    match passive {
        Some(p) => {
            let options = AddEventListenerOptions::new();
            options.set_passive(p);
            let _ = target.add_event_listener_with_callback_and_add_event_listener_options(
                event,
                closure.as_ref().unchecked_ref(),
                &options,
            );
        }
        None => {
            let _ = target.add_event_listener_with_callback(event, closure.as_ref().unchecked_ref());
        }
    }
    // The listeners live as long as the page.
    closure.forget();
}

/// True when the key belongs to someone typing, or to a modifier chord.
fn leave_alone(e: &KeyboardEvent) -> bool {
    if e.meta_key() || e.ctrl_key() || e.alt_key() {
        return true;
    }
    let Some(target) = e.target().and_then(|t| t.dyn_into::<HtmlElement>().ok()) else { return false };
    target.is_content_editable() || matches!(target.tag_name().as_str(), "INPUT" | "TEXTAREA" | "SELECT")
}

#[wasm_bindgen(start)]
pub fn start() {
    let Some(window) = web_sys::window() else { return };
    let Some(document) = window.document() else { return };
    let Some(root) = document.document_element().and_then(|e| e.dyn_into::<HtmlElement>().ok()) else { return };
    let _ = root.class_list().remove_1("no-js");

    let mut deck = Deck {
        window: window.clone(),
        document: document.clone(),
        root,
        surface: query_one(&document, ".deck"),
        stage: query_one(&document, ".stage"),
        controls: query_one(&document, ".controls"),
        overview: query_one(&document, ".overview"),
        overview_items: query_all(&document, ".overview__item"),
        slides: query_all(&document, ".slide"),
        marks: query_all(&document, ".controls__mark"),
        counter: query_one(&document, "[data-current-slide]"),
        announce: query_one(&document, "[data-announce]"),
        index: 0,
    };
    deck.index = deck.from_hash();
    let deck: Shared = Rc::new(RefCell::new(deck));

    // Keyboard. Space pages forward, Shift+Space back, as every presenter remote
    // does. Up and Down are left alone so a narrow screen's slide still scrolls.
    {
        let deck = deck.clone();
        on(document.as_ref(), "keydown", None, move |event| {
            let Ok(e) = event.dyn_into::<KeyboardEvent>() else { return };
            if leave_alone(&e) {
                return;
            }
            let open = deck.borrow().overview_open();
            let len = deck.borrow().slides.len() as i64;
            match (e.key().as_str(), open) {
                ("Escape", true) => { e.prevent_default(); deck.borrow_mut().set_overview(false) }
                ("o" | "O", _) => { e.prevent_default(); let mut d = deck.borrow_mut(); let now = d.overview_open(); d.set_overview(!now) }
                ("f" | "F", false) => { e.prevent_default(); deck.borrow().toggle_fullscreen() }
                // With the overview up, the keys belong to it (Tab, Enter).
                (_, true) => {}
                ("ArrowRight" | "PageDown", _) => { e.prevent_default(); step(&deck, 1) }
                (" ", _) => { e.prevent_default(); step(&deck, if e.shift_key() { -1 } else { 1 }) }
                ("ArrowLeft" | "PageUp", _) => { e.prevent_default(); step(&deck, -1) }
                ("Home", _) => { e.prevent_default(); deck.borrow_mut().show(0, true, true) }
                ("End", _) => { e.prevent_default(); deck.borrow_mut().show(len - 1, true, true) }
                _ => {}
            }
        });
    }

    for button in query_all(&document, "[data-step]") {
        let by = button.get_attribute("data-step").and_then(|v| v.parse::<i64>().ok()).unwrap_or(0);
        let deck = deck.clone();
        on(button.as_ref(), "click", None, move |_| step(&deck, by));
    }
    // Every `data-go` is an address: the dots in the controls and the overview's items.
    for button in query_all(&document, "[data-go]") {
        let Some(to) = button.get_attribute("data-go").and_then(|v| v.parse::<usize>().ok()) else { continue };
        let deck = deck.clone();
        on(button.as_ref(), "click", None, move |_| jump(&deck, to));
    }
    for button in query_all(&document, "[data-action]") {
        let action = button.get_attribute("data-action").unwrap_or_default();
        let deck = deck.clone();
        on(button.as_ref(), "click", None, move |_| match action.as_str() {
            "overview" => { let mut d = deck.borrow_mut(); let now = d.overview_open(); d.set_overview(!now) }
            "fullscreen" => deck.borrow().toggle_fullscreen(),
            _ => {}
        });
    }
    // Clicking the dimmed margin outside the overview's grid closes it.
    if let Some(overview) = deck.borrow().overview.clone() {
        let deck = deck.clone();
        let panel = overview.clone();
        on(overview.as_ref(), "click", None, move |event| {
            if event.target().as_ref() == Some(panel.as_ref()) {
                deck.borrow_mut().set_overview(false);
            }
        });
    }

    // The back button and a pasted link both arrive as a hash change.
    {
        let deck = deck.clone();
        on(window.as_ref(), "hashchange", None, move |_| {
            let mut d = deck.borrow_mut();
            let next = d.from_hash() as i64;
            d.show(next, false, true);
        });
    }

    // Swipe: only a deliberate one.
    let surface = deck.borrow().surface.clone();
    if let Some(surface) = surface {
        let origin = Rc::new(Cell::new((0.0_f64, 0.0_f64)));
        {
            let origin = origin.clone();
            on(surface.as_ref(), "touchstart", Some(true), move |event| {
                if let Some(t) = event.dyn_ref::<TouchEvent>().and_then(|e| e.changed_touches().item(0)) {
                    origin.set((f64::from(t.client_x()), f64::from(t.client_y())));
                }
            });
        }
        let deck = deck.clone();
        on(surface.as_ref(), "touchend", Some(true), move |event| {
            let Some(t) = event.dyn_ref::<TouchEvent>().and_then(|e| e.changed_touches().item(0)) else { return };
            let (x0, y0) = origin.get();
            let (dx, dy) = (f64::from(t.client_x()) - x0, f64::from(t.client_y()) - y0);
            if dx.abs() > SWIPE_PX && dx.abs() > dy.abs() {
                step(&deck, if dx < 0.0 { 1 } else { -1 });
            }
        });
    }

    let index = deck.borrow().index as i64;
    deck.borrow_mut().show(index, false, false);
}
