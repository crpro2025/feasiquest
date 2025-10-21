// ===================================
// AI PROTOCOL ANALYZER JAVASCRIPT
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initProtocolAnalyzer();
});

function initProtocolAnalyzer() {
    const fileInput = document.getElementById('fileInput');
    const uploadZone = document.getElementById('uploadZone');
    
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }
    
    if (uploadZone) {
        // Drag and drop functionality
        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.style.borderColor = 'var(--primary)';
            uploadZone.style.background = 'rgba(220, 38, 38, 0.05)';
        });
        
        uploadZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadZone.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            uploadZone.style.background = 'transparent';
        });
        
        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            uploadZone.style.background = 'transparent';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                processProtocol(files[0]);
            }
        });
    }
}

function handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
        processProtocol(file);
    }
}

function processProtocol(file) {
    showNotification(`Processing ${file.name}...`, 'info');
    
    // Hide upload section
    document.getElementById('uploadSection').style.display = 'none';
    
    // Show progress section
    const progressSection = document.getElementById('progressSection');
    progressSection.style.display = 'block';
    
    // Simulate analysis progress
    simulateAnalysis();
}

function runDemoAnalysis() {
    showNotification('Running demo analysis with sample protocol...', 'info');
    
    // Hide upload section
    document.getElementById('uploadSection').style.display = 'none';
    
    // Show progress section
    const progressSection = document.getElementById('progressSection');
    progressSection.style.display = 'block';
    
    // Simulate analysis
    simulateAnalysis();
}

function simulateAnalysis() {
    const steps = ['step1', 'step2', 'step3', 'step4', 'step5'];
    const progressFill = document.getElementById('progressFill');
    let currentStep = 0;
    
    const interval = setInterval(() => {
        if (currentStep < steps.length) {
            // Update progress bar
            const progress = ((currentStep + 1) / steps.length) * 100;
            progressFill.style.width = progress + '%';
            
            // Mark step as active
            const stepElement = document.getElementById(steps[currentStep]);
            stepElement.classList.add('active');
            
            // Mark previous steps as complete
            if (currentStep > 0) {
                document.getElementById(steps[currentStep - 1]).classList.remove('active');
                document.getElementById(steps[currentStep - 1]).classList.add('complete');
            }
            
            currentStep++;
        } else {
            clearInterval(interval);
            
            // Mark last step as complete
            document.getElementById(steps[steps.length - 1]).classList.remove('active');
            document.getElementById(steps[steps.length - 1]).classList.add('complete');
            
            // Show results after a short delay
            setTimeout(() => {
                showResults();
            }, 500);
        }
    }, 800);
}

function showResults() {
    // Hide progress section
    document.getElementById('progressSection').style.display = 'none';
    
    // Show results section
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.style.display = 'block';
    resultsSection.style.opacity = '0';
    
    setTimeout(() => {
        resultsSection.style.transition = 'opacity 0.5s ease';
        resultsSection.style.opacity = '1';
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    
    // Generate analysis results
    generateAnalysisResults();
}

function generateAnalysisResults() {
    // Calculate feasibility score
    const feasibilityScore = 68; // Demo score
    
    // Animate score
    setTimeout(() => {
        animateProtocolScore(feasibilityScore);
        updateProtocolSummary();
        generateRedFlags();
        generateRestrictiveCriteria();
        generateProceduresList();
        updatePatientBurden();
        generateOptimizations();
        updateComparison(feasibilityScore);
    }, 500);
}

function animateProtocolScore(score) {
    const scoreValue = document.getElementById('protocolScoreValue');
    const scoreFill = document.getElementById('protocolScoreFill');
    const scoreLabel = document.getElementById('protocolScoreLabel');
    
    // Animate number
    let currentScore = 0;
    const increment = score / 50;
    const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= score) {
            currentScore = score;
            clearInterval(timer);
        }
        scoreValue.textContent = Math.round(currentScore);
    }, 30);
    
    // Animate circle
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (score / 100) * circumference;
    scoreFill.style.strokeDashoffset = offset;
    
    // Update label
    if (score >= 80) {
        scoreLabel.textContent = 'Excellent Feasibility';
        scoreFill.style.stroke = '#10b981';
    } else if (score >= 60) {
        scoreLabel.textContent = 'Good Feasibility';
        scoreFill.style.stroke = '#f59e0b';
    } else if (score >= 40) {
        scoreLabel.textContent = 'Moderate Feasibility';
        scoreFill.style.stroke = '#f59e0b';
    } else {
        scoreLabel.textContent = 'Low Feasibility';
        scoreFill.style.stroke = '#ef4444';
    }
}

