// Messages Viewer JavaScript

// Demo Data
let conversations = [
    {
        id: 1,
        name: "Johns Hopkins Medical Center",
        avatar: "JH",
        lastMessage: "Thank you for the protocol. We'll review and get back to you by Friday.",
        time: "10:30 AM",
        unread: true,
        starred: true,
        study: "CARDIO-2024-001",
        email: "sjohnson@jhmi.edu"
    },
    {
        id: 2,
        name: "Mayo Clinic",
        avatar: "MC",
        lastMessage: "Our team is interested in participating. Can we schedule a call?",
        time: "Yesterday",
        unread: true,
        starred: false,
        study: "CARDIO-2024-001",
        email: "mchen@mayo.edu"
    },
    {
        id: 3,
        name: "Cleveland Clinic",
        avatar: "CC",
        lastMessage: "We've completed the questionnaire. Please review at your convenience.",
        time: "Yesterday",
        unread: true,
        starred: false,
        study: "CARDIO-2024-001",
        email: "erodriguez@ccf.org"
    },
    {
        id: 4,
        name: "Massachusetts General Hospital",
        avatar: "MG",
        lastMessage: "Sounds good! Looking forward to the site visit next week.",
        time: "2 days ago",
        unread: false,
        starred: true,
        study: "CARDIO-2024-001",
        email: "dkim@mgh.harvard.edu"
    },
    {
        id: 5,
        name: "Stanford Medical Center",
        avatar: "SM",
        lastMessage: "We have some questions about the inclusion criteria.",
        time: "3 days ago",
        unread: false,
        starred: false,
        study: "CARDIO-2024-001",
        email: "lwang@stanford.edu"
    },
    {
        id: 6,
        name: "Charité Berlin",
        avatar: "CB",
        lastMessage: "The budget looks reasonable. We're ready to proceed.",
        time: "4 days ago",
        unread: false,
        starred: false,
        study: "ONCO-2024-002",
        email: "hmueller@charite.de"
    },
    {
        id: 7,
        name: "University of Tokyo Hospital",
        avatar: "UT",
        lastMessage: "We need additional time to review the protocol with our IRB.",
        time: "5 days ago",
        unread: false,
        starred: false,
        study: "NEURO-2024-003",
        email: "ytanaka@u-tokyo.ac.jp"
    },
    {
        id: 8,
        name: "Royal Melbourne Hospital",
        avatar: "RM",
        lastMessage: "Thank you for considering us for this study.",
        time: "1 week ago",
        unread: false,
        starred: false,
        study: "CARDIO-2024-001",
        email: "jwilson@mh.org.au"
    }
];

let messages = [
    {
        id: 1,
        sender: "Johns Hopkins Medical Center",
        avatar: "JH",
        content: "Thank you for the protocol. We'll review and get back to you by Friday.",
        time: "10:30 AM",
        date: "Today",
        sent: false,
        attachments: []
    },
    {
        id: 2,
        sender: "You",
        avatar: "JS",
        content: "Great! Please let me know if you have any questions. I've also attached the budget breakdown for your review.",
        time: "10:15 AM",
        date: "Today",
        sent: true,
        attachments: [
            { name: "Budget_Breakdown.xlsx", size: "1.2 MB", type: "spreadsheet" }
        ]
    },
    {
        id: 3,
        sender: "Johns Hopkins Medical Center",
        avatar: "JH",
        content: "Perfect timing! We were just discussing the budget with our finance team.",
        time: "10:00 AM",
        date: "Today",
        sent: false,
        attachments: []
    },
    {
        id: 4,
        sender: "You",
        avatar: "JS",
        content: "Good morning! I wanted to follow up on the protocol we sent last week. Have you had a chance to review it?",
        time: "9:45 AM",
        date: "Today",
        sent: true,
        attachments: []
    },
    {
        id: 5,
        sender: "Johns Hopkins Medical Center",
        avatar: "JH",
        content: "We're very interested in this study. Our PI, Dr. Sarah Johnson, would like to discuss the details with you.",
        time: "4:30 PM",
        date: "Yesterday",
        sent: false,
        attachments: []
    },
    {
        id: 6,
        sender: "You",
        avatar: "JS",
        content: "Thank you for your interest! I've attached the full protocol and study timeline. Please review and let me know if you have any questions.",
        time: "2:15 PM",
        date: "Yesterday",
        sent: true,
        attachments: [
            { name: "Protocol_v2.pdf", size: "2.5 MB", type: "pdf" },
            { name: "Study_Timeline.pdf", size: "856 KB", type: "pdf" }
        ]
    }
];

