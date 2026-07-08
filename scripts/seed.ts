/**
 * Script de seed: puebla Firestore con categorías y profesionales de ejemplo.
 *
 * Uso:  npm run seed
 *
 * Requisitos:
 *  - .env.local con las credenciales de Firebase (VITE_FIREBASE_*).
 *  - Reglas de Firestore que permitan escritura (modo de prueba) mientras se ejecuta.
 */
import { config as loadEnv } from 'dotenv'
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  writeBatch,
  doc,
  serverTimestamp,
} from 'firebase/firestore'
import { CATEGORIES, PROFESSIONALS, SCHEDULE } from './seedData'

loadEnv({ path: '.env.local' })

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
}

if (!firebaseConfig.projectId) {
  console.error('❌ Faltan las variables de entorno de Firebase en .env.local')
  process.exit(1)
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function clearCollection(name: string) {
  const snap = await getDocs(collection(db, name))
  if (snap.empty) return
  const batch = writeBatch(db)
  snap.docs.forEach((d) => batch.delete(d.ref))
  await batch.commit()
  console.log(`   🧹 ${name}: ${snap.size} documentos previos eliminados`)
}

async function seed() {
  console.log('🌱 Iniciando seed de GPS Belgrano…\n')

  // Limpieza para poder re-ejecutar sin duplicar.
  await clearCollection('categories')
  await clearCollection('professionals')

  // 1) Categorías
  const catBatch = writeBatch(db)
  const categoryIdBySlug = new Map<string, string>()
  for (const cat of CATEGORIES) {
    const ref = doc(collection(db, 'categories'))
    categoryIdBySlug.set(cat.slug, ref.id)
    catBatch.set(ref, cat)
  }
  await catBatch.commit()
  console.log(`✅ ${CATEGORIES.length} categorías creadas`)

  // 2) Profesionales
  const proBatch = writeBatch(db)
  for (const pro of PROFESSIONALS) {
    const categoryId = categoryIdBySlug.get(pro.categorySlug) ?? ''
    const { categorySlug, ...rest } = pro
    void categorySlug
    const ref = doc(collection(db, 'professionals'))
    proBatch.set(ref, {
      ...rest,
      categoryId,
      schedule: SCHEDULE,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  }
  await proBatch.commit()
  console.log(`✅ ${PROFESSIONALS.length} profesionales creados`)

  console.log('\n🎉 Seed completado. Iniciá la app con: npm run dev')
  process.exit(0)
}

// Falla rápido si Firestore no responde (DB no creada o reglas que bloquean).
const timeout = new Promise<never>((_, reject) =>
  setTimeout(
    () =>
      reject(
        new Error(
          'TIMEOUT: Firestore no respondió en 20s.\n' +
            '   Posibles causas:\n' +
            '   1) La base Firestore aún no fue creada en el proyecto (Consola → Build → Firestore Database → Crear base de datos, modo de prueba).\n' +
            '   2) Las reglas de seguridad bloquean la escritura (poné modo de prueba: allow read, write: if true;).',
        ),
      ),
    20000,
  ),
)

Promise.race([seed(), timeout]).catch((err: unknown) => {
  console.error(
    '\n❌ Error durante el seed:',
    err instanceof Error ? err.message : err,
  )
  process.exit(1)
})
