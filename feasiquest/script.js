// Global State Management
const appState = {
    userProfile: {
        role: null,
        experience: null,
        objective: null,
        xp: 0,
        level: 'Novice',
        completedModules: [],
        badges: []
    },
    currentModule: null,
    moduleProgress: {}
};

// Level thresholds
const levelThresholds = {
    'Novice': 0,
    'Analyst': 500,
    'Expert': 1500,
    'Feasibility Master': 3000
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing FeasiQuest');
    
    loadUserProgress();
    updateProgressDisplay();
    
    // BULLETPROOF BUTTON HANDLERS - Multiple approaches for maximum reliability
    
    // Approach 1: Direct event listeners
    const startAssessmentBtn = document.getElementById('startAssessmentBtn');
    const skipToModulesBtn = document.getElementById('skipToModulesBtn');
    const beginJourneyBtn = document.getElementById('beginJourneyBtn');
    
    if (startAssessmentBtn) {
        console.log('Start Assessment button found');
        startAssessmentBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Start Assessment clicked via event listener');
            startAssessment();
        });
    }
    
    if (skipToModulesBtn) {
        console.log('Skip to Modules button found');
        skipToModulesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Skip to Modules clicked via event listener');
            skipToModules();
        });
    }
    
    if (beginJourneyBtn) {
        console.log('Begin Journey button found');
        beginJourneyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Begin Journey clicked via event listener');
            startAssessment();
        });
    }
    
    // Approach 2: Delegate click events on document for extra safety
    document.addEventListener('click', function(e) {
        if (e.target.id === 'startAssessmentBtn' || e.target.closest('#startAssessmentBtn')) {
            e.preventDefault();
            console.log('Start Assessment clicked via delegation');
            startAssessment();
        }
        if (e.target.id === 'skipToModulesBtn' || e.target.closest('#skipToModulesBtn')) {
            e.preventDefault();
            console.log('Skip to Modules clicked via delegation');
            skipToModules();
        }
    });
    
    // Check if we should start a specific module
    const startModuleId = localStorage.getItem('startModule');
    if (startModuleId) {
        localStorage.removeItem('startModule');
        // Skip to modules view first
        skipToModules();
        // Then start the specific module
        setTimeout(() => {
            startModule(parseInt(startModuleId));
        }, 100);
    }
    
    console.log('FeasiQuest initialization complete');
});

// Start Assessment - BULLETPROOF VERSION
window.startAssessment = function() {
    console.log('=== START ASSESSMENT FUNCTION CALLED ===');
    
    const assessmentSection = document.getElementById('assessment');
    const pageWrapper = document.querySelector('.page-wrapper');
    
    if (!assessmentSection) {
        console.error('ERROR: Assessment section not found!');
        alert('Error: Assessment section not found. Please refresh the page.');
        return;
    }
    
    try {
        // Add app-mode class to page wrapper
        if (pageWrapper) {
            pageWrapper.classList.add('app-mode');
        }
        
        // Hide all homepage sections
        const homepageSections = [
            'welcome',
            'features',
            'modules',
            'ai'
        ];
        
        homepageSections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.style.display = 'none';
                section.classList.add('hidden');
                console.log('Hidden section: ' + sectionId);
            }
        });
        
        // Hide sections by class
        const sectionsByClass = document.querySelectorAll('.impact-section, .final-cta-section');
        sectionsByClass.forEach(section => {
            section.style.display = 'none';
            section.classList.add('hidden');
        });
        
        // Hide navbar
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.display = 'none';
        }
        
        // Hide animated background
        const animatedBg = document.querySelector('.animated-background');
        if (animatedBg) {
            animatedBg.style.display = 'none';
        }
        
        // Hide all widgets
        const widgets = document.querySelectorAll('.progress-widget, .quick-stats-bar, .live-chat-widget, .scroll-progress');
        widgets.forEach(widget => {
            widget.style.display = 'none';
        });
        
        // Show assessment section
        assessmentSection.style.display = 'block';
        assessmentSection.classList.remove('hidden');
        assessmentSection.classList.add('fade-in');
        console.log('Assessment section shown');
        
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        console.log('=== ASSESSMENT STARTED SUCCESSFULLY ===');
    } catch (error) {
        console.error('ERROR in startAssessment:', error);
        alert('An error occurred. Please refresh the page and try again.');
    }
}

// Skip directly to modules (for quick access) - BULLETPROOF VERSION
window.skipToModules = function() {
    console.log('=== SKIP TO MODULES FUNCTION CALLED ===');
    
    try {
        // Add app-mode class to page wrapper
        const pageWrapper = document.querySelector('.page-wrapper');
        if (pageWrapper) {
            pageWrapper.classList.add('app-mode');
        }
        
        // Set default profile if skipping assessment
        if (!appState.userProfile.role) {
            appState.userProfile.role = 'pm';
            appState.userProfile.experience = 'intermediate';
            appState.userProfile.objective = 'assessment';
        }
        
        // Hide all homepage sections
        const homepageSections = ['welcome', 'features', 'modules', 'ai'];
        homepageSections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.style.display = 'none';
                section.classList.add('hidden');
            }
        });
        
        // Hide sections by class
        const sectionsByClass = document.querySelectorAll('.impact-section, .final-cta-section');
        sectionsByClass.forEach(section => {
            section.style.display = 'none';
            section.classList.add('hidden');
        });
        
        // Hide navbar and background
        const navbar = document.querySelector('.navbar');
        if (navbar) navbar.style.display = 'none';
        
        const animatedBg = document.querySelector('.animated-background');
        if (animatedBg) animatedBg.style.display = 'none';
        
        // Hide all widgets
        const widgets = document.querySelectorAll('.progress-widget, .quick-stats-bar, .live-chat-widget, .scroll-progress');
        widgets.forEach(widget => { widget.style.display = 'none'; });
        
        // Hide assessment if visible
        const assessmentSection = document.getElementById('assessment');
        if (assessmentSection) {
            assessmentSection.style.display = 'none';
            assessmentSection.classList.add('hidden');
        }
        
        // Show dashboard
        const dashboardSection = document.getElementById('dashboard');
        if (dashboardSection) {
            dashboardSection.style.display = 'block';
            dashboardSection.classList.remove('hidden');
            dashboardSection.classList.add('fade-in');
        }
        
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        saveUserProgress();
        console.log('=== MODULES DASHBOARD SHOWN SUCCESSFULLY ===');
    } catch (error) {
        console.error('ERROR in skipToModules:', error);
        alert('An error occurred. Please refresh the page and try again.');
    }
}

// Submit Assessment
function submitAssessment() {
    const role = document.querySelector('input[name="role"]:checked');
    const experience = document.querySelector('input[name="experience"]:checked');
    const objective = document.querySelector('input[name="objective"]:checked');

    if (!role || !experience || !objective) {
        alert('Please complete all questions before continuing.');
        return;
    }

    appState.userProfile.role = role.value;
    appState.userProfile.experience = experience.value;
    appState.userProfile.objective = objective.value;

    saveUserProgress();

    // Hide assessment
    const assessmentSection = document.getElementById('assessment');
    assessmentSection.style.display = 'none';
    assessmentSection.classList.add('hidden');
    
    // Show dashboard
    const dashboardSection = document.getElementById('dashboard');
    dashboardSection.style.display = 'block';
    dashboardSection.classList.remove('hidden');
    dashboardSection.classList.add('fade-in');
    
    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    console.log('Assessment completed, dashboard shown');
}

// Start Module
function startModule(moduleNumber) {
    const moduleCard = event.currentTarget;
    if (moduleCard && moduleCard.classList.contains('locked')) {
        alert('Complete previous modules to unlock this one.');
        return;
    }

    appState.currentModule = moduleNumber;
    
    // Hide dashboard
    const dashboardSection = document.getElementById('dashboard');
    dashboardSection.style.display = 'none';
    dashboardSection.classList.add('hidden');
    
    // Show module content
    const moduleContent = document.getElementById('moduleContent');
    moduleContent.style.display = 'block';
    moduleContent.classList.remove('hidden');
    moduleContent.classList.add('fade-in');
    
    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    loadModuleContent(moduleNumber);
    
    console.log('Module ' + moduleNumber + ' started');
}
// Load Module Content
function loadModuleContent(moduleNumber) {
    const contentArea = document.getElementById('moduleContent');
    
    switch(moduleNumber) {
        case 1:
            loadModule1Content(contentArea);
            break;
        case 2:
            loadModule2Content(contentArea);
            break;
        case 3:
            loadModule3Content(contentArea);
            break;
        case 4:
            loadModule4Content(contentArea);
            break;
        case 5:
            loadModule5Content(contentArea);
            break;
        default:
            contentArea.innerHTML = '<h2>Module content coming soon...</h2>';
    }
}

// Module 1: Feasibility Foundations
function loadModule1Content(container) {
    const isNovice = appState.userProfile.experience === 'novice';
    
    container.innerHTML = `
        <div class="module-header-section">
            <button class="btn btn-secondary" onclick="returnToDashboard()">← Back to Dashboard</button>
            <h1>Module 1: Feasibility Foundations</h1>
            <p class="module-subtitle">Understanding why feasibility matters and the cost of getting it wrong</p>
        </div>

        <div class="step-indicator">
            <div class="step active">
                <div class="step-circle">1</div>
                <div class="step-label">Introduction</div>
            </div>
            <div class="step">
                <div class="step-circle">2</div>
                <div class="step-label">Case Studies</div>
            </div>
            <div class="step">
                <div class="step-circle">3</div>
                <div class="step-label">Practice</div>
            </div>
            <div class="step">
                <div class="step-circle">4</div>
                <div class="step-label">Assessment</div>
            </div>
        </div>

        <div id="module1-content">
            ${getModule1IntroContent(isNovice)}
        </div>
    `;
}

function getModule1IntroContent(isNovice) {
    return `
        <div class="scenario-container">
            <h2 class="scenario-title">💡 The $2.6 Billion Question</h2>
            <div class="scenario-content">
                <p style="font-size: 1.2rem; margin-bottom: 20px;">
                    It costs an average of <strong>$2.6 billion</strong> to bring a new drug to market. 
                    Yet <strong>68% of clinical trials fail to meet their enrollment targets</strong>, 
                    leading to delays, budget overruns, and sometimes complete trial failure.
                </p>
                <p style="font-size: 1.1rem;">
                    What if we could predict and prevent these failures before they happen? 
                    That's the power of proper feasibility assessment.
                </p>
            </div>
        </div>

        <div class="interactive-card">
            <h3>🎯 What is Feasibility Assessment?</h3>
            <p style="margin: 20px 0;">
                Feasibility assessment is the systematic evaluation of whether a clinical trial can be 
                successfully executed as designed. It examines multiple dimensions:
            </p>
            
            <div class="feasibility-dimensions">
                <div class="dimension-card">
                    <div class="dimension-icon">👥</div>
                    <h4>Patient Population</h4>
                    <p>Can we find and enroll enough eligible patients?</p>
                </div>
                <div class="dimension-card">
                    <div class="dimension-icon">🏥</div>
                    <h4>Site Capability</h4>
                    <p>Do sites have the resources and expertise needed?</p>
                </div>
                <div class="dimension-card">
                    <div class="dimension-icon">📋</div>
                    <h4>Regulatory</h4>
                    <p>Can we navigate regulatory requirements successfully?</p>
                </div>
                <div class="dimension-card">
                    <div class="dimension-icon">💰</div>
                    <h4>Budget & Resources</h4>
                    <p>Is the trial financially viable?</p>
                </div>
                <div class="dimension-card">
                    <div class="dimension-icon">⚡</div>
                    <h4>Timeline</h4>
                    <p>Can we complete the trial within required timeframes?</p>
                </div>
                <div class="dimension-card">
                    <div class="dimension-icon">🔬</div>
                    <h4>Technology</h4>
                    <p>Do we have the right infrastructure and systems?</p>
                </div>
            </div>
        </div>

        <div class="interactive-card" style="margin-top: 30px;">
            <h3>📊 The Cost of Poor Feasibility</h3>
            <p style="margin: 20px 0;">
                Let's explore real-world examples of what happens when feasibility is overlooked:
            </p>
            
            <div class="case-study-selector">
                <button class="case-study-btn" onclick="showCaseStudy(1)">
                    Case Study 1: The Alzheimer's Mega-Trial
                </button>
                <button class="case-study-btn" onclick="showCaseStudy(2)">
                    Case Study 2: The Rare Disease Rush
                </button>
                <button class="case-study-btn" onclick="showCaseStudy(3)">
                    Case Study 3: The Perfect Protocol Problem
                </button>
            </div>

            <div id="case-study-content" style="margin-top: 30px;">
                <p style="text-align: center; color: #6b7280; font-style: italic;">
                    Select a case study above to begin
                </p>
            </div>
        </div>

        <div class="nav-buttons">
            <button class="btn btn-secondary" onclick="returnToDashboard()">Save & Exit</button>
            <button class="btn btn-primary" onclick="continueToStep2()">Continue to Case Studies →</button>
        </div>

        <style>
        .module-header-section {
            margin-bottom: 40px;
        }

        .module-header-section h1 {
            font-size: 2.5rem;
            color: var(--text-primary);
            margin: 20px 0 10px;
        }

        .module-subtitle {
            font-size: 1.2rem;
            color: var(--text-secondary);
        }

        .feasibility-dimensions {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }

        .dimension-card {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border: 2px solid #bfdbfe;
            border-radius: 12px;
            padding: 25px;
            text-align: center;
            transition: all 0.3s ease;
        }

        .dimension-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            border-color: var(--primary-color);
        }

        .dimension-icon {
            font-size: 3rem;
            margin-bottom: 15px;
        }

        .dimension-card h4 {
            color: var(--primary-color);
            font-size: 1.2rem;
            margin-bottom: 10px;
        }

        .dimension-card p {
            color: var(--text-secondary);
            font-size: 0.95rem;
            line-height: 1.5;
        }

        .case-study-selector {
            display: grid;
            gap: 15px;
        }

        .case-study-btn {
            background: white;
            border: 2px solid var(--border-color);
            border-radius: 10px;
            padding: 20px;
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--text-primary);
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: left;
        }

        .case-study-btn:hover {
            border-color: var(--primary-color);
            background: var(--bg-light);
            transform: translateX(10px);
        }

        .case-study-btn:active {
            transform: translateX(5px);
        }
        </style>
    `;
}

