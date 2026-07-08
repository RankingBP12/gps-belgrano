import { createContext } from 'react'

export interface AdminAuthContextValue {
  isAuthed: boolean
  user: string | null
  /** Devuelve true si las credenciales son válidas. */
  login: (user: string, password: string) => boolean
  logout: () => void
}

export const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(
  undefined,
)
