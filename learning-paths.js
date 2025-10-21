// Learning Paths JavaScript

// Learning path configurations
const learningPaths = {
    cra: {
        name: 'Clinical Research Associate (CRA)',
        modules: [1, 2, 3, 5, 6, 7, 9],
        duration: '3.5 hours',
        xp: 1800,
        focus: ['Site Assessment', 'Patient Recruitment', 'Protocol Feasibility', 'Risk Identification']
    },
    ctm: {
        name: 'Clinical Trial Manager (CTM)',
        modules: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        duration: '4.5 hours',
        xp: 2200,
        focus: ['Project Management', 'Budget Control', 'Timeline Management', 'Team Leadership']
    },
    pm: {
        name: 'Project Manager (PM)',
        modules: [1, 2, 3, 4, 5, 6, 8, 9],
        duration: '4 hours',
        xp: 2000,
        focus: ['Strategic Planning', 'Resource Allocation', 'Stakeholder Management', 'Risk Mitigation']
    },
    pi: {
        name: 'Principal Investigator (PI)',
        modules: [1, 2, 3, 6, 7, 9],
        duration: '3 hours',
        xp: 1600,
        focus: ['Protocol Design', 'Patient Safety', 'Site Capability', 'Regulatory Compliance']
    },
    crc: {
        name: 'Clinical Research Coordinator (CRC)',
        modules: [1, 2, 3, 5, 7, 9],
        duration: '3 hours',
        xp: 1500,
        focus: ['Patient Recruitment', 'Site Readiness', 'Protocol Compliance', 'Data Quality']
    },
    medical: {
        name: 'Medical Affairs',
        modules: [1, 2, 3, 6, 7, 8, 9],
        duration: '3.5 hours',
        xp: 1800,
        focus: ['Clinical Strategy', 'KOL Engagement', 'Medical Monitoring', 'Scientific Communication']
    },
    bd: {
        name: 'Business Development',
        modules: [1, 2, 3, 4, 5, 6, 8],
        duration: '3.5 hours',
        xp: 1800,
        focus: ['Opportunity Assessment', 'Competitive Analysis', 'Proposal Development', 'Client Relations']
    },
    regulatory: {
        name: 'Regulatory Affairs',
        modules: [1, 2, 3, 6, 7, 9],
        duration: '3 hours',
        xp: 1600,
        focus: ['Regulatory Strategy', 'Compliance Assessment', 'Submission Planning', 'Global Regulations']
    },
    data: {
        name: 'Data Management',
        modules: [1, 3, 5, 6, 8, 9],
        duration: '3 hours',
        xp: 1500,
        focus: ['Data Quality', 'System Requirements', 'Database Design', 'Data Standards']
    }
};

// Select a learning path
function selectLearningPath(role) {
    const path = learningPaths[role];
    
    if (!path) {
        console.error('Learning path not found:', role);
        return;
    }
    
    // Save selected path to localStorage
    localStorage.setItem('selectedLearningPath', role);
    localStorage.setItem('learningPathData', JSON.stringify(path));
    
    // Update user profile
    if (typeof appState !== 'undefined') {
        appState.userProfile.role = role;
        appState.userProfile.learningPath = path;
        if (typeof saveUserProgress === 'function') {
            saveUserProgress();
        }
    }
    
    // Show confirmation notification
    showPathNotification(path);
    
    // Scroll to top and start assessment
    setTimeout(() => {
        if (typeof window.startAssessment === 'function') {
            window.startAssessment();
        } else {
            console.error('startAssessment function not found');
        }
    }, 2000);
}

// Show path selection notification
function showPathNotification(path) {
    const notification = document.createElement('div');
    notification.className = 'path-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">✅</div>
            <div class="notification-text">
                <h4>Learning Path Selected!</h4>
                <p>${path.name}</p>
                <p class="notification-details">${path.modules.length} modules • ${path.duration} • ${path.xp} XP</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Create custom path
function createCustomPath() {
    alert('Custom Path Builder coming soon! For now, please select one of the predefined paths that best matches your role.');
    
    // Future implementation:
    // - Show modal with all 9 modules
    // - Allow user to select which modules they want
    // - Calculate total duration and XP
    // - Save custom path
    // - Start training with custom path
}

// Get current learning path
function getCurrentLearningPath() {
    const role = localStorage.getItem('selectedLearningPath');
    if (role && learningPaths[role]) {
        return learningPaths[role];
    }
    return null;
}

// Check if module is in current learning path
function isModuleInPath(moduleNumber) {
    const path = getCurrentLearningPath();
    if (!path) return true; // If no path selected, all modules available
    return path.modules.includes(moduleNumber);
}

// Get next module in learning path
function getNextModuleInPath() {
    const path = getCurrentLearningPath();
    if (!path) return 1; // Default to module 1
    
    // Get completed modules
    const completedModules = appState?.userProfile?.completedModules || [];
    
    // Find first incomplete module in path
    for (const moduleNum of path.modules) {
        if (!completedModules.includes(moduleNum)) {
            return moduleNum;
        }
    }
    
    // All modules complete
    return null;
}

// Display learning path progress
function displayPathProgress() {
    const path = getCurrentLearningPath();
    if (!path) return;
    
    const completedModules = appState?.userProfile?.completedModules || [];
    const pathModules = path.modules;
    const completedInPath = pathModules.filter(m => completedModules.includes(m)).length;
    const progressPercent = (completedInPath / pathModules.length) * 100;
    
    return {
        total: pathModules.length,
        completed: completedInPath,
        remaining: pathModules.length - completedInPath,
        percent: progressPercent.toFixed(0)
    };
}

// Initialize learning paths on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Learning Paths loaded');
    
    // Check if user has a selected path
    const selectedPath = localStorage.getItem('selectedLearningPath');
    if (selectedPath) {
        console.log('User has selected learning path:', selectedPath);
        
        // Highlight selected path card
        const pathCard = document.querySelector(`.path-card[data-role="${selectedPath}"]`);
        if (pathCard) {
            pathCard.classList.add('selected');
        }
    }
});

// Add smooth scroll to learning paths section
function scrollToLearningPaths() {
    const section = document.getElementById('learning-paths');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Export functions for use in other scripts
if (typeof window !== 'undefined') {
    window.selectLearningPath = selectLearningPath;
    window.createCustomPath = createCustomPath;
    window.getCurrentLearningPath = getCurrentLearningPath;
    window.isModuleInPath = isModuleInPath;
    window.getNextModuleInPath = getNextModuleInPath;
    window.displayPathProgress = displayPathProgress;
    window.scrollToLearningPaths = scrollToLearningPaths;
}