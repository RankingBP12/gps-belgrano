import { ShieldCheck, MessageCircle, Clock, MapPin } from 'lucide-react'
import { Container } from '@/components/ui'

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Profesionales verificados',
    text: 'Revisamos cada perfil antes de publicarlo.',
  },
  {
    icon: MessageCircle,
    title: 'Contacto directo',
    text: 'Hablás sin intermediarios ni comisiones.',
  },
  {
    icon: Clock,
    title: 'Respuesta rápida',
    text: 'La mayoría responde en pocos minutos.',
  },
  {
    icon: MapPin,
    title: 'Del barrio',
    text: 'Oficios y comercios de tu propia zona.',
  },
]

/** Franja de 4 beneficios antes del footer. */
export function BenefitsStrip() {
  return (
    <section className="border-t border-line bg-muted py-14 md:py-16">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                <b.icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-bold text-ink">{b.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {b.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
