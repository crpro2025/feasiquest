// Additional modules content - loaded separately to keep main script manageable

// Module 3: Site Selection & Capability Assessment
function loadModule3Content(container) {
    container.innerHTML = `
        <div class="module-header-section">
            <button class="btn btn-secondary" onclick="returnToDashboard()">← Back to Dashboard</button>
            <h1>Module 3: Site Selection & Capability Assessment</h1>
            <p class="module-subtitle">Building your optimal site network</p>
        </div>

        <div class="step-indicator">
            <div class="step active">
                <div class="step-circle">1</div>
                <div class="step-label">Introduction</div>
            </div>
            <div class="step">
                <div class="step-circle">2</div>
                <div class="step-label">Evaluation</div>
            </div>
            <div class="step">
                <div class="step-circle">3</div>
                <div class="step-label">Decision</div>
            </div>
            <div class="step">
                <div class="step-circle">4</div>
                <div class="step-label">Assessment</div>
            </div>
        </div>

        <div id="module3-content">
            ${getModule3IntroContent()}
        </div>
    `;
}

function getModule3IntroContent() {
    return `
        <div class="scenario-container">
            <h2 class="scenario-title">🏥 The Site Selection Paradox</h2>
            <div class="scenario-content">
                <p style="font-size: 1.2rem; margin-bottom: 20px;">
                    <strong>The Truth:</strong> Perfect sites don't exist. Every site has trade-offs.
                </p>
                <p style="font-size: 1.1rem;">
                    High-volume sites may lack research experience. Expert sites may have low patient volume. 
                    Convenient sites may be expensive. Your job is to find the optimal balance.
                </p>
            </div>
        </div>

        <div class="interactive-card">
            <h3>🎯 Site Selection Criteria</h3>
            <p style="margin: 20px 0;">
                What factors matter most when selecting sites? Rank these criteria:
            </p>
            
            <div class="ranking-exercise" id="ranking-exercise">
                <div class="ranking-item" draggable="true" data-criterion="volume">
                    <span class="rank-number">?</span>
                    <div class="criterion-content">
                        <h4>Patient Volume</h4>
                        <p>Number of eligible patients per month</p>
                    </div>
                </div>
                <div class="ranking-item" draggable="true" data-criterion="experience">
                    <span class="rank-number">?</span>
                    <div class="criterion-content">
                        <h4>Research Experience</h4>
                        <p>Track record in clinical trials</p>
                    </div>
                </div>
                <div class="ranking-item" draggable="true" data-criterion="infrastructure">
                    <span class="rank-number">?</span>
                    <div class="criterion-content">
                        <h4>Infrastructure</h4>
                        <p>Equipment, staff, and facilities</p>
                    </div>
                </div>
                <div class="ranking-item" draggable="true" data-criterion="geography">
                    <span class="rank-number">?</span>
                    <div class="criterion-content">
                        <h4>Geographic Location</h4>
                        <p>Strategic placement for patient access</p>
                    </div>
                </div>
                <div class="ranking-item" draggable="true" data-criterion="cost">
                    <span class="rank-number">?</span>
                    <div class="criterion-content">
                        <h4>Cost</h4>
                        <p>Site fees and per-patient costs</p>
                    </div>
                </div>
                <div class="ranking-item" draggable="true" data-criterion="speed">
                    <span class="rank-number">?</span>
                    <div class="criterion-content">
                        <h4>Activation Speed</h4>
                        <p>Time to first patient enrolled</p>
                    </div>
                </div>
            </div>

            <button class="btn btn-primary" onclick="submitRanking()" style="margin-top: 20px;">
                Submit Ranking
            </button>

            <div id="ranking-feedback" style="margin-top: 20px;"></div>
        </div>

        <div class="interactive-card" style="margin-top: 30px;">
            <h3>📊 Site Capability Assessment Framework</h3>
            <p>Evaluate sites across multiple dimensions:</p>
            
            <div class="capability-dimensions">
                <div class="capability-card" onclick="exploreCapability(1)">
                    <div class="capability-icon">👨‍⚕️</div>
                    <h4>Investigator Qualifications</h4>
                    <p>Experience, credentials, availability</p>
                </div>
                <div class="capability-card" onclick="exploreCapability(2)">
                    <div class="capability-icon">👥</div>
                    <h4>Staff Resources</h4>
                    <p>Coordinators, nurses, support staff</p>
                </div>
                <div class="capability-card" onclick="exploreCapability(3)">
                    <div class="capability-icon">🏗️</div>
                    <h4>Infrastructure</h4>
                    <p>Facilities, equipment, technology</p>
                </div>
                <div class="capability-card" onclick="exploreCapability(4)">
                    <div class="capability-icon">📈</div>
                    <h4>Performance History</h4>
                    <p>Past trial metrics and outcomes</p>
                </div>
                <div class="capability-card" onclick="exploreCapability(5)">
                    <div class="capability-icon">📋</div>
                    <h4>Regulatory Compliance</h4>
                    <p>GCP adherence, inspection history</p>
                </div>
                <div class="capability-card" onclick="exploreCapability(6)">
                    <div class="capability-icon">🤝</div>
                    <h4>Commitment Level</h4>
                    <p>Enthusiasm, prioritization, engagement</p>
                </div>
            </div>

            <div id="capability-detail" style="margin-top: 30px;">
                <p style="text-align: center; color: #6b7280; font-style: italic;">
                    Click on any capability to learn more
                </p>
            </div>
        </div>

        <div class="nav-buttons">
            <button class="btn btn-secondary" onclick="returnToDashboard()">Save & Exit</button>
            <button class="btn btn-primary" onclick="continueToModule3Step2()">Continue to Evaluation →</button>
        </div>

        <style>
        .ranking-exercise {
            background: white;
            border: 2px solid var(--border-color);
            border-radius: 15px;
            padding: 20px;
            margin: 20px 0;
        }

        .ranking-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 15px;
            margin: 10px 0;
            background: var(--bg-light);
            border: 2px solid var(--border-color);
            border-radius: 10px;
            cursor: move;
            transition: all 0.3s ease;
        }

        .ranking-item:hover {
            border-color: var(--primary-color);
            transform: translateX(5px);
        }

        .ranking-item.dragging {
            opacity: 0.5;
        }

        .rank-number {
            width: 40px;
            height: 40px;
            background: var(--primary-color);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.2rem;
        }

        .criterion-content h4 {
            margin: 0 0 5px 0;
            color: var(--text-primary);
        }

        .criterion-content p {
            margin: 0;
            color: var(--text-secondary);
            font-size: 0.9rem;
        }

        .capability-dimensions {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }

        .capability-card {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border: 2px solid #fbbf24;
            border-radius: 15px;
            padding: 25px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .capability-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        .capability-icon {
            font-size: 3rem;
            margin-bottom: 15px;
        }

        .capability-card h4 {
            color: #92400e;
            margin-bottom: 10px;
        }

        .capability-card p {
            color: #78350f;
            font-size: 0.9rem;
        }
        </style>
    `;
}

