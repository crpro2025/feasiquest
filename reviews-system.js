// Reviews System JavaScript

// Demo reviews data
const demoReviews = [
    {
        id: 1,
        siteName: "Advanced Clinical Research Center",
        siteId: "site1",
        reviewerName: "Dr. Jennifer Martinez",
        reviewerTitle: "Medical Director, Global Pharma Inc.",
        reviewerInitials: "JM",
        verified: true,
        date: "2024-01-15",
        overallRating: 5,
        detailedRatings: {
            enrollment: 5,
            data: 5,
            communication: 5,
            compliance: 5,
            startup: 4
        },
        title: "Exceptional Site with Outstanding Performance",
        content: "We've worked with Advanced Clinical Research Center on multiple Phase III oncology trials, and they consistently exceed expectations. Their enrollment rates are 30% above industry average, and data quality is impeccable. The team is highly responsive and proactive in addressing any issues. Site startup was completed in just 35 days, well ahead of our 60-day target.",
        pros: "Fast enrollment, excellent data quality, responsive team, state-of-the-art facilities",
        cons: "None significant - minor delays in document submission occasionally",
        therapeuticArea: "oncology",
        studyPhase: "3",
        recommend: "yes",
        helpful: 45,
        comments: 8
    },
    {
        id: 2,
        siteName: "Boston Medical Research Institute",
        siteId: "site2",
        reviewerName: "Dr. Robert Thompson",
        reviewerTitle: "Clinical Operations Manager, BioTech Solutions",
        reviewerInitials: "RT",
        verified: true,
        date: "2024-01-10",
        overallRating: 4,
        detailedRatings: {
            enrollment: 4,
            data: 5,
            communication: 4,
            compliance: 5,
            startup: 3
        },
        title: "Solid Performance on Cardiovascular Trial",
        content: "Boston Medical Research Institute demonstrated strong capabilities in our Phase II cardiovascular study. Data quality was excellent with 98% protocol compliance. Communication was generally good, though response times could be improved during peak periods. Enrollment met targets, and the PI's expertise in cardiology was evident throughout the study.",
        pros: "Excellent data quality, strong PI expertise, good patient retention",
        cons: "Slower response times during busy periods, startup took longer than expected",
        therapeuticArea: "cardiology",
        studyPhase: "2",
        recommend: "yes",
        helpful: 32,
        comments: 5
    },
    {
        id: 3,
        siteName: "Precision Clinical Trials",
        siteId: "site3",
        reviewerName: "Sarah Williams",
        reviewerTitle: "Project Manager, Clinical Research CRO",
        reviewerInitials: "SW",
        verified: true,
        date: "2024-01-05",
        overallRating: 5,
        detailedRatings: {
            enrollment: 5,
            data: 5,
            communication: 5,
            compliance: 4,
            startup: 5
        },
        title: "Top-Tier Site for Neurology Studies",
        content: "Precision Clinical Trials has been our go-to site for neurology studies for the past 3 years. They have an exceptional patient database and consistently meet or exceed enrollment targets. The research coordinators are highly experienced and detail-oriented. Site startup is remarkably fast - we were enrolling patients within 30 days of site selection.",
        pros: "Fast startup, excellent enrollment, experienced team, great patient database",
        cons: "Premium pricing compared to other sites",
        therapeuticArea: "neurology",
        studyPhase: "3",
        recommend: "yes",
        helpful: 56,
        comments: 12
    },
    {
        id: 4,
        siteName: "Metro Health Research Center",
        siteId: "site4",
        reviewerName: "Dr. Michael Chen",
        reviewerTitle: "VP Clinical Development, Pharma Corp",
        reviewerInitials: "MC",
        verified: true,
        date: "2023-12-28",
        overallRating: 3,
        detailedRatings: {
            enrollment: 3,
            data: 4,
            communication: 3,
            compliance: 4,
            startup: 2
        },
        title: "Mixed Experience - Room for Improvement",
        content: "Our experience with Metro Health Research Center was mixed. While data quality was good and protocol compliance was acceptable, enrollment was slower than projected. Communication could be more proactive - we often had to follow up multiple times for updates. Site startup took 75 days, significantly longer than the 45-day target.",
        pros: "Good data quality, experienced PI, adequate facilities",
        cons: "Slow enrollment, delayed startup, communication needs improvement",
        therapeuticArea: "diabetes",
        studyPhase: "2",
        recommend: "maybe",
        helpful: 18,
        comments: 3
    },
    {
        id: 5,
        siteName: "Coastal Clinical Studies",
        siteId: "site5",
        reviewerName: "Emily Rodriguez",
        reviewerTitle: "Clinical Trial Manager, Research Partners",
        reviewerInitials: "ER",
        verified: true,
        date: "2023-12-20",
        overallRating: 4,
        detailedRatings: {
            enrollment: 4,
            data: 4,
            communication: 5,
            compliance: 4,
            startup: 4
        },
        title: "Great Communication and Patient Care",
        content: "Coastal Clinical Studies impressed us with their patient-centric approach and excellent communication. The team was always available and proactive in providing updates. Enrollment was steady, and patient retention was excellent at 94%. The site's diverse patient population was a major advantage for our study requirements.",
        pros: "Excellent communication, diverse patient population, patient-centric care",
        cons: "Facilities could use some updates, limited parking for patients",
        therapeuticArea: "respiratory",
        studyPhase: "3",
        recommend: "yes",
        helpful: 28,
        comments: 6
    }
];

