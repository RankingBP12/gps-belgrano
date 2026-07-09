import { createContext } from 'react'

export interface SettingsContextValue {
  /** WhatsApp resuelto (vacío = oculto). */
  whatsapp: string
  /** Email resuelto (vacío = oculto). */
  email: string
  loading: boolean
  /** Recarga la configuración desde Firestore. */
  refresh: () => Promise<void>
}

export const SettingsContext = createContext<SettingsContextValue | undefined>(
  undefined,
)
