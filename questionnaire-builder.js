// Questionnaire Builder JavaScript

let questions = [];
let selectedQuestionId = null;
let questionIdCounter = 1;

// Question Templates Library
const questionTemplates = {
    site: [
        {
            title: "Site Capabilities Assessment",
            description: "Comprehensive site capability evaluation",
            questions: [
                { type: "checkboxes", title: "What therapeutic areas does your site specialize in?", options: ["Oncology", "Cardiology", "Neurology", "Diabetes", "Respiratory", "Immunology"] },
                { type: "checkboxes", title: "Which study phases have you conducted?", options: ["Phase I", "Phase II", "Phase III", "Phase IV"] },
                { type: "number", title: "How many active clinical trials is your site currently conducting?" }
            ]
        },
        {
            title: "Patient Population",
            description: "Patient database and recruitment capabilities",
            questions: [
                { type: "number", title: "Total number of patients in your database" },
                { type: "number", title: "Average monthly patient visits" },
                { type: "checkboxes", title: "Patient demographics available", options: ["Age groups", "Gender", "Ethnicity", "Medical conditions", "Treatment history"] }
            ]
        }
    ],
    experience: [
        {
            title: "Clinical Trial Experience",
            description: "Site's track record in clinical research",
            questions: [
                { type: "number", title: "Total number of completed clinical trials" },
                { type: "number", title: "Number of trials completed in the last 3 years" },
                { type: "rating", title: "Rate your experience with GCP compliance" },
                { type: "long-text", title: "Describe your most challenging trial and how you overcame obstacles" }
            ]
        }
    ],
    equipment: [
        {
            title: "Equipment & Facilities",
            description: "Available equipment and infrastructure",
            questions: [
                { type: "checkboxes", title: "Available imaging equipment", options: ["MRI", "CT Scanner", "PET Scanner", "X-Ray", "Ultrasound", "Mammography"] },
                { type: "checkboxes", title: "Laboratory capabilities", options: ["Hematology", "Chemistry", "Microbiology", "Pathology", "Molecular diagnostics"] },
                { type: "yes-no", title: "Do you have a dedicated research pharmacy?" },
                { type: "yes-no", title: "Do you have cold storage facilities (-80°C)?" }
            ]
        }
    ],
    staff: [
        {
            title: "Staffing & Personnel",
            description: "Research team composition",
            questions: [
                { type: "number", title: "Number of full-time research coordinators" },
                { type: "number", title: "Number of sub-investigators" },
                { type: "checkboxes", title: "Staff certifications", options: ["GCP Certified", "ACRP Certified", "SOCRA Certified", "CCRC", "CCRA"] },
                { type: "long-text", title: "Describe your staff training program" }
            ]
        }
    ],
    regulatory: [
        {
            title: "Regulatory & Compliance",
            description: "Regulatory experience and compliance",
            questions: [
                { type: "checkboxes", title: "Regulatory certifications", options: ["GCP", "CLIA", "CAP", "AAALAC", "JCI", "ISO 9001"] },
                { type: "yes-no", title: "Have you had any FDA inspections in the last 3 years?" },
                { type: "multiple-choice", title: "Most recent FDA inspection result", options: ["No findings", "Voluntary Action Indicated (VAI)", "Official Action Indicated (OAI)", "Not applicable"] },
                { type: "long-text", title: "Describe your quality management system" }
            ]
        }
    ]
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupDragAndDrop();
    setupEventListeners();
    loadSavedQuestionnaire();
    populateQuestionTypeMenu();
});

// Setup Event Listeners
function setupEventListeners() {
    // Settings change listeners
    document.getElementById('settingRequired')?.addEventListener('change', updateSelectedQuestion);
    document.getElementById('settingScored')?.addEventListener('change', function() {
        document.getElementById('scoringOptions').style.display = this.checked ? 'block' : 'none';
        updateSelectedQuestion();
    });
    document.getElementById('settingCondition')?.addEventListener('change', function() {
        document.getElementById('conditionalLogic').style.display = this.value === 'conditional' ? 'block' : 'none';
        updateSelectedQuestion();
    });
}

// Drag and Drop Setup
function setupDragAndDrop() {
    const questionTypes = document.querySelectorAll('.question-type-item');
    const container = document.getElementById('questionsContainer');
    
    questionTypes.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('click', function() {
            addQuestion(this.dataset.type);
        });
    });
    
    container.addEventListener('dragover', handleDragOver);
    container.addEventListener('drop', handleDrop);
}

function handleDragStart(e) {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('questionType', this.dataset.type);
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
}

function handleDrop(e) {
    e.preventDefault();
    const questionType = e.dataTransfer.getData('questionType');
    addQuestion(questionType);
}

