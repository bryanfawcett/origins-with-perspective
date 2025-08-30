#!/bin/bash

# Build script for Origins: A Zimbabwe Perspective
# This builds the Astro project for Cloudflare Workers deployment via GitHub Actions

echo "🚀 Building Origins presentation for Cloudflare Workers..."

# Build from root directory (files moved from astro-worker/ to root)
echo "📦 Building Astro project..."
npm run build

# Check if build succeeded
if [ $? -ne 0 ]; then
    echo "❌ Astro build failed!"
    exit 1
fi

echo "✅ Astro build completed successfully!"

echo ""
echo "🎉 Build complete!"
echo ""
echo "📋 Deployment Information:"
echo "• 🔄 Deployments are automated via GitHub Actions"
echo "• 🌍 Live URL: https://origins-with-perspective.nyuchi.workers.dev"
echo "• 📁 Repository: https://github.com/bryanfawcett/origins-with-perspective"
echo ""
echo "🚀 To deploy:"
echo "1. 📝 Commit your changes: git add . && git commit -m 'Your message'"
echo "2. � Push to GitHub: git push origin main"
echo "3. ⏱️  GitHub Actions will automatically deploy to Cloudflare Workers"
echo ""
echo "🧪 For local testing:"
echo "• Use 'npm run preview' from root directory"
echo ""
echo "⚠️  Manual 'wrangler deploy' is disabled - use GitHub for all deployments"
echo ""
