/**
 * CV Access Handler
 * 
 * This script handles the CV download button click and fetches a temporary access link
 * from the Cloudflare Worker.
 */

document.addEventListener('DOMContentLoaded', function() {
  const cvButton = document.getElementById('cv-download-btn');
  
  if (cvButton) {
    // Get the configuration from the closure
    const { workerUrl, apiKey } = window.CV_CONFIG || {};
    
    if (!workerUrl || !apiKey) {
      console.error('Missing worker URL or API key');
      return;
    }
    
    cvButton.addEventListener('click', async function(e) {
      e.preventDefault();
      
      // Show loading state
      const originalText = cvButton.textContent;
      cvButton.textContent = 'Generating link...';
      cvButton.disabled = true;
      
      // Function to make the request with timeout
      async function fetchWithTimeout(url, options, timeout = 5000) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        
        try {
          const response = await fetch(url, {
            ...options,
            signal: controller.signal
          });
          clearTimeout(id);
          return response;
        } catch (error) {
          clearTimeout(id);
          throw error;
        }
      }
      
      // Retry logic
      const maxRetries = 2;
      let attempt = 0;
      
      while (attempt <= maxRetries) {
        try {
          console.log(`Attempt ${attempt + 1} to fetch from worker...`);
          
          // Request a temporary link from the worker
          const response = await fetchWithTimeout(
            workerUrl,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({ apiKey }),
              mode: 'cors'
            },
            10000 // 10 second timeout
          );
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error('Worker response not OK:', response.status, errorText);
            throw new Error(`Server error: ${response.status} ${errorText}`);
          }
          
          const data = await response.json();
          console.log('Worker response:', data);
          
          // Open the temporary link in a new tab
          if (data && data.url) {
            console.log('Opening URL:', data.url);
            window.open(data.url, '_blank');
            return; // Success, exit the retry loop
          } else {
            throw new Error('Invalid response from worker: missing URL');
          }
        } catch (error) {
          console.error(`Attempt ${attempt + 1} failed:`, error);
          
          if (attempt === maxRetries) {
            // If this was the last attempt, show error to user
            alert(`Sorry, there was an error generating the CV link. Please try again later. (Error: ${error.message})`);
          } else {
            // Wait before retrying (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
          }
        }
        
        attempt++;
      }
      
      // Always restore button state
      cvButton.textContent = originalText;
      cvButton.disabled = false;
    });
  } else {
    console.warn('CV download button not found in the DOM');
  }
}); 