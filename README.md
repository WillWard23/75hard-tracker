# 75 Hard Challenge Tracker

A Progressive Web App (PWA) for tracking the 75 Hard challenge for two people. Built with React, Vite, Tailwind CSS, and Firebase Firestore.

## Features

- 📱 **Progressive Web App** - Installable on iOS and Android
- 🏠 **Home View** - Shows current day, progress bar, and today's checkboxes
- 📅 **Calendar View** - Visual grid of all 75 days with completion status
- ⚙️ **Settings** - Configure start date and reset challenge
- 🔄 **Real-time Sync** - Data syncs across all devices instantly
- 💾 **Offline Support** - Basic caching for offline access
- 🎨 **Clean UI** - Mobile-first design with Tailwind CSS

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Firebase Firestore** - Database and real-time sync
- **Vite PWA Plugin** - PWA capabilities

## Prerequisites

- Node.js 18+ and npm
- Firebase account (free tier)
- Vercel or Netlify account (free tier)

## Setup Instructions

### 1. Clone and Install

```bash
cd 75hard-tracker
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable **Firestore Database**:
   - Go to Firestore Database
   - Click "Create database"
   - Start in **test mode** (we'll update rules later)
   - Choose a location

4. Get your Firebase config:
   - Go to Project Settings (gear icon)
   - Scroll to "Your apps"
   - Click the web icon (`</>`)
   - Register app and copy the config object

5. Update Firebase config:
   - Open `src/firebase/config.js`
   - Replace the placeholder values with your Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}
```

6. Set Firestore Security Rules:
   - Go to Firestore Database > Rules
   - Copy the contents of `firestore.rules` from this project
   - Paste and publish the rules

### 3. PWA Icons (Optional but Recommended)

Generate PWA icons and place them in the `public` folder:
- `pwa-192x192.png` (192x192px)
- `pwa-512x512.png` (512x512px)
- `apple-touch-icon.png` (180x180px)

You can use tools like:
- [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator)
- [RealFaviconGenerator](https://realfavicongenerator.net/)

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production

```bash
npm run build
```

The `dist` folder will contain the production build.

## Deployment

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to link your project

4. Your app will be live at `https://your-project.vercel.app`

**Note:** For Vercel, you may need to add a `vercel.json` file:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Option 2: Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Build and deploy:
```bash
npm run build
netlify deploy --prod --dir=dist
```

3. Or connect via Netlify Dashboard:
   - Go to [Netlify](https://app.netlify.com/)
   - Drag and drop the `dist` folder
   - Or connect your Git repository

**Note:** For Netlify, create `public/_redirects` file:

```
/*    /index.html   200
```

### Option 3: Firebase Hosting

1. Install Firebase CLI:
```bash
npm i -g firebase-tools
```

2. Login and initialize:
```bash
firebase login
firebase init hosting
```

3. Build and deploy:
```bash
npm run build
firebase deploy --only hosting
```

## How to Use

### Starting a Challenge

1. Go to **Settings**
2. Set the challenge start date
3. Click "Update Start Date"

### Tracking Progress

- **Home View**: Click the checkboxes to mark today's completion
- **Calendar View**: Click any day to toggle completion (currently toggles "Me")
- Both users' progress is tracked independently

### Resetting the Challenge

1. Go to **Settings**
2. Scroll to "Danger Zone"
3. Click "Reset Challenge"
4. Enter a new start date (or leave empty for today)

## Data Structure

The app stores data in Firestore under the `challenges` collection:

```
challenges/
  └── challenge/
      ├── startDate: "2024-01-01"
      └── days/
          ├── "1": { user1: true, user2: false }
          ├── "2": { user1: true, user2: true }
          └── ...
```

## Privacy & Security

- The app uses Firestore security rules that allow read/write access
- Privacy is maintained through:
  - Obscure URL (don't share publicly)
  - Firestore rules can be made more restrictive if needed
- No authentication required (shared document approach)

## Customization

### Change User Labels

Edit `src/components/Home.jsx`:
- Replace "Me" and "Partner" with your preferred labels

### Modify Colors

Edit `tailwind.config.js` to customize the color scheme.

### Adjust Challenge Duration

Change the number `75` in:
- `src/services/challengeService.js` (getCurrentDay function)
- `src/components/Calendar.jsx` (days array)
- `src/components/Home.jsx` (progress calculation)

## Troubleshooting

### Firebase Connection Issues

- Verify your Firebase config in `src/firebase/config.js`
- Check Firestore rules are published
- Ensure Firestore is enabled in Firebase Console

### PWA Not Installing

- Make sure you're using HTTPS (required for PWA)
- Check browser console for errors
- Verify manifest.json is being served correctly

### Build Errors

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)

## License

MIT

## Support

For issues or questions, check the code comments or Firebase/Vercel documentation.

