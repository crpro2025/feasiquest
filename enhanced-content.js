// ===================================
// ENHANCED CONTENT & FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Enhanced Content Loading...');
    
    // ===================================
    // 1. LEARNING PATH SELECTOR
    // ===================================
    
    function createLearningPathSection() {
        const featuresSection = document.querySelector('.features-section');
        if (!featuresSection) return;
        
        const pathSection = document.createElement('section');
        pathSection.className = 'learning-path-section';
        pathSection.innerHTML = `
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Choose Your Learning Path</h2>
                    <p class="section-subtitle">Personalized training based on your role and experience</p>
                </div>
                
                <div class="learning-paths-grid">
                    <div class="path-card" data-path="beginner">
                        <div class="path-icon">🌱</div>
                        <h3 class="path-title">Beginner Path</h3>
                        <p class="path-description">New to clinical research? Start here with foundational concepts.</p>
                        <div class="path-details">
                            <div class="path-stat">
                                <span class="stat-icon">📚</span>
                                <span>All 9 modules</span>
                            </div>
                            <div class="path-stat">
                                <span class="stat-icon">⏱️</span>
                                <span>4 hours</span>
                            </div>
                            <div class="path-stat">
                                <span class="stat-icon">🎯</span>
                                <span>Beginner level</span>
                            </div>
                        </div>
                        <button class="path-button" onclick="selectLearningPath('beginner')">
                            Start Beginner Path →
                        </button>
                    </div>
                    
                    <div class="path-card featured" data-path="intermediate">
                        <div class="path-badge">MOST POPULAR</div>
                        <div class="path-icon">🚀</div>
                        <h3 class="path-title">Intermediate Path</h3>
                        <p class="path-description">Have some experience? Focus on advanced techniques and real-world scenarios.</p>
                        <div class="path-details">
                            <div class="path-stat">
                                <span class="stat-icon">📚</span>
                                <span>6 core modules</span>
                            </div>
                            <div class="path-stat">
                                <span class="stat-icon">⏱️</span>
                                <span>3 hours</span>
                            </div>
                            <div class="path-stat">
                                <span class="stat-icon">🎯</span>
                                <span>Intermediate level</span>
                            </div>
                        </div>
                        <button class="path-button" onclick="selectLearningPath('intermediate')">
                            Start Intermediate Path →
                        </button>
                    </div>
                    
                    <div class="path-card" data-path="advanced">
                        <div class="path-icon">⚡</div>
                        <h3 class="path-title">Advanced Path</h3>
                        <p class="path-description">Expert looking to master complex scenarios? This is for you.</p>
                        <div class="path-details">
                            <div class="path-stat">
                                <span class="stat-icon">📚</span>
                                <span>4 advanced modules</span>
                            </div>
                            <div class="path-stat">
                                <span class="stat-icon">⏱️</span>
                                <span>2 hours</span>
                            </div>
                            <div class="path-stat">
                                <span class="stat-icon">🎯</span>
                                <span>Advanced level</span>
                            </div>
                        </div>
                        <button class="path-button" onclick="selectLearningPath('advanced')">
                            Start Advanced Path →
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        featuresSection.parentNode.insertBefore(pathSection, featuresSection);
        console.log('✅ Learning path selector added');
    }
    
    window.selectLearningPath = function(path) {
        console.log('📚 Learning path selected:', path);
        localStorage.setItem('learningPath', path);
        
        // Show confirmation
        showNotification(`${path.charAt(0).toUpperCase() + path.slice(1)} path selected! Starting assessment...`, 'success');
        
        setTimeout(() => {
            if (typeof window.startAssessment === 'function') {
                window.startAssessment();
            }
        }, 1500);
    };
    
    // ===================================
    // 2. NOTIFICATION SYSTEM
    // ===================================
    
    window.showNotification = function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
                <span class="notification-message">${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    };
    
    // ===================================
    // 3. PROGRESS TRACKER WIDGET
    // ===================================
    
    function createProgressWidget() {
        const widget = document.createElement('div');
        widget.className = 'progress-widget';
        widget.innerHTML = `
            <div class="widget-header">
                <span class="widget-title">Your Progress</span>
                <button class="widget-toggle" onclick="toggleProgressWidget()">−</button>
            </div>
            <div class="widget-content">
                <div class="progress-circle">
                    <svg width="80" height="80">
                        <circle cx="40" cy="40" r="35" stroke="#1e293b" stroke-width="8" fill="none"/>
                        <circle cx="40" cy="40" r="35" stroke="#dc2626" stroke-width="8" fill="none" 
                                stroke-dasharray="220" stroke-dashoffset="220" id="progressCircle"/>
                    </svg>
                    <div class="progress-text" id="progressPercent">0%</div>
                </div>
                <div class="progress-stats">
                    <div class="progress-stat-item">
                        <span class="stat-label">Modules</span>
                        <span class="stat-value" id="modulesCompleted">0/9</span>
                    </div>
                    <div class="progress-stat-item">
                        <span class="stat-label">XP</span>
                        <span class="stat-value" id="xpEarned">0</span>
                    </div>
                    <div class="progress-stat-item">
                        <span class="stat-label">Level</span>
                        <span class="stat-value" id="currentLevel">Novice</span>
                    </div>
                </div>
                <button class="widget-cta" onclick="window.skipToModules ? window.skipToModules() : null">
                    Continue Learning →
                </button>
            </div>
        `;
        
        document.body.appendChild(widget);
        
        // Update progress from localStorage
        updateProgressWidget();
        
        console.log('✅ Progress widget added');
    }
    
    function updateProgressWidget() {
        const progress = localStorage.getItem('userProgress');
        if (progress) {
            const data = JSON.parse(progress);
            const percent = Math.round((data.completedModules || 0) / 9 * 100);
            
            document.getElementById('progressPercent').textContent = percent + '%';
            document.getElementById('modulesCompleted').textContent = `${data.completedModules || 0}/9`;
            document.getElementById('xpEarned').textContent = data.xp || 0;
            document.getElementById('currentLevel').textContent = data.level || 'Novice';
            
            // Animate circle
            const circle = document.getElementById('progressCircle');
            const offset = 220 - (220 * percent / 100);
            circle.style.strokeDashoffset = offset;
        }
    }
    
    window.toggleProgressWidget = function() {
        const widget = document.querySelector('.progress-widget');
        widget.classList.toggle('collapsed');
        
        const toggle = widget.querySelector('.widget-toggle');
        toggle.textContent = widget.classList.contains('collapsed') ? '+' : '−';
    };
    
    // Show widget after 5 seconds
    setTimeout(createProgressWidget, 5000);
    
    // ===================================
    // 4. FAQ SECTION
    // ===================================
    
    function createFAQSection() {
        const finalCTA = document.querySelector('.final-cta-section');
        if (!finalCTA) return;
        
        const faqSection = document.createElement('section');
        faqSection.className = 'faq-section';
        faqSection.innerHTML = `
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Frequently Asked Questions</h2>
                    <p class="section-subtitle">Everything you need to know about FeasiQuest</p>
                </div>
                
                <div class="faq-grid">
                    <div class="faq-item">
                        <div class="faq-question" onclick="toggleFAQ(this)">
                            <span>How long does it take to complete the training?</span>
                            <span class="faq-icon">+</span>
                        </div>
                        <div class="faq-answer">
                            The complete training takes 3-4 hours to finish all 9 modules. However, it's 100% self-paced, 
                            so you can take as long as you need. Most users complete it over 2-3 sessions.
                        </div>
                    </div>
                    
                    <div class="faq-item">
                        <div class="faq-question" onclick="toggleFAQ(this)">
                            <span>Do I get a certificate upon completion?</span>
                            <span class="faq-icon">+</span>
                        </div>
                        <div class="faq-answer">
                            Yes! Upon completing all 9 modules and passing the final assessment, you'll receive the 
                            FeasiQuest Master certification, a digital badge for LinkedIn, and continuing education credits (pending).
                        </div>
                    </div>
                    
                    <div class="faq-item">
                        <div class="faq-question" onclick="toggleFAQ(this)">
                            <span>Can I access the training on mobile devices?</span>
                            <span class="faq-icon">+</span>
                        </div>
                        <div class="faq-answer">
                            Absolutely! FeasiQuest is fully responsive and works perfectly on smartphones, tablets, and desktops. 
                            You can even continue where you left off across different devices.
                        </div>
                    </div>
                    
                    <div class="faq-item">
                        <div class="faq-question" onclick="toggleFAQ(this)">
                            <span>What if I need help during the training?</span>
                            <span class="faq-icon">+</span>
                        </div>
                        <div class="faq-answer">
                            Our AI-powered assistant is available 24/7 to answer questions, provide explanations, and offer 
                            personalized guidance. Just click the AI Help button at any time.
                        </div>
                    </div>
                    
                    <div class="faq-item">
                        <div class="faq-question" onclick="toggleFAQ(this)">
                            <span>Is there a time limit to complete the training?</span>
                            <span class="faq-icon">+</span>
                        </div>
                        <div class="faq-answer">
                            No time limit! You have lifetime access to all content. Take breaks whenever you need, and your 
                            progress is automatically saved so you can resume anytime.
                        </div>
                    </div>
                    
                    <div class="faq-item">
                        <div class="faq-question" onclick="toggleFAQ(this)">
                            <span>What makes FeasiQuest different from other training?</span>
                            <span class="faq-icon">+</span>
                        </div>
                        <div class="faq-answer">
                            FeasiQuest combines interactive scenarios, AI-powered personalization, gamification, and real-world 
                            case studies. It's not just watching videos – it's hands-on learning with immediate feedback and 
                            practical application.
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        finalCTA.parentNode.insertBefore(faqSection, finalCTA);
        console.log('✅ FAQ section added');
    }
    
    window.toggleFAQ = function(element) {
        const faqItem = element.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        const icon = element.querySelector('.faq-icon');
        
        // Close all other FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
                item.querySelector('.faq-icon').textContent = '+';
            }
        });
        
        // Toggle current FAQ
        faqItem.classList.toggle('active');
        icon.textContent = faqItem.classList.contains('active') ? '−' : '+';
    };
    
    // ===================================
    // 5. TRUST BADGES SECTION
    // ===================================
    
    function createTrustBadges() {
        const impactSection = document.querySelector('.impact-section');
        if (!impactSection) return;
        
        const trustSection = document.createElement('section');
        trustSection.className = 'trust-section';
        trustSection.innerHTML = `
            <div class="container">
                <div class="trust-content">
                    <h3 class="trust-title">Trusted by Leading Organizations</h3>
                    <div class="trust-badges">
                        <div class="trust-badge">
                            <div class="badge-icon">🏥</div>
                            <div class="badge-text">500+ Healthcare Organizations</div>
                        </div>
                        <div class="trust-badge">
                            <div class="badge-icon">🔬</div>
                            <div class="badge-text">FDA Compliant Training</div>
                        </div>
                        <div class="trust-badge">
                            <div class="badge-icon">🎓</div>
                            <div class="badge-text">ICH GCP Aligned</div>
                        </div>
                        <div class="trust-badge">
                            <div class="badge-icon">🌍</div>
                            <div class="badge-text">Global Standards</div>
                        </div>
                        <div class="trust-badge">
                            <div class="badge-icon">🔒</div>
                            <div class="badge-text">HIPAA Compliant</div>
                        </div>
                        <div class="trust-badge">
                            <div class="badge-icon">⭐</div>
                            <div class="badge-text">4.9/5 Average Rating</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        impactSection.parentNode.insertBefore(trustSection, impactSection.nextSibling);
        console.log('✅ Trust badges added');
    }
    
    // ===================================
    // 6. LIVE CHAT WIDGET
    // ===================================
    
    function createLiveChatWidget() {
        const chatWidget = document.createElement('div');
        chatWidget.className = 'live-chat-widget';
        chatWidget.innerHTML = `
            <button class="chat-bubble" onclick="toggleLiveChat()">
                <span class="chat-icon">💬</span>
                <span class="chat-badge">1</span>
            </button>
            <div class="chat-window" id="chatWindow">
                <div class="chat-header">
                    <div class="chat-header-info">
                        <span class="chat-title">Need Help?</span>
                        <span class="chat-status">🟢 Online</span>
                    </div>
                    <button class="chat-close" onclick="toggleLiveChat()">✕</button>
                </div>
                <div class="chat-messages">
                    <div class="chat-message bot">
                        <div class="message-avatar">🤖</div>
                        <div class="message-content">
                            <p>Hi! I'm your FeasiQuest assistant. How can I help you today?</p>
                            <div class="quick-replies">
                                <button onclick="sendQuickReply('How do I start?')">How do I start?</button>
                                <button onclick="sendQuickReply('What will I learn?')">What will I learn?</button>
                                <button onclick="sendQuickReply('How long does it take?')">How long?</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="chat-input">
                    <input type="text" placeholder="Type your message..." id="chatInput" 
                           onkeypress="if(event.key==='Enter') sendChatMessage()">
                    <button onclick="sendChatMessage()">Send</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(chatWidget);
        console.log('✅ Live chat widget added');
    }
    
    window.toggleLiveChat = function() {
        const chatWindow = document.getElementById('chatWindow');
        const chatBubble = document.querySelector('.chat-bubble');
        
        chatWindow.classList.toggle('open');
        chatBubble.classList.toggle('hidden');
        
        // Remove badge when opened
        if (chatWindow.classList.contains('open')) {
            document.querySelector('.chat-badge').style.display = 'none';
        }
    };
    
    window.sendQuickReply = function(message) {
        sendChatMessage(message);
    };
    
    window.sendChatMessage = function(quickMessage) {
        const input = document.getElementById('chatInput');
        const message = quickMessage || input.value.trim();
        
        if (!message) return;
        
        const messagesContainer = document.querySelector('.chat-messages');
        
        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-message user';
        userMsg.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
            <div class="message-avatar">👤</div>
        `;
        messagesContainer.appendChild(userMsg);
        
        // Clear input
        input.value = '';
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Simulate bot response
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'chat-message bot';
            
            let response = '';
            if (message.toLowerCase().includes('start')) {
                response = 'Great! Click the "Start Learning Now" button at the top, or press the S key on your keyboard for quick access!';
            } else if (message.toLowerCase().includes('learn')) {
                response = 'You\'ll master all aspects of clinical trial feasibility assessment through 9 interactive modules, including patient recruitment, site selection, budgeting, and risk management!';
            } else if (message.toLowerCase().includes('long')) {
                response = 'The complete training takes 3-4 hours, but it\'s 100% self-paced. You can take breaks anytime and your progress is automatically saved!';
            } else {
                response = 'I\'d be happy to help! For detailed assistance, you can also use our AI assistant (🤖 button) or press ? to see keyboard shortcuts.';
            }
            
            botMsg.innerHTML = `
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <p>${response}</p>
                </div>
            `;
            messagesContainer.appendChild(botMsg);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1000);
    };
    
    // ===================================
    // 7. SCROLL PROGRESS INDICATOR
    // ===================================
    
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            document.querySelector('.scroll-progress-bar').style.width = scrolled + '%';
        });
        
        console.log('✅ Scroll progress indicator added');
    }
    
    // ===================================
    // INITIALIZE ALL FEATURES
    // ===================================
    
    setTimeout(createLearningPathSection, 1000);
    setTimeout(createTrustBadges, 1500);
    setTimeout(createFAQSection, 2000);
    setTimeout(createLiveChatWidget, 2500);
    setTimeout(createScrollProgress, 500);
    
    console.log('✅ All Enhanced Content Loaded');
});