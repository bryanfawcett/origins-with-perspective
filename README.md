# Origins: A Zimbabwe Perspective on Human Potential

A single-page web presentation exploring education, capability, and human potential from a Zimbabwe perspective.

## 🚀 Deployment Strategy

This project uses a dual-deployment approach:

### Primary: Astro + Cloudflare Worker
- **Source**: `/astro-worker/` directory contains the Astro project
- **Build**: Static site generated with optimized loading and performance
- **Deploy**: Cloudflare Worker serves the content with enhanced caching and CDN
- **Features**: Loading screen, optimized images, performance monitoring

### Fallback: GitHub Pages
- **Source**: Root directory files for direct GitHub Pages deployment
- **Purpose**: Backup deployment method and compatibility

## 🏗️ Architecture

### `/astro-worker/` - Modern Stack
- **Astro 5.x**: Static site generator with optimized output
- **Loading Screen**: "Origins with a Perspective on Learning" 
- **Optimized JavaScript**: Consolidated intersection observers and popup functions
- **Performance**: Lazy loading, error handling, observer cleanup
- **Worker**: Cloudflare Worker handles routing and asset serving

### Root Files - Legacy/Fallback
- `index.html`: Standalone version for direct deployment
- `visual_learning_reflection.html`: Original backup file
- Cloudflare Pages configuration files (`_headers`, `_redirects`)

## 🔧 Development

```bash
cd astro-worker
npm install
npm run dev       # Development server
npm run build     # Build for production
```

## 📦 Deployment

### Automatic (Recommended)
Push to `main` branch triggers GitHub Actions:
1. Builds Astro project
2. Deploys to Cloudflare Worker
3. Falls back to GitHub Pages

### Manual Cloudflare Worker
```bash
cd astro-worker
npm run build
npx wrangler deploy
```

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
