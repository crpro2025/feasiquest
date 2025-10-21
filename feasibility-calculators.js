// Feasibility Calculator Functions

// Store results for PDF export
let calculatorResults = {};

// Update range value display
function updateRangeValue(input, displayId) {
    document.getElementById(displayId).textContent = input.value;
}

// Patient Pool Calculator
function calculatePatientPool() {
    const targetPop = parseFloat(document.getElementById('targetPop').value);
    const prevalence = parseFloat(document.getElementById('prevalence').value);
    const eligibility = parseFloat(document.getElementById('eligibility').value);
    
    if (!targetPop || !prevalence || !eligibility) {
        alert('Please fill in all fields');
        return;
    }
    
    const diseasePopulation = targetPop * (prevalence / 100);
    const eligiblePatients = diseasePopulation * (eligibility / 100);
    
    const resultDiv = document.getElementById('patientPoolResult');
    resultDiv.innerHTML = `
        <div class="result-success">
            <h4>📊 Patient Pool Analysis</h4>
            <div class="result-item">
                <span class="result-label">Disease Population:</span>
                <span class="result-value">${diseasePopulation.toLocaleString()} patients</span>
            </div>
            <div class="result-item">
                <span class="result-label">Eligible Patients:</span>
                <span class="result-value">${eligiblePatients.toLocaleString()} patients</span>
            </div>
            <div class="result-recommendation">
                ${eligiblePatients > 1000 ? '✅ Strong patient pool' : eligiblePatients > 500 ? '⚠️ Moderate patient pool' : '❌ Limited patient pool'}
            </div>
        </div>
    `;
    
    calculatorResults.patientPool = {
        targetPop, prevalence, eligibility, diseasePopulation, eligiblePatients
    };
}

// Site Capacity Calculator
function calculateSiteCapacity() {
    const totalEnrollment = parseFloat(document.getElementById('totalEnrollment').value);
    const numSites = parseFloat(document.getElementById('numSites').value);
    const enrollPeriod = parseFloat(document.getElementById('enrollPeriod').value);
    
    if (!totalEnrollment || !numSites || !enrollPeriod) {
        alert('Please fill in all fields');
        return;
    }
    
    const patientsPerSite = totalEnrollment / numSites;
    const patientsPerSitePerMonth = patientsPerSite / enrollPeriod;
    
    const resultDiv = document.getElementById('siteCapacityResult');
    resultDiv.innerHTML = `
        <div class="result-success">
            <h4>🏥 Site Capacity Analysis</h4>
            <div class="result-item">
                <span class="result-label">Patients per Site:</span>
                <span class="result-value">${patientsPerSite.toFixed(1)} patients</span>
            </div>
            <div class="result-item">
                <span class="result-label">Monthly Enrollment per Site:</span>
                <span class="result-value">${patientsPerSitePerMonth.toFixed(2)} patients/month</span>
            </div>
            <div class="result-recommendation">
                ${patientsPerSitePerMonth < 2 ? '✅ Realistic enrollment rate' : patientsPerSitePerMonth < 4 ? '⚠️ Aggressive enrollment rate' : '❌ Very aggressive - consider more sites'}
            </div>
        </div>
    `;
    
    calculatorResults.siteCapacity = {
        totalEnrollment, numSites, enrollPeriod, patientsPerSite, patientsPerSitePerMonth
    };
}

// Budget Estimator
function calculateBudget() {
    const patients = parseFloat(document.getElementById('budgetPatients').value);
    const costPerPatient = parseFloat(document.getElementById('costPerPatient').value);
    const sites = parseFloat(document.getElementById('budgetSites').value);
    const costPerSite = parseFloat(document.getElementById('costPerSite').value);
    
    if (!patients || !costPerPatient || !sites || !costPerSite) {
        alert('Please fill in all fields');
        return;
    }
    
    const patientCosts = patients * costPerPatient;
    const siteCosts = sites * costPerSite;
    const totalBudget = patientCosts + siteCosts;
    const contingency = totalBudget * 0.15; // 15% contingency
    const totalWithContingency = totalBudget + contingency;
    
    const resultDiv = document.getElementById('budgetResult');
    resultDiv.innerHTML = `
        <div class="result-success">
            <h4>💰 Budget Breakdown</h4>
            <div class="result-item">
                <span class="result-label">Patient Costs:</span>
                <span class="result-value">$${patientCosts.toLocaleString()}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Site Costs:</span>
                <span class="result-value">$${siteCosts.toLocaleString()}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Subtotal:</span>
                <span class="result-value">$${totalBudget.toLocaleString()}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Contingency (15%):</span>
                <span class="result-value">$${contingency.toLocaleString()}</span>
            </div>
            <div class="result-item result-total">
                <span class="result-label"><strong>Total Budget:</strong></span>
                <span class="result-value"><strong>$${totalWithContingency.toLocaleString()}</strong></span>
            </div>
        </div>
    `;
    
    calculatorResults.budget = {
        patients, costPerPatient, sites, costPerSite, patientCosts, siteCosts, totalBudget, contingency, totalWithContingency
    };
}

