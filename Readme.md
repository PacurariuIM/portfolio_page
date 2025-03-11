# Portfolio page 

My goal is to create a simple portfolio page, with relevant information about me and my projects.

## Tech stack
- Jekyll 
- TailwindCSS - for styling
- Formspree/Getform – For the contact form
- Serverless Function (Cloudflare Workers) - For generating temporary CV links

## Features and security measures
- Contact form only (Freeform or Getform) for form submision
- CV access control: Serverless function generates temporary access links
- Cloudflare Free Plan (DDoS & bot protection)
- robots.txt to block unwanted crawlers
- Disable search indexing in robots.txt

## Deployment plan
- Host on GitHub Pages
- Custom Domain Setup
- Enable HTTPS via GitHub Pages for security


## Development steps

### Install Ruby locally
On Windows [(Ruby install details)](https://www.ruby-lang.org/en/documentation/installation/)
```sh
> winget install RubyInstallerTeam.Ruby.{MAJOR}.{MINOR}
# Example
> winget install RubyInstallerTeam.Ruby.3.2
# To see all versions available
> winget search RubyInstallerTeam.Ruby
# Note: if you are installing ruby for projects, you may want to install RubyWithDevKit
> winget install RubyInstallerTeam.RubyWithDevKit.3.2
```

###  Set Up Jekyll Locally
- install Jekyll
```sh
gem install jekyll bundler
```
- create new Jekyll project
```sh
jekyll new my-portfolio
cd my-portfolio
```
- run the local server
```sh
bundle exec jekyll serve
```
- site should now be live at `http://localhost:4000/.`

### Configure GitHub Pages for Deployment
- in `Gemfile` add
```sh
gem "github-pages", group: :jekyll_plugins
```
- install dependencies
```sh
bundle install
```
- in `_config.yml` add
```sh
title: "My Portfolio"
baseurl: "" # Keep empty for GitHub Pages
url: "https://yourusername.github.io"
markdown: kramdown
theme: minima # Or choose a custom theme
```
- push to GitHub
```sh
git init
git add .
git commit -m "Initial Jekyll setup"
git branch -M main
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

## Folder and files structure

```
/portfolio_page
 ├── _includes/         # Reusable components (e.g., navbar, footer)
 ├── _layouts/          # Page layouts
 ├── _posts/            # (Optional) Blog posts
 ├── _data/             # (Optional) YAML data files
 ├── _site/             # Generated site (ignored in Git)
 ├── assets/            # CSS, JS, images
 ├── pages/
 │   ├── about.md       # About Me page
 │   ├── projects.md    # Projects page
 │   ├── connect.md     # Connect page
 ├── index.md           # Homepage
 ├── _config.yml        # Jekyll config
 ├── Gemfile            # Dependencies
 └── README.md          # Project details
```
