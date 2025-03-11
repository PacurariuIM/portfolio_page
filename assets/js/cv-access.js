/**
 * CV Access Handler
 * 
 * This script handles the CV download button click and fetches a temporary access link
 * from the Cloudflare Worker.
 */

document.addEventListener('DOMContentLoaded', function() {
  const cvButton = document.getElementById('cv-download-btn');
  
  if (cvButton) {
    // Get the worker URL and API key from data attributes (set by Jekyll)
    const workerUrl = cvButton.getAttribute('data-worker-url');
    const apiKey = cvButton.getAttribute('data-api-key');
    
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
      
      try {
        console.log('Attempting to fetch from worker...');
        
        // Request a temporary link from the worker
        const response = await fetch(workerUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ apiKey }),
          mode: 'cors' // Explicitly set CORS mode
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Worker response not OK:', response.status, errorText);
          throw new Error(`Failed to generate CV access link: ${response.status} ${errorText}`);
        }
        
        const data = await response.json();
        console.log('Worker response:', data);
        
        // Open the temporary link in a new tab
        if (data && data.url) {
          console.log('Opening URL:', data.url);
          window.open(data.url, '_blank');
        } else {
          throw new Error('Invalid response from worker: missing URL');
        }
      } catch (error) {
        console.error('Error details:', error);
        alert(`Sorry, there was an error generating the CV link: ${error.message}`);
      } finally {
        // Restore button state
        cvButton.textContent = originalText;
        cvButton.disabled = false;
      }
    });
  } else {
    console.warn('CV download button not found in the DOM');
  }
}); 