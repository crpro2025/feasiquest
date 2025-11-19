// Create Study JavaScript

let currentStep = 1;
const totalSteps = 9;
let formData = {};
let autoSaveInterval;
let generatedQuestions = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    initializeFileUploads();
    initializeAutoSave();
    loadDraftIfExists();
});

// Initialize form
function initializeForm() {
    updateProgressBar();
    updateStepIndicators();
    updateNavigationButtons();
    
    // Add input listeners for validation
    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

// Next step
function nextStep() {
    if (validateCurrentStep()) {
        saveCurrentStepData();
        
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}

// Previous step
function previousStep() {
    if (currentStep > 1) {
        saveCurrentStepData();
        currentStep--;
        showStep(currentStep);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Show step
function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(s => {
        s.classList.remove('active');
    });
    
    // Show current step
    const currentStepElement = document.querySelector(`.form-step[data-step="${step}"]`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
    }
    
    // Update step indicators
    document.querySelectorAll('.step').forEach((s, index) => {
        s.classList.remove('active', 'completed');
        if (index + 1 < step) {
            s.classList.add('completed');
        } else if (index + 1 === step) {
            s.classList.add('active');
        }
    });
    
    // Generate review summary if on last step
    if (step === totalSteps) {
        generateReviewSummary();
    }
    
    updateProgressBar();
    updateNavigationButtons();
}

// Update progress bar
function updateProgressBar() {
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}

// Update step indicators
function updateStepIndicators() {
    document.querySelectorAll('.step').forEach((step, index) => {
        step.addEventListener('click', function() {
            const targetStep = index + 1;
            if (targetStep < currentStep || validateStepsUpTo(targetStep - 1)) {
                saveCurrentStepData();
                currentStep = targetStep;
                showStep(currentStep);
            }
        });
    });
}

// Update navigation buttons
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    prevBtn.style.display = currentStep === 1 ? 'none' : 'block';
    
    if (currentStep === totalSteps) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
}

// Validate current step
function validateCurrentStep() {
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Special validation for checkboxes in step 4
    if (currentStep === 4) {
        const regionCheckboxes = currentStepElement.querySelectorAll('input[name="regions"]:checked');
        if (regionCheckboxes.length === 0) {
            showNotification('Please select at least one geographic region', 'error');
            isValid = false;
        }
    }
    
    if (!isValid) {
        showNotification('Please fill in all required fields', 'error');
    }
    
    return isValid;
}

// Validate field
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    }
    
    if (field.type === 'number' && value) {
        const min = field.getAttribute('min');
        if (min && parseFloat(value) < parseFloat(min)) {
            isValid = false;
        }
    }
    
    // Update field styling
    if (isValid) {
        field.classList.remove('invalid');
        field.classList.add('valid');
    } else {
        field.classList.remove('valid');
        field.classList.add('invalid');
    }
    
    return isValid;
}

// Validate steps up to
function validateStepsUpTo(step) {
    for (let i = 1; i <= step; i++) {
        const stepElement = document.querySelector(`.form-step[data-step="${i}"]`);
        const requiredFields = stepElement.querySelectorAll('[required]');
        
        for (let field of requiredFields) {
            if (!field.value.trim()) {
                return false;
            }
        }
    }
    return true;
}

// Save current step data
function saveCurrentStepData() {
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const inputs = currentStepElement.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            if (!formData[input.name]) {
                formData[input.name] = [];
            }
            if (input.checked && !formData[input.name].includes(input.value)) {
                formData[input.name].push(input.value);
            }
        } else if (input.type === 'radio') {
            if (input.checked) {
                formData[input.name] = input.value;
            }
        } else {
            formData[input.name] = input.value;
        }
    });
}

