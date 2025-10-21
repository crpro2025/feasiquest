// ===== DEMO DATA =====

// Demo Users
const DEMO_USERS = {
    site: {
        id: 'site_001',
        role: 'site',
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@citymedical.com',
        organization: 'City Medical Research Center',
        avatar: 'SJ',
        profile: {
            siteName: 'City Medical Research Center',
            location: 'Boston, MA, USA',
            established: '2005',
            principalInvestigator: 'Dr. Sarah Johnson',
            phone: '+1 (617) 555-0123',
            email: 'research@citymedical.com',
            website: 'www.citymedical.com/research',
            therapeuticAreas: ['Oncology', 'Cardiology', 'Neurology', 'Diabetes'],
            phases: ['Phase I', 'Phase II', 'Phase III', 'Phase IV'],
            bedCount: 450,
            icuBeds: 50,
            researchStaff: 25,
            activeStudies: 12,
            completedStudies: 87,
            enrollmentCapacity: 500,
            certifications: ['GCP', 'CLIA', 'CAP', 'AAALAC'],
            equipment: ['MRI', 'CT Scanner', 'PET Scanner', 'Laboratory'],
            specialties: ['Clinical Trials', 'Patient Recruitment', 'Data Management']
        }
    },
    sponsor: {
        id: 'sponsor_001',
        role: 'sponsor',
        name: 'Michael Chen',
        email: 'michael.chen@biopharma.com',
        organization: 'BioPharma Solutions Inc.',
        avatar: 'MC',
        profile: {
            companyName: 'BioPharma Solutions Inc.',
            location: 'San Francisco, CA, USA',
            founded: '2010',
            employees: '500-1000',
            phone: '+1 (415) 555-0199',
            email: 'trials@biopharma.com',
            website: 'www.biopharma.com',
            therapeuticFocus: ['Oncology', 'Immunology', 'Rare Diseases'],
            pipelineSize: 15,
            activeTrials: 8,
            sitesWorkedWith: 150
        }
    },
    cro: {
        id: 'cro_001',
        role: 'cro',
        name: 'Jennifer Martinez',
        email: 'jennifer.martinez@globalcro.com',
        organization: 'Global CRO Partners',
        avatar: 'JM',
        profile: {
            companyName: 'Global CRO Partners',
            location: 'New York, NY, USA',
            founded: '2008',
            employees: '1000+',
            phone: '+1 (212) 555-0177',
            email: 'partnerships@globalcro.com',
            website: 'www.globalcro.com',
            services: ['Site Selection', 'Patient Recruitment', 'Data Management', 'Regulatory Affairs'],
            globalPresence: ['North America', 'Europe', 'Asia', 'Latin America'],
            activeStudies: 45,
            siteNetwork: 500,
            therapeuticExpertise: ['All Major Therapeutic Areas']
        }
    }
};

