# Origins: A Zimbabwe Perspective on Human Potential

A single-page web presentation exploring education, capability, and human potential from a Zimbabwe perspective.

## Files Overview

- `index.html` - Main presentation page (optimized for Cloudflare Pages)
- `visual_learning_reflection.html` - Original file (backup)
- `_headers` - Cloudflare Pages configuration for security and caching
- `_redirects` - Redirect configuration for Cloudflare Pages
- `.gitignore` - Git ignore file

## Deployment to Cloudflare Pages

### Option 1: Git Repository (Recommended)

1. Initialize a git repository:
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