// Generate review summary
function generateReviewSummary() {
    const summaryContainer = document.getElementById('reviewSummary');
    
    const sections = [
        {
            title: 'Basic Information',
            fields: [
                { label: 'Study Title', key: 'studyTitle' },
                { label: 'Phase', key: 'studyPhase' },
                { label: 'Therapeutic Area', key: 'therapeuticArea' },
                { label: 'Indication', key: 'indication' }
            ]
        },
        {
            title: 'Protocol Details',
            fields: [
                { label: 'Protocol Number', key: 'protocolNumber' },
                { label: 'Study Design', key: 'studyDesign' },
                { label: 'Randomization', key: 'randomization' },
                { label: 'Blinding', key: 'blinding' }
            ]
        },
        {
            title: 'Patient Criteria',
            fields: [
                { label: 'Age Range', key: 'ageRange', value: `${formData.minAge || 'N/A'} - ${formData.maxAge || 'No limit'}` },
                { label: 'Gender', key: 'gender' },
                { label: 'Inclusion Criteria', key: 'inclusionCriteria', truncate: true },
                { label: 'Exclusion Criteria', key: 'exclusionCriteria', truncate: true }
            ]
        },
        {
            title: 'Site Requirements',
            fields: [
                { label: 'Target Sites', key: 'targetSites' },
                { label: 'Target Enrollment', key: 'targetEnrollment' },
                { label: 'Geographic Regions', key: 'regions', isArray: true }
            ]
        },
        {
            title: 'Budget & Timeline',
            fields: [
                { label: 'Start Date', key: 'startDate' },
                { label: 'End Date', key: 'endDate' },
                { label: 'Total Budget', key: 'totalBudget', format: 'currency' },
                { label: 'Per-Patient Budget', key: 'perPatientBudget', format: 'currency' }
            ]
        },
        {
            title: 'Study Team',
            fields: [
                { label: 'Principal Investigator', key: 'piName' },
                { label: 'PI Email', key: 'piEmail' },
                { label: 'Study Director', key: 'directorName' }
            ]
        }
    ];
    
    summaryContainer.innerHTML = sections.map(section => {
        const items = section.fields.map(field => {
            let value = field.value || formData[field.key] || 'Not provided';
            
            if (field.isArray && Array.isArray(formData[field.key])) {
                value = formData[field.key].join(', ');
            }
            
            if (field.format === 'currency' && value !== 'Not provided') {
                value = `$${parseFloat(value).toLocaleString()}`;
            }
            
            if (field.truncate && value.length > 100) {
                value = value.substring(0, 100) + '...';
            }
            
            return `
                <div class="summary-item">
                    <span class="summary-label">${field.label}:</span>
                    <span class="summary-value">${value}</span>
                </div>
            `;
        }).join('');
        
        return `
            <div class="summary-section">
                <h3>${section.title}</h3>
                ${items}
            </div>
        `;
    }).join('');
}

// Initialize file uploads
function initializeFileUploads() {
    document.querySelectorAll('.file-upload-area').forEach(area => {
        const input = area.querySelector('input[type="file"]');
        
        area.addEventListener('click', () => input.click());
        
        input.addEventListener('change', function() {
            if (this.files.length > 0) {
                handleFileUpload(this.files, area);
            }
        });
        
        // Drag and drop
        area.addEventListener('dragover', (e) => {
            e.preventDefault();
            area.style.borderColor = '#00f0ff';
        });
        
        area.addEventListener('dragleave', () => {
            area.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        });
        
        area.addEventListener('drop', (e) => {
            e.preventDefault();
            area.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            
            if (e.dataTransfer.files.length > 0) {
                input.files = e.dataTransfer.files;
                handleFileUpload(e.dataTransfer.files, area);
            }
        });
    });
}

// Handle file upload
function handleFileUpload(files, area) {
    const fileNames = Array.from(files).map(f => f.name).join(', ');
    area.classList.add('has-file');
    area.querySelector('p').textContent = `✓ ${fileNames}`;
    showNotification(`File(s) uploaded: ${fileNames}`, 'success');
}

// Initialize auto-save
function initializeAutoSave() {
    autoSaveInterval = setInterval(() => {
        saveCurrentStepData();
        saveDraft();
    }, 30000); // Auto-save every 30 seconds
}

// Save draft
function saveDraft() {
    localStorage.setItem('studyDraft', JSON.stringify({
        currentStep,
        formData,
        timestamp: new Date().toISOString()
    }));
    
    showAutoSaveIndicator();
}

// Load draft if exists
function loadDraftIfExists() {
    const draft = localStorage.getItem('studyDraft');
    
    if (draft) {
        const { currentStep: savedStep, formData: savedData, timestamp } = JSON.parse(draft);
        
        const draftDate = new Date(timestamp);
        const now = new Date();
        const hoursSince = (now - draftDate) / (1000 * 60 * 60);
        
        if (hoursSince < 24) {
            if (confirm('A draft was found. Would you like to continue from where you left off?')) {
                currentStep = savedStep;
                formData = savedData;
                restoreFormData();
                showStep(currentStep);
                showNotification('Draft restored successfully', 'success');
            }
        }
    }
}

