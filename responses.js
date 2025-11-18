// Response Viewer JavaScript

// Demo data
let allResponses = [];
let filteredResponses = [];
let selectedResponses = [];
let currentPage = 1;
let itemsPerPage = 10;
let currentView = 'list';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadDemoData();
    loadResponses();
});

// Load demo data
function loadDemoData() {
    allResponses = [
        {
            id: 1,
            siteName: 'Metro Research Institute',
            location: 'Boston, MA',
            region: 'northeast',
            score: 96,
            completion: 100,
            experience: 15,
            nsclcStudies: 12,
            patients: 245,
            capacity: 'High',
            submitted: '2025-01-20',
            status: 'complete',
            piName: 'Dr. Sarah Johnson',
            enrollment: 25,
            timeline: '18 months',
            budget: '$625,000'
        },
        {
            id: 2,
            siteName: 'Pacific Clinical Trials',
            location: 'San Francisco, CA',
            region: 'west',
            score: 94,
            completion: 100,
            experience: 12,
            nsclcStudies: 10,
            patients: 198,
            capacity: 'High',
            submitted: '2025-01-21',
            status: 'complete',
            piName: 'Dr. Michael Chen',
            enrollment: 20,
            timeline: '20 months',
            budget: '$500,000'
        },
        {
            id: 3,
            siteName: 'Northeast Medical Center',
            location: 'New York, NY',
            region: 'northeast',
            score: 92,
            completion: 100,
            experience: 18,
            nsclcStudies: 15,
            patients: 312,
            capacity: 'Medium',
            submitted: '2025-01-19',
            status: 'complete',
            piName: 'Dr. Emily Rodriguez',
            enrollment: 30,
            timeline: '16 months',
            budget: '$750,000'
        },
        {
            id: 4,
            siteName: 'Midwest Research Group',
            location: 'Chicago, IL',
            region: 'midwest',
            score: 90,
            completion: 95,
            experience: 10,
            nsclcStudies: 8,
            patients: 156,
            capacity: 'High',
            submitted: '2025-01-22',
            status: 'complete',
            piName: 'Dr. James Wilson',
            enrollment: 18,
            timeline: '22 months',
            budget: '$450,000'
        },
        {
            id: 5,
            siteName: 'Southern Clinical Research',
            location: 'Atlanta, GA',
            region: 'southeast',
            score: 88,
            completion: 100,
            experience: 14,
            nsclcStudies: 11,
            patients: 203,
            capacity: 'Medium',
            submitted: '2025-01-18',
            status: 'complete',
            piName: 'Dr. Lisa Anderson',
            enrollment: 22,
            timeline: '19 months',
            budget: '$550,000'
        },
        {
            id: 6,
            siteName: 'Texas Oncology Research',
            location: 'Houston, TX',
            region: 'southeast',
            score: 87,
            completion: 90,
            experience: 16,
            nsclcStudies: 13,
            patients: 267,
            capacity: 'High',
            submitted: '2025-01-23',
            status: 'incomplete',
            piName: 'Dr. Robert Martinez',
            enrollment: 28,
            timeline: '17 months',
            budget: '$700,000'
        },
        {
            id: 7,
            siteName: 'Mountain View Research',
            location: 'Denver, CO',
            region: 'west',
            score: 85,
            completion: 100,
            experience: 9,
            nsclcStudies: 7,
            patients: 134,
            capacity: 'Medium',
            submitted: '2025-01-17',
            status: 'complete',
            piName: 'Dr. Jennifer Lee',
            enrollment: 15,
            timeline: '24 months',
            budget: '$375,000'
        },
        {
            id: 8,
            siteName: 'Coastal Clinical Trials',
            location: 'Seattle, WA',
            region: 'west',
            score: 84,
            completion: 85,
            experience: 11,
            nsclcStudies: 9,
            patients: 178,
            capacity: 'High',
            submitted: '2025-01-24',
            status: 'incomplete',
            piName: 'Dr. David Kim',
            enrollment: 19,
            timeline: '21 months',
            budget: '$475,000'
        },
        {
            id: 9,
            siteName: 'Great Lakes Research',
            location: 'Detroit, MI',
            region: 'midwest',
            score: 82,
            completion: 100,
            experience: 13,
            nsclcStudies: 10,
            patients: 189,
            capacity: 'Medium',
            submitted: '2025-01-16',
            status: 'complete',
            piName: 'Dr. Patricia Brown',
            enrollment: 21,
            timeline: '20 months',
            budget: '$525,000'
        },
        {
            id: 10,
            siteName: 'Florida Research Institute',
            location: 'Miami, FL',
            region: 'southeast',
            score: 80,
            completion: 75,
            experience: 8,
            nsclcStudies: 6,
            patients: 145,
            capacity: 'Medium',
            submitted: '2025-01-25',
            status: 'incomplete',
            piName: 'Dr. Carlos Garcia',
            enrollment: 16,
            timeline: '23 months',
            budget: '$400,000'
        },
        {
            id: 11,
            siteName: 'Arizona Clinical Trials',
            location: 'Phoenix, AZ',
            region: 'west',
            score: 78,
            completion: 100,
            experience: 7,
            nsclcStudies: 5,
            patients: 123,
            capacity: 'Low',
            submitted: '2025-01-15',
            status: 'complete',
            piName: 'Dr. Maria Sanchez',
            enrollment: 12,
            timeline: '26 months',
            budget: '$300,000'
        },
        {
            id: 12,
            siteName: 'Carolina Research Center',
            location: 'Charlotte, NC',
            region: 'southeast',
            score: 76,
            completion: 80,
            experience: 6,
            nsclcStudies: 4,
            patients: 98,
            capacity: 'Low',
            submitted: '2025-01-26',
            status: 'incomplete',
            piName: 'Dr. Thomas White',
            enrollment: 10,
            timeline: '28 months',
            budget: '$250,000'
        }
    ];
    
    filteredResponses = [...allResponses];
}