// Timeline Predictor
function calculateTimeline() {
    const startup = parseFloat(document.getElementById('startupMonths').value);
    const enrollment = parseFloat(document.getElementById('timelineEnroll').value);
    const treatment = parseFloat(document.getElementById('treatmentMonths').value);
    const closeout = parseFloat(document.getElementById('closeoutMonths').value);
    
    if (startup === undefined || enrollment === undefined || treatment === undefined || closeout === undefined) {
        alert('Please fill in all fields');
        return;
    }
    
    const totalMonths = startup + enrollment + treatment + closeout;
    const totalYears = (totalMonths / 12).toFixed(1);
    
    const today = new Date();
    const endDate = new Date(today.setMonth(today.getMonth() + totalMonths));
    
    const resultDiv = document.getElementById('timelineResult');
    resultDiv.innerHTML = `
        <div class="result-success">
            <h4>📅 Timeline Projection</h4>
            <div class="result-item">
                <span class="result-label">Startup Phase:</span>
                <span class="result-value">${startup} months</span>
            </div>
            <div class="result-item">
                <span class="result-label">Enrollment Period:</span>
                <span class="result-value">${enrollment} months</span>
            </div>
            <div class="result-item">
                <span class="result-label">Treatment Period:</span>
                <span class="result-value">${treatment} months</span>
            </div>
            <div class="result-item">
                <span class="result-label">Closeout Phase:</span>
                <span class="result-value">${closeout} months</span>
            </div>
            <div class="result-item result-total">
                <span class="result-label"><strong>Total Duration:</strong></span>
                <span class="result-value"><strong>${totalMonths} months (${totalYears} years)</strong></span>
            </div>
            <div class="result-item">
                <span class="result-label">Estimated Completion:</span>
                <span class="result-value">${endDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>
        </div>
    `;
    
    calculatorResults.timeline = {
        startup, enrollment, treatment, closeout, totalMonths, totalYears, endDate: endDate.toISOString()
    };
}

// Risk Score Calculator
function calculateRiskScore() {
    const complexity = parseInt(document.getElementById('protocolComplexity').value);
    const difficulty = parseInt(document.getElementById('popDifficulty').value);
    const experience = parseInt(document.getElementById('siteExperience').value);
    const regulatory = parseInt(document.getElementById('regComplexity').value);
    
    // Calculate weighted risk score (experience is inverse - higher is better)
    const riskScore = ((complexity * 0.3) + (difficulty * 0.3) + ((11 - experience) * 0.2) + (regulatory * 0.2));
    const normalizedScore = ((riskScore / 10) * 100).toFixed(0);
    
    let riskLevel, riskColor, recommendations;
    
    if (normalizedScore < 40) {
        riskLevel = 'Low Risk';
        riskColor = 'success';
        recommendations = 'This trial has a favorable risk profile. Proceed with standard monitoring.';
    } else if (normalizedScore < 70) {
        riskLevel = 'Moderate Risk';
        riskColor = 'warning';
        recommendations = 'Consider additional risk mitigation strategies. Increase monitoring frequency.';
    } else {
        riskLevel = 'High Risk';
        riskColor = 'error';
        recommendations = 'Significant risk factors identified. Implement comprehensive risk management plan.';
    }
    
    const resultDiv = document.getElementById('riskScoreResult');
    resultDiv.innerHTML = `
        <div class="result-${riskColor}">
            <h4>⚠️ Risk Assessment</h4>
            <div class="risk-score-display">
                <div class="risk-score-circle" style="background: conic-gradient(var(--${riskColor === 'success' ? 'success' : riskColor === 'warning' ? 'warning' : 'error'}) ${normalizedScore}%, #e5e7eb ${normalizedScore}%)">
                    <span class="risk-score-number">${normalizedScore}</span>
                </div>
            </div>
            <div class="result-item result-total">
                <span class="result-label"><strong>Risk Level:</strong></span>
                <span class="result-value"><strong>${riskLevel}</strong></span>
            </div>
            <div class="result-recommendation">
                ${recommendations}
            </div>
            <div class="risk-breakdown">
                <div class="risk-factor">Protocol Complexity: ${complexity}/10</div>
                <div class="risk-factor">Population Difficulty: ${difficulty}/10</div>
                <div class="risk-factor">Site Experience: ${experience}/10</div>
                <div class="risk-factor">Regulatory Complexity: ${regulatory}/10</div>
            </div>
        </div>
    `;
    
    calculatorResults.riskScore = {
        complexity, difficulty, experience, regulatory, riskScore: normalizedScore, riskLevel
    };
}

