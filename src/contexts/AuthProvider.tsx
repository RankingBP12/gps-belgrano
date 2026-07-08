import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { User as FirebaseUser } from 'firebase/auth'
import { AuthContext, type AuthContextValue } from './AuthContext'
import { signIn, signOut, subscribeToAuth } from '@/services/auth.service'

/**
 * Provee el estado de autenticación a toda la app.
 * Estructura preparada; el flujo de login se activará con el panel admin.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeToAuth((u) => {
      setUser(u)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      login: async (email, password) => {
        await signIn(email, password)
      },
      logout: async () => {
        await signOut()
      },
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
