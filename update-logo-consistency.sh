#!/bin/bash

# Script to update FeasiQuest logo consistency across all HTML files

echo "Starting logo consistency update..."

# Define the consistent logo HTML
LOGO_HTML='<a href="index.html" class="nav-logo">
                    <span class="brand-text">FeasiQuest℠</span>
                    <span class="brand-tagline">by Clinical Research Pro®</span>
                </a>'

# List of main HTML files to update
FILES=(
    "app.html"
    "messages-viewer.html"
    "response-viewer-enhanced.html"
    "questionnaire-updated.html"
    "protocol-upload.html"
    "site-registration.html"
    "ai-enrollment-predictor.html"
    "ai-protocol-analyzer.html"
    "ai-site-recommender.html"
    "help-center.html"
    "dei-recruitment.html"
    "enhanced-messages.html"
    "enhanced-questionnaire-response.html"
    "enhanced-site-profile.html"
)

echo "Files to update: ${#FILES[@]}"

# Note: This is a planning script
# Actual updates will be done programmatically in the next steps

echo "Logo consistency update plan created"