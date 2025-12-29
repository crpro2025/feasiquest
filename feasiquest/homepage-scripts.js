// ===== MOBILE MENU =====
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// ===== PRICING TOGGLE =====
function togglePricing() {
    const toggle = document.getElementById('pricingToggle');
    const isAnnual = toggle.checked;
    
    // Sponsor/CRO prices
    const starterPrice = document.getElementById('starter-price');
    const professionalPrice = document.getElementById('professional-price');
    const enterprisePrice = document.getElementById('enterprise-price');
    
    // Site prices
    const siteProPrice = document.getElementById('site-pro-price');
    const networkPrice = document.getElementById('network-price');
    
    if (isAnnual) {
        // Annual pricing (17% discount = 2 months free)
        starterPrice.textContent = '$415';
        professionalPrice.textContent = '$1,659';
        enterprisePrice.textContent = '$4,149';
        siteProPrice.textContent = '$248';
        networkPrice.textContent = '$663';
    } else {
        // Monthly pricing
        starterPrice.textContent = '$499';
        professionalPrice.textContent = '$1,999';
        enterprisePrice.textContent = '$4,999';
        siteProPrice.textContent = '$299';
        networkPrice.textContent = '$799';
    }
}

// ===== ROI CALCULATOR =====
function calculateROI() {
    const studyCount = parseInt(document.getElementById('studyCount').value) || 5;
    const costPerStudy = parseInt(document.getElementById('costPerStudy').value) || 1000000;
    
    // FeasiQuest Professional plan cost
    const annualCost = 1999 * 12; // $23,988
    
    // Calculate savings (30-40% reduction in costs)
    const savingsPerStudy = costPerStudy * 0.35; // 35% average
    const totalSavings = (savingsPerStudy * studyCount) - annualCost;
    
    // Calculate ROI
    const roi = ((totalSavings / annualCost) * 100).toFixed(0);
    
    // Update display
    document.getElementById('annualSavings').textContent = '$' + totalSavings.toLocaleString();
    document.getElementById('roiPercent').textContent = roi.toLocaleString() + '%';
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#demo' && href !== '#contact' && href !== '#about' && href !== '#careers' && href !== '#press' && href !== '#blog' && href !== '#help' && href !== '#api' && href !== '#status' && href !== '#privacy' && href !== '#terms' && href !== '#security' && href !== '#compliance') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            }
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.problem-card, .feature-card, .pricing-card, .testimonial-card, .step');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Initialize ROI calculator
    calculateROI();
});

// ===== HEADER SCROLL EFFECT =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        header.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
    }
    
    lastScroll = currentScroll;
});

// ===== CLOSE MOBILE MENU ON OUTSIDE CLICK =====
document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('mobileMenu');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !toggle.contains(e.target)) {
        mobileMenu.classList.remove('active');
    }
});

// ===== PREVENT SCROLL WHEN MOBILE MENU OPEN =====
const mobileMenu = document.getElementById('mobileMenu');
const observer2 = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    });
});

observer2.observe(mobileMenu, { attributes: true });

// ===== STATS COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const value = entry.target.textContent.replace(/[^0-9]/g, '');
            if (value) {
                animateCounter(entry.target, parseInt(value));
                entry.target.dataset.animated = 'true';
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => statsObserver.observe(stat));
});