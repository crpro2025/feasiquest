// ===================================
// FUTURISTIC HOMEPAGE ANIMATIONS
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 FeasiQuest Homepage Initialized');
    
    // ===================================
    // PARTICLE SYSTEM
    // ===================================
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 3 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(220, 38, 38, 0.5)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out`;
            particle.style.animationDelay = Math.random() * 5 + 's';
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();
    
    // ===================================
    // NAVBAR SCROLL EFFECT
    // ===================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ===================================
    // ANIMATED COUNTER
    // ===================================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString() + (element.parentElement.querySelector('.stat-label').textContent.includes('Rate') ? '%' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString() + (element.parentElement.querySelector('.stat-label').textContent.includes('Rate') ? '%' : '');
            }
        }, 16);
    }
    
    // Intersection Observer for counters
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.stat-value').forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // ===================================
    // SMOOTH SCROLL FOR NAVIGATION
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===================================
    // BUTTON HANDLERS - BULLETPROOF
    // ===================================
    
    // Wait for all scripts to load
    setTimeout(function() {
        // Get all start buttons
        const startButtons = [
            document.getElementById('navStartBtn'),
            document.getElementById('heroStartBtn'),
            document.getElementById('finalStartBtn')
        ];
        
        // Get all explore/module buttons
        const exploreButtons = [
            document.getElementById('heroExploreBtn'),
            document.getElementById('finalExploreBtn')
        ];
        
        // Attach event listeners to all start buttons
        startButtons.forEach(button => {
            if (button) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('🔘 Start button clicked:', button.id);
                    if (typeof window.startAssessment === 'function') {
                        console.log('✅ Calling startAssessment()');
                        window.startAssessment();
                    } else {
                        console.error('❌ startAssessment function not found!');
                    }
                });
                console.log('✅ Event listener attached to:', button.id);
            } else {
                console.warn('⚠️ Button not found');
            }
        });
        
        // Attach event listeners to all explore buttons
    exploreButtons.forEach(button => {
            if (button) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('🔘 Explore button clicked:', button.id);
                    if (typeof window.skipToModules === 'function') {
                        console.log('✅ Calling skipToModules()');
                        window.skipToModules();
                    } else {
                        console.error('❌ skipToModules function not found!');
                    }
                });
                console.log('✅ Event listener attached to:', button.id);
            } else {
                console.warn('⚠️ Button not found');
            }
        });
    }, 500); // Wait 500ms for all scripts to load
    
    // ===================================
    // MODULE CARD INTERACTIONS
    // ===================================
    document.querySelectorAll('.module-card').forEach(card => {
        card.addEventListener('click', function() {
            const moduleNumber = this.dataset.module;
            console.log('📖 Module clicked:', moduleNumber);
            
            // Store module selection and navigate to dashboard
            localStorage.setItem('startModule', moduleNumber);
            
            if (typeof window.skipToModules === 'function') {
                window.skipToModules();
            }
        });
    });
    
    // ===================================
    // SCROLL ANIMATIONS
    // ===================================
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all cards
    document.querySelectorAll('.feature-card, .module-card, .impact-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(card);
    });
    
    // ===================================
    // PARALLAX EFFECT
    // ===================================
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.gradient-orb');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // ===================================
    // CURSOR TRAIL EFFECT (Optional)
    // ===================================
    let cursorTrail = [];
    const trailLength = 10;
    
    document.addEventListener('mousemove', function(e) {
        cursorTrail.push({ x: e.clientX, y: e.clientY });
        
        if (cursorTrail.length > trailLength) {
            cursorTrail.shift();
        }
    });
    
    // ===================================
    // LOADING COMPLETE
    // ===================================
    console.log('✅ All homepage features initialized');
    console.log('📊 Available functions:', {
        startAssessment: typeof window.startAssessment,
        skipToModules: typeof window.skipToModules
    });
});

// ===================================
// PERFORMANCE MONITORING
// ===================================
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`⚡ Page loaded in ${Math.round(loadTime)}ms`);
});