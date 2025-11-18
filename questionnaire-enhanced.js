// Enhanced Questionnaire JavaScript

// Current section tracking
let currentSection = 1;
const totalSections = 7;

// Auto-save interval
let autoSaveInterval;
let lastSaveTime = new Date();

// Form data storage
let formData = {};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeQuestionnaire();
    loadSavedData();
    setupEventListeners();
    startAutoSave();
    setupFileUploads();
});

// Initialize questionnaire
function initializeQuestionnaire() {
    showSection(1);
    updateProgress();
}

// Setup event listeners
function setupEventListeners() {
    // Navigation buttons
    document.getElementById('nextBtn').addEventListener('click', nextSection);
    document.getElementById('prevBtn').addEventListener('click', prevSection);
    document.getElementById('submitBtn').addEventListener('click', submitQuestionnaire);
    
    // Banner actions
    document.getElementById('verifyAllBtn').addEventListener('click', verifyAllPrefilledData);
    document.getElementById('closeBannerBtn').addEventListener('click', closeBanner);
    
    // Header actions
    document.getElementById('saveDraftBtn').addEventListener('click', saveDraft);
    document.getElementById('previewBtn').addEventListener('click', previewQuestionnaire);
    
    // Form inputs - track changes
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('change', function() {
            saveFormData();
            updateAutoSaveIndicator();
        });
    });
    
    // Competing studies conditional display
    const competingStudiesRadios = document.querySelectorAll('input[name="competingStudies"]');
    competingStudiesRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const detailsDiv = document.getElementById('competingStudiesDetails');
            if (this.value === 'yes') {
                detailsDiv.style.display = 'block';
            } else {
                detailsDiv.style.display = 'none';
            }
        });
    });
}

// Show specific section
function showSection(sectionNum) {
    // Hide all sections
    const sections = document.querySelectorAll('.form-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show current section
    document.getElementById(`section${sectionNum}`).classList.add('active');
    
    // Update step indicators
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 === sectionNum) {
            step.classList.add('active');
        } else if (index + 1 < sectionNum) {
            step.classList.add('completed');
        }
    });
    
    // Update navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (sectionNum === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }
    
    if (sectionNum === totalSections) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Next section
function nextSection() {
    if (validateCurrentSection()) {
        currentSection++;
        showSection(currentSection);
        updateProgress();
        saveFormData();
    }
}

// Previous section
function prevSection() {
    currentSection--;
    showSection(currentSection);
    updateProgress();
}

// Update progress bar
function updateProgress() {
    const progress = (currentSection / totalSections) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = 
        `Step ${currentSection} of ${totalSections} - ${Math.round(progress)}% Complete`;
}

// Validate current section
function validateCurrentSection() {
    const currentSectionElement = document.getElementById(`section${currentSection}`);
    const requiredFields = currentSectionElement.querySelectorAll('[required]');
    
    let isValid = true;
    let firstInvalidField = null;
    
    requiredFields.forEach(field => {
        if (!field.value || (field.type === 'checkbox' && !isCheckboxGroupValid(field))) {
            isValid = false;
            field.style.borderColor = 'var(--danger-color)';
            if (!firstInvalidField) {
                firstInvalidField = field;
            }
        } else {
            field.style.borderColor = '';
        }
    });
    
    if (!isValid) {
        alert('Please fill in all required fields before proceeding.');
        if (firstInvalidField) {
            firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstInvalidField.focus();
        }
    }
    
    return isValid;
}

// Check if checkbox group has at least one checked
function isCheckboxGroupValid(checkbox) {
    const name = checkbox.name;
    const checkboxes = document.querySelectorAll(`input[name="${name}"]`);
    return Array.from(checkboxes).some(cb => cb.checked);
}

// Save form data to localStorage
function saveFormData() {
    const form = document.getElementById('questionnaireForm');
    const formElements = form.elements;
    
    formData = {};
    
    for (let element of formElements) {
        if (element.name) {
            if (element.type === 'checkbox') {
                if (!formData[element.name]) {
                    formData[element.name] = [];
                }
                if (element.checked) {
                    formData[element.name].push(element.value);
                }
            } else if (element.type === 'radio') {
                if (element.checked) {
                    formData[element.name] = element.value;
                }
            } else {
                formData[element.name] = element.value;
            }
        } else if (element.id) {
            formData[element.id] = element.value;
        }
    }
    
    localStorage.setItem('questionnaireData', JSON.stringify(formData));
    localStorage.setItem('currentSection', currentSection);
}

// Load saved data from localStorage
function loadSavedData() {
    const savedData = localStorage.getItem('questionnaireData');
    const savedSection = localStorage.getItem('currentSection');
    
    if (savedData) {
        formData = JSON.parse(savedData);
        
        // Populate form fields
        for (let key in formData) {
            const element = document.getElementById(key) || document.querySelector(`[name="${key}"]`);
            
            if (element) {
                if (element.type === 'checkbox') {
                    const checkboxes = document.querySelectorAll(`[name="${key}"]`);
                    checkboxes.forEach(cb => {
                        if (formData[key].includes(cb.value)) {
                            cb.checked = true;
                        }
                    });
                } else if (element.type === 'radio') {
                    const radio = document.querySelector(`[name="${key}"][value="${formData[key]}"]`);
                    if (radio) radio.checked = true;
                } else {
                    element.value = formData[key];
                }
            }
        }
    }
    
    if (savedSection) {
        currentSection = parseInt(savedSection);
        showSection(currentSection);
        updateProgress();
    }
}

