// Firebase Authentication Module
// Handles user authentication, registration, and session management

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.userRole = null; // 'site', 'sponsor', or 'cro'
        
        // Listen for auth state changes
        if (window.firebaseAuth) {
            window.firebaseAuth.onAuthStateChanged((user) => {
                this.handleAuthStateChange(user);
            });
        }
    }
    
    // Handle auth state changes
    async handleAuthStateChange(user) {
        if (user) {
            this.currentUser = user;
            
            // Get user role from Firestore
            try {
                const userDoc = await window.firebaseDb.collection('users').doc(user.uid).get();
                if (userDoc.exists) {
                    this.userRole = userDoc.data().role;
                    this.updateUIForUser(user, this.userRole);
                }
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        } else {
            this.currentUser = null;
            this.userRole = null;
            this.handleLoggedOut();
        }
    }
    
    // Register new user
    async register(email, password, userData) {
        try {
            // Create user account
            const userCredential = await window.firebaseAuth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            
            // Create user profile in Firestore
            await window.firebaseDb.collection('users').doc(user.uid).set({
                uid: user.uid,
                email: email,
                role: userData.role, // 'site', 'sponsor', or 'cro'
                organizationName: userData.organizationName,
                contactName: userData.contactName,
                phone: userData.phone,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                status: 'active',
                emailVerified: false
            });
            
            // Send verification email
            await user.sendEmailVerification();
            
            return {
                success: true,
                user: user,
                message: 'Registration successful! Please check your email to verify your account.'
            };
        } catch (error) {
            console.error('Registration error:', error);
            return {
                success: false,
                error: error.code,
                message: this.getErrorMessage(error.code)
            };
        }
    }
    
    // Login user
    async login(email, password) {
        try {
            const userCredential = await window.firebaseAuth.signInWithEmailAndPassword(email, password);
            return {
                success: true,
                user: userCredential.user,
                message: 'Login successful!'
            };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                error: error.code,
                message: this.getErrorMessage(error.code)
            };
        }
    }
    
    // Login with Google
    async loginWithGoogle() {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const result = await window.firebaseAuth.signInWithPopup(provider);
            
            // Check if user profile exists, create if not
            const userDoc = await window.firebaseDb.collection('users').doc(result.user.uid).get();
            if (!userDoc.exists) {
                // New user, need to set role
                return {
                    success: true,
                    user: result.user,
                    needsRoleSelection: true,
                    message: 'Please select your role to complete registration.'
                };
            }
            
            return {
                success: true,
                user: result.user,
                message: 'Login successful!'
            };
        } catch (error) {
            console.error('Google login error:', error);
            return {
                success: false,
                error: error.code,
                message: this.getErrorMessage(error.code)
            };
        }
    }
    
    // Logout user
    async logout() {
        try {
            await window.firebaseAuth.signOut();
            return {
                success: true,
                message: 'Logged out successfully'
            };
        } catch (error) {
            console.error('Logout error:', error);
            return {
                success: false,
                error: error.code,
                message: 'Error logging out'
            };
        }
    }
    
    // Reset password
    async resetPassword(email) {
        try {
            await window.firebaseAuth.sendPasswordResetEmail(email);
            return {
                success: true,
                message: 'Password reset email sent! Please check your inbox.'
            };
        } catch (error) {
            console.error('Password reset error:', error);
            return {
                success: false,
                error: error.code,
                message: this.getErrorMessage(error.code)
            };
        }
    }
    
    // Update user profile
    async updateProfile(updates) {
        if (!this.currentUser) {
            return { success: false, message: 'No user logged in' };
        }
        
        try {
            await window.firebaseDb.collection('users').doc(this.currentUser.uid).update({
                ...updates,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            return {
                success: true,
                message: 'Profile updated successfully'
            };
        } catch (error) {
            console.error('Profile update error:', error);
            return {
                success: false,
                error: error.code,
                message: 'Error updating profile'
            };
        }
    }
    
    // Get current user data
    async getCurrentUserData() {
        if (!this.currentUser) {
            return null;
        }
        
        try {
            const userDoc = await window.firebaseDb.collection('users').doc(this.currentUser.uid).get();
            return userDoc.exists ? userDoc.data() : null;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    }
    
    // Check if user is authenticated
    isAuthenticated() {
        return !!this.currentUser;
    }
    
    // Get user role
    getUserRole() {
        return this.userRole;
    }
    
    // Update UI for logged in user
    updateUIForUser(user, role) {
        // Update user menu
        const userAvatar = document.querySelector('.user-avatar');
        const userName = document.querySelector('.user-name');
        
        if (userAvatar) {
            const initials = user.email.substring(0, 2).toUpperCase();
            userAvatar.textContent = initials;
        }
        
        if (userName) {
            userName.textContent = role.charAt(0).toUpperCase() + role.slice(1);
        }
        
        // Show/hide elements based on role
        this.updateUIForRole(role);
    }
    
    // Update UI based on role
    updateUIForRole(role) {
        // Hide/show features based on role
        const sponsorFeatures = document.querySelectorAll('.sponsor-only');
        const siteFeatures = document.querySelectorAll('.site-only');
        const croFeatures = document.querySelectorAll('.cro-only');
        
        sponsorFeatures.forEach(el => {
            el.style.display = role === 'sponsor' ? 'block' : 'none';
        });
        
        siteFeatures.forEach(el => {
            el.style.display = role === 'site' ? 'block' : 'none';
        });
        
        croFeatures.forEach(el => {
            el.style.display = role === 'cro' ? 'block' : 'none';
        });
    }
    
    // Handle logged out state
    handleLoggedOut() {
        // Redirect to login page if on protected page
        const protectedPages = ['app.html', 'protocol-upload.html', 'responses.html', 'messages.html'];
        const currentPage = window.location.pathname.split('/').pop();
        
        if (protectedPages.includes(currentPage)) {
            window.location.href = 'index.html';
        }
    }
    
    // Get user-friendly error messages
    getErrorMessage(errorCode) {
        const errorMessages = {
            'auth/email-already-in-use': 'This email is already registered. Please login instead.',
            'auth/invalid-email': 'Invalid email address.',
            'auth/operation-not-allowed': 'Operation not allowed. Please contact support.',
            'auth/weak-password': 'Password is too weak. Please use at least 6 characters.',
            'auth/user-disabled': 'This account has been disabled. Please contact support.',
            'auth/user-not-found': 'No account found with this email.',
            'auth/wrong-password': 'Incorrect password. Please try again.',
            'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
            'auth/network-request-failed': 'Network error. Please check your connection.',
            'auth/popup-closed-by-user': 'Login popup was closed. Please try again.'
        };
        
        return errorMessages[errorCode] || 'An error occurred. Please try again.';
    }
}

// Initialize auth manager
const authManager = new AuthManager();

// Export to window
window.authManager = authManager;