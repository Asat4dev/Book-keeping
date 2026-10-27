import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY?.trim() || 'AIzaSyAOgFbl8Iea7tvNcBGDWNdVOg9BjkzapC8',
  authDomain: import.meta.env.VITE_AUTH_DOMAIN?.trim() || 'zayvoo.firebaseapp.com',
  projectId: import.meta.env.VITE_PROJECT_ID?.trim() || 'zayvoo',
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET?.trim() || 'zayvoo.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID?.trim() || '341311076337',
  appId: import.meta.env.VITE_APP_ID?.trim() || '1:341311076337:web:69eab5ee2aeb6b4f53f650',
  measurementId: import.meta.env.VITE_MEASUREMENT_ID?.trim() || 'G-KQR4R86YK7',
}

export const isFirebaseConfigured = true

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const auth = getAuth(app)
export const db = getFirestore(app)

export default app
