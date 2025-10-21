// ===== ADVANCED FEATURES =====

// ===== QUESTIONNAIRE BUILDER =====
function openQuestionnaireBuilder() {
    const builderHTML = `
        <div style="display: grid; grid-template-columns: 250px 1fr 300px; gap: 20px; height: 70vh;">
            <!-- Question Types Panel -->
            <div style="background: var(--gray-50); padding: 20px; border-radius: 8px; overflow-y: auto;">
                <h4 style="margin-bottom: 20px;">Question Types</h4>
                <div class="question-type-list">
                    <div class="question-type-item" draggable="true" data-type="text">
                        <span class="icon">📝</span>
                        <span>Text Input</span>
                    </div>
                    <div class="question-type-item" draggable="true" data-type="textarea">
                        <span class="icon">📄</span>
                        <span>Long Text</span>
                    </div>
                    <div class="question-type-item" draggable="true" data-type="number">
                        <span class="icon">🔢</span>
                        <span>Number</span>
                    </div>
                    <div class="question-type-item" draggable="true" data-type="select">
                        <span class="icon">📋</span>
                        <span>Dropdown</span>
                    </div>
                    <div class="question-type-item" draggable="true" data-type="multiselect">
                        <span class="icon">☑️</span>
                        <span>Checkboxes</span>
                    </div>
                    <div class="question-type-item" draggable="true" data-type="radio">
                        <span class="icon">🔘</span>
                        <span>Radio Buttons</span>
                    </div>
                    <div class="question-type-item" draggable="true" data-type="date">
                        <span class="icon">📅</span>
                        <span>Date</span>
                    </div>
                    <div class="question-type-item" draggable="true" data-type="file">
                        <span class="icon">📎</span>
                        <span>File Upload</span>
                    </div>
                </div>
            </div>
            
            <!-- Builder Canvas -->
            <div style="background: white; padding: 20px; border-radius: 8px; overflow-y: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h4>Questionnaire Builder</h4>
                    <div>
                        <button class="btn btn-outline btn-sm" onclick="previewQuestionnaire()">👁️ Preview</button>
                        <button class="btn btn-secondary btn-sm" onclick="saveQuestionnaireTemplate()">💾 Save Template</button>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Questionnaire Title</label>
                    <input type="text" class="form-control" id="questionnaireTitle" placeholder="Enter questionnaire title">
                </div>
                
                <div class="form-group">
                    <label>Study Protocol</label>
                    <select class="form-control" id="questionnaireStudy">
                        <option value="">Select a study...</option>
                        ${window.DEMO_DATA.studies.map(s => `<option value="${s.id}">${s.protocol} - ${s.title}</option>`).join('')}
                    </select>
                </div>
                
                <hr style="margin: 30px 0;">
                
                <div id="questionnaireCanvas" style="min-height: 400px; border: 2px dashed var(--gray-300); border-radius: 8px; padding: 20px;">
                    <div style="text-align: center; color: var(--gray-500); padding: 60px 20px;">
                        <p style="font-size: 1.2rem; margin-bottom: 10px;">Drag question types here to build your questionnaire</p>
                        <p>Or click "Add Section" to organize questions into sections</p>
                    </div>
                </div>
                
                <button class="btn btn-outline" style="margin-top: 20px; width: 100%;" onclick="addSection()">
                    + Add Section
                </button>
            </div>
            
            <!-- Properties Panel -->
            <div style="background: var(--gray-50); padding: 20px; border-radius: 8px; overflow-y: auto;">
                <h4 style="margin-bottom: 20px;">Properties</h4>
                <div id="propertiesPanel">
                    <p style="color: var(--gray-500); text-align: center; padding: 40px 20px;">
                        Select a question to edit its properties
                    </p>
                </div>
            </div>
        </div>
        
        <style>
        .question-type-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px;
            background: white;
            border: 2px solid var(--gray-200);
            border-radius: 8px;
            margin-bottom: 10px;
            cursor: move;
            transition: var(--transition);
        }
        .question-type-item:hover {
            border-color: var(--primary);
            box-shadow: var(--shadow);
        }
        .question-type-item .icon {
            font-size: 1.3rem;
        }
        </style>
    `;
    
    showModal('Questionnaire Builder', builderHTML, [
        { text: 'Cancel', class: 'btn-outline', onclick: 'closeModal()' },
        { text: 'Send to Sites', class: 'btn-primary', onclick: 'sendQuestionnaireToSites()' }
    ]);
}

