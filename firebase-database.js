// Firebase Database Module
// Handles all Firestore database operations

class DatabaseManager {
    constructor() {
        this.db = window.firebaseDb;
    }
    
    // ==================== SITES ====================
    
    // Create site profile
    async createSite(siteData) {
        try {
            const siteRef = await this.db.collection('sites').add({
                ...siteData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                status: 'active'
            });
            
            return {
                success: true,
                siteId: siteRef.id,
                message: 'Site profile created successfully'
            };
        } catch (error) {
            console.error('Error creating site:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    // Get site by ID
    async getSite(siteId) {
        try {
            const siteDoc = await this.db.collection('sites').doc(siteId).get();
            
            if (siteDoc.exists) {
                return {
                    success: true,
                    site: { id: siteDoc.id, ...siteDoc.data() }
                };
            } else {
                return {
                    success: false,
                    error: 'Site not found'
                };
            }
        } catch (error) {
            console.error('Error fetching site:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    // Update site profile
    async updateSite(siteId, updates) {
        try {
            await this.db.collection('sites').doc(siteId).update({
                ...updates,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            return {
                success: true,
                message: 'Site profile updated successfully'
            };
        } catch (error) {
            console.error('Error updating site:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    // Search sites
    async searchSites(filters = {}) {
        try {
            let query = this.db.collection('sites');
            
            // Apply filters
            if (filters.therapeuticAreas && filters.therapeuticAreas.length > 0) {
                query = query.where('therapeuticAreas', 'array-contains-any', filters.therapeuticAreas);
            }
            
            if (filters.location) {
                query = query.where('location.state', '==', filters.location);
            }
            
            if (filters.minPatientPool) {
                query = query.where('patientPool', '>=', filters.minPatientPool);
            }
            
            // Execute query
            const snapshot = await query.get();
            
            const sites = [];
            snapshot.forEach(doc => {
                sites.push({ id: doc.id, ...doc.data() });
            });
            
            return {
                success: true,
                sites: sites,
                count: sites.length
            };
        } catch (error) {
            console.error('Error searching sites:', error);
            return {
                success: false,
                error: error.message,
                sites: []
            };
        }
    }
    
    // ==================== STUDIES ====================
    
    // Create study
    async createStudy(studyData) {
        try {
            const studyRef = await this.db.collection('studies').add({
                ...studyData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                status: 'active'
            });
            
            return {
                success: true,
                studyId: studyRef.id,
                message: 'Study created successfully'
            };
        } catch (error) {
            console.error('Error creating study:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    // Get study by ID
    async getStudy(studyId) {
        try {
            const studyDoc = await this.db.collection('studies').doc(studyId).get();
            
            if (studyDoc.exists) {
                return {
                    success: true,
                    study: { id: studyDoc.id, ...studyDoc.data() }
                };
            } else {
                return {
                    success: false,
                    error: 'Study not found'
                };
            }
        } catch (error) {
            console.error('Error fetching study:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    // Get studies for user
    async getUserStudies(userId) {
        try {
            const snapshot = await this.db.collection('studies')
                .where('createdBy', '==', userId)
                .orderBy('createdAt', 'desc')
                .get();
            
            const studies = [];
            snapshot.forEach(doc => {
                studies.push({ id: doc.id, ...doc.data() });
            });
            
            return {
                success: true,
                studies: studies
            };
        } catch (error) {
            console.error('Error fetching user studies:', error);
            return {
                success: false,
                error: error.message,
                studies: []
            };
        }
    }
    
    // ==================== QUESTIONNAIRES ====================
    
    // Create questionnaire
    async createQuestionnaire(questionnaireData) {
        try {
            const qRef = await this.db.collection('questionnaires').add({
                ...questionnaireData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                status: 'active'
            });
            
            return {
                success: true,
                questionnaireId: qRef.id,
                message: 'Questionnaire created successfully'
            };
        } catch (error) {
            console.error('Error creating questionnaire:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    // Send questionnaire to sites
    async sendQuestionnaire(questionnaireId, siteIds) {
        try {
            const batch = this.db.batch();
            
            siteIds.forEach(siteId => {
                const responseRef = this.db.collection('responses').doc();
                batch.set(responseRef, {
                    questionnaireId: questionnaireId,
                    siteId: siteId,
                    status: 'pending',
                    sentAt: firebase.firestore.FieldValue.serverTimestamp(),
                    responses: {}
                });
            });
            
            await batch.commit();
            
            return {
                success: true,
                message: `Questionnaire sent to ${siteIds.length} sites`
            };
        } catch (error) {
            console.error('Error sending questionnaire:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    // ==================== RESPONSES ====================
    
    // Submit questionnaire response
    async submitResponse(responseId, responseData) {
        try {
            await this.db.collection('responses').doc(responseId).update({
                responses: responseData,
                status: 'completed',
                submittedAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            return {
                success: true,
                message: 'Response submitted successfully'
            };
        } catch (error) {
            console.error('Error submitting response:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    // Get responses for questionnaire
    async getQuestionnaireResponses(questionnaireId) {
        try {
            const snapshot = await this.db.collection('responses')
                .where('questionnaireId', '==', questionnaireId)
                .get();
            
            const responses = [];
            snapshot.forEach(doc => {
                responses.push({ id: doc.id, ...doc.data() });
            });
            
            return {
                success: true,
                responses: responses
            };
        } catch (error) {
            console.error('Error fetching responses:', error);
            return {
                success: false,
                error: error.message,
                responses: []
            };
        }
    }
    
    // ==================== MESSAGES ====================
    
    // Create conversation
    async createConversation(participantIds, studyId) {
        try {
            const convRef = await this.db.collection('conversations').add({
                participants: participantIds,
                studyId: studyId,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                lastMessage: null,
                unreadCount: {}
            });
            
            return {
                success: true,
                conversationId: convRef.id
            };
        } catch (error) {
            console.error('Error creating conversation:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    // Send message
    async sendMessage(conversationId, senderId, messageData) {
        try {
            // Add message to messages subcollection
            const messageRef = await this.db.collection('conversations')
                .doc(conversationId)
                .collection('messages')
                .add({
                    senderId: senderId,
                    text: messageData.text,
                    attachments: messageData.attachments || [],
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    read: false
                });
            
            // Update conversation last message
            await this.db.collection('conversations').doc(conversationId).update({
                lastMessage: {
                    text: messageData.text,
                    senderId: senderId,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                },
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            return {
                success: true,
                messageId: messageRef.id
            };
        } catch (error) {
            console.error('Error sending message:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    // Get messages for conversation
    async getMessages(conversationId, limit = 50) {
        try {
            const snapshot = await this.db.collection('conversations')
                .doc(conversationId)
                .collection('messages')
                .orderBy('createdAt', 'desc')
                .limit(limit)
                .get();
            
            const messages = [];
            snapshot.forEach(doc => {
                messages.push({ id: doc.id, ...doc.data() });
            });
            
            return {
                success: true,
                messages: messages.reverse() // Reverse to show oldest first
            };
        } catch (error) {
            console.error('Error fetching messages:', error);
            return {
                success: false,
                error: error.message,
                messages: []
            };
        }
    }
    
    // Listen to messages in real-time
    listenToMessages(conversationId, callback) {
        return this.db.collection('conversations')
            .doc(conversationId)
            .collection('messages')
            .orderBy('createdAt', 'asc')
            .onSnapshot((snapshot) => {
                const messages = [];
                snapshot.forEach(doc => {
                    messages.push({ id: doc.id, ...doc.data() });
                });
                callback(messages);
            });
    }
    
    // Get user conversations
    async getUserConversations(userId) {
        try {
            const snapshot = await this.db.collection('conversations')
                .where('participants', 'array-contains', userId)
                .orderBy('updatedAt', 'desc')
                .get();
            
            const conversations = [];
            snapshot.forEach(doc => {
                conversations.push({ id: doc.id, ...doc.data() });
            });
            
            return {
                success: true,
                conversations: conversations
            };
        } catch (error) {
            console.error('Error fetching conversations:', error);
            return {
                success: false,
                error: error.message,
                conversations: []
            };
        }
    }
    
    // ==================== FILE UPLOADS ====================
    
    // Upload file to storage
    async uploadFile(file, path) {
        try {
            const storageRef = window.firebaseStorage.ref();
            const fileRef = storageRef.child(`${path}/${Date.now()}_${file.name}`);
            
            const snapshot = await fileRef.put(file);
            const downloadURL = await snapshot.ref.getDownloadURL();
            
            return {
                success: true,
                url: downloadURL,
                path: snapshot.ref.fullPath
            };
        } catch (error) {
            console.error('Error uploading file:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    // Delete file from storage
    async deleteFile(filePath) {
        try {
            const storageRef = window.firebaseStorage.ref();
            const fileRef = storageRef.child(filePath);
            
            await fileRef.delete();
            
            return {
                success: true,
                message: 'File deleted successfully'
            };
        } catch (error) {
            console.error('Error deleting file:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

// Initialize database manager
const dbManager = new DatabaseManager();

// Export to window
window.dbManager = dbManager;