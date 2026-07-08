import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Lock, User, ShieldCheck } from 'lucide-react'
import { Input, Button } from '@/components/ui'
import { FilterField } from '@/components/filters/FilterField'
import { Logo } from '@/components/layout/Logo'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { ADMIN_ROUTES } from '@/config/admin'

export function AdminLoginPage() {
  const { login, isAuthed } = useAdminAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ user: '', password: '' })
  const [error, setError] = useState<string | null>(null)

  // Si ya hay sesión, va directo al panel.
  if (isAuthed) {
    return <Navigate to={ADMIN_ROUTES.dashboard} replace />
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    const ok = login(form.user, form.password)
    if (ok) {
      navigate(ADMIN_ROUTES.dashboard, { replace: true })
    } else {
      setError('Usuario o contraseña incorrectos.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center">
          <Logo />
        </div>

        <div className="mt-8 rounded-2xl border border-line bg-white p-7 shadow-card">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-lg font-bold text-ink">Panel de administración</h1>
              <p className="text-sm text-ink-soft">Acceso restringido</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <FilterField label="Usuario">
              <Input
                value={form.user}
                onChange={(e) => setForm((f) => ({ ...f, user: e.target.value }))}
                placeholder="admin"
                leftIcon={<User className="h-4 w-4" />}
                autoComplete="username"
                required
              />
            </FilterField>

            <FilterField label="Contraseña">
              <Input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                placeholder="••••••••"
                leftIcon={<Lock className="h-4 w-4" />}
                autoComplete="current-password"
                required
              />
            </FilterField>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button type="submit" fullWidth size="lg">
              Ingresar
            </Button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-ink-faint">
          La sesión queda guardada en este dispositivo.
        </p>
      </div>
    </div>
  )
}
