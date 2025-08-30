// Cloudflare Worker for serving the Astro-built static files
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    // Serve assets from the ASSETS binding (Astro dist folder)
    try {
      return await env.ASSETS.fetch(request);
    } catch (error) {
      // Fallback for any errors
      return new Response('Not found', { status: 404 });
    }
  },
};
