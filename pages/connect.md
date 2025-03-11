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
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <div>
            <p class="font-medium">Email</p>
            <a href="mailto:{{ site.email }}" class="text-gray-600">{{ site.email }}</a>
          </div>
        </div>
        
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
              <path fill-rule="evenodd" d="M0 5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2H2a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L5.586 10 3.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
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
      
      <form action="https://formspree.io/f/your-form-id" method="POST" class="space-y-4">
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
