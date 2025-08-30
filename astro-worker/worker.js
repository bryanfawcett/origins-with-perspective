// Cloudflare Worker for serving the Astro-built static files
import indexHTML from './dist/index.html';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    // Serve the main HTML page for root requests
    if (pathname === '/' || pathname === '/index.html') {
      try {
        const asset = await env.ASSETS.fetch('https://example.com/index.html');
        const html = await asset.text();
        return new Response(html, {
          headers: {
            'content-type': 'text/html;charset=UTF-8',
            'cache-control': 'public, max-age=3600',
          },
        });
      } catch (error) {
        return new Response('Site not found', { status: 404 });
      }
    }
    
    // Serve other assets from the ASSETS binding
    try {
      const asset = await env.ASSETS.fetch(request);
      return asset;
    } catch (error) {
      return new Response('Not found', { status: 404 });
    }
  },
};
