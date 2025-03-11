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
    console.log('CV Config:', { 
      workerUrl, 
      workerUrlType: typeof workerUrl,
      apiKeyPresent: apiKey ? 'yes' : 'no' 
    });
    
    if (!workerUrl || !apiKey) {
      console.error('Missing worker URL or API key');
      return;
    }
    
    cvButton.addEventListener('click', async function(e) {
      e.preventDefault();
      console.log('CV button clicked');
      
      // Show loading state
      const originalText = cvButton.textContent;
      cvButton.textContent = 'Generating link...';
      cvButton.disabled = true;
      
      try {
        // IMPORTANT: Do not add /generate - it's already in the URL
        // Just use the workerUrl directly
        console.log('Raw worker URL:', workerUrl);
        
        // Request a temporary link from the worker
        console.log('Starting fetch request...');
        const response = await fetch(workerUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ apiKey }),
          mode: 'cors'
        });
        console.log('Fetch completed, status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Worker response not OK:', response.status, errorText);
          throw new Error(`Failed to generate CV access link: ${response.status} ${errorText}`);
        }
        
        console.log('Parsing response JSON...');
        const data = await response.json();
        console.log('Worker response data:', data);
        
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
        console.error('Error stack:', error.stack);
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