let currentConversation = 1;
let currentFilter = 'all';
let attachedFiles = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderConversations();
    loadConversation(1);
});

// Render Conversations List
function renderConversations() {
    const container = document.getElementById('conversationsList');
    container.innerHTML = '';
    
    let filteredConversations = conversations;
    
    // Apply filter
    if (currentFilter === 'unread') {
        filteredConversations = conversations.filter(c => c.unread);
    } else if (currentFilter === 'starred') {
        filteredConversations = conversations.filter(c => c.starred);
    }
    
    filteredConversations.forEach(conversation => {
        const item = document.createElement('div');
        item.className = `conversation-item ${conversation.unread ? 'unread' : ''} ${conversation.id === currentConversation ? 'active' : ''}`;
        item.onclick = () => loadConversation(conversation.id);
        
        item.innerHTML = `
            ${conversation.unread ? '<div class="unread-indicator"></div>' : ''}
            <div class="conversation-avatar">${conversation.avatar}</div>
            <div class="conversation-content">
                <div class="conversation-header">
                    <div class="conversation-name">${conversation.name}</div>
                    <div class="conversation-time">${conversation.time}</div>
                </div>
                <div class="conversation-preview">${conversation.lastMessage}</div>
                <div class="conversation-meta">
                    <span class="conversation-badge">${conversation.study}</span>
                    ${conversation.starred ? '<span class="star-indicator">★</span>' : ''}
                </div>
            </div>
        `;
        
        container.appendChild(item);
    });
    
    // Update counts
    updateFilterCounts();
}

// Update Filter Counts
function updateFilterCounts() {
    const allCount = conversations.length;
    const unreadCount = conversations.filter(c => c.unread).length;
    const starredCount = conversations.filter(c => c.starred).length;
    
    document.querySelector('[data-filter="all"] .count').textContent = allCount;
    document.querySelector('[data-filter="unread"] .count').textContent = unreadCount;
    document.querySelector('[data-filter="starred"] .count').textContent = starredCount;
}

// Filter Conversations
function filterConversations(filter) {
    currentFilter = filter;
    
    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    
    renderConversations();
}

