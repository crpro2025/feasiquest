# FeasiQuest User Flow Diagram

## Complete Navigation Map

```
┌─────────────────────────────────────────────────────────────────┐
│                         HOMEPAGE                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  • Hero Section with "Start Learning Now" button         │  │
│  │  • Impact Statistics                                      │  │
│  │  • Features Showcase                                      │  │
│  │  • 9 Module Cards (clickable)                            │  │
│  │  • AI Assistant Preview                                   │  │
│  │  • Testimonials                                           │  │
│  │  • FAQ Section                                            │  │
│  │  • "Explore Modules" button                              │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                    │                           │
                    │                           │
        ┌───────────┴──────────┐    ┌──────────┴────────────┐
        │ "Start Learning Now" │    │  "Explore Modules"    │
        │   or Module Card     │    │   (Skip Assessment)   │
        └───────────┬──────────┘    └──────────┬────────────┘
                    │                           │
                    ▼                           │
┌─────────────────────────────────────────┐    │
│         ASSESSMENT SECTION               │    │
│  ┌───────────────────────────────────┐  │    │
│  │  Question 1: What's your role?    │  │    │
│  │  Question 2: Experience level?    │  │    │
│  │  Question 3: Learning objective?  │  │    │
│  │                                   │  │    │
│  │  [Submit Assessment Button]       │  │    │
│  └───────────────────────────────────┘  │    │
└─────────────────────────────────────────┘    │
                    │                           │
                    │ submitAssessment()        │
                    ▼                           │
┌─────────────────────────────────────────────────────────────┐
│                    DASHBOARD                                 │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Header: "Your Learning Path"                         │  │
│  │  Progress: XP: 0 | Level: Novice                      │  │
│  │                                                        │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐             │  │
│  │  │ Module 1 │ │ Module 2 │ │ Module 3 │             │  │
│  │  │ Unlocked │ │  Locked  │ │  Locked  │             │  │
│  │  │ 🔓 Click │ │    🔒    │ │    🔒    │             │  │
│  │  └──────────┘ └──────────┘ └──────────┘             │  │
│  │                                                        │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐             │  │
│  │  │ Module 4 │ │ Module 5 │ │ Module 6 │             │  │
│  │  │  Locked  │ │  Locked  │ │  Locked  │             │  │
│  │  └──────────┘ └──────────┘ └──────────┘             │  │
│  │                                                        │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐             │  │
│  │  │ Module 7 │ │ Module 8 │ │ Module 9 │             │  │
│  │  │  Locked  │ │  Locked  │ │  Locked  │             │  │
│  │  └──────────┘ └──────────┘ └──────────┘             │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                    │
                    │ startModule(n)
                    ▼
┌─────────────────────────────────────────────────────────────┐
│                  MODULE CONTENT                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Module Header with Progress Bar                      │  │
│  │                                                        │  │
│  │  ┌─────────────────────────────────────────────┐     │  │
│  │  │  Interactive Content:                       │     │  │
│  │  │  • Text lessons                             │     │  │
│  │  │  • Case studies                             │     │  │
│  │  │  • Interactive exercises                    │     │  │
│  │  │  • Quizzes                                  │     │  │
│  │  │  • Scenarios                                │     │  │
│  │  └─────────────────────────────────────────────┘     │  │
│  │                                                        │  │
│  │  Navigation:                                           │  │
│  │  [Previous] [Next] [Complete Module]                  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                    │
                    │ completeModule() / returnToDashboard()
                    ▼
┌─────────────────────────────────────────────────────────────┐
│              BACK TO DASHBOARD                               │
│  • Module marked complete ✓                                 │
│  • XP awarded                                                │
│  • Badge unlocked                                            │
│  • Next module unlocked                                      │
│  • Progress updated                                          │
└─────────────────────────────────────────────────────────────┘
```

## Key Navigation Functions

### 1. Homepage → Assessment
```javascript
window.startAssessment()
```
- Hides all homepage sections
- Shows assessment section
- Adds app-mode class
- Scrolls to top

### 2. Homepage → Dashboard (Skip Assessment)
```javascript
window.skipToModules()
```
- Hides all homepage sections
- Sets default user profile
- Shows dashboard directly
- Adds app-mode class
- Scrolls to top

### 3. Assessment → Dashboard
```javascript
submitAssessment()
```
- Validates all questions answered
- Saves user profile
- Hides assessment
- Shows dashboard
- Scrolls to top

### 4. Dashboard → Module
```javascript
startModule(moduleNumber)
```
- Checks if module is unlocked
- Hides dashboard
- Shows module content
- Loads module data
- Scrolls to top

### 5. Module → Dashboard
```javascript
returnToDashboard()
```
- Hides module content
- Shows dashboard
- Updates progress display
- Scrolls to top

### 6. Module Completion
```javascript
completeModule1() // (or 2, 3, etc.)
```
- Awards XP
- Unlocks badge
- Marks module complete
- Unlocks next module
- Returns to dashboard after 3 seconds

## Button Mapping

| Button Location | Button Text | Function Called | Destination |
|----------------|-------------|-----------------|-------------|
| Hero Section | "Start Learning Now" | `startAssessment()` | Assessment |
| Hero Section | "Explore Modules" | `skipToModules()` | Dashboard |
| Navbar | "Launch Training" | `startAssessment()` | Assessment |
| Modules Section | Module Card Click | `skipToModules()` then `startModule(n)` | Dashboard → Module |
| Final CTA | "Start Learning Now" | `startAssessment()` | Assessment |
| Final CTA | "Explore Modules" | `skipToModules()` | Dashboard |
| Assessment | "Submit Assessment" | `submitAssessment()` | Dashboard |
| Dashboard | Module Card Click | `startModule(n)` | Module Content |
| Module | "Complete Module" | `completeModule()` | Dashboard (after 3s) |

## State Management

### LocalStorage Keys
- `feasiquest_userProfile` - User role, experience, objective
- `feasiquest_completedModules` - Array of completed module numbers
- `feasiquest_xp` - Total XP earned
- `feasiquest_level` - Current level (Novice, Analyst, Expert, Master)
- `feasiquest_badges` - Array of unlocked badges

### App State Object
```javascript
appState = {
    currentModule: null,
    userProfile: {
        role: '',
        experience: '',
        objective: '',
        completedModules: [],
        xp: 0,
        level: 'Novice'
    }
}
```

## Visual States

### Homepage Mode
- Navbar visible
- Animated background visible
- All homepage sections visible
- Widgets visible (progress, chat, stats bar)
- Footer visible

### App Mode (Training)
- Navbar hidden
- Animated background hidden
- Homepage sections hidden
- Widgets hidden
- Footer hidden
- Clean, focused learning environment
- Only active section visible (Assessment/Dashboard/Module)

## Transition Effects

All transitions include:
1. **Fade-in animation** (0.5s ease-out)
2. **Smooth scroll to top** (smooth behavior)
3. **Display management** (explicit none/block)
4. **Class management** (hidden/fade-in)
5. **Console logging** (for debugging)

## Error Handling

Each navigation function includes:
- Null checks for DOM elements
- Try-catch blocks
- User-friendly error messages
- Console error logging
- Graceful degradation

## Mobile Responsiveness

All sections are fully responsive:
- Stacked layouts on mobile
- Touch-optimized buttons
- Readable text sizes
- Proper spacing
- Smooth animations maintained

---

**Status**: ✅ All navigation flows working perfectly
**Last Updated**: 2025-01-18
**Version**: 2.0 (Navigation Fixed)