// Case Study Display
function showCaseStudy(caseNumber) {
    const contentDiv = document.getElementById('case-study-content');
    
    const caseStudies = {
        1: {
            title: "The Alzheimer's Mega-Trial: A $200M Lesson",
            problem: "A large pharmaceutical company launched an ambitious Phase III Alzheimer's trial across 150 sites globally. The protocol was scientifically sound, the drug showed promise, but they overlooked critical feasibility factors.",
            issues: [
                "Site readiness was overestimated - only 40% of sites were actually ready at study start",
                "Specialized imaging requirements exceeded most sites' capabilities",
                "Caregiver burden was underestimated, leading to high dropout rates",
                "Competing trials launched simultaneously, fragmenting the patient pool"
            ],
            impact: "18-month delay, $200M budget overrun, and ultimately the trial was restructured",
            lesson: "Even with unlimited resources, poor feasibility assessment leads to failure. Site capability and competitive landscape must be thoroughly evaluated."
        },
        2: {
            title: "The Rare Disease Rush: When Numbers Don't Add Up",
            problem: "A biotech company developed a promising therapy for an ultra-rare genetic disorder. Excited by the science, they rushed into a Phase II trial without proper patient population analysis.",
            issues: [
                "Overestimated patient population by 300% based on outdated epidemiological data",
                "Failed to account for 3 competing trials recruiting from the same small patient pool",
                "Didn't consider that 60% of eligible patients were already enrolled in other studies",
                "Geographic distribution of patients made site selection nearly impossible"
            ],
            impact: "Trial enrollment took 4 years instead of planned 18 months. Company nearly went bankrupt waiting for enrollment.",
            lesson: "In rare diseases, every patient counts. Thorough epidemiological analysis and competitive intelligence are non-negotiable."
        },
        3: {
            title: "The Perfect Protocol Problem: When Science Meets Reality",
            problem: "A cardiovascular outcomes trial was designed with rigorous inclusion/exclusion criteria to ensure a homogeneous patient population and clean data. The protocol was scientifically perfect but practically impossible.",
            issues: [
                "Inclusion criteria so restrictive that only 12% of screened patients qualified",
                "Required 15 study visits over 2 years - patient burden was unsustainable",
                "Mandated procedures not covered by insurance, creating financial barriers",
                "Protocol amendments required after 6 months, resetting regulatory timelines"
            ],
            impact: "Enrollment rate was 1/10th of projection. Trial was ultimately terminated after 2 years with insufficient data.",
            lesson: "Scientific rigor must be balanced with practical feasibility. The perfect protocol that can't enroll patients is worthless."
        }
    };

    const study = caseStudies[caseNumber];
    
    contentDiv.innerHTML = `
        <div class="case-study-detail fade-in">
            <h3 style="color: var(--primary-color); margin-bottom: 20px;">${study.title}</h3>
            
            <div class="case-section">
                <h4>📋 The Situation</h4>
                <p>${study.problem}</p>
            </div>

            <div class="case-section">
                <h4>⚠️ What Went Wrong</h4>
                <ul>
                    ${study.issues.map(issue => `<li>${issue}</li>`).join('')}
                </ul>
            </div>

            <div class="case-section">
                <h4>💥 The Impact</h4>
                <p style="color: var(--danger-color); font-weight: 600;">${study.impact}</p>
            </div>

            <div class="case-section" style="background: #d1fae5; padding: 20px; border-radius: 10px; border-left: 5px solid var(--secondary-color);">
                <h4>✅ Key Lesson</h4>
                <p style="color: #065f46; font-weight: 500;">${study.lesson}</p>
            </div>

            <div class="reflection-box">
                <h4>🤔 Reflection Question</h4>
                <p>If you were the feasibility lead on this trial, what would you have done differently?</p>
                <textarea class="reflection-input" placeholder="Type your thoughts here..." rows="4"></textarea>
                <button class="btn btn-primary" onclick="saveReflection(${caseNumber})">Save Reflection</button>
            </div>
        </div>

        <style>
        .case-study-detail {
            background: white;
            border: 2px solid var(--border-color);
            border-radius: 15px;
            padding: 30px;
        }

        .case-section {
            margin: 25px 0;
        }

        .case-section h4 {
            font-size: 1.2rem;
            margin-bottom: 15px;
            color: var(--text-primary);
        }

        .case-section ul {
            list-style: none;
            padding-left: 0;
        }

        .case-section li {
            padding: 10px 0 10px 30px;
            position: relative;
            line-height: 1.6;
        }

        .case-section li::before {
            content: "→";
            position: absolute;
            left: 0;
            color: var(--primary-color);
            font-weight: bold;
        }

        .reflection-box {
            margin-top: 30px;
            background: var(--bg-light);
            padding: 25px;
            border-radius: 10px;
        }

        .reflection-input {
            width: 100%;
            padding: 15px;
            border: 2px solid var(--border-color);
            border-radius: 8px;
            font-family: inherit;
            font-size: 1rem;
            margin: 15px 0;
            resize: vertical;
        }

        .reflection-input:focus {
            outline: none;
            border-color: var(--primary-color);
        }
        </style>
    `;
}

function saveReflection(caseNumber) {
    const reflection = document.querySelector('.reflection-input').value;
    if (reflection.trim()) {
        showFeedback('Reflection saved! Great thinking.', 'success');
        awardXP(25);
    } else {
        alert('Please write your reflection before saving.');
    }
}

// Continue to Step 2
function continueToStep2() {
    const contentDiv = document.getElementById('module1-content');
    updateStepIndicator(2);
    
    contentDiv.innerHTML = `
        <div class="interactive-card">
            <h2>🎓 Deep Dive: Feasibility Assessment Framework</h2>
            <p style="margin: 20px 0; font-size: 1.1rem;">
                Now that you understand why feasibility matters, let's explore the systematic approach 
                to conducting feasibility assessments.
            </p>

            <div class="framework-section">
                <h3>The Five Pillars of Feasibility</h3>
                <div class="pillars-grid">
                    <div class="pillar-card" onclick="explorePillar(1)">
                        <div class="pillar-number">1</div>
                        <h4>Scientific Feasibility</h4>
                        <p>Is the science sound? Are endpoints achievable?</p>
                        <button class="explore-btn">Explore →</button>
                    </div>
                    <div class="pillar-card" onclick="explorePillar(2)">
                        <div class="pillar-number">2</div>
                        <h4>Operational Feasibility</h4>
                        <p>Can we execute this operationally?</p>
                        <button class="explore-btn">Explore →</button>
                    </div>
                    <div class="pillar-card" onclick="explorePillar(3)">
                        <div class="pillar-number">3</div>
                        <h4>Financial Feasibility</h4>
                        <p>Is this financially viable?</p>
                        <button class="explore-btn">Explore →</button>
                    </div>
                    <div class="pillar-card" onclick="explorePillar(4)">
                        <div class="pillar-number">4</div>
                        <h4>Regulatory Feasibility</h4>
                        <p>Can we meet regulatory requirements?</p>
                        <button class="explore-btn">Explore →</button>
                    </div>
                    <div class="pillar-card" onclick="explorePillar(5)">
                        <div class="pillar-number">5</div>
                        <h4>Strategic Feasibility</h4>
                        <p>Does this align with business strategy?</p>
                        <button class="explore-btn">Explore →</button>
                    </div>
                </div>
            </div>

            <div id="pillar-detail" style="margin-top: 40px;">
                <p style="text-align: center; color: #6b7280; font-style: italic;">
                    Click on any pillar above to learn more
                </p>
            </div>
        </div>

        <div class="nav-buttons">
            <button class="btn btn-secondary" onclick="loadModule1Content(document.getElementById('moduleContent'))">← Previous</button>
            <button class="btn btn-primary" onclick="continueToStep3()">Continue to Practice →</button>
        </div>

        <style>
        .framework-section {
            margin: 30px 0;
        }

        .pillars-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }

        .pillar-card {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border: 2px solid #fbbf24;
            border-radius: 15px;
            padding: 25px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
        }

        .pillar-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.15);
        }

        .pillar-number {
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 40px;
            background: var(--accent-color);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.2rem;
        }

        .pillar-card h4 {
            margin: 20px 0 10px;
            color: #92400e;
            font-size: 1.1rem;
        }

        .pillar-card p {
            color: #78350f;
            font-size: 0.9rem;
            margin-bottom: 15px;
        }

        .explore-btn {
            background: white;
            border: 2px solid #fbbf24;
            color: #92400e;
            padding: 8px 20px;
            border-radius: 20px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .explore-btn:hover {
            background: #fbbf24;
            color: white;
        }
        </style>
    `;
}

