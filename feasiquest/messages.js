// Messages System - Complete Functionality

// Demo Data
const conversations = [
    {
        id: 1,
        name: 'Metro Research Institute',
        avatar: 'MR',
        subject: 'Phase III Oncology Trial - Advanced NSCLC',
        lastMessage: 'Thank you for the questionnaire. We have completed all sections and attached our site capabilities document.',
        time: '10:30 AM',
        unread: true,
        starred: false,
        archived: false,
        messages: [
            {
                id: 1,
                sender: 'sponsor',
                text: 'Hello! We are conducting a Phase III trial for Advanced NSCLC. Would you be interested in participating?',
                time: '9:15 AM',
                date: 'Today'
            },
            {
                id: 2,
                sender: 'site',
                text: 'Yes, we are very interested! We have extensive experience with oncology trials.',
                time: '9:45 AM',
                date: 'Today'
            },
            {
                id: 3,
                sender: 'sponsor',
                text: 'Great! I have sent you a feasibility questionnaire. Please complete it at your earliest convenience.',
                time: '10:00 AM',
                date: 'Today',
                attachment: {
                    name: 'Feasibility_Questionnaire_NSCLC.pdf',
                    size: '2.4 MB',
                    icon: '📄'
                }
            },
            {
                id: 4,
                sender: 'site',
                text: 'Thank you for the questionnaire. We have completed all sections and attached our site capabilities document.',
                time: '10:30 AM',
                date: 'Today',
                attachment: {
                    name: 'Site_Capabilities_Metro_Research.pdf',
                    size: '3.1 MB',
                    icon: '📄'
                }
            }
        ],
        contact: {
            name: 'Dr. Sarah Johnson',
            role: 'Principal Investigator',
            email: 'sjohnson@metroresearch.com',
            phone: '+1 (555) 123-4567',
            location: 'New York, NY'
        }
    },
    {
        id: 2,
        name: 'Coastal Clinical Trials',
        avatar: 'CC',
        subject: 'Phase II Diabetes Study - Type 2 DM',
        lastMessage: 'We can enroll 25 patients per month. Our site has been operational for 15 years.',
        time: 'Yesterday',
        unread: true,
        starred: true,
        archived: false,
        messages: [
            {
                id: 1,
                sender: 'sponsor',
                text: 'We are looking for sites with strong diabetes patient populations. Can you share your enrollment capabilities?',
                time: '2:30 PM',
                date: 'Yesterday'
            },
            {
                id: 2,
                sender: 'site',
                text: 'We can enroll 25 patients per month. Our site has been operational for 15 years.',
                time: '3:15 PM',
                date: 'Yesterday'
            }
        ],
        contact: {
            name: 'Dr. Michael Chen',
            role: 'Site Director',
            email: 'mchen@coastalclinical.com',
            phone: '+1 (555) 234-5678',
            location: 'San Diego, CA'
        }
    },
    {
        id: 3,
        name: 'Midwest Medical Center',
        avatar: 'MM',
        subject: 'Phase I Rare Disease Trial - Gaucher Disease',
        lastMessage: 'Our IRB approval timeline is typically 4-6 weeks. We can start recruitment immediately after.',
        time: '2 days ago',
        unread: false,
        starred: false,
        archived: false,
        messages: [
            {
                id: 1,
                sender: 'sponsor',
                text: 'What is your typical IRB approval timeline?',
                time: '11:00 AM',
                date: '2 days ago'
            },
            {
                id: 2,
                sender: 'site',
                text: 'Our IRB approval timeline is typically 4-6 weeks. We can start recruitment immediately after.',
                time: '2:00 PM',
                date: '2 days ago'
            }
        ],
        contact: {
            name: 'Dr. Emily Rodriguez',
            role: 'Clinical Research Coordinator',
            email: 'erodriguez@midwestmed.com',
            phone: '+1 (555) 345-6789',
            location: 'Chicago, IL'
        }
    },
    {
        id: 4,
        name: 'Pacific Research Group',
        avatar: 'PR',
        subject: 'Phase III Cardiovascular Trial - Heart Failure',
        lastMessage: 'We have 500+ heart failure patients in our database. Very interested in this study.',
        time: '3 days ago',
        unread: true,
        starred: false,
        archived: false,
        messages: [
            {
                id: 1,
                sender: 'site',
                text: 'We have 500+ heart failure patients in our database. Very interested in this study.',
                time: '4:30 PM',
                date: '3 days ago'
            }
        ],
        contact: {
            name: 'Dr. James Wilson',
            role: 'Principal Investigator',
            email: 'jwilson@pacificresearch.com',
            phone: '+1 (555) 456-7890',
            location: 'Seattle, WA'
        }
    },
    {
        id: 5,
        name: 'Southern Clinical Research',
        avatar: 'SC',
        subject: 'Phase II Neurology Trial - Alzheimer\'s Disease',
        lastMessage: 'Can you provide more details about the inclusion/exclusion criteria?',
        time: '1 week ago',
        unread: false,
        starred: true,
        archived: false,
        messages: [
            {
                id: 1,
                sender: 'site',
                text: 'Can you provide more details about the inclusion/exclusion criteria?',
                time: '10:00 AM',
                date: '1 week ago'
            }
        ],
        contact: {
            name: 'Dr. Lisa Anderson',
            role: 'Site Coordinator',
            email: 'landerson@southernclinical.com',
            phone: '+1 (555) 567-8901',
            location: 'Atlanta, GA'
        }
    }
];

