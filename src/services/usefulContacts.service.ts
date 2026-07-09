import {
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'
import { usefulContactsRef, COLLECTIONS } from '@/firebase/collections'
import { db } from '@/firebase/config'
import type { UsefulContact, NewUsefulContact } from '@/types'

/** Trae todos los datos de interés, ordenados por `order` y luego por nombre. */
export async function getUsefulContacts(): Promise<UsefulContact[]> {
  const snap = await getDocs(usefulContactsRef)
  return snap.docs
    .map((d) => ({ ...d.data(), id: d.id }))
    .sort(
      (a, b) =>
        (a.order ?? 0) - (b.order ?? 0) || a.name.localeCompare(b.name, 'es'),
    )
}

export async function createUsefulContact(
  data: NewUsefulContact,
): Promise<string> {
  const ref = await addDoc(usefulContactsRef, {
    ...data,
    createdAt: serverTimestamp(),
  } as never)
  return ref.id
}

export async function updateUsefulContact(
  id: string,
  data: Partial<UsefulContact>,
): Promise<void> {
  await updateDoc(doc(db, COLLECTIONS.usefulContacts, id), data as never)
}

export async function deleteUsefulContact(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTIONS.usefulContacts, id))
}
