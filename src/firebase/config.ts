import { initializeApp, getApps, getApp } from 'firebase/app'
import { initializeFirestore, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

// Evita reinicializar en HMR / múltiples imports.
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

// `ignoreUndefinedProperties` evita el error de Firestore cuando un documento
// incluye campos opcionales en `undefined` (ej. schedule al crear un profesional).
function createDb() {
  try {
    return initializeFirestore(app, { ignoreUndefinedProperties: true })
  } catch {
    // En HMR initializeFirestore puede llamarse dos veces: reusamos la instancia.
    return getFirestore(app)
  }
}

export const db = createDb()
export const auth = getAuth(app)
export const storage = getStorage(app)

export default app