// Add Question
function addQuestion(type) {
    const question = createQuestionObject(type);
    questions.push(question);
    renderQuestions();
    selectQuestion(question.id);
    hideEmptyState();
    showNotification('Question added successfully', 'success');
}

function createQuestionObject(type) {
    const question = {
        id: 'q' + questionIdCounter++,
        type: type,
        title: getDefaultTitle(type),
        description: '',
        required: false,
        options: type === 'multiple-choice' || type === 'checkboxes' || type === 'dropdown' ? ['Option 1', 'Option 2', 'Option 3'] : [],
        settings: {
            minLength: null,
            maxLength: null,
            pattern: null,
            scored: false,
            points: 0,
            weight: 1.0,
            conditional: false,
            conditionQuestion: null,
            conditionOperator: 'equals',
            conditionValue: ''
        }
    };
    
    return question;
}

function getDefaultTitle(type) {
    const titles = {
        'short-text': 'Short answer question',
        'long-text': 'Long answer question',
        'email': 'Email address',
        'phone': 'Phone number',
        'url': 'Website URL',
        'multiple-choice': 'Multiple choice question',
        'checkboxes': 'Checkbox question',
        'dropdown': 'Dropdown question',
        'yes-no': 'Yes/No question',
        'number': 'Number question',
        'date': 'Date question',
        'date-range': 'Date range question',
        'time': 'Time question',
        'rating': 'Rating question',
        'scale': 'Scale question',
        'likert': 'Likert scale question',
        'file-upload': 'File upload',
        'image-upload': 'Image upload',
        'matrix': 'Matrix question',
        'ranking': 'Ranking question',
        'section': 'Section break'
    };
    
    return titles[type] || 'Untitled question';
}

// Render Questions
function renderQuestions() {
    const container = document.getElementById('questionsContainer');
    
    if (questions.length === 0) {
        showEmptyState();
        return;
    }
    
    container.innerHTML = '';
    
    questions.forEach((question, index) => {
        const questionCard = createQuestionCard(question, index + 1);
        container.appendChild(questionCard);
    });
}

function createQuestionCard(question, number) {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.dataset.questionId = question.id;
    if (selectedQuestionId === question.id) {
        card.classList.add('selected');
    }
    
    card.innerHTML = `
        <div class="question-header">
            <div class="question-number">${number}.</div>
            <div class="question-content">
                <input type="text" class="question-title-input" value="${question.title}" 
                       onchange="updateQuestionTitle('${question.id}', this.value)">
                ${question.description ? `<div class="question-description">${question.description}</div>` : ''}
            </div>
            <div class="question-actions">
                <button class="question-action-btn" onclick="duplicateQuestion('${question.id}')" title="Duplicate">📋</button>
                <button class="question-action-btn" onclick="deleteQuestion('${question.id}')" title="Delete">🗑️</button>
            </div>
        </div>
        <div class="question-body">
            ${renderQuestionBody(question)}
        </div>
    `;
    
    card.addEventListener('click', function(e) {
        if (!e.target.classList.contains('question-action-btn') && 
            !e.target.classList.contains('question-title-input')) {
            selectQuestion(question.id);
        }
    });
    
    return card;
}