function explorePillar(pillarNumber) {
    const detailDiv = document.getElementById('pillar-detail');
    
    const pillars = {
        1: {
            title: "Scientific Feasibility",
            description: "Evaluating whether the scientific foundation of the trial is sound and achievable.",
            components: [
                "Endpoint selection and measurability",
                "Biomarker validation and reliability",
                "Disease progression understanding",
                "Treatment effect size expectations",
                "Statistical power and sample size justification"
            ],
            questions: [
                "Are the endpoints clinically meaningful and measurable?",
                "Do we have validated tools to assess outcomes?",
                "Is the expected treatment effect realistic?",
                "Can we detect the effect with the proposed sample size?"
            ]
        },
        2: {
            title: "Operational Feasibility",
            description: "Assessing whether the trial can be executed with available resources and infrastructure.",
            components: [
                "Site identification and qualification",
                "Patient recruitment and retention strategies",
                "Study procedures and visit schedules",
                "Supply chain and logistics",
                "Data management and monitoring"
            ],
            questions: [
                "Do we have enough qualified sites?",
                "Can we recruit patients within timeline?",
                "Are study procedures practical for sites and patients?",
                "Do we have robust supply chain management?"
            ]
        },
        3: {
            title: "Financial Feasibility",
            description: "Determining if the trial is financially viable and provides acceptable ROI.",
            components: [
                "Budget development and validation",
                "Cost-benefit analysis",
                "Resource allocation",
                "Cash flow management",
                "ROI projections"
            ],
            questions: [
                "Is the budget realistic and complete?",
                "What is the expected ROI?",
                "Are there hidden costs we haven't considered?",
                "Can we afford delays or protocol amendments?"
            ]
        },
        4: {
            title: "Regulatory Feasibility",
            description: "Ensuring the trial can meet all regulatory requirements and timelines.",
            components: [
                "Regulatory pathway selection",
                "Submission strategy and timing",
                "Compliance requirements",
                "Regional regulatory differences",
                "Post-approval commitments"
            ],
            questions: [
                "What is the optimal regulatory pathway?",
                "Are timelines realistic for regulatory approvals?",
                "Do we understand regional requirements?",
                "What are the risks of regulatory delays?"
            ]
        },
        5: {
            title: "Strategic Feasibility",
            description: "Aligning the trial with overall business strategy and market positioning.",
            components: [
                "Market opportunity assessment",
                "Competitive landscape analysis",
                "Portfolio fit and prioritization",
                "Partnership opportunities",
                "Commercial viability"
            ],
            questions: [
                "Does this trial support our strategic goals?",
                "What is the competitive advantage?",
                "How does this fit in our portfolio?",
                "What is the market potential?"
            ]
        }
    };

    const pillar = pillars[pillarNumber];
    
    detailDiv.innerHTML = `
        <div class="pillar-detail-card fade-in">
            <h3 style="color: var(--accent-color); margin-bottom: 15px;">
                ${pillarNumber}. ${pillar.title}
            </h3>
            <p style="font-size: 1.1rem; margin-bottom: 25px; color: var(--text-secondary);">
                ${pillar.description}
            </p>

            <div class="detail-section">
                <h4>Key Components</h4>
                <ul class="component-list">
                    ${pillar.components.map(comp => `<li>${comp}</li>`).join('')}
                </ul>
            </div>

            <div class="detail-section">
                <h4>Critical Questions to Ask</h4>
                <div class="questions-grid">
                    ${pillar.questions.map(q => `
                        <div class="question-card">
                            <span class="question-icon">❓</span>
                            <p>${q}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <style>
        .pillar-detail-card {
            background: white;
            border: 3px solid var(--accent-color);
            border-radius: 15px;
            padding: 35px;
        }

        .detail-section {
            margin: 30px 0;
        }

        .detail-section h4 {
            font-size: 1.3rem;
            color: var(--text-primary);
            margin-bottom: 20px;
        }

        .component-list {
            list-style: none;
            padding: 0;
        }

        .component-list li {
            padding: 12px 0 12px 35px;
            position: relative;
            border-bottom: 1px solid var(--border-color);
        }

        .component-list li::before {
            content: "✓";
            position: absolute;
            left: 0;
            color: var(--secondary-color);
            font-weight: bold;
            font-size: 1.2rem;
        }

        .questions-grid {
            display: grid;
            gap: 15px;
        }

        .question-card {
            background: var(--bg-light);
            border-left: 4px solid var(--primary-color);
            padding: 15px 15px 15px 50px;
            border-radius: 8px;
            position: relative;
        }

        .question-icon {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 1.5rem;
        }

        .question-card p {
            margin: 0;
            color: var(--text-primary);
            font-weight: 500;
        }
        </style>
    `;
    
    awardXP(10);
}

// Continue to Step 3 - Practice Exercise
function continueToStep3() {
    const contentDiv = document.getElementById('module1-content');
    updateStepIndicator(3);
    
    contentDiv.innerHTML = `
        <div class="interactive-card">
            <h2>🎯 Practice Exercise: Protocol Synopsis Analysis</h2>
            <p style="margin: 20px 0; font-size: 1.1rem;">
                Now it's time to apply what you've learned. Review the protocol synopsis below and 
                identify potential feasibility issues.
            </p>

            <div class="protocol-synopsis">
                <h3>Protocol Synopsis: CARDIO-2025</h3>
                <div class="synopsis-content">
                    <div class="synopsis-section">
                        <h4>Study Title</h4>
                        <p>A Phase III, Randomized, Double-Blind, Placebo-Controlled Study of Novel-Drug-X 
                        in Patients with Advanced Heart Failure</p>
                    </div>

                    <div class="synopsis-section">
                        <h4>Study Objectives</h4>
                        <p>Primary: To evaluate the effect of Novel-Drug-X on cardiovascular mortality 
                        and heart failure hospitalization over 24 months</p>
                    </div>

                    <div class="synopsis-section">
                        <h4>Study Population</h4>
                        <p><strong>Target Enrollment:</strong> 5,000 patients globally</p>
                        <p><strong>Key Inclusion Criteria:</strong></p>
                        <ul>
                            <li>Age 18-75 years</li>
                            <li>NYHA Class III-IV heart failure</li>
                            <li>LVEF ≤ 30%</li>
                            <li>NT-proBNP > 1000 pg/mL</li>
                            <li>On stable optimal medical therapy for ≥ 3 months</li>
                            <li>Specific genetic biomarker present (prevalence ~15% in HF population)</li>
                            <li>No hospitalization in past 30 days</li>
                        </ul>
                        <p><strong>Key Exclusion Criteria:</strong></p>
                        <ul>
                            <li>Recent MI or stroke (< 90 days)</li>
                            <li>Severe renal impairment (eGFR < 30)</li>
                            <li>Liver disease</li>
                            <li>Currently enrolled in another trial</li>
                        </ul>
                    </div>

                    <div class="synopsis-section">
                        <h4>Study Design</h4>
                        <p>Duration: 24 months treatment + 6 months follow-up</p>
                        <p>Number of Sites: 200 sites across 25 countries</p>
                        <p>Visit Schedule: Screening, Baseline, then monthly visits for first 6 months, 
                        then quarterly visits</p>
                    </div>

                    <div class="synopsis-section">
                        <h4>Study Procedures</h4>
                        <ul>
                            <li>Echocardiography at baseline, 6, 12, 18, and 24 months</li>
                            <li>Cardiac MRI at baseline and 24 months</li>
                            <li>6-minute walk test at each visit</li>
                            <li>Quality of life questionnaires</li>
                            <li>Extensive safety labs including genetic testing</li>
                            <li>24-hour Holter monitoring quarterly</li>
                        </ul>
                    </div>

                    <div class="synopsis-section">
                        <h4>Timeline</h4>
                        <p>Enrollment Period: 18 months</p>
                        <p>Total Study Duration: 48 months</p>
                    </div>
                </div>
            </div>

            <div class="exercise-section">
                <h3>🔍 Your Task: Identify Feasibility Red Flags</h3>
                <p>Review the protocol above and identify potential feasibility issues. 
                Click on the categories below to flag concerns:</p>

                <div class="red-flags-grid">
                    <div class="flag-category" onclick="toggleFlag('patient')">
                        <div class="flag-icon">👥</div>
                        <h4>Patient Population</h4>
                        <div class="flag-count" id="patient-count">0 issues identified</div>
                    </div>
                    <div class="flag-category" onclick="toggleFlag('site')">
                        <div class="flag-icon">🏥</div>
                        <h4>Site Capability</h4>
                        <div class="flag-count" id="site-count">0 issues identified</div>
                    </div>
                    <div class="flag-category" onclick="toggleFlag('timeline')">
                        <div class="flag-icon">⏱️</div>
                        <h4>Timeline</h4>
                        <div class="flag-count" id="timeline-count">0 issues identified</div>
                    </div>
                    <div class="flag-category" onclick="toggleFlag('procedures')">
                        <div class="flag-icon">🔬</div>
                        <h4>Procedures</h4>
                        <div class="flag-count" id="procedures-count">0 issues identified</div>
                    </div>
                </div>

                <div id="flag-details" style="margin-top: 30px;"></div>

                <button class="btn btn-success" onclick="submitFeasibilityAnalysis()" style="margin-top: 30px; width: 100%;">
                    Submit Analysis
                </button>
            </div>
        </div>

        <div class="nav-buttons">
            <button class="btn btn-secondary" onclick="continueToStep2()">← Previous</button>
            <button class="btn btn-primary" onclick="continueToStep4()">Continue to Assessment →</button>
        </div>

        <style>
        .protocol-synopsis {
            background: #f0f9ff;
            border: 2px solid #3b82f6;
            border-radius: 15px;
            padding: 30px;
            margin: 30px 0;
        }

        .protocol-synopsis h3 {
            color: var(--primary-color);
            margin-bottom: 25px;
            font-size: 1.5rem;
        }

        .synopsis-section {
            margin: 25px 0;
            padding: 20px;
            background: white;
            border-radius: 10px;
        }

        .synopsis-section h4 {
            color: var(--text-primary);
            margin-bottom: 15px;
            font-size: 1.2rem;
        }

        .synopsis-section ul {
            margin-left: 20px;
        }

        .synopsis-section li {
            margin: 8px 0;
            line-height: 1.6;
        }

        .exercise-section {
            margin-top: 40px;
        }

        .red-flags-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }

        .flag-category {
            background: white;
            border: 3px solid var(--border-color);
            border-radius: 15px;
            padding: 25px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .flag-category:hover {
            border-color: var(--danger-color);
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg);
        }

        .flag-category.flagged {
            border-color: var(--danger-color);
            background: #fee2e2;
        }

        .flag-icon {
            font-size: 3rem;
            margin-bottom: 15px;
        }

        .flag-category h4 {
            color: var(--text-primary);
            margin-bottom: 10px;
        }

        .flag-count {
            color: var(--text-secondary);
            font-size: 0.9rem;
        }
        </style>
    `;
}

// Flag tracking
const flaggedIssues = {
    patient: [],
    site: [],
    timeline: [],
    procedures: []
};

function toggleFlag(category) {
    const issues = {
        patient: [
            "Genetic biomarker requirement (15% prevalence) significantly reduces eligible population",
            "Multiple restrictive inclusion criteria compound to very small eligible pool",
            "Target enrollment of 5,000 may be unrealistic given criteria",
            "Stable therapy requirement may exclude recently diagnosed patients"
        ],
        site: [
            "Cardiac MRI capability not available at all sites",
            "Genetic testing infrastructure may be limited",
            "200 sites may be insufficient given restrictive criteria",
            "Advanced heart failure expertise required - limits site pool"
        ],
        timeline: [
            "18-month enrollment period aggressive for 5,000 patients with rare biomarker",
            "Monthly visits for 6 months may impact retention",
            "48-month total duration increases dropout risk",
            "Enrollment timeline doesn't account for site activation delays"
        ],
        procedures: [
            "Cardiac MRI adds significant cost and patient burden",
            "Monthly visits in first 6 months may be excessive",
            "Multiple specialized procedures limit site capability",
            "24-hour Holter monitoring quarterly adds complexity"
        ]
    };

    const detailDiv = document.getElementById('flag-details');
    const category Element = event.currentTarget;
    
    if (!categoryElement.classList.contains('flagged')) {
        categoryElement.classList.add('flagged');
        flaggedIssues[category] = issues[category];
        
        detailDiv.innerHTML += `
            <div class="issue-detail fade-in" id="${category}-detail">
                <h4>⚠️ ${category.charAt(0).toUpperCase() + category.slice(1)} Issues Identified:</h4>
                <ul>
                    ${issues[category].map(issue => `<li>${issue}</li>`).join('')}
                </ul>
            </div>
        `;
        
        document.getElementById(`${category}-count`).textContent = `${issues[category].length} issues identified`;
        awardXP(25);
    } else {
        categoryElement.classList.remove('flagged');
        flaggedIssues[category] = [];
        document.getElementById(`${category}-detail`).remove();
        document.getElementById(`${category}-count`).textContent = '0 issues identified';
    }
}

function submitFeasibilityAnalysis() {
    const totalIssues = Object.values(flaggedIssues).flat().length;
    
    if (totalIssues === 0) {
        alert('Please identify at least one feasibility issue before submitting.');
        return;
    }

    const feedback = totalIssues >= 10 ? 'excellent' : totalIssues >= 6 ? 'good' : 'needs improvement';
    const xpReward = totalIssues >= 10 ? 100 : totalIssues >= 6 ? 75 : 50;
    
    showFeedback(`
        <h3>Analysis Complete!</h3>
        <p>You identified <strong>${totalIssues}</strong> feasibility issues.</p>
        <p>Performance: <strong>${feedback.toUpperCase()}</strong></p>
        <p>This protocol has significant feasibility challenges that would need to be addressed before study start.</p>
    `, 'success');
    
    awardXP(xpReward);
    
    // Unlock next step
    setTimeout(() => {
        continueToStep4();
    }, 3000);
}

// Continue to Step 4 - Final Assessment
function continueToStep4() {
    const contentDiv = document.getElementById('module1-content');
    updateStepIndicator(4);
    
    contentDiv.innerHTML = `
        <div class="interactive-card">
            <h2>📝 Module 1 Assessment</h2>
            <p style="margin: 20px 0; font-size: 1.1rem;">
                Test your understanding of feasibility foundations with this quick assessment.
            </p>

            <div class="quiz-container">
                <div class="quiz-question">
                    <h4>Question 1: What percentage of clinical trials fail to meet enrollment targets?</h4>
                    <div class="quiz-options">
                        <div class="quiz-option" onclick="selectAnswer(this, 'q1', false)">
                            A) 25%
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q1', false)">
                            B) 45%
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q1', true)">
                            C) 68%
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q1', false)">
                            D) 85%
                        </div>
                    </div>
                    <div class="answer-feedback" id="q1-feedback"></div>
                </div>

                <div class="quiz-question">
                    <h4>Question 2: Which of the following is NOT one of the five pillars of feasibility?</h4>
                    <div class="quiz-options">
                        <div class="quiz-option" onclick="selectAnswer(this, 'q2', false)">
                            A) Scientific Feasibility
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q2', false)">
                            B) Operational Feasibility
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q2', true)">
                            C) Marketing Feasibility
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q2', false)">
                            D) Regulatory Feasibility
                        </div>
                    </div>
                    <div class="answer-feedback" id="q2-feedback"></div>
                </div>

                <div class="quiz-question">
                    <h4>Question 3: In the Alzheimer's Mega-Trial case study, what was the primary feasibility issue?</h4>
                    <div class="quiz-options">
                        <div class="quiz-option" onclick="selectAnswer(this, 'q3', false)">
                            A) Insufficient budget
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q3', true)">
                            B) Site readiness was overestimated
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q3', false)">
                            C) Regulatory delays
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q3', false)">
                            D) Drug supply issues
                        </div>
                    </div>
                    <div class="answer-feedback" id="q3-feedback"></div>
                </div>

                <div class="quiz-question">
                    <h4>Question 4: What is the primary purpose of feasibility assessment?</h4>
                    <div class="quiz-options">
                        <div class="quiz-option" onclick="selectAnswer(this, 'q4', false)">
                            A) To satisfy regulatory requirements
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q4', true)">
                            B) To predict and prevent trial failures before they happen
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q4', false)">
                            C) To reduce trial costs
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q4', false)">
                            D) To speed up enrollment
                        </div>
                    </div>
                    <div class="answer-feedback" id="q4-feedback"></div>
                </div>

                <div class="quiz-question">
                    <h4>Question 5: Which factor was the main issue in "The Perfect Protocol Problem" case study?</h4>
                    <div class="quiz-options">
                        <div class="quiz-option" onclick="selectAnswer(this, 'q5', true)">
                            A) Inclusion criteria were too restrictive
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q5', false)">
                            B) Sites lacked proper equipment
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q5', false)">
                            C) Budget was insufficient
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q5', false)">
                            D) Competing trials emerged
                        </div>
                    </div>
                    <div class="answer-feedback" id="q5-feedback"></div>
                </div>
            </div>

            <button class="btn btn-success" onclick="submitModuleAssessment()" style="margin-top: 30px; width: 100%;">
                Submit Assessment
            </button>
        </div>

        <div class="nav-buttons">
            <button class="btn btn-secondary" onclick="continueToStep3()">← Previous</button>
            <button class="btn btn-primary" onclick="completeModule1()">Complete Module →</button>
        </div>

        <style>
        .quiz-container {
            margin: 30px 0;
        }

        .answer-feedback {
            margin-top: 15px;
            padding: 15px;
            border-radius: 8px;
            display: none;
        }

        .answer-feedback.show {
            display: block;
        }

        .answer-feedback.correct {
            background: #d1fae5;
            color: #065f46;
            border-left: 5px solid var(--secondary-color);
        }

        .answer-feedback.incorrect {
            background: #fee2e2;
            color: #991b1b;
            border-left: 5px solid var(--danger-color);
        }
        </style>
    `;
}

const quizAnswers = {};

function selectAnswer(element, questionId, isCorrect) {
    // Remove previous selections
    const options = element.parentElement.querySelectorAll('.quiz-option');
    options.forEach(opt => {
        opt.classList.remove('selected', 'correct', 'incorrect');
    });

    // Mark selected
    element.classList.add('selected');
    quizAnswers[questionId] = isCorrect;

    // Show immediate feedback
    const feedbackDiv = document.getElementById(`${questionId}-feedback`);
    feedbackDiv.classList.add('show');
    
    if (isCorrect) {
        element.classList.add('correct');
        feedbackDiv.className = 'answer-feedback show correct';
        feedbackDiv.innerHTML = '✓ Correct! Well done.';
        awardXP(20);
    } else {
        element.classList.add('incorrect');
        feedbackDiv.className = 'answer-feedback show incorrect';
        feedbackDiv.innerHTML = '✗ Not quite. Review the material and try again.';
    }
}

function submitModuleAssessment() {
    const totalQuestions = 5;
    const correctAnswers = Object.values(quizAnswers).filter(a => a === true).length;
    const score = (correctAnswers / totalQuestions) * 100;

    if (Object.keys(quizAnswers).length < totalQuestions) {
        alert('Please answer all questions before submitting.');
        return;
    }

    let message = '';
    let xpBonus = 0;

    if (score >= 80) {
        message = 'Excellent work! You have a strong understanding of feasibility foundations.';
        xpBonus = 100;
    } else if (score >= 60) {
        message = 'Good job! You understand the key concepts. Review the areas you missed.';
        xpBonus = 75;
    } else {
        message = 'You may want to review the module content before proceeding.';
        xpBonus = 50;
    }

    showFeedback(`
        <h3>Assessment Complete!</h3>
        <p>Your Score: <strong>${score}%</strong> (${correctAnswers}/${totalQuestions} correct)</p>
        <p>${message}</p>
    `, score >= 60 ? 'success' : 'warning');

    awardXP(xpBonus);
}

function completeModule1() {
    if (Object.keys(quizAnswers).length < 5) {
        alert('Please complete the assessment before finishing the module.');
        return;
    }

    appState.userProfile.completedModules.push(1);
    awardXP(100);
    unlockBadge('First Steps');
    
    showFeedback(`
        <h2>🎉 Module 1 Complete!</h2>
        <p>Congratulations! You've completed Feasibility Foundations.</p>
        <p>You've earned the <strong>"First Steps"</strong> badge!</p>
        <p>Module 2 is now unlocked.</p>
    `, 'success');

    saveUserProgress();

    setTimeout(() => {
        returnToDashboard();
        unlockModule(2);
    }, 3000);
}

// Helper Functions
function updateStepIndicator(currentStep) {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 < currentStep) {
            step.classList.add('completed');
        } else if (index + 1 === currentStep) {
            step.classList.add('active');
        }
    });
}

function returnToDashboard() {
    // Hide module content
    const moduleContent = document.getElementById('moduleContent');
    moduleContent.style.display = 'none';
    moduleContent.classList.add('hidden');
    
    // Show dashboard
    const dashboardSection = document.getElementById('dashboard');
    dashboardSection.style.display = 'block';
    dashboardSection.classList.remove('hidden');
    dashboardSection.classList.add('fade-in');
    
    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    updateProgressDisplay();
    console.log('Returned to dashboard');
}

function unlockModule(moduleNumber) {
    const moduleCards = document.querySelectorAll('.module-card');
    if (moduleCards[moduleNumber - 1]) {
        moduleCards[moduleNumber - 1].classList.remove('locked');
        const statusIcon = moduleCards[moduleNumber - 1].querySelector('.module-status');
        statusIcon.textContent = '🔓';
        statusIcon.classList.add('unlocked');
    }
}

function awardXP(amount) {
    appState.userProfile.xp += amount;
    updateLevel();
    updateProgressDisplay();
    saveUserProgress();
    
    // Show XP notification
    showXPNotification(amount);
}

function updateLevel() {
    const xp = appState.userProfile.xp;
    let newLevel = 'Novice';
    
    if (xp >= levelThresholds['Feasibility Master']) {
        newLevel = 'Feasibility Master';
    } else if (xp >= levelThresholds['Expert']) {
        newLevel = 'Expert';
    } else if (xp >= levelThresholds['Analyst']) {
        newLevel = 'Analyst';
    }
    
    if (newLevel !== appState.userProfile.level) {
        appState.userProfile.level = newLevel;
        showLevelUpNotification(newLevel);
    }
}

function updateProgressDisplay() {
    document.getElementById('totalXP').textContent = appState.userProfile.xp;
    document.getElementById('userLevel').textContent = appState.userProfile.level;
    
    // Update module progress bars
    appState.userProfile.completedModules.forEach(moduleNum => {
        const moduleCards = document.querySelectorAll('.module-card');
        if (moduleCards[moduleNum - 1]) {
            const progressBar = moduleCards[moduleNum - 1].querySelector('.progress-fill');
            if (progressBar) {
                progressBar.style.width = '100%';
            }
        }
    });
}

function unlockBadge(badgeName) {
    if (!appState.userProfile.badges.includes(badgeName)) {
        appState.userProfile.badges.push(badgeName);
        
        // Update badge display
        const badges = document.querySelectorAll('.badge');
        badges.forEach(badge => {
            if (badge.querySelector('.badge-name').textContent === badgeName) {
                badge.classList.remove('locked');
            }
        });
        
        saveUserProgress();
    }
}

function showFeedback(message, type) {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = `feedback-box ${type} fade-in`;
    feedbackDiv.innerHTML = message;
    
    const contentArea = document.getElementById('module1-content') || document.getElementById('moduleContent');
    contentArea.insertBefore(feedbackDiv, contentArea.firstChild);
    
    setTimeout(() => {
        feedbackDiv.style.opacity = '0';
        setTimeout(() => feedbackDiv.remove(), 500);
    }, 5000);
}

function showXPNotification(amount) {
    const notification = document.createElement('div');
    notification.className = 'xp-notification';
    notification.textContent = `+${amount} XP`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--accent-color), #d97706);
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        font-weight: bold;
        font-size: 1.2rem;
        box-shadow: var(--shadow-xl);
        z-index: 1000;
        animation: slideIn 0.5s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => notification.remove(), 500);
    }, 2000);
}

function showLevelUpNotification(newLevel) {
    const notification = document.createElement('div');
    notification.className = 'level-up-notification';
    notification.innerHTML = `
        <h2>🎉 Level Up!</h2>
        <p>You are now a <strong>${newLevel}</strong>!</p>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: var(--shadow-xl);
        z-index: 1000;
        text-align: center;
        min-width: 300px;
        animation: fadeIn 0.5s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Local Storage Functions
