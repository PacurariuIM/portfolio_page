# CV Access Cloudflare Worker

This Cloudflare Worker generates temporary access links for the CV, adding a layer of security by not exposing your CV directly and allowing you to control access.

## Features

- Generates temporary links that expire after 24 hours
- Validates requests with a secret API key
- Signs URLs with HMAC for security
- Handles CORS for cross-origin requests

## Deployment Instructions

### Prerequisites

1. A Cloudflare account
2. Wrangler CLI installed (`npm install -g wrangler`)
3. Your CV file uploaded to your website

### Steps to Deploy

1. Log in to Cloudflare with Wrangler:
   ```
   wrangler login
   ```

2. Update the `wrangler.toml` file:
   - Replace `yourdomain.com` with your actual domain
   - Adjust the routes as needed

3. Set up your secrets:
   ```
   wrangler secret put API_KEY
   # Enter a secure random string when prompted
   
   wrangler secret put URL_SECRET
   # Enter another secure random string when prompted
   ```

4. Deploy the worker:
   ```
   wrangler publish
   ```

5. Update the worker URL in your website's JavaScript:
   - Open `assets/js/cv-access.js`
   - Replace `https://cv-access.yourdomain.workers.dev/generate` with your actual worker URL
   - Replace `your-api-key-here` with the API key you set in step 3

## Usage

When a user clicks the "Download CV" button on your website, the JavaScript will:

1. Send a request to the Cloudflare Worker with your API key
2. The worker will validate the API key and generate a temporary signed URL
3. The JavaScript will open the temporary URL in a new tab
4. The user can download your CV

The temporary link will expire after 24 hours, preventing unauthorized sharing of your CV. 