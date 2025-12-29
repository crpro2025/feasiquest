// Document Upload System JavaScript

// Demo documents data
const demoDocuments = [
    { id: 1, name: 'Protocol_v2.0.pdf', type: 'pdf', category: 'protocol', size: '2.4 MB', date: '2024-01-15', icon: '📄' },
    { id: 2, name: 'Informed_Consent_Form.pdf', type: 'pdf', category: 'icf', size: '856 KB', date: '2024-01-14', icon: '📄' },
    { id: 3, name: 'Budget_Template.xlsx', type: 'xls', category: 'budget', size: '124 KB', date: '2024-01-13', icon: '📊' },
    { id: 4, name: 'Site_Capability_Statement.docx', type: 'doc', category: 'other', size: '1.2 MB', date: '2024-01-12', icon: '📝' },
    { id: 5, name: 'IRB_Approval_Letter.pdf', type: 'pdf', category: 'regulatory', size: '456 KB', date: '2024-01-11', icon: '📄' },
    { id: 6, name: 'Study_Report_Q4.pdf', type: 'pdf', category: 'reports', size: '3.2 MB', date: '2024-01-10', icon: '📄' },
    { id: 7, name: 'Investigator_Brochure.pdf', type: 'pdf', category: 'protocol', size: '5.6 MB', date: '2024-01-09', icon: '📄' },
    { id: 8, name: 'Contract_Agreement.pdf', type: 'pdf', category: 'budget', size: '678 KB', date: '2024-01-08', icon: '📄' }
];

const demoFolders = [
    { id: 'f1', name: 'Protocols', count: 12 },
    { id: 'f2', name: 'Regulatory Documents', count: 24 },
    { id: 'f3', name: 'Budget & Contracts', count: 8 },
    { id: 'f4', name: 'Reports', count: 15 }
];

// State
let currentView = 'grid';
let selectedDocuments = [];
let bulkSelectMode = false;
let uploadQueue = [];
let currentFolder = 'root';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadDocuments();
    initializeFilters();
    initializeUploadZone();
});

// Load documents
function loadDocuments() {
    const documentsView = document.getElementById('documentsView');
    
    // Show folders first
    const foldersHTML = demoFolders.map(folder => createFolderCard(folder)).join('');
    
    // Then show documents
    const documentsHTML = demoDocuments.map(doc => {
        if (currentView === 'grid') {
            return createDocumentCard(doc);
        } else {
            return createDocumentItem(doc);
        }
    }).join('');
    
    documentsView.innerHTML = foldersHTML + documentsHTML;
    
    attachDocumentListeners();
}

// Create folder card
function createFolderCard(folder) {
    return `
        <div class="folder-card" onclick="navigateToFolder('${folder.id}')">
            <div class="folder-icon">📁</div>
            <div class="folder-name">${folder.name}</div>
            <div class="document-meta">
                <span>${folder.count} items</span>
            </div>
        </div>
    `;
}

// Create document card (grid view)
function createDocumentCard(doc) {
    const selected = selectedDocuments.includes(doc.id) ? 'selected' : '';
    return `
        <div class="document-card ${selected}" data-doc-id="${doc.id}">
            ${bulkSelectMode ? `<input type="checkbox" class="select-checkbox" ${selected ? 'checked' : ''}>` : ''}
            <div class="document-actions">
                <div class="action-icon" onclick="downloadDocument(${doc.id}); event.stopPropagation();">⬇</div>
                <div class="action-icon" onclick="shareDocument(${doc.id}); event.stopPropagation();">🔗</div>
                <div class="action-icon" onclick="deleteDocument(${doc.id}); event.stopPropagation();">🗑️</div>
            </div>
            <div class="document-icon">${doc.icon}</div>
            <div class="document-name" title="${doc.name}">${doc.name}</div>
            <div class="document-meta">
                <span>${doc.size}</span>
                <span>${formatDate(doc.date)}</span>
            </div>
        </div>
    `;
}

// Create document item (list view)
function createDocumentItem(doc) {
    const selected = selectedDocuments.includes(doc.id) ? 'selected' : '';
    return `
        <div class="document-item ${selected}" data-doc-id="${doc.id}">
            ${bulkSelectMode ? `<input type="checkbox" class="select-checkbox" ${selected ? 'checked' : ''}>` : ''}
            <div class="document-icon">${doc.icon}</div>
            <div class="document-info">
                <div class="document-name">${doc.name}</div>
                <div class="document-meta">
                    <span>${doc.category}</span>
                </div>
            </div>
            <div class="document-size">${doc.size}</div>
            <div class="document-date">${formatDate(doc.date)}</div>
            <div class="document-actions">
                <div class="action-icon" onclick="downloadDocument(${doc.id}); event.stopPropagation();">⬇</div>
                <div class="action-icon" onclick="shareDocument(${doc.id}); event.stopPropagation();">🔗</div>
                <div class="action-icon" onclick="deleteDocument(${doc.id}); event.stopPropagation();">🗑️</div>
            </div>
        </div>
    `;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
}

