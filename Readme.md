# Portfolio page 

My goal is to create a simple portfolio page, with relevant information about me and my projects.

## Tech stack
- Jekyll 
- TailwindCSS - for styling
- Formspree/Getform – For the contact form
- Serverless Function (Cloudflare Workers) - For generating temporary CV links

## Features and security measures
- Contact form only (Freeform or Getform) for form submision
- CV access control: Serverless function generates temporary access links
- Cloudflare Free Plan (DDoS & bot protection)
- robots.txt to block unwanted crawlers
- Disable search indexing in robots.txt

## Deployment plan
- Host on GitHub Pages
- Custom Domain Setup
- Enable HTTPS via GitHub Pages for security


## Development steps

### Install Ruby locally
On Windows [(Ruby install details)](https://www.ruby-lang.org/en/documentation/installation/)
```sh
> winget install RubyInstallerTeam.Ruby.{MAJOR}.{MINOR}
# Example
> winget install RubyInstallerTeam.Ruby.3.2
# To see all versions available
> winget search RubyInstallerTeam.Ruby
# Note: if you are installing ruby for projects, you may want to install RubyWithDevKit
> winget install RubyInstallerTeam.RubyWithDevKit.3.2
```

###  Set Up Jekyll Locally
- install Jekyll
```sh
gem install jekyll bundler
```
- create new Jekyll project
```sh
jekyll new my-portfolio
cd my-portfolio
```
- run the local server
```sh
bundle exec jekyll serve
```
- site should now be live at `http://localhost:4000/.`

### Configure GitHub Pages for Deployment
- in `Gemfile` add
```sh
gem "github-pages", group: :jekyll_plugins
```
- install dependencies
```sh
bundle install
```
- in `_config.yml` add
```sh
title: "My Portfolio"
baseurl: "" # Keep empty for GitHub Pages
url: "https://yourusername.github.io"
markdown: kramdown
theme: minima # Or choose a custom theme
```
- push to GitHub
```sh
git init
git add .
git commit -m "Initial Jekyll setup"
git branch -M main
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

## Folder and files structure

```
/portfolio_page
 ├── _includes/         # Reusable components (e.g., navbar, footer)
 ├── _layouts/          # Page layouts
 ├── _posts/            # (Optional) Blog posts
 ├── _data/             # (Optional) YAML data files
 ├── _site/             # Generated site (ignored in Git)
 ├── assets/            # CSS, JS, images
 ├── pages/
 │   ├── about.md       # About Me page
 │   ├── projects.md    # Projects page
 │   ├── connect.md     # Connect page
 ├── index.md           # Homepage
 ├── _config.yml        # Jekyll config
 ├── Gemfile            # Dependencies
 └── README.md          # Project details
```

## Secure CV Access with Cloudflare Workers

### Cloudflare Workers Setup

1. **Create a Cloudflare account** and set up your domain with Cloudflare DNS.

2. **Install Wrangler CLI** (Cloudflare Workers command-line tool):
```sh
npm install -g wrangler
```

3. **Authenticate with Cloudflare**:
```sh
wrangler login
```

4. **Create the worker directory structure**:
```sh
mkdir -p functions/cv-access
cd functions/cv-access
```

5. **Create worker files**:
   - `index.js` - The main worker script
   - `wrangler.toml` - Configuration file

6. **Configure wrangler.toml**:
```toml
name = "cv-access"
main = "index.js"
compatibility_date = "2023-10-30"

# Production configuration
workers_dev = false

# Custom domain configuration
routes = [
  { pattern = "cv-api.yourdomain.com/*", zone_name = "yourdomain.com" }
]

# Define environment variables
[vars]
ALLOWED_ORIGINS = "https://yourdomain.com"
```

7. **Create worker code in index.js** - The worker should:
   - Generate temporary signed URLs with an expiration time
   - Validate API keys for authentication
   - Serve or redirect to the actual CV file

8. **Set up secrets** (API key and URL signing secret):
```sh
wrangler secret put API_KEY
wrangler secret put URL_SECRET
```

9. **Deploy the worker**:
```sh
wrangler deploy
```

10. **Set up custom domain for your worker**:
    - Add a CNAME record for `cv-api.yourdomain.com` pointing to your worker
    - In Cloudflare, go to Workers & Pages > Your Worker > Custom Domains
    - Add your domain (cv-api.yourdomain.com)

### GitHub Pages Configuration

1. **Create Jekyll configuration for secrets** (`_config_secrets.yml`):
```yaml
# Sensitive configuration - DO NOT COMMIT THIS FILE
cv_worker_url: "https://cv-api.yourdomain.com/generate"
cv_api_key: "your-api-key-here"
```

2. **Add the file to .gitignore**:
```sh
echo "_config_secrets.yml" >> .gitignore
```

3. **Update GitHub Actions workflow** to use the secrets:
```yaml
# .github/workflows/build-deploy.yml
name: Build and Deploy
on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Set up Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2'
          bundler-cache: true
          
      - name: Create _config_secrets.yml
        env:
          CV_WORKER_URL: ${{ secrets.CV_WORKER_URL }}
          CV_API_KEY: ${{ secrets.CV_API_KEY }}
        run: |
          echo "cv_worker_url: \"$CV_WORKER_URL\"" > _config_secrets.yml
          echo "cv_api_key: \"$CV_API_KEY\"" >> _config_secrets.yml
          
      - name: Build site
        run: bundle exec jekyll build --config _config.yml,_config_secrets.yml
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
          cname: yourdomain.com
```

4. **Add secrets to GitHub repository**:
   - Go to your repo settings > Secrets and Variables > Actions
   - Add `CV_WORKER_URL` with your worker URL
   - Add `CV_API_KEY` with the same API key used in Cloudflare

### Integrating Everything

1. **Create the CV download button** in your template (`pages/connect.md`):
```html
<script>
  // Store API credentials in closure to prevent global access
  (function() {
    window.CV_CONFIG = {
      workerUrl: '{{ site.cv_worker_url }}',
      apiKey: '{{ site.cv_api_key }}'
    };
  })();
</script>

<!-- Button HTML -->
<button id="cv-download-btn" class="btn btn-primary">Download CV</button>
```

2. **Add JavaScript to handle CV download** (`assets/js/cv-access.js`):
```javascript
document.addEventListener('DOMContentLoaded', function() {
  const cvButton = document.getElementById('cv-download-btn');
  
  if (cvButton) {
    // Get the configuration from the closure
    const { workerUrl, apiKey } = window.CV_CONFIG || {};
    
    cvButton.addEventListener('click', async function(e) {
      e.preventDefault();
      
      try {
        // Show loading state
        const originalText = cvButton.textContent;
        cvButton.textContent = 'Generating link...';
        cvButton.disabled = true;
        
        // Request a temporary link from the worker
        const response = await fetch(workerUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ apiKey })
        });
        
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Open the temporary link in a new tab
        if (data && data.url) {
          window.open(data.url, '_blank');
        }
      } catch (error) {
        alert('Sorry, there was an error generating the CV link. Please try again later.');
      } finally {
        // Restore button state
        cvButton.textContent = originalText;
        cvButton.disabled = false;
      }
    });
  }
});
```

3. **Add your CV file** to the site at `assets/documents/cv.pdf`

4. **Include JavaScript in your layout** (`_includes/head.html` or similar):
```html
<script src="{{ '/assets/js/cv-access.js' | relative_url }}"></script>
```

### Cloudflare SSL/TLS Configuration

1. **SSL/TLS Settings**:
   - In Cloudflare dashboard, go to SSL/TLS
   - Set encryption mode to "Full" (not Flexible)
   
2. **Origin Server Settings**:
   - Authenticate origin with Cloudflare for best security
   
3. **SSL/TLS Certificate Validation**:
   - Ensure GitHub Pages and Cloudflare certificates are valid
   - Check Edge Certificates section in Cloudflare

### Development vs Production Setup

1. **Development Configuration** (`_config_dev.yml`):
```yaml
url: "http://localhost:4000"
cv_worker_url: "http://localhost:8787/generate"
cv_api_key: "dev-api-key-for-testing"
```

2. **Local Development**:
   - Run Jekyll with both configs:
   ```sh
   bundle exec jekyll serve --config _config.yml,_config_dev.yml
   ```
   
   - Run Cloudflare Worker locally:
   ```sh
   cd functions/cv-access
   wrangler dev --local
   ```

3. **Testing Workflow**:
   - Test the download button locally
   - Verify the worker generates valid URLs
   - Check that the CV is served correctly

### Security Considerations

1. **API Key Protection**:
   - Never expose API keys in client-side code
   - Use the closure pattern to protect keys
   
2. **URL Signing and Verification**:
   - Sign URLs with HMAC-SHA256 for security
   - Include expiration time to limit access
   
3. **CORS Configuration**:
   - Limit allowed origins to your domain only
   - Set appropriate CORS headers

4. **SSL/TLS Encryption**:
   - Ensure all communications are encrypted
   - Use "Full" SSL mode in Cloudflare

### Troubleshooting

1. **CORS Issues**:
   - Check browser console for CORS errors
   - Verify ALLOWED_ORIGINS in worker config
   
2. **SSL/TLS Errors**:
   - "Too many redirects" usually means SSL mode mismatch
   - Switch from "Flexible" to "Full" in Cloudflare
   
3. **Worker URL Issues**:
   - Ensure worker URL is correct in _config_secrets.yml
   - Verify custom domain is properly set up for worker
   
4. **API Key Validation Failures**:
   - Check that API_KEY secret is set in Cloudflare
   - Verify it matches the key in _config_secrets.yml
