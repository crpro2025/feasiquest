// Response Viewer JavaScript

let currentPage = 1;
const itemsPerPage = 12;
let currentView = 'grid';
let selectedResponses = [];
let allResponses = [];

// Demo response data
const demoResponses = [
    {
        id: 1,
        siteName: 'Advanced Clinical Research Center',
        location: 'Boston, MA, USA',
        score: 95,
        status: 'complete',
        submitted: '2025-01-20',
        experience: '15+ years',
        enrollment: '250 patients/year',
        facilities: 'Full GCP-compliant facility',
        staff: '45 qualified staff'
    },
    {
        id: 2,
        siteName: 'Metropolitan Medical Research',
        location: 'New York, NY, USA',
        score: 92,
        status: 'complete',
        submitted: '2025-01-19',
        experience: '12 years',
        enrollment: '200 patients/year',
        facilities: 'State-of-the-art equipment',
        staff: '38 qualified staff'
    },
    {
        id: 3,
        siteName: 'Pacific Research Institute',
        location: 'San Francisco, CA, USA',
        score: 88,
        status: 'complete',
        submitted: '2025-01-18',
        experience: '10 years',
        enrollment: '180 patients/year',
        facilities: 'Modern research facility',
        staff: '32 qualified staff'
    },
    {
        id: 4,
        siteName: 'Midwest Clinical Trials',
        location: 'Chicago, IL, USA',
        score: 85,
        status: 'complete',
        submitted: '2025-01-17',
        experience: '8 years',
        enrollment: '150 patients/year',
        facilities: 'Well-equipped center',
        staff: '28 qualified staff'
    },
    {
        id: 5,
        siteName: 'Southern Research Associates',
        location: 'Atlanta, GA, USA',
        score: 82,
        status: 'incomplete',
        submitted: '2025-01-16',
        experience: '7 years',
        enrollment: '120 patients/year',
        facilities: 'Standard facility',
        staff: '22 qualified staff'
    },
    {
        id: 6,
        siteName: 'Texas Medical Research',
        location: 'Houston, TX, USA',
        score: 79,
        status: 'complete',
        submitted: '2025-01-15',
        experience: '6 years',
        enrollment: '100 patients/year',
        facilities: 'Adequate equipment',
        staff: '20 qualified staff'
    },
    {
        id: 7,
        siteName: 'Rocky Mountain Clinical Center',
        location: 'Denver, CO, USA',
        score: 76,
        status: 'complete',
        submitted: '2025-01-14',
        experience: '5 years',
        enrollment: '90 patients/year',
        facilities: 'Basic facility',
        staff: '18 qualified staff'
    },
    {
        id: 8,
        siteName: 'Northwest Research Group',
        location: 'Seattle, WA, USA',
        score: 73,
        status: 'incomplete',
        submitted: '2025-01-13',
        experience: '4 years',
        enrollment: '80 patients/year',
        facilities: 'Developing facility',
        staff: '15 qualified staff'
    },
    {
        id: 9,
        siteName: 'Desert Clinical Trials',
        location: 'Phoenix, AZ, USA',
        score: 70,
        status: 'pending',
        submitted: null,
        experience: '3 years',
        enrollment: '70 patients/year',
        facilities: 'New facility',
        staff: '12 qualified staff'
    },
    {
        id: 10,
        siteName: 'Coastal Research Institute',
        location: 'Miami, FL, USA',
        score: 67,
        status: 'complete',
        submitted: '2025-01-12',
        experience: '3 years',
        enrollment: '60 patients/year',
        facilities: 'Growing facility',
        staff: '10 qualified staff'
    },
    {
        id: 11,
        siteName: 'Great Lakes Medical Center',
        location: 'Detroit, MI, USA',
        score: 64,
        status: 'incomplete',
        submitted: '2025-01-11',
        experience: '2 years',
        enrollment: '50 patients/year',
        facilities: 'Basic setup',
        staff: '8 qualified staff'
    },
    {
        id: 12,
        siteName: 'Capital Research Associates',
        location: 'Washington, DC, USA',
        score: 61,
        status: 'pending',
        submitted: null,
        experience: '2 years',
        enrollment: '40 patients/year',
        facilities: 'Minimal equipment',
        staff: '6 qualified staff'
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    allResponses = [...demoResponses];
    loadResponses();
});

