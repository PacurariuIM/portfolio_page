/**
 * CV Access Handler
 * 
 * This script handles the CV download button click and fetches a temporary access link
 * from the Cloudflare Worker.
 */

document.addEventListener('DOMContentLoaded', function() {
  const cvButton = document.getElementById('cv-download-btn');
  
  if (!cvButton) {
    console.warn('CV download button not found in the DOM');
    return;
  }

  // Get configuration from data attributes
  const workerUrl = cvButton.getAttribute('data-worker-url');
  const apiKey = cvButton.getAttribute('data-api-key');
  
  if (!workerUrl || !apiKey) {
    console.error('Missing worker URL or API key in button data attributes');
    cvButton.addEventListener('click', function(e) {
      e.preventDefault();
      alert('CV download is not properly configured. Please try again later.');
    });
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
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ apiKey }),
        mode: 'cors'
      });
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data || !data.url) {
        throw new Error('Invalid response from server');
      }
      
      // Open the temporary link in a new tab
      window.open(data.url, '_blank');
      
    } catch (error) {
      console.error('Error fetching CV:', error);
      alert('Sorry, there was an error generating the CV link. Please try again later.');
    } finally {
      // Restore button state
      cvButton.textContent = originalText;
      cvButton.disabled = false;
    }
  });
}); 