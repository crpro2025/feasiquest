# FeasiQuest Platform Consistency & Billing Implementation Plan

## Current State Analysis

### Pages Identified (32 total HTML files):
**Core Pages:**
1. homepage-updated.html (NEW - text-only logo, modern design)
2. app.html (main dashboard)
3. site-registration.html
4. study-creation.html
5. questionnaire-builder.html
6. pricing-new.html (NEW - updated pricing)

**AI Features:**
7. ai-enrollment-predictor.html
8. ai-protocol-analyzer.html
9. ai-site-recommender.html

**Enhanced Features:**
10. enhanced-site-profile.html
11. enhanced-questionnaire-response.html
12. enhanced-messages.html

**Additional Pages:**
13. help-center.html
14. profile-editor.html
15. site-profile.html
16. auth-ui.html
17. dashboard-ui.html
18. practice-ui.html

**Legacy/Backup Pages:**
- homepage-futuristic.html (OLD)
- index.html, new-homepage.html, etc.

---

## Standardization Requirements

### 1. **Logo & Branding**
**Standard:**
- Text-only "FeasiQuest" logo with gradient (red to purple)
- Tagline: "by Clinical Research Pro"
- No target icon or graphics
- Consistent sizing: Logo 28px, Tagline 11px

### 2. **Navigation Header**
**Standard:**
- Fixed top navigation
- White background with subtle shadow
- Links: Features, How It Works, AI Tools, Pricing
- Right side: Login button, Get Started button
- Responsive hamburger menu for mobile

