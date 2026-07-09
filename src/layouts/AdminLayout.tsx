import { useState } from 'react'
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderTree,
  Users,
  Info,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react'
import { Logo } from '@/components/layout/Logo'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { ADMIN_ROUTES } from '@/config/admin'
import { cn } from '@/utils/format'

const NAV = [
  { to: ADMIN_ROUTES.dashboard, label: 'Estadísticas', icon: LayoutDashboard, end: true },
  { to: ADMIN_ROUTES.categories, label: 'Categorías', icon: FolderTree, end: false },
  { to: ADMIN_ROUTES.professionals, label: 'Profesionales', icon: Users, end: false },
  { to: ADMIN_ROUTES.usefulData, label: 'Datos de interés', icon: Info, end: false },
  { to: ADMIN_ROUTES.settings, label: 'Configuración', icon: Settings, end: false },
]

export function AdminLayout() {
  const { user, logout } = useAdminAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate(ADMIN_ROUTES.login, { replace: true })
  }

  const nav = (
    <nav className="flex flex-1 flex-col gap-1">
      {NAV.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors',
              isActive
                ? 'bg-brand-600 text-white'
                : 'text-ink-soft hover:bg-muted hover:text-ink',
            )
          }
        >
          <item.icon className="h-5 w-5" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  )

  const sidebarBody = (
    <div className="flex h-full flex-col p-5">
      <Logo />
      <div className="mt-8 flex-1">{nav}</div>

      <div className="space-y-1 border-t border-line pt-4">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-muted hover:text-ink"
        >
          <ExternalLink className="h-5 w-5" />
          Ver sitio público
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
          Cerrar sesión
        </button>
        <p className="px-3.5 pt-2 text-xs text-ink-faint">Sesión: {user}</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-muted">
      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-line bg-white lg:block">
        {sidebarBody}
      </aside>

      {/* Topbar mobile */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-white px-4 py-3 lg:hidden">
        <Logo />
        <button
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-muted"
          aria-label="Abrir menú"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Drawer mobile */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 max-w-[85%] bg-white shadow-hover">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg text-ink-soft hover:bg-muted"
              aria-label="Cerrar menú"
            >
              <X className="h-5 w-5" />
            </button>
            {sidebarBody}
          </aside>
        </div>
      )}

      {/* Contenido */}
      <main className="lg:pl-64">
        <div className="mx-auto max-w-6xl p-5 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