// Load responses
function loadResponses() {
    filterResponses();
}

// Filter responses
function filterResponses() {
    const statusFilter = document.getElementById('statusFilter').value;
    const scoreFilter = document.getElementById('scoreFilter').value;
    const locationFilter = document.getElementById('locationFilter').value;
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    let filtered = [...demoResponses];
    
    // Status filter
    if (statusFilter !== 'all') {
        filtered = filtered.filter(r => r.status === statusFilter);
    }
    
    // Score filter
    if (scoreFilter !== 'all') {
        const minScore = parseInt(scoreFilter);
        filtered = filtered.filter(r => r.score >= minScore);
    }
    
    // Location filter
    if (locationFilter !== 'all') {
        if (locationFilter === 'us') {
            filtered = filtered.filter(r => r.location.includes('USA'));
        } else if (locationFilter === 'eu') {
            filtered = filtered.filter(r => r.location.includes('EU') || r.location.includes('Europe'));
        } else if (locationFilter === 'asia') {
            filtered = filtered.filter(r => r.location.includes('Asia') || r.location.includes('China') || r.location.includes('Japan'));
        }
    }
    
    // Search filter
    if (searchInput) {
        filtered = filtered.filter(r => 
            r.siteName.toLowerCase().includes(searchInput) ||
            r.location.toLowerCase().includes(searchInput)
        );
    }
    
    allResponses = filtered;
    currentPage = 1;
    renderResponses();
}

// Render responses
function renderResponses() {
    if (currentView === 'grid') {
        renderGridView();
    } else {
        renderTableView();
    }
    updatePagination();
}

// Render grid view
function renderGridView() {
    const grid = document.getElementById('responsesGrid');
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageResponses = allResponses.slice(start, end);
    
    grid.innerHTML = pageResponses.map(response => `
        <div class="response-card" onclick="viewResponseDetail(${response.id})">
            <div class="response-card-header">
                <input type="checkbox" class="card-checkbox" onclick="event.stopPropagation(); toggleSelection(${response.id})" ${selectedResponses.includes(response.id) ? 'checked' : ''}>
                <div class="card-score">${response.score}</div>
            </div>
            <div class="card-site-name">${response.siteName}</div>
            <div class="card-location">📍 ${response.location}</div>
            <div class="card-stats">
                <div class="card-stat">
                    <span class="card-stat-label">Experience</span>
                    <span class="card-stat-value">${response.experience}</span>
                </div>
                <div class="card-stat">
                    <span class="card-stat-label">Enrollment</span>
                    <span class="card-stat-value">${response.enrollment}</span>
                </div>
                <div class="card-stat">
                    <span class="card-stat-label">Staff</span>
                    <span class="card-stat-value">${response.staff}</span>
                </div>
                <div class="card-stat">
                    <span class="card-stat-label">Status</span>
                    <span class="card-status ${response.status}">${response.status.charAt(0).toUpperCase() + response.status.slice(1)}</span>
                </div>
            </div>
            <div class="card-actions">
                <button onclick="event.stopPropagation(); viewResponseDetail(${response.id})">View Details</button>
                <button onclick="event.stopPropagation(); contactSite(${response.id})">Contact</button>
            </div>
        </div>
    `).join('');
}

