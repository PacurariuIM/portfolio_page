---
layout: default
title: Connect
permalink: /pages/connect/
---

<script>
  // Store API credentials in closure to prevent global access
  (function() {
    window.CV_CONFIG = {
      workerUrl: '{{ site.cv_worker_url }}',
      apiKey: '{{ site.cv_api_key }}'
    };
  })();

  // Show success message if URL has success parameter
  document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('message') === 'success') {
      alert('Message sent successfully! I will get back to you soon.');
      // Remove the query parameter without refreshing the page
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  });
</script>

<div class="max-w-3xl mx-auto">
  <h1>Let's Connect</h1>
  
  <p class="text-lg mb-8">
    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
  </p>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
    <div>
      <h2 class="text-xl font-bold mb-4">Contact Information</h2>
      
      <div class="space-y-4">
        <div class="flex items-start">
          <div class="bg-accent text-white p-2 rounded mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
            </svg>
          </div>
          <div>
            <p class="font-medium">GitHub</p>
            <a href="https://github.com/{{ site.github_username }}" target="_blank" rel="noopener noreferrer" class="text-gray-600">github.com/{{ site.github_username }}</a>
          </div>
        </div>
        
        <div class="flex items-start">
          <div class="bg-accent text-white p-2 rounded mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M15.988 16.645c-0.633 0-1.145-0.512-1.145-1.145v-2.291c0-1.090-0.363-1.873-0.785-2.265 2.583-0.288 5.291-1.267 5.291-5.725 0-1.267-0.45-2.303-1.197-3.113 0.12-0.293 0.519-1.474-0.114-3.074 0 0-0.975-0.312-3.197 1.193-0.927-0.258-1.921-0.387-2.907-0.391-0.986 0.004-1.98 0.133-2.907 0.391-2.222-1.505-3.197-1.193-3.197-1.193-0.633 1.6-0.234 2.781-0.114 3.074-0.747 0.81-1.197 1.846-1.197 3.113 0 4.446 2.708 5.437 5.291 5.725-0.422 0.392-0.785 1.175-0.785 2.265v2.291c0 0.633-0.512 1.145-1.145 1.145s-1.145-0.512-1.145-1.145v-2.291c0-2.265 1.357-3.797 2.708-4.446-2.265-0.258-6.437-1.145-6.437-7.274 0-1.61 0.575-2.927 1.516-3.967-0.15-0.372-0.657-1.873 0.144-3.904 0 0 1.236-0.396 4.056 1.511 1.177-0.327 2.444-0.491 3.707-0.497 1.263 0.006 2.53 0.17 3.707 0.497 2.82-1.907 4.056-1.511 4.056-1.511 0.801 2.031 0.294 3.532 0.144 3.904 0.941 1.040 1.516 2.357 1.516 3.967 0 6.129-4.172 7.016-6.437 7.274 1.351 0.649 2.708 2.181 2.708 4.446v2.291c0 0.633-0.512 1.145-1.145 1.145z"/>
            </svg>
          </div>
          <div>
            <p class="font-medium">LinkedIn</p>
            <a href="https://linkedin.com/in/{{ site.linkedin_username }}" target="_blank" rel="noopener noreferrer" class="text-gray-600">linkedin.com/in/{{ site.linkedin_username }}</a>
          </div>
        </div>
      </div>
      
      <div class="mt-8">
        <h3 class="text-lg font-medium mb-2">Download CV</h3>
        <p class="text-sm text-gray-600 mb-3">
          Click the button below to get a temporary link to download my CV. 
          The link will expire after 24 hours for security reasons.
        </p>
        <button 
          id="cv-download-btn" 
          class="btn btn-primary"
        >Download CV</button>
      </div>
    </div>
    
    <div>
      <h2 class="text-xl font-bold mb-4">Send a Message</h2>
      
      <form id="contact-form" class="space-y-4" action="https://formsubmit.co/{{ site.contact_email }}" method="POST">
        <!-- FormSubmit.co configuration -->
        <input type="hidden" name="_subject" value="Portfolio Contact Form">
        <input type="hidden" name="_template" value="table">
        <input type="hidden" name="_next" value="https://ionel-tech.dev/pages/connect/?message=success">
        <input type="hidden" name="_captcha" value="false">
        
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input type="text" name="name" id="name" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent">
        </div>
        
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" name="email" id="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent">
        </div>
        
        <div>
          <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input type="text" name="subject" id="subject" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent">
        </div>
        
        <div>
          <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea name="message" id="message" rows="5" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"></textarea>
        </div>
        
        <button type="submit" class="btn btn-primary w-full">Send Message</button>
      </form>
    </div>
  </div>
</div>