function exploreCapability(capNumber) {
    const capabilities = {
        1: {
            title: "Investigator Qualifications",
            content: `
                <h4>What to Evaluate:</h4>
                <ul>
                    <li><strong>Credentials:</strong> Board certification, subspecialty training</li>
                    <li><strong>Experience:</strong> Years in practice, research experience</li>
                    <li><strong>Publications:</strong> Research contributions, thought leadership</li>
                    <li><strong>Trial History:</strong> Number and types of trials conducted</li>
                    <li><strong>Availability:</strong> Time commitment, competing obligations</li>
                </ul>

                <h4>Red Flags:</h4>
                <ul>
                    <li>No prior clinical trial experience</li>
                    <li>History of protocol deviations</li>
                    <li>Limited availability or overcommitted</li>
                    <li>Poor communication or responsiveness</li>
                    <li>Regulatory warnings or sanctions</li>
                </ul>

                <h4>Best Practices:</h4>
                <ul>
                    <li>Interview investigators personally</li>
                    <li>Check references from other sponsors</li>
                    <li>Review FDA inspection reports (if available)</li>
                    <li>Assess therapeutic area expertise</li>
                    <li>Evaluate teaching and mentoring capabilities</li>
                </ul>
            `
        },
        2: {
            title: "Staff Resources",
            content: `
                <h4>Key Personnel:</h4>
                <ul>
                    <li><strong>Study Coordinators:</strong> Dedicated, experienced, certified</li>
                    <li><strong>Research Nurses:</strong> Clinical skills, patient interaction</li>
                    <li><strong>Sub-Investigators:</strong> Backup coverage, expertise</li>
                    <li><strong>Regulatory Specialist:</strong> IRB submissions, compliance</li>
                    <li><strong>Pharmacy Staff:</strong> IMP management, accountability</li>
                </ul>

                <h4>Staffing Ratios:</h4>
                <ul>
                    <li>1 coordinator per 15-20 active patients (complex trials)</li>
                    <li>1 coordinator per 30-40 patients (simple trials)</li>
                    <li>Backup staff for vacations and turnover</li>
                    <li>Adequate administrative support</li>
                </ul>

                <h4>Assessment Questions:</h4>
                <ul>
                    <li>How many active trials does each coordinator manage?</li>
                    <li>What is staff turnover rate?</li>
                    <li>What training and certifications do staff have?</li>
                    <li>How is coverage handled for absences?</li>
                    <li>What is the escalation process for issues?</li>
                </ul>
            `
        },
        3: {
            title: "Infrastructure Assessment",
            content: `
                <h4>Physical Infrastructure:</h4>
                <ul>
                    <li><strong>Clinic Space:</strong> Adequate exam rooms, privacy</li>
                    <li><strong>Laboratory:</strong> On-site or nearby, CLIA-certified</li>
                    <li><strong>Pharmacy:</strong> Secure storage, temperature monitoring</li>
                    <li><strong>Equipment:</strong> ECG, vital signs, specialized equipment</li>
                    <li><strong>Storage:</strong> Regulatory documents, supplies, samples</li>
                </ul>

                <h4>Technology Infrastructure:</h4>
                <ul>
                    <li><strong>EDC Access:</strong> Reliable internet, computers</li>
                    <li><strong>CTMS:</strong> Trial management systems</li>
                    <li><strong>EMR Integration:</strong> Electronic medical records</li>
                    <li><strong>Communication:</strong> Secure email, video conferencing</li>
                    <li><strong>Backup Systems:</strong> Power, data backup</li>
                </ul>

                <h4>Support Services:</h4>
                <ul>
                    <li>Imaging (X-ray, CT, MRI, echo)</li>
                    <li>Specialized labs (genetics, biomarkers)</li>
                    <li>Emergency services and safety monitoring</li>
                    <li>Patient support (transportation, lodging)</li>
                </ul>
            `
        },
        4: {
            title: "Performance History",
            content: `
                <h4>Key Metrics to Review:</h4>
                <ul>
                    <li><strong>Enrollment Rate:</strong> Patients per month, vs. target</li>
                    <li><strong>Screen Failure Rate:</strong> % of screened patients enrolled</li>
                    <li><strong>Retention Rate:</strong> % completing study</li>
                    <li><strong>Protocol Compliance:</strong> Deviations, violations</li>
                    <li><strong>Data Quality:</strong> Query rates, monitoring findings</li>
                    <li><strong>Timeline Performance:</strong> Activation speed, milestones</li>
                </ul>

                <h4>Benchmarks:</h4>
                <ul>
                    <li>Enrollment: ≥80% of target</li>
                    <li>Screen failure: <40%</li>
                    <li>Retention: ≥80%</li>
                    <li>Major protocol deviations: <5%</li>
                    <li>Query rate: <10% of data points</li>
                </ul>

                <h4>Sources of Information:</h4>
                <ul>
                    <li>Site performance reports from previous trials</li>
                    <li>CRO databases and ratings</li>
                    <li>Sponsor references</li>
                    <li>Site self-reported metrics</li>
                    <li>Regulatory inspection reports</li>
                </ul>
            `
        },
        5: {
            title: "Regulatory Compliance",
            content: `
                <h4>Compliance Requirements:</h4>
                <ul>
                    <li><strong>GCP Training:</strong> Current certification for all staff</li>
                    <li><strong>IRB/EC Approval:</strong> Active, appropriate oversight</li>
                    <li><strong>Licenses:</strong> Medical, pharmacy, laboratory</li>
                    <li><strong>Insurance:</strong> Adequate coverage, current</li>
                    <li><strong>Contracts:</strong> Confidentiality, financial disclosure</li>
                </ul>

                <h4>Inspection History:</h4>
                <ul>
                    <li>FDA inspection findings (Form 483s)</li>
                    <li>Warning letters or regulatory actions</li>
                    <li>Sponsor audit findings</li>
                    <li>Corrective actions and resolutions</li>
                    <li>Time since last inspection</li>
                </ul>

                <h4>Documentation Standards:</h4>
                <ul>
                    <li>Source document quality and completeness</li>
                    <li>Regulatory file organization</li>
                    <li>Informed consent process</li>
                    <li>SAE reporting timeliness</li>
                    <li>Protocol deviation documentation</li>
                </ul>
            `
        },
        6: {
            title: "Commitment and Engagement",
            content: `
                <h4>Signs of Strong Commitment:</h4>
                <ul>
                    <li>Enthusiastic about study objectives</li>
                    <li>Proactive in problem-solving</li>
                    <li>Responsive to communications</li>
                    <li>Willing to invest in success</li>
                    <li>Long-term partnership mindset</li>
                </ul>

                <h4>Warning Signs:</h4>
                <ul>
                    <li>Overcommitted with too many trials</li>
                    <li>Slow response times</li>
                    <li>Lack of enthusiasm or interest</li>
                    <li>Unrealistic promises or expectations</li>
                    <li>Focus solely on financial terms</li>
                </ul>

                <h4>How to Assess:</h4>
                <ul>
                    <li>Site visit and face-to-face meetings</li>
                    <li>Response time to inquiries</li>
                    <li>Quality of feasibility questionnaire responses</li>
                    <li>Willingness to accommodate study needs</li>
                    <li>References from other sponsors</li>
                </ul>

                <h4>Building Commitment:</h4>
                <ul>
                    <li>Clear communication of expectations</li>
                    <li>Fair and competitive compensation</li>
                    <li>Adequate support and resources</li>
                    <li>Recognition and appreciation</li>
                    <li>Partnership approach vs. vendor relationship</li>
                </ul>
            `
        }
    };

    const capability = capabilities[capNumber];
    const detailDiv = document.getElementById('capability-detail');
    
    detailDiv.innerHTML = `
        <div class="pillar-detail-card fade-in">
            <h3 style="color: var(--accent-color); margin-bottom: 15px;">
                ${capability.title}
            </h3>
            <div class="capability-detail-content">
                ${capability.content}
            </div>
        </div>

        <style>
        .capability-detail-content {
            line-height: 1.8;
        }

        .capability-detail-content h4 {
            color: var(--text-primary);
            margin: 20px 0 10px;
            font-size: 1.1rem;
        }

        .capability-detail-content ul {
            margin-left: 20px;
            margin-bottom: 15px;
        }

        .capability-detail-content li {
            margin: 8px 0;
        }

        .capability-detail-content strong {
            color: var(--accent-color);
        }
        </style>
    `;
    
    awardXP(10);
}

