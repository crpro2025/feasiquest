/**
 * FeasiQuest Practice Scenarios Generator
 * AI-powered practice scenarios with adaptive difficulty
 */

class PracticeScenarios {
    constructor(authSystem) {
        this.auth = authSystem;
        this.scenarios = this.initializeScenarios();
        this.userAttempts = this.loadUserAttempts();
    }

    // Load user attempts
    loadUserAttempts() {
        const attempts = localStorage.getItem('feasiquest_practice_attempts');
        return attempts ? JSON.parse(attempts) : {};
    }

    // Save user attempts
    saveUserAttempts() {
        localStorage.setItem('feasiquest_practice_attempts', JSON.stringify(this.userAttempts));
    }

    // Initialize practice scenarios
    initializeScenarios() {
        return {
            // Module 1: Feasibility Foundations
            module1: [
                {
                    id: 'scenario_1_1',
                    title: 'Oncology Trial Red Flags',
                    difficulty: 'beginner',
                    description: 'Review a Phase III oncology protocol and identify feasibility concerns.',
                    protocol: {
                        indication: 'Advanced Non-Small Cell Lung Cancer',
                        phase: 'Phase III',
                        targetEnrollment: 450,
                        duration: '18 months',
                        sites: 'Global - 75 sites',
                        inclusionCriteria: [
                            'Age ≥18 years',
                            'Histologically confirmed NSCLC',
                            'Stage IIIB or IV disease',
                            'ECOG performance status 0-1',
                            'Adequate organ function',
                            'Life expectancy ≥3 months'
                        ],
                        exclusionCriteria: [
                            'Prior systemic therapy for advanced disease',
                            'Active brain metastases',
                            'Significant cardiovascular disease',
                            'Pregnancy or breastfeeding'
                        ],
                        procedures: [
                            'Tumor biopsies at baseline and progression',
                            'CT scans every 6 weeks',
                            'Blood draws weekly for first 8 weeks',
                            'Quality of life assessments every 3 weeks',
                            'Cardiac monitoring monthly'
                        ]
                    },
                    questions: [
                        {
                            id: 'q1',
                            question: 'What is the primary feasibility concern with the target enrollment?',
                            options: [
                                'The number is too high for the indication',
                                'The timeline is too aggressive for this enrollment',
                                'The site count is insufficient',
                                'No concerns - this is feasible'
                            ],
                            correct: 1,
                            explanation: 'Enrolling 450 patients in 18 months across 75 sites requires 6 patients per site, which is aggressive for advanced NSCLC given the strict criteria and competitive landscape.'
                        },
                        {
                            id: 'q2',
                            question: 'Which procedure poses the biggest recruitment challenge?',
                            options: [
                                'CT scans every 6 weeks',
                                'Weekly blood draws',
                                'Tumor biopsies at baseline and progression',
                                'Quality of life assessments'
                            ],
                            correct: 2,
                            explanation: 'Requiring tumor biopsies at both baseline and progression is highly burdensome for advanced cancer patients and will significantly impact recruitment and retention.'
                        },
                        {
                            id: 'q3',
                            question: 'What is the estimated screen failure rate for this protocol?',
                            options: [
                                '10-20%',
                                '30-40%',
                                '50-60%',
                                '70-80%'
                            ],
                            correct: 2,
                            explanation: 'With strict inclusion/exclusion criteria including ECOG 0-1, adequate organ function, and no prior therapy, expect 50-60% screen failure rate in advanced NSCLC.'
                        }
                    ],
                    xpReward: 150
                },
                {
                    id: 'scenario_1_2',
                    title: 'Rare Disease Feasibility',
                    difficulty: 'intermediate',
                    description: 'Assess feasibility for a rare genetic disorder trial.',
                    protocol: {
                        indication: 'Duchenne Muscular Dystrophy',
                        phase: 'Phase II',
                        targetEnrollment: 60,
                        duration: '24 months',
                        sites: 'US and EU - 15 sites',
                        prevalence: '1 in 3,500 male births',
                        inclusionCriteria: [
                            'Male patients aged 5-12 years',
                            'Confirmed DMD diagnosis',
                            'Ambulatory (can walk ≥75 meters in 6MWT)',
                            'Stable corticosteroid dose for ≥6 months',
                            'No prior gene therapy'
                        ],
                        exclusionCriteria: [
                            'Non-ambulatory patients',
                            'Significant cardiac dysfunction',
                            'Liver disease',
                            'Prior participation in gene therapy trials'
                        ],
                        procedures: [
                            'Muscle biopsies at baseline and month 12',
                            'Monthly clinic visits',
                            'Cardiac MRI every 6 months',
                            'Pulmonary function tests quarterly',
                            'Physical therapy assessments monthly'
                        ]
                    },
                    questions: [
                        {
                            id: 'q1',
                            question: 'What is the primary feasibility challenge for this trial?',
                            options: [
                                'The enrollment target is too high',
                                'The patient population is extremely limited',
                                'The procedures are too burdensome',
                                'The timeline is too short'
                            ],
                            correct: 1,
                            explanation: 'DMD is a rare disease with limited patient population. Finding 60 ambulatory boys aged 5-12 with stable disease across 15 sites is extremely challenging.'
                        },
                        {
                            id: 'q2',
                            question: 'How many patients per site would be realistic?',
                            options: [
                                '1-2 patients per site',
                                '3-4 patients per site',
                                '5-6 patients per site',
                                '7-8 patients per site'
                            ],
                            correct: 0,
                            explanation: 'For rare diseases like DMD, 1-2 patients per site is realistic. Many sites may only have 1-2 eligible patients in their entire catchment area.'
                        },
                        {
                            id: 'q3',
                            question: 'What recruitment strategy would be most effective?',
                            options: [
                                'Traditional physician referrals',
                                'Patient advocacy group partnerships',
                                'Social media advertising',
                                'Hospital database screening'
                            ],
                            correct: 1,
                            explanation: 'For rare diseases, partnering with patient advocacy groups (like Parent Project Muscular Dystrophy) is most effective as they have direct access to the patient community.'
                        }
                    ],
                    xpReward: 200
                },
                {
                    id: 'scenario_1_3',
                    title: 'COVID-19 Vaccine Trial',
                    difficulty: 'advanced',
                    description: 'Evaluate feasibility for a rapid COVID-19 vaccine development program.',
                    protocol: {
                        indication: 'COVID-19 Prevention',
                        phase: 'Phase III',
                        targetEnrollment: 30000,
                        duration: '6 months enrollment, 24 months follow-up',
                        sites: 'Global - 150 sites',
                        inclusionCriteria: [
                            'Age ≥18 years',
                            'No prior COVID-19 infection',
                            'High risk of COVID-19 exposure',
                            'No immunocompromising conditions',
                            'Willing to use contraception'
                        ],
                        exclusionCriteria: [
                            'Prior COVID-19 vaccination',
                            'Immunosuppressive therapy',
                            'Pregnancy or breastfeeding',
                            'Severe allergies to vaccine components'
                        ],
                        procedures: [
                            'Two vaccine doses 28 days apart',
                            'Weekly symptom diaries',
                            'COVID-19 testing if symptomatic',
                            'Antibody testing at multiple timepoints',
                            'Safety follow-up for 24 months'
                        ]
                    },
                    questions: [
                        {
                            id: 'q1',
                            question: 'What is the biggest operational challenge?',
                            options: [
                                'Finding enough participants',
                                'Ultra-cold storage requirements',
                                'Rapid site activation',
                                'Data collection burden'
                            ],
                            correct: 2,
                            explanation: 'Activating 150 sites globally within weeks (not months) is the biggest challenge. Traditional site activation takes 6-12 months; this requires 2-4 weeks.'
                        },
                        {
                            id: 'q2',
                            question: 'How should sites be selected?',
                            options: [
                                'Academic medical centers only',
                                'Mix of academic and community sites in high-incidence areas',
                                'Community sites only',
                                'Specialized research sites only'
                            ],
                            correct: 1,
                            explanation: 'A mix of academic and community sites in high COVID-19 incidence areas maximizes enrollment speed and diversity while maintaining quality.'
                        },
                        {
                            id: 'q3',
                            question: 'What enrollment rate per site per month is realistic?',
                            options: [
                                '5-10 participants',
                                '20-30 participants',
                                '50-75 participants',
                                '100+ participants'
                            ],
                            correct: 2,
                            explanation: 'During a pandemic with high public interest, 50-75 participants per site per month is achievable with proper infrastructure and staffing.'
                        }
                    ],
                    xpReward: 250
                }
            ],
            
            // Module 2: Patient Population & Recruitment
            module2: [
                {
                    id: 'scenario_2_1',
                    title: 'Diabetes Trial Recruitment',
                    difficulty: 'beginner',
                    description: 'Calculate patient pool and recruitment strategy for Type 2 Diabetes trial.',
                    protocol: {
                        indication: 'Type 2 Diabetes Mellitus',
                        phase: 'Phase III',
                        targetEnrollment: 300,
                        duration: '12 months',
                        sites: 'US - 30 sites',
                        inclusionCriteria: [
                            'Age 40-75 years',
                            'Type 2 diabetes for ≥1 year',
                            'HbA1c 7.5-10.5%',
                            'BMI 25-40 kg/m²',
                            'On stable metformin dose'
                        ],
                        exclusionCriteria: [
                            'Type 1 diabetes',
                            'Recent cardiovascular event',
                            'Severe kidney disease',
                            'Insulin use'
                        ]
                    },
                    questions: [
                        {
                            id: 'q1',
                            question: 'What percentage of Type 2 diabetes patients meet the HbA1c criteria?',
                            options: [
                                '10-20%',
                                '30-40%',
                                '50-60%',
                                '70-80%'
                            ],
                            correct: 1,
                            explanation: 'Approximately 30-40% of Type 2 diabetes patients have HbA1c in the 7.5-10.5% range, representing suboptimal control but not severe.'
                        },
                        {
                            id: 'q2',
                            question: 'How many patients per site per month is realistic?',
                            options: [
                                '0.5-1 patient',
                                '1-2 patients',
                                '3-4 patients',
                                '5-6 patients'
                            ],
                            correct: 1,
                            explanation: 'For diabetes trials with moderate criteria, 1-2 patients per site per month is realistic, requiring 10 patients per site over 12 months.'
                        },
                        {
                            id: 'q3',
                            question: 'What is the best recruitment channel?',
                            options: [
                                'Social media only',
                                'Physician referrals only',
                                'Multi-channel: physician referrals, EMR screening, and targeted advertising',
                                'Patient registries only'
                            ],
                            correct: 2,
                            explanation: 'A multi-channel approach combining physician referrals, EMR screening for eligible patients, and targeted digital advertising yields the best results.'
                        }
                    ],
                    xpReward: 150
                },
                {
                    id: 'scenario_2_2',
                    title: 'Pediatric Asthma Recruitment',
                    difficulty: 'intermediate',
                    description: 'Design recruitment strategy for pediatric asthma trial.',
                    protocol: {
                        indication: 'Moderate to Severe Asthma',
                        phase: 'Phase II',
                        targetEnrollment: 120,
                        duration: '18 months',
                        sites: 'US - 20 sites',
                        inclusionCriteria: [
                            'Age 6-17 years',
                            'Asthma diagnosis ≥1 year',
                            'FEV1 60-90% predicted',
                            'On inhaled corticosteroids',
                            '≥2 exacerbations in past year'
                        ],
                        exclusionCriteria: [
                            'Other chronic lung disease',
                            'Smoking or vaping',
                            'Recent hospitalization',
                            'Immunodeficiency'
                        ]
                    },
                    questions: [
                        {
                            id: 'q1',
                            question: 'What is the primary recruitment challenge?',
                            options: [
                                'Finding eligible patients',
                                'Obtaining parental consent',
                                'Competing trials',
                                'Geographic access'
                            ],
                            correct: 1,
                            explanation: 'Pediatric trials require both parental consent and child assent, which significantly impacts recruitment. Parents are often hesitant about research participation.'
                        },
                        {
                            id: 'q2',
                            question: 'What recruitment materials are most effective?',
                            options: [
                                'Physician brochures only',
                                'Child-friendly materials with parent information packets',
                                'Social media ads only',
                                'Email campaigns only'
                            ],
                            correct: 1,
                            explanation: 'Child-friendly materials that explain the study in age-appropriate language, combined with comprehensive parent information packets, are most effective.'
                        },
                        {
                            id: 'q3',
                            question: 'What screen failure rate should be expected?',
                            options: [
                                '20-30%',
                                '40-50%',
                                '60-70%',
                                '80-90%'
                            ],
                            correct: 1,
                            explanation: 'Pediatric asthma trials typically see 40-50% screen failure due to lung function criteria, exacerbation history, and medication requirements.'
                        }
                    ],
                    xpReward: 200
                },
                {
                    id: 'scenario_2_3',
                    title: 'Cardiovascular Trial Screening',
                    difficulty: 'intermediate',
                    description: 'Optimize screening strategy for a heart failure trial.',
                    protocol: {
                        indication: 'Heart Failure with Reduced Ejection Fraction',
                        phase: 'Phase III',
                        targetEnrollment: 500,
                        duration: '24 months',
                        sites: 'US and EU - 50 sites',
                        inclusionCriteria: [
                            'Age ≥18 years',
                            'NYHA Class II-IV heart failure',
                            'LVEF ≤40%',
                            'On stable guideline-directed medical therapy',
                            'NT-proBNP >600 pg/mL',
                            'Hospitalization for HF in past 12 months'
                        ],
                        exclusionCriteria: [
                            'Recent MI or stroke (<3 months)',
                            'Severe renal impairment (eGFR <30)',
                            'Systolic BP <90 mmHg',
                            'Planned cardiac surgery'
                        ]
                    },
                    questions: [
                        {
                            id: 'q1',
                            question: 'What is the expected screen failure rate?',
                            options: [
                                '20-30%',
                                '40-50%',
                                '60-70%',
                                '80-90%'
                            ],
                            correct: 2,
                            explanation: 'Heart failure trials typically see 60-70% screen failure due to strict LVEF criteria, NT-proBNP requirements, and medication stability requirements.'
                        },
                        {
                            id: 'q2',
                            question: 'What is the biggest recruitment challenge?',
                            options: [
                                'Finding patients with heart failure',
                                'Meeting the NT-proBNP threshold',
                                'Recent hospitalization requirement',
                                'All of the above'
                            ],
                            correct: 3,
                            explanation: 'All factors contribute significantly. While HF is common, finding patients who meet all criteria including biomarker levels and recent hospitalization is challenging.'
                        },
                        {
                            id: 'q3',
                            question: 'How many patients per site per month is realistic?',
                            options: [
                                '0.5-1 patient',
                                '1-2 patients',
                                '3-4 patients',
                                '5-6 patients'
                            ],
                            correct: 0,
                            explanation: 'For heart failure trials with strict criteria, 0.5-1 patient per site per month is realistic, requiring 10 patients per site over 24 months.'
                        }
                    ],
                    xpReward: 200
                },
                {
                    id: 'scenario_2_4',
                    title: 'Alzheimer\'s Disease Recruitment',
                    difficulty: 'advanced',
                    description: 'Design recruitment strategy for early Alzheimer\'s disease prevention trial.',
                    protocol: {
                        indication: 'Early Alzheimer\'s Disease',
                        phase: 'Phase III',
                        targetEnrollment: 1500,
                        duration: '36 months enrollment, 48 months follow-up',
                        sites: 'Global - 200 sites',
                        inclusionCriteria: [
                            'Age 60-85 years',
                            'Positive amyloid PET scan',
                            'MMSE 24-30',
                            'CDR 0.5',
                            'Study partner available',
                            'Willing to undergo lumbar puncture'
                        ],
                        exclusionCriteria: [
                            'Other causes of cognitive impairment',
                            'Significant psychiatric disease',
                            'Recent use of cognitive enhancers',
                            'MRI contraindications'
                        ]
                    },
                    questions: [
                        {
                            id: 'q1',
                            question: 'What is the primary recruitment bottleneck?',
                            options: [
                                'Finding eligible age group',
                                'Positive amyloid PET requirement',
                                'Study partner requirement',
                                'Lumbar puncture willingness'
                            ],
                            correct: 1,
                            explanation: 'The amyloid PET requirement is the biggest bottleneck. Only 20-30% of cognitively normal elderly have positive scans, requiring extensive pre-screening.'
                        },
                        {
                            id: 'q2',
                            question: 'What recruitment strategy is most effective?',
                            options: [
                                'Memory clinic referrals only',
                                'Multi-channel approach with registry, advertising, and clinics',
                                'Social media advertising only',
                                'Primary care physician referrals only'
                            ],
                            correct: 1,
                            explanation: 'Early AD trials require multi-channel recruitment including patient registries, targeted advertising, memory clinics, and community outreach due to the specific population needed.'
                        },
                        {
                            id: 'q3',
                            question: 'What is the expected screen-to-randomize ratio?',
                            options: [
                                '2:1',
                                '5:1',
                                '10:1',
                                '20:1'
                            ],
                            correct: 2,
                            explanation: 'Early AD trials typically see 10:1 screen-to-randomize ratios due to amyloid positivity rates, cognitive testing, and other inclusion/exclusion criteria.'
                        }
                    ],
                    xpReward: 300
                }
            ],
            
            // Module 3: Site Selection
            module3: [
                {
                    id: 'scenario_3_1',
                    title: 'Site Capability Assessment',
                    difficulty: 'beginner',
                    description: 'Evaluate three sites for a cardiovascular trial.',
                    sites: [
                        {
                            name: 'Metro Heart Center',
                            type: 'Academic Medical Center',
                            experience: '50+ cardiovascular trials',
                            staff: '3 dedicated coordinators, 5 cardiologists',
                            patientVolume: '500 eligible patients/year',
                            infrastructure: 'Full cardiac imaging suite, 24/7 emergency coverage',
                            enrollment: 'Average 2-3 patients/month in similar trials',
                            regulatory: 'IRB approval typically 6-8 weeks'
                        },
                        {
                            name: 'Community Cardiology Group',
                            type: 'Private Practice',
                            experience: '10 cardiovascular trials',
                            staff: '1 part-time coordinator, 3 cardiologists',
                            patientVolume: '200 eligible patients/year',
                            infrastructure: 'Basic imaging, refers complex cases',
                            enrollment: 'Average 1 patient/month in similar trials',
                            regulatory: 'Uses central IRB, approval 4-6 weeks'
                        },
                        {
                            name: 'Regional Medical Center',
                            type: 'Community Hospital',
                            experience: '5 cardiovascular trials',
                            staff: '2 coordinators (shared across studies), 4 cardiologists',
                            patientVolume: '300 eligible patients/year',
                            infrastructure: 'Modern imaging, limited after-hours coverage',
                            enrollment: 'Average 1-2 patients/month in similar trials',
                            regulatory: 'IRB approval typically 8-10 weeks'
                        }
                    ],
                    questions: [
                        {
                            id: 'q1',
                            question: 'Which site should be the top priority?',
                            options: [
                                'Metro Heart Center',
                                'Community Cardiology Group',
                                'Regional Medical Center',
                                'All equally suitable'
                            ],
                            correct: 0,
                            explanation: 'Metro Heart Center has the best combination of experience, infrastructure, enrollment history, and dedicated staff, making it the top priority.'
                        },
                        {
                            id: 'q2',
                            question: 'What is the main concern with Community Cardiology Group?',
                            options: [
                                'Lack of patient volume',
                                'Limited infrastructure',
                                'Part-time coordinator capacity',
                                'Insufficient experience'
                            ],
                            correct: 2,
                            explanation: 'The part-time coordinator is the biggest concern. Cardiovascular trials require significant time and attention; part-time staff may struggle with workload.'
                        },
                        {
                            id: 'q3',
                            question: 'How should Regional Medical Center be approached?',
                            options: [
                                'Reject due to slow IRB',
                                'Accept but plan for delayed activation',
                                'Require them to use central IRB',
                                'Accept as backup site only'
                            ],
                            correct: 1,
                            explanation: 'Regional Medical Center has good potential but slow IRB. Accept them but plan activation timeline accordingly and provide extra support.'
                        }
                    ],
                    xpReward: 150
                },
                {
                    id: 'scenario_3_2',
                    title: 'Multi-Site Oncology Selection',
                    difficulty: 'intermediate',
                    description: 'Select optimal sites for a global oncology trial.',
                    sites: [
                        {
                            name: 'Cancer Center of Excellence',
                            type: 'NCI-Designated Cancer Center',
                            experience: '100+ oncology trials',
                            staff: '8 dedicated coordinators, 15 oncologists',
                            patientVolume: '1000 eligible patients/year',
                            infrastructure: 'Full imaging, pathology, genomics lab',
                            enrollment: 'Average 4-5 patients/month',
                            regulatory: 'Central IRB, 4-6 weeks',
                            challenges: 'High competition, many concurrent trials'
                        },
                        {
                            name: 'University Medical Center',
                            type: 'Academic Medical Center',
                            experience: '50 oncology trials',
                            staff: '4 coordinators, 8 oncologists',
                            patientVolume: '500 eligible patients/year',
                            infrastructure: 'Full capabilities, research pharmacy',
                            enrollment: 'Average 2-3 patients/month',
                            regulatory: 'Local IRB, 8-10 weeks',
                            challenges: 'Slower IRB, teaching responsibilities'
                        },
                        {
                            name: 'Community Oncology Network',
                            type: 'Community Practice Network',
                            experience: '20 oncology trials',
                            staff: '2 coordinators (shared), 6 oncologists',
                            patientVolume: '300 eligible patients/year',
                            infrastructure: 'Basic capabilities, sends out genomics',
                            enrollment: 'Average 1-2 patients/month',
                            regulatory: 'Central IRB, 4-6 weeks',
                            challenges: 'Limited research infrastructure'
                        },
                        {
                            name: 'Regional Cancer Institute',
                            type: 'Regional Specialty Center',
                            experience: '30 oncology trials',
                            staff: '3 coordinators, 10 oncologists',
                            patientVolume: '600 eligible patients/year',
                            infrastructure: 'Modern facilities, good imaging',
                            enrollment: 'Average 2-4 patients/month',
                            regulatory: 'Central IRB, 5-7 weeks',
                            challenges: 'Growing program, some staff turnover'
                        }
                    ],
                    questions: [
                        {
                            id: 'q1',
                            question: 'For a trial requiring 300 patients in 18 months, which site mix is optimal?',
                            options: [
                                'Only top-tier cancer centers',
                                'Mix of academic and high-performing community sites',
                                'Only community sites for faster enrollment',
                                'Only academic centers for quality'
                            ],
                            correct: 1,
                            explanation: 'A balanced mix of academic centers (for complex cases) and high-performing community sites (for volume) optimizes both enrollment speed and quality.'
                        },
                        {
                            id: 'q2',
                            question: 'What is the main risk with Cancer Center of Excellence?',
                            options: [
                                'Lack of experience',
                                'Poor infrastructure',
                                'High competition from other trials',
                                'Slow regulatory approval'
                            ],
                            correct: 2,
                            explanation: 'Top cancer centers often have many concurrent trials competing for the same patient population, which can significantly slow enrollment despite high patient volume.'
                        },
                        {
                            id: 'q3',
                            question: 'How should you approach Community Oncology Network?',
                            options: [
                                'Reject due to limited experience',
                                'Accept but provide extra training and support',
                                'Make them a backup site only',
                                'Require infrastructure upgrades first'
                            ],
                            correct: 1,
                            explanation: 'Community sites can be valuable for enrollment but need additional support, training, and potentially centralized services for complex procedures.'
                        }
                    ],
                    xpReward: 200
                },
                {
                    id: 'scenario_3_3',
                    title: 'Global Site Network Design',
                    difficulty: 'advanced',
                    description: 'Design optimal global site network for rare disease trial.',
                    protocol: {
                        indication: 'Rare Metabolic Disorder',
                        phase: 'Phase II/III',
                        targetEnrollment: 80,
                        duration: '36 months',
                        prevalence: '1 in 100,000',
                        requirements: [
                            'Specialized metabolic testing',
                            'Pediatric expertise (ages 2-18)',
                            'Genetic counseling available',
                            'Long-term follow-up capability',
                            'Experience with rare diseases'
                        ]
                    },
                    questions: [
                        {
                            id: 'q1',
                            question: 'How many sites should you activate globally?',
                            options: [
                                '5-10 sites',
                                '15-20 sites',
                                '25-30 sites',
                                '40-50 sites'
                            ],
                            correct: 1,
                            explanation: 'For rare diseases, 15-20 specialized centers globally is optimal. Too few limits access, too many dilutes patient pool and increases costs without benefit.'
                        },
                        {
                            id: 'q2',
                            question: 'What is the most important site selection criterion?',
                            options: [
                                'Previous trial experience',
                                'Access to patient population',
                                'Modern facilities',
                                'Fast regulatory approval'
                            ],
                            correct: 1,
                            explanation: 'For rare diseases, access to the patient population is paramount. Sites must be known referral centers where patients naturally seek care.'
                        },
                        {
                            id: 'q3',
                            question: 'What enrollment rate per site is realistic?',
                            options: [
                                '1 patient per site over 36 months',
                                '3-5 patients per site over 36 months',
                                '10 patients per site over 36 months',
                                '15+ patients per site over 36 months'
                            ],
                            correct: 1,
                            explanation: 'For ultra-rare diseases, 3-5 patients per site over 3 years is realistic. Many sites may only enroll 1-2 patients, while a few centers of excellence may enroll more.'
                        }
                    ],
                    xpReward: 250
                }
            ],
            
            // Module 4: Budget & Resource Planning
            module4: [
                {
                    id: 'scenario_4_1',
                    title: 'Trial Budget Estimation',
                    difficulty: 'beginner',
                    description: 'Estimate budget for a Phase II oncology trial.',
                    protocol: {
                        indication: 'Metastatic Breast Cancer',
                        phase: 'Phase II',
                        targetEnrollment: 120,
                        duration: '24 months enrollment, 12 months follow-up',
                        sites: '20 sites (US)',
                        procedures: [
                            'Screening: Labs, imaging, biopsy',
                            'Treatment: IV infusion every 3 weeks',
                            'Assessments: CT scans every 6 weeks',
                            'Safety: Labs weekly for 8 weeks, then monthly',
                            'Follow-up: Survival follow-up every 3 months'
                        ]
                    },
                    questions: [
                        {
                            id: 'q1',
                            question: 'What percentage of total budget typically goes to site costs?',
                            options: [
                                '20-30%',
                                '40-50%',
                                '60-70%',
                                '80-90%'
                            ],
                            correct: 1,
                            explanation: 'Site costs (investigator fees, procedures, patient stipends) typically represent 40-50% of total trial budget in Phase II/III trials.'
                        },
                        {
                            id: 'q2',
                            question: 'What is the estimated cost per patient for this trial?',
                            options: [
                                '$10,000-20,000',
                                '$30,000-50,000',
                                '$60,000-80,000',
                                '$100,000+'
                            ],
                            correct: 2,
                            explanation: 'Phase II oncology trials with frequent imaging and biopsies typically cost $60,000-80,000 per patient including all procedures, monitoring, and overhead.'
                        },
                        {
                            id: 'q3',
                            question: 'What is often the most underestimated cost?',
                            options: [
                                'Drug supply',
                                'Patient recruitment',
                                'Site monitoring',
                                'Data management'
                            ],
                            correct: 1,
                            explanation: 'Patient recruitment costs are frequently underestimated, often requiring 2-3x initial budget due to advertising, pre-screening, and screen failures.'
                        }
                    ],
                    xpReward: 150
                }
            ],
            
            // Module 5: Timeline & Milestones
            module5: [
                {
                    id: 'scenario_5_1',
                    title: 'Trial Timeline Development',
                    difficulty: 'beginner',
                    description: 'Create realistic timeline for cardiovascular trial.',
                    protocol: {
                        indication: 'Hypertension',
                        phase: 'Phase III',
                        targetEnrollment: 400,
                        sites: '40 sites',
                        duration: '18 months enrollment'
                    },
                    questions: [
                        {
                            id: 'q1',
                            question: 'How long should site activation take?',
                            options: [
                                '1-2 months',
                                '3-4 months',
                                '6-8 months',
                                '10-12 months'
                            ],
                            correct: 2,
                            explanation: 'Site activation typically takes 6-8 months including contracting, IRB approval, site training, and first patient screening.'
                        },
                        {
                            id: 'q2',
                            question: 'When should recruitment peak?',
                            options: [
                                'Month 1-3',
                                'Month 6-12',
                                'Month 15-18',
                                'Evenly throughout'
                            ],
                            correct: 1,
                            explanation: 'Enrollment typically peaks in months 6-12 after sites are activated and recruitment strategies are optimized, then may decline as patient pool depletes.'
                        },
                        {
                            id: 'q3',
                            question: 'What contingency should be added to timeline?',
                            options: [
                                '10-15%',
                                '20-30%',
                                '40-50%',
                                '60-70%'
                            ],
                            correct: 1,
                            explanation: 'A 20-30% timeline contingency is standard to account for slower-than-expected enrollment, site delays, and unforeseen issues.'
                        }
                    ],
                    xpReward: 150
                }
            ],
            
            // Module 6: Risk Management
            module6: [
                {
                    id: 'scenario_6_1',
                    title: 'Risk Identification & Mitigation',
                    difficulty: 'intermediate',
                    description: 'Identify and mitigate risks in a complex trial.',
                    protocol: {
                        indication: 'Multiple Sclerosis',
                        phase: 'Phase III',
                        targetEnrollment: 600,
                        duration: '30 months',
                        sites: 'Global - 80 sites',
                        challenges: [
                            'Competitive landscape (5 similar trials)',
                            'Complex MRI requirements',
                            'Long treatment duration (24 months)',
                            'High screen failure rate expected'
                        ]
                    },
                    questions: [
                        {
                            id: 'q1',
                            question: 'What is the highest risk to enrollment?',
                            options: [
                                'MRI requirements',
                                'Competitive trials',
                                'Treatment duration',
                                'Screen failure rate'
                            ],
                            correct: 1,
                            explanation: 'With 5 competing trials, patient competition is the highest risk. Sites may preferentially enroll in trials with better terms or easier procedures.'
                        },
                        {
                            id: 'q2',
                            question: 'What mitigation strategy is most effective?',
                            options: [
                                'Increase site payments',
                                'Simplify inclusion criteria',
                                'Add more sites',
                                'All of the above'
                            ],
                            correct: 3,
                            explanation: 'A comprehensive approach including competitive site payments, streamlined criteria where possible, and additional sites provides the best risk mitigation.'
                        },
                        {
                            id: 'q3',
                            question: 'How should you monitor enrollment risk?',
                            options: [
                                'Monthly reports only',
                                'Real-time dashboard with triggers',
                                'Quarterly reviews',
                                'Wait until halfway point'
                            ],
                            correct: 1,
                            explanation: 'Real-time enrollment dashboards with pre-defined triggers (e.g., <80% of target at month 6) enable early intervention before risks become critical.'
                        }
                    ],
                    xpReward: 200
                }
            ]
        };
    }

