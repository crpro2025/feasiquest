// ===== GLOBAL STATE =====
let currentUser = null;
let currentSection = 'dashboard';

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after 1 second
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        
        // Check if user is logged in
        const savedUser = localStorage.getItem('feasiquest_user');
        if (savedUser) {
            currentUser = JSON.parse(savedUser);
            showMainApp();
        }
    }, 1000);
});

// ===== AUTHENTICATION =====
function showLogin() {
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('signupForm').classList.remove('active');
}

function showSignup() {
    document.getElementById('signupForm').classList.add('active');
    document.getElementById('loginForm').classList.remove('active');
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple validation (in real app, this would be server-side)
    if (email && password) {
        // For demo, just create a basic user
        currentUser = {
            id: 'user_' + Date.now(),
            role: 'site',
            name: 'Demo User',
            email: email,
            organization: 'Demo Organization',
            avatar: email.substring(0, 2).toUpperCase()
        };
        
        localStorage.setItem('feasiquest_user', JSON.stringify(currentUser));
        showMainApp();
        showToast('Login successful!', 'success');
    }
}

function handleSignup(event) {
    event.preventDefault();
    const role = document.getElementById('signupRole').value;
    const org = document.getElementById('signupOrg').value;
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    if (role && org && name && email && password) {
        currentUser = {
            id: 'user_' + Date.now(),
            role: role,
            name: name,
            email: email,
            organization: org,
            avatar: name.split(' ').map(n => n[0]).join('').toUpperCase()
        };
        
        localStorage.setItem('feasiquest_user', JSON.stringify(currentUser));
        showMainApp();
        showToast('Account created successfully!', 'success');
    }
}

function loginAsDemo(role) {
    currentUser = window.DEMO_DATA.users[role];
    localStorage.setItem('feasiquest_user', JSON.stringify(currentUser));
    showMainApp();
    showToast(`Logged in as ${currentUser.name}`, 'success');
}

function logout() {
    localStorage.removeItem('feasiquest_user');
    currentUser = null;
    document.getElementById('mainApp').style.display = 'none';
    document.getElementById('authScreen').style.display = 'flex';
    showToast('Logged out successfully', 'info');
}

// ===== MAIN APP =====
function showMainApp() {
    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('mainApp').style.display = 'flex';
    
    // Update user info in nav
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userAvatar').textContent = currentUser.avatar;
    
    // Configure navigation based on role
    configureNavigation();
    
    // Load dashboard
    loadDashboard();
}

function configureNavigation() {
    // Show/hide navigation items based on role
    if (currentUser.role === 'sponsor' || currentUser.role === 'cro') {
        document.getElementById('navSearch').style.display = 'flex';
        document.getElementById('navQuestionnairesText').textContent = 'Questionnaires';
    } else {
        document.getElementById('navSearch').style.display = 'none';
        document.getElementById('navQuestionnairesText').textContent = 'Questionnaires';
    }
    
    if (currentUser.role === 'cro') {
        document.getElementById('navStudies').style.display = 'flex';
    } else {
        document.getElementById('navStudies').style.display = 'none';
    }
}

// ===== NAVIGATION =====
function showDashboard() {
    showSection('dashboard');
    loadDashboard();
}

function showSection(sectionName) {
    // Update active nav button
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    event.target.closest('.nav-btn').classList.add('active');
    
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const section = document.getElementById(sectionName + 'Section');
    if (section) {
        section.classList.add('active');
        currentSection = sectionName;
        
        // Load content based on section
        switch(sectionName) {
            case 'dashboard':
                loadDashboard();
                break;
            case 'questionnaires':
                loadQuestionnaires();
                break;
            case 'search':
                loadSiteSearch();
                break;
            case 'studies':
                loadStudies();
                break;
            case 'messages':
                loadMessages();
                break;
            case 'documents':
                loadDocuments();
                break;
        }
    }
}

// ===== DASHBOARD LOADING =====
function loadDashboard() {
    const dashboardSection = document.getElementById('dashboardSection');
    
    if (currentUser.role === 'site') {
        dashboardSection.innerHTML = getSiteDashboard();
    } else if (currentUser.role === 'sponsor') {
        dashboardSection.innerHTML = getSponsorDashboard();
    } else if (currentUser.role === 'cro') {
        dashboardSection.innerHTML = getCRODashboard();
    }
}