function submitRanking() {
    showFeedback(`
        <h3>Ranking Submitted!</h3>
        <p>There's no single "correct" ranking - priorities vary by trial type and phase.</p>
        <p><strong>Key Insight:</strong> The most successful site selection strategies balance multiple factors 
        rather than optimizing for just one criterion.</p>
    `, 'info');
    
    awardXP(25);
}

function continueToModule3Step2() {
    const contentDiv = document.getElementById('module3-content');
    updateStepIndicator(2);
    
    contentDiv.innerHTML = `
        <div class="interactive-card">
            <h2>🎯 Site Evaluation Scenario</h2>
            <p style="margin: 20px 0; font-size: 1.1rem;">
                You need to select sites for a Phase III cardiovascular outcomes trial. 
                You've identified three potential sites. Evaluate each one:
            </p>

            <div class="site-comparison">
                <div class="site-card" onclick="selectSiteForAnalysis('A')">
                    <h3>Site A: Metro Heart Center</h3>
                    <div class="site-stats">
                        <div class="stat-item">
                            <span class="stat-label">Patient Volume:</span>
                            <span class="stat-value high">50+ per month</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Research Experience:</span>
                            <span class="stat-value low">Limited (2 prior trials)</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Infrastructure:</span>
                            <span class="stat-value medium">Basic research capabilities</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Cost:</span>
                            <span class="stat-value high">$8,000 per patient</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Location:</span>
                            <span class="stat-value">Major metropolitan area</span>
                        </div>
                    </div>
                    <button class="btn btn-primary">Analyze Site A</button>
                </div>

                <div class="site-card" onclick="selectSiteForAnalysis('B')">
                    <h3>Site B: Academic Medical Center</h3>
                    <div class="site-stats">
                        <div class="stat-item">
                            <span class="stat-label">Patient Volume:</span>
                            <span class="stat-value low">5-8 per month</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Research Experience:</span>
                            <span class="stat-value high">Extensive (50+ trials)</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Infrastructure:</span>
                            <span class="stat-value high">State-of-the-art facilities</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Cost:</span>
                            <span class="stat-value high">$12,000 per patient</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Location:</span>
                            <span class="stat-value">University hospital</span>
                        </div>
                    </div>
                    <button class="btn btn-primary">Analyze Site B</button>
                </div>

                <div class="site-card" onclick="selectSiteForAnalysis('C')">
                    <h3>Site C: Community Cardiology</h3>
                    <div class="site-stats">
                        <div class="stat-item">
                            <span class="stat-label">Patient Volume:</span>
                            <span class="stat-value medium">15-20 per month</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Research Experience:</span>
                            <span class="stat-value medium">Moderate (10 trials)</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Infrastructure:</span>
                            <span class="stat-value medium">Adequate facilities</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Cost:</span>
                            <span class="stat-value medium">$6,500 per patient</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Location:</span>
                            <span class="stat-value">Suburban area</span>
                        </div>
                    </div>
                    <button class="btn btn-primary">Analyze Site C</button>
                </div>
            </div>

            <div id="site-analysis" style="margin-top: 30px;"></div>
        </div>

        <div class="nav-buttons">
            <button class="btn btn-secondary" onclick="loadModule3Content(document.getElementById('moduleContent'))">← Previous</button>
        </div>

        <style>
        .site-comparison {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
            margin: 30px 0;
        }

        .site-card {
            background: white;
            border: 2px solid var(--border-color);
            border-radius: 15px;
            padding: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .site-card:hover {
            border-color: var(--primary-color);
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg);
        }

        .site-card h3 {
            color: var(--primary-color);
            margin-bottom: 20px;
            text-align: center;
        }

        .site-stats {
            margin: 20px 0;
        }

        .stat-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid var(--border-color);
        }

        .stat-item:last-child {
            border-bottom: none;
        }

        .stat-label {
            color: var(--text-secondary);
            font-weight: 500;
        }

        .stat-value {
            font-weight: 600;
        }

        .stat-value.high {
            color: var(--secondary-color);
        }

        .stat-value.medium {
            color: var(--accent-color);
        }

        .stat-value.low {
            color: var(--danger-color);
        }

        .site-card button {
            width: 100%;
            margin-top: 15px;
        }
        </style>
    `;
}

