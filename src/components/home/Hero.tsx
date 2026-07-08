import { ShieldCheck, Zap, Users, MessageCircle } from 'lucide-react'
import { Container, buttonClasses } from '@/components/ui'
import { SearchBar } from './SearchBar'
import { CityIllustration, BigPin } from '@/components/shared/CityIllustration'
import { whatsappLink } from '@/utils/whatsapp'
import { BUSINESS_WHATSAPP } from '@/utils/constants'

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Profesionales verificados',
    text: 'Revisamos cada perfil.',
  },
  { icon: Zap, title: 'Atención rápida', text: 'Respuesta en minutos.' },
  {
    icon: Users,
    title: 'Recomendados por vecinos',
    text: 'Confianza del barrio.',
  },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <Container className="py-12 md:py-16 lg:pb-28 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[45fr_55fr]">
          {/* Columna izquierda (45%) */}
          <div className="animate-fade-up">
            <p className="text-sm font-bold uppercase tracking-wider text-accent-600">
              Tu guía de profesionales en Belgrano
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

            {/* 3 beneficios */}
            <ul className="mt-8 grid gap-5 sm:grid-cols-3">
              {benefits.map((b) => (
                <li key={b.title} className="flex flex-col gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <b.icon className="h-5 w-5" />
                  </span>
                  <p className="text-sm font-semibold text-ink">{b.title}</p>
                  <p className="-mt-1 text-sm text-ink-soft">{b.text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna derecha (55%) */}
          <div className="relative hidden lg:block">
            <div className="relative">
              <CityIllustration className="rounded-3xl shadow-card ring-1 ring-line" />
              {/* Pin grande superpuesto */}
              <BigPin className="absolute left-1/2 top-6 h-40 w-auto -translate-x-1/2 drop-shadow-xl animate-fade-up" />
            </div>

            {/* Tarjeta flotante WhatsApp (borde verde) */}
            <div className="absolute -bottom-8 left-6 right-6 flex items-center gap-4 rounded-2xl border-2 border-accent-500 bg-white p-4 shadow-hover animate-fade-up">
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
                  BUSINESS_WHATSAPP,
                  'Hola! Necesito ayuda para encontrar un profesional en GPS Belgrano',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses('whatsapp', 'md')}
              >
                Escribir
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
