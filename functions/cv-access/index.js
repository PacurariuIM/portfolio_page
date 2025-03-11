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
const DEFAULT_ALLOWED_ORIGINS = ['http://localhost:4000', 'https://ionel-tech.dev']; // Allow both local and production

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
  console.log('Verifying signed URL:', {
    url,
    token: token ? 'provided' : 'missing',
    expires,
    signature: signature ? 'provided' : 'missing',
    secret: secret ? 'provided' : 'missing'
  });

  // Check if the URL has expired
  const currentTime = Math.floor(Date.now() / 1000);
  if (currentTime > expires) {
    console.log('URL has expired:', { currentTime, expires, diff: currentTime - expires });
    return false;
  }
  
  // Verify the signature
  const encoder = new TextEncoder();
  const data = encoder.encode(`${url}|${expires}|${token}`);
  
  try {
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    
    const signatureBytes = new Uint8Array(signature.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const isValid = await crypto.subtle.verify('HMAC', key, signatureBytes, data);
    
    console.log('Signature verification result:', isValid);
    return isValid;
  } catch (error) {
    console.error('Error verifying signature:', error);
    return false;
  }
}

// Helper to get CORS headers
function getCorsHeaders(request) {
  const origin = request.headers.get('Origin');
  
  // Get allowed origins from environment or use defaults
  const allowedOrigins = env => {
    try {
      // Try to parse from environment variable if it exists
      if (env && env.ALLOWED_ORIGINS) {
        if (typeof env.ALLOWED_ORIGINS === 'string') {
          return env.ALLOWED_ORIGINS.split(',').map(o => o.trim());
        }
        return [env.ALLOWED_ORIGINS];
      }
    } catch (e) {
      console.error('Error parsing ALLOWED_ORIGINS:', e);
    }
    return DEFAULT_ALLOWED_ORIGINS;
  };
  
  // For development, allow all origins
  const isDevelopment = request.url.includes('localhost') || request.url.includes('127.0.0.1');
  if (isDevelopment) {
    return {
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
      'Access-Control-Max-Age': '86400',
    };
  }
  
  // For production, check against allowed origins
  const validOrigins = allowedOrigins();
  if (origin && validOrigins.includes(origin)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
      'Access-Control-Max-Age': '86400',
    };
  }
  
  // Default headers for non-allowed origins
  return {
    'Access-Control-Allow-Origin': validOrigins[0],
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
    'Access-Control-Max-Age': '86400',
  };
}

