//! Builds the deck: `data/slides.json` and `assets/` in, a static site in `dist/` out.
//!
//!     cargo run -p deck-site            # writes dist/
//!
//! Prerendered HTML with no runtime: the Cloudflare asset layer serves it as is.
//! The slide driver lives in `deck-client` and arrives as WebAssembly.

mod marked;
mod model;
mod render;

use std::{
    fs, io,
    path::{Path, PathBuf},
    process::exit,
};

fn copy_dir(from: &Path, to: &Path) -> io::Result<()> {
    fs::create_dir_all(to)?;
    for entry in fs::read_dir(from)? {
        let entry = entry?;
        let target = to.join(entry.file_name());
        if entry.file_type()?.is_dir() {
            copy_dir(&entry.path(), &target)?;
        } else {
            fs::copy(entry.path(), target)?;
        }
    }
    Ok(())
}

fn main() {
    let root = PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("../..").canonicalize().expect("repo root");
    let out = root.join("dist");

    let mut slides: Vec<model::Slide> = serde_json::from_str(
        &fs::read_to_string(root.join("data/slides.json")).unwrap_or_else(|e| {
            eprintln!("cannot read data/slides.json: {e}");
            exit(2)
        }),
    )
    .unwrap_or_else(|e| {
        eprintln!("data/slides.json is not the shape the deck expects: {e}");
        exit(2)
    });

    // The work slide is the Origins page's own content, synced from the site.
    let site: model::Site = serde_json::from_str(&fs::read_to_string(root.join("data/site.json")).unwrap_or_else(|e| {
        eprintln!("cannot read data/site.json ({e}); run ./scripts-sync.sh");
        exit(2)
    }))
    .unwrap_or_else(|e| {
        eprintln!("data/site.json is not the shape the deck expects: {e}");
        exit(2)
    });
    for slide in &mut slides {
        slide.apply_site(&site);
    }
    // A `split` slide becomes one slide per column.
    let slides: Vec<model::Slide> = slides.into_iter().flat_map(model::Slide::expand).collect();

    let _ = fs::remove_dir_all(&out);
    fs::create_dir_all(out.join("pkg")).expect("create dist");
    copy_dir(&root.join("assets"), &out).expect("copy assets");
    copy_dir(&root.join("public"), &out).expect("copy public");
    // The deck's own layout, written for the site's tokens.
    fs::write(out.join("pkg/loader.js"), "import init from './deck_client.js';\ninit();\n").expect("loader");

    fs::write(out.join("index.html"), render::page(&slides).into_string()).expect("write index.html");
    println!("deck: {} slides → dist/index.html", slides.len());
}
