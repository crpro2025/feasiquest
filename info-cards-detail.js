// Info Cards Detail JavaScript

// Demo Data
const questionnairesData = [
    {
        id: 1,
        site: "Johns Hopkins Medical Center",
        study: "CARDIO-2024-001",
        status: "in-progress",
        sentDate: "2025-01-15",
        dueDate: "2025-01-25",
        progress: 75
    },
    {
        id: 2,
        site: "Mayo Clinic",
        study: "CARDIO-2024-001",
        status: "viewed",
        sentDate: "2025-01-14",
        dueDate: "2025-01-24",
        progress: 0
    },
    {
        id: 3,
        site: "Cleveland Clinic",
        study: "CARDIO-2024-001",
        status: "overdue",
        sentDate: "2025-01-10",
        dueDate: "2025-01-20",
        progress: 30
    },
    {
        id: 4,
        site: "Massachusetts General Hospital",
        study: "ONCO-2024-002",
        status: "sent",
        sentDate: "2025-01-18",
        dueDate: "2025-01-28",
        progress: 0
    },
    {
        id: 5,
        site: "Stanford Medical Center",
        study: "NEURO-2024-003",
        status: "in-progress",
        sentDate: "2025-01-16",
        dueDate: "2025-01-26",
        progress: 45
    },
    {
        id: 6,
        site: "Charité Berlin",
        study: "ONCO-2024-002",
        status: "overdue",
        sentDate: "2025-01-08",
        dueDate: "2025-01-18",
        progress: 60
    },
    {
        id: 7,
        site: "University of Tokyo Hospital",
        study: "NEURO-2024-003",
        status: "viewed",
        sentDate: "2025-01-17",
        dueDate: "2025-01-27",
        progress: 0
    },
    {
        id: 8,
        site: "Royal Melbourne Hospital",
        study: "CARDIO-2024-001",
        status: "overdue",
        sentDate: "2025-01-05",
        dueDate: "2025-01-15",
        progress: 20
    }
];

const studiesData = [
    {
        id: 1,
        code: "CARDIO-2024-001",
        title: "Phase III Cardiovascular Study",
        phase: "Phase III",
        status: "recruiting",
        sites: 12,
        enrolled: 456,
        target: 600,
        startDate: "2024-06-01"
    },
    {
        id: 2,
        code: "ONCO-2024-002",
        title: "Phase II Oncology Trial",
        phase: "Phase II",
        status: "active",
        sites: 8,
        enrolled: 389,
        target: 400,
        startDate: "2024-08-15"
    },
    {
        id: 3,
        code: "NEURO-2024-003",
        title: "Phase III Neurology Study",
        phase: "Phase III",
        status: "recruiting",
        sites: 10,
        enrolled: 402,
        target: 500,
        startDate: "2024-09-01"
    },
    {
        id: 4,
        code: "DIABETES-2024-004",
        title: "Phase II Diabetes Trial",
        phase: "Phase II",
        status: "active",
        sites: 6,
        enrolled: 234,
        target: 300,
        startDate: "2024-10-01"
    },
    {
        id: 5,
        code: "RESP-2024-005",
        title: "Phase III Respiratory Study",
        phase: "Phase III",
        status: "recruiting",
        sites: 15,
        enrolled: 567,
        target: 800,
        startDate: "2024-07-15"
    },
    {
        id: 6,
        code: "IMMUNO-2024-006",
        title: "Phase I Immunology Trial",
        phase: "Phase I",
        status: "active",
        sites: 4,
        enrolled: 45,
        target: 60,
        startDate: "2024-11-01"
    }
];

const reviewsData = [
    {
        id: 1,
        author: "Dr. Michael Chen",
        company: "Global Pharma Inc.",
        rating: 5,
        text: "Outstanding site with exceptional enrollment rates. The team is highly professional and responsive. We've worked with them on multiple studies and they consistently exceed expectations.",
        date: "2025-01-10"
    },
    {
        id: 2,
        author: "Sarah Johnson",
        company: "BioTech Solutions",
        rating: 5,
        text: "Excellent facilities and experienced staff. Data quality is top-notch and they maintain excellent communication throughout the study lifecycle.",
        date: "2025-01-05"
    },
    {
        id: 3,
        author: "Dr. Emily Rodriguez",
        company: "MedResearch CRO",
        rating: 4,
        text: "Very good site overall. Strong patient recruitment and retention. Minor delays in document submission but nothing major.",
        date: "2024-12-28"
    }
];

// Open Modal Functions
function openQuestionnairesModal() {
    document.getElementById('questionnairesModal').classList.add('active');
    renderQuestionnaires();
}

function openStudiesModal() {
    document.getElementById('studiesModal').classList.add('active');
    renderStudies();
}

function openPatientsModal() {
    document.getElementById('patientsModal').classList.add('active');
}

function openRatingModal() {
    document.getElementById('ratingModal').classList.add('active');
    renderReviews();
}

