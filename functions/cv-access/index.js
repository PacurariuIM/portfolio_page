/**
 * Cloudflare Worker for generating temporary CV access links
 * 
 * This worker:
 * 1. Validates requests with a secret key
 * 2. Generates a signed URL with an expiration time
 * 3. Returns the temporary URL for accessing the CV
 */

// Configuration
const CV_PATH = '/cv'; // Path to your CV endpoint
const ACTUAL_CV_PATH = '/assets/documents/cv.pdf'; // Path to your actual CV file
const MAX_AGE_SECONDS = 24 * 60 * 60; // 24 hours
const ALLOWED_ORIGINS = ['https://ionel-tech.dev']; // Only allow the main production domain

// Helper to generate a random string for the token
function generateRandomString(length = 16) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Helper to create a signed URL
async function createSignedUrl(url, secret, expiresIn) {
  const expirationTime = Math.floor(Date.now() / 1000) + expiresIn;
  const token = generateRandomString();
  
  // Create a signature using the secret
  const encoder = new TextEncoder();
  const data = encoder.encode(`${url}|${expirationTime}|${token}`);
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, data);
  const signatureHex = Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  // Return the signed URL with expiration and signature
  return `${url}?token=${token}&expires=${expirationTime}&signature=${signatureHex}`;
}

// Helper to verify a signed URL
async function verifySignedUrl(url, token, expires, signature, secret) {
  // Check if the URL has expired
  const currentTime = Math.floor(Date.now() / 1000);
  if (currentTime > expires) {
    return false;
  }
  
  // Verify the signature
  const encoder = new TextEncoder();
  const data = encoder.encode(`${url}|${expires}|${token}`);
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );
  
  const signatureBytes = new Uint8Array(signature.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
  return await crypto.subtle.verify('HMAC', key, signatureBytes, data);
}

// Helper to get CORS headers
function getCorsHeaders(request) {
  const origin = request.headers.get('Origin');
  
  // Only allow the production domain
  if (ALLOWED_ORIGINS.includes(origin)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    };
  }
  
  // Default headers for non-allowed origins
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

// Main handler function
export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: getCorsHeaders(request)
      });
    }
    
    const url = new URL(request.url);
    const corsHeaders = getCorsHeaders(request);
    
    // Handle CV access request (generate temporary link)
    if (url.pathname === '/generate' && request.method === 'POST') {
      try {
        // Parse the request body
        const { apiKey } = await request.json();
        
        // Validate the API key (in production, use a more secure method)
        if (apiKey !== env.API_KEY) {
          return new Response(JSON.stringify({ error: 'Invalid API key' }), {
            status: 403,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders
            }
          });
        }
        
        // Generate a signed URL for the CV
        const baseUrl = `${url.protocol}//${url.hostname}${CV_PATH}`;
        const signedUrl = await createSignedUrl(baseUrl, env.URL_SECRET, MAX_AGE_SECONDS);
        
        // Return the temporary URL
        return new Response(JSON.stringify({ 
          url: signedUrl,
          expiresIn: MAX_AGE_SECONDS
        }), {
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        });
      } catch (error) {
        return new Response(JSON.stringify({ 
          error: 'Invalid request',
          message: error.message
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        });
      }
    }
    
    // Handle CV access verification
    if (url.pathname === CV_PATH) {
      const { searchParams } = url;
      const token = searchParams.get('token');
      const expires = parseInt(searchParams.get('expires'));
      const signature = searchParams.get('signature');
      
      // If no token/expires/signature, redirect to the homepage
      if (!token || !expires || !signature) {
        return Response.redirect('/', 302);
      }
      
      // Verify the signed URL
      const isValid = await verifySignedUrl(
        `${url.protocol}//${url.hostname}${CV_PATH}`,
        token,
        expires,
        signature,
        env.URL_SECRET
      );
      
      if (!isValid) {
        return new Response('Access denied or link expired', {
          status: 403,
          headers: corsHeaders
        });
      }
      
      // If valid, redirect to the actual CV file
      // This assumes your CV is hosted on your website
      const siteUrl = 'https://ionel-tech.dev'; // Using HTTPS
      return Response.redirect(`${siteUrl}${ACTUAL_CV_PATH}`, 302);
    }
    
    // Default response for other routes
    return new Response('Not found', {
      status: 404,
      headers: corsHeaders
    });
  }
}; 