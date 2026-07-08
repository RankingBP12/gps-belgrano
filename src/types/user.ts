import type { Timestamp } from 'firebase/firestore'

export type UserRole = 'admin' | 'professional' | 'client'

export interface AppUser {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt?: Timestamp
}
