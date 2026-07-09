import { MessageCircle } from 'lucide-react'
import { Container, buttonClasses } from '@/components/ui'
import { SearchBar } from './SearchBar'
import { QuickCategories } from './QuickCategories'
import { LocationMap } from '@/components/shared/LocationMap'
import { whatsappLink } from '@/utils/whatsapp'
import { useSettings } from '@/hooks/useSettings'

export function Hero() {
  const { whatsapp } = useSettings()
  return (
    <section className="relative overflow-hidden bg-white">
      <Container className="py-12 md:py-16 lg:pb-28 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[45fr_55fr]">
          {/* Columna izquierda (45%) */}
          <div className="animate-fade-up">
            <p className="text-sm font-bold uppercase tracking-wider text-accent-600">
              Guía de profesionales y servicios de Belgrano
            </p>

            <h1 className="mt-4 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl xl:text-6xl">
              Encontrá al profesional{' '}
              <span className="text-accent-500">ideal</span> para tu hogar
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Electricistas, plomeros, gasistas y muchos oficios más. Gente de
              confianza de tu barrio, a un solo clic.
            </p>

            {/* Buscador grande */}
            <div className="mt-8 max-w-xl">
              <SearchBar variant="hero" />
            </div>

            {/* Accesos rápidos a categorías (visibles al ingresar) */}
            <QuickCategories />
          </div>

          {/* Columna derecha (55%) — visible también en mobile */}
          <div className="relative">
            <LocationMap />

            {/* Tarjeta flotante WhatsApp (borde verde) — solo desktop y si hay WhatsApp */}
            {whatsapp && (
              <div className="absolute -bottom-8 left-6 right-6 hidden items-center gap-4 rounded-2xl border-2 border-accent-500 bg-white p-4 shadow-hover animate-fade-up lg:flex">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                  <MessageCircle className="h-6 w-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-ink">¿No sabés a quién llamar?</p>
                  <p className="text-sm text-ink-soft">
                    Escribinos y te ayudamos a encontrarlo.
                  </p>
                </div>
                <a
                  href={whatsappLink(
                    whatsapp,
                    'Hola! Necesito ayuda para encontrar un profesional en GPS Belgrano',
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses('whatsapp', 'md')}
                >
                  Escribir
                </a>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
