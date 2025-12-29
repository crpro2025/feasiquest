// ===== GLOBAL STATE =====
let currentStep = 1;
const totalSteps = 10;
let formData = {};
let uploadedFiles = {};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    updateProgressBar();
    updateNavigationButtons();
});

// ===== NAVIGATION =====
function nextStep() {
    // Validate current step
    if (!validateStep(currentStep)) {
        return;
    }
    
    // Save current step data
    saveStepData(currentStep);
    
    // Move to next step
    if (currentStep < totalSteps) {
        // Mark current step as completed
        document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('completed');
        
        currentStep++;
        showStep(currentStep);
        updateProgressBar();
        updateNavigationButtons();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // Submit form
        submitRegistration();
    }
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
        updateProgressBar();
        updateNavigationButtons();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
    
    // Show current step
    document.getElementById(`step${step}`).classList.add('active');
    
    // Update progress steps
    document.querySelectorAll('.progress-step').forEach(s => s.classList.remove('active'));
    document.querySelector(`.progress-step[data-step="${step}"]`).classList.add('active');
}

function updateProgressBar() {
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Show/hide previous button
    if (currentStep === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }
    
    // Update next button text
    if (currentStep === totalSteps) {
        nextBtn.textContent = 'Submit Registration →';
    } else {
        nextBtn.textContent = 'Next →';
    }
}

// ===== VALIDATION =====
function validateStep(step) {
    const stepElement = document.getElementById(`step${step}`);
    const requiredFields = stepElement.querySelectorAll('[required]');
    let isValid = true;
    let firstInvalidField = null;
    
    // Clear previous errors
    stepElement.querySelectorAll('.error-message').forEach(e => e.remove());
    stepElement.querySelectorAll('.error').forEach(e => e.classList.remove('error'));
    
    // Validate required fields
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            field.style.borderColor = 'var(--error)';
            
            if (!firstInvalidField) {
                firstInvalidField = field;
            }
            
            // Add error message
            const errorMsg = document.createElement('span');
            errorMsg.className = 'error-message';
            errorMsg.style.color = 'var(--error)';
            errorMsg.style.fontSize = '0.85rem';
            errorMsg.style.marginTop = '5px';
            errorMsg.textContent = 'This field is required';
            field.parentElement.appendChild(errorMsg);
        } else {
            field.style.borderColor = '';
        }
    });
    
    // Step-specific validation
    if (step === 3) {
        // Validate therapeutic areas (minimum 3)
        const therapeuticChecked = stepElement.querySelectorAll('input[name="therapeutic"]:checked').length;
        if (therapeuticChecked < 3) {
            isValid = false;
            showStepError('Please select at least 3 therapeutic areas');
        }
        
        // Validate phases (minimum 1)
        const phasesChecked = stepElement.querySelectorAll('input[name="phase"]:checked').length;
        if (phasesChecked < 1) {
            isValid = false;
            showStepError('Please select at least 1 study phase');
        }
    }
    
    if (step === 4) {
        // Validate facilities (minimum 1)
        const facilitiesChecked = stepElement.querySelectorAll('input[name="facility"]:checked').length;
        if (facilitiesChecked < 1) {
            isValid = false;
            showStepError('Please select at least 1 on-site facility');
        }
    }
    
    // Scroll to first invalid field
    if (!isValid &amp;&amp; firstInvalidField) {
        firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalidField.focus();
    }
    
    return isValid;
}

function showStepError(message) {
    const stepElement = document.getElementById(`step${currentStep}`);
    const existingError = stepElement.querySelector('.step-error');
    
    if (!existingError) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'step-error';
        errorDiv.style.cssText = `
            background: rgba(239, 68, 68, 0.1);
            border: 2px solid var(--error);
            color: var(--error);
            padding: 15px 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-weight: 600;
        `;
        errorDiv.textContent = message;
        stepElement.insertBefore(errorDiv, stepElement.firstChild.nextSibling.nextSibling);
    }
}