function saveUserProgress() {
    localStorage.setItem('feasiquest-progress', JSON.stringify(appState));
}

function loadUserProgress() {
    const saved = localStorage.getItem('feasiquest-progress');
    if (saved) {
        const savedState = JSON.parse(saved);
        Object.assign(appState, savedState);
    }
}

// Module 2: Patient Population & Recruitment Feasibility
function loadModule2Content(container) {
    container.innerHTML = `
        <div class="module-header-section">
            <button class="btn btn-secondary" onclick="returnToDashboard()">← Back to Dashboard</button>
            <h1>Module 2: Patient Population & Recruitment Feasibility</h1>
            <p class="module-subtitle">Finding and enrolling the right patients</p>
        </div>

        <div class="step-indicator">
            <div class="step active">
                <div class="step-circle">1</div>
                <div class="step-label">Introduction</div>
            </div>
            <div class="step">
                <div class="step-circle">2</div>
                <div class="step-label">Analysis</div>
            </div>
            <div class="step">
                <div class="step-circle">3</div>
                <div class="step-label">Strategy</div>
            </div>
            <div class="step">
                <div class="step-circle">4</div>
                <div class="step-label">Assessment</div>
            </div>
        </div>

        <div id="module2-content">
            ${getModule2IntroContent()}
        </div>
    `;
}

function getModule2IntroContent() {
    return `
        <div class="scenario-container">
            <h2 class="scenario-title">🔍 The Needle in the Haystack Challenge</h2>
            <div class="scenario-content">
                <p style="font-size: 1.2rem; margin-bottom: 20px;">
                    You need to recruit <strong>500 patients</strong> with a rare genetic condition 
                    that affects only <strong>1 in 50,000 people</strong>. The trial has strict 
                    inclusion criteria and will run at 50 sites globally.
                </p>
                <p style="font-size: 1.1rem;">
                    <strong>Question:</strong> Is this feasible? How would you find these patients?
                </p>
            </div>
        </div>

        <div class="interactive-card">
            <h3>📊 Understanding Patient Population Feasibility</h3>
            <p style="margin: 20px 0;">
                Patient recruitment is the #1 reason for trial delays and failures. 
                Let's explore the key components of patient population assessment:
            </p>
            
            <div class="feasibility-dimensions">
                <div class="dimension-card" onclick="explorePatientDimension(1)">
                    <div class="dimension-icon">🌍</div>
                    <h4>Epidemiology</h4>
                    <p>Understanding disease prevalence and incidence</p>
                </div>
                <div class="dimension-card" onclick="explorePatientDimension(2)">
                    <div class="dimension-icon">✅</div>
                    <h4>Eligibility Criteria</h4>
                    <p>Impact of inclusion/exclusion requirements</p>
                </div>
                <div class="dimension-card" onclick="explorePatientDimension(3)">
                    <div class="dimension-icon">🎯</div>
                    <h4>Recruitment Strategy</h4>
                    <p>How to find and engage patients</p>
                </div>
                <div class="dimension-card" onclick="explorePatientDimension(4)">
                    <div class="dimension-icon">🏁</div>
                    <h4>Retention Planning</h4>
                    <p>Keeping patients engaged throughout</p>
                </div>
                <div class="dimension-card" onclick="explorePatientDimension(5)">
                    <div class="dimension-icon">⚔️</div>
                    <h4>Competitive Landscape</h4>
                    <p>Other trials competing for same patients</p>
                </div>
                <div class="dimension-card" onclick="explorePatientDimension(6)">
                    <div class="dimension-icon">📍</div>
                    <h4>Geographic Distribution</h4>
                    <p>Where patients are located</p>
                </div>
            </div>

            <div id="patient-dimension-detail" style="margin-top: 30px;">
                <p style="text-align: center; color: #6b7280; font-style: italic;">
                    Click on any dimension above to learn more
                </p>
            </div>
        </div>

        <div class="interactive-card" style="margin-top: 30px;">
            <h3>🧮 Interactive Patient Pool Calculator</h3>
            <p>Let's estimate the eligible patient pool for a hypothetical trial:</p>
            
            <div class="calculator-container">
                <div class="calc-input-group">
                    <label>Disease Prevalence (per 100,000):</label>
                    <input type="number" id="prevalence" value="50" min="1" max="10000" 
                           onchange="calculatePatientPool()">
                </div>
                <div class="calc-input-group">
                    <label>Target Geographic Population (millions):</label>
                    <input type="number" id="population" value="100" min="1" max="1000" 
                           onchange="calculatePatientPool()">
                </div>
                <div class="calc-input-group">
                    <label>% Meeting Age Criteria:</label>
                    <input type="number" id="age" value="60" min="1" max="100" 
                           onchange="calculatePatientPool()">
                </div>
                <div class="calc-input-group">
                    <label>% Meeting Disease Stage Criteria:</label>
                    <input type="number" id="stage" value="40" min="1" max="100" 
                           onchange="calculatePatientPool()">
                </div>
                <div class="calc-input-group">
                    <label>% Meeting Other Inclusion Criteria:</label>
                    <input type="number" id="other" value="50" min="1" max="100" 
                           onchange="calculatePatientPool()">
                </div>
                <div class="calc-input-group">
                    <label>% Willing to Participate:</label>
                    <input type="number" id="willing" value="30" min="1" max="100" 
                           onchange="calculatePatientPool()">
                </div>
                <div class="calc-input-group">
                    <label>% Already in Other Trials:</label>
                    <input type="number" id="competing" value="20" min="0" max="100" 
                           onchange="calculatePatientPool()">
                </div>
            </div>

            <div id="calculator-results" class="calculator-results">
                <!-- Results will be displayed here -->
            </div>
        </div>

        <div class="nav-buttons">
            <button class="btn btn-secondary" onclick="returnToDashboard()">Save & Exit</button>
            <button class="btn btn-primary" onclick="continueToModule2Step2()">Continue to Analysis →</button>
        </div>

        <style>
        .calculator-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }

        .calc-input-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .calc-input-group label {
            font-weight: 600;
            color: var(--text-primary);
        }

        .calc-input-group input {
            padding: 12px;
            border: 2px solid var(--border-color);
            border-radius: 8px;
            font-size: 1rem;
        }

        .calc-input-group input:focus {
            outline: none;
            border-color: var(--primary-color);
        }

        .calculator-results {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border: 2px solid var(--primary-color);
            border-radius: 15px;
            padding: 30px;
            margin-top: 30px;
        }

        .result-row {
            display: flex;
            justify-content: space-between;
            padding: 15px 0;
            border-bottom: 1px solid #bfdbfe;
        }

        .result-row:last-child {
            border-bottom: none;
            font-size: 1.3rem;
            font-weight: bold;
            color: var(--primary-color);
        }

        .result-label {
            color: var(--text-secondary);
        }

        .result-value {
            font-weight: 600;
            color: var(--text-primary);
        }
        </style>
    `;
}