// Load responses
function loadResponses() {
    filterResponses();
    updateStats();
}

// Update stats
function updateStats() {
    const totalSent = 156;
    const totalReceived = allResponses.length;
    const responseRate = Math.round((totalReceived / totalSent) * 100);
    
    document.getElementById('totalSent').textContent = totalSent;
    document.getElementById('totalReceived').textContent = totalReceived;
    document.getElementById('responseRate').textContent = responseRate + '%';
}

// Filter responses
function filterResponses() {
    const statusFilter = document.getElementById('statusFilter').value;
    const scoreFilter = document.getElementById('scoreFilter').value;
    const locationFilter = document.getElementById('locationFilter').value;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    filteredResponses = allResponses.filter(response => {
        // Status filter
        if (statusFilter !== 'all' && response.status !== statusFilter) {
            return false;
        }
        
        // Score filter
        if (scoreFilter !== 'all') {
            const minScore = parseInt(scoreFilter);
            if (response.score < minScore) {
                return false;
            }
        }
        
        // Location filter
        if (locationFilter !== 'all' && response.region !== locationFilter) {
            return false;
        }
        
        // Search filter
        if (searchTerm && !response.siteName.toLowerCase().includes(searchTerm)) {
            return false;
        }
        
        return true;
    });
    
    currentPage = 1;
    renderResponses();
}

// Search responses
function searchResponses() {
    filterResponses();
}

// Render responses
function renderResponses() {
    if (currentView === 'list') {
        renderListView();
    } else {
        renderCardsView();
    }
    renderPagination();
}