// Switch view
function switchView(view) {
    currentView = view;
    
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.view-btn[data-view="${view}"]`).classList.add('active');
    
    const documentsView = document.getElementById('documentsView');
    documentsView.className = `documents-view ${view}-view`;
    
    loadDocuments();
}

// Initialize filters
function initializeFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const typeFilter = document.getElementById('typeFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    searchInput.addEventListener('input', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);
    typeFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);
}

// Apply filters
function applyFilters() {
    // In a real app, this would filter the documents
    showNotification('Filters applied', 'info');
}

// Attach document listeners
function attachDocumentListeners() {
    document.querySelectorAll('.document-card, .document-item').forEach(card => {
        card.addEventListener('click', function(e) {
            if (bulkSelectMode) {
                toggleDocumentSelection(parseInt(this.dataset.docId));
            } else {
                const docId = parseInt(this.dataset.docId);
                previewDocument(docId);
            }
        });
        
        const checkbox = card.querySelector('.select-checkbox');
        if (checkbox) {
            checkbox.addEventListener('change', function(e) {
                e.stopPropagation();
                toggleDocumentSelection(parseInt(card.dataset.docId));
            });
        }
    });
}

// Toggle bulk select
function toggleBulkSelect() {
    bulkSelectMode = !bulkSelectMode;
    
    if (bulkSelectMode) {
        document.getElementById('documentsView').classList.add('bulk-select-mode');
    } else {
        document.getElementById('documentsView').classList.remove('bulk-select-mode');
        selectedDocuments = [];
        document.getElementById('bulkActionsBar').classList.remove('active');
    }
    
    loadDocuments();
}

// Toggle document selection
function toggleDocumentSelection(docId) {
    const index = selectedDocuments.indexOf(docId);
    
    if (index > -1) {
        selectedDocuments.splice(index, 1);
    } else {
        selectedDocuments.push(docId);
    }
    
    updateBulkActionsBar();
    loadDocuments();
}

// Update bulk actions bar
function updateBulkActionsBar() {
    const bar = document.getElementById('bulkActionsBar');
    const count = document.getElementById('selectedCount');
    
    count.textContent = selectedDocuments.length;
    
    if (selectedDocuments.length > 0) {
        bar.classList.add('active');
    } else {
        bar.classList.remove('active');
    }
}

// Cancel bulk select
function cancelBulkSelect() {
    bulkSelectMode = false;
    selectedDocuments = [];
    document.getElementById('documentsView').classList.remove('bulk-select-mode');
    document.getElementById('bulkActionsBar').classList.remove('active');
    loadDocuments();
}

// Navigate to folder
function navigateToFolder(folderId) {
    currentFolder = folderId;
    
    if (folderId === 'root') {
        document.getElementById('breadcrumbPath').innerHTML = '';
    } else {
        const folder = demoFolders.find(f => f.id === folderId);
        document.getElementById('breadcrumbPath').innerHTML = ` / ${folder.name}`;
    }
    
    loadDocuments();
}

// Create folder
function createFolder() {
    document.getElementById('folderModal').classList.add('active');
}

// Save folder name
function saveFolderName() {
    const name = document.getElementById('folderName').value.trim();
    
    if (!name) {
        showNotification('Please enter a folder name', 'error');
        return;
    }
    
    showNotification(`Folder "${name}" created successfully!`, 'success');
    closeModal('folderModal');
    document.getElementById('folderName').value = '';
}

// Initialize upload zone
function initializeUploadZone() {
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    
    uploadZone.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            handleFiles(this.files);
        }
    });
    
    // Drag and drop
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('drag-over');
    });
    
    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('drag-over');
    });
    
    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('drag-over');
        
        if (e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    });
}

// Handle files
function handleFiles(files) {
    uploadQueue = Array.from(files);
    displayUploadQueue();
    document.getElementById('documentDetails').style.display = 'block';
    document.getElementById('uploadBtn').disabled = false;
}

// Display upload queue
function displayUploadQueue() {
    const queueContainer = document.getElementById('uploadQueue');
    
    queueContainer.innerHTML = uploadQueue.map((file, index) => `
        <div class="upload-item">
            <div class="upload-item-icon">${getFileIcon(file.name)}</div>
            <div class="upload-item-info">
                <div class="upload-item-name">${file.name}</div>
                <div class="upload-item-size">${formatFileSize(file.size)}</div>
                <div class="upload-progress">
                    <div class="upload-progress-bar" id="progress-${index}"></div>
                </div>
            </div>
            <div class="upload-item-remove" onclick="removeFromQueue(${index})">✕</div>
        </div>
    `).join('');
}

// Get file icon
function getFileIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const icons = {
        pdf: '📄',
        doc: '📝',
        docx: '📝',
        xls: '📊',
        xlsx: '📊',
        ppt: '📊',
        pptx: '📊',
        jpg: '🖼️',
        jpeg: '🖼️',
        png: '🖼️',
        gif: '🖼️'
    };
    return icons[ext] || '📎';
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Remove from queue
function removeFromQueue(index) {
    uploadQueue.splice(index, 1);
    displayUploadQueue();
    
    if (uploadQueue.length === 0) {
        document.getElementById('documentDetails').style.display = 'none';
        document.getElementById('uploadBtn').disabled = true;
    }
}

// Start upload
function startUpload() {
    const uploadBtn = document.getElementById('uploadBtn');
    uploadBtn.disabled = true;
    uploadBtn.innerHTML = '<span class="loading-spinner"></span> Uploading...';
    
    // Simulate upload progress
    uploadQueue.forEach((file, index) => {
        simulateUploadProgress(index);
    });
    
    setTimeout(() => {
        showNotification(`${uploadQueue.length} file(s) uploaded successfully!`, 'success');
        closeUploadModal();
        loadDocuments();
    }, 3000);
}

// Simulate upload progress
function simulateUploadProgress(index) {
    const progressBar = document.getElementById(`progress-${index}`);
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
        }
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }, 200);
}

// Open upload modal
function openUploadModal() {
    document.getElementById('uploadModal').classList.add('active');
}

// Close upload modal
function closeUploadModal() {
    document.getElementById('uploadModal').classList.remove('active');
    uploadQueue = [];
    document.getElementById('uploadQueue').innerHTML = '';
    document.getElementById('documentDetails').style.display = 'none';
    document.getElementById('uploadBtn').disabled = true;
    document.getElementById('uploadBtn').innerHTML = 'Upload Files';
    document.getElementById('fileInput').value = '';
}

// Preview document
function previewDocument(docId) {
    const doc = demoDocuments.find(d => d.id === docId);
    if (!doc) return;
    
    const modal = document.getElementById('previewModal');
    document.getElementById('previewTitle').textContent = doc.name;
    
    const container = document.getElementById('previewContainer');
    container.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 5rem; margin-bottom: 1rem;">${doc.icon}</div>
            <h3 style="color: white; margin-bottom: 1rem;">${doc.name}</h3>
            <p style="color: rgba(255, 255, 255, 0.7);">Preview not available for this file type</p>
            <p style="color: rgba(255, 255, 255, 0.5); font-size: 0.9rem;">Size: ${doc.size} • Category: ${doc.category}</p>
        </div>
    `;
    
    modal.classList.add('active');
}

