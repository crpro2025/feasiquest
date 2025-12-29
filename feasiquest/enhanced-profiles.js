// ===================================
// ENHANCED PROFILES JAVASCRIPT
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initProfileTabs();
});

function initProfileTabs() {
    // Tab functionality is handled by showTab function
}

function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(`${tabName}-tab`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to clicked button
    event.currentTarget.classList.add('active');
    
    // Scroll to top of content
    window.scrollTo({ top: 400, behavior: 'smooth' });
}

function uploadProfilePhoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showNotification('Image must be less than 5MB', 'error');
            return;
        }
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
            showNotification('Please select an image file', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = document.querySelector('.profile-photo img');
            if (img) {
                img.src = event.target.result;
                img.style.display = 'block';
            } else {
                const photoContainer = document.querySelector('.profile-photo');
                photoContainer.innerHTML = `<img src="${event.target.result}" alt="Profile Photo">`;
            }
            
            showNotification('Profile photo updated successfully!', 'success');
        };
        reader.readAsDataURL(file);
    };
    
    input.click();
}

function uploadCoverPhoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            showNotification('Image must be less than 10MB', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(event) {
            const coverPhoto = document.querySelector('.profile-cover-photo');
            coverPhoto.style.backgroundImage = `url(${event.target.result})`;
            coverPhoto.style.backgroundSize = 'cover';
            coverPhoto.style.backgroundPosition = 'center';
            
            showNotification('Cover photo updated successfully!', 'success');
        };
        reader.readAsDataURL(file);
    };
    
    input.click();
}

function sendMessage() {
    showNotification('Opening message composer...', 'info');
    setTimeout(() => {
        window.location.href = 'enhanced-messages.html';
    }, 1000);
}

function sendQuestionnaire() {
    showNotification('Opening questionnaire builder...', 'info');
    setTimeout(() => {
        window.location.href = 'enhanced-questionnaire-response.html';
    }, 1000);
}

function shareProfile() {
    // Copy profile URL to clipboard
    const url = window.location.href;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Profile link copied to clipboard!', 'success');
        });
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification('Profile link copied to clipboard!', 'success');
    }
}

function uploadMedia() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,video/*';
    input.multiple = true;
    
    input.onchange = function(e) {
        const files = Array.from(e.target.files);
        
        if (files.length > 10) {
            showNotification('Maximum 10 files allowed', 'error');
            return;
        }
        
        files.forEach(file => {
            if (file.size > 50 * 1024 * 1024) {
                showNotification(`${file.name} is too large (max 50MB)`, 'error');
                return;
            }
            
            // Add to media grid (would upload to server in real app)
            addMediaToGrid(file);
        });
        
        showNotification(`${files.length} file(s) uploaded successfully!`, 'success');
    };
    
    input.click();
}

function addMediaToGrid(file) {
    const grid = document.querySelector('.media-grid');
    if (!grid) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const mediaItem = document.createElement('div');
        mediaItem.className = 'media-item';
        
        if (file.type.startsWith('image/')) {
            mediaItem.innerHTML = `
                <img src="${e.target.result}" alt="${file.name}">
                <div class="media-overlay">
                    <button onclick="viewMedia('${file.name}')">👁️ View</button>
                </div>
            `;
        } else if (file.type.startsWith('video/')) {
            mediaItem.innerHTML = `
                <video src="${e.target.result}"></video>
                <div class="media-overlay">
                    <button onclick="viewMedia('${file.name}')">▶️ Play</button>
                </div>
            `;
        }
        
        grid.insertBefore(mediaItem, grid.lastElementChild);
    };
    reader.readAsDataURL(file);
}

function viewMedia(id) {
    showNotification('Opening media viewer...', 'info');
}

function uploadDocument() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.xls,.xlsx';
    input.multiple = true;
    
    input.onchange = function(e) {
        const files = Array.from(e.target.files);
        
        files.forEach(file => {
            if (file.size > 25 * 1024 * 1024) {
                showNotification(`${file.name} is too large (max 25MB)`, 'error');
                return;
            }
            
            addDocumentToList(file);
        });
        
        showNotification(`${files.length} document(s) uploaded successfully!`, 'success');
    };
    
    input.click();
}

function addDocumentToList(file) {
    const list = document.querySelector('.documents-list');
    if (!list) return;
    
    const docItem = document.createElement('div');
    docItem.className = 'document-item';
    docItem.innerHTML = `
        <div class="doc-icon">${getFileIcon(file.type)}</div>
        <div class="doc-info">
            <div class="doc-name">${file.name}</div>
            <div class="doc-meta">${getFileExtension(file.name).toUpperCase()} • ${formatFileSize(file.size)} • Uploaded ${new Date().toLocaleDateString()}</div>
        </div>
        <button class="btn-doc-download" onclick="downloadDocument('${file.name}')">⬇️ Download</button>
    `;
    
    list.insertBefore(docItem, list.lastElementChild);
}

function getFileIcon(type) {
    if (type.includes('pdf')) return '📄';
    if (type.includes('word') || type.includes('document')) return '📝';
    if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
    if (type.includes('image')) return '🖼️';
    if (type.includes('video')) return '🎥';
    return '📎';
}

function getFileExtension(filename) {
    return filename.split('.').pop();
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function downloadDocument(filename) {
    showNotification(`Downloading ${filename}...`, 'info');
}

function toggleMobileMenu() {
    const nav = document.querySelector('.global-nav');
    nav.classList.toggle('active');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
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
            transform: translateX(400px);
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
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('✅ Enhanced Profiles Loaded');