// ===================================
// AI ENROLLMENT PREDICTOR JAVASCRIPT
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initPredictorForm();
});

function initPredictorForm() {
    const form = document.getElementById('predictorForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        runPrediction();
    });
}

function runPrediction() {
    // Get form values
    const studyName = document.getElementById('studyName').value;
    const therapeuticArea = document.getElementById('therapeuticArea').value;
    const targetEnrollment = parseInt(document.getElementById('targetEnrollment').value);
    const numSites = parseInt(document.getElementById('numSites').value);
    const studyDuration = parseInt(document.getElementById('studyDuration').value);
    const complexity = document.getElementById('complexity').value;
    const inclusionCriteria = parseInt(document.getElementById('inclusionCriteria').value);
    const exclusionCriteria = parseInt(document.getElementById('exclusionCriteria').value);
    const populationSize = document.getElementById('populationSize').value;
    const competitiveStudies = parseInt(document.getElementById('competitiveStudies').value);
    const budgetPerPatient = parseInt(document.getElementById('budgetPerPatient').value);
    
    // Show results section with animation
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.style.display = 'block';
    resultsSection.style.opacity = '0';
    
    setTimeout(() => {
        resultsSection.style.transition = 'opacity 0.5s ease';
        resultsSection.style.opacity = '1';
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    
    // Calculate success score (AI simulation)
    const successScore = calculateSuccessScore({
        therapeuticArea,
        targetEnrollment,
        numSites,
        studyDuration,
        complexity,
        inclusionCriteria,
        exclusionCriteria,
        populationSize,
        competitiveStudies,
        budgetPerPatient
    });
    
    // Animate score
    setTimeout(() => {
        animateScore(successScore);
        updateTimeline(successScore, studyDuration, targetEnrollment, numSites);
        updateRiskFactors(competitiveStudies, complexity, populationSize);
        updateMetrics(targetEnrollment, numSites, studyDuration);
        updateBenchmark(successScore);
    }, 500);
}

function calculateSuccessScore(params) {
    let score = 70; // Base score
    
    // Therapeutic area impact
    const therapeuticScores = {
        'oncology': -5,
        'cardiology': 0,
        'diabetes': 5,
        'neurology': -3,
        'respiratory': 3,
        'rare-disease': -10
    };
    score += therapeuticScores[params.therapeuticArea] || 0;
    
    // Population size impact
    const populationScores = {
        'very-large': 15,
        'large': 10,
        'medium': 5,
        'small': -5,
        'rare': -15
    };
    score += populationScores[params.populationSize] || 0;
    
    // Complexity impact
    const complexityScores = {
        'low': 10,
        'medium': 0,
        'high': -10,
        'very-high': -20
    };
    score += complexityScores[params.complexity] || 0;
    
    // Sites per patient ratio
    const patientsPerSite = params.targetEnrollment / params.numSites;
    if (patientsPerSite < 10) score += 10;
    else if (patientsPerSite > 30) score -= 10;
    
    // Criteria impact
    const totalCriteria = params.inclusionCriteria + params.exclusionCriteria;
    if (totalCriteria < 15) score += 5;
    else if (totalCriteria > 25) score -= 10;
    
    // Competition impact
    if (params.competitiveStudies === 0) score += 10;
    else if (params.competitiveStudies > 5) score -= 15;
    else score -= params.competitiveStudies * 2;
    
    // Budget impact
    if (params.budgetPerPatient > 20000) score += 5;
    else if (params.budgetPerPatient < 10000) score -= 5;
    
    // Duration impact
    if (params.studyDuration < 12) score -= 10;
    else if (params.studyDuration > 24) score += 5;
    
    // Ensure score is between 0 and 100
    score = Math.max(0, Math.min(100, score));
    
    return Math.round(score);
}

function animateScore(score) {
    const scoreValue = document.getElementById('scoreValue');
    const scoreFill = document.getElementById('scoreFill');
    const scoreLabel = document.getElementById('scoreLabel');
    const confidenceInterval = document.getElementById('confidenceInterval');
    
    // Animate number
    let currentScore = 0;
    const increment = score / 50;
    const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= score) {
            currentScore = score;
            clearInterval(timer);
        }
        scoreValue.textContent = Math.round(currentScore) + '%';
    }, 30);
    
    // Animate circle
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (score / 100) * circumference;
    scoreFill.style.strokeDashoffset = offset;
    
    // Update label
    if (score >= 80) {
        scoreLabel.textContent = 'Excellent Success Probability';
        scoreFill.style.stroke = '#10b981';
    } else if (score >= 60) {
        scoreLabel.textContent = 'Good Success Probability';
        scoreFill.style.stroke = '#f59e0b';
    } else if (score >= 40) {
        scoreLabel.textContent = 'Moderate Success Probability';
        scoreFill.style.stroke = '#f59e0b';
    } else {
        scoreLabel.textContent = 'Low Success Probability';
        scoreFill.style.stroke = '#ef4444';
    }
    
    // Update confidence interval
    const confidence = Math.round(5 + (score / 100) * 5);
    confidenceInterval.textContent = `±${confidence}%`;
}

