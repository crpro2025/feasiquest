// FeasiQuest Platform - Main JavaScript
// Complete Frontend MVP with Client-Side Storage

// ===================================
// GLOBAL STATE MANAGEMENT
// ===================================

const platformState = {
    currentUser: null,
    userType: null, // 'site', 'sponsor', 'cro'
    isAuthenticated: false,
    sites: [],
    sponsors: [],
    studies: [],
    questionnaires: [],
    responses: [],
    messages: []
};

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('FeasiQuest Platform Initialized');
    
    // Load data from localStorage
    loadPlatformData();
    
    // Check if user is logged in
    checkAuthentication();
    
    // Initialize demo data if first time
    if (!localStorage.getItem('feasiquest_initialized')) {
        initializeDemoData();
        localStorage.setItem('feasiquest_initialized', 'true');
    }
});

// ===================================
// DATA PERSISTENCE
// ===================================

function loadPlatformData() {
    try {
        platformState.currentUser = JSON.parse(localStorage.getItem('feasiquest_currentUser'));
        platformState.userType = localStorage.getItem('feasiquest_userType');
        platformState.isAuthenticated = localStorage.getItem('feasiquest_isAuthenticated') === 'true';
        platformState.sites = JSON.parse(localStorage.getItem('feasiquest_sites')) || [];
        platformState.sponsors = JSON.parse(localStorage.getItem('feasiquest_sponsors')) || [];
        platformState.studies = JSON.parse(localStorage.getItem('feasiquest_studies')) || [];
        platformState.questionnaires = JSON.parse(localStorage.getItem('feasiquest_questionnaires')) || [];
        platformState.responses = JSON.parse(localStorage.getItem('feasiquest_responses')) || [];
        platformState.messages = JSON.parse(localStorage.getItem('feasiquest_messages')) || [];
    } catch (error) {
        console.error('Error loading platform data:', error);
    }
}

function savePlatformData() {
    try {
        localStorage.setItem('feasiquest_currentUser', JSON.stringify(platformState.currentUser));
        localStorage.setItem('feasiquest_userType', platformState.userType);
        localStorage.setItem('feasiquest_isAuthenticated', platformState.isAuthenticated.toString());
        localStorage.setItem('feasiquest_sites', JSON.stringify(platformState.sites));
        localStorage.setItem('feasiquest_sponsors', JSON.stringify(platformState.sponsors));
        localStorage.setItem('feasiquest_studies', JSON.stringify(platformState.studies));
        localStorage.setItem('feasiquest_questionnaires', JSON.stringify(platformState.questionnaires));
        localStorage.setItem('feasiquest_responses', JSON.stringify(platformState.responses));
        localStorage.setItem('feasiquest_messages', JSON.stringify(platformState.messages));
    } catch (error) {
        console.error('Error saving platform data:', error);
    }
}

// ===================================
// AUTHENTICATION
// ===================================

function checkAuthentication() {
    if (platformState.isAuthenticated && platformState.currentUser) {
        // Redirect to appropriate dashboard
        redirectToDashboard();
    }
}

function showLogin() {
    // Create login modal
    const modal = createModal('Login to FeasiQuest', `
        <form id="loginForm" class="auth-form">
            <div class="form-group">
                <label>Email</label>
                <input type="email" id="loginEmail" required placeholder="your@email.com">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" id="loginPassword" required placeholder="Enter password">
            </div>
            <button type="submit" class="btn-primary">Login</button>
            <p class="form-footer">Don't have an account? <a href="#" onclick="closeModal(); showSignup();">Sign up</a></p>
        </form>
    `);
    
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple authentication (in production, this would be server-side)
    const user = findUserByEmail(email);
    
    if (user && user.password === password) {
        platformState.currentUser = user;
        platformState.userType = user.type;
        platformState.isAuthenticated = true;
        savePlatformData();
        
        closeModal();
        redirectToDashboard();
    } else {
        alert('Invalid email or password');
    }
}

function showSignup() {
    // Show user type selection first
    const modal = createModal('Get Started with FeasiQuest', `
        <div class="signup-type-selection">
            <h3>I am a...</h3>
            <div class="signup-types">
                <div class="signup-type-card" onclick="selectUserType('site')">
                    <div class="type-icon">🏥</div>
                    <h4>Research Site</h4>
                    <p>Showcase capabilities and connect with sponsors</p>
                </div>
                <div class="signup-type-card" onclick="selectUserType('sponsor')">
                    <div class="type-icon">💼</div>
                    <h4>Sponsor</h4>
                    <p>Find qualified sites for your studies</p>
                </div>
                <div class="signup-type-card" onclick="selectUserType('cro')">
                    <div class="type-icon">🔬</div>
                    <h4>CRO</h4>
                    <p>Manage multiple studies efficiently</p>
                </div>
            </div>
        </div>
    `);
}