function selectSiteForAnalysis(site) {
    const analyses = {
        'A': {
            title: "Site A: Metro Heart Center - Analysis",
            strengths: [
                "Excellent patient volume (50+ per month)",
                "Located in high-population area",
                "Enthusiastic and motivated team",
                "Modern clinic facilities"
            ],
            weaknesses: [
                "Limited research experience (only 2 prior trials)",
                "May need significant training and support",
                "Higher cost per patient",
                "Unproven track record in complex trials"
            ],
            recommendation: `
                <strong>Recommendation:</strong> Consider as a site with intensive support and monitoring.
                <br><br>
                <strong>Mitigation Strategies:</strong>
                <ul>
                    <li>Provide comprehensive training program</li>
                    <li>Assign dedicated CRA for frequent monitoring</li>
                    <li>Pair with experienced site for mentoring</li>
                    <li>Start with lower enrollment targets initially</li>
                </ul>
            `,
            score: 72
        },
        'B': {
            title: "Site B: Academic Medical Center - Analysis",
            strengths: [
                "Extensive research experience (50+ trials)",
                "State-of-the-art infrastructure",
                "Excellent data quality and compliance",
                "Strong investigator credentials",
                "Good for complex procedures"
            ],
            weaknesses: [
                "Low patient volume (5-8 per month)",
                "Highest cost per patient ($12,000)",
                "May have competing priorities",
                "Slower enrollment rate"
            ],
            recommendation: `
                <strong>Recommendation:</strong> Excellent choice for quality and expertise, but enrollment will be slow.
                <br><br>
                <strong>Optimization Strategies:</strong>
                <ul>
                    <li>Use as a "hub" site for complex cases</li>
                    <li>Leverage for training other sites</li>
                    <li>Accept lower enrollment targets</li>
                    <li>Utilize for challenging patient populations</li>
                </ul>
            `,
            score: 78
        },
        'C': {
            title: "Site C: Community Cardiology - Analysis",
            strengths: [
                "Good balance of volume and experience",
                "Moderate patient volume (15-20 per month)",
                "Reasonable cost ($6,500 per patient)",
                "Proven track record (10 trials)",
                "Adequate infrastructure",
                "Good patient retention historically"
            ],
            weaknesses: [
                "Not exceptional in any single category",
                "May lack specialized equipment for complex procedures",
                "Moderate research staff size"
            ],
            recommendation: `
                <strong>Recommendation:</strong> Ideal "workhorse" site - reliable and cost-effective.
                <br><br>
                <strong>Why This Works:</strong>
                <ul>
                    <li>Best balance of all factors</li>
                    <li>Predictable performance</li>
                    <li>Cost-effective enrollment</li>
                    <li>Lower risk profile</li>
                </ul>
            `,
            score: 85
        }
    };

    const analysis = analyses[site];
    const analysisDiv = document.getElementById('site-analysis');
    
    analysisDiv.innerHTML = `
        <div class="analysis-result fade-in">
            <h3>${analysis.title}</h3>
            
            <div class="analysis-score">
                <div class="score-circle">
                    <span class="score-number">${analysis.score}</span>
                    <span class="score-label">Overall Score</span>
                </div>
            </div>

            <div class="analysis-section">
                <h4 style="color: var(--secondary-color);">✓ Strengths</h4>
                <ul>
                    ${analysis.strengths.map(s => `<li>${s}</li>`).join('')}
                </ul>
            </div>

            <div class="analysis-section">
                <h4 style="color: var(--danger-color);">✗ Weaknesses</h4>
                <ul>
                    ${analysis.weaknesses.map(w => `<li>${w}</li>`).join('')}
                </ul>
            </div>

            <div class="analysis-recommendation">
                ${analysis.recommendation}
            </div>

            <button class="btn btn-primary" onclick="continueToModule3Step3()">
                Continue to Final Decision →
            </button>
        </div>

        <style>
        .analysis-result {
            background: white;
            border: 2px solid var(--primary-color);
            border-radius: 15px;
            padding: 30px;
        }

        .analysis-score {
            display: flex;
            justify-content: center;
            margin: 30px 0;
        }

        .score-circle {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            box-shadow: var(--shadow-lg);
        }

        .score-number {
            font-size: 3rem;
            font-weight: bold;
        }

        .score-label {
            font-size: 0.9rem;
            opacity: 0.9;
        }

        .analysis-section {
            margin: 25px 0;
            padding: 20px;
            background: var(--bg-light);
            border-radius: 10px;
        }

        .analysis-section h4 {
            margin-bottom: 15px;
        }

        .analysis-section ul {
            margin-left: 20px;
        }

        .analysis-section li {
            margin: 8px 0;
            line-height: 1.6;
        }

        .analysis-recommendation {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border-left: 5px solid var(--primary-color);
            padding: 25px;
            border-radius: 10px;
            margin: 25px 0;
        }

        .analysis-recommendation ul {
            margin: 15px 0 0 20px;
        }

        .analysis-recommendation li {
            margin: 8px 0;
        }
        </style>
    `;
    
    awardXP(50);
}

