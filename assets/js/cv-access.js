/**
 * CV Access Handler
 * 
 * This script handles the CV download button click and fetches a temporary access link
 * from the Cloudflare Worker.
 */

document.addEventListener('DOMContentLoaded', function() {
  const cvButton = document.getElementById('cv-download-btn');
  console.log('CV button found:', !!cvButton);
  
  if (cvButton) {
    // Get the configuration from the closure
    const { workerUrl, apiKey } = window.CV_CONFIG || {};
    console.log('CV Config:', { workerUrl, apiKey: apiKey ? '[PRESENT]' : '[MISSING]' });
    
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
        // Fix duplicate /generate path
        // If workerUrl already ends with /generate, don't append it again
        const fetchUrl = workerUrl.endsWith('/generate') ? workerUrl : `${workerUrl}/generate`;
        console.log('Attempting to fetch from:', fetchUrl);
        
        // Request a temporary link from the worker
        const response = await fetch(fetchUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ apiKey }),
          mode: 'cors'
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
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
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