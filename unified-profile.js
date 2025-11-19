// Unified Profile JavaScript

let currentOrgType = 'sponsor'; // sponsor, cro, or both

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    loadProfileData();
    updateOrgTypeDisplay();
});

// Initialize tabs
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// Switch organization type
function switchType(type) {
    currentOrgType = type;
    
    // Update button states
    document.querySelectorAll('.type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.type-btn[data-type="${type}"]`).classList.add('active');
    
    // Update org type badge
    const orgTypeBadge = document.getElementById('orgType');
    if (type === 'sponsor') {
        orgTypeBadge.textContent = 'Sponsor';
    } else if (type === 'cro') {
        orgTypeBadge.textContent = 'CRO';
    } else {
        orgTypeBadge.textContent = 'Sponsor & CRO';
    }
    
    // Update display
    updateOrgTypeDisplay();
    
    showNotification(`Organization type updated to ${type}`, 'success');
}

// Update organization type display
function updateOrgTypeDisplay() {
    const container = document.querySelector('.profile-container');
    
    // Remove all type classes
    container.classList.remove('type-sponsor', 'type-cro', 'type-both');
    
    // Add current type class
    container.classList.add(`type-${currentOrgType}`);
    
    // Show/hide CRO sections
    const croSections = document.querySelectorAll('.cro-section');
    croSections.forEach(section => {
        if (currentOrgType === 'cro' || currentOrgType === 'both') {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

// Load profile data
function loadProfileData() {
    // In a real app, this would load from database
    const savedData = localStorage.getItem('organizationProfile');
    
    if (savedData) {
        const data = JSON.parse(savedData);
        // Populate form fields with saved data
        console.log('Loaded profile data:', data);
    }
}

// Edit logo
function editLogo() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('orgLogo').src = event.target.result;
                showNotification('Logo updated successfully!', 'success');
            };
            reader.readAsDataURL(file);
        }
    };
    
    input.click();
}

// Edit profile
function editProfile() {
    // Enable all form fields
    document.querySelectorAll('.form-control').forEach(field => {
        field.disabled = false;
    });
    
    showNotification('Profile editing enabled', 'info');
}

// Share profile
function shareProfile() {
    const url = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: document.getElementById('orgName').textContent,
            text: 'Check out our organization profile on FeasiQuest',
            url: url
        }).then(() => {
            showNotification('Profile shared successfully!', 'success');
        }).catch(() => {
            copyToClipboard(url);
        });
    } else {
        copyToClipboard(url);
    }
}

// Copy to clipboard
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Profile link copied to clipboard!', 'success');
    } catch (err) {
        showNotification('Failed to copy link', 'error');
    }
    
    document.body.removeChild(textarea);
}

// Save profile
function saveProfile() {
    // Collect all form data
    const profileData = {
        orgType: currentOrgType,
        name: document.getElementById('orgName').textContent,
        description: document.getElementById('orgDescription').value,
        // Add more fields as needed
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage (in real app, would save to database)
    localStorage.setItem('organizationProfile', JSON.stringify(profileData));
    
    // Show success message
    showNotification('Profile saved successfully!', 'success');
    
    // Optionally redirect back to dashboard
    setTimeout(() => {
        window.location.href = 'app.html';
    }, 1500);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        color: 'white',
        fontWeight: '600',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
    });
    
    const colors = {
        success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        info: 'linear-gradient(135deg, #00f0ff 0%, #b026ff 100%)',
        warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
    };
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Auto-save functionality
let autoSaveTimeout;
document.querySelectorAll('.form-control').forEach(field => {
    field.addEventListener('input', function() {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(() => {
            // Auto-save draft
            const draftData = {
                field: this.name || this.id,
                value: this.value,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('profileDraft', JSON.stringify(draftData));
        }, 2000);
    });
});

// Export functions
window.switchType = switchType;
window.editLogo = editLogo;
window.editProfile = editProfile;
window.shareProfile = shareProfile;
window.saveProfile = saveProfile;