function continueToModule3Step3() {
    const contentDiv = document.getElementById('module3-content');
    updateStepIndicator(4);
    
    contentDiv.innerHTML = `
        <div class="interactive-card">
            <h2>📝 Module 3 Assessment</h2>
            <p style="margin: 20px 0; font-size: 1.1rem;">
                Test your understanding of site selection and capability assessment.
            </p>

            <div class="quiz-container">
                <div class="quiz-question">
                    <h4>Question 1: What is the most important factor in site selection?</h4>
                    <div class="quiz-options">
                        <div class="quiz-option" onclick="selectAnswer(this, 'q3_1', false)">
                            A) Lowest cost
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q3_1', false)">
                            B) Highest patient volume
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q3_1', true)">
                            C) Balance of multiple factors
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q3_1', false)">
                            D) Research experience only
                        </div>
                    </div>
                    <div class="answer-feedback" id="q3_1-feedback"></div>
                </div>

                <div class="quiz-question">
                    <h4>Question 2: What is a typical coordinator-to-patient ratio for complex trials?</h4>
                    <div class="quiz-options">
                        <div class="quiz-option" onclick="selectAnswer(this, 'q3_2', false)">
                            A) 1:5-10
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q3_2', true)">
                            B) 1:15-20
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q3_2', false)">
                            C) 1:30-40
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q3_2', false)">
                            D) 1:50+
                        </div>
                    </div>
                    <div class="answer-feedback" id="q3_2-feedback"></div>
                </div>

                <div class="quiz-question">
                    <h4>Question 3: Which is a red flag during site evaluation?</h4>
                    <div class="quiz-options">
                        <div class="quiz-option" onclick="selectAnswer(this, 'q3_3', false)">
                            A) Moderate patient volume
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q3_3', true)">
                            B) History of major protocol deviations
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q3_3', false)">
                            C) Suburban location
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q3_3', false)">
                            D) Moderate research experience
                        </div>
                    </div>
                    <div class="answer-feedback" id="q3_3-feedback"></div>
                </div>

                <div class="quiz-question">
                    <h4>Question 4: What is the benefit of a hub-and-spoke site model?</h4>
                    <div class="quiz-options">
                        <div class="quiz-option" onclick="selectAnswer(this, 'q3_4', false)">
                            A) Lowest cost
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q3_4', true)">
                            B) Balance of efficiency and access
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q3_4', false)">
                            C) Fastest enrollment
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q3_4', false)">
                            D) Simplest management
                        </div>
                    </div>
                    <div class="answer-feedback" id="q3_4-feedback"></div>
                </div>

                <div class="quiz-question">
                    <h4>Question 5: When should site capability assessment occur?</h4>
                    <div class="quiz-options">
                        <div class="quiz-option" onclick="selectAnswer(this, 'q3_5', false)">
                            A) After contract signing
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q3_5', true)">
                            B) During site selection process
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q3_5', false)">
                            C) After study starts
                        </div>
                        <div class="quiz-option" onclick="selectAnswer(this, 'q3_5', false)">
                            D) Only if problems arise
                        </div>
                    </div>
                    <div class="answer-feedback" id="q3_5-feedback"></div>
                </div>
            </div>

            <button class="btn btn-success" onclick="submitModule3Assessment()" style="margin-top: 30px; width: 100%;">
                Submit Assessment
            </button>
        </div>

        <div class="nav-buttons">
            <button class="btn btn-secondary" onclick="continueToModule3Step2()">← Previous</button>
            <button class="btn btn-primary" onclick="completeModule3()">Complete Module →</button>
        </div>
    `;
}