    // Get scenarios for a module
    getModuleScenarios(moduleId, difficulty = null) {
        const moduleKey = `module${moduleId}`;
        let scenarios = this.scenarios[moduleKey] || [];

        if (difficulty) {
            scenarios = scenarios.filter(s => s.difficulty === difficulty);
        }

        return scenarios;
    }

    // Get all scenarios across all modules
    getAllScenarios(difficulty = null) {
        let allScenarios = [];
        for (let i = 1; i <= 6; i++) {
            allScenarios = allScenarios.concat(this.getModuleScenarios(i, difficulty));
        }
        return allScenarios;
    }

    // Get scenario count by module
    getScenarioCount() {
        const counts = {};
        for (let i = 1; i <= 6; i++) {
            counts[`module${i}`] = this.getModuleScenarios(i).length;
        }
        counts.total = Object.values(counts).reduce((a, b) => a + b, 0);
        return counts;
    }

    // Get a specific scenario
    getScenario(scenarioId) {
        for (const moduleScenarios of Object.values(this.scenarios)) {
            const scenario = moduleScenarios.find(s => s.id === scenarioId);
            if (scenario) return scenario;
        }
        return null;
    }

    // Submit scenario attempt
    submitAttempt(scenarioId, answers) {
        if (!this.auth.isAuthenticated()) {
            return { success: false, error: 'Not authenticated' };
        }

        const user = this.auth.getCurrentUser();
        const scenario = this.getScenario(scenarioId);

        if (!scenario) {
            return { success: false, error: 'Scenario not found' };
        }

        // Calculate score
        let correctAnswers = 0;
        const results = scenario.questions.map((question, index) => {
            const userAnswer = answers[question.id];
            const isCorrect = userAnswer === question.correct;
            if (isCorrect) correctAnswers++;

            return {
                questionId: question.id,
                question: question.question,
                userAnswer: userAnswer,
                correctAnswer: question.correct,
                isCorrect: isCorrect,
                explanation: question.explanation
            };
        });

        const score = Math.round((correctAnswers / scenario.questions.length) * 100);
        const passed = score >= 70;

        // Calculate XP earned
        let xpEarned = 0;
        if (passed) {
            xpEarned = scenario.xpReward;
            if (score === 100) {
                xpEarned = Math.round(xpEarned * 1.5); // Bonus for perfect score
            }
        } else {
            xpEarned = Math.round(scenario.xpReward * 0.3); // Partial credit
        }

        // Save attempt
        if (!this.userAttempts[user.id]) {
            this.userAttempts[user.id] = [];
        }

        this.userAttempts[user.id].push({
            scenarioId: scenarioId,
            score: score,
            passed: passed,
            xpEarned: xpEarned,
            timestamp: new Date().toISOString(),
            results: results
        });

        this.saveUserAttempts();

        // Update user progress
        this.auth.updateProgress({
            xp: user.progress.xp + xpEarned
        });

        return {
            success: true,
            score: score,
            passed: passed,
            xpEarned: xpEarned,
            correctAnswers: correctAnswers,
            totalQuestions: scenario.questions.length,
            results: results,
            feedback: this.generateFeedback(score, scenario.difficulty)
        };
    }

