// Profile Editor JavaScript

let currentUser = null;
let tags = {
    certifications: [],
    languages: []
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    setupEventListeners();
});

// Load user data
function loadUserData() {
    // Get current user from localStorage
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        currentUser = JSON.parse(userData);
        populateForm();
        
        // Show/hide sections based on user role
        if (currentUser.role === 'site') {
            document.getElementById('navCapabilities').style.display = 'flex';
            document.getElementById('navTeam').style.display = 'flex';
        }
    }
}

// Populate form with user data
function populateForm() {
    if (!currentUser) return;
    
    // Basic info
    document.getElementById('firstName').value = currentUser.name?.split(' ')[0] || '';
    document.getElementById('lastName').value = currentUser.name?.split(' ')[1] || '';
    document.getElementById('email').value = currentUser.email || '';
    document.getElementById('orgName').value = currentUser.organization || '';
    
    // Update preview
    document.getElementById('previewName').textContent = currentUser.name || 'User Name';
    document.getElementById('previewOrg').textContent = currentUser.organization || 'Organization';
}

// Setup event listeners
function setupEventListeners() {
    // Password strength checker
    document.getElementById('newPassword')?.addEventListener('input', checkPasswordStrength);
    
    // Edit full profile checkbox
    document.getElementById('editFullProfile')?.addEventListener('change', function() {
        if (this.checked) {
            window.location.href = 'site-registration.html';
        }
    });
}

// Show editor section
function showEditorSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.editor-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.editor-nav .nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#' + sectionId) {
            item.classList.add('active');
        }
    });
    
    return false;
}

// Handle photo upload
function handlePhotoUpload(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profilePhotoPreview').src = e.target.result;
            showNotification('Photo updated! Remember to save changes.', 'success');
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Add tag
function addTag(event, type) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const input = event.target;
        const value = input.value.trim();
        
        if (value && !tags[type].includes(value)) {
            tags[type].push(value);
            renderTags(type);
            input.value = '';
        }
    }
}

// Remove tag
function removeTag(type, value) {
    tags[type] = tags[type].filter(tag => tag !== value);
    renderTags(type);
}

// Render tags
function renderTags(type) {
    const display = document.getElementById(type + 'Display');
    display.innerHTML = tags[type].map(tag => `
        <span class="tag">
            ${tag}
            <span class="tag-remove" onclick="removeTag('${type}', '${tag}')">×</span>
        </span>
    `).join('');
}

// Check password strength
function checkPasswordStrength() {
    const password = document.getElementById('newPassword').value;
    const strengthDiv = document.getElementById('passwordStrength');
    
    if (!password) {
        strengthDiv.className = 'password-strength';
        return;
    }
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    
    if (strength <= 1) {
        strengthDiv.className = 'password-strength weak';
    } else if (strength <= 3) {
        strengthDiv.className = 'password-strength medium';
    } else {
        strengthDiv.className = 'password-strength strong';
    }
}

// Save profile
function saveProfile() {
    showSaving();
    
    // Collect form data
    const profileData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        title: document.getElementById('title').value,
        bio: document.getElementById('bio').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        orgName: document.getElementById('orgName').value,
        // ... collect all other fields
    };
    
    // Simulate save
    setTimeout(() => {
        hideSaving();
        showNotification('Profile updated successfully!', 'success');
        
        // Update localStorage
        if (currentUser) {
            currentUser.name = `${profileData.firstName} ${profileData.lastName}`;
            currentUser.email = profileData.email;
            currentUser.organization = profileData.orgName;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
    }, 1500);
}

// Change password
function changePassword() {
    const current = document.getElementById('currentPassword').value;
    const newPass = document.getElementById('newPassword').value;
    const confirm = document.getElementById('confirmPassword').value;
    
    if (!current || !newPass || !confirm) {
        showNotification('Please fill in all password fields', 'error');
        return;
    }
    
    if (newPass !== confirm) {
        showNotification('New passwords do not match', 'error');
        return;
    }
    
    if (newPass.length < 8) {
        showNotification('Password must be at least 8 characters', 'error');
        return;
    }
    
    showSaving();
    setTimeout(() => {
        hideSaving();
        showNotification('Password updated successfully!', 'success');
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
    }, 1500);
}

// Cancel edit
function cancelEdit() {
    if (confirm('Are you sure? Any unsaved changes will be lost.')) {
        window.location.href = 'app.html';
    }
}

// Add team member
function addTeamMember() {
    const teamList = document.getElementById('teamList');
    const memberId = 'member_' + Date.now();
    
    const memberHTML = `
        <div class="team-member-item" id="${memberId}">
            <img src="https://via.placeholder.com/60" alt="Team Member" class="team-member-photo">
            <div class="team-member-info">
                <input type="text" placeholder="Name" class="form-control" style="margin-bottom: 5px;">
                <input type="text" placeholder="Title/Role" class="form-control">
            </div>
            <div class="team-member-actions">
                <button class="btn-outline btn-sm" onclick="removeTeamMember('${memberId}')">Remove</button>
            </div>
        </div>
    `;
    
    teamList.insertAdjacentHTML('beforeend', memberHTML);
}

// Remove team member
function removeTeamMember(memberId) {
    if (confirm('Remove this team member?')) {
        document.getElementById(memberId).remove();
    }
}

// Deactivate account
function deactivateAccount() {
    if (confirm('Are you sure you want to deactivate your account? You can reactivate it later.')) {
        showNotification('Account deactivated. You will be logged out.', 'success');
        setTimeout(() => {
            window.location.href = 'homepage.html';
        }, 2000);
    }
}

// Delete account
function deleteAccount() {
    const confirmation = prompt('This action cannot be undone. Type "DELETE" to confirm:');
    if (confirmation === 'DELETE') {
        showNotification('Account deleted. You will be logged out.', 'success');
        setTimeout(() => {
            localStorage.clear();
            window.location.href = 'homepage.html';
        }, 2000);
    }
}

// Show saving overlay
function showSaving() {
    const overlay = document.createElement('div');
    overlay.className = 'saving-overlay';
    overlay.id = 'savingOverlay';
    overlay.innerHTML = `
        <div class="saving-content">
            <div class="saving-spinner"></div>
            <h3>Saving changes...</h3>
        </div>
    `;
    document.body.appendChild(overlay);
}

// Hide saving overlay
function hideSaving() {
    const overlay = document.getElementById('savingOverlay');
    if (overlay) overlay.remove();
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#d1fae5' : '#fee2e2'};
        color: ${type === 'success' ? '#065f46' : '#991b1b'};
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10001;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
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