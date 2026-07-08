import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Circle } from 'lucide-react'
import { Badge } from '@/components/ui'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'
import type { Professional } from '@/types'
import { cn } from '@/utils/format'

/** Tarjeta compacta con foto horizontal (sección "Servicios destacados"). */
export function ProfessionalCompactCard({
  professional: p,
}: {
  professional: Professional
}) {
  const [imgOk, setImgOk] = useState(true)
  const cover = p.gallery?.[0]
  const message = `Hola ${p.name}! Te contacto desde GPS Belgrano.`

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-hover">
      {/* Foto horizontal */}
      <Link
        to={`/profesional/${p.slug}`}
        className="relative block h-40 overflow-hidden bg-brand-50"
      >
        {cover && imgOk ? (
          <img
            src={cover}
            alt={p.name}
            loading="lazy"
            onError={() => setImgOk(false)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-brand-600 text-3xl font-bold text-white">
            {p.name.charAt(0)}
          </div>
        )}
        {p.available && (
          <span className="absolute right-3 top-3">
            <Badge variant="success" icon={<Circle className="h-2 w-2 fill-current" />}>
              Disponible
            </Badge>
          </span>
        )}
      </Link>

      {/* Info compacta */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-1.5">
          <h3 className="truncate font-bold text-ink">{p.name}</h3>
          {p.verified && <ShieldCheck className="h-4 w-4 shrink-0 text-accent-600" />}
        </div>
        <p className="text-sm font-medium text-brand-600">
          {p.profession ?? 'Profesional'}
        </p>
        <p
          className={cn(
            'mt-1 text-xs',
            p.available ? 'text-accent-700' : 'text-ink-faint',
          )}
        >
          {p.zone}
        </p>

        <div className="mt-4">
          <WhatsAppButton
            phone={p.whatsapp || p.phone}
            message={message}
            size="sm"
            fullWidth
          />
        </div>
      </div>
    </article>
  )
}
