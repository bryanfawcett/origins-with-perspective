// Cloudflare Worker for serving the Astro-built static files
import indexHTML from './dist/index.html';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Serve the main HTML file for root path
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(indexHTML, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=300',
          'X-Frame-Options': 'SAMEORIGIN',
          'X-Content-Type-Options': 'nosniff',
        },
      });
    }
    
    // Handle static assets (CSS, JS, images from _astro directory)
    if (url.pathname.startsWith('/_astro/')) {
      // Try to serve the static asset
      try {
        const assetPath = url.pathname.substring(1); // Remove leading slash
        const asset = await import(`./${assetPath}`);
        
        // Determine content type based on file extension
        const extension = assetPath.split('.').pop().toLowerCase();
        const contentType = {
          'css': 'text/css',
          'js': 'application/javascript',
          'png': 'image/png',
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'svg': 'image/svg+xml',
          'woff2': 'font/woff2',
          'woff': 'font/woff',
        }[extension] || 'text/plain';

        return new Response(asset.default || asset, {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000', // 1 year for static assets
          },
        });
      } catch (error) {
        return new Response('Asset not found', { status: 404 });
      }
    }
    
    // Return 404 for other routes
    return new Response('Not Found', { 
      status: 404,
      headers: {
        'Content-Type': 'text/plain',
      }
    });
  },
};