function explorePatientDimension(dimensionNumber) {
    const detailDiv = document.getElementById('patient-dimension-detail');
    
    const dimensions = {
        1: {
            title: "Epidemiological Analysis",
            content: `
                <h4>Understanding Disease Prevalence and Incidence</h4>
                <p><strong>Prevalence:</strong> Total number of people with the disease at a given time</p>
                <p><strong>Incidence:</strong> Rate of new cases over a specific period</p>
                
                <h4>Key Data Sources:</h4>
                <ul>
                    <li>Published epidemiological studies</li>
                    <li>Disease registries and databases</li>
                    <li>Healthcare claims data</li>
                    <li>Patient advocacy organizations</li>
                    <li>Physician networks and KOLs</li>
                </ul>

                <h4>Critical Questions:</h4>
                <ul>
                    <li>What is the true prevalence in your target geography?</li>
                    <li>How does prevalence vary by age, gender, ethnicity?</li>
                    <li>Are there geographic hotspots or clusters?</li>
                    <li>Is the disease increasing or decreasing in prevalence?</li>
                </ul>
            `
        },
        2: {
            title: "Eligibility Criteria Impact",
            content: `
                <h4>The Compound Effect of Criteria</h4>
                <p>Each inclusion/exclusion criterion reduces your eligible patient pool. 
                The effect is multiplicative, not additive!</p>
                
                <h4>Example:</h4>
                <ul>
                    <li>Starting pool: 100,000 patients with disease</li>
                    <li>Age 18-65: 60% remain (60,000)</li>
                    <li>Disease stage II-III: 40% remain (24,000)</li>
                    <li>No recent MI: 80% remain (19,200)</li>
                    <li>Specific biomarker: 15% remain (2,880)</li>
                    <li>Willing to participate: 30% remain (864)</li>
                </ul>
                <p><strong>Result:</strong> From 100,000 to 864 eligible patients!</p>

                <h4>Optimization Strategies:</h4>
                <ul>
                    <li>Challenge every criterion - is it truly necessary?</li>
                    <li>Consider broader age ranges if scientifically justified</li>
                    <li>Evaluate if exclusions can be relaxed</li>
                    <li>Balance scientific rigor with practical feasibility</li>
                </ul>
            `
        },
        3: {
            title: "Recruitment Strategy Development",
            content: `
                <h4>Multi-Channel Recruitment Approach</h4>
                
                <h4>Traditional Methods:</h4>
                <ul>
                    <li>Site databases and medical records</li>
                    <li>Physician referrals</li>
                    <li>Patient registries</li>
                    <li>Community outreach</li>
                </ul>

                <h4>Digital Strategies:</h4>
                <ul>
                    <li>Social media advertising (Facebook, Instagram)</li>
                    <li>Search engine marketing (Google Ads)</li>
                    <li>Patient community forums</li>
                    <li>Telemedicine platforms</li>
                    <li>Mobile health apps</li>
                </ul>

                <h4>Partnership Opportunities:</h4>
                <ul>
                    <li>Patient advocacy organizations</li>
                    <li>Disease-specific foundations</li>
                    <li>Healthcare systems and ACOs</li>
                    <li>Specialty clinics</li>
                </ul>

                <h4>Best Practices:</h4>
                <ul>
                    <li>Start recruitment early (pre-site activation)</li>
                    <li>Use multiple channels simultaneously</li>
                    <li>Track source effectiveness</li>
                    <li>Adjust strategy based on performance</li>
                </ul>
            `
        },
        4: {
            title: "Patient Retention Planning",
            content: `
                <h4>Why Retention Matters</h4>
                <p>Dropout rates of 20-30% are common. Every dropout requires recruiting 
                additional patients, extending timelines and increasing costs.</p>
                
                <h4>Common Reasons for Dropout:</h4>
                <ul>
                    <li>Visit burden too high</li>
                    <li>Travel distance too far</li>
                    <li>Adverse events or side effects</li>
                    <li>Lack of perceived benefit</li>
                    <li>Life circumstances change</li>
                    <li>Lost to follow-up</li>
                </ul>

                <h4>Retention Strategies:</h4>
                <ul>
                    <li>Minimize visit burden where possible</li>
                    <li>Offer flexible scheduling</li>
                    <li>Provide travel reimbursement</li>
                    <li>Regular communication and engagement</li>
                    <li>Patient support programs</li>
                    <li>Home health visits when appropriate</li>
                    <li>Telemedicine for some visits</li>
                </ul>

                <h4>Proactive Monitoring:</h4>
                <ul>
                    <li>Track attendance and engagement</li>
                    <li>Identify at-risk patients early</li>
                    <li>Intervene before dropout occurs</li>
                    <li>Maintain regular contact between visits</li>
                </ul>
            `
        },
        5: {
            title: "Competitive Landscape Analysis",
            content: `
                <h4>Understanding the Competition</h4>
                <p>Other trials recruiting from the same patient pool can significantly 
                impact your feasibility.</p>
                
                <h4>Key Resources:</h4>
                <ul>
                    <li>ClinicalTrials.gov</li>
                    <li>EU Clinical Trials Register</li>
                    <li>WHO ICTRP</li>
                    <li>Company pipeline databases</li>
                    <li>Conference presentations</li>
                </ul>

                <h4>What to Analyze:</h4>
                <ul>
                    <li>Number of competing trials</li>
                    <li>Enrollment status and timelines</li>
                    <li>Geographic overlap</li>
                    <li>Eligibility criteria overlap</li>
                    <li>Site overlap</li>
                    <li>Competitive advantages/disadvantages</li>
                </ul>

                <h4>Strategic Responses:</h4>
                <ul>
                    <li>Differentiate your trial (easier procedures, better compensation)</li>
                    <li>Target different geographies</li>
                    <li>Adjust timing (start earlier or later)</li>
                    <li>Modify criteria to reduce overlap</li>
                    <li>Increase site network to access more patients</li>
                </ul>
            `
        },
        6: {
            title: "Geographic Distribution",
            content: `
                <h4>Where Are Your Patients?</h4>
                <p>Patient distribution varies significantly by geography, affecting 
                site selection and recruitment strategy.</p>
                
                <h4>Factors to Consider:</h4>
                <ul>
                    <li>Disease prevalence by region</li>
                    <li>Healthcare access and quality</li>
                    <li>Cultural attitudes toward research</li>
                    <li>Language and literacy levels</li>
                    <li>Socioeconomic factors</li>
                    <li>Urban vs. rural distribution</li>
                </ul>

                <h4>Geographic Analysis Tools:</h4>
                <ul>
                    <li>Epidemiological mapping</li>
                    <li>Healthcare utilization data</li>
                    <li>Census and demographic data</li>
                    <li>Site catchment area analysis</li>
                    <li>Travel time modeling</li>
                </ul>

                <h4>Optimization Strategies:</h4>
                <ul>
                    <li>Place sites where patients are concentrated</li>
                    <li>Consider patient travel burden</li>
                    <li>Account for regional differences in healthcare</li>
                    <li>Plan for language and cultural needs</li>
                    <li>Balance geographic diversity with efficiency</li>
                </ul>
            `
        }
    };

    const dimension = dimensions[dimensionNumber];
    
    detailDiv.innerHTML = `
        <div class="pillar-detail-card fade-in">
            <h3 style="color: var(--primary-color); margin-bottom: 15px;">
                ${dimension.title}
            </h3>
            <div class="dimension-detail-content">
                ${dimension.content}
            </div>
        </div>

        <style>
        .dimension-detail-content {
            line-height: 1.8;
        }

        .dimension-detail-content h4 {
            color: var(--text-primary);
            margin: 20px 0 10px;
            font-size: 1.1rem;
        }

        .dimension-detail-content ul {
            margin-left: 20px;
            margin-bottom: 15px;
        }

        .dimension-detail-content li {
            margin: 8px 0;
        }

        .dimension-detail-content p {
            margin: 10px 0;
        }

        .dimension-detail-content strong {
            color: var(--primary-color);
        }
        </style>
    `;
    
    awardXP(10);
}

function calculatePatientPool() {
    const prevalence = parseFloat(document.getElementById('prevalence').value);
    const population = parseFloat(document.getElementById('population').value);
    const age = parseFloat(document.getElementById('age').value) / 100;
    const stage = parseFloat(document.getElementById('stage').value) / 100;
    const other = parseFloat(document.getElementById('other').value) / 100;
    const willing = parseFloat(document.getElementById('willing').value) / 100;
    const competing = parseFloat(document.getElementById('competing').value) / 100;

    // Calculate step by step
    const totalPatients = (population * 1000000 * prevalence) / 100000;
    const afterAge = totalPatients * age;
    const afterStage = afterAge * stage;
    const afterOther = afterStage * other;
    const afterWilling = afterOther * willing;
    const finalPool = afterWilling * (1 - competing);

    const resultsDiv = document.getElementById('calculator-results');
    resultsDiv.innerHTML = `
        <h3 style="color: var(--primary-color); margin-bottom: 20px;">Patient Pool Calculation Results</h3>
        <div class="result-row">
            <span class="result-label">Total patients with disease:</span>
            <span class="result-value">${Math.round(totalPatients).toLocaleString()}</span>
        </div>
        <div class="result-row">
            <span class="result-label">After age criteria (${(age*100).toFixed(0)}%):</span>
            <span class="result-value">${Math.round(afterAge).toLocaleString()}</span>
        </div>
        <div class="result-row">
            <span class="result-label">After disease stage criteria (${(stage*100).toFixed(0)}%):</span>
            <span class="result-value">${Math.round(afterStage).toLocaleString()}</span>
        </div>
        <div class="result-row">
            <span class="result-label">After other inclusion criteria (${(other*100).toFixed(0)}%):</span>
            <span class="result-value">${Math.round(afterOther).toLocaleString()}</span>
        </div>
        <div class="result-row">
            <span class="result-label">Willing to participate (${(willing*100).toFixed(0)}%):</span>
            <span class="result-value">${Math.round(afterWilling).toLocaleString()}</span>
        </div>
        <div class="result-row">
            <span class="result-label">After accounting for competing trials (${(competing*100).toFixed(0)}%):</span>
            <span class="result-value">${Math.round(finalPool).toLocaleString()}</span>
        </div>
        <div class="result-row">
            <span class="result-label">ELIGIBLE PATIENT POOL:</span>
            <span class="result-value" style="color: var(--primary-color); font-size: 1.5rem;">
                ${Math.round(finalPool).toLocaleString()}
            </span>
        </div>
        <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 8px;">
            <p style="margin: 0; color: var(--text-secondary);">
                <strong>Screening Ratio:</strong> You'll need to screen approximately 
                <strong>${(totalPatients / finalPool).toFixed(1)}</strong> patients 
                to enroll one eligible patient.
            </p>
        </div>
    `;

    awardXP(15);
}

// Initialize calculator on load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('prevalence')) {
        calculatePatientPool();
    }
});

function continueToModule2Step2() {
    const contentDiv = document.getElementById('module2-content');
    updateStepIndicator(2);
    
    contentDiv.innerHTML = `
        <div class="interactive-card">
            <h2>🎯 Branching Scenario: The Recruitment Dilemma</h2>
            <p style="margin: 20px 0; font-size: 1.1rem;">
                You're the feasibility lead for an oncology trial targeting 300 patients 
                with Stage II-III breast cancer with a specific biomarker (HER2+).
            </p>

            <div class="scenario-setup">
                <h3>Trial Parameters:</h3>
                <ul>
                    <li><strong>Target Enrollment:</strong> 300 patients</li>
                    <li><strong>Timeline:</strong> 18 months enrollment period</li>
                    <li><strong>Sites:</strong> 30 sites planned (US and EU)</li>
                    <li><strong>Key Criteria:</strong> HER2+ breast cancer, Stage II-III, no prior treatment</li>
                    <li><strong>Challenge:</strong> 2 competing trials just launched</li>
                </ul>
            </div>

            <div class="decision-point">
                <h3>🤔 Your Biggest Concern Is...</h3>
                <p>Choose the area you want to focus on first:</p>
                
                <div class="decision-options">
                    <button class="decision-button" onclick="chooseRecruitmentPath('geographic')">
                        <h4>🗺️ Geographic Reach</h4>
                        <p>Optimizing site distribution and patient access across regions</p>
                    </button>
                    
                    <button class="decision-button" onclick="chooseRecruitmentPath('criteria')">
                        <h4>✅ Eligibility Criteria</h4>
                        <p>Balancing scientific rigor with recruitment feasibility</p>
                    </button>
                    
                    <button class="decision-button" onclick="chooseRecruitmentPath('engagement')">
                        <h4>📢 Patient Engagement</h4>
                        <p>Developing effective recruitment and retention strategies</p>
                    </button>
                </div>
            </div>
        </div>

        <div class="nav-buttons">
            <button class="btn btn-secondary" onclick="loadModule2Content(document.getElementById('moduleContent'))">← Previous</button>
        </div>

        <style>
        .scenario-setup {
            background: #f0f9ff;
            border-left: 5px solid var(--primary-color);
            padding: 25px;
            border-radius: 10px;
            margin: 25px 0;
        }

        .scenario-setup h3 {
            color: var(--primary-color);
            margin-bottom: 15px;
        }

        .scenario-setup ul {
            list-style: none;
            padding: 0;
        }

        .scenario-setup li {
            padding: 10px 0;
            border-bottom: 1px solid #bfdbfe;
        }

        .scenario-setup li:last-child {
            border-bottom: none;
        }

        .decision-point {
            margin: 40px 0;
        }

        .decision-point h3 {
            text-align: center;
            color: var(--text-primary);
            margin-bottom: 20px;
        }

        .decision-point p {
            text-align: center;
            color: var(--text-secondary);
            margin-bottom: 30px;
        }
        </style>
    `;
}

let recruitmentPath = null;

