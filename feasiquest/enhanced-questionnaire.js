// ===================================
// ENHANCED QUESTIONNAIRE JAVASCRIPT
// ===================================

let currentSection = 0;
const sections = ['site-info', 'capabilities', 'patient-pool', 'experience', 'resources', 'timeline', 'documents'];
let answers = {};
let uploadedFiles = {};

document.addEventListener('DOMContentLoaded', function() {
    initQuestionnaire();
    setupAutoSave();
    loadDraft();
});

function initQuestionnaire() {
    // Setup input listeners
    document.querySelectorAll('.question-input, .question-select, .question-textarea').forEach(input => {
        input.addEventListener('change', handleInputChange);
    });
    
    document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
        input.addEventListener('change', handleInputChange);
    });
    
    // Setup file drag and drop
    document.querySelectorAll('.file-upload-area').forEach(area => {
        area.addEventListener('dragover', handleDragOver);
        area.addEventListener('drop', handleDrop);
    });
    
    updateProgress();
}

function handleInputChange(e) {
    const questionId = e.target.dataset.question;
    
    if (e.target.type === 'checkbox') {
        if (!answers[questionId]) answers[questionId] = [];
        if (e.target.checked) {
            answers[questionId].push(e.target.value);
        } else {
            answers[questionId] = answers[questionId].filter(v => v !== e.target.value);
        }
    } else {
        answers[questionId] = e.target.value;
    }
    
    // Mark question as answered
    const card = e.target.closest('.question-card');
    if (card && e.target.value) {
        card.classList.add('answered');
    }
    
    updateProgress();
    autoSave();
}

function handleFileUpload(input, questionId) {
    const file = input.files[0];
    if (!file) return;
    
    // Validate file size
    if (file.size > 10 * 1024 * 1024) { // 10MB
        showNotification('File size must be less than 10MB', 'error');
        return;
    }
    
    // Store file reference
    if (!uploadedFiles[questionId]) uploadedFiles[questionId] = [];
    uploadedFiles[questionId].push(file);
    
    // Show preview
    displayFilePreview(file, questionId);
    
    // Mark as answered
    answers[questionId] = 'file_uploaded';
    updateProgress();
    
    showNotification('File uploaded successfully', 'success');
}

function handleMultipleFileUpload(input, questionId) {
    const files = Array.from(input.files);
    
    if (files.length > 5) {
        showNotification('Maximum 5 files allowed', 'error');
        return;
    }
    
    files.forEach(file => {
        if (file.size > 5 * 1024 * 1024) { // 5MB per file
            showNotification(`${file.name} is too large (max 5MB)`, 'error');
            return;
        }
        
        if (!uploadedFiles[questionId]) uploadedFiles[questionId] = [];
        uploadedFiles[questionId].push(file);
        
        displayMultiFilePreview(file, questionId);
    });
    
    answers[questionId] = 'files_uploaded';
    updateProgress();
    
    showNotification(`${files.length} file(s) uploaded successfully`, 'success');
}

function displayFilePreview(file, questionId) {
    const preview = document.getElementById(`file-preview-${questionId}`);
    
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.innerHTML = `
        <div class="file-icon">${getFileIcon(file.type)}</div>
        <div class="file-info">
            <div class="file-name">${file.name}</div>
            <div class="file-size">${formatFileSize(file.size)}</div>
        </div>
        <button class="file-remove" onclick="removeFile(${questionId}, '${file.name}')">
            Remove
        </button>
    `;
    
    preview.appendChild(fileItem);
}

function displayMultiFilePreview(file, questionId) {
    const preview = document.getElementById(`file-preview-${questionId}`);
    
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-image';
            previewItem.innerHTML = `
                <img src="${e.target.result}" alt="${file.name}">
                <button class="preview-remove" onclick="removeFile(${questionId}, '${file.name}')">×</button>
            `;
            preview.appendChild(previewItem);
        };
        reader.readAsDataURL(file);
    } else {
        displayFilePreview(file, questionId);
    }
}

function removeFile(questionId, fileName) {
    if (uploadedFiles[questionId]) {
        uploadedFiles[questionId] = uploadedFiles[questionId].filter(f => f.name !== fileName);
        
        if (uploadedFiles[questionId].length === 0) {
            delete answers[questionId];
        }
    }
    
    // Remove preview
    const preview = document.getElementById(`file-preview-${questionId}`);
    preview.innerHTML = '';
    
    // Re-display remaining files
    if (uploadedFiles[questionId]) {
        uploadedFiles[questionId].forEach(file => {
            displayFilePreview(file, questionId);
        });
    }
    
    updateProgress();
    showNotification('File removed', 'info');
}

function getFileIcon(type) {
    if (type.includes('pdf')) return '📄';
    if (type.includes('image')) return '🖼️';
    if (type.includes('video')) return '🎥';
    if (type.includes('word')) return '📝';
    return '📎';
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.style.borderColor = 'var(--primary)';
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    
    const files = e.dataTransfer.files;
    const input = e.currentTarget.querySelector('input[type="file"]');
    
    if (input && files.length > 0) {
        input.files = files;
        input.dispatchEvent(new Event('change'));
    }
}

