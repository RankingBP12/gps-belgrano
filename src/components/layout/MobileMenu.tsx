import { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import { Button } from '@/components/ui'
import { Logo } from './Logo'
import { NAV_LINKS } from '@/utils/constants'
import { cn } from '@/utils/format'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  // Bloquea el scroll del body cuando el menú está abierto.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-[300px] max-w-[85%] flex-col bg-white shadow-hover transition-transform duration-300 ease-out lg:hidden',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <Logo />
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-muted"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-4">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-4 py-3 text-base font-medium transition-colors',
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-ink-soft hover:bg-muted hover:text-ink',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-col gap-2 border-t border-line p-4">
          <Link to="/publicar" onClick={onClose}>
            <Button variant="whatsapp" fullWidth>
              Publicá tu servicio
            </Button>
          </Link>
        </div>
      </aside>
    </>
  )
}
