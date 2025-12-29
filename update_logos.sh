#!/bin/bash

# Standard logo format: FeasiQuest℠ by Clinical Research Pro®

cd /workspace/feasiquest

# List of files to update
files=(
    "create-study.html"
    "messages-viewer.html"
    "document-upload-system.html"
    "reviews-system.html"
    "site-profile-viewer.html"
    "unified-profile.html"
    "info-cards-detail.html"
    "organization-profile-enhanced.html"
    "questionnaire-enhanced.html"
    "responses.html"
    "protocol-upload.html"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "Updating logo in $file..."
        # Replace various logo formats with standardized version
        sed -i 's/<span class="logo-text">FeasiQuest<\/span>/<span class="logo-text">FeasiQuest℠<\/span>/g' "$file"
        sed -i 's/<span class="logo-tagline">by Clinical Research Pro<\/span>/<span class="logo-tagline">by Clinical Research Pro®<\/span>/g' "$file"
        sed -i 's/FeasiQuest - /FeasiQuest℠ - /g' "$file"
        sed -i 's/🎯 FeasiQuest/FeasiQuest℠/g' "$file"
    fi
done

echo "Logo updates complete!"