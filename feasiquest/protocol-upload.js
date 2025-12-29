// Protocol Upload & AI Matching JavaScript

let currentStep = 1;
let extractedData = {};
let matchedSites = [];
let selectedSites = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    loadDemoData();
});

// Setup event listeners
function setupEventListeners() {
    // Upload option selection
    const uploadOptions = document.querySelectorAll('.upload-option');
    uploadOptions.forEach(option => {
        option.addEventListener('click', function() {
            uploadOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const optionType = this.dataset.option;
            if (optionType === 'file') {
                document.getElementById('fileUploadArea').style.display = 'block';
                document.getElementById('textPasteArea').style.display = 'none';
            } else {
                document.getElementById('fileUploadArea').style.display = 'none';
                document.getElementById('textPasteArea').style.display = 'block';
            }
        });
    });
    
    // File upload
    const fileInput = document.getElementById('protocolFile');
    fileInput.addEventListener('change', handleFileUpload);
    
    // Text area character count
    const textArea = document.getElementById('protocolText');
    textArea.addEventListener('input', function() {
        document.getElementById('charCount').textContent = this.value.length + ' characters';
    });
    
    // Drag and drop
    const uploadArea = document.getElementById('fileUploadArea');
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = 'var(--primary-color)';
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.borderColor = '';
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '';
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            handleFileUpload({ target: fileInput });
        }
    });
}

// Handle file upload
function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
        alert('Please upload a PDF or Word document');
        return;
    }
    
    // Validate file size (50MB)
    if (file.size > 50 * 1024 * 1024) {
        alert('File size must be less than 50MB');
        return;
    }
    
    // Display file info
    document.querySelector('.upload-placeholder').style.display = 'none';
    document.getElementById('uploadedFileInfo').style.display = 'block';
    document.getElementById('fileName').textContent = file.name;
    document.getElementById('fileSize').textContent = formatFileSize(file.size);
    document.getElementById('fileType').textContent = file.type.split('/')[1].toUpperCase();
}

// Remove uploaded file
function removeFile() {
    document.getElementById('protocolFile').value = '';
    document.querySelector('.upload-placeholder').style.display = 'block';
    document.getElementById('uploadedFileInfo').style.display = 'none';
}

// Clear text
function clearText() {
    document.getElementById('protocolText').value = '';
    document.getElementById('charCount').textContent = '0 characters';
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Analyze protocol with AI
function analyzeProtocol() {
    // Validate inputs
    const studyTitle = document.getElementById('studyTitle').value;
    const studyId = document.getElementById('studyId').value;
    const sponsor = document.getElementById('sponsor').value;
    
    if (!studyTitle || !studyId || !sponsor) {
        alert('Please fill in all study information fields');
        return;
    }
    
    const fileInput = document.getElementById('protocolFile');
    const textInput = document.getElementById('protocolText').value;
    
    if (!fileInput.files.length && !textInput) {
        alert('Please upload a protocol file or paste protocol text');
        return;
    }
    
    // Go to step 2
    goToStep(2);
    
    // Simulate AI extraction
    simulateAIExtraction();
}

// Simulate AI extraction
function simulateAIExtraction() {
    const statusDiv = document.getElementById('extractionStatus');
    const dataDiv = document.getElementById('extractedData');
    const progressBar = document.getElementById('extractionProgress');
    
    statusDiv.style.display = 'block';
    dataDiv.style.display = 'none';
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                statusDiv.style.display = 'none';
                dataDiv.style.display = 'block';
            }, 500);
        }
    }, 150);
}

// Generate questionnaire
function generateQuestionnaire() {
    goToStep(3);
}

// Match sites with AI
function matchSites() {
    goToStep(4);
    simulateSiteMatching();
}

// Simulate site matching
function simulateSiteMatching() {
    const statusDiv = document.getElementById('matchingStatus');
    const resultsDiv = document.getElementById('matchingResults');
    const progressBar = document.getElementById('matchingProgress');
    const sitesAnalyzed = document.getElementById('sitesAnalyzed');
    
    statusDiv.style.display = 'block';
    resultsDiv.style.display = 'none';
    
    let progress = 0;
    let sites = 0;
    const totalSites = 2847;
    
    const interval = setInterval(() => {
        progress += 2;
        sites = Math.floor((progress / 100) * totalSites);
        
        progressBar.style.width = progress + '%';
        sitesAnalyzed.textContent = sites;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                statusDiv.style.display = 'none';
                resultsDiv.style.display = 'block';
                generateSiteCards();
                document.getElementById('sendQuestionnaireBtn').style.display = 'block';
            }, 500);
        }
    }, 50);
}

