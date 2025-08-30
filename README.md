# Origins: A Zimbabwe Perspective

An educational presentation about learning approaches in Zimbabwe, built with Astro and deployed on Cloudflare Workers.

🌍 **Live Site**: https://origins-with-perspective.nyuchi.workers.dev

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

- **Interactive Presentation**: Educational content about learning methodologies in Zimbabwe
- **African Savanna Background**: Beautiful imagery of African students learning
- **Loading Screen**: Zimbabwe-themed branding with flag colors
- **Iframe Embedding**: Can be embedded in other websites
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

- **Main Content**: Edit `src/pages/index.astro` for presentation content
- **Styling**: CSS is included in the Astro component
- **Background**: Replace `public/african-savanna-background.jpg` for different imagery
- **Worker Config**: Modify `worker.js` for Cloudflare Workers behavior
- **Deployment**: Update `.github/workflows/deploy.yml` for CI/CD changes