function updateProtocolSummary() {
    document.getElementById('inclusionCount').textContent = '12';
    document.getElementById('exclusionCount').textContent = '18';
    document.getElementById('procedureCount').textContent = '8';
    document.getElementById('visitCount').textContent = '15';
}

function generateRedFlags() {
    const redFlags = [
        {
            icon: '🚨',
            title: 'Excessive Exclusion Criteria',
            description: '18 exclusion criteria identified - 40% above industry average. This may significantly reduce eligible patient pool.',
            impact: 'High Impact on Enrollment'
        },
        {
            icon: '⚠️',
            title: 'Complex Laboratory Requirements',
            description: 'Multiple specialized lab tests required at screening may limit site participation and increase screen failure rate.',
            impact: 'Medium Impact on Site Selection'
        },
        {
            icon: '⏰',
            title: 'Frequent Visit Schedule',
            description: '15 study visits over 12 months (1.25 visits/month) may increase patient dropout rate.',
            impact: 'High Impact on Retention'
        }
    ];
    
    const container = document.getElementById('redFlagsList');
    container.innerHTML = '';
    
    redFlags.forEach(flag => {
        const item = document.createElement('div');
        item.className = 'recommendation-item';
        item.innerHTML = `
            <div class="rec-icon">${flag.icon}</div>
            <div class="rec-content">
                <h3>${flag.title}</h3>
                <p>${flag.description}</p>
                <div class="rec-impact">
                    <span class="impact-label">Assessment:</span>
                    <span class="impact-value negative">${flag.impact}</span>
                </div>
            </div>
        `;
        container.appendChild(item);
    });
}

function generateRestrictiveCriteria() {
    const criteria = [
        {
            type: 'Exclusion',
            text: 'BMI > 35 kg/m²',
            impact: 'Excludes ~25% of potential patients',
            severity: 'high'
        },
        {
            type: 'Exclusion',
            text: 'Any prior cancer diagnosis',
            impact: 'Excludes ~15% of diabetic population',
            severity: 'high'
        },
        {
            type: 'Inclusion',
            text: 'HbA1c between 7.5-9.0%',
            impact: 'Narrow range limits patient pool by 40%',
            severity: 'medium'
        },
        {
            type: 'Exclusion',
            text: 'Current use of >3 medications',
            impact: 'Common in target population',
            severity: 'medium'
        }
    ];
    
    const container = document.getElementById('restrictiveCriteria');
    container.innerHTML = '';
    
    criteria.forEach(criterion => {
        const item = document.createElement('div');
        item.className = `risk-item risk-${criterion.severity}`;
        item.innerHTML = `
            <div class="risk-icon">${criterion.severity === 'high' ? '🚫' : '⚠️'}</div>
            <div class="risk-content">
                <h3>${criterion.type}: ${criterion.text}</h3>
                <p>${criterion.impact}</p>
                <div class="risk-impact">Severity: ${criterion.severity === 'high' ? 'High' : 'Medium'}</div>
            </div>
        `;
        container.appendChild(item);
    });
}

