import type { Timestamp } from 'firebase/firestore'

export interface DaySchedule {
  /** 0 = Domingo ... 6 = Sábado */
  day: number
  label: string
  open: string // "08:00"
  close: string // "18:00"
  closed?: boolean
}

export interface Professional {
  id: string
  name: string
  slug: string
  /** Categorías a las que pertenece el profesional (hasta 3). */
  categoryIds: string[]
  /** Legacy: categoría única (compatibilidad con datos anteriores). */
  categoryId?: string
  /** Denormalizado para mostrar la profesión sin joins. */
  profession?: string
  description: string
  phone: string
  whatsapp: string
  email: string
  photo: string
  gallery: string[]
  city: string
  zone: string
  services: string[]
  schedule?: DaySchedule[]
  available: boolean
  verified: boolean
  featured: boolean
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

/** Payload para crear un profesional (sin campos autogenerados). */
export type NewProfessional = Omit<Professional, 'id' | 'createdAt' | 'updatedAt'>
