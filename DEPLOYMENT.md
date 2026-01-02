# Deployment Guide

This guide provides step-by-step instructions for deploying the 75 Hard Challenge Tracker.

## Prerequisites

- Firebase project created
- Firebase config added to `src/firebase/config.js`
- Firestore rules deployed
- Node.js 18+ installed

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

1. Open `src/firebase/config.js`
2. Replace placeholder values with your Firebase config
3. Save the file

### 3. Set Firestore Rules

1. Go to Firebase Console > Firestore Database > Rules
2. Copy contents from `firestore.rules`
3. Paste and click "Publish"

### 4. Generate PWA Icons (Optional)

You need these files in the `public` folder:
- `pwa-192x192.png` (192x192px)
- `pwa-512x512.png` (512x512px)
- `apple-touch-icon.png` (180x180px)

**Quick way to generate:**
1. Create a 512x512px icon image
2. Use an online tool like [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator) or [RealFaviconGenerator](https://realfavicongenerator.net/)
3. Download and place files in `public/` folder

## Deployment Options

### Option 1: Vercel (Recommended)

**Via CLI:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts to link project
```

**Via Dashboard:**
1. Go to [vercel.com](https://vercel.com)
2. Import your Git repository
3. Vercel will auto-detect Vite
4. Add environment variables if needed
5. Deploy

**Configuration:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Option 2: Netlify

**Via CLI:**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

**Via Dashboard:**
1. Go to [netlify.com](https://app.netlify.com)
2. Drag and drop the `dist` folder after building
3. Or connect Git repository for continuous deployment

**Note:** The `public/_redirects` file is already included for SPA routing.

### Option 3: Firebase Hosting

**Via CLI:**
```bash
# Install Firebase CLI
npm i -g firebase-tools

# Login
firebase login

# Initialize (select hosting)
firebase init hosting

# When prompted:
# - Public directory: dist
# - Single-page app: Yes
# - Overwrite index.html: No

# Build and deploy
npm run build
firebase deploy --only hosting
```

## Post-Deployment

### 1. Test PWA Installation

**On Android:**
1. Open Chrome
2. Visit your deployed URL
3. Tap menu (3 dots) > "Add to Home screen"

**On iOS:**
1. Open Safari
2. Visit your deployed URL
3. Tap Share button > "Add to Home Screen"

### 2. Verify Firestore Connection

1. Open the app
2. Try toggling a checkbox
3. Check Firebase Console > Firestore to see data update

### 3. Test Offline Mode

1. Install the PWA
2. Turn off internet
3. App should still load (cached)
4. Changes will sync when back online

## Troubleshooting

### Build Fails

- Check Node.js version: `node --version` (should be 18+)
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Check for syntax errors: `npm run build`

### PWA Not Installing

- Ensure HTTPS is enabled (required for PWA)
- Check browser console for errors
- Verify `manifest.json` is accessible
- Check that icons exist in `public/` folder

### Firebase Connection Issues

- Verify config in `src/firebase/config.js`
- Check Firestore rules are published
- Ensure Firestore is enabled in Firebase Console
- Check browser console for Firebase errors

### Routing Issues (404 on refresh)

**Vercel:** `vercel.json` is already configured

**Netlify:** `public/_redirects` is already included

**Firebase:** Ensure "Configure as a single-page app" was selected during init

## Environment Variables (Optional)

If you want to use environment variables instead of hardcoding Firebase config:

1. Create `.env` file:
```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

2. Update `src/firebase/config.js`:
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}
```

3. Add `.env` to `.gitignore` (already included)

## Cost Considerations

All services used are free tier:
- **Firebase:** Free tier includes 50K reads/day, 20K writes/day
- **Vercel:** Free tier includes 100GB bandwidth/month
- **Netlify:** Free tier includes 100GB bandwidth/month

For a 2-person challenge tracker, you'll stay well within free limits.

## Security Notes

- Current Firestore rules allow read/write for all
- Privacy is maintained through obscure URL
- For production, consider adding IP restrictions or authentication
- Never commit Firebase config with real values to public repos

