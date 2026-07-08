import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { ADMIN_ROUTES } from '@/config/admin'

/** Protege las rutas del panel: si no hay sesión, redirige al login oculto. */
export function AdminRoute({ children }: { children: ReactNode }) {
  const { isAuthed } = useAdminAuth()
  if (!isAuthed) {
    return <Navigate to={ADMIN_ROUTES.login} replace />
  }
  return <>{children}</>
}
