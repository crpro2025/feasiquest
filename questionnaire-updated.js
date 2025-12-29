// Questionnaire Updated JavaScript

let currentSection = 1;
let totalSections = 7;
let formData = {};
let autoSaveInterval;
let uploadedFiles = {};

// Section question counts
const sectionQuestions = {
    1: 7,
    2: 8,
    3: 10,
    4: 8,
    5: 7,
    6: 6,
    7: 4
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadSavedData();
    updateProgress();
    startAutoSave();
    
    // Add change listeners to all form inputs
    const form = document.getElementById('questionnaireForm');
    form.addEventListener('change', function() {
        updateProgress();
    });
    
    form.addEventListener('input', function() {
        updateProgress();
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitQuestionnaire();
    });
});

// Section Navigation
function goToSection(sectionNum) {
    if (sectionNum < 1 || sectionNum > totalSections) return;
    
    // Hide all sections
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    document.getElementById(`section${sectionNum}`).classList.add('active');
    
    // Update section nav buttons
    document.querySelectorAll('.section-nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionNum}"]`).classList.add('active');
    
    // Update current section
    currentSection = sectionNum;
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextSection() {
    if (currentSection < totalSections) {
        goToSection(currentSection + 1);
    }
}

function previousSection() {
    if (currentSection > 1) {
        goToSection(currentSection - 1);
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    // Show/hide previous button
    prevBtn.style.display = currentSection === 1 ? 'none' : 'block';
    
    // Show/hide next/submit buttons
    if (currentSection === totalSections) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
}

// Progress Tracking
function updateProgress() {
    const form = document.getElementById('questionnaireForm');
    const formElements = form.querySelectorAll('input, select, textarea');
    
    let totalQuestions = 0;
    let answeredQuestions = 0;
    
    // Count total and answered questions
    const processedNames = new Set();
    
    formElements.forEach(element => {
        const name = element.name;
        if (!name || processedNames.has(name)) return;
        
        processedNames.add(name);
        totalQuestions++;
        
        // Check if answered
        if (element.type === 'checkbox' || element.type === 'radio') {
            const checked = form.querySelectorAll(`[name="${name}"]:checked`);
            if (checked.length > 0) answeredQuestions++;
        } else if (element.type === 'file') {
            if (uploadedFiles[name] && uploadedFiles[name].length > 0) answeredQuestions++;
        } else {
            if (element.value.trim() !== '') answeredQuestions++;
        }
    });
    
    // Update overall progress
    const percentage = Math.round((answeredQuestions / totalQuestions) * 100);
    document.getElementById('progressPercentage').textContent = `${percentage}%`;
    document.getElementById('progressFill').style.width = `${percentage}%`;
    document.getElementById('answeredCount').textContent = answeredQuestions;
    
    // Update section progress
    updateSectionProgress();
}

function updateSectionProgress() {
    for (let i = 1; i <= totalSections; i++) {
        const section = document.getElementById(`section${i}`);
        const formElements = section.querySelectorAll('input, select, textarea');
        
        let answered = 0;
        const processedNames = new Set();
        
        formElements.forEach(element => {
            const name = element.name;
            if (!name || processedNames.has(name)) return;
            
            processedNames.add(name);
            
            if (element.type === 'checkbox' || element.type === 'radio') {
                const checked = section.querySelectorAll(`[name="${name}"]:checked`);
                if (checked.length > 0) answered++;
            } else if (element.type === 'file') {
                if (uploadedFiles[name] && uploadedFiles[name].length > 0) answered++;
            } else {
                if (element.value.trim() !== '') answered++;
            }
        });
        
        // Update section progress display
        const progressElement = document.getElementById(`section${i}Progress`);
        progressElement.textContent = `${answered}/${sectionQuestions[i]}`;
        
        // Mark section as completed if all questions answered
        const navBtn = document.querySelector(`[data-section="${i}"]`);
        if (answered === sectionQuestions[i]) {
            navBtn.classList.add('completed');
        } else {
            navBtn.classList.remove('completed');
        }
    }
}

// File Upload Handling
function handleFileUpload(input, previewId) {
    const files = Array.from(input.files);
    const previewContainer = document.getElementById(previewId);
    
    if (!uploadedFiles[input.name]) {
        uploadedFiles[input.name] = [];
    }
    
    files.forEach(file => {
        uploadedFiles[input.name].push(file);
        
        const fileItem = document.createElement('div');
        fileItem.className = 'file-preview-item';
        
        const icon = getFileIcon(file.type);
        const size = formatFileSize(file.size);
        
        fileItem.innerHTML = `
            <div class="file-preview-icon">${icon}</div>
            <div class="file-preview-info">
                <div class="file-preview-name">${file.name}</div>
                <div class="file-preview-size">${size}</div>
            </div>
            <button type="button" class="file-preview-remove" onclick="removeFile('${input.name}', '${file.name}', '${previewId}')">
                Remove
            </button>
        `;
        
        previewContainer.appendChild(fileItem);
    });
    
    updateProgress();
    showNotification(`${files.length} file(s) uploaded successfully`, 'success');
}

function removeFile(inputName, fileName, previewId) {
    uploadedFiles[inputName] = uploadedFiles[inputName].filter(f => f.name !== fileName);
    
    const previewContainer = document.getElementById(previewId);
    const items = previewContainer.querySelectorAll('.file-preview-item');
    
    items.forEach(item => {
        if (item.querySelector('.file-preview-name').textContent === fileName) {
            item.remove();
        }
    });
    
    updateProgress();
    showNotification('File removed', 'info');
}

function getFileIcon(type) {
    if (type.includes('pdf')) return '📄';
    if (type.includes('image')) return '🖼️';
    if (type.includes('video')) return '🎥';
    if (type.includes('word') || type.includes('document')) return '📝';
    return '📎';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Auto-save
function startAutoSave() {
    autoSaveInterval = setInterval(() => {
        saveFormData();
    }, 60000); // Auto-save every 60 seconds
}

function saveFormData() {
    const form = document.getElementById('questionnaireForm');
    const formElements = form.querySelectorAll('input, select, textarea');
    
    formData = {};
    
    formElements.forEach(element => {
        const name = element.name;
        if (!name) return;
        
        if (element.type === 'checkbox') {
            if (!formData[name]) formData[name] = [];
            if (element.checked) formData[name].push(element.value);
        } else if (element.type === 'radio') {
            if (element.checked) formData[name] = element.value;
        } else if (element.type !== 'file') {
            formData[name] = element.value;
        }
    });
    
    localStorage.setItem('questionnaireData', JSON.stringify(formData));
    
    // Update auto-save status
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('autoSaveStatus').innerHTML = `
        <span class="status-dot"></span> Last saved: ${timeString}
    `;
}

function loadSavedData() {
    const savedData = localStorage.getItem('questionnaireData');
    if (!savedData) return;
    
    formData = JSON.parse(savedData);
    const form = document.getElementById('questionnaireForm');
    
    Object.keys(formData).forEach(name => {
        const elements = form.querySelectorAll(`[name="${name}"]`);
        
        elements.forEach(element => {
            if (element.type === 'checkbox') {
                if (Array.isArray(formData[name]) && formData[name].includes(element.value)) {
                    element.checked = true;
                }
            } else if (element.type === 'radio') {
                if (element.value === formData[name]) {
                    element.checked = true;
                }
            } else if (element.type !== 'file') {
                element.value = formData[name];
            }
        });
    });
    
    updateProgress();
    showNotification('Previous data restored', 'info');
}

function saveDraft() {
    saveFormData();
    showNotification('Draft saved successfully', 'success');
}

// Preview Response
function previewResponse() {
    saveFormData();
    
    const previewContent = document.getElementById('previewContent');
    previewContent.innerHTML = '';
    
    // Section 1: Site Information
    const section1 = createPreviewSection('Site Information', [
        { label: 'Site Name', value: formData.siteName || 'Not provided' },
        { label: 'Principal Investigator', value: formData.piName || 'Not provided' },
        { label: 'PI Email', value: formData.piEmail || 'Not provided' },
        { label: 'Address', value: formData.address || 'Not provided' },
        { label: 'City', value: formData.city || 'Not provided' },
        { label: 'State/Province', value: formData.state || 'Not provided' },
        { label: 'Country', value: formData.country || 'Not provided' },
        { label: 'Site Type', value: formData.siteType || 'Not provided' },
        { label: 'Years of Experience', value: formData.yearsExperience || 'Not provided' }
    ]);
    previewContent.appendChild(section1);
    
    // Section 2: Patient Population
    const section2 = createPreviewSection('Patient Population', [
        { label: 'Total Active Patients', value: formData.totalPatients || 'Not provided' },
        { label: 'Eligible Patients', value: formData.eligiblePatients || 'Not provided' },
        { label: 'Can Enroll 50 Patients', value: formData.canEnroll50 || 'Not provided' },
        { label: 'Monthly Enrollment Rate', value: formData.monthlyEnrollment || 'Not provided' },
        { label: 'Screen Failure Rate', value: formData.screenFailureRate || 'Not provided' },
        { label: 'Demographics Available', value: formData.demographics ? formData.demographics.join(', ') : 'Not provided', isList: true },
        { label: 'Recruitment Methods', value: formData.recruitmentMethods ? formData.recruitmentMethods.join(', ') : 'Not provided', isList: true },
        { label: 'Additional Notes', value: formData.patientNotes || 'Not provided' }
    ]);
    previewContent.appendChild(section2);
    
    // Section 3: Capabilities
    const section3 = createPreviewSection('Site Capabilities', [
        { label: 'Clinical Trial Phases', value: formData.phases ? formData.phases.join(', ') : 'Not provided', isList: true },
        { label: 'Therapeutic Areas', value: formData.therapeuticAreas ? formData.therapeuticAreas.join(', ') : 'Not provided', isList: true },
        { label: 'Cardiovascular Experience', value: formData.cardioExperience || 'Not provided' },
        { label: 'On-Site Facilities', value: formData.facilities ? formData.facilities.join(', ') : 'Not provided', isList: true },
        { label: 'Cardio Equipment', value: formData.cardioEquipment ? formData.cardioEquipment.join(', ') : 'Not provided', isList: true },
        { label: 'Storage Capabilities', value: formData.storage ? formData.storage.join(', ') : 'Not provided', isList: true },
        { label: 'Quality Management', value: formData.qms ? formData.qms.join(', ') : 'Not provided', isList: true },
        { label: 'Electronic Systems', value: formData.electronicSystems ? formData.electronicSystems.join(', ') : 'Not provided', isList: true },
        { label: 'Regulatory Compliance', value: formData.compliance ? formData.compliance.join(', ') : 'Not provided', isList: true }
    ]);
    previewContent.appendChild(section3);
    
    // Section 4: Experience
    const section4 = createPreviewSection('Research Experience', [
        { label: 'Total Trials Conducted', value: formData.totalTrials || 'Not provided' },
        { label: 'Cardiovascular Trials', value: formData.cardioTrials || 'Not provided' },
        { label: 'Phase III Trials', value: formData.phase3Trials || 'Not provided' },
        { label: 'Historical Enrollment Rate', value: formData.historicalEnrollment || 'Not provided' },
        { label: 'Historical Retention Rate', value: formData.historicalRetention || 'Not provided' },
        { label: 'Protocol Deviations Rate', value: formData.deviationsRate || 'Not provided' },
        { label: 'Top Enrolling Site', value: formData.topEnroller || 'Not provided' },
        { label: 'Achievements', value: formData.achievements || 'Not provided' }
    ]);
    previewContent.appendChild(section4);
    
    // Section 5: Resources
    const section5 = createPreviewSection('Staff & Resources', [
        { label: 'Study Coordinators', value: formData.coordinators || 'Not provided' },
        { label: 'Sub-Investigators', value: formData.subInvestigators || 'Not provided' },
        { label: 'Research Nurses', value: formData.researchNurses || 'Not provided' },
        { label: 'Study Space', value: formData.studySpace || 'Not provided' },
        { label: 'Dedicated Staff', value: formData.dedicatedStaff || 'Not provided' },
        { label: 'Current Study Load', value: formData.currentLoad || 'Not provided' }
    ]);
    previewContent.appendChild(section5);
    
    // Section 6: Timeline & Budget
    const section6 = createPreviewSection('Timeline & Budget', [
        { label: 'Site Initiation Time', value: formData.initiationTime || 'Not provided' },
        { label: 'First Patient Time', value: formData.firstPatientTime || 'Not provided' },
        { label: 'IRB Review Timeline', value: formData.irbTimeline || 'Not provided' },
        { label: 'Contract Timeline', value: formData.contractTimeline || 'Not provided' },
        { label: 'Budget Expectations', value: formData.budgetExpectations || 'Not provided' }
    ]);
    previewContent.appendChild(section6);
    
    // Section 7: Documents
    const section7 = createPreviewSection('Supporting Documents', [
        { label: 'CV/Form 1572', value: uploadedFiles.cv1572 ? `${uploadedFiles.cv1572.length} file(s)` : 'Not uploaded' },
        { label: 'GCP Certificate', value: uploadedFiles.gcpCert ? `${uploadedFiles.gcpCert.length} file(s)` : 'Not uploaded' },
        { label: 'Site Media', value: uploadedFiles.siteMedia ? `${uploadedFiles.siteMedia.length} file(s)` : 'Not uploaded' },
        { label: 'Additional Documents', value: uploadedFiles.additionalDocs ? `${uploadedFiles.additionalDocs.length} file(s)` : 'Not uploaded' }
    ]);
    previewContent.appendChild(section7);
    
    // Show modal
    document.getElementById('previewModal').style.display = 'flex';
}

function createPreviewSection(title, items) {
    const section = document.createElement('div');
    section.className = 'preview-section';
    
    const heading = document.createElement('h3');
    heading.textContent = title;
    section.appendChild(heading);
    
    items.forEach(item => {
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        
        const label = document.createElement('div');
        label.className = 'preview-label';
        label.textContent = item.label + ':';
        
        const value = document.createElement('div');
        value.className = 'preview-value';
        
        if (item.isList && typeof item.value === 'string' && item.value !== 'Not provided') {
            const listDiv = document.createElement('div');
            listDiv.className = 'preview-list';
            item.value.split(', ').forEach(val => {
                const listItem = document.createElement('span');
                listItem.className = 'preview-list-item';
                listItem.textContent = val;
                listDiv.appendChild(listItem);
            });
            value.appendChild(listDiv);
        } else {
            value.textContent = item.value;
        }
        
        previewItem.appendChild(label);
        previewItem.appendChild(value);
        section.appendChild(previewItem);
    });
    
    return section;
}

function closePreviewModal() {
    document.getElementById('previewModal').style.display = 'none';
}

function exportPreview() {
    showNotification('PDF export feature coming soon', 'info');
}

// Submit Questionnaire
function submitQuestionnaire() {
    // Validate required fields
    const form = document.getElementById('questionnaireForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Save final data
    saveFormData();
    
    // Show success message
    showNotification('Questionnaire submitted successfully!', 'success');
    
    // Redirect after 2 seconds
    setTimeout(() => {
        window.location.href = 'app.html';
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ';
    
    notification.innerHTML = `
        <div class="notification-icon">${icon}</div>
        <div class="notification-content">
            <div class="notification-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    container.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Close modal on outside click
window.onclick = function(event) {
    const previewModal = document.getElementById('previewModal');
    if (event.target === previewModal) {
        closePreviewModal();
    }
}

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    clearInterval(autoSaveInterval);
});