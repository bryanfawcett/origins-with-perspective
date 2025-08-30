# 🚀 Deploy to GitHub + Cloudflare Pages

## Step 1: Push to GitHub

1. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Repository name: `origins-zimbabwe-perspective` (or your choice)
   - Make it **Public** 
   - Don't initialize with README (we already have one)

2. **Connect and push**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/origins-zimbabwe-perspective.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Connect to Cloudflare Pages

1. **Go to Cloudflare Pages**:
   - Visit https://dash.cloudflare.com/
   - Navigate to **Pages**
   - Click **"Create a project"**

2. **Connect your GitHub repo**:
   - Choose **"Connect to Git"**
   - Select your GitHub account
   - Choose the `origins-zimbabwe-perspective` repository

3. **Configure deployment**:
   - **Project name**: `origins-zimbabwe-perspective` 
   - **Production branch**: `main`
   - **Build command**: Leave empty
   - **Build output directory**: `/`
   - Click **"Save and Deploy"**

## Step 3: Set up Custom Domain (Optional)

To serve this at `bryanfawcett.com/origins`:

1. **In Cloudflare Pages**:
   - Go to your project
   - Click **"Custom domains"**
   - Add: `origins.bryanfawcett.com` as a subdomain

2. **Set up redirect** (in your main site):
   - Add redirect: `bryanfawcett.com/origins` → `origins.bryanfawcett.com`

## ✅ Done!

- **Your site**: `https://origins-zimbabwe-perspective.pages.dev`
- **Updates**: Just push to GitHub - automatic deployment!
- **No more workers**: Clean, simple, automatic!

---

*Now you can update content by just editing index.html and pushing to GitHub!*