// Close Modal Function
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Render Questionnaires
function renderQuestionnaires() {
    const container = document.querySelector('.questionnaires-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    questionnairesData.forEach(q => {
        const item = document.createElement('div');
        item.className = 'questionnaire-item';
        
        const daysUntilDue = Math.ceil((new Date(q.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
        const isOverdue = daysUntilDue < 0;
        
        item.innerHTML = `
            <div class="questionnaire-header">
                <div>
                    <div class="questionnaire-site">${q.site}</div>
                    <div class="questionnaire-study">${q.study}</div>
                </div>
                <span class="questionnaire-status ${q.status}">${formatStatus(q.status)}</span>
            </div>
            <div class="questionnaire-meta">
                <span>📅 Sent: ${formatDate(q.sentDate)}</span>
                <span>⏰ Due: ${formatDate(q.dueDate)} ${isOverdue ? '(Overdue)' : `(${daysUntilDue} days)`}</span>
                <span>📊 Progress: ${q.progress}%</span>
            </div>
            <div class="questionnaire-actions">
                <button class="btn btn-secondary btn-sm" onclick="viewQuestionnaire(${q.id})">
                    <span class="icon">👁️</span> View
                </button>
                <button class="btn btn-secondary btn-sm" onclick="sendReminder(${q.id})">
                    <span class="icon">📧</span> Remind
                </button>
                ${q.status === 'in-progress' || q.status === 'viewed' ? 
                    `<button class="btn btn-primary btn-sm" onclick="followUp(${q.id})">
                        <span class="icon">💬</span> Follow Up
                    </button>` : ''}
            </div>
        `;
        
        container.appendChild(item);
    });
}

// Render Studies
function renderStudies() {
    const container = document.querySelector('.studies-grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    studiesData.forEach(study => {
        const enrollmentPercent = Math.round((study.enrolled / study.target) * 100);
        
        const card = document.createElement('div');
        card.className = 'study-card';
        
        card.innerHTML = `
            <span class="study-badge">${study.phase}</span>
            <h3 class="study-title">${study.code}</h3>
            <p class="study-description">${study.title}</p>
            <div class="study-stats">
                <div class="study-stat">
                    <span class="study-stat-label">Sites</span>
                    <span class="study-stat-value">${study.sites}</span>
                </div>
                <div class="study-stat">
                    <span class="study-stat-label">Enrollment</span>
                    <span class="study-stat-value">${study.enrolled}/${study.target} (${enrollmentPercent}%)</span>
                </div>
                <div class="study-stat">
                    <span class="study-stat-label">Status</span>
                    <span class="study-stat-value">${formatStatus(study.status)}</span>
                </div>
                <div class="study-stat">
                    <span class="study-stat-label">Start Date</span>
                    <span class="study-stat-value">${formatDate(study.startDate)}</span>
                </div>
            </div>
            <div class="study-actions">
                <button class="btn btn-secondary btn-sm" onclick="viewStudy(${study.id})">
                    <span class="icon">👁️</span> View Details
                </button>
                <button class="btn btn-primary btn-sm" onclick="manageStudy(${study.id})">
                    <span class="icon">⚙️</span> Manage
                </button>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Render Reviews
function renderReviews() {
    const container = document.querySelector('.reviews-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    reviewsData.forEach(review => {
        const item = document.createElement('div');
        item.className = 'review-item';
        
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        
        item.innerHTML = `
            <div class="review-header">
                <div class="review-author">
                    <span class="review-name">${review.author}</span>
                    <span class="review-company">${review.company}</span>
                </div>
                <span class="review-stars">${stars}</span>
            </div>
            <p class="review-text">${review.text}</p>
            <span class="review-date">${formatDate(review.date)}</span>
        `;
        
        container.appendChild(item);
    });
}

// Filter Functions
function filterQuestionnaires(status) {
    // Implementation for filtering
    showNotification(`Filtering by: ${status}`, 'info');
}

function sortQuestionnaires(sortBy) {
    // Implementation for sorting
    showNotification(`Sorting by: ${sortBy}`, 'info');
}

function searchQuestionnaires(query) {
    // Implementation for search
    console.log('Searching:', query);
}

function filterStudies(phase) {
    showNotification(`Filtering by: ${phase}`, 'info');
}

function filterStudiesByStatus(status) {
    showNotification(`Filtering by status: ${status}`, 'info');
}

function searchStudies(query) {
    console.log('Searching studies:', query);
}

// Action Functions
function sendReminders() {
    showNotification('Reminders sent to all pending sites', 'success');
}

function sendNewQuestionnaire() {
    showNotification('Opening questionnaire builder...', 'info');
    setTimeout(() => {
        window.location.href = 'questionnaire-builder.html';
    }, 1000);
}

function viewQuestionnaire(id) {
    showNotification(`Opening questionnaire ${id}...`, 'info');
}

function sendReminder(id) {
    showNotification('Reminder sent successfully', 'success');
}

function followUp(id) {
    showNotification('Opening message composer...', 'info');
    setTimeout(() => {
        window.location.href = 'messages-viewer.html';
    }, 1000);
}

function exportStudies() {
    showNotification('Exporting studies report...', 'info');
}

function createNewStudy() {
    showNotification('Opening study creator...', 'info');
    setTimeout(() => {
        window.location.href = 'create-study.html';
    }, 1000);
}

function viewStudy(id) {
    showNotification(`Opening study ${id} details...`, 'info');
}

function manageStudy(id) {
    showNotification(`Opening study ${id} management...`, 'info');
}

function viewAllReviews() {
    showNotification('Opening all reviews...', 'info');
}

// Helper Functions
function formatStatus(status) {
    return status.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ';
    
    notification.innerHTML = `
        <div class="notification-icon">${icon}</div>
        <div class="notification-content">
            <div class="notification-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    container.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Close modals on outside click
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Info cards detail system initialized');
});