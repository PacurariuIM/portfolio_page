#!/bin/bash

# Build the CSS
echo "Building CSS..."
npx postcss assets/css/main.css -o assets/css/styles.css

# Run Jekyll
echo "Starting Jekyll server..."
bundle exec jekyll serve 