function updateTimeline(score, duration, enrollment, sites) {
    // Calculate timeline milestones
    const fpiMonth = Math.max(2, Math.round(3 - (score / 100) * 1));
    const halfwayMonth = Math.round(duration * 0.55);
    const lpiMonth = Math.round(duration * (1 + (100 - score) / 200));
    
    document.getElementById('fpiDate').textContent = `Month ${fpiMonth}`;
    document.getElementById('halfwayDate').textContent = `Month ${halfwayMonth}`;
    document.getElementById('lpiDate').textContent = `Month ${lpiMonth}`;
    
    // Calculate confidence levels
    const fpiConfidence = Math.min(95, 75 + score / 5);
    const halfwayConfidence = Math.min(90, 65 + score / 5);
    const lpiConfidence = Math.min(85, 55 + score / 5);
    
    document.getElementById('fpiConfidence').textContent = `${Math.round(fpiConfidence)}%`;
    document.getElementById('halfwayConfidence').textContent = `${Math.round(halfwayConfidence)}%`;
    document.getElementById('lpiConfidence').textContent = `${Math.round(lpiConfidence)}%`;
}

function updateRiskFactors(competitive, complexity, population) {
    const risk1 = document.getElementById('risk1');
    const risk2 = document.getElementById('risk2');
    const risk3 = document.getElementById('risk3');
    
    // Update risk 1 (competition)
    if (competitive > 5) {
        risk1.className = 'risk-item risk-high';
        risk1.querySelector('h3').textContent = 'Very High Competition';
        risk1.querySelector('p').textContent = `${competitive} competing studies in same therapeutic area`;
    } else if (competitive > 2) {
        risk1.className = 'risk-item risk-medium';
        risk1.querySelector('h3').textContent = 'Moderate Competition';
        risk1.querySelector('p').textContent = `${competitive} competing studies in same therapeutic area`;
    } else {
        risk1.className = 'risk-item risk-low';
        risk1.querySelector('h3').textContent = 'Low Competition';
        risk1.querySelector('p').textContent = `${competitive} competing studies in same therapeutic area`;
    }
    
    // Update risk 2 (complexity)
    const complexityLabels = {
        'low': { class: 'risk-low', title: 'Low Complexity', text: 'Simple procedures facilitate enrollment' },
        'medium': { class: 'risk-medium', title: 'Medium Complexity', text: 'Standard complexity may slow enrollment' },
        'high': { class: 'risk-high', title: 'High Complexity', text: 'Complex procedures may significantly impact enrollment' },
        'very-high': { class: 'risk-high', title: 'Very High Complexity', text: 'Specialized procedures require careful site selection' }
    };
    
    const complexityData = complexityLabels[complexity] || complexityLabels['medium'];
    risk2.className = `risk-item ${complexityData.class}`;
    risk2.querySelector('h3').textContent = complexityData.title;
    risk2.querySelector('p').textContent = complexityData.text;
    
    // Update risk 3 (population)
    const populationLabels = {
        'very-large': { class: 'risk-low', title: 'Excellent Patient Pool', text: 'Very large patient population available' },
        'large': { class: 'risk-low', title: 'Large Patient Pool', text: 'Large patient population available' },
        'medium': { class: 'risk-medium', title: 'Moderate Patient Pool', text: 'Medium-sized patient population' },
        'small': { class: 'risk-high', title: 'Limited Patient Pool', text: 'Small patient population may impact enrollment' },
        'rare': { class: 'risk-high', title: 'Very Limited Pool', text: 'Rare disease requires specialized recruitment' }
    };
    
    const populationData = populationLabels[population] || populationLabels['medium'];
    risk3.className = `risk-item ${populationData.class}`;
    risk3.querySelector('h3').textContent = populationData.title;
    risk3.querySelector('p').textContent = populationData.text;
}

function updateMetrics(enrollment, sites, duration) {
    const patientsPerSite = Math.round(enrollment / sites);
    const enrollmentRate = (enrollment / duration).toFixed(1);
    const screenFailRate = Math.round(25 + Math.random() * 20);
    const dropoutRate = Math.round(8 + Math.random() * 8);
    
    document.getElementById('patientsPerSite').textContent = patientsPerSite;
    document.getElementById('enrollmentRate').textContent = enrollmentRate;
    document.getElementById('screenFailRate').textContent = screenFailRate + '%';
    document.getElementById('dropoutRate').textContent = dropoutRate + '%';
}

function updateBenchmark(score) {
    const yourStudyBar = document.getElementById('yourStudyBar');
    const yourStudyValue = document.getElementById('yourStudyValue');
    
    setTimeout(() => {
        yourStudyBar.style.width = score + '%';
        yourStudyValue.textContent = score + '%';
        
        // Color based on score
        if (score >= 80) {
            yourStudyBar.style.background = '#10b981';
        } else if (score >= 60) {
            yourStudyBar.style.background = '#f59e0b';
        } else {
            yourStudyBar.style.background = '#ef4444';
        }
    }, 500);
}

function exportReport() {
    showNotification('Generating comprehensive PDF report...', 'info');
    setTimeout(() => {
        showNotification('Report exported successfully!', 'success');
    }, 2000);
}

function saveScenario() {
    showNotification('Scenario saved to your dashboard!', 'success');
}

function shareResults() {
    showNotification('Share link copied to clipboard!', 'success');
}

function runNewPrediction() {
    document.getElementById('resultsSection').style.display = 'none';
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

console.log('🤖 AI Enrollment Predictor Loaded');