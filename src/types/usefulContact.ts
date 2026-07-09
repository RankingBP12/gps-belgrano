import type { Timestamp } from 'firebase/firestore'

/** Dato de interés / contacto útil (policía, bomberos, emergencias, etc.). */
export interface UsefulContact {
  id: string
  name: string
  phone: string
  /** Valor de categoría (ver USEFUL_CATEGORIES). */
  category: string
  description?: string
  address?: string
  order?: number
  active?: boolean
  createdAt?: Timestamp
}

export type NewUsefulContact = Omit<UsefulContact, 'id' | 'createdAt'>
