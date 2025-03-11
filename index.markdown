---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---

<section class="py-16 md:py-24">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <div>
      <h1 class="text-4xl md:text-5xl font-bold text-primary mb-4">Hi, I'm <span class="text-accent">Your Name</span></h1>
      <p class="text-xl text-gray-600 mb-6">I build modern web applications with a focus on performance, accessibility, and user experience.</p>
      <div class="flex space-x-4">
        <a href="{{ '/pages/projects' | relative_url }}" class="btn btn-primary">View Projects</a>
        <a href="{{ '/pages/connect' | relative_url }}" class="btn bg-gray-200 text-gray-800 hover:bg-gray-300 hover:no-underline">Get in Touch</a>
      </div>
    </div>
    <div class="hidden md:block">
      <!-- Placeholder for profile image or illustration -->
      <div class="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
        <span class="text-gray-500">Profile Image</span>
      </div>
    </div>
  </div>
</section>

<section class="py-12 bg-gray-100">
  <div class="container-custom">
    <h2 class="text-2xl font-bold mb-8 text-center">Featured Projects</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {% for i in (1..3) %}
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="bg-gray-200 h-48"></div>
        <div class="p-6">
          <h3 class="font-bold mb-2">Project {{ i }}</h3>
          <p class="text-gray-600 mb-4">A brief description of the project and the technologies used.</p>
          <a href="{{ '/pages/projects' | relative_url }}" class="text-accent font-medium">View Details →</a>
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
</section>