// Demo Studies
const DEMO_STUDIES = [
    {
        id: 'study_001',
        title: 'Phase III Oncology Trial - Advanced NSCLC',
        protocol: 'BPS-ONC-301',
        sponsor: 'BioPharma Solutions Inc.',
        phase: 'Phase III',
        therapeuticArea: 'Oncology',
        indication: 'Non-Small Cell Lung Cancer',
        status: 'Recruiting',
        targetEnrollment: 450,
        currentEnrollment: 287,
        sitesNeeded: 25,
        sitesActive: 18,
        startDate: '2024-01-15',
        estimatedCompletion: '2025-12-31',
        budget: '$12,500,000',
        inclusionCriteria: [
            'Age 18-75 years',
            'Histologically confirmed NSCLC',
            'Stage IIIB or IV disease',
            'ECOG performance status 0-1',
            'Adequate organ function'
        ],
        exclusionCriteria: [
            'Prior systemic therapy for advanced disease',
            'Active brain metastases',
            'Significant cardiac disease',
            'Pregnancy or breastfeeding'
        ],
        primaryEndpoint: 'Overall Survival',
        secondaryEndpoints: ['Progression-Free Survival', 'Objective Response Rate', 'Quality of Life'],
        questionnaireSent: true,
        responsesReceived: 12,
        sitesShortlisted: 8
    },
    {
        id: 'study_002',
        title: 'Phase II Diabetes Study - Type 2 DM',
        protocol: 'BPS-ENDO-202',
        sponsor: 'BioPharma Solutions Inc.',
        phase: 'Phase II',
        therapeuticArea: 'Endocrinology',
        indication: 'Type 2 Diabetes Mellitus',
        status: 'Planning',
        targetEnrollment: 200,
        currentEnrollment: 0,
        sitesNeeded: 15,
        sitesActive: 0,
        startDate: '2025-03-01',
        estimatedCompletion: '2026-06-30',
        budget: '$5,800,000',
        inclusionCriteria: [
            'Age 30-70 years',
            'Type 2 Diabetes diagnosis',
            'HbA1c 7.5-10.5%',
            'BMI 25-40 kg/m²',
            'Stable diabetes medications'
        ],
        exclusionCriteria: [
            'Type 1 Diabetes',
            'Severe diabetic complications',
            'Recent cardiovascular event',
            'Renal impairment'
        ],
        primaryEndpoint: 'Change in HbA1c from baseline',
        secondaryEndpoints: ['Fasting Plasma Glucose', 'Body Weight', 'Safety and Tolerability'],
        questionnaireSent: false,
        responsesReceived: 0,
        sitesShortlisted: 0
    },
    {
        id: 'study_003',
        title: 'Phase I Rare Disease Trial - Duchenne MD',
        protocol: 'BPS-RARE-101',
        sponsor: 'BioPharma Solutions Inc.',
        phase: 'Phase I',
        therapeuticArea: 'Rare Diseases',
        indication: 'Duchenne Muscular Dystrophy',
        status: 'Active',
        targetEnrollment: 30,
        currentEnrollment: 22,
        sitesNeeded: 5,
        sitesActive: 5,
        startDate: '2024-06-01',
        estimatedCompletion: '2025-05-31',
        budget: '$3,200,000',
        inclusionCriteria: [
            'Age 5-12 years',
            'Confirmed DMD diagnosis',
            'Ambulatory',
            'Stable corticosteroid dose',
            'Adequate cardiac function'
        ],
        exclusionCriteria: [
            'Prior gene therapy',
            'Significant cardiac dysfunction',
            'Active infection',
            'Contraindication to MRI'
        ],
        primaryEndpoint: 'Safety and Tolerability',
        secondaryEndpoints: ['Dystrophin Expression', 'Motor Function', 'Pharmacokinetics'],
        questionnaireSent: true,
        responsesReceived: 8,
        sitesShortlisted: 5
    }
];

// Demo Questionnaires
const DEMO_QUESTIONNAIRES = [
    {
        id: 'quest_001',
        studyId: 'study_001',
        studyTitle: 'Phase III Oncology Trial - Advanced NSCLC',
        protocol: 'BPS-ONC-301',
        sponsor: 'BioPharma Solutions Inc.',
        sentDate: '2024-10-15',
        dueDate: '2024-11-15',
        status: 'pending',
        priority: 'high',
        sections: [
            {
                title: 'Site Information',
                questions: [
                    { id: 'q1', question: 'Site Name', type: 'text', required: true },
                    { id: 'q2', question: 'Principal Investigator', type: 'text', required: true },
                    { id: 'q3', question: 'Site Address', type: 'textarea', required: true },
                    { id: 'q4', question: 'Years of Research Experience', type: 'number', required: true }
                ]
            },
            {
                title: 'Therapeutic Experience',
                questions: [
                    { id: 'q5', question: 'Experience with Oncology Trials', type: 'select', options: ['None', '1-5 studies', '6-10 studies', '10+ studies'], required: true },
                    { id: 'q6', question: 'Experience with NSCLC specifically', type: 'select', options: ['None', '1-3 studies', '4-6 studies', '7+ studies'], required: true },
                    { id: 'q7', question: 'Number of Oncology patients treated annually', type: 'number', required: true }
                ]
            },
            {
                title: 'Infrastructure & Resources',
                questions: [
                    { id: 'q8', question: 'Number of dedicated research staff', type: 'number', required: true },
                    { id: 'q9', question: 'Available examination rooms', type: 'number', required: true },
                    { id: 'q10', question: 'On-site laboratory capabilities', type: 'multiselect', options: ['Hematology', 'Chemistry', 'Urinalysis', 'Microbiology', 'Molecular Testing'], required: true },
                    { id: 'q11', question: 'Imaging capabilities', type: 'multiselect', options: ['X-Ray', 'CT', 'MRI', 'PET', 'Ultrasound'], required: true }
                ]
            },
            {
                title: 'Patient Population',
                questions: [
                    { id: 'q12', question: 'Estimated NSCLC patients in database', type: 'number', required: true },
                    { id: 'q13', question: 'Patients meeting inclusion criteria', type: 'number', required: true },
                    { id: 'q14', question: 'Expected monthly enrollment rate', type: 'number', required: true },
                    { id: 'q15', question: 'Patient retention rate (%)', type: 'number', required: true }
                ]
            },
            {
                title: 'Regulatory & Compliance',
                questions: [
                    { id: 'q16', question: 'IRB/IEC approval timeline', type: 'select', options: ['2-4 weeks', '4-6 weeks', '6-8 weeks', '8+ weeks'], required: true },
                    { id: 'q17', question: 'GCP certification status', type: 'select', options: ['Current', 'Expired', 'Never certified'], required: true },
                    { id: 'q18', question: 'FDA inspection history', type: 'select', options: ['Never inspected', 'No findings', 'Minor findings', 'Major findings'], required: true }
                ]
            }
        ]
    },
    {
        id: 'quest_002',
        studyId: 'study_003',
        studyTitle: 'Phase I Rare Disease Trial - Duchenne MD',
        protocol: 'BPS-RARE-101',
        sponsor: 'BioPharma Solutions Inc.',
        sentDate: '2024-09-20',
        dueDate: '2024-10-20',
        status: 'completed',
        priority: 'medium',
        completedDate: '2024-10-10',
        sections: [
            {
                title: 'Site Information',
                questions: [
                    { id: 'q1', question: 'Site Name', type: 'text', required: true, answer: 'City Medical Research Center' },
                    { id: 'q2', question: 'Principal Investigator', type: 'text', required: true, answer: 'Dr. Sarah Johnson' }
                ]
            }
        ]
    }
];