function submitModule3Assessment() {
    const totalQuestions = 5;
    const correctAnswers = Object.keys(quizAnswers).filter(k => k.startsWith('q3_') && quizAnswers[k] === true).length;
    const score = (correctAnswers / totalQuestions) * 100;

    if (Object.keys(quizAnswers).filter(k => k.startsWith('q3_')).length < totalQuestions) {
        alert('Please answer all questions before submitting.');
        return;
    }

    let message = '';
    let xpBonus = 0;

    if (score >= 80) {
        message = 'Excellent! You understand site selection and capability assessment.';
        xpBonus = 150;
    } else if (score >= 60) {
        message = 'Good work! Review the key concepts for deeper understanding.';
        xpBonus = 100;
    } else {
        message = 'Consider reviewing the module content before proceeding.';
        xpBonus = 75;
    }

    showFeedback(`
        <h3>Assessment Complete!</h3>
        <p>Your Score: <strong>${score}%</strong> (${correctAnswers}/${totalQuestions} correct)</p>
        <p>${message}</p>
    `, score >= 60 ? 'success' : 'warning');

    awardXP(xpBonus);
}

function completeModule3() {
    const module3Questions = Object.keys(quizAnswers).filter(k => k.startsWith('q3_'));
    if (module3Questions.length < 5) {
        alert('Please complete the assessment before finishing the module.');
        return;
    }

    appState.userProfile.completedModules.push(3);
    awardXP(150);
    unlockBadge('Site Sleuth');
    
    showFeedback(`
        <h2>🎉 Module 3 Complete!</h2>
        <p>Congratulations! You've mastered Site Selection & Capability Assessment.</p>
        <p>You've earned the <strong>"Site Sleuth"</strong> badge!</p>
        <p>Module 4 is now unlocked.</p>
    `, 'success');

    saveUserProgress();

    setTimeout(() => {
        returnToDashboard();
        unlockModule(4);
    }, 3000);
}

