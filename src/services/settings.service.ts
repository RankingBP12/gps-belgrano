import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import type { SiteSettings } from '@/types'

/** Documento único de configuración del sitio. */
const settingsDoc = doc(db, 'settings', 'general')

/** Lee la configuración; devuelve null si aún no fue creada. */
export async function getSettings(): Promise<SiteSettings | null> {
  const snap = await getDoc(settingsDoc)
  return snap.exists() ? (snap.data() as SiteSettings) : null
}

/** Guarda (crea o actualiza) la configuración. */
export async function saveSettings(data: SiteSettings): Promise<void> {
  await setDoc(settingsDoc, data, { merge: true })
}
