---
layout: default
title: Connect
permalink: /pages/connect/
---

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
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V9m0 2v2m0-2h2m-2 0H6" />
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
          data-worker-url="{{ site.cv_worker_url }}"
          data-api-key="{{ site.cv_api_key }}"
        >Download CV</button>
      </div>
    </div>
    
    <div>
      <h2 class="text-xl font-bold mb-4">Send a Message</h2>
      <p class="text-gray-600 mb-4">
        Have a question or want to work together? Feel free to send me a message.
      </p>
      
      <form action="https://formspree.io/f/your-form-id" method="POST" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input type="text" name="name" id="name" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        </div>
        
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" name="_replyto" id="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        </div>
        
        <div>
          <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea name="message" id="message" rows="4" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>
        
        <button type="submit" class="btn btn-primary">Send Message</button>
      </form>
    </div>
  </div>
</div>
