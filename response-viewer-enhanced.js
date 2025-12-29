// Response Viewer Enhanced JavaScript

// Demo Data
let allResponses = [
    {
        id: 1,
        siteName: "Johns Hopkins Medical Center",
        location: "Baltimore, MD, USA",
        region: "north-america",
        pi: "Dr. Sarah Johnson",
        contact: "sjohnson@jhmi.edu",
        phone: "+1 (410) 955-5000",
        score: 95,
        status: "approved",
        submittedDate: "2025-01-20",
        totalStudies: 150,
        similarStudies: 25,
        enrollmentRate: "98%",
        retentionRate: "94%",
        capabilities: ["Phase I-IV", "Oncology", "Cardiology", "ICU", "24/7 Monitoring", "GCP Certified"],
        questionnaire: [
            { question: "Can you enroll 50 patients in 12 months?", answer: "Yes, we have a patient database of 500+ eligible patients" },
            { question: "Do you have experience with cardiovascular trials?", answer: "Yes, 25 completed cardiovascular studies in the past 5 years" },
            { question: "What is your screen failure rate?", answer: "Average 15% across similar studies" }
        ],
        documents: [
            { name: "CV_1572.pdf", type: "CV", size: "2.5 MB", date: "2025-01-15" },
            { name: "GCP_Certificate.pdf", type: "Certification", size: "1.2 MB", date: "2024-12-01" },
            { name: "Site_Photos.zip", type: "Photos", size: "15.8 MB", date: "2025-01-18" }
        ]
    },
    {
        id: 2,
        siteName: "Mayo Clinic",
        location: "Rochester, MN, USA",
        region: "north-america",
        pi: "Dr. Michael Chen",
        contact: "mchen@mayo.edu",
        phone: "+1 (507) 284-2511",
        score: 92,
        status: "approved",
        submittedDate: "2025-01-19",
        totalStudies: 200,
        similarStudies: 30,
        enrollmentRate: "96%",
        retentionRate: "92%",
        capabilities: ["Phase I-IV", "Neurology", "Cardiology", "Research Lab", "Imaging Center", "FDA Inspected"],
        questionnaire: [
            { question: "Can you enroll 50 patients in 12 months?", answer: "Yes, we can enroll 60-70 patients based on our database" },
            { question: "Do you have experience with cardiovascular trials?", answer: "Yes, 30 cardiovascular studies completed" },
            { question: "What is your screen failure rate?", answer: "12% average for cardiovascular studies" }
        ],
        documents: [
            { name: "CV_1572.pdf", type: "CV", size: "3.1 MB", date: "2025-01-14" },
            { name: "FDA_Inspection.pdf", type: "Inspection", size: "2.8 MB", date: "2024-11-20" }
        ]
    },
    {
        id: 3,
        siteName: "Cleveland Clinic",
        location: "Cleveland, OH, USA",
        region: "north-america",
        pi: "Dr. Emily Rodriguez",
        contact: "erodriguez@ccf.org",
        phone: "+1 (216) 444-2200",
        score: 88,
        status: "under-review",
        submittedDate: "2025-01-18",
        totalStudies: 180,
        similarStudies: 22,
        enrollmentRate: "94%",
        retentionRate: "90%",
        capabilities: ["Phase II-IV", "Cardiology", "Diabetes", "Clinical Lab", "ECG Monitoring"],
        questionnaire: [
            { question: "Can you enroll 50 patients in 12 months?", answer: "Yes, estimated 55 patients" },
            { question: "Do you have experience with cardiovascular trials?", answer: "Yes, 22 studies in the past 3 years" },
            { question: "What is your screen failure rate?", answer: "18% for cardiovascular trials" }
        ],
        documents: [
            { name: "CV_1572.pdf", type: "CV", size: "2.2 MB", date: "2025-01-12" }
        ]
    },
    {
        id: 4,
        siteName: "Massachusetts General Hospital",
        location: "Boston, MA, USA",
        region: "north-america",
        pi: "Dr. David Kim",
        contact: "dkim@mgh.harvard.edu",
        phone: "+1 (617) 726-2000",
        score: 90,
        status: "approved",
        submittedDate: "2025-01-17",
        totalStudies: 220,
        similarStudies: 28,
        enrollmentRate: "97%",
        retentionRate: "93%",
        capabilities: ["Phase I-IV", "All Therapeutic Areas", "Research Hospital", "Teaching Hospital", "24/7 Emergency"],
        questionnaire: [
            { question: "Can you enroll 50 patients in 12 months?", answer: "Yes, we have capacity for 65+ patients" },
            { question: "Do you have experience with cardiovascular trials?", answer: "Extensive experience with 28 completed studies" },
            { question: "What is your screen failure rate?", answer: "14% average" }
        ],
        documents: [
            { name: "CV_1572.pdf", type: "CV", size: "2.9 MB", date: "2025-01-10" },
            { name: "Accreditation.pdf", type: "Certification", size: "1.5 MB", date: "2024-10-15" }
        ]
    },
    {
        id: 5,
        siteName: "Stanford Medical Center",
        location: "Stanford, CA, USA",
        region: "north-america",
        pi: "Dr. Lisa Wang",
        contact: "lwang@stanford.edu",
        phone: "+1 (650) 723-2300",
        score: 86,
        status: "submitted",
        submittedDate: "2025-01-16",
        totalStudies: 160,
        similarStudies: 20,
        enrollmentRate: "93%",
        retentionRate: "89%",
        capabilities: ["Phase I-III", "Cardiology", "Oncology", "Innovation Center", "Telemedicine"],
        questionnaire: [
            { question: "Can you enroll 50 patients in 12 months?", answer: "Yes, 50-55 patients feasible" },
            { question: "Do you have experience with cardiovascular trials?", answer: "Yes, 20 studies completed" },
            { question: "What is your screen failure rate?", answer: "16% for similar studies" }
        ],
        documents: [
            { name: "CV_1572.pdf", type: "CV", size: "2.7 MB", date: "2025-01-08" }
        ]
    },
    {
        id: 6,
        siteName: "Charité - Universitätsmedizin Berlin",
        location: "Berlin, Germany",
        region: "europe",
        pi: "Dr. Hans Mueller",
        contact: "hmueller@charite.de",
        phone: "+49 30 450 50",
        score: 84,
        status: "submitted",
        submittedDate: "2025-01-15",
        totalStudies: 140,
        similarStudies: 18,
        enrollmentRate: "91%",
        retentionRate: "88%",
        capabilities: ["Phase II-IV", "Cardiology", "Neurology", "EU Compliant", "Multi-language"],
        questionnaire: [
            { question: "Can you enroll 50 patients in 12 months?", answer: "Yes, 45-50 patients expected" },
            { question: "Do you have experience with cardiovascular trials?", answer: "18 cardiovascular studies" },
            { question: "What is your screen failure rate?", answer: "17% average" }
        ],
        documents: [
            { name: "CV_1572.pdf", type: "CV", size: "2.4 MB", date: "2025-01-05" }
        ]
    },
    {
        id: 7,
        siteName: "University of Tokyo Hospital",
        location: "Tokyo, Japan",
        region: "asia",
        pi: "Dr. Yuki Tanaka",
        contact: "ytanaka@u-tokyo.ac.jp",
        phone: "+81 3 3815 5411",
        score: 82,
        status: "under-review",
        submittedDate: "2025-01-14",
        totalStudies: 130,
        similarStudies: 16,
        enrollmentRate: "90%",
        retentionRate: "87%",
        capabilities: ["Phase II-IV", "Cardiology", "Diabetes", "PMDA Approved", "Japanese Language"],
        questionnaire: [
            { question: "Can you enroll 50 patients in 12 months?", answer: "Yes, 40-45 patients feasible" },
            { question: "Do you have experience with cardiovascular trials?", answer: "16 studies in cardiovascular" },
            { question: "What is your screen failure rate?", answer: "19% for cardiovascular" }
        ],
        documents: [
            { name: "CV_1572.pdf", type: "CV", size: "2.1 MB", date: "2025-01-03" }
        ]
    },
    {
        id: 8,
        siteName: "Royal Melbourne Hospital",
        location: "Melbourne, Australia",
        region: "other",
        pi: "Dr. James Wilson",
        contact: "jwilson@mh.org.au",
        phone: "+61 3 9342 7000",
        score: 78,
        status: "submitted",
        submittedDate: "2025-01-13",
        totalStudies: 110,
        similarStudies: 14,
        enrollmentRate: "88%",
        retentionRate: "85%",
        capabilities: ["Phase II-IV", "Cardiology", "TGA Approved", "Research Institute"],
        questionnaire: [
            { question: "Can you enroll 50 patients in 12 months?", answer: "Yes, 35-40 patients expected" },
            { question: "Do you have experience with cardiovascular trials?", answer: "14 cardiovascular studies" },
            { question: "What is your screen failure rate?", answer: "20% average" }
        ],
        documents: [
            { name: "CV_1572.pdf", type: "CV", size: "1.9 MB", date: "2025-01-01" }
        ]
    }
];