// Module 4-9 placeholder functions (to be implemented)
function loadModule4Content(container) {
    container.innerHTML = `
        <div class="module-header-section">
            <button class="btn btn-secondary" onclick="returnToDashboard()">← Back to Dashboard</button>
            <h1>Module 4: Regulatory & Compliance Feasibility</h1>
            <p class="module-subtitle">Navigating the regulatory maze</p>
        </div>
        <div class="interactive-card">
            <h2>Module 4 Content</h2>
            <p>This module covers regulatory pathways, submission strategies, and compliance requirements.</p>
            <p>Content is being finalized and will be available soon.</p>
            <button class="btn btn-success" onclick="completeModule4()">Mark as Complete (Demo)</button>
        </div>
    `;
}

function completeModule4() {
    appState.userProfile.completedModules.push(4);
    awardXP(200);
    unlockBadge('Regulatory Navigator');
    showFeedback('Module 4 Complete! Module 5 unlocked.', 'success');
    saveUserProgress();
    setTimeout(() => { returnToDashboard(); unlockModule(5); }, 2000);
}

function loadModule5Content(container) {
    container.innerHTML = `
        <div class="module-header-section">
            <button class="btn btn-secondary" onclick="returnToDashboard()">← Back to Dashboard</button>
            <h1>Module 5: Budget & Resource Feasibility</h1>
            <p class="module-subtitle">The financial reality of clinical trials</p>
        </div>
        <div class="interactive-card">
            <h2>Module 5 Content</h2>
            <p>This module covers budget development, cost optimization, and ROI analysis.</p>
            <p>Content is being finalized and will be available soon.</p>
            <button class="btn btn-success" onclick="completeModule5()">Mark as Complete (Demo)</button>
        </div>
    `;
}

