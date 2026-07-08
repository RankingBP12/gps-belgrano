import {
  getDocs,
  query,
  where,
  limit as fbLimit,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  type QuerySnapshot,
} from 'firebase/firestore'
import { professionalsRef, COLLECTIONS } from '@/firebase/collections'
import { db } from '@/firebase/config'
import type { Professional, NewProfessional } from '@/types'

function mapDocs(snap: QuerySnapshot<Professional>): Professional[] {
  return snap.docs.map((d) => ({ ...d.data(), id: d.id }))
}

/** Todos los profesionales (para el panel admin), ordenados por nombre. */
export async function getAllProfessionals(): Promise<Professional[]> {
  const snap = await getDocs(professionalsRef)
  return mapDocs(snap).sort((a, b) => a.name.localeCompare(b.name))
}

/** Crea un profesional. */
export async function createProfessional(
  data: NewProfessional,
): Promise<string> {
  const ref = await addDoc(professionalsRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  } as never)
  return ref.id
}

/** Actualiza campos de un profesional. */
export async function updateProfessional(
  id: string,
  data: Partial<Professional>,
): Promise<void> {
  await updateDoc(doc(db, COLLECTIONS.professionals, id), {
    ...data,
    updatedAt: serverTimestamp(),
  } as never)
}

/** Elimina un profesional. */
export async function deleteProfessional(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTIONS.professionals, id))
}

/** Profesionales destacados para la Home. */
export async function getFeaturedProfessionals(max = 6): Promise<Professional[]> {
  const q = query(
    professionalsRef,
    where('featured', '==', true),
    fbLimit(max),
  )
  return mapDocs(await getDocs(q))
}

/**
 * Profesionales de una categoría (por id).
 * Se ordena en el cliente para no requerir un índice compuesto
 * (categoryId + name) en Firestore.
 */
export async function getProfessionalsByCategory(
  categoryId: string,
): Promise<Professional[]> {
  const q = query(professionalsRef, where('categoryId', '==', categoryId))
  const list = mapDocs(await getDocs(q))
  return list.sort((a, b) => a.name.localeCompare(b.name))
}

/** Perfil individual por slug. */
export async function getProfessionalBySlug(
  slug: string,
): Promise<Professional | null> {
  const q = query(professionalsRef, where('slug', '==', slug), fbLimit(1))
  const snap = await getDocs(q)
  const doc = snap.docs[0]
  return doc ? { ...doc.data(), id: doc.id } : null
}

/** Búsqueda simple client-side por nombre/servicios (MVP, sin índice de texto). */
export async function searchProfessionals(term: string): Promise<Professional[]> {
  const snap = await getDocs(query(professionalsRef, fbLimit(50)))
  const all = mapDocs(snap)
  const t = term.trim().toLowerCase()
  if (!t) return all
  return all.filter(
    (p) =>
      p.name.toLowerCase().includes(t) ||
      p.services.some((s) => s.toLowerCase().includes(t)) ||
      (p.profession ?? '').toLowerCase().includes(t),
  )
}