// Render list view
function renderListView() {
    const tbody = document.getElementById('responsesTableBody');
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageResponses = filteredResponses.slice(start, end);
    
    tbody.innerHTML = pageResponses.map(response => `
        <tr class="${selectedResponses.includes(response.id) ? 'selected' : ''}" data-id="${response.id}">
            <td>
                <input type="checkbox" 
                       ${selectedResponses.includes(response.id) ? 'checked' : ''} 
                       onchange="toggleResponseSelection(${response.id})">
            </td>
            <td>
                <div class="score-badge ${getScoreClass(response.score)}">
                    ${response.score}
                </div>
            </td>
            <td>
                <div class="site-info">
                    <div class="site-name">${response.siteName}</div>
                    <div class="site-location">📍 ${response.location}</div>
                </div>
            </td>
            <td>${response.location}</td>
            <td>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" style="width: ${response.completion}%"></div>
                </div>
                <div class="progress-text">${response.completion}%</div>
            </td>
            <td>${response.experience} years</td>
            <td>
                <span style="color: ${response.capacity === 'High' ? '#10b981' : response.capacity === 'Medium' ? '#f59e0b' : '#ef4444'}">
                    ${response.capacity}
                </span>
            </td>
            <td>${formatDate(response.submitted)}</td>
            <td>
                <span class="status-badge ${response.status}">
                    ${response.status.charAt(0).toUpperCase() + response.status.slice(1)}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn primary" onclick="viewResponse(${response.id})">
                        👁️ View
                    </button>
                    <button class="action-btn" onclick="addToComparison(${response.id})">
                        🔄 Compare
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Render cards view
function renderCardsView() {
    const container = document.getElementById('responseCards');
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageResponses = filteredResponses.slice(start, end);
    
    container.innerHTML = pageResponses.map(response => `
        <div class="response-card ${selectedResponses.includes(response.id) ? 'selected' : ''}" 
             data-id="${response.id}"
             onclick="viewResponse(${response.id})">
            <div class="card-header">
                <div class="site-info">
                    <div class="site-name">${response.siteName}</div>
                    <div class="site-location">📍 ${response.location}</div>
                </div>
                <div class="score-badge ${getScoreClass(response.score)}">
                    ${response.score}
                </div>
            </div>
            
            <div class="card-stats">
                <div class="card-stat">
                    <div class="card-stat-value">${response.experience}</div>
                    <div class="card-stat-label">Years Exp</div>
                </div>
                <div class="card-stat">
                    <div class="card-stat-value">${response.nsclcStudies}</div>
                    <div class="card-stat-label">NSCLC Studies</div>
                </div>
                <div class="card-stat">
                    <div class="card-stat-value">${response.patients}</div>
                    <div class="card-stat-label">Patients</div>
                </div>
                <div class="card-stat">
                    <div class="card-stat-value">${response.capacity}</div>
                    <div class="card-stat-label">Capacity</div>
                </div>
            </div>
            
            <div style="margin-top: 1rem;">
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" style="width: ${response.completion}%"></div>
                </div>
                <div class="progress-text">${response.completion}% Complete</div>
            </div>
            
            <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                <button class="action-btn primary" style="flex: 1;" onclick="event.stopPropagation(); viewResponse(${response.id})">
                    👁️ View Details
                </button>
                <button class="action-btn" onclick="event.stopPropagation(); toggleResponseSelection(${response.id})">
                    ${selectedResponses.includes(response.id) ? '✓ Selected' : '☐ Select'}
                </button>
            </div>
        </div>
    `).join('');
}

// Get score class
function getScoreClass(score) {
    if (score >= 90) return 'excellent';
    if (score >= 80) return 'very-good';
    if (score >= 70) return 'good';
    return 'fair';
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Toggle response selection
function toggleResponseSelection(id) {
    if (selectedResponses.includes(id)) {
        selectedResponses = selectedResponses.filter(rid => rid !== id);
    } else {
        selectedResponses.push(id);
    }
    
    updateSelectionUI();
}

// Toggle select all
function toggleSelectAll() {
    const checkbox = document.getElementById('selectAll');
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageResponses = filteredResponses.slice(start, end);
    
    if (checkbox.checked) {
        pageResponses.forEach(response => {
            if (!selectedResponses.includes(response.id)) {
                selectedResponses.push(response.id);
            }
        });
    } else {
        pageResponses.forEach(response => {
            selectedResponses = selectedResponses.filter(id => id !== response.id);
        });
    }
    
    updateSelectionUI();
}

// Update selection UI
function updateSelectionUI() {
    const count = selectedResponses.length;
    document.getElementById('selectedCount').textContent = count;
    
    const bulkActions = document.getElementById('bulkActions');
    if (count > 0) {
        bulkActions.style.display = 'flex';
    } else {
        bulkActions.style.display = 'none';
    }
    
    renderResponses();
}

// Deselect all
function deselectAll() {
    selectedResponses = [];
    document.getElementById('selectAll').checked = false;
    updateSelectionUI();
}

// Switch view
function switchView(view) {
    currentView = view;
    
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${view}"]`).classList.add('active');
    
    if (view === 'list') {
        document.getElementById('listView').style.display = 'block';
        document.getElementById('cardsView').style.display = 'none';
    } else {
        document.getElementById('listView').style.display = 'none';
        document.getElementById('cardsView').style.display = 'block';
    }
    
    renderResponses();
}

