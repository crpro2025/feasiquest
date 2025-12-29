// Site Profile Viewer JavaScript

// Demo site data
const siteData = {
    name: "Advanced Clinical Research Center",
    location: "Boston, MA, USA",
    rating: 4.8,
    reviewCount: 127,
    activeStudies: 24,
    completedStudies: 156,
    totalPatients: 3450,
    teamSize: 45,
    description: "Advanced Clinical Research Center is a leading research facility specializing in oncology, cardiology, and neurology trials. With over 20 years of experience, we have successfully completed 156 clinical trials and enrolled over 3,450 patients. Our state-of-the-art facility is equipped with the latest medical technology and staffed by a team of 45 dedicated professionals.",
    email: "contact@acrc.com",
    phone: "+1 (617) 555-0123",
    website: "www.acrc.com",
    address: "123 Medical Plaza, Boston, MA 02115"
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadSiteData();
    initializeTabs();
    initializeModals();
});

// Load site data into page
function loadSiteData() {
    document.getElementById('siteName').textContent = siteData.name;
    document.getElementById('siteLocation').textContent = siteData.location;
    document.getElementById('siteRating').textContent = siteData.rating;
    document.getElementById('reviewCount').textContent = siteData.reviewCount;
    document.getElementById('activeStudies').textContent = siteData.activeStudies;
    document.getElementById('completedStudies').textContent = siteData.completedStudies;
    document.getElementById('totalPatients').textContent = siteData.totalPatients.toLocaleString();
    document.getElementById('teamSize').textContent = siteData.teamSize;
    document.getElementById('siteDescription').textContent = siteData.description;
}

// Initialize tab functionality
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
            
            // Scroll to top of content
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// Initialize modals
function initializeModals() {
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Message sent successfully!', 'success');
            closeModal('contactModal');
            this.reset();
        });
    }
    
    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
}

// Contact site function
function contactSite() {
    const modal = document.getElementById('contactModal');
    modal.classList.add('active');
}

// Send questionnaire function
function sendQuestionnaire() {
    showNotification('Redirecting to questionnaire builder...', 'info');
    setTimeout(() => {
        window.location.href = 'questionnaire-builder.html';
    }, 1500);
}

// Share profile function
function shareProfile() {
    const url = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: siteData.name,
            text: `Check out ${siteData.name} on FeasiQuest`,
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

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style notification
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
    
    // Set background color based on type
    const colors = {
        success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        info: 'linear-gradient(135deg, #00f0ff 0%, #b026ff 100%)',
        warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
    };
    notification.style.background = colors[type] || colors.info;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
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

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key to close modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            closeModal(modal.id);
        });
    }
    
    // Number keys to switch tabs (1-9)
    if (e.key >= '1' && e.key <= '9') {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const index = parseInt(e.key) - 1;
        if (tabButtons[index]) {
            tabButtons[index].click();
        }
    }
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Print profile function
function printProfile() {
    window.print();
}

// Export profile data
function exportProfile() {
    const data = {
        ...siteData,
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${siteData.name.replace(/\s+/g, '_')}_profile.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Profile data exported successfully!', 'success');
}

// Add to favorites
function addToFavorites() {
    // In a real app, this would save to database
    const favorites = JSON.parse(localStorage.getItem('favoriteSites') || '[]');
    
    if (!favorites.includes(siteData.name)) {
        favorites.push(siteData.name);
        localStorage.setItem('favoriteSites', JSON.stringify(favorites));
        showNotification('Site added to favorites!', 'success');
    } else {
        showNotification('Site already in favorites', 'info');
    }
}

// Compare with other sites
function compareWithOthers() {
    showNotification('Redirecting to comparison tool...', 'info');
    setTimeout(() => {
        window.location.href = 'site-comparison.html';
    }, 1500);
}

// Request site visit
function requestSiteVisit() {
    showNotification('Site visit request form opening...', 'info');
    // In a real app, this would open a site visit request form
}

// Download documents
document.querySelectorAll('.document-item button').forEach(button => {
    button.addEventListener('click', function() {
        const docName = this.closest('.document-item').querySelector('h4').textContent;
        showNotification(`Downloading ${docName}...`, 'info');
        // In a real app, this would trigger actual download
    });
});

// Video player
document.querySelector('.video-placeholder')?.addEventListener('click', function() {
    showNotification('Video player would open here', 'info');
    // In a real app, this would open video player
});

// Image lightbox
document.querySelectorAll('.media-item img').forEach(img => {
    img.addEventListener('click', function() {
        // In a real app, this would open image in lightbox
        showNotification('Image lightbox would open here', 'info');
    });
});

// Track page views (analytics)
function trackPageView() {
    // In a real app, this would send analytics data
    console.log('Page view tracked:', {
        siteName: siteData.name,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    });
}

// Initialize analytics
trackPageView();

// Export functions for global use
window.contactSite = contactSite;
window.sendQuestionnaire = sendQuestionnaire;
window.shareProfile = shareProfile;
window.closeModal = closeModal;
window.printProfile = printProfile;
window.exportProfile = exportProfile;
window.addToFavorites = addToFavorites;
window.compareWithOthers = compareWithOthers;
window.requestSiteVisit = requestSiteVisit;