// ===== AI-POWERED SITE MATCHING =====
function showAIRecommendations(studyId) {
    const study = window.DEMO_DATA.studies.find(s => s.id === studyId);
    const sites = window.DEMO_DATA.sites;
    
    // AI Matching Algorithm
    const scoredSites = sites.map(site => {
        let score = 0;
        let reasons = [];
        
        // Therapeutic area match (40 points)
        if (site.therapeuticAreas.includes(study.therapeuticArea)) {
            score += 40;
            reasons.push(`✅ Experience in ${study.therapeuticArea}`);
        }
        
        // Phase experience (20 points)
        if (site.phases.includes(study.phase)) {
            score += 20;
            reasons.push(`✅ ${study.phase} experience`);
        }
        
        // Enrollment capacity (20 points)
        const requiredCapacity = Math.ceil(study.targetEnrollment / study.sitesNeeded);
        if (site.enrollmentCapacity >= requiredCapacity) {
            score += 20;
            reasons.push(`✅ Sufficient capacity (${site.enrollmentCapacity} patients)`);
        }
        
        // Rating (10 points)
        score += site.rating * 2;
        if (site.rating >= 4.5) {
            reasons.push(`✅ High rating (${site.rating}⭐)`);
        }
        
        // Recent inspection (10 points)
        if (site.inspectionResult === 'No findings') {
            score += 10;
            reasons.push(`✅ Clean inspection record`);
        }
        
        return { ...site, matchScore: score, matchReasons: reasons };
    }).sort((a, b) => b.matchScore - a.matchScore);
    
    const recommendationsHTML = `
        <div style="margin-bottom: 20px; padding: 20px; background: var(--gray-50); border-radius: 8px;">
            <h4 style="margin-bottom: 10px;">Study: ${study.title}</h4>
            <p style="color: var(--gray-600);">
                <strong>Protocol:</strong> ${study.protocol} | 
                <strong>Phase:</strong> ${study.phase} | 
                <strong>Sites Needed:</strong> ${study.sitesNeeded}
            </p>
        </div>
        
        <div style="max-height: 60vh; overflow-y: auto;">
            ${scoredSites.slice(0, 10).map((site, index) => `
                <div style="padding: 20px; border: 2px solid ${index === 0 ? 'var(--success)' : 'var(--gray-200)'}; border-radius: 8px; margin-bottom: 15px; ${index === 0 ? 'background: rgba(16, 185, 129, 0.05);' : ''}">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                        <div>
                            <h4 style="margin-bottom: 5px;">
                                ${index === 0 ? '🏆 ' : ''}${site.name}
                                ${index === 0 ? '<span class="badge badge-success" style="margin-left: 10px;">TOP MATCH</span>' : ''}
                            </h4>
                            <p style="color: var(--gray-600); margin: 0;">
                                ${site.location} | ${site.pi}
                            </p>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 2rem; font-weight: 700; color: var(--primary);">${site.matchScore}</div>
                            <div style="font-size: 0.85rem; color: var(--gray-600);">Match Score</div>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        ${site.matchReasons.map(reason => `
                            <div style="padding: 8px 12px; background: white; border-radius: 6px; margin-bottom: 5px; font-size: 0.9rem;">
                                ${reason}
                            </div>
                        `).join('')}
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 15px;">
                        <div>
                            <div style="font-size: 0.85rem; color: var(--gray-600);">Rating</div>
                            <div style="font-weight: 600;">⭐ ${site.rating}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.85rem; color: var(--gray-600);">Active Studies</div>
                            <div style="font-weight: 600;">${site.activeStudies}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.85rem; color: var(--gray-600);">Capacity</div>
                            <div style="font-weight: 600;">${site.enrollmentCapacity}</div>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 10px;">
                        <button class="btn btn-outline btn-sm" onclick="viewSiteProfile('${site.id}')">View Profile</button>
                        <button class="btn btn-primary btn-sm" onclick="sendQuestionnaireToSite('${site.id}', '${studyId}')">Send Questionnaire</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    showModal('🤖 AI-Powered Site Recommendations', recommendationsHTML, [
        { text: 'Close', class: 'btn-outline', onclick: 'closeModal()' }
    ]);
}

