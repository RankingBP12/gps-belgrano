import type { Timestamp } from 'firebase/firestore'

export interface Favorite {
  id: string
  userId: string
  professionalId: string
  createdAt?: Timestamp
}
