# Build the CSS
Write-Host "Building CSS..."
npx postcss assets/css/main.css -o assets/css/styles.css

# Run Jekyll
Write-Host "Starting Jekyll server..."
bundle exec jekyll serve 