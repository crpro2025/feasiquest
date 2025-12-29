#!/bin/bash

# Script to add futuristic theme to ALL HTML files

echo "🎨 Applying futuristic theme to ALL HTML files..."
echo ""

# Counter
count=0

# Find all HTML files and add theme
for file in $(find . -name "*.html" -type f | grep -v node_modules | sort); do
    # Check if futuristic-theme.css is already included
    if ! grep -q "futuristic-theme.css" "$file"; then
        # Check if file has a <head> tag
        if grep -q "<head>" "$file"; then
            # Add the link tag after <head>
            sed -i '/<head>/a\    <link rel="stylesheet" href="futuristic-theme.css">' "$file"
            echo "✅ Added theme to: $file"
            ((count++))
        else
            echo "⚠️  No <head> tag in: $file (skipping)"
        fi
    else
        echo "○ Already has theme: $file"
    fi
done

echo ""
echo "🎉 Done! Added futuristic theme to $count files."