function selectUserType(type) {
    closeModal();
    
    // Store selected type temporarily
    sessionStorage.setItem('signup_userType', type);
    
    // Redirect to registration page
    window.location.href = `registration-${type}.html`;
}

function showDemo() {
    alert('Demo scheduling coming soon! For now, please sign up to explore the platform.');
    showSignup();
}

// ===================================
// USER MANAGEMENT
// ===================================

function findUserByEmail(email) {
    // Search in all user types
    const allUsers = [
        ...platformState.sites.map(s => ({...s, type: 'site'})),
        ...platformState.sponsors.map(s => ({...s, type: 'sponsor'}))
    ];
    
    return allUsers.find(u => u.email === email);
}

function redirectToDashboard() {
    switch(platformState.userType) {
        case 'site':
            window.location.href = 'site-dashboard.html';
            break;
        case 'sponsor':
            window.location.href = 'sponsor-dashboard.html';
            break;
        case 'cro':
            window.location.href = 'cro-dashboard.html';
            break;
        default:
            console.error('Unknown user type');
    }
}

function logout() {
    platformState.currentUser = null;
    platformState.userType = null;
    platformState.isAuthenticated = false;
    savePlatformData();
    
    window.location.href = 'new-homepage.html';
}

// ===================================
// MODAL SYSTEM
// ===================================

function createModal(title, content) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.platform-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'platform-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    return modal;
}

function closeModal() {
    const modal = document.querySelector('.platform-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// ===================================
// DEMO DATA INITIALIZATION
// ===================================

function initializeDemoData() {
    // Create demo sites
    const demoSites = [
        {
            id: 'site_001',
            name: 'Metro Clinical Research Center',
            email: 'admin@metrocrc.com',
            password: 'demo123',
            type: 'site',
            location: {
                address: '123 Medical Plaza',
                city: 'Boston',
                state: 'MA',
                zip: '02115',
                country: 'USA'
            },
            therapeuticAreas: ['Oncology', 'Cardiology', 'Neurology'],
            patientDatabase: 15000,
            staffCount: 25,
            trialsCompleted: 45,
            enrollmentRate: 92,
            createdAt: new Date().toISOString()
        },
        {
            id: 'site_002',
            name: 'Sunshine Research Institute',
            email: 'contact@sunshineresearch.com',
            password: 'demo123',
            type: 'site',
            location: {
                address: '456 Research Blvd',
                city: 'Miami',
                state: 'FL',
                zip: '33101',
                country: 'USA'
            },
            therapeuticAreas: ['Dermatology', 'Rheumatology', 'Endocrinology'],
            patientDatabase: 12000,
            staffCount: 18,
            trialsCompleted: 32,
            enrollmentRate: 88,
            createdAt: new Date().toISOString()
        }
    ];
    
    // Create demo sponsors
    const demoSponsors = [
        {
            id: 'sponsor_001',
            name: 'PharmaTech Solutions',
            email: 'trials@pharmatech.com',
            password: 'demo123',
            type: 'sponsor',
            company: 'PharmaTech Solutions Inc.',
            studies: [],
            createdAt: new Date().toISOString()
        }
    ];
    
    // Create demo study
    const demoStudy = {
        id: 'study_001',
        sponsorId: 'sponsor_001',
        protocolNumber: 'PT-2025-001',
        title: 'Phase III Study of Novel Oncology Treatment',
        therapeuticArea: 'Oncology',
        phase: 'III',
        indication: 'Non-Small Cell Lung Cancer',
        targetEnrollment: 300,
        numberOfSites: 15,
        status: 'Recruiting Sites',
        createdAt: new Date().toISOString()
    };
    
    // Save demo data
    platformState.sites = demoSites;
    platformState.sponsors = demoSponsors;
    platformState.studies = [demoStudy];
    savePlatformData();
    
    console.log('Demo data initialized');
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

function generateId(prefix) {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `platform-notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===================================
// EXPORT FUNCTIONS
// ===================================

window.showLogin = showLogin;
window.showSignup = showSignup;
window.showDemo = showDemo;
window.selectUserType = selectUserType;
window.closeModal = closeModal;
window.logout = logout;

console.log('✅ FeasiQuest Platform Main JS Loaded');