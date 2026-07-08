import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Container, buttonClasses } from '@/components/ui'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { NAV_LINKS } from '@/utils/constants'
import { cn } from '@/utils/format'

export function Navbar() {
  const scrolled = useScrollPosition(8)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b bg-white transition-shadow duration-300',
        scrolled ? 'border-line shadow-soft' : 'border-line/70',
      )}
    >
      <Container>
        <nav className="flex h-20 items-center justify-between gap-4">
          <Logo />

          {/* Links centrales (desktop) */}
          <ul className="hidden items-center gap-1 xl:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors',
                      isActive
                        ? 'bg-brand-600 text-white shadow-soft'
                        : 'text-ink hover:bg-muted',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA (desktop) */}
          <div className="hidden items-center gap-3 xl:flex">
            <Link to="/publicar" className={buttonClasses('whatsapp', 'md')}>
              Publicá tu servicio
            </Link>
          </div>

          {/* Botón menú mobile */}
          <button
            className="flex h-11 w-11 items-center justify-center rounded-lg text-ink hover:bg-muted xl:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </Container>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}
