// Firebase Cloud Functions
// This file should be placed in functions/index.js after running firebase init

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Configuration, OpenAIApi } = require('openai');
const sgMail = require('@sendgrid/mail');
const pdfParse = require('pdf-parse');

// Initialize Firebase Admin
admin.initializeApp();

// Initialize OpenAI
const openaiConfig = new Configuration({
    apiKey: functions.config().openai.key
});
const openai = new OpenAIApi(openaiConfig);

// Initialize SendGrid
sgMail.setApiKey(functions.config().sendgrid.key);

// ==================== AI PROTOCOL EXTRACTION ====================

exports.extractProtocolData = functions.https.onCall(async (data, context) => {
    // Verify authentication
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }
    
    try {
        const { protocolText } = data;
        
        // Use OpenAI to extract key information
        const completion = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "You are an expert clinical trial protocol analyzer. Extract key feasibility information from the protocol."
                },
                {
                    role: "user",
                    content: `Analyze this clinical trial protocol and extract the following information in JSON format:
                    
                    1. Study Title
                    2. Phase (I, II, III, IV)
                    3. Therapeutic Area
                    4. Indication/Disease
                    5. Target Enrollment (total number)
                    6. Inclusion Criteria (list)
                    7. Exclusion Criteria (list)
                    8. Study Duration (months)
                    9. Number of Visits
                    10. Primary Endpoint
                    11. Key Procedures (list)
                    12. Special Requirements (equipment, certifications, etc.)
                    
                    Protocol Text:
                    ${protocolText}
                    
                    Return ONLY valid JSON, no additional text.`
                }
            ],
            temperature: 0.3,
            max_tokens: 2000
        });
        
        const extractedData = JSON.parse(completion.data.choices[0].message.content);
        
        return {
            success: true,
            data: extractedData
        };
    } catch (error) {
        console.error('Protocol extraction error:', error);
        throw new functions.https.HttpsError('internal', 'Failed to extract protocol data');
    }
});

// ==================== SITE MATCHING ALGORITHM ====================

exports.matchSites = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }
    
    try {
        const { studyRequirements } = data;
        
        // Get all active sites from Firestore
        const sitesSnapshot = await admin.firestore()
            .collection('sites')
            .where('status', '==', 'active')
            .get();
        
        const sites = [];
        sitesSnapshot.forEach(doc => {
            sites.push({ id: doc.id, ...doc.data() });
        });
        
        // Calculate match score for each site
        const matchedSites = sites.map(site => {
            const score = calculateMatchScore(site, studyRequirements);
            return {
                ...site,
                matchScore: score,
                matchReasons: getMatchReasons(site, studyRequirements, score)
            };
        });
        
        // Sort by match score (highest first)
        matchedSites.sort((a, b) => b.matchScore - a.matchScore);
        
        return {
            success: true,
            sites: matchedSites.slice(0, 20) // Return top 20 matches
        };
    } catch (error) {
        console.error('Site matching error:', error);
        throw new functions.https.HttpsError('internal', 'Failed to match sites');
    }
});

// Helper: Calculate match score (0-100)
function calculateMatchScore(site, requirements) {
    let score = 0;
    let maxScore = 0;
    
    // Therapeutic area match (30 points)
    maxScore += 30;
    if (site.therapeuticAreas && requirements.therapeuticArea) {
        if (site.therapeuticAreas.includes(requirements.therapeuticArea)) {
            score += 30;
        }
    }
    
    // Patient pool (20 points)
    maxScore += 20;
    if (site.patientPool && requirements.targetEnrollment) {
        const ratio = site.patientPool / requirements.targetEnrollment;
        if (ratio >= 5) score += 20;
        else if (ratio >= 3) score += 15;
        else if (ratio >= 2) score += 10;
        else if (ratio >= 1) score += 5;
    }
    
    // Enrollment capacity (15 points)
    maxScore += 15;
    if (site.enrollmentCapacity && requirements.targetEnrollment) {
        const monthlyCapacity = parseInt(site.enrollmentCapacity);
        const studyDuration = requirements.studyDuration || 12;
        const totalCapacity = monthlyCapacity * studyDuration;
        
        if (totalCapacity >= requirements.targetEnrollment) {
            score += 15;
        } else {
            score += (totalCapacity / requirements.targetEnrollment) * 15;
        }
    }
    
    // Experience (15 points)
    maxScore += 15;
    if (site.completedTrials) {
        if (site.completedTrials >= 50) score += 15;
        else if (site.completedTrials >= 25) score += 12;
        else if (site.completedTrials >= 10) score += 9;
        else if (site.completedTrials >= 5) score += 6;
        else score += 3;
    }
    
    // Facilities & Equipment (10 points)
    maxScore += 10;
    if (site.facilities && requirements.requiredFacilities) {
        const matchedFacilities = requirements.requiredFacilities.filter(f => 
            site.facilities.includes(f)
        );
        score += (matchedFacilities.length / requirements.requiredFacilities.length) * 10;
    }
    
    // Certifications (10 points)
    maxScore += 10;
    if (site.certifications && requirements.requiredCertifications) {
        const matchedCerts = requirements.requiredCertifications.filter(c => 
            site.certifications.includes(c)
        );
        score += (matchedCerts.length / requirements.requiredCertifications.length) * 10;
    }
    
    // Normalize to 0-100 scale
    return Math.round((score / maxScore) * 100);
}

