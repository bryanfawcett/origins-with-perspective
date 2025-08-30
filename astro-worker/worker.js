// Cloudflare Worker for serving the Astro-built static files
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    // Serve assets from the ASSETS binding (Astro dist folder)
    try {
      const response = await env.ASSETS.fetch(request);
      
      // Clone the response so we can modify headers
      const modifiedResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
      
      // Add headers to allow embedding in iframes
      modifiedResponse.headers.set('X-Frame-Options', 'ALLOWALL');
      modifiedResponse.headers.delete('X-Frame-Options'); // Remove restrictive header
      modifiedResponse.headers.set('Content-Security-Policy', 'frame-ancestors *;');
      
      // Add CORS headers for better compatibility
      modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
      modifiedResponse.headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
      modifiedResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type');
      
      return modifiedResponse;
    } catch (error) {
      // Fallback for any errors
      return new Response('Not found', { status: 404 });
    }
  },
};