function chooseRecruitmentPath(path) {
    recruitmentPath = path;
    const contentDiv = document.getElementById('module2-content');
    
    const pathContent = {
        geographic: {
            title: "Geographic Reach Strategy",
            scenario: `
                <p>You've chosen to focus on geographic optimization. Let's analyze the patient 
                distribution and site placement strategy.</p>
                
                <h4>Current Situation:</h4>
                <ul>
                    <li>HER2+ breast cancer prevalence varies significantly by region</li>
                    <li>Urban areas have higher concentration but more competition</li>
                    <li>Rural areas have patients but limited site infrastructure</li>
                    <li>Travel burden is a major concern for cancer patients</li>
                </ul>

                <h4>Your Analysis Shows:</h4>
                <div class="data-table">
                    <table>
                        <tr>
                            <th>Region</th>
                            <th>Estimated Patients</th>
                            <th>Existing Sites</th>
                            <th>Competition</th>
                        </tr>
                        <tr>
                            <td>Northeast US</td>
                            <td>450</td>
                            <td>8 sites</td>
                            <td>High</td>
                        </tr>
                        <tr>
                            <td>Southeast US</td>
                            <td>380</td>
                            <td>6 sites</td>
                            <td>Medium</td>
                        </tr>
                        <tr>
                            <td>Midwest US</td>
                            <td>320</td>
                            <td>4 sites</td>
                            <td>Low</td>
                        </tr>
                        <tr>
                            <td>Western Europe</td>
                            <td>520</td>
                            <td>12 sites</td>
                            <td>High</td>
                        </tr>
                    </table>
                </div>
            `,
            decision: `
                <h4>Strategic Decision:</h4>
                <p>How should you optimize your site network?</p>
                
                <div class="decision-options">
                    <button class="decision-button" onclick="makeGeographicDecision('urban')">
                        <h4>Focus on Urban Centers</h4>
                        <p>Fewer sites (20) in major cities with high patient volume</p>
                        <p><strong>Pros:</strong> Easier site management, experienced sites</p>
                        <p><strong>Cons:</strong> High competition, may miss rural patients</p>
                    </button>
                    
                    <button class="decision-button" onclick="makeGeographicDecision('distributed')">
                        <h4>Distributed Network</h4>
                        <p>More sites (40) spread across urban and rural areas</p>
                        <p><strong>Pros:</strong> Access to more patients, less competition</p>
                        <p><strong>Cons:</strong> Complex management, variable site quality</p>
                    </button>
                    
                    <button class="decision-button" onclick="makeGeographicDecision('hybrid')">
                        <h4>Hybrid Approach</h4>
                        <p>30 sites with hub-and-spoke model</p>
                        <p><strong>Pros:</strong> Balance of access and efficiency</p>
                        <p><strong>Cons:</strong> Requires coordination between sites</p>
                    </button>
                </div>
            `
        },
        criteria: {
            title: "Eligibility Criteria Optimization",
            scenario: `
                <p>You've chosen to focus on eligibility criteria. Let's analyze the impact 
                of current requirements on the patient pool.</p>
                
                <h4>Current Inclusion Criteria:</h4>
                <ul>
                    <li>Age 18-70 years</li>
                    <li>HER2+ breast cancer (confirmed by IHC 3+ or FISH+)</li>
                    <li>Stage II-III disease</li>
                    <li>ECOG performance status 0-1</li>
                    <li>No prior systemic therapy for breast cancer</li>
                    <li>Adequate organ function (specific lab values)</li>
                    <li>No history of other cancers (except basal cell)</li>
                </ul>

                <h4>Impact Analysis:</h4>
                <div class="criteria-impact">
                    <div class="impact-item">
                        <span>Starting pool (HER2+ Stage II-III):</span>
                        <strong>5,000 patients</strong>
                    </div>
                    <div class="impact-item">
                        <span>After age restriction:</span>
                        <strong>4,200 patients (84%)</strong>
                    </div>
                    <div class="impact-item">
                        <span>After performance status:</span>
                        <strong>3,360 patients (67%)</strong>
                    </div>
                    <div class="impact-item">
                        <span>After prior therapy exclusion:</span>
                        <strong>2,350 patients (47%)</strong>
                    </div>
                    <div class="impact-item">
                        <span>After organ function requirements:</span>
                        <strong>2,000 patients (40%)</strong>
                    </div>
                    <div class="impact-item">
                        <span>After other cancer history:</span>
                        <strong>1,800 patients (36%)</strong>
                    </div>
                    <div class="impact-item final">
                        <span>FINAL ELIGIBLE POOL:</span>
                        <strong>1,800 patients</strong>
                    </div>
                </div>

                <p style="margin-top: 20px; color: var(--danger-color); font-weight: 600;">
                    ⚠️ With 30 sites and 18-month enrollment, you need 10 patients per site. 
                    This leaves little margin for error!
                </p>
            `,
            decision: `
                <h4>Sponsor Pushback:</h4>
                <p>The medical team wants to maintain strict criteria for data quality. 
                What's your recommendation?</p>
                
                <div class="decision-options">
                    <button class="decision-button" onclick="makeCriteriaDecision('maintain')">
                        <h4>Maintain Current Criteria</h4>
                        <p>Keep all criteria as-is, focus on other strategies</p>
                        <p><strong>Risk:</strong> May not meet enrollment targets</p>
                        <p><strong>Mitigation:</strong> Add more sites, extend timeline</p>
                    </button>
                    
                    <button class="decision-button" onclick="makeCriteriaDecision('relax')">
                        <h4>Relax Age Criteria</h4>
                        <p>Expand to age 18-75 (adds ~500 patients)</p>
                        <p><strong>Benefit:</strong> 25% larger patient pool</p>
                        <p><strong>Consideration:</strong> Need to justify scientifically</p>
                    </button>
                    
                    <button class="decision-button" onclick="makeCriteriaDecision('modify')">
                        <h4>Modify Multiple Criteria</h4>
                        <p>Relax age + allow ECOG 2 + broaden organ function</p>
                        <p><strong>Benefit:</strong> 60% larger patient pool</p>
                        <p><strong>Risk:</strong> May impact data quality and safety</p>
                    </button>
                </div>
            `
        },
        engagement: {
            title: "Patient Engagement Strategy",
            scenario: `
                <p>You've chosen to focus on patient engagement. Let's develop a comprehensive 
                recruitment and retention strategy.</p>
                
                <h4>Current Challenges:</h4>
                <ul>
                    <li>Competing trials offering similar treatments</li>
                    <li>Patient awareness of trial opportunities is low</li>
                    <li>Travel burden for cancer patients is significant</li>
                    <li>Historical dropout rate in similar trials: 25%</li>
                </ul>

                <h4>Available Recruitment Channels:</h4>
                <div class="channel-options">
                    <div class="channel-card">
                        <h5>Traditional Methods</h5>
                        <ul>
                            <li>Site databases</li>
                            <li>Physician referrals</li>
                            <li>Patient registries</li>
                        </ul>
                        <p><strong>Expected yield:</strong> 40% of enrollment</p>
                    </div>
                    <div class="channel-card">
                        <h5>Digital Outreach</h5>
                        <ul>
                            <li>Social media ads</li>
                            <li>Search marketing</li>
                            <li>Patient forums</li>
                        </ul>
                        <p><strong>Expected yield:</strong> 30% of enrollment</p>
                    </div>
                    <div class="channel-card">
                        <h5>Partnerships</h5>
                        <ul>
                            <li>Advocacy groups</li>
                            <li>Cancer centers</li>
                            <li>Support groups</li>
                        </ul>
                        <p><strong>Expected yield:</strong> 30% of enrollment</p>
                    </div>
                </div>
            `,
            decision: `
                <h4>6 Months In: Low Enrollment Alert!</h4>
                <p>You're at 60 patients enrolled (target was 100). What's your response?</p>
                
                <div class="decision-options">
                    <button class="decision-button" onclick="makeEngagementDecision('intensify')">
                        <h4>Intensify Current Strategy</h4>
                        <p>Double marketing budget, add recruitment coordinator at each site</p>
                        <p><strong>Cost:</strong> +$500K</p>
                        <p><strong>Expected impact:</strong> 50% increase in screening rate</p>
                    </button>
                    
                    <button class="decision-button" onclick="makeEngagementDecision('sites')">
                        <h4>Add More Sites</h4>
                        <p>Activate 10 additional sites in underserved regions</p>
                        <p><strong>Cost:</strong> +$750K</p>
                        <p><strong>Expected impact:</strong> Access to 400 new patients</p>
                    </button>
                    
                    <button class="decision-button" onclick="makeEngagementDecision('timeline')">
                        <h4>Extend Timeline</h4>
                        <p>Request 6-month extension to enrollment period</p>
                        <p><strong>Cost:</strong> +$300K (site maintenance)</p>
                        <p><strong>Impact:</strong> Delays market entry by 6 months</p>
                    </button>
                </div>
            `
        }
    };

    const content = pathContent[path];
    
    contentDiv.innerHTML = `
        <div class="interactive-card">
            <h2>${content.title}</h2>
            <div class="path-content">
                ${content.scenario}
            </div>
            <div class="path-decision">
                ${content.decision}
            </div>
        </div>

        <div class="nav-buttons">
            <button class="btn btn-secondary" onclick="continueToModule2Step2()">← Back to Path Selection</button>
        </div>

        <style>
        .data-table {
            overflow-x: auto;
            margin: 20px 0;
        }

        .data-table table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 8px;
            overflow: hidden;
        }

        .data-table th {
            background: var(--primary-color);
            color: white;
            padding: 15px;
            text-align: left;
        }

        .data-table td {
            padding: 12px 15px;
            border-bottom: 1px solid var(--border-color);
        }

        .data-table tr:last-child td {
            border-bottom: none;
        }

        .criteria-impact {
            background: white;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
        }

        .impact-item {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid var(--border-color);
        }

        .impact-item.final {
            border-bottom: none;
            margin-top: 10px;
            padding-top: 20px;
            border-top: 3px solid var(--primary-color);
            font-size: 1.2rem;
        }

        .channel-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }

        .channel-card {
            background: white;
            border: 2px solid var(--border-color);
            border-radius: 10px;
            padding: 20px;
        }

        .channel-card h5 {
            color: var(--primary-color);
            margin-bottom: 15px;
        }

        .channel-card ul {
            margin: 15px 0;
        }

        .channel-card p {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid var(--border-color);
            color: var(--text-secondary);
        }
        </style>
    `;
    
    awardXP(50);
}

function makeGeographicDecision(choice) {
    showDecisionOutcome('geographic', choice);
}

function makeCriteriaDecision(choice) {
    showDecisionOutcome('criteria', choice);
}

function makeEngagementDecision(choice) {
    showDecisionOutcome('engagement', choice);
}

function showDecisionOutcome(path, choice) {
    const outcomes = {
        geographic: {
            urban: {
                result: "You chose to focus on urban centers with 20 high-volume sites.",
                consequences: [
                    "✓ Faster site activation (3 months vs 5 months)",
                    "✓ More experienced sites with better infrastructure",
                    "✓ Easier monitoring and management",
                    "✗ High competition led to slower enrollment than expected",
                    "✗ Missed rural patient population (estimated 80 patients)",
                    "⚠️ Enrollment at 75% of target at month 12"
                ],
                lesson: "Urban focus provides efficiency but may limit patient access. Consider hybrid approach for better balance.",
                xp: 75
            },
            distributed: {
                result: "You chose a distributed network with 40 sites across urban and rural areas.",
                consequences: [
                    "✓ Access to broader patient population",
                    "✓ Less competition in rural areas",
                    "✓ Better geographic diversity in data",
                    "✗ Slower site activation (6 months average)",
                    "✗ Variable site quality and experience",
                    "✗ Higher monitoring costs (+$400K)",
                    "⚠️ Enrollment at 85% of target at month 12"
                ],
                lesson: "Distributed approach increases access but adds complexity. Strong site support is critical.",
                xp: 85
            },
            hybrid: {
                result: "You chose a hybrid hub-and-spoke model with 30 sites.",
                consequences: [
                    "✓ Balance of efficiency and access",
                    "✓ Hub sites provide support to spoke sites",
                    "✓ Reasonable activation timeline (4 months)",
                    "✓ Good geographic coverage",
                    "✓ Manageable monitoring costs",
                    "✓ Enrollment at 95% of target at month 12"
                ],
                lesson: "Hybrid approach provides optimal balance. Hub-and-spoke model leverages strengths of both strategies.",
                xp: 100
            }
        },
        criteria: {
            maintain: {
                result: "You maintained strict eligibility criteria and focused on other strategies.",
                consequences: [
                    "✓ High data quality maintained",
                    "✓ Regulatory confidence in study design",
                    "✗ Added 15 sites to compensate (+$1.2M)",
                    "✗ Extended timeline by 6 months",
                    "✗ Increased screening burden (screen:enroll ratio 3:1)",
                    "⚠️ Final enrollment achieved but 6 months late"
                ],
                lesson: "Maintaining strict criteria is possible but requires significant additional resources and time.",
                xp: 70
            },
            relax: {
                result: "You expanded age criteria to 18-75 years.",
                consequences: [
                    "✓ 25% larger eligible patient pool",
                    "✓ Faster enrollment rate",
                    "✓ Scientific justification accepted by regulators",
                    "✓ No impact on data quality",
                    "✓ Enrollment target met on time",
                    "✓ Diverse age representation in data"
                ],
                lesson: "Thoughtful criteria relaxation can significantly improve feasibility without compromising quality.",
                xp: 100
            },
            modify: {
                result: "You relaxed multiple criteria including age, performance status, and organ function.",
                consequences: [
                    "✓ 60% larger eligible patient pool",
                    "✓ Very fast enrollment (completed 3 months early)",
                    "✗ Higher adverse event rate (safety concerns)",
                    "✗ More dropouts due to poor performance status",
                    "✗ Regulatory questions about patient selection",
                    "⚠️ Data quality concerns may impact approval"
                ],
                lesson: "Over-relaxing criteria can backfire. Balance feasibility with scientific and safety considerations.",
                xp: 60
            }
        },
        engagement: {
            intensify: {
                result: "You doubled marketing budget and added recruitment coordinators.",
                consequences: [
                    "✓ Screening rate increased by 60%",
                    "✓ Better patient engagement and retention",
                    "✓ Improved site morale and commitment",
                    "✗ Additional cost of $500K",
                    "✓ Enrollment target met with 2-month buffer",
                    "✓ Lower dropout rate (18% vs expected 25%)"
                ],
                lesson: "Investing in recruitment support can pay dividends. Coordinators improve both enrollment and retention.",
                xp: 90
            },
            sites: {
                result: "You activated 10 additional sites in underserved regions.",
                consequences: [
                    "✓ Access to 400 new patients",
                    "✓ Reduced competition in these areas",
                    "✗ Additional cost of $750K",
                    "✗ 4-month delay for site activation",
                    "✗ Variable site performance",
                    "⚠️ Enrollment target met but 3 months late"
                ],
                lesson: "Adding sites mid-study is expensive and time-consuming. Better to plan adequate network upfront.",
                xp: 75
            },
            timeline: {
                result: "You extended the enrollment period by 6 months.",
                consequences: [
                    "✓ Lower cost option ($300K)",
                    "✓ Enrollment target eventually met",
                    "✗ 6-month delay to market entry",
                    "✗ Competitive disadvantage (rival trial completed first)",
                    "✗ Site fatigue and decreased enthusiasm",
                    "⚠️ Market opportunity partially lost"
                ],
                lesson: "Timeline extensions have hidden costs. Market timing and competitive position matter.",
                xp: 65
            }
        }
    };

    const outcome = outcomes[path][choice];
    
    const contentDiv = document.getElementById('module2-content');
    contentDiv.innerHTML = `
        <div class="interactive-card">
            <h2>📊 Decision Outcome</h2>
            
            <div class="outcome-result">
                <h3>Your Decision:</h3>
                <p style="font-size: 1.2rem; color: var(--primary-color);">${outcome.result}</p>
            </div>

            <div class="outcome-consequences">
                <h3>Consequences:</h3>
                <ul class="consequences-list">
                    ${outcome.consequences.map(c => `<li>${c}</li>`).join('')}
                </ul>
            </div>

            <div class="outcome-lesson">
                <h3>💡 Key Lesson:</h3>
                <p>${outcome.lesson}</p>
            </div>

            <div class="xp-award">
                <p>You earned <strong>${outcome.xp} XP</strong> for this decision!</p>
            </div>
        </div>

        <div class="nav-buttons">
            <button class="btn btn-secondary" onclick="continueToModule2Step2()">Try Different Path</button>
            <button class="btn btn-primary" onclick="continueToModule2Step3()">Continue to Assessment →</button>
        </div>

        <style>
        .outcome-result {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border-left: 5px solid var(--primary-color);
            padding: 25px;
            border-radius: 10px;
            margin: 20px 0;
        }

        .outcome-consequences {
            margin: 30px 0;
        }

        .consequences-list {
            list-style: none;
            padding: 0;
        }

        .consequences-list li {
            padding: 12px 15px;
            margin: 10px 0;
            background: white;
            border-radius: 8px;
            border-left: 4px solid #e5e7eb;
        }

        .consequences-list li:contains("✓") {
            border-left-color: var(--secondary-color);
            background: #d1fae5;
        }

        .consequences-list li:contains("✗") {
            border-left-color: var(--danger-color);
            background: #fee2e2;
        }

        .consequences-list li:contains("⚠️") {
            border-left-color: var(--accent-color);
            background: #fef3c7;
        }

        .outcome-lesson {
            background: #d1fae5;
            border-left: 5px solid var(--secondary-color);
            padding: 25px;
            border-radius: 10px;
            margin: 20px 0;
        }

        .outcome-lesson h3 {
            color: #065f46;
            margin-bottom: 15px;
        }

        .outcome-lesson p {
            color: #065f46;
            font-size: 1.1rem;
            line-height: 1.6;
        }

        .xp-award {
            text-align: center;
            padding: 20px;
            background: linear-gradient(135deg, var(--accent-color), #d97706);
            color: white;
            border-radius: 10px;
            font-size: 1.2rem;
        }
        </style>
    `;
    
    awardXP(outcome.xp);
}