// Generate site cards
function generateSiteCards() {
    const siteCardsContainer = document.getElementById('siteCards');
    
    // Demo site data
    const sites = [
        {
            name: 'Metro Research Institute',
            location: 'Boston, MA',
            score: 96,
            experience: 15,
            studies: 12,
            patients: 245,
            capacity: 'High'
        },
        {
            name: 'Pacific Clinical Trials',
            location: 'San Francisco, CA',
            score: 94,
            experience: 12,
            studies: 10,
            patients: 198,
            capacity: 'High'
        },
        {
            name: 'Northeast Medical Center',
            location: 'New York, NY',
            score: 92,
            experience: 18,
            studies: 15,
            patients: 312,
            capacity: 'Medium'
        },
        {
            name: 'Midwest Research Group',
            location: 'Chicago, IL',
            score: 90,
            experience: 10,
            studies: 8,
            patients: 156,
            capacity: 'High'
        },
        {
            name: 'Southern Clinical Research',
            location: 'Atlanta, GA',
            score: 88,
            experience: 14,
            studies: 11,
            patients: 203,
            capacity: 'Medium'
        },
        {
            name: 'Texas Oncology Research',
            location: 'Houston, TX',
            score: 87,
            experience: 16,
            studies: 13,
            patients: 267,
            capacity: 'High'
        },
        {
            name: 'Mountain View Research',
            location: 'Denver, CO',
            score: 85,
            experience: 9,
            studies: 7,
            patients: 134,
            capacity: 'Medium'
        },
        {
            name: 'Coastal Clinical Trials',
            location: 'Seattle, WA',
            score: 84,
            experience: 11,
            studies: 9,
            patients: 178,
            capacity: 'High'
        },
        {
            name: 'Great Lakes Research',
            location: 'Detroit, MI',
            score: 82,
            experience: 13,
            studies: 10,
            patients: 189,
            capacity: 'Medium'
        }
    ];
    
    matchedSites = sites;
    
    siteCardsContainer.innerHTML = sites.map((site, index) => `
        <div class="site-card" data-site-id="${index}">
            <div class="site-header">
                <div>
                    <div class="site-name">${site.name}</div>
                    <div class="site-location">📍 ${site.location}</div>
                </div>
                <div style="text-align: right;">
                    <div class="match-score">${site.score}</div>
                    <div class="score-label">Match Score</div>
                </div>
            </div>
            
            <div class="site-stats">
                <div class="stat-item">
                    <div class="stat-value">${site.experience}</div>
                    <div class="stat-label">Years Exp</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${site.studies}</div>
                    <div class="stat-label">NSCLC Studies</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${site.patients}</div>
                    <div class="stat-label">Patients</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${site.capacity}</div>
                    <div class="stat-label">Capacity</div>
                </div>
            </div>
            
            <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                <button class="btn-secondary" style="flex: 1;" onclick="viewSiteProfile(${index})">
                    👁️ View Profile
                </button>
                <button class="btn-primary" style="flex: 1;" onclick="toggleSiteSelection(${index})">
                    <span class="select-text">✓ Select</span>
                </button>
            </div>
        </div>
    `).join('');
    
    // Add click handlers to site cards
    document.querySelectorAll('.site-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('button')) {
                const siteId = parseInt(this.dataset.siteId);
                toggleSiteSelection(siteId);
            }
        });
    });
}

// Toggle site selection
function toggleSiteSelection(siteId) {
    const card = document.querySelector(`[data-site-id="${siteId}"]`);
    const button = card.querySelector('.btn-primary');
    
    if (selectedSites.includes(siteId)) {
        selectedSites = selectedSites.filter(id => id !== siteId);
        card.classList.remove('selected');
        button.querySelector('.select-text').textContent = '✓ Select';
    } else {
        selectedSites.push(siteId);
        card.classList.add('selected');
        button.querySelector('.select-text').textContent = '✓ Selected';
    }
    
    updateSelectionCount();
}

// Update selection count
function updateSelectionCount() {
    const count = selectedSites.length;
    document.getElementById('selectedSitesCount').textContent = count;
    document.getElementById('selectedCount').textContent = count;
    document.getElementById('finalSelectedCount').textContent = count;
    
    const bulkActions = document.getElementById('bulkActions');
    if (count > 0) {
        bulkActions.style.display = 'flex';
    } else {
        bulkActions.style.display = 'none';
    }
}

// Select all sites
function selectAll() {
    selectedSites = matchedSites.map((_, index) => index);
    document.querySelectorAll('.site-card').forEach(card => {
        card.classList.add('selected');
        card.querySelector('.select-text').textContent = '✓ Selected';
    });
    updateSelectionCount();
}

