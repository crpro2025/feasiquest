// AI-Powered Features for FeasiQuest

// AI Chat functionality
let chatHistory = [];

function toggleAIChat() {
    const widget = document.getElementById('ai-chat-widget');
    widget.classList.toggle('hidden');
    
    if (!widget.classList.contains('hidden')) {
        document.getElementById('chatInput').focus();
    }
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    addChatMessage(message, 'user');
    input.value = '';
    
    setTimeout(() => {
        const response = generateAIResponse(message);
        addChatMessage(response, 'assistant');
    }, 500);
}

function addChatMessage(text, sender) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.innerHTML = text;
    
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    
    chatHistory.push({ sender, text, timestamp: Date.now() });
}

function generateAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('patient') || message.includes('recruitment')) {
        return `<p><strong>Patient Recruitment Insights:</strong></p><ul><li>Each criterion reduces pool by 20-40%</li><li>Plan for 2-5 screened per enrolled</li><li>Use multi-channel recruitment</li></ul><p>💡 <em>Check ClinicalTrials.gov for competing studies!</em></p>`;
    }
    
    if (message.includes('site')) {
        return `<p><strong>Site Selection:</strong></p><ul><li>Balance volume, experience, cost</li><li>Consider hub-and-spoke models</li><li>Evaluate 6 key dimensions</li></ul><p>🎯 <em>Perfect sites don't exist - find the best balance!</em></p>`;
    }
    
    if (message.includes('budget') || message.includes('cost')) {
        return `<p><strong>Budget Tips:</strong></p><ul><li>Site costs = 30-40% of budget</li><li>Budget 15-20% contingency</li><li>6-month delay can cost $500M+</li></ul><p>💰 <em>Negotiate performance-based payments!</em></p>`;
    }
    
    if (message.includes('progress')) {
        const profile = appState.userProfile;
        return `<p><strong>📊 Your Progress:</strong></p><ul><li>✅ Modules: ${profile.completedModules.length}/9</li><li>⭐ XP: ${profile.xp}</li><li>🏆 Level: ${profile.level}</li></ul>`;
    }
    
    return `<p>I can help with:</p><ul><li>📚 Explain concepts</li><li>🌍 Provide examples</li><li>🎯 Give study tips</li><li>📊 Analyze progress</li></ul><p>Try asking about: patient recruitment, sites, budget, or your progress!</p>`;
}

function toggleInsights() {
    const panel = document.getElementById('ai-insights-panel');
    panel.classList.toggle('hidden');
    
    if (!panel.classList.contains('hidden')) {
        generateInsights();
    }
}

function generateInsights() {
    const profile = appState.userProfile;
    const content = document.getElementById('insightsContent');
    
    const completed = profile.completedModules.length;
    
    content.innerHTML = `
        <div class="insight-card">
            <h4>📈 Performance</h4>
            <p>Modules: ${completed}/9 (${Math.round(completed/9*100)}%)</p>
            <p>XP: ${profile.xp}</p>
            <p>Level: ${profile.level}</p>
        </div>
        <div class="insight-card">
            <h4>🎯 Recommendation</h4>
            <p>${completed < 3 ? 'Focus on core modules 1-3' : completed < 9 ? 'Continue with advanced modules' : 'Apply your knowledge!'}</p>
        </div>
    `;
}

console.log('AI Features loaded! 🤖');
