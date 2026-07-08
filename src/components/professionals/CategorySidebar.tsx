import { Check, ShieldCheck, MessageCircle, Zap, CalendarCheck, Lock } from 'lucide-react'
import { WhatsAppCTACard } from '@/components/shared/WhatsAppCTACard'
import { ZONES } from '@/utils/constants'

/** Mini mapa ilustrativo (SVG). */
function MapIllustration() {
  return (
    <svg
      viewBox="0 0 320 140"
      className="h-32 w-full rounded-xl"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="320" height="140" fill="#eef3fb" />
      <path d="M0 40h320M0 90h320M90 0v140M210 0v140" stroke="#d6e2f5" strokeWidth="6" />
      <path d="M0 65h320M150 0v140" stroke="#adc4ea" strokeWidth="3" />
      <circle cx="160" cy="70" r="34" fill="#0A3D91" opacity="0.08" />
      <path
        d="M160 42c-11 0-20 9-20 20 0 14 20 32 20 32s20-18 20-32c0-11-9-20-20-20Z"
        fill="#0A3D91"
      />
      <circle cx="160" cy="62" r="7" fill="#fff" />
    </svg>
  )
}

function CoverageCard() {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
      <h3 className="font-bold text-ink">Zona de cobertura</h3>
      <div className="mt-3">
        <MapIllustration />
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-2">
        {ZONES.map((z) => (
          <li key={z} className="flex items-center gap-1.5 text-sm text-ink-soft">
            <Check className="h-4 w-4 shrink-0 text-accent-600" />
            {z}
          </li>
        ))}
      </ul>
    </div>
  )
}

const benefits = [
  { icon: ShieldCheck, label: 'Profesionales verificados' },
  { icon: MessageCircle, label: 'Contacto directo' },
  { icon: Zap, label: 'Respuesta rápida' },
  { icon: CalendarCheck, label: 'Disponibilidad real' },
]

function BenefitsCard() {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
      <h3 className="font-bold text-ink">¿Por qué GPS Belgrano?</h3>
      <ul className="mt-4 space-y-3">
        {benefits.map((b) => (
          <li key={b.label} className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <b.icon className="h-4 w-4" />
            </span>
            <span className="text-sm font-medium text-ink">{b.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SecurityCard() {
  return (
    <div className="flex gap-3 rounded-2xl border border-line bg-muted p-5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
        <Lock className="h-5 w-5" />
      </span>
      <div>
        <h3 className="text-sm font-bold text-ink">Tu seguridad primero</h3>
        <p className="mt-1 text-xs leading-relaxed text-ink-soft">
          No compartas datos sensibles (contraseñas, códigos, pagos por
          adelantado) fuera de la plataforma.
        </p>
      </div>
    </div>
  )
}

export function CategorySidebar({ categoryName }: { categoryName?: string }) {
  return (
    <div className="space-y-6">
      <CoverageCard />
      <WhatsAppCTACard
        title="¿No encontrás lo que buscás?"
        description={`Escribinos y te ayudamos a encontrar el ${
          categoryName ? categoryName.toLowerCase().replace(/s$/, '') : 'profesional'
        } ideal.`}
      />
      <BenefitsCard />
      <SecurityCard />
    </div>
  )
}
