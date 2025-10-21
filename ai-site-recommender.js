// ===================================
// AI SITE RECOMMENDER JAVASCRIPT
// ===================================

let selectedSites = [];

document.addEventListener('DOMContentLoaded', function() {
    initSiteRecommender();
});

function initSiteRecommender() {
    const form = document.getElementById('siteSearchForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        findOptimalSites();
    });
    
    // Sort functionality
    const sortBy = document.getElementById('sortBy');
    if (sortBy) {
        sortBy.addEventListener('change', function() {
            sortSites(this.value);
        });
    }
}

function findOptimalSites() {
    showNotification('AI analyzing 2,000+ sites...', 'info');
    
    // Show results section with animation
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.style.display = 'block';
    resultsSection.style.opacity = '0';
    
    setTimeout(() => {
        resultsSection.style.transition = 'opacity 0.5s ease';
        resultsSection.style.opacity = '1';
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    
    // Generate site recommendations
    setTimeout(() => {
        generateSiteRecommendations();
        showNotification('Found 25 optimal sites!', 'success');
    }, 1500);
}

function generateSiteRecommendations() {
    const therapeuticArea = document.getElementById('therapeuticArea').value;
    const targetEnrollment = parseInt(document.getElementById('targetEnrollment').value);
    const desiredSites = parseInt(document.getElementById('desiredSites').value);
    
    // Generate demo sites
    const sites = generateDemoSites(desiredSites, therapeuticArea);
    
    // Update summary metrics
    updateSummaryMetrics(sites, targetEnrollment);
    
    // Display site cards
    displaySiteCards(sites);
}

function generateDemoSites(count, therapeuticArea) {
    const sites = [];
    
    const siteNames = [
        'Johns Hopkins Medical Center',
        'Mayo Clinic Research Center',
        'Cleveland Clinic Foundation',
        'Massachusetts General Hospital',
        'Stanford Medical Center',
        'UCLA Medical Center',
        'Duke University Medical Center',
        'Northwestern Memorial Hospital',
        'UCSF Medical Center',
        'Mount Sinai Hospital',
        'Cedars-Sinai Medical Center',
        'NYU Langone Health',
        'University of Michigan Health',
        'Vanderbilt University Medical',
        'University of Pennsylvania Health',
        'Boston Medical Center',
        'University of Chicago Medicine',
        'University of Washington Medical',
        'Emory University Hospital',
        'University of Pittsburgh Medical',
        'Ohio State University Medical',
        'University of Texas MD Anderson',
        'Memorial Sloan Kettering',
        'Dana-Farber Cancer Institute',
        'Fred Hutchinson Cancer Center'
    ];
    
    const cities = [
        { city: 'Baltimore, MD', country: 'USA' },
        { city: 'Rochester, MN', country: 'USA' },
        { city: 'Cleveland, OH', country: 'USA' },
        { city: 'Boston, MA', country: 'USA' },
        { city: 'Stanford, CA', country: 'USA' },
        { city: 'Los Angeles, CA', country: 'USA' },
        { city: 'Durham, NC', country: 'USA' },
        { city: 'Chicago, IL', country: 'USA' },
        { city: 'San Francisco, CA', country: 'USA' },
        { city: 'New York, NY', country: 'USA' },
        { city: 'Los Angeles, CA', country: 'USA' },
        { city: 'New York, NY', country: 'USA' },
        { city: 'Ann Arbor, MI', country: 'USA' },
        { city: 'Nashville, TN', country: 'USA' },
        { city: 'Philadelphia, PA', country: 'USA' },
        { city: 'Boston, MA', country: 'USA' },
        { city: 'Chicago, IL', country: 'USA' },
        { city: 'Seattle, WA', country: 'USA' },
        { city: 'Atlanta, GA', country: 'USA' },
        { city: 'Pittsburgh, PA', country: 'USA' },
        { city: 'Columbus, OH', country: 'USA' },
        { city: 'Houston, TX', country: 'USA' },
        { city: 'New York, NY', country: 'USA' },
        { city: 'Boston, MA', country: 'USA' },
        { city: 'Seattle, WA', country: 'USA' }
    ];
    
    for (let i = 0; i < Math.min(count, siteNames.length); i++) {
        const matchScore = Math.round(85 + Math.random() * 15);
        const patientDatabase = Math.round(1000 + Math.random() * 4000);
        const completedStudies = Math.round(20 + Math.random() * 80);
        const enrollmentRate = (85 + Math.random() * 15).toFixed(1);
        
        sites.push({
            id: i + 1,
            name: siteNames[i],
            location: cities[i],
            matchScore: matchScore,
            patientDatabase: patientDatabase,
            completedStudies: completedStudies,
            enrollmentRate: enrollmentRate,
            therapeuticExperience: therapeuticArea,
            certifications: ['GCP', 'ACRP', 'CITI'],
            equipment: ['ECG', 'Lab', 'Imaging'],
            availability: i < 5 ? 'Immediate' : i < 15 ? 'Short-term' : 'Medium-term',
            cost: Math.round(120000 + Math.random() * 80000)
        });
    }
    
    // Sort by match score
    sites.sort((a, b) => b.matchScore - a.matchScore);
    
    return sites;
}

function updateSummaryMetrics(sites, targetEnrollment) {
    const matchCount = sites.length;
    const avgScore = Math.round(sites.reduce((sum, site) => sum + site.matchScore, 0) / sites.length);
    const totalPatients = sites.reduce((sum, site) => sum + site.patientDatabase, 0);
    const totalBudget = sites.reduce((sum, site) => sum + site.cost, 0);
    
    // Animate metrics
    animateMetric('matchCount', matchCount);
    animateMetric('avgScore', avgScore, '%');
    animateMetric('totalPatients', totalPatients);
    animateMetric('totalBudget', totalBudget, '$', true);
}

function animateMetric(elementId, targetValue, suffix = '', isCurrency = false) {
    const element = document.getElementById(elementId);
    let currentValue = 0;
    const increment = targetValue / 50;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        
        let displayValue = Math.round(currentValue);
        if (isCurrency) {
            displayValue = '$' + displayValue.toLocaleString();
        } else if (suffix) {
            displayValue = displayValue + suffix;
        } else {
            displayValue = displayValue.toLocaleString();
        }
        
        element.textContent = displayValue;
    }, 20);
}

