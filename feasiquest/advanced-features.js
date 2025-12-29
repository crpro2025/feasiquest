// ===================================
// ADVANCED FEATURES FOR FEASIQUEST
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Advanced Features Loading...');
    
    // ===================================
    // 1. PROGRESS PERSISTENCE & RESUME
    // ===================================
    
    function checkExistingProgress() {
        const progress = localStorage.getItem('userProgress');
        const heroSection = document.querySelector('.hero-cta');
        
        if (progress && heroSection) {
            const progressData = JSON.parse(progress);
            
            // Create "Continue Learning" button
            const continueBtn = document.createElement('button');
            continueBtn.className = 'continue-btn';
            continueBtn.innerHTML = `
                <span class="btn-icon">▶️</span>
                <span class="btn-text">Continue Learning</span>
                <span class="btn-progress">${progressData.completedModules || 0}/9 modules</span>
            `;
            
            continueBtn.addEventListener('click', function() {
                if (typeof window.skipToModules === 'function') {
                    window.skipToModules();
                }
            });
            
            // Insert before first button
            heroSection.insertBefore(continueBtn, heroSection.firstChild);
            
            console.log('✅ Continue Learning button added');
        }
    }
    
    // Check for existing progress
    setTimeout(checkExistingProgress, 500);
    
    // ===================================
    // 2. KEYBOARD SHORTCUTS
    // ===================================
    
    const shortcuts = {
        's': { action: 'startAssessment', description: 'Start Assessment' },
        'm': { action: 'skipToModules', description: 'View Modules' },
        'h': { action: 'scrollToHome', description: 'Back to Home' },
        '?': { action: 'showShortcuts', description: 'Show Shortcuts' },
        'Escape': { action: 'closeOverlay', description: 'Close Overlay' }
    };
    
    document.addEventListener('keydown', function(e) {
        // Don't trigger if user is typing in an input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        const key = e.key.toLowerCase();
        
        if (key === 's' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            console.log('⌨️ Keyboard shortcut: Start Assessment');
            if (typeof window.startAssessment === 'function') {
                window.startAssessment();
            }
        }
        
        if (key === 'm' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            console.log('⌨️ Keyboard shortcut: View Modules');
            if (typeof window.skipToModules === 'function') {
                window.skipToModules();
            }
        }
        
        if (key === 'h' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            console.log('⌨️ Keyboard shortcut: Back to Home');
            scrollToHome();
        }
        
        if (key === '?' || (key === '/' && e.shiftKey)) {
            e.preventDefault();
            console.log('⌨️ Keyboard shortcut: Show Shortcuts');
            showShortcutsGuide();
        }
        
        if (e.key === 'Escape') {
            console.log('⌨️ Keyboard shortcut: Close Overlay');
            closeShortcutsGuide();
        }
    });
    
    function scrollToHome() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    function showShortcutsGuide() {
        // Check if guide already exists
        if (document.getElementById('shortcuts-guide')) {
            return;
        }
        
        const guide = document.createElement('div');
        guide.id = 'shortcuts-guide';
        guide.className = 'shortcuts-overlay';
        guide.innerHTML = `
            <div class="shortcuts-modal">
                <div class="shortcuts-header">
                    <h3>⌨️ Keyboard Shortcuts</h3>
                    <button class="close-shortcuts" onclick="closeShortcutsGuide()">✕</button>
                </div>
                <div class="shortcuts-list">
                    <div class="shortcut-item">
                        <kbd>S</kbd>
                        <span>Start Assessment</span>
                    </div>
                    <div class="shortcut-item">
                        <kbd>M</kbd>
                        <span>View Modules</span>
                    </div>
                    <div class="shortcut-item">
                        <kbd>H</kbd>
                        <span>Back to Home</span>
                    </div>
                    <div class="shortcut-item">
                        <kbd>?</kbd>
                        <span>Show This Guide</span>
                    </div>
                    <div class="shortcut-item">
                        <kbd>Esc</kbd>
                        <span>Close Overlay</span>
                    </div>
                </div>
                <div class="shortcuts-footer">
                    <p>💡 Tip: Use keyboard shortcuts for faster navigation!</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(guide);
        
        // Fade in
        setTimeout(() => {
            guide.classList.add('visible');
        }, 10);
    }
    
    window.closeShortcutsGuide = function() {
        const guide = document.getElementById('shortcuts-guide');
        if (guide) {
            guide.classList.remove('visible');
            setTimeout(() => {
                guide.remove();
            }, 300);
        }
    };
    
    // Show shortcuts hint on first visit
    const hasSeenShortcuts = localStorage.getItem('hasSeenShortcuts');
    if (!hasSeenShortcuts) {
        setTimeout(() => {
            showShortcutsHint();
            localStorage.setItem('hasSeenShortcuts', 'true');
        }, 3000);
    }
    
    function showShortcutsHint() {
        const hint = document.createElement('div');
        hint.className = 'shortcuts-hint';
        hint.innerHTML = `
            <div class="hint-content">
                <span class="hint-icon">💡</span>
                <span class="hint-text">Press <kbd>?</kbd> to see keyboard shortcuts</span>
                <button class="hint-close" onclick="this.parentElement.parentElement.remove()">✕</button>
            </div>
        `;
        
        document.body.appendChild(hint);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (hint.parentElement) {
                hint.classList.add('fade-out');
                setTimeout(() => hint.remove(), 300);
            }
        }, 5000);
    }
    
    // ===================================
    // 3. INTERACTIVE DEMO CALCULATOR
    // ===================================
    
    function createDemoCalculator() {
        const modulesSection = document.querySelector('.modules-section');
        if (!modulesSection) return;
        
        const demoSection = document.createElement('section');
        demoSection.className = 'demo-section';
        demoSection.innerHTML = `
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Try It Yourself</h2>
                    <p class="section-subtitle">Interactive Feasibility Calculator - No Login Required</p>
                </div>
                
                <div class="demo-calculator">
                    <div class="calculator-inputs">
                        <div class="calc-input-group">
                            <label>Target Enrollment</label>
                            <input type="number" id="targetEnrollment" value="100" min="1" max="10000">
                        </div>
                        <div class="calc-input-group">
                            <label>Available Sites</label>
                            <input type="number" id="availableSites" value="10" min="1" max="100">
                        </div>
                        <div class="calc-input-group">
                            <label>Enrollment Period (months)</label>
                            <input type="number" id="enrollmentPeriod" value="12" min="1" max="60">
                        </div>
                        <div class="calc-input-group">
                            <label>Screen Failure Rate (%)</label>
                            <input type="number" id="screenFailure" value="30" min="0" max="100">
                        </div>
                    </div>
                    
                    <div class="calculator-results">
                        <h3>Feasibility Analysis</h3>
                        <div class="result-item">
                            <span class="result-label">Patients per Site per Month:</span>
                            <span class="result-value" id="patientsPerSite">-</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">Total Screening Required:</span>
                            <span class="result-value" id="totalScreening">-</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">Feasibility Score:</span>
                            <span class="result-value" id="feasibilityScore">-</span>
                        </div>
                        <div class="result-recommendation" id="recommendation">
                            Calculate to see recommendation
                        </div>
                    </div>
                    
                    <button class="calc-button" onclick="calculateFeasibility()">
                        🧮 Calculate Feasibility
                    </button>
                </div>
                
                <div class="demo-cta">
                    <p>Want to learn more advanced feasibility techniques?</p>
                    <button class="demo-start-btn" onclick="window.startAssessment ? window.startAssessment() : null">
                        Start Full Training →
                    </button>
                </div>
            </div>
        `;
        
        // Insert before modules section
        modulesSection.parentNode.insertBefore(demoSection, modulesSection);
        
        console.log('✅ Interactive demo calculator added');
    }
    
    window.calculateFeasibility = function() {
        const target = parseInt(document.getElementById('targetEnrollment').value);
        const sites = parseInt(document.getElementById('availableSites').value);
        const months = parseInt(document.getElementById('enrollmentPeriod').value);
        const screenFailure = parseInt(document.getElementById('screenFailure').value);
        
        // Calculate metrics
        const patientsPerSite = (target / sites / months).toFixed(2);
        const totalScreening = Math.ceil(target / (1 - screenFailure / 100));
        
        // Calculate feasibility score (0-100)
        let score = 100;
        if (patientsPerSite > 2) score -= 30; // Too aggressive
        if (patientsPerSite < 0.5) score -= 20; // Too slow
        if (screenFailure > 50) score -= 25; // High failure rate
        if (sites < 5) score -= 15; // Too few sites
        
        score = Math.max(0, score);
        
        // Update results
        document.getElementById('patientsPerSite').textContent = patientsPerSite;
        document.getElementById('totalScreening').textContent = totalScreening;
        document.getElementById('feasibilityScore').textContent = score + '/100';
        
        // Recommendation
        const recommendation = document.getElementById('recommendation');
        if (score >= 80) {
            recommendation.innerHTML = '✅ <strong>Highly Feasible:</strong> This trial design looks very achievable!';
            recommendation.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        } else if (score >= 60) {
            recommendation.innerHTML = '⚠️ <strong>Moderately Feasible:</strong> Consider adjusting timeline or sites.';
            recommendation.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
        } else {
            recommendation.innerHTML = '❌ <strong>Challenging:</strong> Significant adjustments needed for success.';
            recommendation.style.background = 'linear-gradient(135deg, #dc2626, #991b1b)';
        }
        
        // Animate results
        document.querySelector('.calculator-results').classList.add('results-animate');
        setTimeout(() => {
            document.querySelector('.calculator-results').classList.remove('results-animate');
        }, 600);
    };
    
    // Add demo calculator after page loads
    setTimeout(createDemoCalculator, 1000);
    
    // ===================================
    // 4. TESTIMONIALS CAROUSEL
    // ===================================
    
    const testimonials = [
        {
            name: "Dr. Sarah Chen",
            role: "Clinical Research Director",
            company: "BioPharma Solutions",
            text: "FeasiQuest transformed how our team approaches feasibility. The AI-powered insights are game-changing!",
            rating: 5
        },
        {
            name: "Michael Rodriguez",
            role: "Study Manager",
            company: "Global CRO",
            text: "Best training platform I've used. The interactive scenarios prepared me for real-world challenges.",
            rating: 5
        },
        {
            name: "Dr. Emily Watson",
            role: "Site Coordinator",
            company: "University Medical Center",
            text: "The gamification kept me engaged. I completed all 9 modules in just 3 days!",
            rating: 5
        },
        {
            name: "James Liu",
            role: "Clinical Operations Manager",
            company: "Pharma Innovations",
            text: "ROI was immediate. Our feasibility assessments are now 40% more accurate.",
            rating: 5
        }
    ];
    
    function createTestimonialsSection() {
        const aiSection = document.querySelector('.ai-section');
        if (!aiSection) return;
        
        const testimonialsSection = document.createElement('section');
        testimonialsSection.className = 'testimonials-section';
        testimonialsSection.innerHTML = `
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Trusted by Professionals Worldwide</h2>
                    <p class="section-subtitle">See what clinical research experts are saying</p>
                </div>
                
                <div class="testimonials-carousel">
                    <button class="carousel-btn prev" onclick="previousTestimonial()">‹</button>
                    <div class="testimonials-track" id="testimonialsTrack">
                        ${testimonials.map((t, i) => `
                            <div class="testimonial-card ${i === 0 ? 'active' : ''}">
                                <div class="testimonial-rating">
                                    ${'⭐'.repeat(t.rating)}
                                </div>
                                <p class="testimonial-text">"${t.text}"</p>
                                <div class="testimonial-author">
                                    <div class="author-avatar">${t.name.charAt(0)}</div>
                                    <div class="author-info">
                                        <div class="author-name">${t.name}</div>
                                        <div class="author-role">${t.role}</div>
                                        <div class="author-company">${t.company}</div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <button class="carousel-btn next" onclick="nextTestimonial()">›</button>
                </div>
                
                <div class="carousel-dots" id="carouselDots">
                    ${testimonials.map((_, i) => `
                        <span class="dot ${i === 0 ? 'active' : ''}" onclick="goToTestimonial(${i})"></span>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Insert after AI section
        aiSection.parentNode.insertBefore(testimonialsSection, aiSection.nextSibling);
        
        console.log('✅ Testimonials carousel added');
    }
    
    let currentTestimonial = 0;
    
    window.nextTestimonial = function() {
        const cards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.carousel-dots .dot');
        
        cards[currentTestimonial].classList.remove('active');
        dots[currentTestimonial].classList.remove('active');
        
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        
        cards[currentTestimonial].classList.add('active');
        dots[currentTestimonial].classList.add('active');
    };
    
    window.previousTestimonial = function() {
        const cards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.carousel-dots .dot');
        
        cards[currentTestimonial].classList.remove('active');
        dots[currentTestimonial].classList.remove('active');
        
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        
        cards[currentTestimonial].classList.add('active');
        dots[currentTestimonial].classList.add('active');
    };
    
    window.goToTestimonial = function(index) {
        const cards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.carousel-dots .dot');
        
        cards[currentTestimonial].classList.remove('active');
        dots[currentTestimonial].classList.remove('active');
        
        currentTestimonial = index;
        
        cards[currentTestimonial].classList.add('active');
        dots[currentTestimonial].classList.add('active');
    };
    
    // Auto-rotate testimonials
    setInterval(() => {
        if (document.querySelector('.testimonials-carousel')) {
            nextTestimonial();
        }
    }, 5000);
    
    // Add testimonials section
    setTimeout(createTestimonialsSection, 1500);
    
    // ===================================
    // 5. QUICK STATS BAR
    // ===================================
    
    function createQuickStatsBar() {
        const statsBar = document.createElement('div');
        statsBar.className = 'quick-stats-bar';
        statsBar.innerHTML = `
            <div class="stats-bar-content">
                <div class="stat-item-small">
                    <span class="stat-icon">📚</span>
                    <span class="stat-text">9 Modules</span>
                </div>
                <div class="stat-item-small">
                    <span class="stat-icon">⏱️</span>
                    <span class="stat-text">3-4 Hours</span>
                </div>
                <div class="stat-item-small">
                    <span class="stat-icon">🏆</span>
                    <span class="stat-text">Certification</span>
                </div>
                <div class="stat-item-small">
                    <span class="stat-icon">⚡</span>
                    <span class="stat-text">Self-Paced</span>
                </div>
                <button class="stats-bar-cta" onclick="window.startAssessment ? window.startAssessment() : null">
                    Start Now →
                </button>
            </div>
        `;
        
        document.body.appendChild(statsBar);
        
        // Show/hide based on scroll
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 800 && currentScroll > lastScroll) {
                statsBar.classList.add('visible');
            } else if (currentScroll < lastScroll) {
                statsBar.classList.remove('visible');
            }
            
            lastScroll = currentScroll;
        });
        
        console.log('✅ Quick stats bar added');
    }
    
    // Add stats bar
    setTimeout(createQuickStatsBar, 2000);
    
    console.log('✅ All Advanced Features Loaded');
});