// Download document
function downloadDocument(docId) {
    const doc = docId ? demoDocuments.find(d => d.id === docId) : null;
    const message = doc ? `Downloading ${doc.name}...` : 'Downloading selected documents...';
    showNotification(message, 'info');
}

// Download selected
function downloadSelected() {
    showNotification(`Downloading ${selectedDocuments.length} document(s)...`, 'info');
}

// Share document
function shareDocument(docId) {
    const doc = docId ? demoDocuments.find(d => d.id === docId) : null;
    const message = doc ? `Share link copied for ${doc.name}` : 'Share links copied for selected documents';
    showNotification(message, 'success');
}

// Share selected
function shareSelected() {
    showNotification(`Share links generated for ${selectedDocuments.length} document(s)`, 'success');
}

// Delete document
function deleteDocument(docId) {
    if (confirm('Are you sure you want to delete this document?')) {
        showNotification('Document deleted successfully', 'success');
        loadDocuments();
    }
}

// Delete selected
function deleteSelected() {
    if (confirm(`Are you sure you want to delete ${selectedDocuments.length} document(s)?`)) {
        showNotification(`${selectedDocuments.length} document(s) deleted successfully`, 'success');
        selectedDocuments = [];
        cancelBulkSelect();
    }
}

// Move selected
function moveSelected() {
    showNotification('Move feature coming soon!', 'info');
}

// Print document
function printDocument() {
    window.print();
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

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

// Export functions
window.switchView = switchView;
window.toggleBulkSelect = toggleBulkSelect;
window.cancelBulkSelect = cancelBulkSelect;
window.navigateToFolder = navigateToFolder;
window.createFolder = createFolder;
window.saveFolderName = saveFolderName;
window.openUploadModal = openUploadModal;
window.closeUploadModal = closeUploadModal;
window.startUpload = startUpload;
window.removeFromQueue = removeFromQueue;
window.downloadDocument = downloadDocument;
window.downloadSelected = downloadSelected;
window.shareDocument = shareDocument;
window.shareSelected = shareSelected;
window.deleteDocument = deleteDocument;
window.deleteSelected = deleteSelected;
window.moveSelected = moveSelected;
window.printDocument = printDocument;
window.closeModal = closeModal;