function getSiteDashboard() {
    return `
        <div class="dashboard-header">
            <h2>Welcome back, ${currentUser.name}! 👋</h2>
            <p>${currentUser.organization}</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon">📋</div>
                <div class="stat-value">3</div>
                <div class="stat-label">Pending Questionnaires</div>
                <div class="stat-change positive">↑ 2 new this week</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">✅</div>
                <div class="stat-value">12</div>
                <div class="stat-label">Active Studies</div>
                <div class="stat-change positive">↑ 15% from last month</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">👥</div>
                <div class="stat-value">287</div>
                <div class="stat-label">Enrolled Patients</div>
                <div class="stat-change positive">↑ 23 this month</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">⭐</div>
                <div class="stat-value">4.8</div>
                <div class="stat-label">Site Rating</div>
                <div class="stat-change positive">↑ 0.2 points</div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3>📋 Recent Questionnaires</h3>
                <button class="btn btn-primary btn-sm" onclick="showSection('questionnaires')">View All</button>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Study</th>
                            <th>Protocol</th>
                            <th>Sponsor</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${getRecentQuestionnairesHTML()}
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3>📊 Enrollment Progress</h3>
            </div>
            <div style="padding: 20px;">
                ${getEnrollmentProgressHTML()}
            </div>
        </div>
    `;
}

function getSponsorDashboard() {
    return `
        <div class="dashboard-header">
            <h2>Welcome back, ${currentUser.name}! 👋</h2>
            <p>${currentUser.organization}</p>
        </div>
        
        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
            <button class="btn btn-primary" onclick="showAnalyticsDashboard()">📊 View Analytics</button>
            <button class="btn btn-secondary" onclick="openQuestionnaireBuilder()">📋 Create Questionnaire</button>
            <button class="btn btn-outline" onclick="showAIRecommendations('study_001')">🤖 AI Site Matching</button>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon">🧪</div>
                <div class="stat-value">8</div>
                <div class="stat-label">Active Studies</div>
                <div class="stat-change positive">↑ 2 new this quarter</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">🏥</div>
                <div class="stat-value">43</div>
                <div class="stat-label">Active Sites</div>
                <div class="stat-change positive">↑ 8 sites added</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">📋</div>
                <div class="stat-value">12</div>
                <div class="stat-label">Questionnaire Responses</div>
                <div class="stat-change positive">↑ 5 this week</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">👥</div>
                <div class="stat-value">1,247</div>
                <div class="stat-label">Total Enrolled</div>
                <div class="stat-change positive">↑ 12% vs target</div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3>🧪 Active Studies</h3>
                <button class="btn btn-primary btn-sm" onclick="openCreateStudyModal()">+ New Study</button>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Study Title</th>
                            <th>Protocol</th>
                            <th>Phase</th>
                            <th>Sites</th>
                            <th>Enrollment</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${getActiveStudiesHTML()}
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3>📊 Enrollment Overview</h3>
            </div>
            <div style="padding: 20px;">
                ${getSponsorEnrollmentHTML()}
            </div>
        </div>
    `;
}

function getCRODashboard() {
    return `
        <div class="dashboard-header">
            <h2>Welcome back, ${currentUser.name}! 👋</h2>
            <p>${currentUser.organization}</p>
        </div>
        
        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
            <button class="btn btn-primary" onclick="showAnalyticsDashboard()">📊 Portfolio Analytics</button>
            <button class="btn btn-secondary" onclick="showSection('search')">🔍 Site Network</button>
            <button class="btn btn-outline" onclick="openQuestionnaireBuilder()">📋 Create Questionnaire</button>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon">🧪</div>
                <div class="stat-value">45</div>
                <div class="stat-label">Managed Studies</div>
                <div class="stat-change positive">↑ 5 new this quarter</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">🏥</div>
                <div class="stat-value">500</div>
                <div class="stat-label">Site Network</div>
                <div class="stat-change positive">↑ 25 sites added</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">🤝</div>
                <div class="stat-value">15</div>
                <div class="stat-label">Active Sponsors</div>
                <div class="stat-change positive">↑ 3 new partnerships</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">👥</div>
                <div class="stat-value">8,450</div>
                <div class="stat-label">Total Enrolled</div>
                <div class="stat-change positive">↑ 18% vs target</div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3>🧪 Study Portfolio</h3>
                <button class="btn btn-primary btn-sm" onclick="showSection('studies')">View All Studies</button>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Study</th>
                            <th>Sponsor</th>
                            <th>Phase</th>
                            <th>Sites</th>
                            <th>Enrollment</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${getCROStudiesHTML()}
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3>🌍 Global Site Network</h3>
            </div>
            <div style="padding: 20px;">
                ${getSiteNetworkHTML()}
            </div>
        </div>
    `;
}