let filteredResponses = [...allResponses];
let selectedResponses = [];
let currentPage = 1;
let itemsPerPage = 8;
let currentView = 'cards';
let currentSort = { field: null, direction: 'asc' };

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadResponses();
    updateStats();
});

// Load Responses
function loadResponses() {
    applyFilters();
}

// Apply Filters
function applyFilters() {
    const statusFilter = document.getElementById('statusFilter').value;
    const scoreFilter = document.getElementById('scoreFilter').value;
    const locationFilter = document.getElementById('locationFilter').value;
    const searchInput = document.getElementById('searchInput').value.toLowerCase();

    filteredResponses = allResponses.filter(response => {
        // Status filter
        if (statusFilter !== 'all' && response.status !== statusFilter) return false;

        // Score filter
        if (scoreFilter !== 'all') {
            const [min, max] = scoreFilter.split('-').map(Number);
            if (response.score < min || response.score > max) return false;
        }

        // Location filter
        if (locationFilter !== 'all' && response.region !== locationFilter) return false;

        // Search filter
        if (searchInput && !response.siteName.toLowerCase().includes(searchInput) && 
            !response.location.toLowerCase().includes(searchInput)) return false;

        return true;
    });

    currentPage = 1;
    renderResponses();
    updatePagination();
}

// Clear Filters
function clearFilters() {
    document.getElementById('statusFilter').value = 'all';
    document.getElementById('scoreFilter').value = 'all';
    document.getElementById('locationFilter').value = 'all';
    document.getElementById('searchInput').value = '';
    applyFilters();
}