// ===== SITE COMPARISON TOOL =====
function compareSelectedSites() {
    const selectedCheckboxes = document.querySelectorAll('.site-checkbox:checked');
    if (selectedCheckboxes.length < 2) {
        showToast('Please select at least 2 sites to compare', 'error');
        return;
    }
    
    const selectedSiteIds = Array.from(selectedCheckboxes).map(cb => cb.dataset.siteId);
    const sites = window.DEMO_DATA.sites.filter(s => selectedSiteIds.includes(s.id));
    
    const comparisonHTML = `
        <div style="overflow-x: auto; max-height: 70vh;">
            <table style="width: 100%; border-collapse: collapse;">
                <thead style="position: sticky; top: 0; background: white; z-index: 10;">
                    <tr>
                        <th style="padding: 15px; text-align: left; border-bottom: 2px solid var(--gray-300); min-width: 200px;">Criteria</th>
                        ${sites.map(site => `
                            <th style="padding: 15px; text-align: center; border-bottom: 2px solid var(--gray-300); min-width: 200px;">
                                <div style="font-weight: 700; margin-bottom: 5px;">${site.name}</div>
                                <div style="font-size: 0.85rem; font-weight: 400; color: var(--gray-600);">${site.location}</div>
                            </th>
                        `).join('')}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 15px; font-weight: 600; border-bottom: 1px solid var(--gray-200);">Principal Investigator</td>
                        ${sites.map(site => `<td style="padding: 15px; text-align: center; border-bottom: 1px solid var(--gray-200);">${site.pi}</td>`).join('')}
                    </tr>
                    <tr>
                        <td style="padding: 15px; font-weight: 600; border-bottom: 1px solid var(--gray-200);">Overall Rating</td>
                        ${sites.map(site => {
                            const maxRating = Math.max(...sites.map(s => s.rating));
                            const isMax = site.rating === maxRating;
                            return `<td style="padding: 15px; text-align: center; border-bottom: 1px solid var(--gray-200); ${isMax ? 'background: rgba(16, 185, 129, 0.1);' : ''}">
                                ⭐ ${site.rating} ${isMax ? '🏆' : ''}
                            </td>`;
                        }).join('')}
                    </tr>
                    <tr>
                        <td style="padding: 15px; font-weight: 600; border-bottom: 1px solid var(--gray-200);">Active Studies</td>
                        ${sites.map(site => `<td style="padding: 15px; text-align: center; border-bottom: 1px solid var(--gray-200);">${site.activeStudies}</td>`).join('')}
                    </tr>
                    <tr>
                        <td style="padding: 15px; font-weight: 600; border-bottom: 1px solid var(--gray-200);">Completed Studies</td>
                        ${sites.map(site => {
                            const maxCompleted = Math.max(...sites.map(s => s.completedStudies));
                            const isMax = site.completedStudies === maxCompleted;
                            return `<td style="padding: 15px; text-align: center; border-bottom: 1px solid var(--gray-200); ${isMax ? 'background: rgba(16, 185, 129, 0.1);' : ''}">
                                ${site.completedStudies} ${isMax ? '🏆' : ''}
                            </td>`;
                        }).join('')}
                    </tr>
                    <tr>
                        <td style="padding: 15px; font-weight: 600; border-bottom: 1px solid var(--gray-200);">Enrollment Capacity</td>
                        ${sites.map(site => {
                            const maxCapacity = Math.max(...sites.map(s => s.enrollmentCapacity));
                            const isMax = site.enrollmentCapacity === maxCapacity;
                            return `<td style="padding: 15px; text-align: center; border-bottom: 1px solid var(--gray-200); ${isMax ? 'background: rgba(16, 185, 129, 0.1);' : ''}">
                                ${site.enrollmentCapacity} ${isMax ? '🏆' : ''}
                            </td>`;
                        }).join('')}
                    </tr>
                    <tr>
                        <td style="padding: 15px; font-weight: 600; border-bottom: 1px solid var(--gray-200);">Response Rate</td>
                        ${sites.map(site => {
                            const maxRate = Math.max(...sites.map(s => s.responseRate));
                            const isMax = site.responseRate === maxRate;
                            return `<td style="padding: 15px; text-align: center; border-bottom: 1px solid var(--gray-200); ${isMax ? 'background: rgba(16, 185, 129, 0.1);' : ''}">
                                ${site.responseRate}% ${isMax ? '🏆' : ''}
                            </td>`;
                        }).join('')}
                    </tr>
                    <tr>
                        <td style="padding: 15px; font-weight: 600; border-bottom: 1px solid var(--gray-200);">Retention Rate</td>
                        ${sites.map(site => {
                            const maxRate = Math.max(...sites.map(s => s.retentionRate));
                            const isMax = site.retentionRate === maxRate;
                            return `<td style="padding: 15px; text-align: center; border-bottom: 1px solid var(--gray-200); ${isMax ? 'background: rgba(16, 185, 129, 0.1);' : ''}">
                                ${site.retentionRate}% ${isMax ? '🏆' : ''}
                            </td>`;
                        }).join('')}
                    </tr>
                    <tr>
                        <td style="padding: 15px; font-weight: 600; border-bottom: 1px solid var(--gray-200);">Therapeutic Areas</td>
                        ${sites.map(site => `<td style="padding: 15px; text-align: center; border-bottom: 1px solid var(--gray-200);">
                            ${site.therapeuticAreas.map(area => `<span class="badge badge-info" style="margin: 2px;">${area}</span>`).join('')}
                        </td>`).join('')}
                    </tr>
                    <tr>
                        <td style="padding: 15px; font-weight: 600; border-bottom: 1px solid var(--gray-200);">Study Phases</td>
                        ${sites.map(site => `<td style="padding: 15px; text-align: center; border-bottom: 1px solid var(--gray-200);">
                            ${site.phases.join(', ')}
                        </td>`).join('')}
                    </tr>
                    <tr>
                        <td style="padding: 15px; font-weight: 600; border-bottom: 1px solid var(--gray-200);">Certifications</td>
                        ${sites.map(site => `<td style="padding: 15px; text-align: center; border-bottom: 1px solid var(--gray-200);">
                            ${site.certifications.join(', ')}
                        </td>`).join('')}
                    </tr>
                    <tr>
                        <td style="padding: 15px; font-weight: 600; border-bottom: 1px solid var(--gray-200);">Last Inspection</td>
                        ${sites.map(site => `<td style="padding: 15px; text-align: center; border-bottom: 1px solid var(--gray-200);">
                            ${formatDate(site.lastInspection)}<br>
                            <span class="badge badge-${site.inspectionResult === 'No findings' ? 'success' : 'warning'}">${site.inspectionResult}</span>
                        </td>`).join('')}
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: var(--gray-50); border-radius: 8px;">
            <p style="margin: 0; color: var(--gray-600); font-size: 0.9rem;">
                🏆 = Best in category | Green highlight = Top performer
            </p>
        </div>
    `;
    
    showModal('Site Comparison', comparisonHTML, [
        { text: 'Export Comparison', class: 'btn-secondary', onclick: 'exportComparison()' },
        { text: 'Close', class: 'btn-outline', onclick: 'closeModal()' }
    ]);
}