// ===== QUESTIONNAIRES =====
function loadQuestionnaires() {
    const section = document.getElementById('questionnairesSection');
    
    if (currentUser.role === 'site') {
        section.innerHTML = getSiteQuestionnairesHTML();
    } else {
        section.innerHTML = getSponsorQuestionnairesHTML();
    }
}

function getSiteQuestionnairesHTML() {
    const questionnaires = window.DEMO_DATA.questionnaires;
    
    return `
        <div class="dashboard-header">
            <h2>📋 Feasibility Questionnaires</h2>
            <p>Review and respond to questionnaires from sponsors</p>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3>All Questionnaires</h3>
                <div class="card-actions">
                    <select class="form-control" onchange="filterQuestionnaires(this.value)">
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="overdue">Overdue</option>
                    </select>
                </div>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Study Title</th>
                            <th>Protocol</th>
                            <th>Sponsor</th>
                            <th>Sent Date</th>
                            <th>Due Date</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${questionnaires.map(q => `
                            <tr>
                                <td><strong>${q.studyTitle}</strong></td>
                                <td>${q.protocol}</td>
                                <td>${q.sponsor}</td>
                                <td>${formatDate(q.sentDate)}</td>
                                <td>${formatDate(q.dueDate)}</td>
                                <td><span class="badge badge-${q.priority === 'high' ? 'error' : 'warning'}">${q.priority.toUpperCase()}</span></td>
                                <td><span class="badge badge-${q.status === 'completed' ? 'success' : 'warning'}">${q.status.toUpperCase()}</span></td>
                                <td>
                                    ${q.status === 'pending' 
                                        ? `<button class="btn btn-primary btn-sm" onclick="openQuestionnaire('${q.id}')">Complete</button>`
                                        : `<button class="btn btn-outline btn-sm" onclick="viewQuestionnaireResponse('${q.id}')">View</button>`
                                    }
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function getSponsorQuestionnairesHTML() {
    const studies = window.DEMO_DATA.studies;
    
    return `
        <div class="dashboard-header">
            <h2>📋 Questionnaire Management</h2>
            <p>Create and manage feasibility questionnaires</p>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3>Studies & Questionnaires</h3>
                <button class="btn btn-primary btn-sm" onclick="openQuestionnaireBuilder()">+ Create Questionnaire</button>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Study</th>
                            <th>Protocol</th>
                            <th>Phase</th>
                            <th>Questionnaire Status</th>
                            <th>Sent To</th>
                            <th>Responses</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${studies.map(s => `
                            <tr>
                                <td><strong>${s.title}</strong></td>
                                <td>${s.protocol}</td>
                                <td><span class="badge badge-info">${s.phase}</span></td>
                                <td>
                                    ${s.questionnaireSent 
                                        ? '<span class="badge badge-success">Sent</span>' 
                                        : '<span class="badge badge-warning">Not Sent</span>'
                                    }
                                </td>
                                <td>${s.questionnaireSent ? s.sitesNeeded + ' sites' : '-'}</td>
                                <td>${s.responsesReceived} / ${s.sitesNeeded}</td>
                                <td>
                                    ${s.questionnaireSent 
                                        ? `<button class="btn btn-outline btn-sm" onclick="viewResponses('${s.id}')">View Responses</button>`
                                        : `<button class="btn btn-primary btn-sm" onclick="sendQuestionnaire('${s.id}')">Send Questionnaire</button>`
                                    }
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// ===== SITE SEARCH (Sponsor/CRO) =====
function loadSiteSearch() {
    const section = document.getElementById('searchSection');
    const sites = window.DEMO_DATA.sites;
    
    section.innerHTML = `
        <div class="dashboard-header">
            <h2>🔍 Find Research Sites</h2>
            <p>Search and evaluate sites for your clinical trials</p>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3>Search Filters</h3>
                <button class="btn btn-secondary btn-sm" onclick="resetFilters()">Reset Filters</button>
            </div>
            <div style="padding: 25px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                    <div class="form-group">
                        <label>Location</label>
                        <input type="text" placeholder="City, State, Country" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Therapeutic Area</label>
                        <select class="form-control">
                            <option value="">All Areas</option>
                            <option>Oncology</option>
                            <option>Cardiology</option>
                            <option>Neurology</option>
                            <option>Diabetes</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Study Phase</label>
                        <select class="form-control">
                            <option value="">All Phases</option>
                            <option>Phase I</option>
                            <option>Phase II</option>
                            <option>Phase III</option>
                            <option>Phase IV</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Minimum Rating</label>
                        <select class="form-control">
                            <option value="">Any Rating</option>
                            <option>4.5+</option>
                            <option>4.0+</option>
                            <option>3.5+</option>
                        </select>
                    </div>
                </div>
                <button class="btn btn-primary" style="margin-top: 20px;">🔍 Search Sites</button>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3>Search Results (${sites.length} sites)</h3>
                <div class="card-actions">
                    <button class="btn btn-outline btn-sm" onclick="compareSelectedSites()">Compare Selected</button>
                    <button class="btn btn-primary btn-sm" onclick="sendQuestionnaireToSelected()">Send Questionnaire</button>
                </div>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th><input type="checkbox" onclick="toggleAllSites(this)"></th>
                            <th>Site Name</th>
                            <th>Location</th>
                            <th>PI</th>
                            <th>Rating</th>
                            <th>Active Studies</th>
                            <th>Capacity</th>
                            <th>Therapeutic Areas</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sites.map(site => `
                            <tr>
                                <td><input type="checkbox" class="site-checkbox" data-site-id="${site.id}"></td>
                                <td><strong>${site.name}</strong></td>
                                <td>${site.location}</td>
                                <td>${site.pi}</td>
                                <td>⭐ ${site.rating}</td>
                                <td>${site.activeStudies}</td>
                                <td>${site.enrollmentCapacity}</td>
                                <td>${site.therapeuticAreas.slice(0, 2).join(', ')}${site.therapeuticAreas.length > 2 ? '...' : ''}</td>
                                <td>
                                    <button class="btn btn-outline btn-sm" onclick="viewSiteProfile('${site.id}')">View Profile</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// ===== MESSAGES =====
function loadMessages() {
    const section = document.getElementById('messagesSection');
    const messages = window.DEMO_DATA.messages;
    
    section.innerHTML = `
        <div class="dashboard-header">
            <h2>💬 Messages</h2>
            <p>Communicate with sponsors, CROs, and sites</p>
        </div>
        
        <div style="display: grid; grid-template-columns: 300px 1fr; gap: 20px;">
            <div class="card" style="margin: 0;">
                <div class="card-header">
                    <h3>Inbox</h3>
                    <button class="btn btn-primary btn-sm" onclick="composeMessage()">+ New</button>
                </div>
                <div style="padding: 0;">
                    ${messages.map(msg => `
                        <div class="message-item ${!msg.read ? 'unread' : ''}" onclick="openMessage('${msg.id}')" style="padding: 15px; border-bottom: 1px solid var(--gray-200); cursor: pointer; ${!msg.read ? 'background: var(--gray-50);' : ''}">
                            <div style="font-weight: 600; margin-bottom: 5px;">${msg.from}</div>
                            <div style="font-size: 0.9rem; color: var(--gray-600); margin-bottom: 5px;">${msg.subject}</div>
                            <div style="font-size: 0.85rem; color: var(--gray-500);">${formatDate(msg.date)}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="card" style="margin: 0;">
                <div class="card-header">
                    <h3>Select a message</h3>
                </div>
                <div id="messageContent" style="padding: 25px; text-align: center; color: var(--gray-500);">
                    <p>Select a message from the inbox to view its contents</p>
                </div>
            </div>
        </div>
    `;
}

// ===== DOCUMENTS =====
function loadDocuments() {
    const section = document.getElementById('documentsSection');
    const documents = window.DEMO_DATA.documents;
    
    section.innerHTML = `
        <div class="dashboard-header">
            <h2>📁 Documents</h2>
            <p>Manage study documents and site files</p>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3>Document Library</h3>
                <div class="card-actions">
                    <button class="btn btn-secondary btn-sm" onclick="uploadDocument()">📤 Upload</button>
                    <button class="btn btn-primary btn-sm" onclick="createFolder()">📁 New Folder</button>
                </div>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Document Name</th>
                            <th>Type</th>
                            <th>Category</th>
                            <th>Study</th>
                            <th>Size</th>
                            <th>Upload Date</th>
                            <th>Shared</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${documents.map(doc => `
                            <tr>
                                <td><strong>📄 ${doc.name}</strong></td>
                                <td><span class="badge badge-info">${doc.type}</span></td>
                                <td>${doc.category}</td>
                                <td>${doc.study || '-'}</td>
                                <td>${doc.size}</td>
                                <td>${formatDate(doc.uploadDate)}</td>
                                <td>${doc.shared ? '✅ Yes' : '❌ No'}</td>
                                <td>
                                    <button class="btn btn-outline btn-sm" onclick="downloadDocument('${doc.id}')">Download</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// ===== HELPER FUNCTIONS =====
function getRecentQuestionnairesHTML() {
    const questionnaires = window.DEMO_DATA.questionnaires.slice(0, 3);
    return questionnaires.map(q => `
        <tr>
            <td><strong>${q.studyTitle}</strong></td>
            <td>${q.protocol}</td>
            <td>${q.sponsor}</td>
            <td>${formatDate(q.dueDate)}</td>
            <td><span class="badge badge-${q.status === 'completed' ? 'success' : 'warning'}">${q.status.toUpperCase()}</span></td>
            <td>
                ${q.status === 'pending' 
                    ? `<button class="btn btn-primary btn-sm" onclick="openQuestionnaire('${q.id}')">Complete</button>`
                    : `<button class="btn btn-outline btn-sm" onclick="viewQuestionnaireResponse('${q.id}')">View</button>`
                }
            </td>
        </tr>
    `).join('');
}

function getActiveStudiesHTML() {
    const studies = window.DEMO_DATA.studies;
    return studies.map(s => `
        <tr>
            <td><strong>${s.title}</strong></td>
            <td>${s.protocol}</td>
            <td><span class="badge badge-info">${s.phase}</span></td>
            <td>${s.sitesActive} / ${s.sitesNeeded}</td>
            <td>${s.currentEnrollment} / ${s.targetEnrollment}</td>
            <td><span class="badge badge-${s.status === 'Recruiting' ? 'success' : 'warning'}">${s.status}</span></td>
            <td>
                <button class="btn btn-outline btn-sm" onclick="viewStudyTimeline('${s.id}')">Timeline</button>
                <button class="btn btn-primary btn-sm" onclick="showAIRecommendations('${s.id}')">🤖 Find Sites</button>
            </td>
        </tr>
    `).join('');
}

function getCROStudiesHTML() {
    const studies = window.DEMO_DATA.studies;
    return studies.map(s => `
        <tr>
            <td><strong>${s.title}</strong></td>
            <td>${s.sponsor}</td>
            <td><span class="badge badge-info">${s.phase}</span></td>
            <td>${s.sitesActive} / ${s.sitesNeeded}</td>
            <td>${s.currentEnrollment} / ${s.targetEnrollment}</td>
            <td><span class="badge badge-${s.status === 'Recruiting' ? 'success' : 'warning'}">${s.status}</span></td>
        </tr>
    `).join('');
}

function getEnrollmentProgressHTML() {
    return `
        <div style="margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span><strong>BPS-ONC-301</strong> - NSCLC Trial</span>
                <span>287 / 450 (64%)</span>
            </div>
            <div style="background: var(--gray-200); height: 20px; border-radius: 10px; overflow: hidden;">
                <div style="background: var(--success); height: 100%; width: 64%;"></div>
            </div>
        </div>
        <div style="margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span><strong>BPS-RARE-101</strong> - Duchenne MD</span>
                <span>22 / 30 (73%)</span>
            </div>
            <div style="background: var(--gray-200); height: 20px; border-radius: 10px; overflow: hidden;">
                <div style="background: var(--success); height: 100%; width: 73%;"></div>
            </div>
        </div>
        <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span><strong>BPS-ENDO-202</strong> - Type 2 DM</span>
                <span>0 / 200 (0%)</span>
            </div>
            <div style="background: var(--gray-200); height: 20px; border-radius: 10px; overflow: hidden;">
                <div style="background: var(--warning); height: 100%; width: 0%;"></div>
            </div>
        </div>
    `;
}

function getSponsorEnrollmentHTML() {
    return getEnrollmentProgressHTML();
}

function getSiteNetworkHTML() {
    return `
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; text-align: center;">
            <div>
                <div style="font-size: 2rem; font-weight: 700; color: var(--primary);">150</div>
                <div style="color: var(--gray-600);">North America</div>
            </div>
            <div>
                <div style="font-size: 2rem; font-weight: 700; color: var(--secondary);">200</div>
                <div style="color: var(--gray-600);">Europe</div>
            </div>
            <div>
                <div style="font-size: 2rem; font-weight: 700; color: var(--accent);">100</div>
                <div style="color: var(--gray-600);">Asia</div>
            </div>
            <div>
                <div style="font-size: 2rem; font-weight: 700; color: var(--warning);">50</div>
                <div style="color: var(--gray-600);">Latin America</div>
            </div>
        </div>
    `;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// ===== UI INTERACTIONS =====
function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.toggle('active');
}

function showNotifications() {
    const panel = document.getElementById('notificationPanel');
    panel.classList.add('active');
    loadNotifications();
}

function closeNotifications() {
    document.getElementById('notificationPanel').classList.remove('active');
}

function loadNotifications() {
    const content = document.getElementById('notificationContent');
    const notifications = window.DEMO_DATA.notifications;
    
    content.innerHTML = notifications.map(notif => `
        <div style="padding: 15px; border-bottom: 1px solid var(--gray-200); ${!notif.read ? 'background: var(--gray-50);' : ''}">
            <div style="display: flex; align-items: start; gap: 10px;">
                <span style="font-size: 1.5rem;">${getNotificationIcon(notif.type)}</span>
                <div style="flex: 1;">
                    <div style="font-weight: 600; margin-bottom: 5px;">${notif.title}</div>
                    <div style="font-size: 0.9rem; color: var(--gray-600); margin-bottom: 10px;">${notif.message}</div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.85rem; color: var(--gray-500);">${formatDate(notif.date)}</span>
                        <button class="btn btn-outline btn-sm">${notif.action}</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function getNotificationIcon(type) {
    const icons = {
        questionnaire: '📋',
        message: '💬',
        response: '✅',
        document: '📄',
        system: '⚙️'
    };
    return icons[type] || '🔔';
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span style="font-size: 1.2rem;">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
        <span>${message}</span>
    `;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ===== MODAL FUNCTIONS =====
function openQuestionnaire(id) {
    const questionnaire = window.DEMO_DATA.questionnaires.find(q => q.id === id);
    if (!questionnaire) return;
    
    showModal('Complete Feasibility Questionnaire', getQuestionnaireFormHTML(questionnaire), [
        { text: 'Cancel', class: 'btn-outline', onclick: 'closeModal()' },
        { text: 'Save Draft', class: 'btn-secondary', onclick: 'saveDraft()' },
        { text: 'Submit', class: 'btn-primary', onclick: 'submitQuestionnaire()' }
    ]);
}

function getQuestionnaireFormHTML(questionnaire) {
    return `
        <div style="max-height: 60vh; overflow-y: auto;">
            <div style="background: var(--gray-100); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h4>${questionnaire.studyTitle}</h4>
                <p style="margin: 10px 0 0 0; color: var(--gray-600);">
                    <strong>Protocol:</strong> ${questionnaire.protocol} | 
                    <strong>Sponsor:</strong> ${questionnaire.sponsor} | 
                    <strong>Due:</strong> ${formatDate(questionnaire.dueDate)}
                </p>
            </div>
            
            ${questionnaire.sections.map((section, sIdx) => `
                <div style="margin-bottom: 30px;">
                    <h4 style="color: var(--primary); margin-bottom: 20px;">${sIdx + 1}. ${section.title}</h4>
                    ${section.questions.map((q, qIdx) => `
                        <div class="form-group">
                            <label>${qIdx + 1}. ${q.question} ${q.required ? '<span style="color: var(--error);">*</span>' : ''}</label>
                            ${getQuestionInputHTML(q)}
                        </div>
                    `).join('')}
                </div>
            `).join('')}
        </div>
    `;
}

function getQuestionInputHTML(question) {
    switch(question.type) {
        case 'text':
            return `<input type="text" class="form-control" placeholder="Enter your answer">`;
        case 'textarea':
            return `<textarea class="form-control" rows="4" placeholder="Enter your answer"></textarea>`;
        case 'number':
            return `<input type="number" class="form-control" placeholder="Enter a number">`;
        case 'select':
            return `<select class="form-control">
                <option value="">Select an option...</option>
                ${question.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
            </select>`;
        case 'multiselect':
            return `<div style="display: flex; flex-direction: column; gap: 10px;">
                ${question.options.map(opt => `
                    <label style="display: flex; align-items: center; gap: 10px;">
                        <input type="checkbox" value="${opt}">
                        <span>${opt}</span>
                    </label>
                `).join('')}
            </div>`;
        default:
            return `<input type="text" class="form-control">`;
    }
}

function showModal(title, body, buttons) {
    const container = document.getElementById('modalContainer');
    container.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="closeModal()">✕</button>
            </div>
            <div class="modal-body">
                ${body}
            </div>
            <div class="modal-footer">
                ${buttons.map(btn => `
                    <button class="btn ${btn.class}" onclick="${btn.onclick}">${btn.text}</button>
                `).join('')}
            </div>
        </div>
    `;
    container.classList.add('active');
}

function closeModal() {
    document.getElementById('modalContainer').classList.remove('active');
}

// ===== PLACEHOLDER FUNCTIONS =====
function openCreateStudyModal() { showToast('Create Study feature coming soon!', 'info'); }
function openQuestionnaireBuilder() { showToast('Questionnaire Builder coming soon!', 'info'); }
function viewStudyDetails(id) { showToast('Study details view coming soon!', 'info'); }
function viewResponses(id) { showToast('Response viewer coming soon!', 'info'); }
function sendQuestionnaire(id) { showToast('Questionnaire sent successfully!', 'success'); }
function viewQuestionnaireResponse(id) { showToast('Response viewer coming soon!', 'info'); }
function viewSiteProfile(id) { showToast('Site profile viewer coming soon!', 'info'); }
function compareSelectedSites() { showToast('Site comparison tool coming soon!', 'info'); }
function sendQuestionnaireToSelected() { showToast('Questionnaires sent to selected sites!', 'success'); }
function toggleAllSites(checkbox) { document.querySelectorAll('.site-checkbox').forEach(cb => cb.checked = checkbox.checked); }
function composeMessage() { showToast('Message composer coming soon!', 'info'); }
function openMessage(id) { showToast('Message viewer coming soon!', 'info'); }
function uploadDocument() { showToast('Document upload coming soon!', 'info'); }
function createFolder() { showToast('Folder created successfully!', 'success'); }
function downloadDocument(id) { showToast('Document download started!', 'success'); }
function submitQuestionnaire() { closeModal(); showToast('Questionnaire submitted successfully!', 'success'); }
function saveDraft() { closeModal(); showToast('Draft saved!', 'success'); }
function showProfile() { showToast('Profile editor coming soon!', 'info'); }
function showSettings() { showToast('Settings page coming soon!', 'info'); }
function showHelp() { showToast('Help center coming soon!', 'info'); }
function filterQuestionnaires(status) { showToast(`Filtering by: ${status}`, 'info'); }
function resetFilters() { showToast('Filters reset!', 'info'); }

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.user-menu')) {
        document.getElementById('userDropdown').classList.remove('active');
    }
});
// Add navigation to new features
function navigateToStudyCreation() {
    window.location.href = 'study-creation.html';
}

function navigateToQuestionnaireBuilder() {
    window.location.href = 'questionnaire-builder.html';
}

function navigateToSiteProfile(siteId) {
    window.location.href = 'site-profile.html?id=' + (siteId || '');
}

// View site profile function
function viewSiteProfile(siteId) {
    window.location.href = 'site-profile.html?id=' + (siteId || '');
}

// Profile and settings functions
function showProfile() {
    window.location.href = 'profile-editor.html';
}

function showSettings() {
    window.location.href = 'profile-editor.html#preferences';
}

function showHelp() {
    window.location.href = 'help-center.html';
}
