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

// Card Detail Modal Functions
function openCardDetail(cardType) {
    const modal = document.getElementById('cardDetailModal');
    const title = document.getElementById('cardDetailTitle');
    const body = document.getElementById('cardDetailBody');
    
    // Set content based on card type
    switch(cardType) {
        case 'contact':
            title.textContent = 'Contact Information';
            body.innerHTML = `
                <div style="display: grid; gap: 2rem;">
                    <div>
                        <h3 style="color: #00f0ff; margin-bottom: 1rem;">Primary Contact</h3>
                        <div style="display: grid; gap: 1rem;">
                            <div style="padding: 1rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem; border: 1px solid rgba(0, 240, 255, 0.2);">
                                <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.9rem;">Email</div>
                                <div style="color: white; font-size: 1.1rem; margin-top: 0.25rem;">contact@acrc.com</div>
                                <button onclick="window.location.href='mailto:contact@acrc.com'" style="margin-top: 0.5rem; padding: 0.5rem 1rem; background: linear-gradient(135deg, #00f0ff 0%, #b026ff 100%); border: none; border-radius: 0.5rem; color: white; cursor: pointer;">Send Email</button>
                            </div>
                            <div style="padding: 1rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem; border: 1px solid rgba(0, 240, 255, 0.2);">
                                <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.9rem;">Phone</div>
                                <div style="color: white; font-size: 1.1rem; margin-top: 0.25rem;">+1 (617) 555-0123</div>
                                <button onclick="window.location.href='tel:+16175550123'" style="margin-top: 0.5rem; padding: 0.5rem 1rem; background: linear-gradient(135deg, #00f0ff 0%, #b026ff 100%); border: none; border-radius: 0.5rem; color: white; cursor: pointer;">Call Now</button>
                            </div>
                            <div style="padding: 1rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem; border: 1px solid rgba(0, 240, 255, 0.2);">
                                <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.9rem;">Website</div>
                                <div style="color: white; font-size: 1.1rem; margin-top: 0.25rem;">www.acrc.com</div>
                                <button onclick="window.open('https://www.acrc.com', '_blank')" style="margin-top: 0.5rem; padding: 0.5rem 1rem; background: linear-gradient(135deg, #00f0ff 0%, #b026ff 100%); border: none; border-radius: 0.5rem; color: white; cursor: pointer;">Visit Website</button>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h3 style="color: #00f0ff; margin-bottom: 1rem;">Physical Address</h3>
                        <div style="padding: 1.5rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem; border: 1px solid rgba(0, 240, 255, 0.2);">
                            <div style="color: white; font-size: 1.1rem; line-height: 1.8;">
                                Advanced Clinical Research Center<br>
                                123 Medical Plaza, Suite 400<br>
                                Boston, MA 02115<br>
                                United States
                            </div>
                            <button onclick="window.open('https://maps.google.com/?q=123+Medical+Plaza+Boston+MA', '_blank')" style="margin-top: 1rem; padding: 0.5rem 1rem; background: linear-gradient(135deg, #00f0ff 0%, #b026ff 100%); border: none; border-radius: 0.5rem; color: white; cursor: pointer;">View on Map</button>
                        </div>
                    </div>
                    
                    <div>
                        <h3 style="color: #00f0ff; margin-bottom: 1rem;">Business Hours</h3>
                        <div style="padding: 1.5rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem; border: 1px solid rgba(0, 240, 255, 0.2);">
                            <div style="display: grid; gap: 0.5rem; color: white;">
                                <div style="display: flex; justify-content: space-between;">
                                    <span>Monday - Friday:</span>
                                    <span style="color: #00f0ff;">8:00 AM - 6:00 PM</span>
                                </div>
                                <div style="display: flex; justify-content: space-between;">
                                    <span>Saturday:</span>
                                    <span style="color: #00f0ff;">9:00 AM - 2:00 PM</span>
                                </div>
                                <div style="display: flex; justify-content: space-between;">
                                    <span>Sunday:</span>
                                    <span style="color: rgba(255, 255, 255, 0.5);">Closed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h3 style="color: #00f0ff; margin-bottom: 1rem;">Key Personnel</h3>
                        <div style="display: grid; gap: 1rem;">
                            <div style="padding: 1rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem; border: 1px solid rgba(0, 240, 255, 0.2);">
                                <div style="color: #00f0ff; font-weight: 600;">Dr. Sarah Johnson</div>
                                <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem;">Principal Investigator</div>
                                <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.85rem; margin-top: 0.5rem;">s.johnson@acrc.com</div>
                            </div>
                            <div style="padding: 1rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem; border: 1px solid rgba(0, 240, 255, 0.2);">
                                <div style="color: #00f0ff; font-weight: 600;">Michael Chen</div>
                                <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem;">Clinical Research Coordinator</div>
                                <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.85rem; margin-top: 0.5rem;">m.chen@acrc.com</div>
                            </div>
                            <div style="padding: 1rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem; border: 1px solid rgba(0, 240, 255, 0.2);">
                                <div style="color: #00f0ff; font-weight: 600;">Emily Rodriguez</div>
                                <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem;">Study Manager</div>
                                <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.85rem; margin-top: 0.5rem;">e.rodriguez@acrc.com</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'certifications':
            title.textContent = 'Certifications & Accreditations';
            body.innerHTML = `
                <div style="display: grid; gap: 2rem;">
                    <div>
                        <h3 style="color: #00f0ff; margin-bottom: 1rem;">Active Certifications</h3>
                        <div style="display: grid; gap: 1rem;">
                            <div style="padding: 1.5rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem; border: 1px solid rgba(16, 185, 129, 0.3);">
                                <div style="display: flex; justify-content: space-between; align-items: start;">
                                    <div>
                                        <div style="color: #10b981; font-weight: 600; font-size: 1.1rem;">✓ ACRP Certified</div>
                                        <div style="color: rgba(255, 255, 255, 0.7); margin-top: 0.5rem;">Association of Clinical Research Professionals</div>
                                        <div style="color: rgba(255, 255, 255, 0.5); font-size: 0.9rem; margin-top: 0.5rem;">Certified: January 2020</div>
                                        <div style="color: rgba(255, 255, 255, 0.5); font-size: 0.9rem;">Expires: January 2026</div>
                                    </div>
                                    <span style="background: rgba(16, 185, 129, 0.2); color: #10b981; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.85rem;">Active</span>
                                </div>
                            </div>
                            
                            <div style="padding: 1.5rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem; border: 1px solid rgba(16, 185, 129, 0.3);">
                                <div style="display: flex; justify-content: space-between; align-items: start;">
                                    <div>
                                        <div style="color: #10b981; font-weight: 600; font-size: 1.1rem;">✓ CAP Accredited</div>
                                        <div style="color: rgba(255, 255, 255, 0.7); margin-top: 0.5rem;">College of American Pathologists</div>
                                        <div style="color: rgba(255, 255, 255, 0.5); font-size: 0.9rem; margin-top: 0.5rem;">Certified: March 2019</div>
                                        <div style="color: rgba(255, 255, 255, 0.5); font-size: 0.9rem;">Expires: March 2025</div>
                                    </div>
                                    <span style="background: rgba(16, 185, 129, 0.2); color: #10b981; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.85rem;">Active</span>
                                </div>
                            </div>
                            
                            <div style="padding: 1.5rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem; border: 1px solid rgba(16, 185, 129, 0.3);">
                                <div style="display: flex; justify-content: space-between; align-items: start;">
                                    <div>
                                        <div style="color: #10b981; font-weight: 600; font-size: 1.1rem;">✓ CLIA Certified</div>
                                        <div style="color: rgba(255, 255, 255, 0.7); margin-top: 0.5rem;">Clinical Laboratory Improvement Amendments</div>
                                        <div style="color: rgba(255, 255, 255, 0.5); font-size: 0.9rem; margin-top: 0.5rem;">Certified: June 2018</div>
                                        <div style="color: rgba(255, 255, 255, 0.5); font-size: 0.9rem;">Expires: June 2026</div>
                                    </div>
                                    <span style="background: rgba(16, 185, 129, 0.2); color: #10b981; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.85rem;">Active</span>
                                </div>
                            </div>
                            
                            <div style="padding: 1.5rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem; border: 1px solid rgba(16, 185, 129, 0.3);">
                                <div style="display: flex; justify-content: space-between; align-items: start;">
                                    <div>
                                        <div style="color: #10b981; font-weight: 600; font-size: 1.1rem;">✓ AAHRPP Accredited</div>
                                        <div style="color: rgba(255, 255, 255, 0.7); margin-top: 0.5rem;">Association for the Accreditation of Human Research Protection Programs</div>
                                        <div style="color: rgba(255, 255, 255, 0.5); font-size: 0.9rem; margin-top: 0.5rem;">Certified: September 2021</div>
                                        <div style="color: rgba(255, 255, 255, 0.5); font-size: 0.9rem;">Expires: September 2027</div>
                                    </div>
                                    <span style="background: rgba(16, 185, 129, 0.2); color: #10b981; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.85rem;">Active</span>
                                </div>
                            </div>
                            
                            <div style="padding: 1.5rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem; border: 1px solid rgba(16, 185, 129, 0.3);">
                                <div style="display: flex; justify-content: space-between; align-items: start;">
                                    <div>
                                        <div style="color: #10b981; font-weight: 600; font-size: 1.1rem;">✓ ISO 9001:2015</div>
                                        <div style="color: rgba(255, 255, 255, 0.7); margin-top: 0.5rem;">Quality Management System</div>
                                        <div style="color: rgba(255, 255, 255, 0.5); font-size: 0.9rem; margin-top: 0.5rem;">Certified: December 2020</div>
                                        <div style="color: rgba(255, 255, 255, 0.5); font-size: 0.9rem;">Expires: December 2026</div>
                                    </div>
                                    <span style="background: rgba(16, 185, 129, 0.2); color: #10b981; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.85rem;">Active</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h3 style="color: #00f0ff; margin-bottom: 1rem;">Compliance & Regulatory</h3>
                        <div style="padding: 1.5rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem; border: 1px solid rgba(0, 240, 255, 0.2);">
                            <div style="display: grid; gap: 1rem; color: white;">
                                <div style="display: flex; align-items: center; gap: 1rem;">
                                    <span style="color: #10b981; font-size: 1.5rem;">✓</span>
                                    <div>
                                        <div style="font-weight: 600;">FDA Inspections</div>
                                        <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem;">Last inspection: March 2024 - No findings</div>
                                    </div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 1rem;">
                                    <span style="color: #10b981; font-size: 1.5rem;">✓</span>
                                    <div>
                                        <div style="font-weight: 600;">GCP Compliance</div>
                                        <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem;">ICH-GCP E6(R2) compliant</div>
                                    </div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 1rem;">
                                    <span style="color: #10b981; font-size: 1.5rem;">✓</span>
                                    <div>
                                        <div style="font-weight: 600;">HIPAA Compliant</div>
                                        <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem;">Full HIPAA compliance with annual audits</div>
                                    </div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 1rem;">
                                    <span style="color: #10b981; font-size: 1.5rem;">✓</span>
                                    <div>
                                        <div style="font-weight: 600;">IRB Approved</div>
                                        <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem;">Central IRB and local IRB options available</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'languages':
            title.textContent = 'Languages & Cultural Competency';
            body.innerHTML = `
                <div style="display: grid; gap: 2rem;">
                    <div>
                        <h3 style="color: #00f0ff; margin-bottom: 1rem;">Languages Spoken by Staff</h3>
                        <div style="display: grid; gap: 1rem;">
                            <div style="padding: 1.5rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem; border: 1px solid rgba(176, 38, 255, 0.3);">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="color: #b026ff; font-weight: 600; font-size: 1.1rem;">English</div>
                                        <div style="color: rgba(255, 255, 255, 0.7); margin-top: 0.5rem;">Primary language - All staff fluent</div>
                                    </div>
                                    <span style="background: rgba(176, 38, 255, 0.2); color: #b026ff; padding: 0.5rem 1rem; border-radius: 1rem;">45 staff members</span>
                                </div>
                            </div>
                            
                            <div style="padding: 1.5rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem; border: 1px solid rgba(176, 38, 255, 0.3);">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="color: #b026ff; font-weight: 600; font-size: 1.1rem;">Spanish</div>
                                        <div style="color: rgba(255, 255, 255, 0.7); margin-top: 0.5rem;">Fluent speakers available for patient interactions</div>
                                    </div>
                                    <span style="background: rgba(176, 38, 255, 0.2); color: #b026ff; padding: 0.5rem 1rem; border-radius: 1rem;">12 staff members</span>
                                </div>
                            </div>
                            
                            <div style="padding: 1.5rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem; border: 1px solid rgba(176, 38, 255, 0.3);">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="color: #b026ff; font-weight: 600; font-size: 1.1rem;">Mandarin Chinese</div>
                                        <div style="color: rgba(255, 255, 255, 0.7); margin-top: 0.5rem;">Native speakers for Chinese-speaking patients</div>
                                    </div>
                                    <span style="background: rgba(176, 38, 255, 0.2); color: #b026ff; padding: 0.5rem 1rem; border-radius: 1rem;">5 staff members</span>
                                </div>
                            </div>
                            
                            <div style="padding: 1.5rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem; border: 1px solid rgba(176, 38, 255, 0.3);">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="color: #b026ff; font-weight: 600; font-size: 1.1rem;">French</div>
                                        <div style="color: rgba(255, 255, 255, 0.7); margin-top: 0.5rem;">Conversational to fluent speakers</div>
                                    </div>
                                    <span style="background: rgba(176, 38, 255, 0.2); color: #b026ff; padding: 0.5rem 1rem; border-radius: 1rem;">3 staff members</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h3 style="color: #00f0ff; margin-bottom: 1rem;">Translation Services</h3>
                        <div style="padding: 1.5rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem; border: 1px solid rgba(0, 240, 255, 0.2);">
                            <div style="display: grid; gap: 1rem; color: white;">
                                <div style="display: flex; align-items: center; gap: 1rem;">
                                    <span style="color: #00f0ff; font-size: 1.5rem;">✓</span>
                                    <div>
                                        <div style="font-weight: 600;">Professional Translation Services</div>
                                        <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem;">Available for 50+ languages via certified translators</div>
                                    </div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 1rem;">
                                    <span style="color: #00f0ff; font-size: 1.5rem;">✓</span>
                                    <div>
                                        <div style="font-weight: 600;">Document Translation</div>
                                        <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem;">Informed consent forms, patient materials, study documents</div>
                                    </div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 1rem;">
                                    <span style="color: #00f0ff; font-size: 1.5rem;">✓</span>
                                    <div>
                                        <div style="font-weight: 600;">Interpretation Services</div>
                                        <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem;">On-site and remote interpretation for patient visits</div>
                                    </div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 1rem;">
                                    <span style="color: #00f0ff; font-size: 1.5rem;">✓</span>
                                    <div>
                                        <div style="font-weight: 600;">24/7 Language Line</div>
                                        <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem;">Emergency translation services available around the clock</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h3 style="color: #00f0ff; margin-bottom: 1rem;">Cultural Competency</h3>
                        <div style="padding: 1.5rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem; border: 1px solid rgba(0, 240, 255, 0.2);">
                            <div style="display: grid; gap: 1rem; color: white;">
                                <div>
                                    <div style="font-weight: 600; color: #00f0ff; margin-bottom: 0.5rem;">Diversity Training</div>
                                    <div style="color: rgba(255, 255, 255, 0.7);">All staff complete annual cultural competency and diversity training programs</div>
                                </div>
                                <div>
                                    <div style="font-weight: 600; color: #00f0ff; margin-bottom: 0.5rem;">Community Partnerships</div>
                                    <div style="color: rgba(255, 255, 255, 0.7);">Active partnerships with local cultural organizations and community health centers</div>
                                </div>
                                <div>
                                    <div style="font-weight: 600; color: #00f0ff; margin-bottom: 0.5rem;">Inclusive Environment</div>
                                    <div style="color: rgba(255, 255, 255, 0.7);">Welcoming space for patients of all backgrounds, with culturally appropriate materials and practices</div>
                                </div>
                                <div>
                                    <div style="font-weight: 600; color: #00f0ff; margin-bottom: 0.5rem;">Religious Accommodations</div>
                                    <div style="color: rgba(255, 255, 255, 0.7);">Flexible scheduling and accommodations for religious observances and dietary requirements</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h3 style="color: #00f0ff; margin-bottom: 1rem;">Patient Demographics Served</h3>
                        <div style="padding: 1.5rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem; border: 1px solid rgba(0, 240, 255, 0.2);">
                            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; color: white;">
                                <div>
                                    <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.9rem;">Caucasian</div>
                                    <div style="color: #00f0ff; font-size: 1.2rem; font-weight: 600;">45%</div>
                                </div>
                                <div>
                                    <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.9rem;">Hispanic/Latino</div>
                                    <div style="color: #00f0ff; font-size: 1.2rem; font-weight: 600;">25%</div>
                                </div>
                                <div>
                                    <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.9rem;">African American</div>
                                    <div style="color: #00f0ff; font-size: 1.2rem; font-weight: 600;">15%</div>
                                </div>
                                <div>
                                    <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.9rem;">Asian</div>
                                    <div style="color: #00f0ff; font-size: 1.2rem; font-weight: 600;">12%</div>
                                </div>
                                <div>
                                    <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.9rem;">Other</div>
                                    <div style="color: #00f0ff; font-size: 1.2rem; font-weight: 600;">3%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCardDetail() {
    const modal = document.getElementById('cardDetailModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on outside click
document.addEventListener('click', function(e) {
    const modal = document.getElementById('cardDetailModal');
    if (e.target === modal) {
        closeCardDetail();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCardDetail();
    }
});

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
window.openCardDetail = openCardDetail;
window.closeCardDetail = closeCardDetail;