// Deselect all sites
function deselectAll() {
    selectedSites = [];
    document.querySelectorAll('.site-card').forEach(card => {
        card.classList.remove('selected');
        card.querySelector('.select-text').textContent = '✓ Select';
    });
    updateSelectionCount();
}

// View site profile
function viewSiteProfile(siteId) {
    window.location.href = `site-profile.html?id=${siteId}`;
}

// Send questionnaires
function sendQuestionnaires() {
    if (selectedSites.length === 0) {
        alert('Please select at least one site');
        return;
    }
    
    goToStep(5);
    
    // Update success stats
    document.getElementById('sentCount').textContent = selectedSites.length;
    document.getElementById('totalSent').textContent = selectedSites.length;
    
    const avgScore = Math.round(
        selectedSites.reduce((sum, id) => sum + matchedSites[id].score, 0) / selectedSites.length
    );
    document.getElementById('avgScore').textContent = avgScore;
}

// Send to selected
function sendToSelected() {
    sendQuestionnaires();
}

// Go to step
function goToStep(step) {
    currentStep = step;
    
    // Hide all step contents
    document.querySelectorAll('.step-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show current step content
    document.getElementById(`step${step}`).classList.add('active');
    
    // Update progress steps
    document.querySelectorAll('.progress-steps .step').forEach((stepEl, index) => {
        if (index + 1 <= step) {
            stepEl.classList.add('active');
        } else {
            stepEl.classList.remove('active');
        }
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add criterion
function addCriterion(type) {
    const listId = type === 'inclusion' ? 'inclusionCriteria' : 'exclusionCriteria';
    const list = document.getElementById(listId);
    
    const newCriterion = prompt(`Enter new ${type} criterion:`);
    if (newCriterion) {
        const item = document.createElement('div');
        item.className = 'criterion-item';
        item.innerHTML = `
            <input type="checkbox" checked>
            <span>${newCriterion}</span>
            <button class="edit-btn" onclick="editCriterion(this)">✏️</button>
            <button class="remove-btn" onclick="removeCriterion(this)">×</button>
        `;
        list.appendChild(item);
    }
}

// Edit criterion
function editCriterion(button) {
    const item = button.closest('.criterion-item');
    const span = item.querySelector('span');
    const newText = prompt('Edit criterion:', span.textContent);
    if (newText) {
        span.textContent = newText;
    }
}

// Remove criterion
function removeCriterion(button) {
    if (confirm('Remove this criterion?')) {
        button.closest('.criterion-item').remove();
    }
}

// Edit questionnaire
function editQuestionnaire() {
    alert('Questionnaire editor coming soon!');
}

// Preview full questionnaire
function previewFullQuestionnaire() {
    window.open('questionnaire-enhanced.html', '_blank');
}

// Filter results
function filterResults() {
    const minScore = parseInt(document.getElementById('minScoreFilter').value);
    const location = document.getElementById('locationFilter').value;
    
    document.querySelectorAll('.site-card').forEach(card => {
        const siteId = parseInt(card.dataset.siteId);
        const site = matchedSites[siteId];
        
        let show = true;
        
        if (site.score < minScore) {
            show = false;
        }
        
        if (location !== 'all') {
            // Simple location filter (would be more sophisticated in production)
            if (location === 'north-america' && !site.location.includes('USA')) {
                show = false;
            }
        }
        
        card.style.display = show ? 'block' : 'none';
    });
}

// Sort results
function sortResults() {
    const sortBy = document.getElementById('sortBy').value;
    const container = document.getElementById('siteCards');
    const cards = Array.from(container.children);
    
    cards.sort((a, b) => {
        const siteA = matchedSites[parseInt(a.dataset.siteId)];
        const siteB = matchedSites[parseInt(b.dataset.siteId)];
        
        switch(sortBy) {
            case 'score':
                return siteB.score - siteA.score;
            case 'experience':
                return siteB.experience - siteA.experience;
            case 'capacity':
                const capacityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
                return capacityOrder[siteB.capacity] - capacityOrder[siteA.capacity];
            case 'location':
                return siteA.location.localeCompare(siteB.location);
            default:
                return 0;
        }
    });
    
    cards.forEach(card => container.appendChild(card));
}

// Load demo data
function loadDemoData() {
    // Pre-fill study information for demo
    document.getElementById('studyTitle').value = 'Phase III Study of Drug X in Advanced NSCLC';
    document.getElementById('studyId').value = 'ABC-123-2025';
    document.getElementById('sponsor').value = 'Global Pharma Inc.';
}