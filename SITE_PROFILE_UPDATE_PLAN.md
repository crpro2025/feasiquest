# Site Profile Update Plan

## Issues Identified

### 1. Logo Inconsistency
**Current:** "FeasiQuest℠" with "by Clinical Research Pro®" but using old class name
**Should be:** Consistent with updated platform logo
**Files:** site-profile-viewer.html

### 2. Background Not Black
**Current:** Using futuristic-theme.css which has dark blue background
**Should be:** Pure black (#000) background
**Files:** site-profile-viewer.css (needs override)

### 3. Top Banner Cutting Off Card Information
**Current:** Navigation bar likely overlapping content
**Issue:** Profile container needs proper top padding/margin
**Files:** site-profile-viewer.css

### 4. Cards Not Clickable
**Current:** Cards in sidebar (Contact, Certifications, Languages) are static
**Should be:** Clickable to show detailed information
**Files:** site-profile-viewer.html, site-profile-viewer.css, site-profile-viewer.js

## Update Strategy

### Phase 1: Logo & Background (5 min)
- Update logo HTML structure
- Add black background override CSS
- Ensure proper body/html styling

### Phase 2: Fix Banner Overlap (5 min)
- Add proper padding-top to profile-container
- Ensure navigation doesn't cut off content
- Test with different screen sizes

### Phase 3: Make Cards Clickable (15 min)
- Add click handlers to sidebar cards
- Create modal/detail views for each card type
- Add hover effects and cursor pointers
- Implement smooth transitions

### Phase 4: Create Dark Theme Override (5 min)
- Create site-profile-dark-theme.css
- Override any remaining light colors
- Ensure consistency with platform

## Expected Outcome
- Consistent "FeasiQuest℠ by Clinical Research Pro®" branding
- Pure black background throughout
- No content cut off by navigation
- All sidebar cards clickable with detailed views
- Smooth animations and professional appearance

**Total Time:** ~30 minutes
**Files to modify:** 3 files (1 HTML, 2 CSS)
**Files to create:** 1 file (dark theme override)