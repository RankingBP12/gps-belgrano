import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore'
import { favoritesRef } from '@/firebase/collections'
import { db } from '@/firebase/config'
import { COLLECTIONS } from '@/firebase/collections'
import type { Favorite } from '@/types'

/** Favoritos de un usuario. (Estructura lista para el futuro panel/cliente). */
export async function getFavorites(userId: string): Promise<Favorite[]> {
  const q = query(favoritesRef, where('userId', '==', userId))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ ...d.data(), id: d.id }))
}

export async function addFavorite(
  userId: string,
  professionalId: string,
): Promise<string> {
  const ref = await addDoc(favoritesRef, {
    userId,
    professionalId,
    createdAt: serverTimestamp(),
  } as never)
  return ref.id
}

export async function removeFavorite(favoriteId: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTIONS.favorites, favoriteId))
}
