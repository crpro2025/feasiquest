# 🔥 Firebase Setup Guide for FeasiQuest

This guide will walk you through setting up Firebase for the FeasiQuest platform.

---

## 📋 Prerequisites

1. **Google Account** - You'll need a Google account to use Firebase
2. **Node.js** - Install Node.js 18+ from https://nodejs.org
3. **Firebase CLI** - Install globally: `npm install -g firebase-tools`

---

## 🚀 Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Add project"**
3. Enter project name: **"feasiquest"** (or your preferred name)
4. Enable Google Analytics (recommended)
5. Click **"Create project"**

---

## 🔧 Step 2: Enable Firebase Services

### 2.1 Enable Authentication

1. In Firebase Console, go to **Build → Authentication**
2. Click **"Get started"**
3. Enable **Email/Password** authentication:
   - Click on "Email/Password"
   - Toggle "Enable"
   - Click "Save"
4. Enable **Google** authentication:
   - Click on "Google"
   - Toggle "Enable"
   - Enter support email
   - Click "Save"

### 2.2 Enable Firestore Database

1. Go to **Build → Firestore Database**
2. Click **"Create database"**
3. Select **"Start in production mode"** (we'll add security rules later)
4. Choose location closest to your users (e.g., us-central1)
5. Click **"Enable"**

### 2.3 Enable Cloud Storage

1. Go to **Build → Storage**
2. Click **"Get started"**
3. Select **"Start in production mode"**
4. Use same location as Firestore
5. Click **"Done"**

### 2.4 Enable Cloud Functions

1. Go to **Build → Functions**
2. Click **"Get started"**
3. Follow the setup instructions
4. Upgrade to **Blaze (Pay as you go)** plan (required for Cloud Functions)
   - Don't worry - you get generous free tier
   - Set up billing alerts to avoid surprises

---

## 🔑 Step 3: Get Firebase Configuration

1. In Firebase Console, click the **gear icon** → **Project settings**
2. Scroll down to **"Your apps"**
3. Click the **Web icon** (</>)
4. Register app name: **"FeasiQuest Web"**
5. Copy the `firebaseConfig` object
6. Open `firebase-config.js` in your project
7. Replace the placeholder values with your actual config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef",
    measurementId: "G-XXXXXXXXXX"
};
```

---

## 📚 Step 4: Set Up Firestore Collections

### 4.1 Create Collections

In Firestore Console, create these collections:

1. **users** - User profiles
2. **sites** - Research site profiles
3. **studies** - Clinical studies
4. **questionnaires** - Feasibility questionnaires
5. **responses** - Questionnaire responses
6. **conversations** - Message conversations
7. **notifications** - User notifications

### 4.2 Add Indexes

Go to **Firestore → Indexes** and create these composite indexes:

**Index 1: Sites Search**
- Collection: `sites`
- Fields: `therapeuticAreas` (Array), `location.state` (Ascending)

**Index 2: User Studies**
- Collection: `studies`
- Fields: `createdBy` (Ascending), `createdAt` (Descending)

**Index 3: User Conversations**
- Collection: `conversations`
- Fields: `participants` (Array), `updatedAt` (Descending)

---

## 🔒 Step 5: Set Up Security Rules

### 5.1 Firestore Security Rules

Go to **Firestore → Rules** and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function getUserRole() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role;
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update: if isOwner(userId);
      allow delete: if isOwner(userId);
    }
    
    // Sites collection
    match /sites/{siteId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && getUserRole() == 'site';
      allow update: if isAuthenticated() && 
        (resource.data.userId == request.auth.uid || getUserRole() == 'sponsor');
      allow delete: if isAuthenticated() && resource.data.userId == request.auth.uid;
    }
    
    // Studies collection
    match /studies/{studyId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && 
        (getUserRole() == 'sponsor' || getUserRole() == 'cro');
      allow update: if isAuthenticated() && resource.data.createdBy == request.auth.uid;
      allow delete: if isAuthenticated() && resource.data.createdBy == request.auth.uid;
    }
    
    // Questionnaires collection
    match /questionnaires/{questionnaireId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && 
        (getUserRole() == 'sponsor' || getUserRole() == 'cro');
      allow update: if isAuthenticated() && resource.data.createdBy == request.auth.uid;
      allow delete: if isAuthenticated() && resource.data.createdBy == request.auth.uid;
    }
    
    // Responses collection
    match /responses/{responseId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() && 
        (resource.data.siteId == request.auth.uid || 
         resource.data.sponsorId == request.auth.uid);
      allow delete: if isAuthenticated() && resource.data.sponsorId == request.auth.uid;
    }
    
    // Conversations collection
    match /conversations/{conversationId} {
      allow read: if isAuthenticated() && 
        request.auth.uid in resource.data.participants;
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() && 
        request.auth.uid in resource.data.participants;
      allow delete: if isAuthenticated() && 
        request.auth.uid in resource.data.participants;
      
      // Messages subcollection
      match /messages/{messageId} {
        allow read: if isAuthenticated() && 
          request.auth.uid in get(/databases/$(database)/documents/conversations/$(conversationId)).data.participants;
        allow create: if isAuthenticated() && 
          request.auth.uid in get(/databases/$(database)/documents/conversations/$(conversationId)).data.participants;
      }
    }
  }
}
```

### 5.2 Storage Security Rules

