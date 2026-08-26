# Origins with a Perspective on Human Potential

A talk on equity and the assumptions we make in learning — what growing up in Zimbabwe
taught me about measuring capability instead of credentials, and how that shapes the
technology work I do now. Built with Astro and deployed on Cloudflare Workers.

📖 **Canonical page**: https://bryanfawcett.com/origins-with-perspective
🌍 **Standalone presentation**: https://origins-with-perspective.nyuchi.workers.dev

The presentation here is the deck as it was delivered. The canonical page on
[bryanfawcett.com](https://bryanfawcett.com) carries the same argument with more
context — the full career path behind it, the current work at Singapore American
School and across the Nyuchi Africa ecosystem — and embeds this deck. Keep the two
in step when the content changes.

## 🚀 Project Structure

```text
/
├── public/
│   └── african-savanna-background.jpg  # Main background image
├── src/
│   └── pages/
│       └── index.astro                 # Main presentation
├── .github/
│   └── workflows/
│       └── deploy.yml                  # GitHub Actions deployment
├── worker.js                           # Cloudflare Worker with iframe support
├── wrangler.toml                       # Cloudflare Workers configuration
├── package.json                        # Dependencies and scripts
├── astro.config.mjs                    # Astro configuration
├── build.sh                            # Local build script
└── embed-example.html                  # Example of how to embed the site
```

## ✨ Features

- **Interactive Presentation**: Nine scroll-driven sections, from Zimbabwe origins to the
  questions the talk leaves open
- **Context Sections**: "The Path Here" (Zimbabwe → South Africa → Japan → Singapore) and
  "What I'm Building" (Singapore American School + Nyuchi Africa)
- **Daniel Pink Popup**: In-place summary of *A Whole New Mind* and the Conceptual Age
- **African Savanna Background**: Imagery of African students learning
- **Loading Screen**: Zimbabwe-themed branding with flag colors
- **Generated Section Navigation**: Dots are built from the sections on the page, so the two
  can never drift out of sync — add a section and the navigation follows
- **SEO & Sharing**: Canonical URL, Open Graph and Twitter card metadata
- **Iframe Embedding**: Embedded on bryanfawcett.com and usable in other sites
- **Automated Deployment**: GitHub Actions → Cloudflare Workers pipeline

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`     |
| `npm run build`           | Build your production site to `./dist/`         |
| `npm run preview`         | Preview your build locally, before deploying    |
| `./build.sh`              | Run the build script with deployment info       |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check`|
| `npm run astro -- --help` | Get help using the Astro CLI                    |

## � Deployment

This project uses **automated GitHub Actions deployment** to Cloudflare Workers:

1. **Local Development**: Run `npm run dev` to develop locally
2. **Commit & Push**: `git add .`, `git commit -m "Your message"`, `git push origin main`  
3. **Automatic Deploy**: GitHub Actions builds and deploys to Cloudflare Workers
4. **Live Site**: Available at https://origins-with-perspective.nyuchi.workers.dev

### Manual Build (Local Testing Only)
```bash
# Build the site locally
npm run build

# Preview the built site
npm run preview

# Or use the build script for more info
./build.sh
```

## 🌐 Embedding

The site can be embedded as an iframe in other websites:

```html
<iframe 
  src="https://origins-with-perspective.nyuchi.workers.dev" 
  width="100%" 
  height="600"
  frameborder="0">
</iframe>
```

See `embed-example.html` for a complete example.

## 📁 Development

- **Main Content**: Edit `src/pages/index.astro` for presentation content. Sections are plain
  `<section class="section" id="section-N">` blocks — add one and the navigation dots pick it
  up automatically; keep the `section-N` ids sequential
- **Styling**: CSS is included in the Astro component
- **Background**: Replace `public/african-savanna-background.jpg` for different imagery
- **Worker Config**: Modify `worker.js` for Cloudflare Workers behavior
- **Deployment**: Update `.github/workflows/deploy.yml` for CI/CD changes
