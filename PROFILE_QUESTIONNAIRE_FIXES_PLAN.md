# Profile & Questionnaire Fixes Plan

## Issues Identified

### 1. Top Banner Covering Info Cards (Sponsor/CRO Dashboard)
**Problem:** Navigation bar overlaps the stat cards at the top
**Root Cause:** `.main-content` has only 30px padding-top, not enough for fixed nav
**Solution:** Increase padding-top to 100px to account for navigation height

### 2. Background Not Black
**Problem:** Dashboard has white/light backgrounds
**Root Cause:** Using light theme colors in app-styles.css
**Solution:** Override with black backgrounds and dark theme

### 3. Logo Color Inconsistency
**Problem:** Logo colors don't match homepage gradient
**Homepage Logo:** Red to Purple gradient (#dc2626 → #7c3aed)
**Other Pages:** Various colors
**Solution:** Apply exact same gradient to ALL pages

### 4. Research Site - Recent Questionnaires Not Visible
**Problem:** Research sites can't see recent questionnaires on dashboard
**Current:** Questionnaires section exists but not prominently displayed
**Solution:** Make recent questionnaires more visible on site dashboard

### 5. Questionnaire Modal - No Pre-population
**Problem:** Questionnaire doesn't pre-fill known profile data
**Solution:** Auto-populate fields from user profile data

### 6. Questionnaire Modal - Poor Formatting
**Problem:** Layout and formatting issues in modal
**Issues:**
- Inline styles make it hard to read
- No proper spacing
- Colors don't match dark theme
- Form controls not styled properly
**Solution:** Create proper CSS classes and improve layout

## Implementation Strategy

### Phase 1: Fix Dashboard Padding & Background (15 min)
- Update `.main-content` padding-top to 100px
- Add black background overrides
- Update stat cards to dark theme

### Phase 2: Standardize Logo Across All Pages (20 min)
- Create global logo CSS with exact homepage gradient
- Update all pages to use consistent logo styling
- Gradient: linear-gradient(135deg, #dc2626 0%, #7c3aed 100%)

### Phase 3: Enhance Research Site Dashboard (15 min)
- Make recent questionnaires more prominent
- Add visual indicators for pending questionnaires
- Improve layout and visibility

### Phase 4: Pre-populate Questionnaire (20 min)
- Extract profile data from user session
- Auto-fill known fields (site name, location, contact, etc.)
- Mark pre-filled fields with visual indicator

### Phase 5: Redesign Questionnaire Modal (30 min)
- Create proper CSS classes for questionnaire
- Improve layout with proper spacing
- Apply dark theme styling
- Add better form controls
- Improve readability

## Expected Outcome
- No content overlap with navigation
- Consistent black backgrounds across all pages
- Exact logo color match on all pages
- Research sites can easily see pending questionnaires
- Questionnaires pre-populate with known data
- Professional, readable questionnaire modal

**Total Time:** ~100 minutes
**Files to modify:** 5-7 files
**Files to create:** 2 files (CSS overrides)