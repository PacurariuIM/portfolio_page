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
      
      try {
        // Request a temporary link from the worker
        const response = await fetch(`${workerUrl}/generate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ apiKey }),
          mode: 'cors'
        });
        
        if (!response.ok) {
          throw new Error(`Failed to generate CV access link: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Open the temporary link in a new tab
        if (data && data.url) {
          window.open(data.url, '_blank');
        } else {
          throw new Error('Invalid response from worker: missing URL');
        }
      } catch (error) {
        alert('Sorry, there was an error generating the CV link. Please try again later.');
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