function generateProceduresList() {
    const procedures = [
        {
            icon: '💉',
            name: 'Frequent Blood Draws',
            description: 'Required at every visit (15 times) - may impact patient compliance',
            burden: 'High'
        },
        {
            icon: '🔬',
            name: 'Specialized Lab Tests',
            description: 'Requires specialized equipment not available at all sites',
            burden: 'Medium'
        },
        {
            icon: '📊',
            name: 'Continuous Glucose Monitoring',
            description: '24/7 monitoring for 12 months - significant patient burden',
            burden: 'High'
        }
    ];
    
    const container = document.getElementById('proceduresList');
    container.innerHTML = '';
    
    procedures.forEach(proc => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
            <div class="timeline-icon">${proc.icon}</div>
            <div class="timeline-content">
                <h3>${proc.name}</h3>
                <p style="color: var(--gray-light); margin-bottom: 0.5rem;">${proc.description}</p>
                <p class="timeline-confidence">Patient Burden: <span style="color: ${proc.burden === 'High' ? '#ef4444' : '#f59e0b'};">${proc.burden}</span></p>
            </div>
        `;
        container.appendChild(item);
    });
}

function updatePatientBurden() {
    setTimeout(() => {
        // Time commitment (total hours)
        const timeHours = 45;
        const timePercent = Math.min(100, (timeHours / 60) * 100);
        document.getElementById('timeBar').style.width = timePercent + '%';
        document.getElementById('timeValue').textContent = timeHours + ' hours';
        
        // Visit frequency
        const visitsPerMonth = 1.25;
        const frequencyPercent = Math.min(100, (visitsPerMonth / 2) * 100);
        document.getElementById('frequencyBar').style.width = frequencyPercent + '%';
        document.getElementById('frequencyValue').textContent = visitsPerMonth + ' visits/month';
        
        // Invasiveness
        const invasiveness = 'High';
        const invasivenessPercent = 75;
        document.getElementById('invasivenessBar').style.width = invasivenessPercent + '%';
        document.getElementById('invasivenessValue').textContent = invasiveness;
    }, 500);
}

function generateOptimizations() {
    const optimizations = [
        {
            icon: '📋',
            title: 'Reduce Exclusion Criteria',
            description: 'Remove 5 non-critical exclusion criteria (BMI restriction, medication count limit, minor comorbidities)',
            impact: '+35% Eligible Patient Pool'
        },
        {
            icon: '📅',
            title: 'Optimize Visit Schedule',
            description: 'Combine visits 4-5 and 8-9 to reduce total visits from 15 to 13',
            impact: '+18% Patient Retention'
        },
        {
            icon: '🔬',
            title: 'Simplify Lab Requirements',
            description: 'Replace specialized tests with standard lab panels available at all sites',
            impact: '+40% Site Participation'
        },
        {
            icon: '💉',
            title: 'Reduce Blood Draw Frequency',
            description: 'Limit blood draws to key timepoints (screening, baseline, months 3, 6, 12)',
            impact: '+22% Patient Compliance'
        },
        {
            icon: '🌍',
            title: 'Expand Geographic Scope',
            description: 'Include APAC and Latin America regions with lower competition',
            impact: '+50% Available Sites'
        }
    ];
    
    const container = document.getElementById('optimizationList');
    container.innerHTML = '';
    
    optimizations.forEach(opt => {
        const item = document.createElement('div');
        item.className = 'recommendation-item';
        item.innerHTML = `
            <div class="rec-icon">${opt.icon}</div>
            <div class="rec-content">
                <h3>${opt.title}</h3>
                <p>${opt.description}</p>
                <div class="rec-impact">
                    <span class="impact-label">Potential Impact:</span>
                    <span class="impact-value positive">${opt.impact}</span>
                </div>
            </div>
        `;
        container.appendChild(item);
    });
}

function updateComparison(score) {
    setTimeout(() => {
        const yourProtocolBar = document.getElementById('yourProtocolBar');
        const yourProtocolValue = document.getElementById('yourProtocolValue');
        
        yourProtocolBar.style.width = score + '%';
        yourProtocolValue.textContent = score + '/100';
        
        if (score >= 80) {
            yourProtocolBar.style.background = '#10b981';
        } else if (score >= 60) {
            yourProtocolBar.style.background = '#f59e0b';
        } else {
            yourProtocolBar.style.background = '#ef4444';
        }
    }, 500);
}

function exportAnalysis() {
    showNotification('Generating comprehensive analysis report...', 'info');
    setTimeout(() => {
        showNotification('Analysis report exported successfully!', 'success');
    }, 2000);
}

function saveAnalysis() {
    showNotification('Analysis saved to your dashboard!', 'success');
}

function shareAnalysis() {
    showNotification('Share link copied to clipboard!', 'success');
}

function analyzeNewProtocol() {
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('uploadSection').style.display = 'block';
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

console.log('🧠 Smart Protocol Analyzer Loaded');