// Demo Sites (for Sponsor/CRO search)
const DEMO_SITES = [
    {
        id: 'site_001',
        name: 'City Medical Research Center',
        location: 'Boston, MA, USA',
        pi: 'Dr. Sarah Johnson',
        rating: 4.8,
        activeStudies: 12,
        completedStudies: 87,
        therapeuticAreas: ['Oncology', 'Cardiology', 'Neurology', 'Diabetes'],
        phases: ['Phase I', 'Phase II', 'Phase III', 'Phase IV'],
        enrollmentCapacity: 500,
        responseRate: 95,
        retentionRate: 92,
        certifications: ['GCP', 'CLIA', 'CAP'],
        lastInspection: '2024-03-15',
        inspectionResult: 'No findings'
    },
    {
        id: 'site_002',
        name: 'Metropolitan Health Institute',
        location: 'New York, NY, USA',
        pi: 'Dr. Robert Williams',
        rating: 4.6,
        activeStudies: 15,
        completedStudies: 102,
        therapeuticAreas: ['Oncology', 'Immunology', 'Infectious Disease'],
        phases: ['Phase I', 'Phase II', 'Phase III'],
        enrollmentCapacity: 600,
        responseRate: 88,
        retentionRate: 90,
        certifications: ['GCP', 'CLIA'],
        lastInspection: '2024-01-20',
        inspectionResult: 'Minor findings'
    },
    {
        id: 'site_003',
        name: 'West Coast Clinical Trials',
        location: 'Los Angeles, CA, USA',
        pi: 'Dr. Emily Davis',
        rating: 4.9,
        activeStudies: 18,
        completedStudies: 145,
        therapeuticAreas: ['Oncology', 'Neurology', 'Psychiatry', 'Pain Management'],
        phases: ['Phase I', 'Phase II', 'Phase III', 'Phase IV'],
        enrollmentCapacity: 750,
        responseRate: 97,
        retentionRate: 94,
        certifications: ['GCP', 'CLIA', 'CAP', 'AAALAC'],
        lastInspection: '2024-05-10',
        inspectionResult: 'No findings'
    },
    {
        id: 'site_004',
        name: 'Midwest Research Associates',
        location: 'Chicago, IL, USA',
        pi: 'Dr. James Anderson',
        rating: 4.5,
        activeStudies: 10,
        completedStudies: 68,
        therapeuticAreas: ['Cardiology', 'Diabetes', 'Respiratory'],
        phases: ['Phase II', 'Phase III', 'Phase IV'],
        enrollmentCapacity: 400,
        responseRate: 85,
        retentionRate: 88,
        certifications: ['GCP', 'CLIA'],
        lastInspection: '2023-11-15',
        inspectionResult: 'No findings'
    },
    {
        id: 'site_005',
        name: 'Southern Clinical Research',
        location: 'Atlanta, GA, USA',
        pi: 'Dr. Maria Garcia',
        rating: 4.7,
        activeStudies: 14,
        completedStudies: 95,
        therapeuticAreas: ['Oncology', 'Rare Diseases', 'Pediatrics'],
        phases: ['Phase I', 'Phase II', 'Phase III'],
        enrollmentCapacity: 550,
        responseRate: 91,
        retentionRate: 93,
        certifications: ['GCP', 'CLIA', 'CAP'],
        lastInspection: '2024-02-28',
        inspectionResult: 'No findings'
    }
];

