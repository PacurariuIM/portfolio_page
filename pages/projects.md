---
layout: default
title: Projects
permalink: /pages/projects/
---

<div class="max-w-5xl mx-auto">
  <h1>Projects</h1>
  
  <p class="text-lg mb-8">
    Here are some of the projects I've worked on. Each demonstrates different skills and technologies.
  </p>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
    {% for project in site.data.projects %}
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="bg-gray-200 h-64">
        {% if project.image %}
        <img src="{{ project.image | relative_url }}" alt="{{ project.name }}" class="w-full h-full object-cover">
        {% endif %}
      </div>
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-2">{{ project.name }}</h2>
        <p class="text-gray-600 mb-4">{{ project.description }}</p>
        <div class="flex flex-wrap gap-2 mb-4">
          {% for tech in project.technologies %}
          <span class="px-3 py-1 {{ tech.class }} rounded-full text-sm">{{ tech.name }}</span>
          {% endfor %}
        </div>
        <div class="flex space-x-4">
          {% if project.demo_url %}
          <a href="{{ project.demo_url }}" target="_blank" rel="noopener noreferrer" class="text-accent font-medium hover:underline">View Demo</a>
          {% endif %}
          {% if project.github_url %}
          <a href="{{ project.github_url }}" target="_blank" rel="noopener noreferrer" class="text-gray-600 font-medium hover:underline">GitHub</a>
          {% endif %}
        </div>
      </div>
    </div>
    {% endfor %}
  </div>
  
  <div class="text-center">
    <p class="mb-4">Interested in working together?</p>
    <a href="{{ '/pages/connect' | relative_url }}" class="btn btn-primary">Get in Touch</a>
  </div>
</div>

