import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { AdminAuthContext, type AdminAuthContextValue } from './AdminAuthContext'
import { ADMIN_CREDENTIALS, ADMIN_SESSION_KEY } from '@/config/admin'

interface StoredSession {
  user: string
  ts: number
}

/**
 * Provee la sesión del panel admin persistida en localStorage,
 * de modo que la sesión no se cierre al recargar.
 */
export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null)

  // Restaura la sesión guardada al iniciar.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(ADMIN_SESSION_KEY)
      if (raw) {
        const session = JSON.parse(raw) as StoredSession
        if (session?.user) setUser(session.user)
      }
    } catch {
      // Sesión corrupta: la ignoramos.
    }
  }, [])

  const login = useCallback((u: string, password: string): boolean => {
    const ok =
      u.trim() === ADMIN_CREDENTIALS.user &&
      password === ADMIN_CREDENTIALS.password
    if (!ok) return false

    const session: StoredSession = { user: u.trim(), ts: Date.now() }
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session))
    setUser(session.user)
    return true
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(ADMIN_SESSION_KEY)
    setUser(null)
  }, [])

  const value = useMemo<AdminAuthContextValue>(
    () => ({ isAuthed: user !== null, user, login, logout }),
    [user, login, logout],
  )

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  )
}