function continueToModule2Step3() {
    const contentDiv = document.getElementById('module2-content');
    updateStepIndicator(4);
    
    contentDiv.innerHTML = `
        <div class="interactive-card">
            <h2>📝 Module 2 Assessment</h2>
            <p style="margin: 20px 0; font-size: 1.1rem;">
                Test your understanding of patient population and recruitment feasibility.
            </p>

            <div class="quiz-container">
                <div class="quiz-question">
                    <h4>Question 1: What is the primary reason for clinical trial enrollment failures?</h4>
                    <div class="quiz-options">
                        <div class="quiz-option" onclick="selectAnswer(this, 'q2_1', false)">
                            A) Insufficient budget
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q2_1', false)">
                            B) Regulatory delays
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q2_1', true)">
                            C) Overly restrictive eligibility criteria
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q2_1', false)">
                            D) Poor site selection
                        </div>
                    </div>
                    <div class="answer-feedback" id="q2_1-feedback"></div>
                </div>

                <div class="quiz-question">
                    <h4>Question 2: If each eligibility criterion reduces the patient pool by 20%, what is the compound effect of 3 criteria?</h4>
                    <div class="quiz-options">
                        <div class="quiz-option" onclick="selectAnswer(this, 'q2_2', false)">
                            A) 40% reduction
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q2_2', true)">
                            B) 51% reduction
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q2_2', false)">
                            C) 60% reduction
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q2_2', false)">
                            D) 80% reduction
                        </div>
                    </div>
                    <div class="answer-feedback" id="q2_2-feedback"></div>
                </div>

                <div class="quiz-question">
                    <h4>Question 3: What is the most effective approach for rare disease recruitment?</h4>
                    <div class="quiz-options">
                        <div class="quiz-option" onclick="selectAnswer(this, 'q2_3', false)">
                            A) Social media advertising only
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q2_3', true)">
                            B) Multi-channel approach including patient registries and advocacy groups
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q2_3', false)">
                            C) Physician referrals only
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q2_3', false)">
                            D) Wait for patients to find the trial
                        </div>
                    </div>
                    <div class="answer-feedback" id="q2_3-feedback"></div>
                </div>

                <div class="quiz-question">
                    <h4>Question 4: What is a typical dropout rate in clinical trials?</h4>
                    <div class="quiz-options">
                        <div class="quiz-option" onclick="selectAnswer(this, 'q2_4', false)">
                            A) 5-10%
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q2_4', true)">
                            B) 20-30%
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q2_4', false)">
                            C) 40-50%
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q2_4', false)">
                            D) 60-70%
                        </div>
                    </div>
                    <div class="answer-feedback" id="q2_4-feedback"></div>
                </div>

                <div class="quiz-question">
                    <h4>Question 5: When should competitive landscape analysis be conducted?</h4>
                    <div class="quiz-options">
                        <div class="quiz-option" onclick="selectAnswer(this, 'q2_5', false)">
                            A) After trial starts
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q2_5', false)">
                            B) During site selection
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q2_5', true)">
                            C) During initial feasibility assessment
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q2_5', false)">
                            D) Only if enrollment is slow
                        </div>
                    </div>
                    <div class="answer-feedback" id="q2_5-feedback"></div>
                </div>
            </div>

            <button class="btn btn-success" onclick="submitModule2Assessment()" style="margin-top: 30px; width: 100%;">
                Submit Assessment
            </button>
        </div>

        <div class="nav-buttons">
            <button class="btn btn-secondary" onclick="continueToModule2Step2()">← Previous</button>
            <button class="btn btn-primary" onclick="completeModule2()">Complete Module →</button>
        </div>
    `;
}

function submitModule2Assessment() {
    const totalQuestions = 5;
    const correctAnswers = Object.keys(quizAnswers).filter(k => k.startsWith('q2_') && quizAnswers[k] === true).length;
    const score = (correctAnswers / totalQuestions) * 100;

    if (Object.keys(quizAnswers).filter(k => k.startsWith('q2_')).length < totalQuestions) {
        alert('Please answer all questions before submitting.');
        return;
    }

    let message = '';
    let xpBonus = 0;

    if (score >= 80) {
        message = 'Excellent! You have mastered patient population feasibility assessment.';
        xpBonus = 150;
    } else if (score >= 60) {
        message = 'Good work! Review the areas you missed for deeper understanding.';
        xpBonus = 100;
    } else {
        message = 'Consider reviewing the module content before proceeding.';
        xpBonus = 75;
    }

    showFeedback(`
        <h3>Assessment Complete!</h3>
        <p>Your Score: <strong>${score}%</strong> (${correctAnswers}/${totalQuestions} correct)</p>
        <p>${message}</p>
    `, score >= 60 ? 'success' : 'warning');

    awardXP(xpBonus);
}

function completeModule2() {
    const module2Questions = Object.keys(quizAnswers).filter(k => k.startsWith('q2_'));
    if (module2Questions.length < 5) {
        alert('Please complete the assessment before finishing the module.');
        return;
    }

    appState.userProfile.completedModules.push(2);
    awardXP(150);
    unlockBadge('Patient Finder');
    
    showFeedback(`
        <h2>🎉 Module 2 Complete!</h2>
        <p>Congratulations! You've mastered Patient Population & Recruitment Feasibility.</p>
        <p>You've earned the <strong>"Patient Finder"</strong> badge!</p>
        <p>Module 3 is now unlocked.</p>
    `, 'success');

    saveUserProgress();

    setTimeout(() => {
        returnToDashboard();
        unlockModule(3);
    }, 3000);
}