// Search Conversations
function searchConversations() {
    const searchTerm = document.getElementById('conversationSearch').value.toLowerCase();
    const items = document.querySelectorAll('.conversation-item');
    
    items.forEach(item => {
        const name = item.querySelector('.conversation-name').textContent.toLowerCase();
        const preview = item.querySelector('.conversation-preview').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || preview.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Load Conversation
function loadConversation(id) {
    currentConversation = id;
    const conversation = conversations.find(c => c.id === id);
    
    if (!conversation) return;
    
    // Mark as read
    conversation.unread = false;
    
    // Update header
    document.getElementById('threadTitle').textContent = conversation.name;
    document.getElementById('threadSubtitle').textContent = `${conversation.email} • ${conversation.study}`;
    document.querySelector('.thread-avatar').textContent = conversation.avatar;
    
    // Update star icon
    document.getElementById('starIcon').textContent = conversation.starred ? '★' : '☆';
    
    // Render messages
    renderMessages();
    
    // Update conversations list
    renderConversations();
    
    // Scroll to bottom
    scrollToBottom();
}

// Render Messages
function renderMessages() {
    const container = document.getElementById('messagesArea');
    container.innerHTML = '';
    
    let currentDate = '';
    
    messages.forEach(message => {
        // Add date divider if date changed
        if (message.date !== currentDate) {
            currentDate = message.date;
            const divider = document.createElement('div');
            divider.className = 'message-date-divider';
            divider.innerHTML = `<span>${message.date}</span>`;
            container.appendChild(divider);
        }
        
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `message ${message.sent ? 'sent' : 'received'}`;
        
        let attachmentsHTML = '';
        if (message.attachments && message.attachments.length > 0) {
            attachmentsHTML = message.attachments.map(att => `
                <div class="message-attachment">
                    <span class="attachment-icon">${getFileIcon(att.type)}</span>
                    <div class="attachment-info">
                        <div class="attachment-name">${att.name}</div>
                        <div class="attachment-meta">${att.size}</div>
                    </div>
                    <button class="attachment-download" onclick="downloadAttachment('${att.name}')">
                        Download
                    </button>
                </div>
            `).join('');
        }
        
        messageEl.innerHTML = `
            <div class="message-avatar">${message.avatar}</div>
            <div class="message-content">
                <div class="message-header">
                    <span class="message-sender">${message.sender}</span>
                    <span class="message-time">${message.time}</span>
                </div>
                <div class="message-bubble">
                    ${message.content}
                    ${attachmentsHTML}
                </div>
            </div>
        `;
        
        container.appendChild(messageEl);
    });
}

// Send Message
function sendMessage() {
    const input = document.getElementById('messageInput');
    const content = input.value.trim();
    
    if (!content && attachedFiles.length === 0) {
        showNotification('Please enter a message or attach a file', 'error');
        return;
    }
    
    // Create new message
    const newMessage = {
        id: messages.length + 1,
        sender: "You",
        avatar: "JS",
        content: content || "(File attached)",
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        date: "Today",
        sent: true,
        attachments: attachedFiles.map(f => ({
            name: f.name,
            size: formatFileSize(f.size),
            type: getFileType(f.type)
        }))
    };
    
    messages.push(newMessage);
    
    // Update conversation
    const conversation = conversations.find(c => c.id === currentConversation);
    if (conversation) {
        conversation.lastMessage = content || "(File attached)";
        conversation.time = "Just now";
    }
    
    // Clear input
    input.value = '';
    attachedFiles = [];
    document.getElementById('attachmentPreview').innerHTML = '';
    
    // Re-render
    renderMessages();
    renderConversations();
    scrollToBottom();
    
    showNotification('Message sent successfully', 'success');
}

// Handle Key Press
function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

// Attach File
function attachFile() {
    document.getElementById('attachmentModal').style.display = 'flex';
}

// Handle File Select
function handleFileSelect(input) {
    const files = Array.from(input.files);
    const container = document.getElementById('selectedFiles');
    
    files.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span class="file-icon">${getFileIcon(getFileType(file.type))}</span>
            <div class="file-info">
                <div class="file-name">${file.name}</div>
                <div class="file-meta">${formatFileSize(file.size)}</div>
            </div>
        `;
        container.appendChild(fileItem);
    });
}

// Confirm Attachment
function confirmAttachment() {
    const input = document.getElementById('fileInput');
    const files = Array.from(input.files);
    
    if (files.length === 0) {
        showNotification('Please select at least one file', 'error');
        return;
    }
    
    attachedFiles = files;
    
    // Show preview
    const preview = document.getElementById('attachmentPreview');
    preview.innerHTML = '';
    
    files.forEach(file => {
        const item = document.createElement('div');
        item.className = 'attachment-preview-item';
        item.innerHTML = `
            <span>${getFileIcon(getFileType(file.type))}</span>
            <span>${file.name}</span>
            <span class="attachment-preview-remove" onclick="removeAttachment('${file.name}')">✕</span>
        `;
        preview.appendChild(item);
    });
    
    closeAttachmentModal();
    showNotification(`${files.length} file(s) attached`, 'success');
}

// Remove Attachment
function removeAttachment(fileName) {
    attachedFiles = attachedFiles.filter(f => f.name !== fileName);
    
    const preview = document.getElementById('attachmentPreview');
    const items = preview.querySelectorAll('.attachment-preview-item');
    items.forEach(item => {
        if (item.textContent.includes(fileName)) {
            item.remove();
        }
    });
}

// Close Attachment Modal
function closeAttachmentModal() {
    document.getElementById('attachmentModal').style.display = 'none';
    document.getElementById('fileInput').value = '';
    document.getElementById('selectedFiles').innerHTML = '';
}

// Insert Emoji
function insertEmoji() {
    const emojis = ['😊', '👍', '❤️', '🎉', '✅', '📋', '📞', '📧', '⏰', '🔔'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const input = document.getElementById('messageInput');
    input.value += emoji;
    input.focus();
}

// Use Template
function useTemplate() {
    showNotification('Template selector coming soon', 'info');
}

// Toggle Star
function toggleStar() {
    const conversation = conversations.find(c => c.id === currentConversation);
    if (conversation) {
        conversation.starred = !conversation.starred;
        document.getElementById('starIcon').textContent = conversation.starred ? '★' : '☆';
        renderConversations();
        showNotification(conversation.starred ? 'Conversation starred' : 'Star removed', 'success');
    }
}

// Archive Conversation
function archiveConversation() {
    if (confirm('Archive this conversation?')) {
        showNotification('Conversation archived', 'success');
    }
}

// Delete Conversation
function deleteConversation() {
    if (confirm('Delete this conversation? This action cannot be undone.')) {
        conversations = conversations.filter(c => c.id !== currentConversation);
        renderConversations();
        if (conversations.length > 0) {
            loadConversation(conversations[0].id);
        }
        showNotification('Conversation deleted', 'success');
    }
}

// Toggle Thread Info
function toggleThreadInfo() {
    const panel = document.getElementById('infoPanel');
    panel.classList.toggle('active');
}

// Compose New Message
function composeNewMessage() {
    document.getElementById('composeModal').style.display = 'flex';
}

// Close Compose Modal
function closeComposeModal() {
    document.getElementById('composeModal').style.display = 'none';
}

// Apply Template
function applyTemplate() {
    const template = document.getElementById('templateSelect').value;
    const textarea = document.getElementById('composeMessageInput');
    
    const templates = {
        intro: "Dear [Site Name],\n\nWe are reaching out to introduce our upcoming clinical trial and explore the possibility of your site's participation.\n\nBest regards,",
        questionnaire: "Dear [Site Name],\n\nThank you for your interest in our study. Please complete the attached feasibility questionnaire at your earliest convenience.\n\nBest regards,",
        followup: "Dear [Site Name],\n\nI wanted to follow up on our previous conversation regarding the study. Do you have any questions or need additional information?\n\nBest regards,",
        approval: "Dear [Site Name],\n\nCongratulations! Your site has been selected to participate in our study. We look forward to working with you.\n\nBest regards,",
        rejection: "Dear [Site Name],\n\nThank you for your interest in our study. Unfortunately, we have decided to move forward with other sites at this time.\n\nBest regards,"
    };
    
    if (template && templates[template]) {
        textarea.value = templates[template];
    }
}

// Send New Message
function sendNewMessage() {
    const recipient = document.getElementById('recipientSelect').value;
    const subject = document.getElementById('subjectInput').value;
    const message = document.getElementById('composeMessageInput').value;
    
    if (!recipient || !message) {
        showNotification('Please select a recipient and enter a message', 'error');
        return;
    }
    
    showNotification('Message sent successfully', 'success');
    closeComposeModal();
}

// Helper Functions
function getFileIcon(type) {
    const icons = {
        pdf: '📄',
        spreadsheet: '📊',
        document: '📝',
        image: '🖼️',
        video: '🎥',
        default: '📎'
    };
    return icons[type] || icons.default;
}

function getFileType(mimeType) {
    if (mimeType.includes('pdf')) return 'pdf';
    if (mimeType.includes('sheet') || mimeType.includes('excel')) return 'spreadsheet';
    if (mimeType.includes('document') || mimeType.includes('word')) return 'document';
    if (mimeType.includes('image')) return 'image';
    if (mimeType.includes('video')) return 'video';
    return 'default';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function scrollToBottom() {
    const container = document.getElementById('messagesArea');
    setTimeout(() => {
        container.scrollTop = container.scrollHeight;
    }, 100);
}

function downloadAttachment(fileName) {
    showNotification(`Downloading ${fileName}...`, 'info');
}

function viewProfile() {
    window.location.href = 'site-profile-viewer.html';
}

function scheduleCall() {
    showNotification('Calendar integration coming soon', 'info');
}

function viewStudy() {
    showNotification('Opening study details...', 'info');
}

function downloadFile(type) {
    showNotification(`Downloading file...`, 'info');
}

function viewAllFiles() {
    showNotification('Opening file manager...', 'info');
}

function sendQuestionnaire() {
    showNotification('Questionnaire sent', 'success');
}

function scheduleVisit() {
    showNotification('Opening calendar...', 'info');
}

function requestDocuments() {
    showNotification('Document request sent', 'success');
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
    const composeModal = document.getElementById('composeModal');
    const attachmentModal = document.getElementById('attachmentModal');
    
    if (event.target === composeModal) {
        closeComposeModal();
    }
    if (event.target === attachmentModal) {
        closeAttachmentModal();
    }
}