// Render Responses
function renderResponses() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageResponses = filteredResponses.slice(start, end);

    if (currentView === 'cards') {
        renderCardsView(pageResponses);
    } else if (currentView === 'table') {
        renderTableView(pageResponses);
    }
}

// Render Cards View
function renderCardsView(responses) {
    const container = document.getElementById('cardsView');
    container.innerHTML = '';

    responses.forEach(response => {
        const scoreClass = getScoreClass(response.score);
        const scoreLabel = getScoreLabel(response.score);

        const card = document.createElement('div');
        card.className = 'response-card';
        card.innerHTML = `
            <div class="response-card-checkbox">
                <input type="checkbox" onchange="toggleSelection(${response.id}, this.checked)">
            </div>
            <div class="response-card-header">
                <div>
                    <h3>${response.siteName}</h3>
                    <div class="response-card-location">
                        <span>📍</span>
                        <span>${response.location}</span>
                    </div>
                </div>
            </div>
            <div class="response-card-score">
                <div class="score-circle ${scoreClass}">${response.score}</div>
                <div class="score-label">${scoreLabel}</div>
            </div>
            <div class="response-card-info">
                <div class="info-item">
                    <label>Principal Investigator</label>
                    <span>${response.pi}</span>
                </div>
                <div class="info-item">
                    <label>Total Studies</label>
                    <span>${response.totalStudies}</span>
                </div>
                <div class="info-item">
                    <label>Similar Studies</label>
                    <span>${response.similarStudies}</span>
                </div>
                <div class="info-item">
                    <label>Submitted</label>
                    <span>${formatDate(response.submittedDate)}</span>
                </div>
            </div>
            <div class="response-card-status">
                <span class="status-badge ${response.status}">${formatStatus(response.status)}</span>
            </div>
            <div class="response-card-actions">
                <button class="btn btn-secondary btn-sm" onclick="viewResponse(${response.id})">
                    <span class="icon">👁️</span> View Details
                </button>
                <button class="btn btn-primary btn-sm" onclick="sendMessage(${response.id})">
                    <span class="icon">💬</span> Message
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Render Table View
function renderTableView(responses) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    responses.forEach(response => {
        const scoreClass = getScoreClass(response.score);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" onchange="toggleSelection(${response.id}, this.checked)"></td>
            <td>${response.siteName}</td>
            <td>${response.location}</td>
            <td><span class="score-circle ${scoreClass}" style="width: 40px; height: 40px; font-size: 1rem;">${response.score}</span></td>
            <td><span class="status-badge ${response.status}">${formatStatus(response.status)}</span></td>
            <td>${formatDate(response.submittedDate)}</td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="viewResponse(${response.id})">View</button>
                <button class="btn btn-primary btn-sm" onclick="sendMessage(${response.id})">Message</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Switch View
function switchView(view) {
    currentView = view;
    
    // Update buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${view}"]`).classList.add('active');

    // Show/hide views
    document.getElementById('cardsView').style.display = view === 'cards' ? 'grid' : 'none';
    document.getElementById('tableView').style.display = view === 'table' ? 'block' : 'none';
    document.getElementById('mapView').style.display = view === 'map' ? 'flex' : 'none';

    if (view !== 'map') {
        renderResponses();
    }
}

// Sort By
function sortBy(field) {
    if (currentSort.field === field) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.field = field;
        currentSort.direction = 'asc';
    }

    filteredResponses.sort((a, b) => {
        let aVal = a[field];
        let bVal = b[field];

        if (field === 'date') {
            aVal = new Date(a.submittedDate);
            bVal = new Date(b.submittedDate);
        }

        if (currentSort.direction === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });

    renderResponses();
}

// Toggle Selection
function toggleSelection(id, checked) {
    if (checked) {
        if (!selectedResponses.includes(id)) {
            selectedResponses.push(id);
        }
    } else {
        selectedResponses = selectedResponses.filter(rid => rid !== id);
    }

    updateBulkActions();
}

// Toggle Select All
function toggleSelectAll(checkbox) {
    const checkboxes = document.querySelectorAll('.response-card-checkbox input[type="checkbox"], #tableBody input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.checked = checkbox.checked;
        const card = cb.closest('.response-card') || cb.closest('tr');
        if (card) {
            const responseId = parseInt(card.querySelector('button[onclick*="viewResponse"]').getAttribute('onclick').match(/\d+/)[0]);
            toggleSelection(responseId, checkbox.checked);
        }
    });
}