// Restore form data
function restoreFormData() {
    Object.keys(formData).forEach(key => {
        const elements = document.querySelectorAll(`[name="${key}"]`);
        
        elements.forEach(element => {
            if (element.type === 'checkbox') {
                if (Array.isArray(formData[key]) && formData[key].includes(element.value)) {
                    element.checked = true;
                }
            } else if (element.type === 'radio') {
                if (element.value === formData[key]) {
                    element.checked = true;
                }
            } else {
                element.value = formData[key];
            }
        });
    });
}

// Show auto-save indicator
function showAutoSaveIndicator() {
    const indicator = document.querySelector('.autosave-indicator') || createAutoSaveIndicator();
    indicator.classList.add('show');
    
    setTimeout(() => {
        indicator.classList.remove('show');
    }, 2000);
}

// Create auto-save indicator
function createAutoSaveIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'autosave-indicator';
    indicator.innerHTML = '💾 Draft saved';
    document.body.appendChild(indicator);
    return indicator;
}

// Form submission
document.getElementById('studyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
        return;
    }
    
    saveCurrentStepData();
    
    // Show loading
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading-spinner"></span> Creating Study...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        localStorage.removeItem('studyDraft');
        clearInterval(autoSaveInterval);
        
        showNotification('Study created successfully!', 'success');
        
        setTimeout(() => {
            window.location.href = 'app.html';
        }, 2000);
    }, 2000);
});

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