// Helper: Get match reasons
function getMatchReasons(site, requirements, score) {
    const reasons = [];
    
    if (score >= 80) {
        reasons.push('Excellent overall match');
    } else if (score >= 60) {
        reasons.push('Good match with some considerations');
    } else {
        reasons.push('Moderate match, review carefully');
    }
    
    if (site.therapeuticAreas && site.therapeuticAreas.includes(requirements.therapeuticArea)) {
        reasons.push(`Experienced in ${requirements.therapeuticArea}`);
    }
    
    if (site.completedTrials >= 25) {
        reasons.push(`Completed ${site.completedTrials}+ trials`);
    }
    
    if (site.patientPool >= requirements.targetEnrollment * 3) {
        reasons.push('Large patient database');
    }
    
    return reasons;
}

// ==================== QUESTIONNAIRE GENERATION ====================

exports.generateQuestionnaire = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }
    
    try {
        const { protocolData } = data;
        
        // Use OpenAI to generate tailored questionnaire
        const completion = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "You are an expert in clinical trial feasibility assessments. Generate comprehensive questionnaires."
                },
                {
                    role: "user",
                    content: `Generate a comprehensive feasibility questionnaire for this clinical trial. Include questions about:
                    
                    1. Site capabilities and experience
                    2. Patient population and recruitment
                    3. Facilities and equipment
                    4. Staff qualifications
                    5. Regulatory and compliance
                    6. Budget and timeline
                    7. Study-specific requirements
                    
                    Study Details:
                    ${JSON.stringify(protocolData, null, 2)}
                    
                    Return a JSON array of questions with this structure:
                    [
                        {
                            "section": "Section Name",
                            "question": "Question text",
                            "type": "text|number|select|multiselect|file",
                            "required": true|false,
                            "options": ["option1", "option2"] // for select/multiselect
                        }
                    ]
                    
                    Generate 40-50 questions. Return ONLY valid JSON.`
                }
            ],
            temperature: 0.5,
            max_tokens: 3000
        });
        
        const questions = JSON.parse(completion.data.choices[0].message.content);
        
        return {
            success: true,
            questions: questions
        };
    } catch (error) {
        console.error('Questionnaire generation error:', error);
        throw new functions.https.HttpsError('internal', 'Failed to generate questionnaire');
    }
});

// ==================== EMAIL NOTIFICATIONS ====================

exports.sendQuestionnaireEmail = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }
    
    try {
        const { siteEmail, siteName, studyTitle, questionnaireUrl } = data;
        
        const msg = {
            to: siteEmail,
            from: functions.config().sendgrid.sender,
            subject: `New Feasibility Questionnaire: ${studyTitle}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #dc2626, #7c3aed); padding: 30px; text-align: center;">
                        <h1 style="color: white; margin: 0;">FeasiQuest℠</h1>
                        <p style="color: white; margin: 10px 0 0 0;">by Clinical Research Pro®</p>
                    </div>
                    
                    <div style="padding: 30px; background: #f8fafc;">
                        <h2 style="color: #1e293b;">New Feasibility Questionnaire</h2>
                        
                        <p>Dear ${siteName},</p>
                        
                        <p>You have been invited to complete a feasibility questionnaire for the following study:</p>
                        
                        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #dc2626; margin-top: 0;">${studyTitle}</h3>
                            <p style="color: #64748b; margin-bottom: 0;">Please review the study details and complete the questionnaire at your earliest convenience.</p>
                        </div>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${questionnaireUrl}" 
                               style="background: linear-gradient(135deg, #dc2626, #7c3aed); 
                                      color: white; 
                                      padding: 15px 40px; 
                                      text-decoration: none; 
                                      border-radius: 8px; 
                                      display: inline-block;
                                      font-weight: 600;">
                                Complete Questionnaire
                            </a>
                        </div>
                        
                        <p style="color: #64748b; font-size: 14px;">
                            If you have any questions, please reply to this email or contact us through the FeasiQuest platform.
                        </p>
                    </div>
                    
                    <div style="background: #1e293b; padding: 20px; text-align: center;">
                        <p style="color: #94a3b8; margin: 0; font-size: 12px;">
                            © 2025 Clinical Research Pro Corporation. All rights reserved.
                        </p>
                    </div>
                </div>
            `
        };
        
        await sgMail.send(msg);
        
        return {
            success: true,
            message: 'Email sent successfully'
        };
    } catch (error) {
        console.error('Email sending error:', error);
        throw new functions.https.HttpsError('internal', 'Failed to send email');
    }
});