// Update Bulk Actions
function updateBulkActions() {
    const bulkActions = document.getElementById('bulkActions');
    const selectedCount = document.getElementById('selectedCount');
    
    if (selectedResponses.length > 0) {
        bulkActions.style.display = 'flex';
        selectedCount.textContent = selectedResponses.length;
    } else {
        bulkActions.style.display = 'none';
    }
}

// Clear Selection
function clearSelection() {
    selectedResponses = [];
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    updateBulkActions();
}

// View Response
function viewResponse(id) {
    const response = allResponses.find(r => r.id === id);
    if (!response) return;

    // Populate modal
    document.getElementById('modalSiteName').textContent = response.siteName;
    document.getElementById('detailSiteName').textContent = response.siteName;
    document.getElementById('detailLocation').textContent = response.location;
    document.getElementById('detailPI').textContent = response.pi;
    document.getElementById('detailContact').textContent = `${response.contact} | ${response.phone}`;
    
    const scoreClass = getScoreClass(response.score);
    const scoreLabel = getScoreLabel(response.score);
    document.getElementById('detailScore').innerHTML = `<span class="score-circle ${scoreClass}" style="width: 60px; height: 60px; display: inline-flex;">${response.score}</span> ${scoreLabel}`;
    document.getElementById('detailStatus').innerHTML = `<span class="status-badge ${response.status}">${formatStatus(response.status)}</span>`;
    
    document.getElementById('detailTotalStudies').textContent = response.totalStudies;
    document.getElementById('detailSimilarStudies').textContent = response.similarStudies;
    document.getElementById('detailEnrollmentRate').textContent = response.enrollmentRate;
    document.getElementById('detailRetentionRate').textContent = response.retentionRate;

    // Capabilities
    const capabilitiesContainer = document.getElementById('detailCapabilities');
    capabilitiesContainer.innerHTML = response.capabilities.map(cap => 
        `<div class="capability-badge">${cap}</div>`
    ).join('');

    // Questionnaire
    const questionnaireContainer = document.getElementById('detailQuestionnaire');
    questionnaireContainer.innerHTML = response.questionnaire.map(item => `
        <div class="questionnaire-item">
            <div class="question">${item.question}</div>
            <div class="answer">${item.answer}</div>
        </div>
    `).join('');

    // Documents
    const documentsContainer = document.getElementById('detailDocuments');
    documentsContainer.innerHTML = response.documents.map(doc => `
        <div class="document-item">
            <div class="document-icon">📄</div>
            <div class="document-info">
                <div class="document-name">${doc.name}</div>
                <div class="document-meta">${doc.type} • ${doc.size} • ${formatDate(doc.date)}</div>
            </div>
            <button class="btn btn-secondary btn-sm">Download</button>
        </div>
    `).join('');

    // Show modal
    document.getElementById('responseModal').style.display = 'flex';
}

