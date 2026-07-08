import { useContext } from 'react'
import { AdminAuthContext } from '@/contexts/AdminAuthContext'

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) {
    throw new Error('useAdminAuth debe usarse dentro de <AdminAuthProvider>')
  }
  return ctx
}
