# Response Viewer & Questionnaire Creation Rebuild Plan

## Issues Identified

### 1. Questionnaire Builder Popup Formatting
**Current Issue:** Popup is poorly formatted and unreadable
**Root Cause:** Using modal container with inadequate styling
**Solution:** Integrate questionnaire creation into study creation workflow

### 2. Questionnaire Creation Workflow
**Current Issue:** Separate questionnaire builder disconnected from study creation
**User's Insight:** "Questionnaire should be created based on when a study is created. These should be one in the same, right?"
**Solution:** Integrate questionnaire creation as final step of study creation

### 3. Response Viewer
**Current Issue:** Basic response viewer needs enhancement
**Solution:** Build comprehensive response viewer with filtering, comparison, and export

## Proposed Solution

### Unified Study + Questionnaire Creation Workflow

**Step 1-7: Study Information** (existing create-study.html)
- Basic Info
- Protocol Details
- Patient Criteria
- Site Requirements
- Budget & Timeline
- Team & Contacts
- Documents

**Step 8: Create Questionnaire** (NEW - integrated)
- Auto-generate questionnaire based on study details
- Allow customization of questions
- Preview questionnaire
- Save and send to sites

### Enhanced Response Viewer

**Features:**
1. View all responses for a study
2. Filter by status, score, location
3. Compare multiple site responses side-by-side
4. Export to Excel/PDF
5. Send follow-up questions
6. Approve/reject sites

## Implementation Strategy

### Phase 1: Integrate Questionnaire into Study Creation (30 min)
- Add Step 8 to create-study.html
- Auto-generate questionnaire from study data
- Allow question customization
- Preview and send functionality

### Phase 2: Build Enhanced Response Viewer (30 min)
- Create comprehensive response viewer page
- Add filtering and sorting
- Implement comparison view
- Add export functionality

### Phase 3: Connect Everything (15 min)
- Update app.html to link to new pages
- Update navigation functions
- Test complete workflow

## Expected Outcome
- Seamless study creation → questionnaire creation → response viewing workflow
- Professional, readable interface
- Comprehensive response management
- Export and comparison capabilities

**Total Time:** ~75 minutes
**Files to modify:** 3 files
**Files to create:** 2 files