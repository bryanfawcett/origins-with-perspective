#!/bin/bash

# Build script for Origins: A Zimbabwe Perspective
# This builds the Astro project and updates the root files for GitHub Pages fallback

echo "🚀 Building Origins presentation..."

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

# Copy built files to root for GitHub Pages fallback
echo "📋 Updating root files for GitHub Pages fallback..."
cd ..

# Backup current root index.html
if [ -f "index.html" ]; then
    cp index.html index.html.backup
    echo "💾 Backed up existing index.html"
fi

# Copy the built index.html from Astro to root
cp astro-worker/dist/index.html ./index.html
echo "📄 Updated root index.html with Astro build"

# Copy any CSS assets if they exist
if [ -d "astro-worker/dist/_astro" ]; then
    mkdir -p ./_astro
    cp -r astro-worker/dist/_astro/* ./_astro/
    echo "🎨 Updated CSS assets"
fi

echo ""
echo "🎉 Build complete!"
echo ""
echo "Deployment options:"
echo "1. 🔄 Push to GitHub for automatic deployment"
echo "2. 🌐 Use 'npm run preview' in astro-worker/ for local testing"
echo "3. 💻 Deploy worker manually with 'npx wrangler deploy' in astro-worker/"
echo ""