// Modules 3-9 are now loaded from modules.js
// Legal Disclosure Modal Function
window.showLegalDisclosure = function(type) {
    const disclosures = {
        privacy: {
            title: 'Privacy Policy',
            content: `
                <h3>Privacy Policy - FeasiQuest by Clinical Research Pro</h3>
                <p><strong>Last Updated:</strong> January 2025</p>
                
                <h4>1. Information We Collect</h4>
                <p>We collect information you provide directly to us, including:</p>
                <ul>
                    <li>Name, email address, and contact information</li>
                    <li>Professional role and experience level</li>
                    <li>Learning progress and assessment results</li>
                    <li>Usage data and interaction with the platform</li>
                </ul>
                
                <h4>2. How We Use Your Information</h4>
                <p>We use the information we collect to:</p>
                <ul>
                    <li>Provide, maintain, and improve our training services</li>
                    <li>Personalize your learning experience</li>
                    <li>Track your progress and issue certifications</li>
                    <li>Communicate with you about updates and new features</li>
                    <li>Analyze usage patterns to enhance the platform</li>
                </ul>
                
                <h4>3. Data Security</h4>
                <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                
                <h4>4. Data Retention</h4>
                <p>We retain your information for as long as necessary to provide our services and comply with legal obligations.</p>
                
                <h4>5. Your Rights</h4>
                <p>You have the right to access, correct, or delete your personal information. Contact us at info@clinicalresearchpro.com for any privacy-related requests.</p>
                
                <h4>6. Contact Information</h4>
                <p>For questions about this Privacy Policy, please contact:<br>
                Clinical Research Pro<br>
                Email: info@clinicalresearchpro.com<br>
                Website: www.clinicalresearchpro.com</p>
            `
        },
        terms: {
            title: 'Terms of Service',
            content: `
                <h3>Terms of Service - FeasiQuest</h3>
                <p><strong>Last Updated:</strong> January 2025</p>
                
                <h4>1. Acceptance of Terms</h4>
                <p>By accessing and using FeasiQuest, you accept and agree to be bound by these Terms of Service.</p>
                
                <h4>2. Use of Service</h4>
                <p>FeasiQuest is provided for educational and professional development purposes. You agree to:</p>
                <ul>
                    <li>Use the platform only for lawful purposes</li>
                    <li>Not share your account credentials with others</li>
                    <li>Not attempt to circumvent security measures</li>
                    <li>Not copy, distribute, or modify platform content without permission</li>
                </ul>
                
                <h4>3. Intellectual Property</h4>
                <p>All content, features, and functionality are owned by Clinical Research Pro and protected by copyright, trademark, and other intellectual property laws.</p>
                
                <h4>4. Certification</h4>
                <p>Upon successful completion of all modules and assessments, you will receive the CRPro Feasibility Master Certification. This certification:</p>
                <ul>
                    <li>Demonstrates competency in clinical trial feasibility assessment</li>
                    <li>Is valid for 2 years from date of issuance</li>
                    <li>May be revoked if obtained through fraudulent means</li>
                    <li>Does not guarantee employment or specific job outcomes</li>
                </ul>
                
                <h4>5. Limitation of Liability</h4>
                <p>Clinical Research Pro shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the platform.</p>
                
                <h4>6. Changes to Terms</h4>
                <p>We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of modified terms.</p>
                
                <h4>7. Contact</h4>
                <p>Questions about these Terms? Contact us at info@clinicalresearchpro.com</p>
            `
        },
        disclaimer: {
            title: 'Disclaimer',
            content: `
                <h3>Educational Disclaimer</h3>
                
                <h4>Purpose</h4>
                <p>FeasiQuest is designed for educational and professional development purposes only. The content provided is intended to enhance knowledge and skills in clinical trial feasibility assessment.</p>
                
                <h4>Not Professional Advice</h4>
                <p>The information provided through FeasiQuest does not constitute professional, medical, legal, or regulatory advice. Users should consult with qualified professionals for specific guidance related to their work.</p>
                
                <h4>No Guarantee of Outcomes</h4>
                <p>While we strive to provide high-quality training, we make no guarantees regarding:</p>
                <ul>
                    <li>Employment outcomes or career advancement</li>
                    <li>Specific results in professional practice</li>
                    <li>Acceptance of certification by employers or regulatory bodies</li>
                    <li>Compliance with all applicable regulations in all jurisdictions</li>
                </ul>
                
                <h4>Content Accuracy</h4>
                <p>We make reasonable efforts to ensure content accuracy, but clinical research practices and regulations evolve. Users are responsible for staying current with applicable guidelines and regulations.</p>
                
                <h4>Third-Party Links</h4>
                <p>Our platform may contain links to third-party websites. We are not responsible for the content or practices of these external sites.</p>
                
                <h4>Use at Your Own Risk</h4>
                <p>Use of this platform is at your own risk. Clinical Research Pro disclaims all warranties, express or implied, regarding the platform's fitness for a particular purpose.</p>
            `
        },
        cookies: {
            title: 'Cookie Policy',
            content: `
                <h3>Cookie Policy</h3>
                <p><strong>Last Updated:</strong> January 2025</p>
                
                <h4>What Are Cookies?</h4>
                <p>Cookies are small text files stored on your device when you visit our platform. They help us provide a better user experience.</p>
                
                <h4>How We Use Cookies</h4>
                <p>We use cookies for:</p>
                <ul>
                    <li><strong>Essential Cookies:</strong> Required for platform functionality, including user authentication and session management</li>
                    <li><strong>Performance Cookies:</strong> Help us understand how users interact with the platform</li>
                    <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
                    <li><strong>Analytics Cookies:</strong> Collect information about platform usage to improve our services</li>
                </ul>
                
                <h4>Local Storage</h4>
                <p>We use browser local storage to save your learning progress, including:</p>
                <ul>
                    <li>Completed modules and assessments</li>
                    <li>XP points and level progress</li>
                    <li>User preferences and settings</li>
                </ul>
                
                <h4>Managing Cookies</h4>
                <p>You can control cookies through your browser settings. However, disabling cookies may affect platform functionality.</p>
                
                <h4>Third-Party Cookies</h4>
                <p>We do not use third-party advertising cookies. Any third-party services we use are limited to essential platform functionality.</p>
            `
        },
        certification: {
            title: 'CRPro Feasibility Master Certification',
            content: `
                <h3>CRPro Feasibility Master Certification</h3>
                
                <h4>About the Certification</h4>
                <p>The CRPro Feasibility Master Certification is the industry-leading credential for clinical trial feasibility assessment professionals. This comprehensive certification demonstrates mastery of:</p>
                <ul>
                    <li>Feasibility assessment fundamentals and best practices</li>
                    <li>Patient population analysis and recruitment strategies</li>
                    <li>Site selection and capability evaluation</li>
                    <li>Budget planning and resource allocation</li>
                    <li>Timeline development and risk management</li>
                    <li>Regulatory considerations and compliance</li>
                    <li>Technology integration and data analytics</li>
                    <li>Stakeholder communication and reporting</li>
                    <li>Quality assurance and continuous improvement</li>
                </ul>
                
                <h4>Certification Requirements</h4>
                <p>To earn the CRPro Feasibility Master Certification, you must:</p>
                <ul>
                    <li>Complete all 9 training modules</li>
                    <li>Pass all module assessments with 80% or higher</li>
                    <li>Complete practice scenarios and case studies</li>
                    <li>Earn a minimum of 2,000 XP points</li>
                    <li>Demonstrate proficiency in all competency areas</li>
                </ul>
                
                <h4>Certification Benefits</h4>
                <ul>
                    <li>Industry recognition of expertise in feasibility assessment</li>
                    <li>Digital certificate and badge for professional profiles</li>
                    <li>Access to exclusive CRPro community and resources</li>
                    <li>Continuing education opportunities</li>
                    <li>Career advancement support</li>
                </ul>
                
                <h4>Validity and Renewal</h4>
                <p>The certification is valid for 2 years from the date of issuance. Renewal requires:</p>
                <ul>
                    <li>Completion of continuing education activities</li>
                    <li>Demonstration of ongoing professional development</li>
                    <li>Payment of renewal fee</li>
                </ul>
                
                <h4>Recognition</h4>
                <p>The CRPro Feasibility Master Certification is recognized by leading clinical research organizations and demonstrates commitment to professional excellence.</p>
                
                <h4>Questions?</h4>
                <p>For more information about the certification program, contact:<br>
                Clinical Research Pro<br>
                Email: info@clinicalresearchpro.com<br>
                Website: www.clinicalresearchpro.com</p>
            `
        },
        faq: {
            title: 'Frequently Asked Questions',
            content: `
                <h3>Frequently Asked Questions</h3>
                
                <h4>General Questions</h4>
                
                <p><strong>Q: What is FeasiQuest?</strong><br>
                A: FeasiQuest is an interactive, AI-powered training platform designed to help clinical research professionals master clinical trial feasibility assessment.</p>
                
                <p><strong>Q: Who should take this training?</strong><br>
                A: This training is ideal for Clinical Research Associates, Project Managers, Medical Affairs professionals, Business Development staff, Site Personnel, and anyone involved in clinical trial planning and execution.</p>
                
                <p><strong>Q: How long does it take to complete?</strong><br>
                A: The complete program takes approximately 3-4 hours, but you can learn at your own pace and save your progress.</p>
                
                <h4>Certification Questions</h4>
                
                <p><strong>Q: What is the CRPro Feasibility Master Certification?</strong><br>
                A: It's an industry-recognized credential that demonstrates expertise in clinical trial feasibility assessment, awarded upon successful completion of all modules and assessments.</p>
                
                <p><strong>Q: How do I earn the certification?</strong><br>
                A: Complete all 9 modules, pass all assessments with 80% or higher, complete practice scenarios, and earn 2,000+ XP points.</p>
                
                <p><strong>Q: Is the certification recognized by employers?</strong><br>
                A: Yes, the CRPro Feasibility Master Certification is recognized by leading clinical research organizations as a mark of professional competency.</p>
                
                <h4>Technical Questions</h4>
                
                <p><strong>Q: What browsers are supported?</strong><br>
                A: FeasiQuest works best on Chrome, Firefox, Safari, and Edge (latest versions).</p>
                
                <p><strong>Q: Is my progress saved automatically?</strong><br>
                A: Yes, your progress is automatically saved to your browser's local storage.</p>
                
                <p><strong>Q: Can I access the training on mobile devices?</strong><br>
                A: Yes, FeasiQuest is fully responsive and works on tablets and smartphones.</p>
                
                <h4>Support Questions</h4>
                
                <p><strong>Q: What if I encounter technical issues?</strong><br>
                A: Contact our support team at info@clinicalresearchpro.com for assistance.</p>
                
                <p><strong>Q: Can I get a refund?</strong><br>
                A: Please refer to our Terms of Service or contact us directly to discuss refund policies.</p>
                
                <p><strong>Q: How do I contact support?</strong><br>
                A: Email us at info@clinicalresearchpro.com or visit www.clinicalresearchpro.com for more contact options.</p>
            `
        },
        support: {
            title: 'Support & Help',
            content: `
                <h3>Support & Help</h3>
                
                <h4>Getting Started</h4>
                <p>New to FeasiQuest? Here's how to begin:</p>
                <ol>
                    <li>Click "Start Learning Now" to begin the assessment</li>
                    <li>Answer the personalization questions to tailor your experience</li>
                    <li>Access your dashboard to view all 9 modules</li>
                    <li>Start with Module 1 and progress through the training</li>
                    <li>Complete assessments and practice scenarios</li>
                    <li>Earn XP, unlock badges, and work toward certification</li>
                </ol>
                
                <h4>Technical Support</h4>
                <p>Experiencing technical issues? Try these steps:</p>
                <ul>
                    <li>Clear your browser cache and cookies</li>
                    <li>Try a different browser (Chrome, Firefox, Safari, Edge)</li>
                    <li>Ensure JavaScript is enabled</li>
                    <li>Check your internet connection</li>
                    <li>Disable browser extensions that might interfere</li>
                </ul>
                
                <h4>Learning Support</h4>
                <p>Need help with the content?</p>
                <ul>
                    <li>Use the AI Chat Assistant (🤖 icon) for instant help</li>
                    <li>Review module content and case studies</li>
                    <li>Practice with interactive scenarios</li>
                    <li>Refer to the glossary and resources</li>
                </ul>
                
                <h4>Account & Progress</h4>
                <p>Questions about your account or progress?</p>
                <ul>
                    <li>Your progress is saved automatically in your browser</li>
                    <li>View your XP, level, and badges in the dashboard</li>
                    <li>Track completed modules and unlocked content</li>
                    <li>Access your learning history and performance</li>
                </ul>
                
                <h4>Certification Support</h4>
                <p>Questions about the CRPro Feasibility Master Certification?</p>
                <ul>
                    <li>Review certification requirements in the dashboard</li>
                    <li>Track your progress toward certification</li>
                    <li>Contact us for certification verification</li>
                    <li>Request digital certificates and badges</li>
                </ul>
                
                <h4>Contact Us</h4>
                <p>Still need help? We're here for you!</p>
                <p><strong>Email:</strong> info@clinicalresearchpro.com<br>
                <strong>Website:</strong> www.clinicalresearchpro.com<br>
                <strong>Response Time:</strong> Within 24-48 hours</p>
                
                <h4>Additional Resources</h4>
                <ul>
                    <li><a href="https://www.clinicalresearchpro.com" target="_blank">Clinical Research Pro Website</a></li>
                    <li><a href="https://www.clinopsatsea.com" target="_blank">Clin Ops at Sea</a></li>
                    <li>Community forums and discussion groups</li>
                    <li>Webinars and live training sessions</li>
                </ul>
            `
        }
    };
    
    const disclosure = disclosures[type];
    if (!disclosure) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'legal-modal';
    modal.innerHTML = `
        <div class="legal-modal-content">
            <div class="legal-modal-header">
                <h2>${disclosure.title}</h2>
                <button class="legal-modal-close" onclick="this.closest('.legal-modal').remove()">&times;</button>
            </div>
            <div class="legal-modal-body">
                ${disclosure.content}
            </div>
            <div class="legal-modal-footer">
                <button class="legal-modal-btn" onclick="this.closest('.legal-modal').remove()">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
};


// Add Back to Home button functionality
window.returnToHomepage = function() {
    // Reload the page to return to homepage
    window.location.reload();
};

// Show/hide back to home button based on mode
function updateFooterForAppMode() {
    const footer = document.querySelector('.footer');
    const pageWrapper = document.querySelector('.page-wrapper');
    
    if (pageWrapper && pageWrapper.classList.contains('app-mode')) {
        // Add back to home button if not exists
        if (!document.getElementById('backToHomeBtn')) {
            const footerBottom = footer.querySelector('.footer-bottom');
            const backBtn = document.createElement('button');
            backBtn.id = 'backToHomeBtn';
            backBtn.className = 'back-to-home-btn';
            backBtn.innerHTML = '← Back to Homepage';
            backBtn.onclick = returnToHomepage;
            footerBottom.insertBefore(backBtn, footerBottom.firstChild);
        }
    }
}

// Call this when entering app mode
const originalStartAssessment = window.startAssessment;
window.startAssessment = function() {
    originalStartAssessment();
    setTimeout(updateFooterForAppMode, 100);
};

const originalSkipToModules = window.skipToModules;
window.skipToModules = function() {
    originalSkipToModules();
    setTimeout(updateFooterForAppMode, 100);
};


// Make startModule globally accessible
window.startModule = function(moduleNumber) {
    console.log('=== START MODULE CALLED ===', moduleNumber);
    
    // Hide all homepage sections first
    const homepageSections = ['welcome', 'learning-paths', 'calculators', 'features', 'modules', 'ai'];
    homepageSections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'none';
            section.classList.add('hidden');
        }
    });
    
    // Hide other sections
    const otherSections = document.querySelectorAll('.impact-section, .final-cta-section');
    otherSections.forEach(section => {
        section.style.display = 'none';
        section.classList.add('hidden');
    });
    
    // Hide navbar and background
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.style.display = 'none';
    
    const animatedBg = document.querySelector('.animated-background');
    if (animatedBg) animatedBg.style.display = 'none';
    
    // Hide widgets
    const widgets = document.querySelectorAll('.progress-widget, .quick-stats-bar, .live-chat-widget, .scroll-progress');
    widgets.forEach(widget => { widget.style.display = 'none'; });
    
    // Hide assessment if visible
    const assessmentSection = document.getElementById('assessment');
    if (assessmentSection) {
        assessmentSection.style.display = 'none';
        assessmentSection.classList.add('hidden');
    }
    
    // Hide dashboard
    const dashboardSection = document.getElementById('dashboard');
    if (dashboardSection) {
        dashboardSection.style.display = 'none';
        dashboardSection.classList.add('hidden');
    }
    
    // Show module content
    const moduleContent = document.getElementById('moduleContent');
    if (moduleContent) {
        moduleContent.style.display = 'block';
        moduleContent.classList.remove('hidden');
        moduleContent.classList.add('fade-in');
    } else {
        console.error('Module content section not found!');
        alert('Error: Module content section not found. Please refresh the page.');
        return;
    }
    
    // Add app-mode class
    const pageWrapper = document.querySelector('.page-wrapper');
    if (pageWrapper) {
        pageWrapper.classList.add('app-mode');
    }
    
    // Update app state
    if (typeof appState !== 'undefined') {
        appState.currentModule = moduleNumber;
    }
    
    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Load module content
    if (typeof loadModuleContent === 'function') {
        loadModuleContent(moduleNumber);
    } else {
        console.error('loadModuleContent function not found!');
    }
    
    console.log('Module ' + moduleNumber + ' started successfully');
};

// Also make it available without window prefix
if (typeof startModule === 'undefined') {
    startModule = window.startModule;
}

console.log('✅ Global startModule function registered');


// Handle homepage module card clicks
document.addEventListener('DOMContentLoaded', function() {
    console.log('Setting up homepage module card click handlers...');
    
    // Wait a bit for all elements to load
    setTimeout(function() {
        const moduleCards = document.querySelectorAll('.modules-section .module-card[data-module]');
        console.log('Found', moduleCards.length, 'module cards on homepage');
        
        moduleCards.forEach(card => {
            const moduleNum = parseInt(card.getAttribute('data-module'));
            
            card.style.cursor = 'pointer';
            
            card.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Homepage module card clicked:', moduleNum);
                
                // First, skip to modules (which shows dashboard)
                if (typeof window.skipToModules === 'function') {
                    window.skipToModules();
                    
                    // Then start the specific module after a short delay
                    setTimeout(function() {
                        if (typeof window.startModule === 'function') {
                            window.startModule(moduleNum);
                        }
                    }, 500);
                } else {
                    console.error('skipToModules function not found');
                }
            });
            
            console.log('✅ Click handler attached to module', moduleNum);
        });
    }, 1000);
});

