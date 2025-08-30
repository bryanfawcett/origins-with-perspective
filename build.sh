#!/bin/bash

# Build script for Origins: A Zimbabwe Perspective
# This builds the Astro project for Cloudflare Workers deployment

echo "🚀 Building Origins presentation for Cloudflare Workers..."

# Change to astro-worker directory and build
cd astro-worker || exit 1
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
echo "Deployment options:"
echo "1. 🔄 Push to GitHub for automatic Cloudflare Workers deployment"
echo "2. 🌐 Use 'npm run preview' in astro-worker/ for local testing"
echo "3. 💻 Deploy worker manually with 'npx wrangler deploy' in astro-worker/"
echo ""