// Render table view
function renderTableView() {
    const tbody = document.getElementById('responsesTableBody');
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageResponses = allResponses.slice(start, end);
    
    tbody.innerHTML = pageResponses.map(response => `
        <tr>
            <td><input type="checkbox" onclick="toggleSelection(${response.id})" ${selectedResponses.includes(response.id) ? 'checked' : ''}></td>
            <td>${response.siteName}</td>
            <td>${response.location}</td>
            <td><span class="card-score" style="font-size: 0.9rem; padding: 0.25rem 0.75rem;">${response.score}</span></td>
            <td><span class="card-status ${response.status}">${response.status.charAt(0).toUpperCase() + response.status.slice(1)}</span></td>
            <td>${response.submitted || 'Not submitted'}</td>
            <td>
                <div class="table-actions">
                    <button onclick="viewResponseDetail(${response.id})">View</button>
                    <button onclick="contactSite(${response.id})">Contact</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Switch view
function switchView(view) {
    currentView = view;
    
    // Update toggle buttons
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${view}"]`).classList.add('active');
    
    // Show/hide views
    if (view === 'grid') {
        document.getElementById('responsesGrid').style.display = 'grid';
        document.getElementById('responsesTable').style.display = 'none';
    } else {
        document.getElementById('responsesGrid').style.display = 'none';
        document.getElementById('responsesTable').style.display = 'block';
    }
    
    renderResponses();
}

// Toggle selection
function toggleSelection(id) {
    const index = selectedResponses.indexOf(id);
    if (index > -1) {
        selectedResponses.splice(index, 1);
    } else {
        selectedResponses.push(id);
    }
}

// Select all
function selectAll() {
    selectedResponses = allResponses.map(r => r.id);
    renderResponses();
}

// Deselect all
function deselectAll() {
    selectedResponses = [];
    renderResponses();
}

// Toggle all checkboxes (table view)
function toggleAllCheckboxes(checkbox) {
    if (checkbox.checked) {
        selectAll();
    } else {
        deselectAll();
    }
}