// State
let currentPage = 1;
let reviewsPerPage = 5;
let filteredReviews = [...demoReviews];
let selectedRating = 0;
let detailedRatings = {};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadReviews();
    initializeFilters();
    initializeStarRatings();
    initializeFormValidation();
});

// Load reviews
function loadReviews() {
    const reviewsList = document.getElementById('reviewsList');
    
    if (filteredReviews.length === 0) {
        reviewsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📝</div>
                <h3>No Reviews Found</h3>
                <p>Try adjusting your filters to see more reviews</p>
            </div>
        `;
        return;
    }
    
    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    const pageReviews = filteredReviews.slice(startIndex, endIndex);
    
    reviewsList.innerHTML = pageReviews.map(review => createReviewCard(review)).join('');
    
    updatePagination();
    attachReviewListeners();
}

// Create review card HTML
function createReviewCard(review) {
    const stars = '⭐'.repeat(review.overallRating);
    const detailedRatingsHTML = Object.entries(review.detailedRatings).map(([key, value]) => {
        const label = key.charAt(0).toUpperCase() + key.slice(1);
        const stars = '⭐'.repeat(value);
        return `
            <div class="rating-detail">
                <span class="rating-detail-label">${label}</span>
                <span class="rating-detail-stars">${stars}</span>
            </div>
        `;
    }).join('');
    
    const recommendBadge = review.recommend === 'yes' 
        ? '<div class="recommend-badge">✓ Would Work Again</div>'
        : review.recommend === 'maybe'
        ? '<div class="recommend-badge" style="background: rgba(251, 191, 36, 0.2); border-color: rgba(251, 191, 36, 0.4); color: #fbbf24;">? Maybe</div>'
        : '<div class="recommend-badge" style="background: rgba(239, 68, 68, 0.2); border-color: rgba(239, 68, 68, 0.4); color: #ef4444;">✗ Would Not Work Again</div>';
    
    return `
        <div class="review-card" data-review-id="${review.id}">
            <div class="review-header-section">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">${review.reviewerInitials}</div>
                    <div class="reviewer-details">
                        <h3>${review.reviewerName}</h3>
                        <div class="reviewer-meta">
                            <span>${review.reviewerTitle}</span>
                            ${review.verified ? '<span class="verified-badge">✓ Verified</span>' : ''}
                        </div>
                    </div>
                </div>
                <div class="review-rating-section">
                    <div class="review-stars">${stars}</div>
                    <div class="review-date">${formatDate(review.date)}</div>
                </div>
            </div>
            
            <div class="site-info">
                <span>📍</span>
                <span class="site-name">${review.siteName}</span>
            </div>
            
            <h2 class="review-title">${review.title}</h2>
            
            <p class="review-content">${review.content}</p>
            
            <div class="review-tags">
                <span class="review-tag">Phase ${review.studyPhase}</span>
                <span class="review-tag">${review.therapeuticArea.charAt(0).toUpperCase() + review.therapeuticArea.slice(1)}</span>
            </div>
            
            <div class="detailed-ratings-display">
                ${detailedRatingsHTML}
            </div>
            
            <div class="review-footer">
                <div class="review-actions">
                    <button class="action-btn helpful-btn" data-review-id="${review.id}">
                        <span>👍</span>
                        <span>Helpful (${review.helpful})</span>
                    </button>
                    <button class="action-btn comment-btn" data-review-id="${review.id}">
                        <span>💬</span>
                        <span>Comments (${review.comments})</span>
                    </button>
                </div>
                ${recommendBadge}
            </div>
        </div>
    `;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
}

// Initialize filters
function initializeFilters() {
    const searchInput = document.getElementById('searchInput');
    const ratingFilter = document.getElementById('ratingFilter');
    const sortFilter = document.getElementById('sortFilter');
    const therapeuticFilter = document.getElementById('therapeuticFilter');
    
    searchInput.addEventListener('input', applyFilters);
    ratingFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);
    therapeuticFilter.addEventListener('change', applyFilters);
}

// Apply filters
function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const ratingFilter = document.getElementById('ratingFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    const therapeuticFilter = document.getElementById('therapeuticFilter').value;
    
    // Filter
    filteredReviews = demoReviews.filter(review => {
        const matchesSearch = !searchTerm || 
            review.siteName.toLowerCase().includes(searchTerm) ||
            review.reviewerName.toLowerCase().includes(searchTerm) ||
            review.content.toLowerCase().includes(searchTerm);
        
        const matchesRating = !ratingFilter || review.overallRating === parseInt(ratingFilter);
        const matchesTherapeutic = !therapeuticFilter || review.therapeuticArea === therapeuticFilter;
        
        return matchesSearch && matchesRating && matchesTherapeutic;
    });
    
    // Sort
    switch(sortFilter) {
        case 'recent':
            filteredReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'helpful':
            filteredReviews.sort((a, b) => b.helpful - a.helpful);
            break;
        case 'rating-high':
            filteredReviews.sort((a, b) => b.overallRating - a.overallRating);
            break;
        case 'rating-low':
            filteredReviews.sort((a, b) => a.overallRating - b.overallRating);
            break;
    }
    
    currentPage = 1;
    loadReviews();
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
    document.getElementById('currentPage').textContent = currentPage;
    document.getElementById('totalPages').textContent = totalPages;
    
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    
    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            loadReviews();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    
    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            loadReviews();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
}

// Attach review listeners
function attachReviewListeners() {
    // Review card clicks
    document.querySelectorAll('.review-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.action-btn')) {
                const reviewId = parseInt(this.dataset.reviewId);
                showReviewDetail(reviewId);
            }
        });
    });
    
    // Helpful buttons
    document.querySelectorAll('.helpful-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const reviewId = parseInt(this.dataset.reviewId);
            markHelpful(reviewId, this);
        });
    });
    
    // Comment buttons
    document.querySelectorAll('.comment-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const reviewId = parseInt(this.dataset.reviewId);
            showComments(reviewId);
        });
    });
}

// Mark helpful
function markHelpful(reviewId, button) {
    const review = demoReviews.find(r => r.id === reviewId);
    if (review) {
        review.helpful++;
        button.querySelector('span:last-child').textContent = `Helpful (${review.helpful})`;
        button.classList.add('active');
        showNotification('Thank you for your feedback!', 'success');
    }
}

// Show comments
function showComments(reviewId) {
    showNotification('Comments feature coming soon!', 'info');
}

// Show review detail
function showReviewDetail(reviewId) {
    const review = demoReviews.find(r => r.id === reviewId);
    if (!review) return;
    
    const modal = document.getElementById('reviewDetailModal');
    const content = document.getElementById('reviewDetailContent');
    
    const stars = '⭐'.repeat(review.overallRating);
    
    content.innerHTML = `
        <div class="review-detail-full">
            <div class="reviewer-info" style="margin-bottom: 2rem;">
                <div class="reviewer-avatar" style="width: 80px; height: 80px; font-size: 2rem;">${review.reviewerInitials}</div>
                <div class="reviewer-details" style="margin-left: 1rem;">
                    <h3 style="font-size: 1.5rem;">${review.reviewerName}</h3>
                    <p style="color: rgba(255, 255, 255, 0.7);">${review.reviewerTitle}</p>
                    ${review.verified ? '<span class="verified-badge">✓ Verified Reviewer</span>' : ''}
                </div>
            </div>
            
            <div style="margin-bottom: 2rem;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">${stars}</div>
                <h2 style="font-size: 1.8rem; margin-bottom: 1rem;">${review.title}</h2>
                <div style="color: rgba(255, 255, 255, 0.6); margin-bottom: 1rem;">
                    Reviewed ${formatDate(review.date)} • ${review.siteName}
                </div>
            </div>
            
            <div style="margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem;">Full Review</h3>
                <p style="line-height: 1.8; color: rgba(255, 255, 255, 0.8);">${review.content}</p>
            </div>
            
            ${review.pros ? `
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="color: #10b981; margin-bottom: 0.5rem;">✓ Pros</h4>
                    <p style="color: rgba(255, 255, 255, 0.8);">${review.pros}</p>
                </div>
            ` : ''}
            
            ${review.cons ? `
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="color: #ef4444; margin-bottom: 0.5rem;">✗ Cons</h4>
                    <p style="color: rgba(255, 255, 255, 0.8);">${review.cons}</p>
                </div>
            ` : ''}
            
            <div style="margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem;">Detailed Ratings</h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                    ${Object.entries(review.detailedRatings).map(([key, value]) => `
                        <div style="padding: 1rem; background: rgba(255, 255, 255, 0.05); border-radius: 0.5rem;">
                            <div style="color: rgba(255, 255, 255, 0.7); margin-bottom: 0.5rem;">${key.charAt(0).toUpperCase() + key.slice(1)}</div>
                            <div style="color: #fbbf24; font-size: 1.2rem;">${'⭐'.repeat(value)}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

// Initialize star ratings
function initializeStarRatings() {
    document.querySelectorAll('.star-rating').forEach(rating => {
        const stars = rating.querySelectorAll('.star');
        const category = rating.dataset.category;
        
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = parseInt(this.dataset.rating);
                
                // Update visual state
                stars.forEach(s => {
                    const sValue = parseInt(s.dataset.rating);
                    if (sValue <= value) {
                        s.classList.add('active');
                        s.textContent = '★';
                    } else {
                        s.classList.remove('active');
                        s.textContent = '☆';
                    }
                });
                
                // Store rating
                if (category) {
                    detailedRatings[category] = value;
                } else {
                    selectedRating = value;
                    document.getElementById('ratingValue').value = value;
                }
            });
            
            star.addEventListener('mouseenter', function() {
                const value = parseInt(this.dataset.rating);
                stars.forEach(s => {
                    const sValue = parseInt(s.dataset.rating);
                    s.textContent = sValue <= value ? '★' : '☆';
                });
            });
        });
        
        rating.addEventListener('mouseleave', function() {
            const currentValue = category ? (detailedRatings[category] || 0) : selectedRating;
            stars.forEach(s => {
                const sValue = parseInt(s.dataset.rating);
                s.textContent = sValue <= currentValue ? '★' : '☆';
            });
        });
    });
}

// Initialize form validation
function initializeFormValidation() {
    const form = document.getElementById('reviewForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (selectedRating === 0) {
                showNotification('Please select an overall rating', 'error');
                return;
            }
            
            showNotification('Review submitted successfully!', 'success');
            closeReviewModal();
            form.reset();
            selectedRating = 0;
            detailedRatings = {};
        });
    }
    
    // Character counter
    const textarea = form.querySelector('textarea[rows="6"]');
    if (textarea) {
        textarea.addEventListener('input', function() {
            const charCount = this.value.length;
            const counter = this.parentElement.querySelector('.char-count');
            counter.textContent = `${charCount} / 2000 characters`;
            
            if (charCount > 2000) {
                counter.style.color = '#ef4444';
            } else {
                counter.style.color = 'rgba(255, 255, 255, 0.5)';
            }
        });
    }
}

// Open review modal
function openReviewModal() {
    document.getElementById('reviewModal').classList.add('active');
}

// Close review modal
function closeReviewModal() {
    document.getElementById('reviewModal').classList.remove('active');
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
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

// Export functions
window.openReviewModal = openReviewModal;
window.closeReviewModal = closeReviewModal;
window.closeModal = closeModal;