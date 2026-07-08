import { Link } from 'react-router-dom'
import { MapPin, Mail, MessageCircle } from 'lucide-react'
import { Container } from '@/components/ui'
import { Logo } from './Logo'
import { NAV_LINKS, BUSINESS_WHATSAPP } from '@/utils/constants'
import { whatsappLink } from '@/utils/whatsapp'

const categoriesQuick = [
  { label: 'Electricistas', to: '/electricistas' },
  { label: 'Plomeros', to: '/plomeros' },
  { label: 'Gasistas', to: '/gasistas' },
  { label: 'Pintores', to: '/pintores' },
  { label: 'Cerrajeros', to: '/cerrajeros' },
]

export function Footer() {
  return (
    <footer className="border-t border-line bg-muted">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              El directorio de profesionales y oficios de confianza del barrio de
              Belgrano y alrededores.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-ink-soft">
              <MapPin className="h-4 w-4 text-brand-600" />
              Belgrano, CABA
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-sm font-semibold text-ink">Navegación</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-ink-soft transition-colors hover:text-brand-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categorías */}
          <div>
            <h3 className="text-sm font-semibold text-ink">Categorías</h3>
            <ul className="mt-4 space-y-2.5">
              {categoriesQuick.map((c) => (
                <li key={c.to}>
                  <Link
                    to={c.to}
                    className="text-sm text-ink-soft transition-colors hover:text-brand-700"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-sm font-semibold text-ink">Contacto</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={whatsappLink(BUSINESS_WHATSAPP, 'Hola! Quiero más info de GPS Belgrano')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-accent-700"
                >
                  <MessageCircle className="h-4 w-4 text-accent-600" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:hola@gpsbelgrano.com"
                  className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-brand-700"
                >
                  <Mail className="h-4 w-4 text-brand-600" />
                  hola@gpsbelgrano.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-sm text-ink-faint sm:flex-row">
          <p>© {new Date().getFullYear()} GPS Belgrano. Todos los derechos reservados.</p>
          <p>Hecho con cariño para el barrio 💙</p>
        </div>
      </Container>
    </footer>
  )
}