// Screen Failure Analyzer
function calculateScreenFailure() {
    const targetEnroll = parseFloat(document.getElementById('targetEnroll').value);
    const screenFailRate = parseFloat(document.getElementById('screenFailRate').value);
    const dropoutRate = parseFloat(document.getElementById('dropoutRate').value);
    
    if (!targetEnroll || screenFailRate === undefined || dropoutRate === undefined) {
        alert('Please fill in all fields');
        return;
    }
    
    // Calculate screens needed accounting for screen failures
    const screensNeeded = targetEnroll / (1 - (screenFailRate / 100));
    
    // Calculate enrollments needed accounting for dropouts
    const enrollmentsNeeded = targetEnroll / (1 - (dropoutRate / 100));
    
    // Total screens needed accounting for both
    const totalScreensNeeded = enrollmentsNeeded / (1 - (screenFailRate / 100));
    
    const resultDiv = document.getElementById('screenFailResult');
    resultDiv.innerHTML = `
        <div class="result-success">
            <h4>🔍 Screen Failure Analysis</h4>
            <div class="result-item">
                <span class="result-label">Target Enrollment:</span>
                <span class="result-value">${targetEnroll} patients</span>
            </div>
            <div class="result-item">
                <span class="result-label">Screens Needed (screen failures only):</span>
                <span class="result-value">${Math.ceil(screensNeeded)} patients</span>
            </div>
            <div class="result-item">
                <span class="result-label">Enrollments Needed (with dropouts):</span>
                <span class="result-value">${Math.ceil(enrollmentsNeeded)} patients</span>
            </div>
            <div class="result-item result-total">
                <span class="result-label"><strong>Total Screens Required:</strong></span>
                <span class="result-value"><strong>${Math.ceil(totalScreensNeeded)} patients</strong></span>
            </div>
            <div class="result-recommendation">
                You'll need to screen ${Math.ceil(totalScreensNeeded - targetEnroll)} additional patients (${((totalScreensNeeded / targetEnroll - 1) * 100).toFixed(0)}% more) to account for screen failures and dropouts.
            </div>
        </div>
    `;
    
    calculatorResults.screenFailure = {
        targetEnroll, screenFailRate, dropoutRate, screensNeeded, enrollmentsNeeded, totalScreensNeeded
    };
}

// Download Results as PDF
function downloadCalculatorResults() {
    if (Object.keys(calculatorResults).length === 0) {
        alert('Please complete at least one calculator before downloading results.');
        return;
    }
    
    // Create a formatted text version of results
    let resultsText = 'FEASIQUEST CALCULATOR RESULTS\n';
    resultsText += '================================\n\n';
    resultsText += `Generated: ${new Date().toLocaleString()}\n\n`;
    
    for (const [calculator, data] of Object.entries(calculatorResults)) {
        resultsText += `\n${calculator.toUpperCase()}\n`;
        resultsText += '-'.repeat(calculator.length) + '\n';
        for (const [key, value] of Object.entries(data)) {
            resultsText += `${key}: ${value}\n`;
        }
        resultsText += '\n';
    }
    
    // Create a blob and download
    const blob = new Blob([resultsText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `feasiquest-calculator-results-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Show success message
    alert('✅ Calculator results downloaded successfully!');
}

// Initialize calculators when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Feasibility Calculators loaded');
});