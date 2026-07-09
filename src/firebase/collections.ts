import {
  collection,
  type CollectionReference,
  type DocumentData,
} from 'firebase/firestore'
import { db } from './config'
import type {
  Category,
  Professional,
  AppUser,
  ServiceRequest,
  Favorite,
  UsefulContact,
} from '@/types'

/** Nombres de colecciones centralizados. */
export const COLLECTIONS = {
  categories: 'categories',
  professionals: 'professionals',
  users: 'users',
  requests: 'requests',
  favorites: 'favorites',
  usefulContacts: 'usefulContacts',
} as const

/** Helper para obtener una referencia de colección tipada. */
function typedCollection<T = DocumentData>(name: string): CollectionReference<T> {
  return collection(db, name) as CollectionReference<T>
}

export const categoriesRef = typedCollection<Category>(COLLECTIONS.categories)
export const professionalsRef = typedCollection<Professional>(COLLECTIONS.professionals)
export const usersRef = typedCollection<AppUser>(COLLECTIONS.users)
export const requestsRef = typedCollection<ServiceRequest>(COLLECTIONS.requests)
export const favoritesRef = typedCollection<Favorite>(COLLECTIONS.favorites)
export const usefulContactsRef = typedCollection<UsefulContact>(
  COLLECTIONS.usefulContacts,
)