// Close Modal
function closeModal() {
    document.getElementById('responseModal').style.display = 'none';
}

// Compare Selected
function compareSelected() {
    if (selectedResponses.length < 2) {
        showNotification('Please select at least 2 sites to compare', 'error');
        return;
    }

    if (selectedResponses.length > 5) {
        showNotification('You can compare up to 5 sites at a time', 'error');
        return;
    }

    const responses = allResponses.filter(r => selectedResponses.includes(r.id));
    renderComparison(responses);
    document.getElementById('comparisonModal').style.display = 'flex';
}

// Render Comparison
function renderComparison(responses) {
    const container = document.getElementById('comparisonContainer');
    
    const table = document.createElement('table');
    table.className = 'comparison-table';
    
    // Header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>Criteria</th>' + responses.map(r => `<th>${r.siteName}</th>`).join('');
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Body
    const tbody = document.createElement('tbody');
    
    // Score
    const scoreRow = document.createElement('tr');
    scoreRow.innerHTML = '<td><strong>Feasibility Score</strong></td>' + 
        responses.map(r => {
            const isHighest = r.score === Math.max(...responses.map(res => res.score));
            return `<td class="${isHighest ? 'comparison-highlight' : ''}">${r.score}</td>`;
        }).join('');
    tbody.appendChild(scoreRow);
    
    // Location
    const locationRow = document.createElement('tr');
    locationRow.innerHTML = '<td><strong>Location</strong></td>' + 
        responses.map(r => `<td>${r.location}</td>`).join('');
    tbody.appendChild(locationRow);
    
    // PI
    const piRow = document.createElement('tr');
    piRow.innerHTML = '<td><strong>Principal Investigator</strong></td>' + 
        responses.map(r => `<td>${r.pi}</td>`).join('');
    tbody.appendChild(piRow);
    
    // Total Studies
    const studiesRow = document.createElement('tr');
    studiesRow.innerHTML = '<td><strong>Total Studies</strong></td>' + 
        responses.map(r => {
            const isHighest = r.totalStudies === Math.max(...responses.map(res => res.totalStudies));
            return `<td class="${isHighest ? 'comparison-highlight' : ''}">${r.totalStudies}</td>`;
        }).join('');
    tbody.appendChild(studiesRow);
    
    // Similar Studies
    const similarRow = document.createElement('tr');
    similarRow.innerHTML = '<td><strong>Similar Studies</strong></td>' + 
        responses.map(r => {
            const isHighest = r.similarStudies === Math.max(...responses.map(res => res.similarStudies));
            return `<td class="${isHighest ? 'comparison-highlight' : ''}">${r.similarStudies}</td>`;
        }).join('');
    tbody.appendChild(similarRow);
    
    // Enrollment Rate
    const enrollmentRow = document.createElement('tr');
    enrollmentRow.innerHTML = '<td><strong>Enrollment Rate</strong></td>' + 
        responses.map(r => {
            const rate = parseInt(r.enrollmentRate);
            const isHighest = rate === Math.max(...responses.map(res => parseInt(res.enrollmentRate)));
            return `<td class="${isHighest ? 'comparison-highlight' : ''}">${r.enrollmentRate}</td>`;
        }).join('');
    tbody.appendChild(enrollmentRow);
    
    // Retention Rate
    const retentionRow = document.createElement('tr');
    retentionRow.innerHTML = '<td><strong>Retention Rate</strong></td>' + 
        responses.map(r => {
            const rate = parseInt(r.retentionRate);
            const isHighest = rate === Math.max(...responses.map(res => parseInt(res.retentionRate)));
            return `<td class="${isHighest ? 'comparison-highlight' : ''}">${r.retentionRate}</td>`;
        }).join('');
    tbody.appendChild(retentionRow);
    
    // Status
    const statusRow = document.createElement('tr');
    statusRow.innerHTML = '<td><strong>Status</strong></td>' + 
        responses.map(r => `<td><span class="status-badge ${r.status}">${formatStatus(r.status)}</span></td>`).join('');
    tbody.appendChild(statusRow);
    
    table.appendChild(tbody);
    container.innerHTML = '';
    container.appendChild(table);
}

