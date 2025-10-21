// Study Creation Wizard JavaScript

let currentStep = 1;
const totalSteps = 8;
let studyData = {};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    loadSavedData();
    setupAutoSave();
});

// Navigation Functions
function nextStep() {
    if (validateStep(currentStep)) {
        saveStepData(currentStep);
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
            updateProgress();
        }
    }
}

function previousStep() {
    if (currentStep > 1) {
        saveStepData(currentStep);
        currentStep--;
        showStep(currentStep);
        updateProgress();
    }
}

function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.step-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show current step
    document.getElementById('step' + step).classList.add('active');
    
    // Update sidebar
    document.querySelectorAll('.step').forEach((stepEl, index) => {
        stepEl.classList.remove('active');
        if (index + 1 === step) {
            stepEl.classList.add('active');
        }
        if (index + 1 < step) {
            stepEl.classList.add('completed');
        } else {
            stepEl.classList.remove('completed');
        }
    });
    
    // Update buttons
    document.getElementById('prevBtn').style.display = step === 1 ? 'none' : 'block';
    document.getElementById('nextBtn').style.display = step === totalSteps ? 'none' : 'block';
    document.getElementById('submitBtn').style.display = step === totalSteps ? 'block' : 'none';
    
    // If on review step, populate summary
    if (step === 8) {
        populateReviewSummary();
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function updateProgress() {
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressPercent').textContent = Math.round(progress) + '%';
}

// Validation Functions
function validateStep(step) {
    const stepElement = document.getElementById('step' + step);
    const requiredFields = stepElement.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            field.style.borderColor = '#d1d5db';
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields', 'error');
    }
    
    return isValid;
}

// Save Step Data
function saveStepData(step) {
    const stepElement = document.getElementById('step' + step);
    const inputs = stepElement.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            studyData[input.id] = input.checked;
        } else if (input.type === 'file') {
            // File handling is done separately
        } else {
            studyData[input.id] = input.value;
        }
    });
    
    // Save to localStorage
    localStorage.setItem('studyCreationDraft', JSON.stringify(studyData));
}

// Load Saved Data
function loadSavedData() {
    const saved = localStorage.getItem('studyCreationDraft');
    if (saved) {
        studyData = JSON.parse(saved);
        
        // Populate fields
        Object.keys(studyData).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = studyData[key];
                } else {
                    element.value = studyData[key];
                }
            }
        });
    }
}

// Auto-save
function setupAutoSave() {
    setInterval(() => {
        saveStepData(currentStep);
    }, 30000); // Save every 30 seconds
}

// Dynamic List Functions
function addObjective() {
    const container = document.getElementById('secondaryObjectives');
    const div = document.createElement('div');
    div.className = 'objective-item';
    div.innerHTML = `
        <textarea placeholder="Secondary objective..." rows="2"></textarea>
        <button type="button" class="btn-icon" onclick="removeObjective(this)">🗑️</button>
    `;
    container.appendChild(div);
}

function removeObjective(btn) {
    btn.parentElement.remove();
}

function addEndpoint() {
    const container = document.getElementById('secondaryEndpoints');
    const div = document.createElement('div');
    div.className = 'endpoint-item';
    div.innerHTML = `
        <input type="text" placeholder="Secondary endpoint...">
        <button type="button" class="btn-icon" onclick="removeEndpoint(this)">🗑️</button>
    `;
    container.appendChild(div);
}

function removeEndpoint(btn) {
    btn.parentElement.remove();
}

function addArm() {
    const container = document.getElementById('studyArms');
    const div = document.createElement('div');
    div.className = 'arm-item';
    div.innerHTML = `
        <input type="text" placeholder="Arm name" class="arm-name">
        <input type="text" placeholder="Intervention" class="arm-intervention">
        <input type="number" placeholder="N" class="arm-size">
        <button type="button" class="btn-icon" onclick="removeArm(this)">🗑️</button>
    `;
    container.appendChild(div);
}

function removeArm(btn) {
    btn.parentElement.remove();
}

function addInclusionCriteria() {
    const container = document.getElementById('inclusionCriteria');
    const count = container.children.length + 1;
    const div = document.createElement('div');
    div.className = 'criteria-item';
    div.innerHTML = `
        <span class="criteria-number">${count}.</span>
        <textarea placeholder="Enter inclusion criterion..." rows="2"></textarea>
        <button type="button" class="btn-icon" onclick="removeCriteria(this)">🗑️</button>
    `;
    container.appendChild(div);
    updateCriteriaNumbers('inclusionCriteria');
}

function addExclusionCriteria() {
    const container = document.getElementById('exclusionCriteria');
    const count = container.children.length + 1;
    const div = document.createElement('div');
    div.className = 'criteria-item';
    div.innerHTML = `
        <span class="criteria-number">${count}.</span>
        <textarea placeholder="Enter exclusion criterion..." rows="2"></textarea>
        <button type="button" class="btn-icon" onclick="removeCriteria(this)">🗑️</button>
    `;
    container.appendChild(div);
    updateCriteriaNumbers('exclusionCriteria');
}

function removeCriteria(btn) {
    const container = btn.closest('#inclusionCriteria, #exclusionCriteria');
    btn.parentElement.remove();
    updateCriteriaNumbers(container.id);
}

function updateCriteriaNumbers(containerId) {
    const container = document.getElementById(containerId);
    const items = container.querySelectorAll('.criteria-item');
    items.forEach((item, index) => {
        item.querySelector('.criteria-number').textContent = (index + 1) + '.';
    });
}

