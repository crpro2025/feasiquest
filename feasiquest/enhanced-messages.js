// ===================================
// ENHANCED MESSAGES JAVASCRIPT
// ===================================

let currentConversation = 1;
let attachedFiles = [];

document.addEventListener('DOMContentLoaded', function() {
    initMessages();
});

function initMessages() {
    // Setup message input
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
}

function openConversation(id) {
    currentConversation = id;
    
    // Update active state
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    // Mark as read
    event.currentTarget.classList.remove('unread');
    const unreadBadge = event.currentTarget.querySelector('.unread-badge');
    if (unreadBadge) {
        unreadBadge.remove();
    }
    
    // Load conversation messages (would fetch from server in real app)
    loadConversationMessages(id);
}

function loadConversationMessages(id) {
    // In real app, this would fetch messages from server
    // For now, messages are already in HTML
    
    // Scroll to bottom
    const thread = document.getElementById('messagesThread');
    if (thread) {
        thread.scrollTop = thread.scrollHeight;
    }
}

function toggleStar(id, event) {
    event.stopPropagation();
    const btn = event.currentTarget;
    const item = btn.closest('.conversation-item');
    
    if (btn.classList.contains('starred')) {
        btn.classList.remove('starred');
        btn.textContent = '☆';
        item.classList.remove('starred');
    } else {
        btn.classList.add('starred');
        btn.textContent = '★';
        item.classList.add('starred');
    }
}

function searchMessages() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const conversations = document.querySelectorAll('.conversation-item');
    
    conversations.forEach(conv => {
        const name = conv.querySelector('.conversation-name').textContent.toLowerCase();
        const preview = conv.querySelector('.preview-text').textContent.toLowerCase();
        
        if (name.includes(query) || preview.includes(query)) {
            conv.style.display = 'flex';
        } else {
            conv.style.display = 'none';
        }
    });
}

function filterMessages(filter) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    const conversations = document.querySelectorAll('.conversation-item');
    
    conversations.forEach(conv => {
        switch(filter) {
            case 'all':
                conv.style.display = 'flex';
                break;
            case 'unread':
                conv.style.display = conv.classList.contains('unread') ? 'flex' : 'none';
                break;
            case 'starred':
                conv.style.display = conv.classList.contains('starred') ? 'flex' : 'none';
                break;
            case 'archived':
                conv.style.display = 'none'; // Would show archived conversations
                break;
        }
    });
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (!message && attachedFiles.length === 0) {
        return;
    }
    
    // Create message bubble
    const thread = document.getElementById('messagesThread');
    const messageBubble = document.createElement('div');
    messageBubble.className = 'message-bubble sent';
    
    let attachmentsHTML = '';
    if (attachedFiles.length > 0) {
        attachmentsHTML = '<div class="message-attachments">';
        attachedFiles.forEach(file => {
            attachmentsHTML += `
                <div class="attachment-item">
                    <span class="attachment-icon">${getFileIcon(file.type)}</span>
                    <div class="attachment-info">
                        <div class="attachment-name">${file.name}</div>
                        <div class="attachment-size">${formatFileSize(file.size)}</div>
                    </div>
                    <button class="attachment-download">⬇️</button>
                </div>
            `;
        });
        attachmentsHTML += '</div>';
    }
    
    messageBubble.innerHTML = `
        <div class="message-content">
            <div class="message-text">
                <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
            ${attachmentsHTML}
            <div class="message-time">${getCurrentTime()}</div>
            <div class="message-status">✓ Sent</div>
        </div>
    `;
    
    thread.appendChild(messageBubble);
    
    // Clear input
    input.value = '';
    attachedFiles = [];
    document.getElementById('attachedFiles').innerHTML = '';
    
    // Scroll to bottom
    thread.scrollTop = thread.scrollHeight;
    
    // Show typing indicator (simulate response)
    setTimeout(() => {
        showTypingIndicator();
    }, 1000);
}

function showTypingIndicator() {
    const indicator = document.querySelector('.typing-indicator');
    if (indicator) {
        indicator.style.display = 'flex';
        
        // Hide after 2 seconds (simulate response)
        setTimeout(() => {
            indicator.style.display = 'none';
        }, 2000);
    }
}

function attachFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
    
    input.onchange = function(e) {
        const files = Array.from(e.target.files);
        
        files.forEach(file => {
            if (file.size > 10 * 1024 * 1024) {
                showNotification('File must be less than 10MB', 'error');
                return;
            }
            
            attachedFiles.push(file);
            displayAttachedFile(file);
        });
    };
    
    input.click();
}

function displayAttachedFile(file) {
    const container = document.getElementById('attachedFiles');
    
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.innerHTML = `
        <div class="file-icon">${getFileIcon(file.type)}</div>
        <div class="file-info">
            <div class="file-name">${file.name}</div>
            <div class="file-size">${formatFileSize(file.size)}</div>
        </div>
        <button class="file-remove" onclick="removeAttachedFile('${file.name}')">×</button>
    `;
    
    container.appendChild(fileItem);
}

function removeAttachedFile(fileName) {
    attachedFiles = attachedFiles.filter(f => f.name !== fileName);
    
    // Re-render attached files
    const container = document.getElementById('attachedFiles');
    container.innerHTML = '';
    attachedFiles.forEach(file => displayAttachedFile(file));
}

function getFileIcon(type) {
    if (type.includes('pdf')) return '📄';
    if (type.includes('image')) return '🖼️';
    if (type.includes('word')) return '📝';
    return '📎';
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function insertEmoji() {
    // Simple emoji picker (would use a library in production)
    const emojis = ['😊', '👍', '❤️', '🎉', '✅', '📋', '💡', '🔬'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    const input = document.getElementById('messageInput');
    input.value += emoji;
    input.focus();
}

function formatText(format) {
    const input = document.getElementById('messageInput');
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const selectedText = input.value.substring(start, end);
    
    if (!selectedText) return;
    
    let formattedText = selectedText;
    if (format === 'bold') {
        formattedText = `**${selectedText}**`;
    } else if (format === 'italic') {
        formattedText = `*${selectedText}*`;
    }
    
    input.value = input.value.substring(0, start) + formattedText + input.value.substring(end);
    input.focus();
}

function composeMessage() {
    showNotification('Compose new message feature coming soon!', 'info');
}

function archiveConversation() {
    if (confirm('Archive this conversation?')) {
        showNotification('Conversation archived', 'success');
    }
}

function deleteConversation() {
    if (confirm('Delete this conversation? This cannot be undone.')) {
        showNotification('Conversation deleted', 'success');
    }
}

function showConversationInfo() {
    const panel = document.getElementById('infoPanel');
    const container = document.querySelector('.messages-container');
    
    if (panel.style.display === 'none') {
        panel.style.display = 'block';
        container.style.gridTemplateColumns = '350px 1fr 300px';
    } else {
        closeInfoPanel();
    }
}

function closeInfoPanel() {
    const panel = document.getElementById('infoPanel');
    const container = document.querySelector('.messages-container');
    
    panel.style.display = 'none';
    container.style.gridTemplateColumns = '350px 1fr';
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

console.log('✅ Enhanced Messages Loaded');