// View response detail
function viewResponseDetail(id) {
    const response = demoResponses.find(r => r.id === id);
    if (!response) return;
    
    document.getElementById('modalSiteName').textContent = response.siteName;
    document.getElementById('responseDetailBody').innerHTML = `
        <div style="display: grid; gap: 2rem;">
            <div>
                <h3 style="color: #00f0ff; margin-bottom: 1rem;">Site Information</h3>
                <div style="display: grid; gap: 1rem;">
                    <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem;">
                        <span style="color: rgba(255, 255, 255, 0.6);">Location:</span>
                        <span style="color: white; font-weight: 600;">${response.location}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem;">
                        <span style="color: rgba(255, 255, 255, 0.6);">Match Score:</span>
                        <span style="color: #00f0ff; font-weight: 700; font-size: 1.2rem;">${response.score}/100</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem;">
                        <span style="color: rgba(255, 255, 255, 0.6);">Status:</span>
                        <span class="card-status ${response.status}">${response.status.charAt(0).toUpperCase() + response.status.slice(1)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem;">
                        <span style="color: rgba(255, 255, 255, 0.6);">Submitted:</span>
                        <span style="color: white; font-weight: 600;">${response.submitted || 'Not submitted'}</span>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 style="color: #00f0ff; margin-bottom: 1rem;">Capabilities</h3>
                <div style="display: grid; gap: 1rem;">
                    <div style="padding: 1rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem;">
                        <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.9rem; margin-bottom: 0.5rem;">Experience</div>
                        <div style="color: white; font-weight: 600;">${response.experience}</div>
                    </div>
                    <div style="padding: 1rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem;">
                        <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.9rem; margin-bottom: 0.5rem;">Enrollment Capacity</div>
                        <div style="color: white; font-weight: 600;">${response.enrollment}</div>
                    </div>
                    <div style="padding: 1rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem;">
                        <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.9rem; margin-bottom: 0.5rem;">Facilities</div>
                        <div style="color: white; font-weight: 600;">${response.facilities}</div>
                    </div>
                    <div style="padding: 1rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem;">
                        <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.9rem; margin-bottom: 0.5rem;">Staff</div>
                        <div style="color: white; font-weight: 600;">${response.staff}</div>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 style="color: #00f0ff; margin-bottom: 1rem;">Questionnaire Responses</h3>
                <div style="padding: 1.5rem; background: rgba(26, 31, 58, 0.6); border-radius: 0.5rem;">
                    <p style="color: rgba(255, 255, 255, 0.8); line-height: 1.8;">
                        This site has completed ${response.status === 'complete' ? 'all 20 questions' : '12 of 20 questions'} in the feasibility questionnaire.
                        ${response.status === 'complete' ? 'All required documentation has been provided.' : 'Some questions are still pending response.'}
                    </p>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('responseDetailModal').classList.add('active');
}

// Close response modal
function closeResponseModal() {
    document.getElementById('responseDetailModal').classList.remove('active');
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
    
    const sites = selectedResponses.map(id => demoResponses.find(r => r.id === id));
    
    document.getElementById('comparisonBody').innerHTML = `
        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: rgba(10, 14, 39, 0.8);">
                        <th style="padding: 1rem; text-align: left; color: #00f0ff; border-bottom: 2px solid rgba(0, 240, 255, 0.3);">Criteria</th>
                        ${sites.map(site => `
                            <th style="padding: 1rem; text-align: center; color: #00f0ff; border-bottom: 2px solid rgba(0, 240, 255, 0.3);">${site.siteName}</th>
                        `).join('')}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 1rem; color: rgba(255, 255, 255, 0.6); border-bottom: 1px solid rgba(255, 255, 255, 0.05);">Match Score</td>
                        ${sites.map(site => `
                            <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                                <span style="background: linear-gradient(135deg, #00f0ff 0%, #b026ff 100%); color: white; padding: 0.5rem 1rem; border-radius: 1rem; font-weight: 700;">${site.score}</span>
                            </td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td style="padding: 1rem; color: rgba(255, 255, 255, 0.6); border-bottom: 1px solid rgba(255, 255, 255, 0.05);">Location</td>
                        ${sites.map(site => `
                            <td style="padding: 1rem; text-align: center; color: white; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">${site.location}</td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td style="padding: 1rem; color: rgba(255, 255, 255, 0.6); border-bottom: 1px solid rgba(255, 255, 255, 0.05);">Experience</td>
                        ${sites.map(site => `
                            <td style="padding: 1rem; text-align: center; color: white; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">${site.experience}</td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td style="padding: 1rem; color: rgba(255, 255, 255, 0.6); border-bottom: 1px solid rgba(255, 255, 255, 0.05);">Enrollment</td>
                        ${sites.map(site => `
                            <td style="padding: 1rem; text-align: center; color: white; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">${site.enrollment}</td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td style="padding: 1rem; color: rgba(255, 255, 255, 0.6); border-bottom: 1px solid rgba(255, 255, 255, 0.05);">Staff</td>
                        ${sites.map(site => `
                            <td style="padding: 1rem; text-align: center; color: white; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">${site.staff}</td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td style="padding: 1rem; color: rgba(255, 255, 255, 0.6); border-bottom: 1px solid rgba(255, 255, 255, 0.05);">Status</td>
                        ${sites.map(site => `
                            <td style="padding: 1rem; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                                <span class="card-status ${site.status}">${site.status.charAt(0).toUpperCase() + site.status.slice(1)}</span>
                            </td>
                        `).join('')}
                    </tr>
                </tbody>
            </table>
        </div>
    `;
    
    document.getElementById('comparisonModal').classList.add('active');
}

// Close comparison modal
function closeComparisonModal() {
    document.getElementById('comparisonModal').classList.remove('active');
}

// Export functions
function exportAllResponses() {
    alert('Exporting all responses to Excel...');
    // In real app, this would generate Excel file
}

function exportSelected() {
    if (selectedResponses.length === 0) {
        alert('Please select at least one response to export');
        return;
    }
    alert(`Exporting ${selectedResponses.length} selected responses to Excel...`);
}

function exportResponse() {
    alert('Exporting response to PDF...');
}

function exportComparison() {
    alert('Exporting comparison to PDF...');
}

// Contact site
function contactSite(id) {
    const response = demoResponses.find(r => r.id === id);
    if (response) {
        alert(`Opening message composer for ${response.siteName}...`);
        // In real app, this would open message composer
    }
}

// Pagination
function updatePagination() {
    const totalPages = Math.ceil(allResponses.length / itemsPerPage);
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prevPageBtn').disabled = currentPage === 1;
    document.getElementById('nextPageBtn').disabled = currentPage === totalPages;
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        renderResponses();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function nextPage() {
    const totalPages = Math.ceil(allResponses.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderResponses();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Close modals on outside click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Close modals on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});