// Auto-save functionality
function startAutoSave() {
    autoSaveInterval = setInterval(() => {
        saveFormData();
        updateAutoSaveIndicator();
    }, 30000); // Auto-save every 30 seconds
}

// Update auto-save indicator
function updateAutoSaveIndicator() {
    lastSaveTime = new Date();
    const timeString = lastSaveTime.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
    document.getElementById('autoSaveIndicator').textContent = `✓ Auto-saved at ${timeString}`;
}

// Save draft manually
function saveDraft() {
    saveFormData();
    updateAutoSaveIndicator();
    
    // Show confirmation
    const btn = document.getElementById('saveDraftBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '✓ Saved!';
    btn.style.background = 'var(--success-color)';
    btn.style.color = 'white';
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.color = '';
    }, 2000);
}

// Preview questionnaire
function previewQuestionnaire() {
    saveFormData();
    
    // Create preview modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 2rem;
        max-width: 800px;
        max-height: 80vh;
        overflow-y: auto;
        width: 100%;
    `;
    
    modalContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
            <h2 style="margin: 0;">Questionnaire Preview</h2>
            <button onclick="this.closest('.preview-modal').remove()" style="background: none; border: none; font-size: 2rem; cursor: pointer; color: #6b7280;">×</button>
        </div>
        <div style="color: #6b7280; line-height: 1.8;">
            <p><strong>Note:</strong> This is a preview of your questionnaire responses. You can continue editing before final submission.</p>
            <p style="margin-top: 1rem;"><strong>Completion:</strong> ${Math.round((currentSection / totalSections) * 100)}%</p>
            <p><strong>Sections Completed:</strong> ${currentSection} of ${totalSections}</p>
        </div>
    `;
    
    modal.className = 'preview-modal';
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Verify all pre-filled data
function verifyAllPrefilledData() {
    const prefilledFields = document.querySelectorAll('.prefilled');
    
    prefilledFields.forEach(field => {
        field.style.borderColor = 'var(--success-color)';
        field.style.background = '#f0fdf4';
    });
    
    // Update button
    const btn = document.getElementById('verifyAllBtn');
    btn.innerHTML = '✓ All Data Verified';
    btn.style.background = 'var(--success-color)';
    
    setTimeout(() => {
        prefilledFields.forEach(field => {
            field.style.borderColor = '';
            field.style.background = '';
        });
    }, 2000);
}

// Close banner
function closeBanner() {
    document.getElementById('prefillBanner').style.display = 'none';
}

// Setup file uploads
function setupFileUploads() {
    setupFileUpload('piCV', 'piCVList');
    setupFileUpload('equipmentPhotos', 'equipmentPhotosList');
    setupFileUpload('sitePhotos', 'sitePhotosList');
    setupFileUpload('siteVideos', 'siteVideosList');
    setupFileUpload('supportingDocs', 'supportingDocsList');
}

// Setup individual file upload
function setupFileUpload(inputId, listId) {
    const input = document.getElementById(inputId);
    const list = document.getElementById(listId);
    
    if (!input || !list) return;
    
    input.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        
        files.forEach(file => {
            const fileItem = createFileItem(file);
            list.appendChild(fileItem);
        });
        
        // Show the list
        list.style.display = 'flex';
    });
}

// Create file item element
function createFileItem(file) {
    const item = document.createElement('div');
    item.className = 'uploaded-file';
    
    const fileIcon = getFileIcon(file.type);
    const fileSize = formatFileSize(file.size);
    
    item.innerHTML = `
        <div class="file-info">
            <span class="file-icon">${fileIcon}</span>
            <div class="file-details">
                <span class="file-name">${file.name}</span>
                <span class="file-size">${fileSize}</span>
            </div>
        </div>
        <button type="button" class="file-remove" onclick="this.parentElement.remove()">×</button>
    `;
    
    return item;
}

// Get file icon based on type
function getFileIcon(type) {
    if (type.startsWith('image/')) return '🖼️';
    if (type.startsWith('video/')) return '🎥';
    if (type.includes('pdf')) return '📄';
    if (type.includes('word')) return '📝';
    return '📎';
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Submit questionnaire
function submitQuestionnaire(e) {
    e.preventDefault();
    
    if (!validateCurrentSection()) {
        return;
    }
    
    // Save final data
    saveFormData();
    
    // Show confirmation modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 3rem;
        max-width: 500px;
        text-align: center;
        width: 100%;
    `;
    
    modalContent.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 1rem;">✓</div>
        <h2 style="color: var(--success-color); margin-bottom: 1rem;">Questionnaire Submitted!</h2>
        <p style="color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.6;">
            Thank you for completing the feasibility questionnaire. Your response has been sent to Global Pharma Inc. 
            They will review your submission and contact you within 3-5 business days.
        </p>
        <button onclick="window.location.href='app.html'" style="
            padding: 1rem 2rem;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            font-size: 1rem;
        ">Return to Dashboard</button>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Clear saved data
    localStorage.removeItem('questionnaireData');
    localStorage.removeItem('currentSection');
    
    // Stop auto-save
    clearInterval(autoSaveInterval);
}

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    saveFormData();
});