### 3. **Footer**
**Standard:**
- Dark gradient background (#1a1a2e to #16213e)
- 5-column layout: Brand, Platform, AI Features, Resources, Contact
- Clinical Research Pro logo (5.png) with link
- Social media icons (LinkedIn, Twitter, Facebook, YouTube)
- Compliance badges (HIPAA, SOC 2, FDA, GDPR)
- Copyright and legal links

### 4. **Color Scheme**
**Standard:**
- Primary Red: #dc2626
- Secondary Purple: #7c3aed
- Accent Orange: #f59e0b
- Success Green: #10b981
- Dark: #1a1a2e
- Light: #f8fafc

---

## Implementation Plan

### Phase 1: Create Standardized Components (Day 1)

#### 1.1 Create Global Navigation Component
**File:** `global-nav.html`
- Reusable navigation header
- Include in all pages via JavaScript or server-side include

#### 1.2 Create Global Footer Component
**File:** `global-footer.html`
- Reusable footer
- Include in all pages

#### 1.3 Create Global Styles
**File:** `global-styles.css`
- Navigation styles
- Footer styles
- Typography
- Color variables
- Utility classes

#### 1.4 Create Global JavaScript
**File:** `global-scripts.js`
- Navigation interactions
- Mobile menu toggle
- Smooth scrolling
- Common utilities

---

### Phase 2: Update All Pages (Day 2-3)

#### Priority 1: Core User-Facing Pages
1. ✅ homepage-updated.html (already updated)
2. ⏳ app.html
3. ⏳ site-registration.html
4. ⏳ study-creation.html
5. ⏳ questionnaire-builder.html
6. ✅ pricing-new.html (already updated)

#### Priority 2: AI Feature Pages
7. ⏳ ai-enrollment-predictor.html
8. ⏳ ai-protocol-analyzer.html
9. ⏳ ai-site-recommender.html

#### Priority 3: Enhanced Feature Pages
10. ⏳ enhanced-site-profile.html
11. ⏳ enhanced-questionnaire-response.html
12. ⏳ enhanced-messages.html

#### Priority 4: Supporting Pages
13. ⏳ help-center.html
14. ⏳ profile-editor.html
15. ⏳ site-profile.html

---

### Phase 3: Implement Stripe Billing (Day 4-5)

#### 3.1 Stripe Integration Setup
**Files to Create:**
- `billing-config.js` - Stripe configuration
- `checkout.html` - Checkout page
- `billing-portal.html` - Customer portal
- `subscription-management.html` - Manage subscriptions

**Features:**
- Stripe Checkout integration
- Subscription management
- Payment method updates
- Invoice history
- Usage tracking

#### 3.2 Pricing Tiers Implementation
**Sites:**
- Free: $0/month (no payment required)
- Professional: $299/month ($239 annual)
- Premium: $599/month ($479 annual)

**Sponsors/CROs:**
- Starter: $999/month ($799 annual)
- Professional: $2,499/month ($1,999 annual)
- Enterprise: $4,999/month ($3,999 annual)

#### 3.3 Trial Management
- 30-day free trial for all paid tiers
- No credit card required for trial
- Automatic conversion to paid after trial
- Email notifications (trial ending, payment due, etc.)

---

### Phase 4: Beta Launch Preparation (Day 6-7)

#### 4.1 Beta Features
- Limited user access (invite-only)
- Feedback collection system
- Bug reporting tool
- Usage analytics
- Performance monitoring

#### 4.2 Beta User Management
- Invite system
- User onboarding flow
- Welcome emails
- Tutorial videos
- Support documentation

#### 4.3 Launch Checklist
- [ ] All pages consistent (logo, nav, footer)
- [ ] Stripe billing integrated and tested
- [ ] Trial system working
- [ ] Email notifications configured
- [ ] Analytics tracking implemented
- [ ] Beta invite system ready
- [ ] Support documentation complete
- [ ] Bug reporting system active
- [ ] Performance monitoring enabled
- [ ] Backup and recovery tested

---

## Detailed Implementation Steps

### Step 1: Create Standardized Navigation

**global-nav.html:**
```html
<nav class="global-nav">
    <div class="nav-container">
        <div class="nav-brand">
            <a href="homepage-updated.html">
                <span class="nav-logo">FeasiQuest</span>
                <span class="nav-tagline">by Clinical Research Pro</span>
            </a>
        </div>
        <div class="nav-links">
            <a href="homepage-updated.html#features">Features</a>
            <a href="homepage-updated.html#how-it-works">How It Works</a>
            <a href="homepage-updated.html#ai-tools">AI Tools</a>
            <a href="pricing-new.html">Pricing</a>
            <a href="app.html" class="btn-login">Login</a>
            <a href="checkout.html" class="btn-signup">Get Started Free</a>
        </div>
        <button class="mobile-menu-toggle">
            <i class="fas fa-bars"></i>
        </button>
    </div>
</nav>
```

### Step 2: Create Standardized Footer

**global-footer.html:**
```html
<footer class="global-footer">
    <div class="footer-container">
        <div class="footer-main">
            <!-- 5 columns: Brand, Platform, AI Features, Resources, Contact -->
            <!-- Same structure as homepage-updated.html footer -->
        </div>
        <div class="footer-bottom">
            <!-- Copyright, legal links, compliance badges -->
        </div>
    </div>
</footer>
```

### Step 3: Stripe Integration

**billing-config.js:**
```javascript
// Stripe configuration
const STRIPE_PUBLIC_KEY = 'pk_test_...'; // Replace with actual key

// Price IDs from Stripe Dashboard
const PRICE_IDS = {
    sites: {
        professional_monthly: 'price_...',
        professional_annual: 'price_...',
        premium_monthly: 'price_...',
        premium_annual: 'price_...'
    },
    sponsors: {
        starter_monthly: 'price_...',
        starter_annual: 'price_...',
        professional_monthly: 'price_...',
        professional_annual: 'price_...',
        enterprise_monthly: 'price_...',
        enterprise_annual: 'price_...'
    }
};

// Initialize Stripe
const stripe = Stripe(STRIPE_PUBLIC_KEY);
```

**checkout.html:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Checkout - FeasiQuest</title>
    <script src="https://js.stripe.com/v3/"></script>
</head>
<body>
    <!-- Include global-nav.html -->
    
    <div class="checkout-container">
        <h1>Complete Your Subscription</h1>
        <div id="checkout-form">
            <!-- Stripe Checkout Elements -->
        </div>
    </div>
    
    <!-- Include global-footer.html -->
    <script src="billing-config.js"></script>
    <script src="checkout.js"></script>
</body>
</html>
```

---

## Timeline

### Week 1: Consistency & Billing
- **Day 1-2:** Create standardized components
- **Day 3-4:** Update all pages with consistent nav/footer
- **Day 5-6:** Implement Stripe billing
- **Day 7:** Testing and bug fixes

### Week 2: Beta Launch
- **Day 8-9:** Beta user management system
- **Day 10-11:** Onboarding and documentation
- **Day 12-13:** Final testing
- **Day 14:** Beta launch! 🚀

---

## Success Metrics

### Consistency:
- [ ] All 32 pages have identical navigation
- [ ] All 32 pages have identical footer
- [ ] All pages use same color scheme
- [ ] All pages have same typography
- [ ] Mobile responsive on all pages

### Billing:
- [ ] Stripe integration working
- [ ] All 6 pricing tiers configured
- [ ] Trial system functional
- [ ] Payment processing tested
- [ ] Subscription management working

### Beta Launch:
- [ ] 50+ beta users signed up
- [ ] <5% error rate
- [ ] >80% user satisfaction
- [ ] >50% trial-to-paid conversion
- [ ] <2 second page load times

---

## Next Steps

1. **Immediate:** Create standardized components
2. **Day 1-2:** Update all pages
3. **Day 3-4:** Implement Stripe
4. **Day 5-6:** Beta preparation
5. **Day 7:** Launch beta! 🎉

---

**Created:** October 21, 2025  
**Status:** Ready to Implement  
**Timeline:** 7-14 days to beta launch