function updateProgress() {
    const totalQuestions = 50; // Total questions in questionnaire
    const answeredCount = Object.keys(answers).length;
    const percentage = Math.round((answeredCount / totalQuestions) * 100);
    
    document.getElementById('answeredCount').textContent = answeredCount;
    document.getElementById('totalCount').textContent = totalQuestions;
    document.getElementById('progressPercent').textContent = percentage + '%';
    document.getElementById('progressFill').style.width = percentage + '%';
    
    // Update section counts
    updateSectionCounts();
}

function updateSectionCounts() {
    // This would calculate answered questions per section
    // Simplified for demo
    sections.forEach((section, index) => {
        const navBtn = document.querySelectorAll('.nav-section')[index];
        if (navBtn) {
            const count = navBtn.querySelector('.nav-count');
            // Update count based on answered questions in that section
        }
    });
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.question-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const section = document.getElementById(`${sectionId}-section`);
    if (section) {
        section.classList.add('active');
    }
    
    // Update navigation
    document.querySelectorAll('.nav-section').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = Array.from(document.querySelectorAll('.nav-section')).find(btn => 
        btn.getAttribute('onclick').includes(sectionId)
    );
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Update current section index
    currentSection = sections.indexOf(sectionId);
    updateNavigationButtons();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextSection() {
    if (currentSection < sections.length - 1) {
        currentSection++;
        showSection(sections[currentSection]);
    }
}

function previousSection() {
    if (currentSection > 0) {
        currentSection--;
        showSection(sections[currentSection]);
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentSection === 0;
    
    if (currentSection === sections.length - 1) {
        nextBtn.textContent = 'Review & Submit →';
    } else {
        nextBtn.textContent = 'Next Section →';
    }
}

function saveDraft() {
    const draft = {
        answers: answers,
        files: Object.keys(uploadedFiles).map(key => ({
            questionId: key,
            fileNames: uploadedFiles[key].map(f => f.name)
        })),
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('questionnaire_draft', JSON.stringify(draft));
    showNotification('Draft saved successfully', 'success');
}

function loadDraft() {
    const draft = localStorage.getItem('questionnaire_draft');
    if (draft) {
        const data = JSON.parse(draft);
        answers = data.answers || {};
        
        // Restore form values
        Object.keys(answers).forEach(questionId => {
            const input = document.querySelector(`[data-question="${questionId}"]`);
            if (input) {
                if (input.type === 'checkbox') {
                    if (Array.isArray(answers[questionId])) {
                        answers[questionId].forEach(value => {
                            const checkbox = document.querySelector(`[data-question="${questionId}"][value="${value}"]`);
                            if (checkbox) checkbox.checked = true;
                        });
                    }
                } else if (input.type === 'radio') {
                    const radio = document.querySelector(`[data-question="${questionId}"][value="${answers[questionId]}"]`);
                    if (radio) radio.checked = true;
                } else {
                    input.value = answers[questionId];
                }
                
                input.closest('.question-card')?.classList.add('answered');
            }
        });
        
        updateProgress();
        showNotification('Draft loaded', 'info');
    }
}

function setupAutoSave() {
    setInterval(() => {
        if (Object.keys(answers).length > 0) {
            saveDraft();
        }
    }, 60000); // Auto-save every minute
}

function autoSave() {
    // Debounced auto-save
    clearTimeout(window.autoSaveTimeout);
    window.autoSaveTimeout = setTimeout(() => {
        saveDraft();
    }, 5000);
}

function submitQuestionnaire() {
    // Validate required questions
    const requiredQuestions = document.querySelectorAll('.question-required');
    const unanswered = [];
    
    requiredQuestions.forEach(req => {
        const card = req.closest('.question-card');
        if (card && !card.classList.contains('answered')) {
            unanswered.push(card.querySelector('.question-number').textContent);
        }
    });
    
    if (unanswered.length > 0) {
        showNotification(`Please answer all required questions: ${unanswered.join(', ')}`, 'error');
        return;
    }
    
    // Confirm submission
    if (confirm('Are you sure you want to submit this questionnaire? You will not be able to edit it after submission.')) {
        // Submit logic here
        showNotification('Questionnaire submitted successfully!', 'success');
        
        setTimeout(() => {
            window.location.href = 'app.html';
        }, 2000);
    }
}

function toggleMobileMenu() {
    const nav = document.querySelector('.global-nav');
    nav.classList.toggle('active');
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
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
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

// Upload functions for profile photos
function uploadProfilePhoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.querySelector('.profile-photo img').src = event.target.result;
                showNotification('Profile photo updated', 'success');
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

function uploadCoverPhoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.querySelector('.profile-cover-photo').style.backgroundImage = `url(${event.target.result})`;
                showNotification('Cover photo updated', 'success');
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

console.log('✅ Enhanced Questionnaire Loaded');