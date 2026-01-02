# Firebase Setup Guide

Complete guide for setting up Firebase for the 75 Hard Challenge Tracker.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name (e.g., "75hard-tracker")
4. Disable Google Analytics (optional, not needed for this app)
5. Click "Create project"
6. Wait for project creation to complete

## Step 2: Enable Firestore Database

1. In Firebase Console, click "Firestore Database" in the left menu
2. Click "Create database"
3. Select "Start in test mode" (we'll update rules later)
4. Choose a location (select closest to your users)
5. Click "Enable"

## Step 3: Get Firebase Configuration

1. In Firebase Console, click the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (`</>`)
5. Register app:
   - App nickname: "75 Hard Tracker" (or any name)
   - Firebase Hosting: Not needed (we're using Vercel/Netlify)
   - Click "Register app"
6. Copy the `firebaseConfig` object

## Step 4: Add Config to Project

1. Open `src/firebase/config.js` in your project
2. Replace the placeholder values with your actual config:

```javascript
const firebaseConfig = {
  apiKey: "AIza...", // Your actual API key
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
}
```

3. Save the file

## Step 5: Set Firestore Security Rules

1. In Firebase Console, go to "Firestore Database"
2. Click on the "Rules" tab
3. Copy the contents of `firestore.rules` from this project:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /challenges/{challengeId} {
      allow read, write: if true;
    }
  }
}
```

4. Paste into the rules editor
5. Click "Publish"

**Note:** These rules allow anyone to read/write. For a private app with an obscure URL, this is acceptable. For additional security, you could:
- Add IP restrictions
- Add authentication
- Use Firebase App Check

## Step 6: Test Connection

1. Run the app locally: `npm run dev`
2. Open the app in browser
3. Try toggling a checkbox
4. Go to Firebase Console > Firestore Database > Data
5. You should see a `challenges` collection with a `challenge` document
6. The document should update in real-time when you toggle checkboxes

## Step 7: Verify Data Structure

Your Firestore should have this structure:

```
challenges (collection)
  └── challenge (document)
      ├── startDate: "2024-01-01" (string)
      └── days (map)
          ├── "1": { user1: true, user2: false }
          ├── "2": { user1: true, user2: true }
          └── ...
```

## Troubleshooting

### "Permission denied" error

- Check that Firestore rules are published
- Verify rules allow read/write
- Check browser console for specific error

### "Firebase: Error (auth/)" errors

- Verify all config values are correct
- Check that Firestore is enabled (not just Realtime Database)
- Ensure project ID matches in config

### Data not syncing

- Check browser console for errors
- Verify Firestore is in the correct mode (not locked)
- Check network tab to see if requests are being made

### "Quota exceeded" error

- Free tier includes 50K reads/day and 20K writes/day
- For 2 users tracking 75 days, you'll use ~150 writes/day max
- Well within free tier limits

## Free Tier Limits

Firebase free tier (Spark plan) includes:
- **Firestore:** 50K reads/day, 20K writes/day, 20K deletes/day
- **Storage:** 5GB
- **Bandwidth:** 10GB/month

For this app, you'll stay well within limits:
- Reads: ~2-5 per page load
- Writes: ~2 per checkbox toggle
- Daily usage: < 1000 operations

## Security Considerations

### Current Setup (Open Access)
- Rules allow anyone with the URL to read/write
- Privacy maintained through obscure URL
- Suitable for private use between 2 people

### Enhanced Security (Optional)

If you want more security, you could:

1. **Add Authentication:**
   - Enable Firebase Auth
   - Update rules to require authentication
   - Add login to app

2. **Add IP Restrictions:**
   - Use Firebase App Check
   - Restrict to specific IPs (requires Blaze plan)

3. **Custom Security Rules:**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /challenges/{challengeId} {
         // Only allow updates, not creates
         allow read: if true;
         allow create: if false;
         allow update: if true;
         allow delete: if false;
       }
     }
   }
   ```

## Next Steps

After Firebase is set up:
1. ✅ Test locally
2. ✅ Deploy to Vercel/Netlify
3. ✅ Test PWA installation
4. ✅ Verify real-time sync works across devices