// ==================== RESPONSE NOTIFICATION ====================

exports.sendResponseNotification = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }
    
    try {
        const { sponsorEmail, siteName, studyTitle, responseUrl } = data;
        
        const msg = {
            to: sponsorEmail,
            from: functions.config().sendgrid.sender,
            subject: `New Response Received: ${siteName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #dc2626, #7c3aed); padding: 30px; text-align: center;">
                        <h1 style="color: white; margin: 0;">FeasiQuest℠</h1>
                        <p style="color: white; margin: 10px 0 0 0;">by Clinical Research Pro®</p>
                    </div>
                    
                    <div style="padding: 30px; background: #f8fafc;">
                        <h2 style="color: #1e293b;">New Questionnaire Response</h2>
                        
                        <p>${siteName} has completed the feasibility questionnaire for:</p>
                        
                        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #dc2626; margin-top: 0;">${studyTitle}</h3>
                            <p style="color: #64748b; margin-bottom: 0;">Review the response to assess site suitability.</p>
                        </div>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${responseUrl}" 
                               style="background: linear-gradient(135deg, #dc2626, #7c3aed); 
                                      color: white; 
                                      padding: 15px 40px; 
                                      text-decoration: none; 
                                      border-radius: 8px; 
                                      display: inline-block;
                                      font-weight: 600;">
                                View Response
                            </a>
                        </div>
                    </div>
                    
                    <div style="background: #1e293b; padding: 20px; text-align: center;">
                        <p style="color: #94a3b8; margin: 0; font-size: 12px;">
                            © 2025 Clinical Research Pro Corporation. All rights reserved.
                        </p>
                    </div>
                </div>
            `
        };
        
        await sgMail.send(msg);
        
        return {
            success: true,
            message: 'Notification sent successfully'
        };
    } catch (error) {
        console.error('Notification error:', error);
        throw new functions.https.HttpsError('internal', 'Failed to send notification');
    }
});

// ==================== FIRESTORE TRIGGERS ====================

// Trigger when new response is submitted
exports.onResponseSubmitted = functions.firestore
    .document('responses/{responseId}')
    .onUpdate(async (change, context) => {
        const newData = change.after.data();
        const oldData = change.before.data();
        
        // Check if status changed to 'completed'
        if (newData.status === 'completed' && oldData.status !== 'completed') {
            // Get questionnaire and study details
            const questionnaireDoc = await admin.firestore()
                .collection('questionnaires')
                .doc(newData.questionnaireId)
                .get();
            
            const studyDoc = await admin.firestore()
                .collection('studies')
                .doc(questionnaireDoc.data().studyId)
                .get();
            
            // Get sponsor email
            const sponsorDoc = await admin.firestore()
                .collection('users')
                .doc(studyDoc.data().createdBy)
                .get();
            
            // Send notification (you would call sendResponseNotification here)
            console.log('Response submitted notification triggered');
        }
    });

// Trigger when new message is sent
exports.onMessageSent = functions.firestore
    .document('conversations/{conversationId}/messages/{messageId}')
    .onCreate(async (snap, context) => {
        const message = snap.data();
        const conversationId = context.params.conversationId;
        
        // Get conversation details
        const conversationDoc = await admin.firestore()
            .collection('conversations')
            .doc(conversationId)
            .get();
        
        const conversation = conversationDoc.data();
        
        // Update unread count for other participants
        const updates = {};
        conversation.participants.forEach(participantId => {
            if (participantId !== message.senderId) {
                updates[`unreadCount.${participantId}`] = admin.firestore.FieldValue.increment(1);
            }
        });
        
        await conversationDoc.ref.update(updates);
        
        console.log('Message notification triggered');
    });