// Add loading spinner styles
const style = document.createElement('style');
style.textContent = `
    .loading-spinner {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
        margin-right: 0.5rem;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
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

// Questionnaire Generation Functions
function generateQuestionnaire() {
    const studyData = formData;
    
    // Auto-generate questions based on study details
    generatedQuestions = [
        {
            id: 1,
            text: `Do you have experience conducting ${studyData.therapeuticArea || 'clinical'} trials?`,
            type: 'Yes/No',
            required: true,
            category: 'Experience'
        },
        {
            id: 2,
            text: `How many ${studyData.phase || 'Phase III'} trials have you completed in the past 3 years?`,
            type: 'Number',
            required: true,
            category: 'Experience'
        },
        {
            id: 3,
            text: `Can you enroll ${studyData.targetEnrollment || '100'} patients for this study?`,
            type: 'Yes/No',
            required: true,
            category: 'Enrollment'
        },
        {
            id: 4,
            text: 'What is your average monthly enrollment rate for similar studies?',
            type: 'Number',
            required: true,
            category: 'Enrollment'
        },
        {
            id: 5,
            text: 'Do you have access to the required patient population?',
            type: 'Yes/No',
            required: true,
            category: 'Patient Population'
        },
        {
            id: 6,
            text: 'How many eligible patients do you currently have in your database?',
            type: 'Number',
            required: true,
            category: 'Patient Population'
        },
        {
            id: 7,
            text: 'Do you have the required equipment and facilities for this study?',
            type: 'Yes/No',
            required: true,
            category: 'Facilities'
        },
        {
            id: 8,
            text: 'List all specialized equipment available at your site:',
            type: 'Long Text',
            required: true,
            category: 'Facilities'
        },
        {
            id: 9,
            text: 'How many qualified study coordinators do you have?',
            type: 'Number',
            required: true,
            category: 'Staff'
        },
        {
            id: 10,
            text: 'Do you have experience with the required study procedures?',
            type: 'Yes/No',
            required: true,
            category: 'Capabilities'
        },
        {
            id: 11,
            text: 'What is your site\'s patient retention rate?',
            type: 'Percentage',
            required: true,
            category: 'Performance'
        },
        {
            id: 12,
            text: 'Can you meet the proposed study timeline?',
            type: 'Yes/No',
            required: true,
            category: 'Timeline'
        },
        {
            id: 13,
            text: 'When can you start enrolling patients?',
            type: 'Date',
            required: true,
            category: 'Timeline'
        },
        {
            id: 14,
            text: 'Do you have IRB approval or can you obtain it within 30 days?',
            type: 'Yes/No',
            required: true,
            category: 'Regulatory'
        },
        {
            id: 15,
            text: 'List all relevant certifications and accreditations:',
            type: 'Long Text',
            required: true,
            category: 'Regulatory'
        },
        {
            id: 16,
            text: 'What is your budget per patient for this type of study?',
            type: 'Currency',
            required: true,
            category: 'Budget'
        },
        {
            id: 17,
            text: 'Do you have experience with the study sponsor or CRO?',
            type: 'Yes/No',
            required: false,
            category: 'Experience'
        },
        {
            id: 18,
            text: 'Are there any competing studies at your site?',
            type: 'Yes/No',
            required: true,
            category: 'Feasibility'
        },
        {
            id: 19,
            text: 'What is your site\'s screen failure rate for similar studies?',
            type: 'Percentage',
            required: true,
            category: 'Performance'
        },
        {
            id: 20,
            text: 'Additional comments or information:',
            type: 'Long Text',
            required: false,
            category: 'Other'
        }
    ];
    
    renderQuestionnaire();
}

function renderQuestionnaire() {
    const preview = document.getElementById('questionnairePreview');
    if (!preview) return;
    
    preview.innerHTML = generatedQuestions.map(q => `
        <div class="question-item" data-question-id="${q.id}">
            <div class="question-header">
                <span class="question-number">Question ${q.id}</span>
                <div class="question-actions">
                    <button type="button" onclick="editQuestion(${q.id})">✏️ Edit</button>
                    <button type="button" onclick="deleteQuestion(${q.id})">🗑️ Delete</button>
                </div>
            </div>
            <div class="question-text">${q.text}</div>
            <div class="question-type">Type: ${q.type} | Category: ${q.category}</div>
            ${q.required ? '<div class="question-required">* Required</div>' : ''}
        </div>
    `).join('');
}

function regenerateQuestionnaire() {
    if (confirm('This will regenerate all questions based on your study details. Any custom questions will be lost. Continue?')) {
        generateQuestionnaire();
        showNotification('Questionnaire regenerated successfully!', 'success');
    }
}

function addCustomQuestion() {
    const questionText = prompt('Enter your question:');
    if (!questionText) return;
    
    const questionType = prompt('Question type (Short Text, Long Text, Yes/No, Number, Date, etc.):');
    if (!questionType) return;
    
    const newQuestion = {
        id: generatedQuestions.length + 1,
        text: questionText,
        type: questionType,
        required: confirm('Is this question required?'),
        category: 'Custom'
    };
    
    generatedQuestions.push(newQuestion);
    renderQuestionnaire();
    showNotification('Custom question added!', 'success');
}

function editQuestion(id) {
    const question = generatedQuestions.find(q => q.id === id);
    if (!question) return;
    
    const newText = prompt('Edit question text:', question.text);
    if (newText) {
        question.text = newText;
        renderQuestionnaire();
        showNotification('Question updated!', 'success');
    }
}

function deleteQuestion(id) {
    if (confirm('Are you sure you want to delete this question?')) {
        generatedQuestions = generatedQuestions.filter(q => q.id !== id);
        // Renumber questions
        generatedQuestions.forEach((q, index) => {
            q.id = index + 1;
        });
        renderQuestionnaire();
        showNotification('Question deleted!', 'success');
    }
}

function generateQuestionnaireSummary() {
    const summary = document.getElementById('questionnaireSummary');
    if (!summary) return;
    
    const requiredCount = generatedQuestions.filter(q => q.required).length;
    const optionalCount = generatedQuestions.length - requiredCount;
    
    const categories = [...new Set(generatedQuestions.map(q => q.category))];
    
    summary.innerHTML = `
        <div class="summary-stat">
            <span class="summary-label">Total Questions:</span>
            <span class="summary-value">${generatedQuestions.length}</span>
        </div>
        <div class="summary-stat">
            <span class="summary-label">Required Questions:</span>
            <span class="summary-value">${requiredCount}</span>
        </div>
        <div class="summary-stat">
            <span class="summary-label">Optional Questions:</span>
            <span class="summary-value">${optionalCount}</span>
        </div>
        <div class="summary-stat">
            <span class="summary-label">Categories:</span>
            <span class="summary-value">${categories.join(', ')}</span>
        </div>
        <div class="summary-stat">
            <span class="summary-label">Estimated Completion Time:</span>
            <span class="summary-value">${Math.ceil(generatedQuestions.length * 2)} minutes</span>
        </div>
    `;
}

// Override showStep to handle questionnaire generation
const originalShowStep = showStep;
function showStep(step) {
    originalShowStep(step);
    
    // Generate questionnaire when entering step 8
    if (step === 8 && generatedQuestions.length === 0) {
        generateQuestionnaire();
    }
    
    // Generate summary when entering step 9
    if (step === 9) {
        generateQuestionnaireSummary();
    }
}

// Export functions
window.nextStep = nextStep;
window.previousStep = previousStep;
window.saveDraft = saveDraft;
window.regenerateQuestionnaire = regenerateQuestionnaire;
window.addCustomQuestion = addCustomQuestion;
window.editQuestion = editQuestion;
window.deleteQuestion = deleteQuestion;