// Demo Messages
const DEMO_MESSAGES = [
    {
        id: 'msg_001',
        from: 'BioPharma Solutions Inc.',
        fromId: 'sponsor_001',
        subject: 'Questionnaire for BPS-ONC-301',
        preview: 'We have sent you a feasibility questionnaire for our Phase III NSCLC study...',
        date: '2024-10-15',
        read: false,
        body: 'Dear Dr. Johnson,\n\nWe are pleased to invite your site to participate in our Phase III clinical trial for advanced Non-Small Cell Lung Cancer (Protocol BPS-ONC-301).\n\nPlease complete the attached feasibility questionnaire at your earliest convenience. The questionnaire should take approximately 30-45 minutes to complete.\n\nIf you have any questions, please don\'t hesitate to reach out.\n\nBest regards,\nMichael Chen\nClinical Trial Manager'
    },
    {
        id: 'msg_002',
        from: 'Global CRO Partners',
        fromId: 'cro_001',
        subject: 'Site Selection Opportunity',
        preview: 'We are conducting site selection for multiple upcoming studies...',
        date: '2024-10-12',
        read: false,
        body: 'Hello,\n\nGlobal CRO Partners is currently conducting site selection for several upcoming clinical trials across multiple therapeutic areas.\n\nBased on your site\'s capabilities and experience, we believe you would be an excellent fit for these studies.\n\nWould you be available for a brief call next week to discuss potential opportunities?\n\nBest regards,\nJennifer Martinez'
    },
    {
        id: 'msg_003',
        from: 'City Medical Research Center',
        fromId: 'site_001',
        subject: 'Questionnaire Response Submitted',
        preview: 'Thank you for your interest. We have completed the feasibility questionnaire...',
        date: '2024-10-10',
        read: true,
        body: 'Dear Michael,\n\nThank you for considering our site for the BPS-RARE-101 study. We have completed and submitted the feasibility questionnaire.\n\nWe are very interested in participating in this important rare disease trial and believe we have the necessary expertise and patient population.\n\nPlease let us know the next steps in the selection process.\n\nBest regards,\nDr. Sarah Johnson'
    }
];

// Demo Documents
const DEMO_DOCUMENTS = [
    {
        id: 'doc_001',
        name: 'Protocol BPS-ONC-301 v2.0',
        type: 'Protocol',
        size: '2.4 MB',
        uploadDate: '2024-10-01',
        category: 'Study Documents',
        study: 'BPS-ONC-301',
        shared: true
    },
    {
        id: 'doc_002',
        name: 'Investigator Brochure',
        type: 'IB',
        size: '5.8 MB',
        uploadDate: '2024-09-28',
        category: 'Study Documents',
        study: 'BPS-ONC-301',
        shared: true
    },
    {
        id: 'doc_003',
        name: 'Site CV - Dr. Sarah Johnson',
        type: 'CV',
        size: '156 KB',
        uploadDate: '2024-09-15',
        category: 'Site Documents',
        shared: false
    },
    {
        id: 'doc_004',
        name: 'GCP Certificate',
        type: 'Certificate',
        size: '89 KB',
        uploadDate: '2024-08-20',
        category: 'Certifications',
        shared: false
    },
    {
        id: 'doc_005',
        name: 'Site Facilities Photos',
        type: 'Images',
        size: '12.3 MB',
        uploadDate: '2024-08-10',
        category: 'Site Documents',
        shared: true
    }
];

// Demo Notifications
const DEMO_NOTIFICATIONS = [
    {
        id: 'notif_001',
        type: 'questionnaire',
        title: 'New Questionnaire Received',
        message: 'BioPharma Solutions has sent you a questionnaire for BPS-ONC-301',
        date: '2024-10-15',
        read: false,
        action: 'View Questionnaire'
    },
    {
        id: 'notif_002',
        type: 'message',
        title: 'New Message',
        message: 'Global CRO Partners sent you a message',
        date: '2024-10-12',
        read: false,
        action: 'Read Message'
    },
    {
        id: 'notif_003',
        type: 'response',
        title: 'Questionnaire Response Received',
        message: 'City Medical Research Center completed your questionnaire',
        date: '2024-10-10',
        read: true,
        action: 'View Response'
    },
    {
        id: 'notif_004',
        type: 'document',
        title: 'New Document Shared',
        message: 'Protocol amendment uploaded for BPS-ONC-301',
        date: '2024-10-08',
        read: true,
        action: 'View Document'
    },
    {
        id: 'notif_005',
        type: 'system',
        title: 'Profile Update Required',
        message: 'Please update your site capabilities and certifications',
        date: '2024-10-05',
        read: true,
        action: 'Update Profile'
    }
];

// Export data
window.DEMO_DATA = {
    users: DEMO_USERS,
    studies: DEMO_STUDIES,
    questionnaires: DEMO_QUESTIONNAIRES,
    sites: DEMO_SITES,
    messages: DEMO_MESSAGES,
    documents: DEMO_DOCUMENTS,
    notifications: DEMO_NOTIFICATIONS
};