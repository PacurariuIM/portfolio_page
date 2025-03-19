---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---

<section class="py-16 md:py-24">
  <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
    <!-- Main content area - takes up 8 columns on md screens -->
    <div class="md:col-span-8">
      <h1 class="text-4xl md:text-5xl font-bold text-primary mb-6">Hi, I'm <span class="text-accent">Ionel-Mihai Pacurariu</span></h1>
      
      <div class="prose prose-lg max-w-none">
        <p class="text-xl text-gray-600 mb-6">Welcome to my corner of the web! I'm a tech enthusiast with a unique journey from military service to the world of technology.</p>
        
        <h2 class="text-2xl font-semibold mb-4">About Me</h2>
        <p>My path has been anything but conventional. After serving as an Artillery Officer for 15 years, I made a bold transition into the tech world, driven by my passion for problem-solving and continuous learning.</p>
        
        <h2 class="text-2xl font-semibold mb-4 mt-8">What Drives Me</h2>
        <p>I'm fascinated by the way technology can transform ideas into solutions that make a real difference. Whether it's optimizing processes, building applications, or analyzing data, I find joy in creating meaningful impact through technology.</p>
        
        <h2 class="text-2xl font-semibold mb-4 mt-8">Beyond Tech</h2>
        <p>When I'm not coding or exploring new technologies, you'll find me [Your interests/hobbies here]. I believe in maintaining a balanced life where continuous learning meets personal growth.</p>
        
        <div class="flex space-x-4 mt-8">
          <a href="{{ '/about' | relative_url }}" class="btn btn-primary">Career & Studies</a>
          <a href="{{ '/pages/projects' | relative_url }}" class="btn bg-gray-200 text-gray-800 hover:bg-gray-300 hover:no-underline">View Projects</a>
        </div>
      </div>
    </div>
    
    <!-- Sidebar/Picture area - takes up 4 columns on md screens -->
    <div class="md:col-span-4">
      <div class="sticky top-8">
        <div class="bg-gray-200 rounded-lg overflow-hidden">
          <img src="/assets/images/Ionel.jpg" alt="Ionel-Mihai Pacurariu" class="w-full h-auto object-cover">
        </div>
        
        <div class="mt-6 bg-white p-6 rounded-lg shadow">
          <h3 class="font-bold text-lg mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li><a href="{{ '/pages/connect' | relative_url }}" class="text-accent hover:underline">Get in Touch</a></li>
            <li><a href="[Your LinkedIn URL]" class="text-accent hover:underline">LinkedIn</a></li>
            <li><a href="[Your GitHub URL]" class="text-accent hover:underline">GitHub</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-12 bg-gray-100">
  <div class="container-custom">
    <h2 class="text-2xl font-bold mb-8 text-center">Skills & Experience</h2>
    
    <!-- Tech Stack Section -->
    <div class="mb-12">
      <h3 class="text-xl font-semibold mb-6">Technical Skills</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Languages -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h4 class="font-bold text-accent mb-4">Programming Languages</h4>
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Python</span>
            <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">JavaScript</span>
            <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">HTML</span>
            <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">CSS</span>
            <span class="px-3 py-1 bg-ochre-100 text-ochre-800 rounded-full text-sm">XML</span>
            <span class="px-3 py-1 bg-magenta-100 text-magenta-800 rounded-full text-sm">Power Shell</span>
          </div>
        </div>
        
        <!-- Frameworks -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h4 class="font-bold text-accent mb-4">Frameworks & Libraries</h4>
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">React</span>
            <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Flask</span>
            <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Node.js</span>
          </div>
        </div>
        
        <!-- Tools -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h4 class="font-bold text-accent mb-4">Tools & Platforms</h4>
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Git</span>
            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Docker</span>
            <span class="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">AWS</span>
            <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Hetzner Cloud</span>
            <span class="px-3 py-1 bg-ochre-100 text-ochre-800 rounded-full text-sm">Tableau</span>
            <span class="px-3 py-1 bg-magenta-100 text-magenta-800 rounded-full text-sm">Jira</span>


          </div>
        </div>
      </div>
    </div>
    
    <!-- Experience Timeline -->
    <div>
      <h3 class="text-xl font-semibold mb-6">Professional Journey</h3>
      <div class="space-y-6">
        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex justify-between items-start mb-2">
            <h4 class="font-bold text-lg">Data analyst</h4>
            <span class="text-gray-600">July 2024 - Dec 2024</span>
          </div>
          <p class="text-gray-600">  As a Professional Services Consultant, I provide expert support on the Aternity EUEM solution. My role involves optimizing backend data processes, implementing automated remediation actions, and delivering insights through monthly reports and clear, data-driven dashboards that drive impactful decision-making.</p>
          <p>•	Improved data-backend processes, leading to a 15% increase in client retention and a user experience score boost from 7.6 to 8.2 in the first 2 months.</p>
          <p>•	Designed and implemented automated remediation actions, enhancing support service (ServiceNow) performance by over 18% within the first month.</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex justify-between items-start mb-2">
            <h4 class="font-bold text-lg">DevOps engineer</h4>
            <span class="text-gray-600">Oct 2023 – July 2024</span>
          </div>
          <p class="text-gray-600">At Cavell Group, I focused on backend development with Python to enhance product performance and reliability. My key contributions involved refactoring core code and developing new scripts, which accelerated delivery and improved project outcome.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex justify-between items-start mb-2">
            <h4 class="font-bold text-lg">Application Management Engineer</h4>
            <span class="text-gray-600">June 2022 – Oct 2023</span>
          </div>
          <p class="text-gray-600">As an Application Management Engineer at Endava, I focused on enhancing backend functionality, using XML (Rulebook platform) and user experience for our finance applica-tion. My role involved optimizing processes, managing localization efforts, and supporting teams.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex justify-between items-start mb-2">
            <h4 class="font-bold text-lg">Artillery Officer</h4>
            <span class="text-gray-600">Aug 2007 – Apr 2022</span>
          </div>
          <p class="text-gray-600">As an Air Force Officer, I managed teams in high-pressure environments, prioritizing strategic collaboration and efficient resource allocation.</p>
        </div>
      </div>
    </div>
  </div>
</section>
