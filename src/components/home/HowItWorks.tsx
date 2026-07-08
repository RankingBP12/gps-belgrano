import { Search, MousePointerClick, MessageCircle } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui'

const steps = [
  {
    icon: Search,
    title: 'Buscá el servicio',
    description: 'Elegí la categoría o buscá por lo que necesitás resolver.',
  },
  {
    icon: MousePointerClick,
    title: 'Elegí al profesional',
    description: 'Compará perfiles, zona y disponibilidad. Todo transparente.',
  },
  {
    icon: MessageCircle,
    title: 'Contactá directo',
    description: 'Escribí por WhatsApp o llamá. Sin intermediarios ni comisiones.',
  },
]

export function HowItWorks() {
  return (
    <Section muted>
      <SectionHeader
        eyebrow="Cómo funciona"
        title="Tres pasos y listo"
        subtitle="Conectate con el profesional indicado de forma rápida y sencilla."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="relative flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-card"
          >
            <span className="absolute -top-3 left-6 flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
              {i + 1}
            </span>
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <step.icon className="h-7 w-7" />
            </span>
            <h3 className="mt-5 text-lg font-semibold text-ink">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