// Render pagination
function renderPagination() {
    const totalPages = Math.ceil(filteredResponses.length / itemsPerPage);
    const pageNumbers = document.getElementById('pageNumbers');
    
    let html = '';
    for (let i = 1; i <= totalPages; i++) {
        html += `<div class="page-number ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</div>`;
    }
    
    pageNumbers.innerHTML = html;
}

// Go to page
function goToPage(page) {
    currentPage = page;
    renderResponses();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Previous page
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        renderResponses();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Next page
function nextPage() {
    const totalPages = Math.ceil(filteredResponses.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderResponses();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// View response
function viewResponse(id) {
    const response = allResponses.find(r => r.id === id);
    if (!response) return;
    
    const modal = document.getElementById('responseDetailModal');
    const body = document.getElementById('responseDetailBody');
    
    body.innerHTML = `
        <div style="margin-bottom: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 2rem;">
                <div>
                    <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${response.siteName}</h3>
                    <p style="color: var(--text-secondary);">📍 ${response.location}</p>
                    <p style="color: var(--text-secondary); margin-top: 0.5rem;">
                        <strong>PI:</strong> ${response.piName}
                    </p>
                </div>
                <div class="score-badge ${getScoreClass(response.score)}" style="width: 80px; height: 80px; font-size: 2rem;">
                    ${response.score}
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem;">
                <div style="padding: 1rem; background: var(--bg-secondary); border-radius: 8px; text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary-color);">${response.experience}</div>
                    <div style="font-size: 0.875rem; color: var(--text-secondary);">Years Experience</div>
                </div>
                <div style="padding: 1rem; background: var(--bg-secondary); border-radius: 8px; text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary-color);">${response.nsclcStudies}</div>
                    <div style="font-size: 0.875rem; color: var(--text-secondary);">NSCLC Studies</div>
                </div>
                <div style="padding: 1rem; background: var(--bg-secondary); border-radius: 8px; text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary-color);">${response.patients}</div>
                    <div style="font-size: 0.875rem; color: var(--text-secondary);">Patients</div>
                </div>
                <div style="padding: 1rem; background: var(--bg-secondary); border-radius: 8px; text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary-color);">${response.capacity}</div>
                    <div style="font-size: 0.875rem; color: var(--text-secondary);">Capacity</div>
                </div>
            </div>
            
            <div style="margin-bottom: 2rem;">
                <h4 style="margin-bottom: 1rem;">Enrollment Proposal</h4>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                    <div>
                        <strong>Target Enrollment:</strong><br>
                        ${response.enrollment} patients
                    </div>
                    <div>
                        <strong>Timeline:</strong><br>
                        ${response.timeline}
                    </div>
                    <div>
                        <strong>Budget:</strong><br>
                        ${response.budget}
                    </div>
                </div>
            </div>
            
            <div style="margin-bottom: 2rem;">
                <h4 style="margin-bottom: 1rem;">Response Status</h4>
                <div class="progress-bar-container" style="height: 12px;">
                    <div class="progress-bar-fill" style="width: ${response.completion}%"></div>
                </div>
                <p style="margin-top: 0.5rem; color: var(--text-secondary);">
                    ${response.completion}% Complete - Submitted ${formatDate(response.submitted)}
                </p>
            </div>
            
            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                <button class="btn-primary" onclick="addToShortlist(${response.id})">
                    ⭐ Add to Shortlist
                </button>
                <button class="btn-secondary" onclick="scheduleCall(${response.id})">
                    📞 Schedule Call
                </button>
                <button class="btn-secondary" onclick="viewFullQuestionnaire(${response.id})">
                    📋 View Full Questionnaire
                </button>
                <button class="btn-secondary" onclick="exportResponse(${response.id})">
                    📥 Export PDF
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Compare selected
function compareSelected() {
    if (selectedResponses.length < 2) {
        alert('Please select at least 2 sites to compare');
        return;
    }
    
    if (selectedResponses.length > 5) {
        alert('You can compare up to 5 sites at a time');
        return;
    }
    
    showComparison(selectedResponses);
}

// Add to comparison
function addToComparison(id) {
    if (!selectedResponses.includes(id)) {
        selectedResponses.push(id);
        updateSelectionUI();
    }
    
    if (selectedResponses.length >= 2) {
        compareSelected();
    } else {
        alert('Select at least one more site to compare');
    }
}

// Show comparison
function showComparison(ids) {
    const sites = ids.map(id => allResponses.find(r => r.id === id));
    const modal = document.getElementById('comparisonModal');
    const body = document.getElementById('comparisonBody');
    
    body.innerHTML = `
        <div style="overflow-x: auto;">
            <table class="responses-table">
                <thead>
                    <tr>
                        <th>Criteria</th>
                        ${sites.map(site => `<th>${site.siteName}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Match Score</strong></td>
                        ${sites.map(site => `
                            <td>
                                <div class="score-badge ${getScoreClass(site.score)}" style="width: 50px; height: 50px;">
                                    ${site.score}
                                </div>
                            </td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td><strong>Location</strong></td>
                        ${sites.map(site => `<td>${site.location}</td>`).join('')}
                    </tr>
                    <tr>
                        <td><strong>Experience</strong></td>
                        ${sites.map(site => `<td>${site.experience} years</td>`).join('')}
                    </tr>
                    <tr>
                        <td><strong>NSCLC Studies</strong></td>
                        ${sites.map(site => `<td>${site.nsclcStudies} studies</td>`).join('')}
                    </tr>
                    <tr>
                        <td><strong>Patient Database</strong></td>
                        ${sites.map(site => `<td>${site.patients} patients</td>`).join('')}
                    </tr>
                    <tr>
                        <td><strong>Capacity</strong></td>
                        ${sites.map(site => `<td>${site.capacity}</td>`).join('')}
                    </tr>
                    <tr>
                        <td><strong>Proposed Enrollment</strong></td>
                        ${sites.map(site => `<td>${site.enrollment} patients</td>`).join('')}
                    </tr>
                    <tr>
                        <td><strong>Timeline</strong></td>
                        ${sites.map(site => `<td>${site.timeline}</td>`).join('')}
                    </tr>
                    <tr>
                        <td><strong>Budget</strong></td>
                        ${sites.map(site => `<td>${site.budget}</td>`).join('')}
                    </tr>
                    <tr>
                        <td><strong>Principal Investigator</strong></td>
                        ${sites.map(site => `<td>${site.piName}</td>`).join('')}
                    </tr>
                    <tr>
                        <td><strong>Response Status</strong></td>
                        ${sites.map(site => `
                            <td>
                                <span class="status-badge ${site.status}">
                                    ${site.status.charAt(0).toUpperCase() + site.status.slice(1)}
                                </span>
                            </td>
                        `).join('')}
                    </tr>
                </tbody>
            </table>
        </div>
    `;
    
    modal.classList.add('active');
}

// Bulk actions
function shortlistSelected() {
    alert(`Added ${selectedResponses.length} sites to shortlist`);
}

function scheduleCallsSelected() {
    alert(`Scheduling calls with ${selectedResponses.length} sites`);
}

function exportSelected() {
    alert(`Exporting ${selectedResponses.length} responses`);
}

function exportResponses() {
    alert('Exporting all responses to Excel');
}

function exportComparison() {
    alert('Exporting comparison to PDF');
}

// Individual actions
function addToShortlist(id) {
    const site = allResponses.find(r => r.id === id);
    alert(`Added ${site.siteName} to shortlist`);
}

function scheduleCall(id) {
    const site = allResponses.find(r => r.id === id);
    alert(`Scheduling call with ${site.siteName}`);
}

function viewFullQuestionnaire(id) {
    window.open('questionnaire-enhanced.html', '_blank');
}

function exportResponse(id) {
    const site = allResponses.find(r => r.id === id);
    alert(`Exporting ${site.siteName} response to PDF`);
}

// Close modal on outside click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});