#!/bin/bash

# Script to add futuristic theme to all HTML files

echo "Applying futuristic theme to all HTML files..."

# List of HTML files to update
files=(
    "app.html"
    "responses.html"
    "messages.html"
    "protocol-upload.html"
    "questionnaire-enhanced.html"
    "site-registration.html"
    "ai-enrollment-predictor.html"
    "ai-protocol-analyzer.html"
    "ai-site-recommender.html"
    "help-center.html"
    "dei-recruitment.html"
)

# Add futuristic-theme.css to each file if not already present
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        # Check if futuristic-theme.css is already included
        if ! grep -q "futuristic-theme.css" "$file"; then
            # Add the link tag after the first <link> tag or in <head>
            sed -i '/<head>/a\    <link rel="stylesheet" href="futuristic-theme.css">' "$file"
            echo "✓ Added futuristic theme to $file"
        else
            echo "○ $file already has futuristic theme"
        fi
    else
        echo "✗ $file not found"
    fi
done

echo "Done! Futuristic theme applied to all files."