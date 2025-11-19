// Organization Profile Enhanced JavaScript

// Profile data
let profileData = {
    organizationName: "Johns Hopkins Medical Center",
    organizationType: "academic",
    primaryContact: "",
    primaryTitle: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    about: "",
    yearEstablished: "",
    employees: "",
    operatingHours: {},
    languages: [],
    socialMedia: {},
    capabilities: {},
    team: [],
    facilities: [],
    media: {
        photos: [],
        videos: [],
        virtualTour: ""
    },
    documents: [],
    certifications: []
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadProfileData();
    setupEventListeners();
});

// Switch Tabs
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update tab panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    document.getElementById(`${tabName}Tab`).classList.add('active');
}

// Upload Functions
function uploadCover() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.querySelector('.profile-cover').style.backgroundImage = `url(${event.target.result})`;
                showNotification('Cover photo updated', 'success');
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

function uploadAvatar() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('profileImage').src = event.target.result;
                showNotification('Profile photo updated', 'success');
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

function uploadPhotos() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = function(e) {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = function(event) {
                addPhotoToGrid(event.target.result);
            };
            reader.readAsDataURL(file);
        });
        showNotification(`${files.length} photo(s) uploaded`, 'success');
    };
    input.click();
}

function addPhotoToGrid(src) {
    const grid = document.getElementById('photosGrid');
    const item = document.createElement('div');
    item.className = 'media-item';
    item.innerHTML = `
        <img src="${src}" alt="Site Photo">
        <div class="media-overlay">
            <button class="btn btn-sm btn-danger" onclick="removeMedia(this)">
                <span class="icon">🗑️</span>
            </button>
        </div>
    `;
    grid.appendChild(item);
}

function uploadVideos() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.multiple = true;
    input.onchange = function(e) {
        const files = Array.from(e.target.files);
        showNotification(`${files.length} video(s) uploaded`, 'success');
    };
    input.click();
}

function uploadDocument() {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = function(e) {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            addDocumentToList(file);
        });
        showNotification(`${files.length} document(s) uploaded`, 'success');
    };
    input.click();
}

function addDocumentToList(file) {
    const list = document.getElementById('documentsList');
    const item = document.createElement('div');
    item.className = 'document-item';
    
    const size = formatFileSize(file.size);
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    
    item.innerHTML = `
        <div class="document-icon">📄</div>
        <div class="document-info">
            <h4>${file.name}</h4>
            <p>${file.type || 'Document'} • ${size} • Uploaded ${date}</p>
        </div>
        <div class="document-actions">
            <button class="btn btn-secondary btn-sm">
                <span class="icon">⬇️</span> Download
            </button>
            <button class="btn btn-danger btn-sm" onclick="removeDocument(this)">
                <span class="icon">🗑️</span> Delete
            </button>
        </div>
    `;
    list.appendChild(item);
}

function uploadCertification() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png';
    input.multiple = true;
    input.onchange = function(e) {
        const files = Array.from(e.target.files);
        showNotification(`${files.length} certification(s) uploaded`, 'success');
    };
    input.click();
}

// Team Member Functions
function addTeamMember() {
    showNotification('Opening team member form...', 'info');
    // In a real implementation, this would open a modal form
}

function editTeamMember(id) {
    showNotification(`Editing team member ${id}...`, 'info');
}

function removeTeamMember(id) {
    if (confirm('Are you sure you want to remove this team member?')) {
        showNotification('Team member removed', 'success');
    }
}

// Remove Functions
function removeMedia(button) {
    const item = button.closest('.media-item');
    item.remove();
    showNotification('Media removed', 'success');
}

function removeDocument(button) {
    const item = button.closest('.document-item');
    if (confirm('Are you sure you want to delete this document?')) {
        item.remove();
        showNotification('Document deleted', 'success');
    }
}

// Save and Preview Functions
function saveProfile() {
    // Collect form data
    const formData = collectFormData();
    
    // Save to localStorage (in real app, would save to backend)
    localStorage.setItem('profileData', JSON.stringify(formData));
    
    showNotification('Profile saved successfully', 'success');
}

function previewProfile() {
    showNotification('Opening profile preview...', 'info');
    // In real implementation, would open site-profile-viewer.html
    setTimeout(() => {
        window.open('site-profile-viewer.html', '_blank');
    }, 1000);
}

function collectFormData() {
    const data = {};
    
    // Collect all form inputs
    document.querySelectorAll('.form-control').forEach(input => {
        if (input.name) {
            data[input.name] = input.value;
        }
    });
    
    // Collect checkboxes
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        if (checkbox.name) {
            if (!data[checkbox.name]) {
                data[checkbox.name] = [];
            }
            data[checkbox.name].push(checkbox.value);
        }
    });
    
    return data;
}

function loadProfileData() {
    const savedData = localStorage.getItem('profileData');
    if (savedData) {
        const data = JSON.parse(savedData);
        
        // Populate form fields
        Object.keys(data).forEach(key => {
            const input = document.querySelector(`[name="${key}"]`);
            if (input) {
                if (input.type === 'checkbox') {
                    if (Array.isArray(data[key]) && data[key].includes(input.value)) {
                        input.checked = true;
                    }
                } else {
                    input.value = data[key];
                }
            }
        });
        
        showNotification('Profile data loaded', 'info');
    }
}

function setupEventListeners() {
    // Auto-save on form changes
    let saveTimeout;
    document.querySelectorAll('.form-control, input[type="checkbox"]').forEach(input => {
        input.addEventListener('change', function() {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                const data = collectFormData();
                localStorage.setItem('profileData', JSON.stringify(data));
                console.log('Auto-saved');
            }, 2000);
        });
    });
}

// Helper Functions
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
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

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveProfile();
    }
    
    // Ctrl/Cmd + P to preview
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        previewProfile();
    }
});

console.log('Organization Profile Enhanced initialized');