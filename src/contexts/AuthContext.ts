import { createContext } from 'react'
import type { User as FirebaseUser } from 'firebase/auth'

export interface AuthContextValue {
  user: FirebaseUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