// ===== STUDY TIMELINE VISUALIZATION =====
function viewStudyTimeline(studyId) {
    const study = window.DEMO_DATA.studies.find(s => s.id === studyId);
    
    const timelineHTML = `
        <div style="margin-bottom: 20px; padding: 20px; background: var(--gray-50); border-radius: 8px;">
            <h4 style="margin-bottom: 10px;">${study.title}</h4>
            <p style="color: var(--gray-600); margin: 0;">
                <strong>Protocol:</strong> ${study.protocol} | 
                <strong>Phase:</strong> ${study.phase} | 
                <strong>Status:</strong> <span class="badge badge-${study.status === 'Recruiting' ? 'success' : 'warning'}">${study.status}</span>
            </p>
        </div>
        
        <div style="position: relative; padding: 40px 20px;">
            <!-- Timeline Line -->
            <div style="position: absolute; left: 50%; top: 0; bottom: 0; width: 4px; background: var(--gray-300); transform: translateX(-50%);"></div>
            
            <!-- Timeline Events -->
            <div class="timeline-event" style="margin-bottom: 40px;">
                <div style="display: grid; grid-template-columns: 1fr 80px 1fr; gap: 20px; align-items: center;">
                    <div style="text-align: right;">
                        <h4 style="margin-bottom: 5px;">Study Start</h4>
                        <p style="color: var(--gray-600); margin: 0;">${formatDate(study.startDate)}</p>
                    </div>
                    <div style="width: 80px; height: 80px; background: var(--success); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; position: relative; z-index: 10; box-shadow: var(--shadow-lg);">
                        ✅
                    </div>
                    <div>
                        <p style="margin: 0; color: var(--gray-600);">Protocol finalized and approved</p>
                    </div>
                </div>
            </div>
            
            <div class="timeline-event" style="margin-bottom: 40px;">
                <div style="display: grid; grid-template-columns: 1fr 80px 1fr; gap: 20px; align-items: center;">
                    <div style="text-align: right;">
                        <p style="margin: 0; color: var(--gray-600);">Sites activated and ready</p>
                    </div>
                    <div style="width: 80px; height: 80px; background: var(--success); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; position: relative; z-index: 10; box-shadow: var(--shadow-lg);">
                        🏥
                    </div>
                    <div>
                        <h4 style="margin-bottom: 5px;">Site Activation</h4>
                        <p style="color: var(--gray-600); margin: 0;">${study.sitesActive} of ${study.sitesNeeded} sites active</p>
                    </div>
                </div>
            </div>
            
            <div class="timeline-event" style="margin-bottom: 40px;">
                <div style="display: grid; grid-template-columns: 1fr 80px 1fr; gap: 20px; align-items: center;">
                    <div style="text-align: right;">
                        <h4 style="margin-bottom: 5px;">Current Status</h4>
                        <p style="color: var(--gray-600); margin: 0;">Today</p>
                    </div>
                    <div style="width: 80px; height: 80px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; position: relative; z-index: 10; box-shadow: var(--shadow-lg); animation: pulse 2s infinite;">
                        👥
                    </div>
                    <div>
                        <p style="margin: 0; color: var(--gray-600);">${study.currentEnrollment} of ${study.targetEnrollment} patients enrolled (${Math.round(study.currentEnrollment / study.targetEnrollment * 100)}%)</p>
                    </div>
                </div>
            </div>
            
            <div class="timeline-event" style="margin-bottom: 40px;">
                <div style="display: grid; grid-template-columns: 1fr 80px 1fr; gap: 20px; align-items: center;">
                    <div style="text-align: right;">
                        <p style="margin: 0; color: var(--gray-600);">All patients complete treatment</p>
                    </div>
                    <div style="width: 80px; height: 80px; background: var(--gray-300); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; position: relative; z-index: 10; box-shadow: var(--shadow-lg);">
                        🎯
                    </div>
                    <div>
                        <h4 style="margin-bottom: 5px;">Last Patient Last Visit</h4>
                        <p style="color: var(--gray-600); margin: 0;">Estimated: ${calculateLPLV(study.estimatedCompletion)}</p>
                    </div>
                </div>
            </div>
            
            <div class="timeline-event">
                <div style="display: grid; grid-template-columns: 1fr 80px 1fr; gap: 20px; align-items: center;">
                    <div style="text-align: right;">
                        <h4 style="margin-bottom: 5px;">Study Completion</h4>
                        <p style="color: var(--gray-600); margin: 0;">${formatDate(study.estimatedCompletion)}</p>
                    </div>
                    <div style="width: 80px; height: 80px; background: var(--gray-300); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; position: relative; z-index: 10; box-shadow: var(--shadow-lg);">
                        🏁
                    </div>
                    <div>
                        <p style="margin: 0; color: var(--gray-600);">Database lock and final analysis</p>
                    </div>
                </div>
            </div>
        </div>
        
        <style>
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        </style>
    `;
    
    showModal('Study Timeline', timelineHTML, [
        { text: 'Export Timeline', class: 'btn-secondary', onclick: 'exportTimeline()' },
        { text: 'Close', class: 'btn-outline', onclick: 'closeModal()' }
    ]);
}

