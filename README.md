# Origins: A Zimbabwe Perspective on Human Potential

A single-page web presentation exploring education, capability, and human potential from a Zimbabwe perspective.

## 🚀 Deployment Strategy

This project uses **GitHub Actions for automated Cloudflare Workers deployment**.

### Architecture: Astro + Cloudflare Worker
- **Source**: `/astro-worker/` directory contains the Astro project
- **Build**: Static site generated with optimized loading and performance  
- **Deploy**: Automated via GitHub Actions to Cloudflare Worker
- **Live URL**: https://origins-with-perspective.nyuchi.workers.dev
- **Features**: Iframe embeddable, loading screen, optimized performance

## 🏗️ Project Structure

### `/astro-worker/` - Main Application
- **Astro 5.x**: Static site generator with optimized output
- **Loading Screen**: "Origins with a Perspective on Learning" 
- **Optimized JavaScript**: Consolidated intersection observers and popup functions
- **Performance**: Lazy loading, error handling, observer cleanup
- **Worker**: Cloudflare Worker handles routing and asset serving with iframe support

### GitHub Integration
- **Repository**: [origins-with-perspective](https://github.com/bryanfawcett/origins-with-perspective)
- **CI/CD**: GitHub Actions automatically deploys on push to `main`
- **Configuration**: `wrangler.toml` linked to GitHub for deployment automation

## 🔧 Development

### Local Development
```bash
# Start development server
cd astro-worker && npm run dev

# Build for production
cd astro-worker && npm run build

# Preview built site locally
cd astro-worker && npm run preview
```

### Build Script (from root)
```bash
./build.sh    # Builds project and shows deployment info
```

## 📦 Deployment

### GitHub Actions (Only Deployment Method)

**All deployments happen automatically via GitHub Actions:**

1. **Make changes** to files in `/astro-worker/`
2. **Commit and push** to `main` branch:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```
3. **GitHub Actions** automatically:
   - Builds the Astro project
   - Deploys to Cloudflare Workers
   - Updates live site at https://origins-with-perspective.nyuchi.workers.dev

### Configuration Files

- **`wrangler.toml`**: Cloudflare Worker configuration linked to GitHub
- **`.github/workflows/deploy.yml`**: GitHub Actions deployment workflow
- **`astro-worker/package.json`**: Build scripts and dependencies

**⚠️ Manual deployments are disabled** - all changes must go through GitHub for consistency and security.

## 🎨 Features

- **Loading Screen**: Branded loading experience while images preload
- **Zimbabwe Flag Strip**: Visual cultural identity element  
- **Smooth Scroll Navigation**: Optimized intersection observers
- **Daniel Pink Popup**: Interactive content with keyboard/click handling
- **Responsive Design**: Mobile-first approach with performance optimization
- **Error Handling**: Graceful image fallbacks and error recovery

## 🚀 Performance Optimizations

- Consolidated JavaScript functions (removed redundancies)
- Optimized intersection observers with cleanup
- Lazy loading images with error handling
- Efficient CSS delivery and caching
- Loading screen prevents layout shift

## 🔗 URLs

- **Primary**: Cloudflare Worker URL (configured in wrangler.toml)
- **Fallback**: [GitHub Pages](https://bryanfawcett.github.io/origins-with-perspective)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Push to GitHub/GitLab:
   ```bash
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

3. Connect to Cloudflare Pages:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to Pages
   - Click "Create a project"
   - Connect your Git repository
   - Set build settings:
     - Build command: (leave empty)
     - Build output directory: `/`

### Option 2: Direct Upload

1. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/)
2. Click "Create a project" > "Upload assets"
3. Upload all files in this directory
4. Your site will be live at `your-project-name.pages.dev`

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Performance Optimized**: 
  - Lazy loading images
  - Preconnect to external domains
  - Optimized caching headers
- **SEO Friendly**: 
  - Meta tags for search engines
  - Open Graph tags for social sharing
  - Semantic HTML structure
- **Accessibility**: 
  - Alt text for images
  - Semantic markup
  - Keyboard navigation support
- **Browser Compatibility**: 
  - Intersection Observer with fallback
  - Modern CSS with fallbacks

## Content

The presentation covers:
- Personal Zimbabwe origins and perspective
- Capability vs. credentials in education
- Education's historical origins
- The Conceptual Age and modern skills
- Questions for educational equity and assessment

## Customization

To customize the content, edit the HTML in `index.html`. The presentation uses:
- Inline CSS for styling
- Intersection Observer API for scroll animations
- Unsplash images (with error handling)
- Zimbabwe flag colors throughout the design

## Support

This is a static single-page application that works in all modern browsers and is optimized for Cloudflare Pages deployment.
