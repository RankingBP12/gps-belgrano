import { PageHero } from '@/components/shared/PageHero'
import { HowItWorks } from '@/components/home/HowItWorks'
import { PublishCTA } from '@/components/home/PublishCTA'
import { Section, SectionHeader } from '@/components/ui'
import { ShieldCheck, MessageCircle, Wallet, Users } from 'lucide-react'

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Profesionales verificados',
    text: 'Revisamos cada perfil para que contrates con tranquilidad.',
  },
  {
    icon: MessageCircle,
    title: 'Contacto directo',
    text: 'Hablás directo con el profesional, sin intermediarios.',
  },
  {
    icon: Wallet,
    title: 'Sin comisiones',
    text: 'GPS Belgrano es 100% gratuito para vecinos y profesionales.',
  },
  {
    icon: Users,
    title: 'Del barrio',
    text: 'Apoyás a los oficios y comercios de tu propia zona.',
  },
]

export function HowItWorksPage() {
  return (
    <>
      <PageHero
        title="Cómo funciona GPS Belgrano"
        subtitle="Conectamos a los vecinos de Belgrano con los mejores profesionales y servicios en tu barrio, de forma simple y transparente."
      />

      <HowItWorks />

      <Section>
        <SectionHeader
          eyebrow="Por qué elegirnos"
          title="Pensado para el barrio"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border border-line bg-white p-6 shadow-card"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <b.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-semibold text-ink">{b.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {b.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <PublishCTA />
    </>
  )
}
