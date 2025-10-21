/**
 * FeasiQuest Authentication System
 * Handles user registration, login, session management, and profiles
 */

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.users = this.loadUsers();
        this.sessions = this.loadSessions();
        this.init();
    }

    init() {
        // Check for existing session
        const sessionToken = localStorage.getItem('feasiquest_session');
        if (sessionToken) {
            this.validateSession(sessionToken);
        }
    }

    // Load users from localStorage
    loadUsers() {
        const users = localStorage.getItem('feasiquest_users');
        return users ? JSON.parse(users) : {};
    }

    // Save users to localStorage
    saveUsers() {
        localStorage.setItem('feasiquest_users', JSON.stringify(this.users));
    }

    // Load sessions from localStorage
    loadSessions() {
        const sessions = localStorage.getItem('feasiquest_sessions');
        return sessions ? JSON.parse(sessions) : {};
    }

    // Save sessions to localStorage
    saveSessions() {
        localStorage.setItem('feasiquest_sessions', JSON.stringify(this.sessions));
    }

    // Generate unique user ID
    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Generate session token
    generateSessionToken() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 16);
    }

    // Hash password (simple implementation - in production use bcrypt)
    hashPassword(password) {
        // Simple hash for demo - use proper hashing in production
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(36);
    }

    // Register new user
    register(email, password, firstName, lastName, organization = '') {
        // Validate input
        if (!email || !password || !firstName || !lastName) {
            return { success: false, error: 'All fields are required' };
        }

        // Check if email already exists
        if (this.users[email]) {
            return { success: false, error: 'Email already registered' };
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { success: false, error: 'Invalid email format' };
        }

        // Validate password strength
        if (password.length < 6) {
            return { success: false, error: 'Password must be at least 6 characters' };
        }

        // Create user
        const userId = this.generateUserId();
        const user = {
            id: userId,
            email: email,
            password: this.hashPassword(password),
            firstName: firstName,
            lastName: lastName,
            organization: organization,
            createdAt: new Date().toISOString(),
            lastLogin: null,
            profile: {
                role: 'Clinical Research Professional',
                experience: 'Beginner',
                interests: [],
                avatar: this.generateAvatar(firstName, lastName)
            },
            progress: {
                modulesCompleted: [],
                xp: 0,
                level: 1,
                badges: [],
                assessmentScores: {},
                totalTimeSpent: 0,
                lastActive: new Date().toISOString()
            },
            settings: {
                emailNotifications: true,
                theme: 'light',
                language: 'en'
            }
        };

        this.users[email] = user;
        this.saveUsers();

        return { success: true, userId: userId, message: 'Registration successful' };
    }

    // Login user
    login(email, password) {
        // Validate input
        if (!email || !password) {
            return { success: false, error: 'Email and password are required' };
        }

        // Check if user exists
        const user = this.users[email];
        if (!user) {
            return { success: false, error: 'Invalid email or password' };
        }

        // Verify password
        if (user.password !== this.hashPassword(password)) {
            return { success: false, error: 'Invalid email or password' };
        }

        // Create session
        const sessionToken = this.generateSessionToken();
        const session = {
            userId: user.id,
            email: email,
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
            lastActivity: new Date().toISOString()
        };

        this.sessions[sessionToken] = session;
        this.saveSessions();

        // Update user last login
        user.lastLogin = new Date().toISOString();
        this.saveUsers();

        // Store session token
        localStorage.setItem('feasiquest_session', sessionToken);

        // Set current user
        this.currentUser = user;

        return { 
            success: true, 
            sessionToken: sessionToken,
            user: this.getSafeUserData(user),
            message: 'Login successful' 
        };
    }

    // Validate session
    validateSession(sessionToken) {
        const session = this.sessions[sessionToken];
        
        if (!session) {
            this.logout();
            return false;
        }

        // Check if session expired
        if (new Date(session.expiresAt) < new Date()) {
            delete this.sessions[sessionToken];
            this.saveSessions();
            this.logout();
            return false;
        }

        // Update last activity
        session.lastActivity = new Date().toISOString();
        this.saveSessions();

        // Load user
        const user = this.users[session.email];
        if (user) {
            this.currentUser = user;
            return true;
        }

        return false;
    }

    // Logout user
    logout() {
        const sessionToken = localStorage.getItem('feasiquest_session');
        if (sessionToken && this.sessions[sessionToken]) {
            delete this.sessions[sessionToken];
            this.saveSessions();
        }
        
        localStorage.removeItem('feasiquest_session');
        this.currentUser = null;
        
        return { success: true, message: 'Logged out successfully' };
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser ? this.getSafeUserData(this.currentUser) : null;
    }

    // Get safe user data (without password)
    getSafeUserData(user) {
        const { password, ...safeUser } = user;
        return safeUser;
    }

    // Update user profile
    updateProfile(updates) {
        if (!this.currentUser) {
            return { success: false, error: 'Not authenticated' };
        }

        const allowedFields = ['firstName', 'lastName', 'organization', 'profile', 'settings'];
        
        for (const [key, value] of Object.entries(updates)) {
            if (allowedFields.includes(key)) {
                if (key === 'profile' || key === 'settings') {
                    this.currentUser[key] = { ...this.currentUser[key], ...value };
                } else {
                    this.currentUser[key] = value;
                }
            }
        }

        this.users[this.currentUser.email] = this.currentUser;
        this.saveUsers();

        return { success: true, user: this.getSafeUserData(this.currentUser) };
    }

    // Update user progress
    updateProgress(progressData) {
        if (!this.currentUser) {
            return { success: false, error: 'Not authenticated' };
        }

        this.currentUser.progress = { ...this.currentUser.progress, ...progressData };
        this.currentUser.progress.lastActive = new Date().toISOString();
        
        this.users[this.currentUser.email] = this.currentUser;
        this.saveUsers();

        return { success: true, progress: this.currentUser.progress };
    }

    // Reset password
    resetPassword(email) {
        if (!this.users[email]) {
            return { success: false, error: 'Email not found' };
        }

        // In production, send email with reset link
        // For demo, generate temporary password
        const tempPassword = 'temp' + Math.random().toString(36).substr(2, 8);
        this.users[email].password = this.hashPassword(tempPassword);
        this.saveUsers();

        return { 
            success: true, 
            message: 'Password reset successful',
            tempPassword: tempPassword // In production, don't return this
        };
    }

    // Change password
    changePassword(currentPassword, newPassword) {
        if (!this.currentUser) {
            return { success: false, error: 'Not authenticated' };
        }

        // Verify current password
        if (this.currentUser.password !== this.hashPassword(currentPassword)) {
            return { success: false, error: 'Current password is incorrect' };
        }

        // Validate new password
        if (newPassword.length < 6) {
            return { success: false, error: 'New password must be at least 6 characters' };
        }

        // Update password
        this.currentUser.password = this.hashPassword(newPassword);
        this.users[this.currentUser.email] = this.currentUser;
        this.saveUsers();

        return { success: true, message: 'Password changed successfully' };
    }

    // Generate avatar initials
    generateAvatar(firstName, lastName) {
        const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return {
            initials: initials,
            color: color
        };
    }

    // Check if user is authenticated
    isAuthenticated() {
        return this.currentUser !== null;
    }

    // Get all users (admin only)
    getAllUsers() {
        if (!this.currentUser || this.currentUser.profile.role !== 'Admin') {
            return { success: false, error: 'Unauthorized' };
        }

        const users = Object.values(this.users).map(user => this.getSafeUserData(user));
        return { success: true, users: users };
    }

    // Delete account
    deleteAccount(password) {
        if (!this.currentUser) {
            return { success: false, error: 'Not authenticated' };
        }

        // Verify password
        if (this.currentUser.password !== this.hashPassword(password)) {
            return { success: false, error: 'Incorrect password' };
        }

        const email = this.currentUser.email;
        delete this.users[email];
        this.saveUsers();
        this.logout();

        return { success: true, message: 'Account deleted successfully' };
    }
}

// Initialize auth system
const authSystem = new AuthSystem();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthSystem;
}