function completeModule5() {
    appState.userProfile.completedModules.push(5);
    awardXP(200);
    unlockBadge('Budget Master');
    showFeedback('Module 5 Complete! Module 6 unlocked.', 'success');
    saveUserProgress();
    setTimeout(() => { returnToDashboard(); unlockModule(6); }, 2000);
}

function loadModule6Content(container) {
    container.innerHTML = `
        <div class="module-header-section">
            <button class="btn btn-secondary" onclick="returnToDashboard()">← Back to Dashboard</button>
            <h1>Module 6: Technology & Infrastructure Assessment</h1>
            <p class="module-subtitle">Assessing technical feasibility</p>
        </div>
        <div class="interactive-card">
            <h2>Module 6 Content</h2>
            <p>This module covers technology stack evaluation, system integration, and infrastructure planning.</p>
            <p>Content is being finalized and will be available soon.</p>
            <button class="btn btn-success" onclick="completeModule6()">Mark as Complete (Demo)</button>
        </div>
    `;
}

function completeModule6() {
    appState.userProfile.completedModules.push(6);
    awardXP(150);
    unlockBadge('Tech Evaluator');
    showFeedback('Module 6 Complete! Module 7 unlocked.', 'success');
    saveUserProgress();
    setTimeout(() => { returnToDashboard(); unlockModule(7); }, 2000);
}

function loadModule7Content(container) {
    container.innerHTML = `
        <div class="module-header-section">
            <button class="btn btn-secondary" onclick="returnToDashboard()">← Back to Dashboard</button>
            <h1>Module 7: Risk Assessment & Mitigation</h1>
            <p class="module-subtitle">Identifying and managing feasibility risks</p>
        </div>
        <div class="interactive-card">
            <h2>Module 7 Content</h2>
            <p>This module covers risk identification, impact analysis, and mitigation strategies.</p>
            <p>Content is being finalized and will be available soon.</p>
            <button class="btn btn-success" onclick="completeModule7()">Mark as Complete (Demo)</button>
        </div>
    `;
}

function completeModule7() {
    appState.userProfile.completedModules.push(7);
    awardXP(200);
    unlockBadge('Risk Detective');
    showFeedback('Module 7 Complete! Module 8 unlocked.', 'success');
    saveUserProgress();
    setTimeout(() => { returnToDashboard(); unlockModule(8); }, 2000);
}

function loadModule8Content(container) {
    container.innerHTML = `
        <div class="module-header-section">
            <button class="btn btn-secondary" onclick="returnToDashboard()">← Back to Dashboard</button>
            <h1>Module 8: Go/No-Go Decision Framework</h1>
            <p class="module-subtitle">Making the critical decision</p>
        </div>
        <div class="interactive-card">
            <h2>Module 8 Content</h2>
            <p>This module covers comprehensive case analysis, stakeholder management, and decision-making frameworks.</p>
            <p>Content is being finalized and will be available soon.</p>
            <button class="btn btn-success" onclick="completeModule8()">Mark as Complete (Demo)</button>
        </div>
    `;
}

function completeModule8() {
    appState.userProfile.completedModules.push(8);
    awardXP(250);
    unlockBadge('Decision Maker');
    showFeedback('Module 8 Complete! Module 9 unlocked.', 'success');
    saveUserProgress();
    setTimeout(() => { returnToDashboard(); unlockModule(9); }, 2000);
}

function loadModule9Content(container) {
    container.innerHTML = `
        <div class="module-header-section">
            <button class="btn btn-secondary" onclick="returnToDashboard()">← Back to Dashboard</button>
            <h1>Module 9: Implementation & Monitoring</h1>
            <p class="module-subtitle">Executing and tracking feasibility</p>
        </div>
        <div class="interactive-card">
            <h2>Module 9 Content</h2>
            <p>This module covers action planning, KPI tracking, and adaptive management.</p>
            <p>Content is being finalized and will be available soon.</p>
            <button class="btn btn-success" onclick="completeModule9()">Mark as Complete (Demo)</button>
        </div>
    `;
}

function completeModule9() {
    appState.userProfile.completedModules.push(9);
    awardXP(150);
    unlockBadge('Execution Expert');
    showFeedback(`
        <h2>🎉 Congratulations!</h2>
        <p>You've completed ALL 9 modules of FeasiQuest!</p>
        <p>You are now a <strong>Feasibility Master</strong>!</p>
    `, 'success');
    saveUserProgress();
    setTimeout(() => { returnToDashboard(); }, 3000);
}