    // Generate feedback based on score
    generateFeedback(score, difficulty) {
        let feedback = '';

        if (score === 100) {
            feedback = '🌟 Perfect score! You have excellent mastery of this topic. ';
            if (difficulty === 'beginner') {
                feedback += 'Ready to tackle intermediate scenarios!';
            } else if (difficulty === 'intermediate') {
                feedback += 'Ready for advanced challenges!';
            } else {
                feedback += 'You\'re a true expert!';
            }
        } else if (score >= 80) {
            feedback = '👍 Great job! You have a strong understanding. Review the explanations to perfect your knowledge.';
        } else if (score >= 70) {
            feedback = '✓ You passed! Review the questions you missed to strengthen your understanding.';
        } else if (score >= 50) {
            feedback = '📚 You\'re on the right track but need more practice. Review the module content and try again.';
        } else {
            feedback = '💪 This is challenging material. Review the module carefully and don\'t hesitate to ask the AI assistant for help.';
        }

        return feedback;
    }

    // Get user's attempt history
    getUserAttempts(scenarioId = null) {
        if (!this.auth.isAuthenticated()) {
            return { success: false, error: 'Not authenticated' };
        }

        const user = this.auth.getCurrentUser();
        let attempts = this.userAttempts[user.id] || [];

        if (scenarioId) {
            attempts = attempts.filter(a => a.scenarioId === scenarioId);
        }

        return {
            success: true,
            attempts: attempts
        };
    }

