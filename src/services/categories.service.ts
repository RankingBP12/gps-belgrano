import {
  getDocs,
  query,
  where,
  limit,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { categoriesRef, COLLECTIONS } from '@/firebase/collections'
import { db } from '@/firebase/config'
import type { Category } from '@/types'

/**
 * Trae todas las categorías activas ordenadas por `order`.
 * Se filtra y ordena en el cliente para no requerir un índice compuesto
 * (active + order) en Firestore.
 */
export async function getCategories(): Promise<Category[]> {
  const snap = await getDocs(categoriesRef)
  return snap.docs
    .map((d) => ({ ...d.data(), id: d.id }))
    .filter((c) => c.active !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

/** Todas las categorías (incluye inactivas) — para el panel admin. */
export async function getAllCategories(): Promise<Category[]> {
  const snap = await getDocs(categoriesRef)
  return snap.docs
    .map((d) => ({ ...d.data(), id: d.id }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

/** Trae una categoría por su slug. */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const q = query(categoriesRef, where('slug', '==', slug), limit(1))
  const snap = await getDocs(q)
  const doc = snap.docs[0]
  return doc ? { ...doc.data(), id: doc.id } : null
}

/** Crea una categoría. */
export async function createCategory(
  data: Omit<Category, 'id'>,
): Promise<string> {
  const ref = await addDoc(categoriesRef, data as never)
  return ref.id
}

/** Actualiza campos de una categoría. */
export async function updateCategory(
  id: string,
  data: Partial<Category>,
): Promise<void> {
  await updateDoc(doc(db, COLLECTIONS.categories, id), data as never)
}

/** Elimina una categoría. */
export async function deleteCategory(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTIONS.categories, id))
}
