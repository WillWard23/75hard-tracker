import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB3pCVqiQJK0bWM33wqUusLIg1qSCdvIcc",
  authDomain: "hard-tracker-959dc.firebaseapp.com",
  projectId: "hard-tracker-959dc",
  storageBucket: "hard-tracker-959dc.firebasestorage.app",
  messagingSenderId: "393278886220",
  appId: "1:393278886220:web:537406922d81d701703fe9",
  measurementId: "G-PGBP6MKBZ9"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

