import { doc, getDoc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/config'

const CHALLENGE_DOC_ID = 'challenge'

/**
 * Get the current day number (1-75) based on start date
 */
export function getCurrentDay(startDate) {
  if (!startDate) return 0
  
  const start = new Date(startDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  start.setHours(0, 0, 0, 0)
  
  const diffTime = today - start
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1
  
  if (diffDays < 1) return 0
  if (diffDays > 75) return 75
  
  return diffDays
}

/**
 * Get challenge data from Firestore
 */
export async function getChallengeData() {
  const docRef = doc(db, 'challenges', CHALLENGE_DOC_ID)
  const docSnap = await getDoc(docRef)
  
  if (docSnap.exists()) {
    return docSnap.data()
  }
  
  // Initialize if doesn't exist
  const today = new Date().toISOString().split('T')[0]
  const initialData = {
    startDate: today,
    days: {}
  }
  
  await setDoc(docRef, initialData)
  return initialData
}

/**
 * Subscribe to real-time updates
 */
export function subscribeToChallenge(callback) {
  const docRef = doc(db, 'challenges', CHALLENGE_DOC_ID)
  
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data())
    } else {
      // Initialize if doesn't exist
      const today = new Date().toISOString().split('T')[0]
      const initialData = {
        startDate: today,
        days: {}
      }
      setDoc(docRef, initialData).then(() => {
        callback(initialData)
      })
    }
  })
}

/**
 * Toggle completion for a specific day and user
 */
export async function toggleDayCompletion(dayNumber, userKey) {
  const docRef = doc(db, 'challenges', CHALLENGE_DOC_ID)
  const docSnap = await getDoc(docRef)
  
  if (!docSnap.exists()) {
    throw new Error('Challenge data not found')
  }
  
  const data = docSnap.data()
  const dayKey = dayNumber.toString()
  const currentValue = data.days?.[dayKey]?.[userKey] || false
  
  await updateDoc(docRef, {
    [`days.${dayKey}.${userKey}`]: !currentValue
  })
}

/**
 * Update start date
 */
export async function updateStartDate(newStartDate) {
  const docRef = doc(db, 'challenges', CHALLENGE_DOC_ID)
  await updateDoc(docRef, {
    startDate: newStartDate
  })
}

/**
 * Reset challenge (clear all days)
 */
export async function resetChallenge(newStartDate = null) {
  const docRef = doc(db, 'challenges', CHALLENGE_DOC_ID)
  const startDate = newStartDate || new Date().toISOString().split('T')[0]
  
  await setDoc(docRef, {
    startDate,
    days: {}
  })
}

