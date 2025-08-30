// Cloudflare Worker for serving the Astro-built static files with iframe support
export default {
  async fetch(request, env) {
    // Get the static asset response
    const response = await fetch(request);
    
    // If it's a 404, return it as-is
    if (response.status === 404) {
      return response;
    }
    
    // Clone the response so we can modify headers
    const modifiedResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
    
    // Add headers to allow embedding in iframes
    modifiedResponse.headers.delete('X-Frame-Options'); // Remove restrictive header
    modifiedResponse.headers.set('Content-Security-Policy', 'frame-ancestors *;');
    
    // Add CORS headers for better compatibility
    modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
    modifiedResponse.headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    modifiedResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return modifiedResponse;
  },
};