// State
let currentConversation = null;
let currentFilter = 'all';
let searchQuery = '';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadConversations();
    updateUnreadCount();
});

// Load conversations
function loadConversations() {
    const conversationsList = document.getElementById('conversationsList');
    const filteredConversations = getFilteredConversations();
    
    if (filteredConversations.length === 0) {
        conversationsList.innerHTML = `
            <div style="padding: 2rem; text-align: center; color: #64748b;">
                <p>No conversations found</p>
            </div>
        `;
        return;
    }
    
    conversationsList.innerHTML = filteredConversations.map(conv => `
        <div class="conversation-item ${conv.unread ? 'unread' : ''} ${currentConversation?.id === conv.id ? 'active' : ''}" 
             onclick="selectConversation(${conv.id})">
            <div class="conversation-avatar">${conv.avatar}</div>
            <div class="conversation-content">
                <div class="conversation-header">
                    <span class="conversation-name">${conv.name}</span>
                    <span class="conversation-time">${conv.time}</span>
                </div>
                <div class="conversation-subject">${conv.subject}</div>
                <div class="conversation-preview">${conv.lastMessage}</div>
            </div>
            ${conv.unread ? '<span class="unread-badge">New</span>' : ''}
        </div>
    `).join('');
}

// Get filtered conversations
function getFilteredConversations() {
    let filtered = conversations;
    
    // Apply filter
    if (currentFilter === 'unread') {
        filtered = filtered.filter(c => c.unread);
    } else if (currentFilter === 'starred') {
        filtered = filtered.filter(c => c.starred);
    } else if (currentFilter === 'archived') {
        filtered = filtered.filter(c => c.archived);
    }
    
    // Apply search
    if (searchQuery) {
        filtered = filtered.filter(c => 
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    
    return filtered;
}

// Select conversation
function selectConversation(id) {
    currentConversation = conversations.find(c => c.id === id);
    
    if (!currentConversation) return;
    
    // Mark as read
    currentConversation.unread = false;
    
    // Hide empty state, show thread
    document.getElementById('emptyState').style.display = 'none';
    document.getElementById('messageThread').style.display = 'flex';
    
    // Update thread header
    document.getElementById('threadTitle').textContent = currentConversation.name;
    document.getElementById('threadSubtitle').textContent = currentConversation.subject;
    document.querySelector('.thread-avatar').textContent = currentConversation.avatar;
    
    // Update star button
    const starBtn = document.getElementById('starBtn');
    starBtn.textContent = currentConversation.starred ? '★' : '☆';
    
    // Load messages
    loadMessages();
    
    // Load contact info
    loadContactInfo();
    
    // Reload conversations to update UI
    loadConversations();
    updateUnreadCount();
}

// Load messages
function loadMessages() {
    const messagesArea = document.getElementById('messagesArea');
    
    const messagesByDate = {};
    currentConversation.messages.forEach(msg => {
        if (!messagesByDate[msg.date]) {
            messagesByDate[msg.date] = [];
        }
        messagesByDate[msg.date].push(msg);
    });
    
    messagesArea.innerHTML = Object.keys(messagesByDate).map(date => `
        <div class="message-group">
            <div class="message-date">${date}</div>
            ${messagesByDate[date].map(msg => `
                <div class="message ${msg.sender === 'sponsor' ? 'sent' : 'received'}">
                    <div class="message-avatar">${msg.sender === 'sponsor' ? 'SP' : currentConversation.avatar}</div>
                    <div class="message-content">
                        <div class="message-bubble">
                            <p class="message-text">${msg.text}</p>
                            ${msg.attachment ? `
                                <div class="message-attachment" onclick="downloadAttachment('${msg.attachment.name}')">
                                    <span class="attachment-icon">${msg.attachment.icon}</span>
                                    <div class="attachment-info">
                                        <div class="attachment-name">${msg.attachment.name}</div>
                                        <div class="attachment-size">${msg.attachment.size}</div>
                                    </div>
                                    <span>📥</span>
                                </div>
                            ` : ''}
                        </div>
                        <div class="message-meta">
                            <span>${msg.time}</span>
                            ${msg.sender === 'sponsor' ? '<span>✓✓</span>' : ''}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `).join('');
    
    // Scroll to bottom
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

// Load contact info
function loadContactInfo() {
    const contact = currentConversation.contact;
    
    // Show info content, hide empty state
    const infoEmptyState = document.getElementById('infoEmptyState');
    const infoContent = document.getElementById('infoContent');
    
    if (infoEmptyState) infoEmptyState.style.display = 'none';
    if (infoContent) infoContent.style.display = 'block';
    
    // Update contact info
    const contactAvatar = document.querySelector('.info-panel .contact-avatar');
    if (contactAvatar) contactAvatar.textContent = currentConversation.avatar;
    
    const contactName = document.getElementById('contactName');
    if (contactName) contactName.textContent = contact.name;
    
    const contactLocation = document.getElementById('contactLocation');
    if (contactLocation) contactLocation.textContent = `📍 ${contact.location}`;
    
    const contactEmail = document.getElementById('contactEmail');
    if (contactEmail) contactEmail.textContent = `📧 ${contact.email}`;
    
    const contactPhone = document.getElementById('contactPhone');
    if (contactPhone) contactPhone.textContent = `📞 ${contact.phone}`;
}

// Send message
function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    
    if (!text || !currentConversation) return;
    
    // Add message to conversation
    const newMessage = {
        id: currentConversation.messages.length + 1,
        sender: 'sponsor',
        text: text,
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        date: 'Today'
    };
    
    currentConversation.messages.push(newMessage);
    currentConversation.lastMessage = text;
    currentConversation.time = 'Just now';
    
    // Clear input
    input.value = '';
    
    // Reload messages
    loadMessages();
    loadConversations();
    
    // Show notification
    showNotification('Message sent successfully', 'success');
}

// Handle Enter key
document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
});

// Filter conversations
function filterConversations(filter) {
    currentFilter = filter;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    loadConversations();
}

// Search conversations
function searchConversations() {
    searchQuery = document.getElementById('conversationSearch').value;
    loadConversations();
}

// Toggle star
function toggleStar() {
    if (!currentConversation) return;
    
    currentConversation.starred = !currentConversation.starred;
    
    const starBtn = document.getElementById('starBtn');
    starBtn.textContent = currentConversation.starred ? '★' : '☆';
    
    loadConversations();
    showNotification(currentConversation.starred ? 'Added to starred' : 'Removed from starred', 'info');
}

// Archive conversation
function archiveConversation() {
    if (!currentConversation) return;
    
    currentConversation.archived = true;
    
    showNotification('Conversation archived', 'success');
    
    // Clear current conversation
    currentConversation = null;
    document.getElementById('emptyState').style.display = 'flex';
    document.getElementById('messageThread').style.display = 'none';
    
    loadConversations();
}

// Delete conversation
function deleteConversation() {
    if (!currentConversation) return;
    
    if (confirm('Are you sure you want to delete this conversation?')) {
        const index = conversations.findIndex(c => c.id === currentConversation.id);
        conversations.splice(index, 1);
        
        showNotification('Conversation deleted', 'success');
        
        // Clear current conversation
        currentConversation = null;
        document.getElementById('emptyState').style.display = 'flex';
        document.getElementById('messageThread').style.display = 'none';
        
        loadConversations();
        updateUnreadCount();
    }
}

// Compose message
function composeMessage() {
    document.getElementById('composeModal').classList.add('active');
}

// Close modal
function closeModal() {
    document.getElementById('composeModal').classList.remove('active');
}

// Use template
function useTemplate(templateName) {
    const templates = {
        'initial-contact': 'Hello! We are conducting a clinical trial and would like to discuss potential collaboration with your site. Are you interested in learning more?',
        'follow-up': 'Thank you for your interest in our study. I wanted to follow up on the feasibility questionnaire we sent last week. Have you had a chance to review it?',
        'questionnaire': 'We have prepared a feasibility questionnaire for your review. Please complete it at your earliest convenience so we can assess site suitability.',
        'site-visit': 'We would like to schedule a site visit to discuss the study in detail and tour your facilities. What dates work best for your team?'
    };
    
    document.getElementById('composeMessage').value = templates[templateName];
}

// Send new message
function sendNewMessage() {
    const recipient = document.getElementById('composeRecipient').value;
    const subject = document.getElementById('composeSubject').value;
    const message = document.getElementById('composeMessage').value;
    
    if (!recipient || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    showNotification('Message sent successfully', 'success');
    closeModal();
    
    // Reset form
    document.getElementById('composeRecipient').value = '';
    document.getElementById('composeSubject').value = '';
    document.getElementById('composeMessage').value = '';
}

// Attach file
function attachFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            showNotification(`File "${file.name}" attached`, 'success');
        }
    };
    input.click();
}

// Insert template
function insertTemplate() {
    showNotification('Template selector opened', 'info');
}

// Download attachment
function downloadAttachment(filename) {
    showNotification(`Downloading ${filename}...`, 'info');
}

// Update unread count
function updateUnreadCount() {
    const unreadCount = conversations.filter(c => c.unread).length;
    const badge = document.getElementById('notificationBadge');
    
    if (badge) {
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'block' : 'none';
    }
    
    // Update filter count
    const unreadFilterBtn = document.querySelector('[data-filter="unread"] .count');
    if (unreadFilterBtn) {
        unreadFilterBtn.textContent = unreadCount;
    }
}

// Quick actions
function viewProfile() {
    if (!currentConversation) return;
    showNotification('Opening site profile...', 'info');
    window.open('site-profile.html', '_blank');
}

function viewQuestionnaire() {
    if (!currentConversation) return;
    showNotification('Opening questionnaire response...', 'info');
    window.open('questionnaire-enhanced.html', '_blank');
}

function scheduleCall() {
    if (!currentConversation) return;
    showNotification('Opening calendar to schedule call...', 'info');
}

function sendQuestionnaire() {
    if (!currentConversation) return;
    showNotification('Sending questionnaire...', 'success');
}

function requestDocuments() {
    if (!currentConversation) return;
    showNotification('Document request sent', 'success');
}

function addToShortlist() {
    if (!currentConversation) return;
    showNotification(`${currentConversation.name} added to shortlist`, 'success');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">✕</button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}