    // Get practice statistics
    getPracticeStats() {
        if (!this.auth.isAuthenticated()) {
            return { success: false, error: 'Not authenticated' };
        }

        const user = this.auth.getCurrentUser();
        const attempts = this.userAttempts[user.id] || [];

        const totalAttempts = attempts.length;
        const passedAttempts = attempts.filter(a => a.passed).length;
        const averageScore = attempts.length > 0
            ? Math.round(attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length)
            : 0;
        const totalXPEarned = attempts.reduce((sum, a) => sum + a.xpEarned, 0);

        const scenariosByDifficulty = {
            beginner: 0,
            intermediate: 0,
            advanced: 0
        };

        attempts.forEach(attempt => {
            const scenario = this.getScenario(attempt.scenarioId);
            if (scenario) {
                scenariosByDifficulty[scenario.difficulty]++;
            }
        });

        return {
            success: true,
            stats: {
                totalAttempts: totalAttempts,
                passedAttempts: passedAttempts,
                passRate: totalAttempts > 0 ? Math.round((passedAttempts / totalAttempts) * 100) : 0,
                averageScore: averageScore,
                totalXPEarned: totalXPEarned,
                scenariosByDifficulty: scenariosByDifficulty
            }
        };
    }

    // Generate AI-powered scenario
    generateAIScenario(moduleId, difficulty, userProfile) {
        // This would use AI to generate custom scenarios based on user's weak areas
        // For now, return a template that can be customized
        
        const templates = {
            module1: {
                title: 'Custom Feasibility Assessment',
                description: 'AI-generated scenario based on your learning needs'
            },
            module2: {
                title: 'Custom Recruitment Challenge',
                description: 'AI-generated recruitment scenario'
            },
            module3: {
                title: 'Custom Site Selection',
                description: 'AI-generated site evaluation scenario'
            }
        };

        const template = templates[`module${moduleId}`] || templates.module1;

        return {
            success: true,
            scenario: {
                id: `ai_generated_${Date.now()}`,
                title: template.title,
                difficulty: difficulty,
                description: template.description,
                isAIGenerated: true,
                message: 'AI scenario generation coming soon! This feature will create personalized scenarios based on your performance and learning style.'
            }
        };
    }
}

// Initialize practice scenarios system
const practiceScenarios = new PracticeScenarios(authSystem);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PracticeScenarios;
}