// Main handler function
export default {
  async fetch(request, env, ctx) {
    console.log('Request received:', request.method, request.url);
    
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: getCorsHeaders(request)
      });
    }
    
    const url = new URL(request.url);
    const corsHeaders = getCorsHeaders(request);
    
    console.log('Handling path:', url.pathname);
    
    // Handle CV access request (generate temporary link)
    if (url.pathname === '/generate' && request.method === 'POST') {
      try {
        console.log('Processing /generate request');
        
        // Parse the request body
        const { apiKey } = await request.json();
        console.log('API key provided:', !!apiKey);
        
        // For development, accept the dev API key
        const isDevelopment = request.url.includes('localhost') || request.url.includes('127.0.0.1');
        const correctApiKey = isDevelopment ? 
          (env.API_KEY || 'dev-api-key-for-testing') : 
          env.API_KEY;
        
        // Validate the API key
        if (apiKey !== correctApiKey) {
          console.log('API key validation failed');
          return new Response(JSON.stringify({ error: 'Invalid API key' }), {
            status: 403,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders
            }
          });
        }
        
        console.log('API key validated successfully');
        
        // Generate a signed URL for the CV
        // Use the FULL current URL (with port) for the base URL to ensure proper verification later
        let baseUrl;
        if (isDevelopment) {
          // In development, use the worker's host with the correct port
          const host = url.hostname === 'localhost' ? 'localhost:8787' : url.host;
          baseUrl = `${url.protocol}//${host}${CV_PATH}`;
        } else {
          // In production, use the custom domain or worker URL
          baseUrl = `${url.protocol}//${url.hostname}${CV_PATH}`;
        }
        
        console.log('Base URL for signed URL:', baseUrl);
        
        const secret = isDevelopment ? 
          (env.URL_SECRET || 'dev-secret-for-testing') : 
          env.URL_SECRET;
        
        const signedUrl = await createSignedUrl(baseUrl, secret, MAX_AGE_SECONDS);
        console.log('Generated signed URL:', signedUrl);
        
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
        console.error('Error processing generate request:', error);
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
    
    // Handle CV access verification - match exactly /cv path
    if (url.pathname === CV_PATH) {
      console.log('CV path detected:', url.pathname, url.search);
      
      const { searchParams } = url;
      const token = searchParams.get('token');
      const expires = parseInt(searchParams.get('expires'));
      const signature = searchParams.get('signature');
      
      console.log('Processing CV access request with parameters:', {
        token: token ? 'provided' : 'missing',
        expires: expires || 'missing',
        signature: signature ? 'provided' : 'missing'
      });
      
      // If no token/expires/signature, return an error
      if (!token || !expires || !signature) {
        return new Response('Missing required parameters for CV access', {
          status: 400,
          headers: {
            'Content-Type': 'text/plain',
            ...corsHeaders
          }
        });
      }
      
      // For development, use the dev secret
      const isDevelopment = request.url.includes('localhost') || request.url.includes('127.0.0.1');
      const secret = isDevelopment ? 
        (env.URL_SECRET || 'dev-secret-for-testing') : 
        env.URL_SECRET;
      
      // In development, use the local URL for verification
      let verificationUrl;
      if (isDevelopment) {
        // In development, use the worker's host with the correct port
        const host = url.hostname === 'localhost' ? 'localhost:8787' : url.host;
        verificationUrl = `${url.protocol}//${host}${CV_PATH}`;
      } else {
        // In production, use the custom domain or worker URL
        verificationUrl = `${url.protocol}//${url.hostname}${CV_PATH}`;
      }
      
      console.log('Using verification URL:', verificationUrl);
      
      // Verify the signed URL
      const isValid = await verifySignedUrl(
        verificationUrl,
        token,
        expires,
        signature,
        secret
      );
      
      if (!isValid) {
        console.log('Invalid signature or expired token');
        return new Response('Access denied or link expired', {
          status: 403,
          headers: {
            'Content-Type': 'text/plain',
            ...corsHeaders
          }
        });
      }
      
      console.log('Valid token, serving CV');
      
      // If valid, serve the CV file
      try {
        // In development mode, fetch the CV from Jekyll server
        if (isDevelopment) {
          // Try to fetch the CV from the local Jekyll server
          const jekyllUrl = 'http://localhost:4000';
          console.log(`Fetching CV from Jekyll server: ${jekyllUrl}${ACTUAL_CV_PATH}`);
          
          try {
            const response = await fetch(`${jekyllUrl}${ACTUAL_CV_PATH}`);
            
            if (!response.ok) {
              console.log('Failed to fetch CV from Jekyll server, serving sample CV instead');
              return new Response('This is a sample CV file for development. In production, this would redirect to your actual CV.', {
                headers: {
                  'Content-Type': 'text/plain',
                  ...corsHeaders
                }
              });
            }
            
            const cvData = await response.arrayBuffer();
            console.log('Successfully fetched CV from Jekyll server');
            
            return new Response(cvData, {
              headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline; filename="cv.pdf"',
                ...corsHeaders
              }
            });
          } catch (e) {
            console.error('Error fetching CV from Jekyll server:', e);
            return new Response('Error fetching CV: ' + e.message, {
              headers: {
                'Content-Type': 'text/plain',
                ...corsHeaders
              }
            });
          }
        }
        
        // In production, serve the CV directly instead of redirecting
        // This prevents redirect loops
        console.log('Production mode: serving CV directly');
        
        // Return a direct response with a download link
        return new Response(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>CV Download</title>
              <meta http-equiv="refresh" content="0;url=https://ionel-tech.dev${ACTUAL_CV_PATH}">
              <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                .container { max-width: 600px; margin: 0 auto; }
                .button { display: inline-block; padding: 10px 20px; background-color: #0066cc; color: white; 
                         text-decoration: none; border-radius: 4px; margin-top: 20px; }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Downloading Your CV</h1>
                <p>Your CV should begin downloading automatically.</p>
                <p>If it doesn't start automatically, please click the button below:</p>
                <a class="button" href="https://ionel-tech.dev${ACTUAL_CV_PATH}" target="_blank">Download CV</a>
              </div>
            </body>
          </html>
        `, {
          headers: {
            'Content-Type': 'text/html',
            ...corsHeaders
          }
        });
      } catch (error) {
        console.error('Error serving CV:', error);
        return new Response(`Error serving CV: ${error.message}`, {
          status: 500,
          headers: {
            'Content-Type': 'text/plain',
            ...corsHeaders
          }
        });
      }
    }
    
    // Default response for other routes
    return new Response(`Not found: ${url.pathname}`, {
      status: 404,
      headers: {
        'Content-Type': 'text/plain',
        ...corsHeaders
      }
    });
  }
}; 