function renderQuestionBody(question) {
    switch (question.type) {
        case 'short-text':
        case 'email':
        case 'phone':
        case 'url':
            return '<input type="text" placeholder="Short answer text" disabled style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px;">';
        
        case 'long-text':
            return '<textarea placeholder="Long answer text" disabled rows="4" style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px;"></textarea>';
        
        case 'number':
            return '<input type="number" placeholder="Number" disabled style="width: 200px; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px;">';
        
        case 'date':
            return '<input type="date" disabled style="width: 200px; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px;">';
        
        case 'date-range':
            return `
                <div style="display: flex; gap: 10px; align-items: center;">
                    <input type="date" disabled style="padding: 10px; border: 1px solid #d1d5db; border-radius: 6px;">
                    <span>to</span>
                    <input type="date" disabled style="padding: 10px; border: 1px solid #d1d5db; border-radius: 6px;">
                </div>
            `;
        
        case 'time':
            return '<input type="time" disabled style="width: 150px; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px;">';
        
        case 'multiple-choice':
            return renderOptions(question, 'radio');
        
        case 'checkboxes':
            return renderOptions(question, 'checkbox');
        
        case 'dropdown':
            return `
                <select disabled style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px;">
                    <option>Choose...</option>
                    ${question.options.map(opt => `<option>${opt}</option>`).join('')}
                </select>
            `;
        
        case 'yes-no':
            return `
                <div class="option-list">
                    <div class="option-item">
                        <input type="radio" disabled> Yes
                    </div>
                    <div class="option-item">
                        <input type="radio" disabled> No
                    </div>
                </div>
            `;
        
        case 'rating':
            return '<div style="font-size: 24px;">⭐⭐⭐⭐⭐</div>';
        
        case 'scale':
            return `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span>1</span>
                    <input type="range" min="1" max="10" disabled style="flex: 1; margin: 0 15px;">
                    <span>10</span>
                </div>
            `;
        
        case 'likert':
            return `
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    ${['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map(opt => 
                        `<label style="flex: 1; min-width: 100px;"><input type="radio" disabled> ${opt}</label>`
                    ).join('')}
                </div>
            `;
        
        case 'file-upload':
        case 'image-upload':
            return `
                <div style="border: 2px dashed #d1d5db; padding: 30px; text-align: center; border-radius: 8px; color: #6b7280;">
                    <div style="font-size: 32px; margin-bottom: 10px;">📎</div>
                    <div>Click to upload or drag and drop</div>
                </div>
            `;
        
        case 'matrix':
            return `
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #d1d5db; padding: 10px;"></th>
                            <th style="border: 1px solid #d1d5db; padding: 10px;">Column 1</th>
                            <th style="border: 1px solid #d1d5db; padding: 10px;">Column 2</th>
                            <th style="border: 1px solid #d1d5db; padding: 10px;">Column 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="border: 1px solid #d1d5db; padding: 10px;">Row 1</td>
                            <td style="border: 1px solid #d1d5db; padding: 10px; text-align: center;"><input type="radio" disabled></td>
                            <td style="border: 1px solid #d1d5db; padding: 10px; text-align: center;"><input type="radio" disabled></td>
                            <td style="border: 1px solid #d1d5db; padding: 10px; text-align: center;"><input type="radio" disabled></td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #d1d5db; padding: 10px;">Row 2</td>
                            <td style="border: 1px solid #d1d5db; padding: 10px; text-align: center;"><input type="radio" disabled></td>
                            <td style="border: 1px solid #d1d5db; padding: 10px; text-align: center;"><input type="radio" disabled></td>
                            <td style="border: 1px solid #d1d5db; padding: 10px; text-align: center;"><input type="radio" disabled></td>
                        </tr>
                    </tbody>
                </table>
            `;
        
        case 'ranking':
            return `
                <div class="option-list">
                    ${question.options.map((opt, i) => `
                        <div class="option-item" style="margin-bottom: 10px;">
                            <span style="margin-right: 10px; color: #6b7280;">${i + 1}</span>
                            <span>${opt}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        
        case 'section':
            return '<div style="border-top: 2px solid #e5e7eb; padding-top: 20px; color: #6b7280;">Section divider</div>';
        
        default:
            return '<div>Question preview</div>';
    }
}

function renderOptions(question, inputType) {
    return `
        <div class="option-list">
            ${question.options.map((option, index) => `
                <div class="option-item">
                    <input type="${inputType}" disabled>
                    <input type="text" class="option-input" value="${option}" 
                           onchange="updateOption('${question.id}', ${index}, this.value)">
                    <button class="option-remove" onclick="removeOption('${question.id}', ${index})">✕</button>
                </div>
            `).join('')}
            <button class="add-option-btn" onclick="addOption('${question.id}')">+ Add option</button>
        </div>
    `;
}

// Question Management
function selectQuestion(questionId) {
    selectedQuestionId = questionId;
    
    // Update UI
    document.querySelectorAll('.question-card').forEach(card => {
        card.classList.remove('selected');
        if (card.dataset.questionId === questionId) {
            card.classList.add('selected');
        }
    });
    
    // Show settings panel
    document.getElementById('noQuestionSelected').style.display = 'none';
    document.getElementById('questionSettings').style.display = 'block';
    
    // Populate settings
    const question = questions.find(q => q.id === questionId);
    if (question) {
        document.getElementById('settingRequired').checked = question.required;
        document.getElementById('settingScored').checked = question.settings.scored;
        document.getElementById('scoringOptions').style.display = question.settings.scored ? 'block' : 'none';
        document.getElementById('settingPoints').value = question.settings.points;
        document.getElementById('settingWeight').value = question.settings.weight;
    }
}

function updateQuestionTitle(questionId, title) {
    const question = questions.find(q => q.id === questionId);
    if (question) {
        question.title = title;
        saveQuestionnaire();
    }
}

function updateSelectedQuestion() {
    if (!selectedQuestionId) return;
    
    const question = questions.find(q => q.id === selectedQuestionId);
    if (question) {
        question.required = document.getElementById('settingRequired').checked;
        question.settings.scored = document.getElementById('settingScored').checked;
        question.settings.points = parseInt(document.getElementById('settingPoints').value) || 0;
        question.settings.weight = parseFloat(document.getElementById('settingWeight').value) || 1.0;
        saveQuestionnaire();
    }
}

function deleteQuestion(questionId) {
    if (confirm('Are you sure you want to delete this question?')) {
        questions = questions.filter(q => q.id !== questionId);
        renderQuestions();
        document.getElementById('noQuestionSelected').style.display = 'block';
        document.getElementById('questionSettings').style.display = 'none';
        showNotification('Question deleted', 'success');
    }
}

