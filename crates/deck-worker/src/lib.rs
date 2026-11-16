//! The deck's Worker, in Rust.
//!
//! The deck is static, so the Worker's whole job is to serve it from the assets binding
//! and to say, on every response, how it may be used. The three headers used to live in
//! `public/_headers`, which only the asset layer reads; running the Worker first makes the
//! code the one place they are set, whichever way a request arrives.
//!
//! `frame-ancestors *` is the point: the talk is meant to be embedded, by
//! bryanfawcett.com/origins-with-perspective and by `embed-example.html`.

use worker::*;

/// Name of the assets binding in `wrangler.toml`.
const ASSETS: &str = "ASSETS";

/// The headers every response carries.
const HEADERS: [(&str, &str); 3] = [
    ("Content-Security-Policy", "frame-ancestors *"),
    ("X-Content-Type-Options", "nosniff"),
    ("Referrer-Policy", "strict-origin-when-cross-origin"),
];

/// Only reading is supported: there is nothing to write to.
fn allowed(method: &Method) -> bool {
    matches!(method, Method::Get | Method::Head | Method::Options)
}

/// A response from the assets binding has immutable headers, so copy them, add ours and
/// put the copy back.
fn with_headers(res: Response) -> Result<Response> {
    let mut headers = res.headers().clone();
    for (name, value) in HEADERS {
        headers.set(name, value)?;
    }
    Ok(res.with_headers(headers))
}

#[event(fetch)]
async fn fetch(req: Request, env: Env, _ctx: Context) -> Result<Response> {
    if !allowed(&req.method()) {
        let mut res = Response::error("Method not allowed", 405)?;
        res.headers_mut().set("Allow", "GET, HEAD, OPTIONS")?;
        return with_headers(res);
    }
    let res = env.assets(ASSETS)?.fetch_request(req).await?;
    with_headers(res)
}