Go to **Storage → Rules** and paste:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isValidFileSize(maxSizeMB) {
      return request.resource.size < maxSizeMB * 1024 * 1024;
    }
    
    function isValidImageType() {
      return request.resource.contentType.matches('image/.*');
    }
    
    function isValidDocumentType() {
      return request.resource.contentType.matches('application/pdf') ||
             request.resource.contentType.matches('application/msword') ||
             request.resource.contentType.matches('application/vnd.openxmlformats-officedocument.*');
    }
    
    // Protocol uploads
    match /protocols/{userId}/{fileName} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && 
                     request.auth.uid == userId && 
                     isValidDocumentType() && 
                     isValidFileSize(25);
    }
    
    // Site photos
    match /sites/{siteId}/photos/{fileName} {
      allow read: if true; // Public read
      allow write: if isAuthenticated() && 
                     isValidImageType() && 
                     isValidFileSize(10);
    }
    
    // Site videos
    match /sites/{siteId}/videos/{fileName} {
      allow read: if true; // Public read
      allow write: if isAuthenticated() && 
                     request.resource.contentType.matches('video/.*') && 
                     isValidFileSize(100);
    }
    
    // Site documents
    match /sites/{siteId}/documents/{fileName} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && 
                     isValidDocumentType() && 
                     isValidFileSize(25);
    }
    
    // Message attachments
    match /messages/{conversationId}/{fileName} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && 
                     isValidFileSize(25);
    }
  }
}
```

---

## ☁️ Step 6: Set Up Cloud Functions

### 6.1 Initialize Cloud Functions

```bash
# Login to Firebase
firebase login

# Initialize Functions in your project
firebase init functions

# Select:
# - Use an existing project → Select your project
# - Language: JavaScript
# - ESLint: Yes
# - Install dependencies: Yes
```

### 6.2 Install Dependencies

```bash
cd functions
npm install openai@4.20.1
npm install @sendgrid/mail@7.7.0
npm install axios@1.6.2
npm install pdf-parse@1.1.1
```

### 6.3 Set Environment Variables

```bash
# Set OpenAI API key
firebase functions:config:set openai.key="YOUR_OPENAI_API_KEY"

# Set SendGrid API key
firebase functions:config:set sendgrid.key="YOUR_SENDGRID_API_KEY"

# Set SendGrid sender email
firebase functions:config:set sendgrid.sender="noreply@feasiquest.com"
```

### 6.4 Deploy Functions

```bash
firebase deploy --only functions
```

---

## 🌐 Step 7: Update HTML Files

Add Firebase SDK to all HTML files (before closing `</body>` tag):

```html
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-storage-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-functions-compat.js"></script>

<!-- Firebase Configuration -->
<script src="firebase-config.js"></script>
<script src="firebase-auth.js"></script>
<script src="firebase-database.js"></script>
```

---

## 🧪 Step 8: Test the Setup

### 8.1 Test Authentication

1. Open `index.html` in browser
2. Try registering a new account
3. Check Firebase Console → Authentication to see the user
4. Try logging in with the account

### 8.2 Test Database

1. Create a site profile
2. Check Firebase Console → Firestore to see the document
3. Try updating the profile
4. Verify changes in Firestore

### 8.3 Test Storage

1. Upload a photo to a site profile
2. Check Firebase Console → Storage to see the file
3. Verify the file URL works

---

## 💰 Cost Estimates

### Free Tier (Spark Plan)
- Authentication: Unlimited
- Firestore: 50K reads, 20K writes, 20K deletes per day
- Storage: 5GB, 1GB downloads per day
- Functions: 125K invocations, 40K GB-seconds per month

### Paid Tier (Blaze Plan)
**Estimated Monthly Costs for 100 Active Users:**
- Firestore: ~$5-10
- Storage: ~$2-5
- Functions: ~$5-10
- OpenAI API: ~$50-100 (depends on usage)
- SendGrid: $15 (Essentials plan)
- **Total: ~$77-140/month**

**Estimated Monthly Costs for 1,000 Active Users:**
- Firestore: ~$50-100
- Storage: ~$20-40
- Functions: ~$50-100
- OpenAI API: ~$500-1,000
- SendGrid: $90 (Pro plan)
- **Total: ~$710-1,330/month**

---

## 🔐 Security Best Practices

1. **Never commit firebase-config.js** to public repositories
2. **Enable App Check** to prevent abuse
3. **Set up billing alerts** in Google Cloud Console
4. **Monitor usage** regularly in Firebase Console
5. **Use environment variables** for sensitive data
6. **Enable 2FA** on your Firebase account
7. **Regularly review security rules**

---

## 🆘 Troubleshooting

### Issue: "Firebase not defined"
**Solution:** Make sure Firebase SDK scripts are loaded before your custom scripts

### Issue: "Permission denied" errors
**Solution:** Check Firestore security rules and ensure user is authenticated

### Issue: "Storage upload fails"
**Solution:** Verify Storage security rules and file size limits

### Issue: "Cloud Functions timeout"
**Solution:** Increase timeout in function configuration (max 540s)

### Issue: "CORS errors"
**Solution:** Configure CORS in Cloud Functions or use Firebase Hosting

---

## 📞 Support

- **Firebase Documentation:** https://firebase.google.com/docs
- **Firebase Support:** https://firebase.google.com/support
- **Stack Overflow:** Tag questions with `firebase`

---

## ✅ Checklist

- [ ] Firebase project created
- [ ] Authentication enabled (Email/Password + Google)
- [ ] Firestore database created
- [ ] Cloud Storage enabled
- [ ] Cloud Functions set up
- [ ] Firebase config added to project
- [ ] Security rules configured
- [ ] Indexes created
- [ ] Environment variables set
- [ ] Cloud Functions deployed
- [ ] HTML files updated with Firebase SDK
- [ ] Authentication tested
- [ ] Database operations tested
- [ ] File uploads tested
- [ ] Billing alerts configured

---

**Status:** Ready to implement
**Estimated Setup Time:** 2-3 hours
**Next Step:** Follow this guide step-by-step to set up Firebase