function deleteSelectedQuestion() {
    if (selectedQuestionId) {
        deleteQuestion(selectedQuestionId);
    }
}

function duplicateQuestion(questionId) {
    const question = questions.find(q => q.id === questionId);
    if (question) {
        const duplicate = JSON.parse(JSON.stringify(question));
        duplicate.id = 'q' + questionIdCounter++;
        duplicate.title = question.title + ' (Copy)';
        questions.push(duplicate);
        renderQuestions();
        showNotification('Question duplicated', 'success');
    }
}

function duplicateSelectedQuestion() {
    if (selectedQuestionId) {
        duplicateQuestion(selectedQuestionId);
    }
}

// Options Management
function addOption(questionId) {
    const question = questions.find(q => q.id === questionId);
    if (question) {
        question.options.push('Option ' + (question.options.length + 1));
        renderQuestions();
        saveQuestionnaire();
    }
}

function removeOption(questionId, index) {
    const question = questions.find(q => q.id === questionId);
    if (question && question.options.length > 1) {
        question.options.splice(index, 1);
        renderQuestions();
        saveQuestionnaire();
    }
}

function updateOption(questionId, index, value) {
    const question = questions.find(q => q.id === questionId);
    if (question) {
        question.options[index] = value;
        saveQuestionnaire();
    }
}

// UI Functions
function hideEmptyState() {
    const emptyState = document.querySelector('.empty-state');
    if (emptyState) {
        emptyState.style.display = 'none';
    }
}

function showEmptyState() {
    const container = document.getElementById('questionsContainer');
    container.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">📋</div>
            <h3>Start Building Your Questionnaire</h3>
            <p>Drag question types from the left sidebar or click to add them</p>
        </div>
    `;
}

// Question Type Menu
function showQuestionTypeMenu() {
    document.getElementById('questionTypeMenu').style.display = 'flex';
}

function closeQuestionTypeMenu() {
    document.getElementById('questionTypeMenu').style.display = 'none';
}

function populateQuestionTypeMenu() {
    const grid = document.getElementById('questionTypeGrid');
    const types = document.querySelectorAll('.question-type-item');
    
    types.forEach(item => {
        const card = document.createElement('div');
        card.className = 'question-type-card';
        card.innerHTML = item.innerHTML;
        card.onclick = function() {
            addQuestion(item.dataset.type);
            closeQuestionTypeMenu();
        };
        grid.appendChild(card);
    });
}

// Preview
function previewQuestionnaire() {
    const modal = document.getElementById('previewModal');
    const content = document.getElementById('previewContent');
    
    const title = document.getElementById('questionnaireTitle').value || 'Untitled Questionnaire';
    const description = document.getElementById('questionnaireDescription').value;
    
    let html = `
        <h2 style="margin-bottom: 10px;">${title}</h2>
        ${description ? `<p style="color: #6b7280; margin-bottom: 30px;">${description}</p>` : ''}
    `;
    
    questions.forEach((question, index) => {
        html += `
            <div class="preview-question">
                <div class="preview-question-title">
                    ${index + 1}. ${question.title}
                    ${question.required ? '<span class="required">*</span>' : ''}
                </div>
                ${renderQuestionBody(question)}
            </div>
        `;
    });
    
    content.innerHTML = html;
    modal.style.display = 'flex';
}

function closePreview() {
    document.getElementById('previewModal').style.display = 'none';
}

// Save & Load
function saveQuestionnaire() {
    const data = {
        title: document.getElementById('questionnaireTitle').value,
        description: document.getElementById('questionnaireDescription').value,
        study: document.getElementById('studySelect').value,
        dueDate: document.getElementById('dueDate').value,
        questions: questions
    };
    
    localStorage.setItem('questionnaireDraft', JSON.stringify(data));
}

function loadSavedQuestionnaire() {
    const saved = localStorage.getItem('questionnaireDraft');
    if (saved) {
        const data = JSON.parse(saved);
        document.getElementById('questionnaireTitle').value = data.title || '';
        document.getElementById('questionnaireDescription').value = data.description || '';
        document.getElementById('studySelect').value = data.study || '';
        document.getElementById('dueDate').value = data.dueDate || '';
        questions = data.questions || [];
        renderQuestions();
    }
}

function publishQuestionnaire() {
    showNotification('Questionnaire published successfully!', 'success');
    setTimeout(() => {
        window.location.href = 'app.html';
    }, 1500);
}

// Notifications
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.innerHTML = `
        <div class="notification-icon">${type === 'success' ? '✓' : '✕'}</div>
        <div class="notification-message">${message}</div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Auto-save
setInterval(saveQuestionnaire, 30000);