// Close Comparison Modal
function closeComparisonModal() {
    document.getElementById('comparisonModal').style.display = 'none';
}

// Export Functions
function exportToExcel() {
    showNotification('Exporting to Excel...', 'info');
    
    // Create CSV content
    let csv = 'Site Name,Location,PI,Score,Status,Total Studies,Similar Studies,Enrollment Rate,Retention Rate,Submitted Date\n';
    
    filteredResponses.forEach(response => {
        csv += `"${response.siteName}","${response.location}","${response.pi}",${response.score},"${formatStatus(response.status)}",${response.totalStudies},${response.similarStudies},"${response.enrollmentRate}","${response.retentionRate}","${response.submittedDate}"\n`;
    });
    
    // Download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `feasibility_responses_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    showNotification('Excel file downloaded successfully', 'success');
}

function exportToPDF() {
    showNotification('PDF export feature coming soon', 'info');
}

function exportComparison() {
    showNotification('Comparison export feature coming soon', 'info');
}

function bulkExport() {
    const selected = allResponses.filter(r => selectedResponses.includes(r.id));
    
    let csv = 'Site Name,Location,PI,Score,Status,Total Studies,Similar Studies,Enrollment Rate,Retention Rate,Submitted Date\n';
    
    selected.forEach(response => {
        csv += `"${response.siteName}","${response.location}","${response.pi}",${response.score},"${formatStatus(response.status)}",${response.totalStudies},${response.similarStudies},"${response.enrollmentRate}","${response.retentionRate}","${response.submittedDate}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `selected_responses_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    showNotification(`${selected.length} responses exported successfully`, 'success');
}

// Bulk Actions
function bulkApprove() {
    if (confirm(`Approve ${selectedResponses.length} selected responses?`)) {
        selectedResponses.forEach(id => {
            const response = allResponses.find(r => r.id === id);
            if (response) response.status = 'approved';
        });
        clearSelection();
        renderResponses();
        showNotification(`${selectedResponses.length} responses approved`, 'success');
    }
}

function bulkReject() {
    if (confirm(`Reject ${selectedResponses.length} selected responses?`)) {
        selectedResponses.forEach(id => {
            const response = allResponses.find(r => r.id === id);
            if (response) response.status = 'rejected';
        });
        clearSelection();
        renderResponses();
        showNotification(`${selectedResponses.length} responses rejected`, 'success');
    }
}

// Individual Actions
function approveResponse() {
    showNotification('Response approved successfully', 'success');
    closeModal();
}

function rejectResponse() {
    if (confirm('Are you sure you want to reject this response?')) {
        showNotification('Response rejected', 'success');
        closeModal();
    }
}

function sendMessage(id) {
    showNotification('Opening message composer...', 'info');
    setTimeout(() => {
        window.location.href = 'messages.html';
    }, 1000);
}

// Pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredResponses.length / itemsPerPage);
    document.getElementById('currentPage').textContent = currentPage;
    document.getElementById('totalPages').textContent = totalPages;
    
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === totalPages;
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        renderResponses();
        updatePagination();
    }
}

function nextPage() {
    const totalPages = Math.ceil(filteredResponses.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderResponses();
        updatePagination();
    }
}

// Update Stats
function updateStats() {
    const total = allResponses.length;
    const pending = allResponses.filter(r => r.status === 'submitted' || r.status === 'under-review').length;
    const avgScore = Math.round(allResponses.reduce((sum, r) => sum + r.score, 0) / total);
    
    document.getElementById('totalResponses').textContent = total;
    document.getElementById('pendingResponses').textContent = pending;
    document.getElementById('avgScore').textContent = avgScore;
}

// Helper Functions
function getScoreClass(score) {
    if (score >= 90) return 'excellent';
    if (score >= 80) return 'good';
    if (score >= 70) return 'fair';
    return 'poor';
}

function getScoreLabel(score) {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Fair';
    return 'Poor';
}

function formatStatus(status) {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
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

// Close modals on outside click
window.onclick = function(event) {
    const responseModal = document.getElementById('responseModal');
    const comparisonModal = document.getElementById('comparisonModal');
    
    if (event.target === responseModal) {
        closeModal();
    }
    if (event.target === comparisonModal) {
        closeComparisonModal();
    }
}