function displaySiteCards(sites) {
    const container = document.getElementById('siteCardsContainer');
    container.innerHTML = '';
    
    sites.forEach(site => {
        const card = createSiteCard(site);
        container.appendChild(card);
    });
}

function createSiteCard(site) {
    const card = document.createElement('div');
    card.className = 'site-card';
    card.dataset.siteId = site.id;
    
    const scoreColor = site.matchScore >= 90 ? '#10b981' : site.matchScore >= 80 ? '#f59e0b' : '#dc2626';
    
    card.innerHTML = `
        <div class="site-match-score" style="background: ${scoreColor};">
            ${site.matchScore}%
        </div>
        <div class="site-header">
            <h3 class="site-name">${site.name}</h3>
            <p class="site-location">📍 ${site.location.city}, ${site.location.country}</p>
        </div>
        <div class="site-stats">
            <div class="site-stat">
                <div class="stat-value">${site.patientDatabase.toLocaleString()}</div>
                <div class="stat-label">Patients</div>
            </div>
            <div class="site-stat">
                <div class="stat-value">${site.completedStudies}</div>
                <div class="stat-label">Studies</div>
            </div>
            <div class="site-stat">
                <div class="stat-value">${site.enrollmentRate}%</div>
                <div class="stat-label">Enrollment</div>
            </div>
            <div class="site-stat">
                <div class="stat-value">$${(site.cost / 1000).toFixed(0)}K</div>
                <div class="stat-label">Cost</div>
            </div>
        </div>
        <div class="site-tags">
            ${site.certifications.map(cert => `<span class="site-tag">${cert}</span>`).join('')}
            ${site.equipment.map(eq => `<span class="site-tag">${eq}</span>`).join('')}
            <span class="site-tag">✓ ${site.availability}</span>
        </div>
        <div class="site-actions">
            <button class="btn-site-action btn-view" onclick="viewSiteDetails(${site.id})">
                👁️ View Details
            </button>
            <button class="btn-site-action btn-compare" onclick="toggleSiteSelection(${site.id})">
                ☐ Select
            </button>
        </div>
    `;
    
    return card;
}

