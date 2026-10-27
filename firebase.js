import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// import.meta.env is Vite-specific — only valid inside Main-Project--.
// This root-level file uses hardcoded values directly.
const firebaseConfig = {
  apiKey: 'AIzaSyAOgFbl8Iea7tvNcBGDWNdVOg9BjkzapC8',
  authDomain: 'zayvoo.firebaseapp.com',
  projectId: 'zayvoo',
  storageBucket: 'zayvoo.firebasestorage.app',
  messagingSenderId: '341311076337',
  appId: '1:341311076337:web:69eab5ee2aeb6b4f53f650',
  measurementId: 'G-KQR4R86YK7',
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const auth = getAuth(app)
export const db = getFirestore(app)

export default app