// ===== DATA MANAGEMENT =====
function saveStepData(step) {
    const stepElement = document.getElementById(`step${step}`);
    
    // Save text inputs
    stepElement.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input[type="number"], select, textarea').forEach(field => {
        if (field.id) {
            formData[field.id] = field.value;
        }
    });
    
    // Save checkboxes
    const checkboxGroups = {};
    stepElement.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        const name = checkbox.name;
        if (name) {
            if (!checkboxGroups[name]) {
                checkboxGroups[name] = [];
            }
            if (checkbox.checked) {
                checkboxGroups[name].push(checkbox.value);
            }
        }
    });
    
    Object.assign(formData, checkboxGroups);
    
    console.log('Step ' + step + ' data saved:', formData);
}

// ===== FILE UPLOAD =====
function handleFileUpload(input, listId) {
    const files = input.files;
    const listElement = document.getElementById(listId);
    
    if (!uploadedFiles[listId]) {
        uploadedFiles[listId] = [];
    }
    
    Array.from(files).forEach(file => {
        // Validate file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
            alert(`File ${file.name} is too large. Maximum size is 10MB.`);
            return;
        }
        
        // Add to uploaded files
        uploadedFiles[listId].push(file);
        
        // Create file item
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div class="file-info">
                <span class="file-icon">${getFileIcon(file.type)}</span>
                <div class="file-details">
                    <span class="file-name">${file.name}</span>
                    <span class="file-size">${formatFileSize(file.size)}</span>
                </div>
            </div>
            <button type="button" class="file-remove" onclick="removeFile('${listId}', '${file.name}')">Remove</button>
        `;
        
        listElement.appendChild(fileItem);
    });
    
    // Clear input
    input.value = '';
}

function removeFile(listId, fileName) {
    // Remove from uploaded files
    uploadedFiles[listId] = uploadedFiles[listId].filter(f => f.name !== fileName);
    
    // Remove from UI
    const listElement = document.getElementById(listId);
    const fileItems = listElement.querySelectorAll('.file-item');
    fileItems.forEach(item => {
        if (item.querySelector('.file-name').textContent === fileName) {
            item.remove();
        }
    });
}

function getFileIcon(type) {
    if (type.startsWith('image/')) return '🖼️';
    if (type === 'application/pdf') return '📄';
    if (type.startsWith('video/')) return '🎥';
    return '📎';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// ===== FORM SUBMISSION =====
function submitRegistration() {
    // Save final step data
    saveStepData(currentStep);
    
    // Show loading state
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.disabled = true;
    nextBtn.textContent = 'Submitting...';
    
    // Simulate API call
    setTimeout(() => {
        console.log('Registration submitted:', formData);
        console.log('Uploaded files:', uploadedFiles);
        
        // Show success message
        showSuccessModal();
    }, 2000);
}

function showSuccessModal() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 50px; border-radius: 16px; max-width: 600px; text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 20px;">✅</div>
            <h2 style="font-size: 2rem; margin-bottom: 15px; color: var(--gray-900);">Registration Successful!</h2>
            <p style="font-size: 1.1rem; color: var(--gray-600); margin-bottom: 30px;">
                Thank you for registering your site with FeasiQuest. Our team will review your submission and activate your profile within 24-48 hours.
            </p>
            <p style="font-size: 1rem; color: var(--gray-600); margin-bottom: 30px;">
                You will receive a confirmation email at <strong>${formData.siteEmail || 'your email'}</strong> with next steps.
            </p>
            <button onclick="window.location.href='app.html'" style="padding: 14px 40px; background: var(--primary); color: white; border: none; border-radius: 8px; font-size: 1.05rem; font-weight: 600; cursor: pointer;">
                Go to Dashboard
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// ===== PROGRESS STEP CLICK =====
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.progress-step').forEach(step => {
        step.addEventListener('click', function() {
            const stepNum = parseInt(this.dataset.step);
            if (stepNum < currentStep) {
                // Allow going back to previous steps
                currentStep = stepNum;
                showStep(currentStep);
                updateProgressBar();
                updateNavigationButtons();
            }
        });
    });
});

// ===== AUTO-SAVE =====
setInterval(() => {
    if (currentStep > 0) {
        saveStepData(currentStep);
        console.log('Auto-saved');
    }
}, 30000); // Auto-save every 30 seconds