function calculateLPLV(completionDate) {
    const date = new Date(completionDate);
    date.setMonth(date.getMonth() - 2);
    return formatDate(date.toISOString().split('T')[0]);
}

// ===== ANALYTICS DASHBOARD =====
function showAnalyticsDashboard() {
    const analyticsHTML = `
        <div style="max-height: 70vh; overflow-y: auto;">
            <!-- Key Metrics -->
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px;">
                <div style="padding: 20px; background: linear-gradient(135deg, var(--primary), var(--primary-dark)); border-radius: 12px; color: white;">
                    <div style="font-size: 2.5rem; font-weight: 700; margin-bottom: 5px;">1,247</div>
                    <div style="opacity: 0.9;">Total Enrolled</div>
                    <div style="margin-top: 10px; font-size: 0.9rem;">↑ 12% vs target</div>
                </div>
                <div style="padding: 20px; background: linear-gradient(135deg, var(--secondary), var(--secondary-dark)); border-radius: 12px; color: white;">
                    <div style="font-size: 2.5rem; font-weight: 700; margin-bottom: 5px;">43</div>
                    <div style="opacity: 0.9;">Active Sites</div>
                    <div style="margin-top: 10px; font-size: 0.9rem;">↑ 8 new sites</div>
                </div>
                <div style="padding: 20px; background: linear-gradient(135deg, var(--accent), var(--accent-dark)); border-radius: 12px; color: white;">
                    <div style="font-size: 2.5rem; font-weight: 700; margin-bottom: 5px;">89%</div>
                    <div style="opacity: 0.9;">Avg Response Rate</div>
                    <div style="margin-top: 10px; font-size: 0.9rem;">↑ 3% this month</div>
                </div>
                <div style="padding: 20px; background: linear-gradient(135deg, var(--success), #059669); border-radius: 12px; color: white;">
                    <div style="font-size: 2.5rem; font-weight: 700; margin-bottom: 5px;">92%</div>
                    <div style="opacity: 0.9;">Retention Rate</div>
                    <div style="margin-top: 10px; font-size: 0.9rem;">↑ 2% improvement</div>
                </div>
            </div>
            
            <!-- Enrollment Trend Chart -->
            <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px; box-shadow: var(--shadow);">
                <h4 style="margin-bottom: 20px;">📈 Enrollment Trend (Last 6 Months)</h4>
                <div style="height: 300px; display: flex; align-items: flex-end; gap: 15px; padding: 20px; background: var(--gray-50); border-radius: 8px;">
                    ${[145, 178, 203, 234, 267, 287].map((value, index) => {
                        const height = (value / 300) * 100;
                        const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
                        return `
                            <div style="flex: 1; display: flex; flex-direction: column; align-items: center;">
                                <div style="font-weight: 600; margin-bottom: 10px;">${value}</div>
                                <div style="width: 100%; height: ${height}%; background: linear-gradient(to top, var(--primary), var(--primary-light)); border-radius: 8px 8px 0 0; transition: all 0.3s;"></div>
                                <div style="margin-top: 10px; font-size: 0.9rem; color: var(--gray-600);">${months[index]}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            
            <!-- Site Performance -->
            <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px; box-shadow: var(--shadow);">
                <h4 style="margin-bottom: 20px;">🏥 Top Performing Sites</h4>
                <table style="width: 100%;">
                    <thead>
                        <tr>
                            <th style="text-align: left; padding: 10px;">Rank</th>
                            <th style="text-align: left; padding: 10px;">Site Name</th>
                            <th style="text-align: center; padding: 10px;">Enrolled</th>
                            <th style="text-align: center; padding: 10px;">Response Rate</th>
                            <th style="text-align: center; padding: 10px;">Retention</th>
                            <th style="text-align: center; padding: 10px;">Performance</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${window.DEMO_DATA.sites.slice(0, 5).map((site, index) => `
                            <tr>
                                <td style="padding: 10px;">
                                    ${index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                                </td>
                                <td style="padding: 10px;"><strong>${site.name}</strong></td>
                                <td style="text-align: center; padding: 10px;">${Math.floor(Math.random() * 50) + 20}</td>
                                <td style="text-align: center; padding: 10px;">${site.responseRate}%</td>
                                <td style="text-align: center; padding: 10px;">${site.retentionRate}%</td>
                                <td style="text-align: center; padding: 10px;">
                                    <span class="badge badge-success">Excellent</span>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <!-- Geographic Distribution -->
            <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: var(--shadow);">
                <h4 style="margin-bottom: 20px;">🌍 Geographic Distribution</h4>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                    <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span>Northeast</span>
                            <span><strong>35%</strong></span>
                        </div>
                        <div style="background: var(--gray-200); height: 12px; border-radius: 6px; overflow: hidden;">
                            <div style="background: var(--primary); height: 100%; width: 35%;"></div>
                        </div>
                    </div>
                    <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span>West Coast</span>
                            <span><strong>28%</strong></span>
                        </div>
                        <div style="background: var(--gray-200); height: 12px; border-radius: 6px; overflow: hidden;">
                            <div style="background: var(--secondary); height: 100%; width: 28%;"></div>
                        </div>
                    </div>
                    <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span>Midwest</span>
                            <span><strong>22%</strong></span>
                        </div>
                        <div style="background: var(--gray-200); height: 12px; border-radius: 6px; overflow: hidden;">
                            <div style="background: var(--accent); height: 100%; width: 22%;"></div>
                        </div>
                    </div>
                    <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span>Southeast</span>
                            <span><strong>15%</strong></span>
                        </div>
                        <div style="background: var(--gray-200); height: 12px; border-radius: 6px; overflow: hidden;">
                            <div style="background: var(--success); height: 100%; width: 15%;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    showModal('📊 Analytics Dashboard', analyticsHTML, [
        { text: 'Export Report', class: 'btn-secondary', onclick: 'exportAnalytics()' },
        { text: 'Close', class: 'btn-outline', onclick: 'closeModal()' }
    ]);
}

// ===== EXPORT FUNCTIONS =====
function exportComparison() {
    showToast('Comparison exported to Excel!', 'success');
    closeModal();
}

function exportTimeline() {
    showToast('Timeline exported to PDF!', 'success');
    closeModal();
}

function exportAnalytics() {
    showToast('Analytics report exported!', 'success');
    closeModal();
}

function sendQuestionnaireToSites() {
    showToast('Questionnaire sent to selected sites!', 'success');
    closeModal();
}

function sendQuestionnaireToSite(siteId, studyId) {
    showToast('Questionnaire sent successfully!', 'success');
}

// Make functions globally available
window.openQuestionnaireBuilder = openQuestionnaireBuilder;
window.showAIRecommendations = showAIRecommendations;
window.compareSelectedSites = compareSelectedSites;
window.viewStudyTimeline = viewStudyTimeline;
window.showAnalyticsDashboard = showAnalyticsDashboard;
window.exportComparison = exportComparison;
window.exportTimeline = exportTimeline;
window.exportAnalytics = exportAnalytics;
window.sendQuestionnaireToSites = sendQuestionnaireToSites;
window.sendQuestionnaireToSite = sendQuestionnaireToSite;