function toggleSiteSelection(siteId) {
    const card = document.querySelector(`[data-site-id="${siteId}"]`);
    const button = card.querySelector('.btn-compare');
    
    if (selectedSites.includes(siteId)) {
        selectedSites = selectedSites.filter(id => id !== siteId);
        button.textContent = '☐ Select';
        button.style.background = 'rgba(255, 255, 255, 0.1)';
    } else {
        selectedSites.push(siteId);
        button.textContent = '☑ Selected';
        button.style.background = 'var(--primary)';
    }
}

function viewSiteDetails(siteId) {
    showNotification(`Opening detailed profile for site ${siteId}...`, 'info');
    setTimeout(() => {
        window.location.href = `site-profile.html?id=${siteId}`;
    }, 1000);
}

function compareSelected() {
    if (selectedSites.length < 2) {
        showNotification('Please select at least 2 sites to compare', 'info');
        return;
    }
    
    showNotification(`Comparing ${selectedSites.length} selected sites...`, 'info');
    setTimeout(() => {
        // In real implementation, would open comparison view
        showNotification('Comparison view opened!', 'success');
    }, 1000);
}

function sortSites(sortBy) {
    const container = document.getElementById('siteCardsContainer');
    const cards = Array.from(container.children);
    
    cards.sort((a, b) => {
        const siteA = parseInt(a.dataset.siteId);
        const siteB = parseInt(b.dataset.siteId);
        
        // Get values based on sort criteria
        let valueA, valueB;
        
        switch(sortBy) {
            case 'score':
                valueA = parseInt(a.querySelector('.site-match-score').textContent);
                valueB = parseInt(b.querySelector('.site-match-score').textContent);
                return valueB - valueA;
            case 'patients':
                valueA = parseInt(a.querySelector('.site-stats .site-stat:nth-child(1) .stat-value').textContent.replace(/,/g, ''));
                valueB = parseInt(b.querySelector('.site-stats .site-stat:nth-child(1) .stat-value').textContent.replace(/,/g, ''));
                return valueB - valueA;
            case 'experience':
                valueA = parseInt(a.querySelector('.site-stats .site-stat:nth-child(2) .stat-value').textContent);
                valueB = parseInt(b.querySelector('.site-stats .site-stat:nth-child(2) .stat-value').textContent);
                return valueB - valueA;
            case 'cost':
                valueA = parseFloat(a.querySelector('.site-stats .site-stat:nth-child(4) .stat-value').textContent.replace(/[$K]/g, ''));
                valueB = parseFloat(b.querySelector('.site-stats .site-stat:nth-child(4) .stat-value').textContent.replace(/[$K]/g, ''));
                return valueA - valueB;
            default:
                return 0;
        }
    });
    
    // Re-append sorted cards
    cards.forEach(card => container.appendChild(card));
    
    showNotification(`Sites sorted by ${sortBy}`, 'success');
}

function sendQuestionnaires() {
    if (selectedSites.length === 0) {
        showNotification('Please select at least one site', 'info');
        return;
    }
    
    showNotification(`Sending questionnaires to ${selectedSites.length} selected sites...`, 'info');
    setTimeout(() => {
        showNotification('Questionnaires sent successfully!', 'success');
    }, 2000);
}

function exportSiteList() {
    showNotification('Exporting site list to Excel...', 'info');
    setTimeout(() => {
        showNotification('Site list exported successfully!', 'success');
    }, 2000);
}

function saveSiteSelection() {
    showNotification('Site selection saved to your dashboard!', 'success');
}

function newSearch() {
    document.getElementById('resultsSection').style.display = 'none';
    selectedSites = [];
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        background: ${type === 'success' ? '#10b981' : type === 'info' ? '#3b82f6' : '#dc2626'};
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

console.log('🎯 Intelligent Site Recommender Loaded');