function addMilestone() {
    const container = document.getElementById('milestones');
    const div = document.createElement('div');
    div.className = 'milestone-item';
    div.innerHTML = `
        <input type="text" placeholder="Milestone name" class="milestone-name">
        <input type="date" class="milestone-date">
        <button type="button" class="btn-icon" onclick="removeMilestone(this)">🗑️</button>
    `;
    container.appendChild(div);
}

function removeMilestone(btn) {
    btn.parentElement.remove();
}

function addTeamMember() {
    const container = document.getElementById('studyTeam');
    const div = document.createElement('div');
    div.className = 'team-member';
    div.innerHTML = `
        <select class="member-role">
            <option value="">Select role...</option>
            <option value="medical-monitor">Medical Monitor</option>
            <option value="project-manager">Project Manager</option>
            <option value="clinical-lead">Clinical Lead</option>
            <option value="data-manager">Data Manager</option>
            <option value="safety-officer">Safety Officer</option>
            <option value="regulatory-lead">Regulatory Lead</option>
            <option value="biostatistician">Biostatistician</option>
            <option value="pharmacovigilance">Pharmacovigilance</option>
        </select>
        <input type="text" placeholder="Name" class="member-name">
        <input type="email" placeholder="Email" class="member-email">
        <button type="button" class="btn-icon" onclick="removeTeamMember(this)">🗑️</button>
    `;
    container.appendChild(div);
}

function removeTeamMember(btn) {
    btn.parentElement.remove();
}

// File Upload Handling
function handleFileUpload(input, type) {
    const file = input.files[0];
    if (file) {
        const infoDiv = document.getElementById(type + 'FileInfo');
        infoDiv.textContent = `✓ ${file.name} (${formatFileSize(file.size)})`;
        infoDiv.classList.add('active');
        
        // Store file info
        studyData[type + 'File'] = {
            name: file.name,
            size: file.size,
            type: file.type
        };
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Populate Review Summary
function populateReviewSummary() {
    const summary = document.getElementById('studySummary');
    
    const summaryHTML = `
        <div class="summary-item">
            <div class="summary-label">Study Title:</div>
            <div class="summary-value">${studyData.studyTitle || 'Not provided'}</div>
        </div>
        <div class="summary-item">
            <div class="summary-label">Protocol Number:</div>
            <div class="summary-value">${studyData.protocolNumber || 'Not provided'}</div>
        </div>
        <div class="summary-item">
            <div class="summary-label">Therapeutic Area:</div>
            <div class="summary-value">${getSelectText('therapeuticArea')}</div>
        </div>
        <div class="summary-item">
            <div class="summary-label">Study Phase:</div>
            <div class="summary-value">${getSelectText('studyPhase')}</div>
        </div>
        <div class="summary-item">
            <div class="summary-label">Indication:</div>
            <div class="summary-value">${studyData.indication || 'Not provided'}</div>
        </div>
        <div class="summary-item">
            <div class="summary-label">Target Enrollment:</div>
            <div class="summary-value">${studyData.targetEnrollment || 'Not provided'} patients</div>
        </div>
        <div class="summary-item">
            <div class="summary-label">Number of Sites:</div>
            <div class="summary-value">${studyData.numberOfSites || 'Not provided'}</div>
        </div>
        <div class="summary-item">
            <div class="summary-label">Study Duration:</div>
            <div class="summary-value">${studyData.studyDuration || 'Not provided'} months</div>
        </div>
        <div class="summary-item">
            <div class="summary-label">Planned Start Date:</div>
            <div class="summary-value">${studyData.startDate || 'Not provided'}</div>
        </div>
        <div class="summary-item">
            <div class="summary-label">Age Range:</div>
            <div class="summary-value">${studyData.minAge || '?'} - ${studyData.maxAge || '?'} ${studyData.ageUnit || 'years'}</div>
        </div>
        <div class="summary-item">
            <div class="summary-label">Protocol Document:</div>
            <div class="summary-value">${studyData.protocolFile ? '✓ Uploaded' : '✗ Not uploaded'}</div>
        </div>
    `;
    
    summary.innerHTML = summaryHTML;
}

function getSelectText(selectId) {
    const select = document.getElementById(selectId);
    return select ? select.options[select.selectedIndex]?.text || 'Not selected' : 'Not selected';
}

// Submit Study
function submitStudy() {
    // Validate checkboxes
    if (!document.getElementById('confirmAccuracy').checked ||
        !document.getElementById('confirmAuthority').checked ||
        !document.getElementById('confirmTerms').checked) {
        showNotification('Please confirm all required items', 'error');
        return;
    }
    
    // Show loading
    showLoading();
    
    // Simulate submission
    setTimeout(() => {
        hideLoading();
        showSuccessMessage();
        
        // Clear draft
        localStorage.removeItem('studyCreationDraft');
        
        // Redirect after 3 seconds
        setTimeout(() => {
            window.location.href = 'app.html';
        }, 3000);
    }, 2000);
}

// UI Helper Functions
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'error' ? '#fee2e2' : '#d1fae5'};
        color: ${type === 'error' ? '#dc2626' : '#059669'};
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showLoading() {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.id = 'loadingOverlay';
    overlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <h3>Submitting Study...</h3>
            <p>Please wait while we process your submission</p>
        </div>
    `;
    document.body.appendChild(overlay);
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.remove();
}

function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <div class="success-icon">✅</div>
        <h2>Study Created Successfully!</h2>
        <p>Your study has been submitted and is now available for site matching.</p>
        <p>Redirecting to dashboard...</p>
    `;
    document.body.appendChild(message);
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

// Allow clicking on sidebar steps to navigate
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.step').forEach((step, index) => {
        step.addEventListener('click', function() {
            if (index + 1 <= currentStep || step.classList.contains('completed')) {
                saveStepData(currentStep);
                currentStep = index + 1;
                showStep(currentStep);
                updateProgress();
            }
        });
    });
});