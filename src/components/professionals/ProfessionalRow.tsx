import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, ShieldCheck, Circle, Star } from 'lucide-react'
import { Badge, buttonClasses } from '@/components/ui'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'
import { CallButton } from '@/components/shared/CallButton'
import type { Professional } from '@/types'
import { cn } from '@/utils/format'

/** Tarjeta horizontal de profesional con 3 columnas (listado de categoría). */
export function ProfessionalRow({ professional: p }: { professional: Professional }) {
  const [imgOk, setImgOk] = useState(true)
  const cover = p.gallery?.[0] ?? p.photo
  const message = `Hola ${p.name}! Te contacto desde GPS Belgrano.`

  return (
    <article className="flex flex-col gap-5 rounded-2xl border border-line bg-white p-4 shadow-card transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-hover sm:flex-row sm:p-5">
      {/* Columna 1: foto */}
      <Link
        to={`/profesional/${p.slug}`}
        className="relative block h-44 w-full shrink-0 overflow-hidden rounded-xl bg-brand-50 sm:h-40 sm:w-44"
      >
        {cover && imgOk ? (
          <img
            src={cover}
            alt={p.name}
            loading="lazy"
            onError={() => setImgOk(false)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-brand-600 text-4xl font-bold text-white">
            {p.name.charAt(0)}
          </div>
        )}
        {p.featured && (
          <span className="absolute left-2 top-2">
            <Badge variant="success" icon={<Star className="h-3 w-3 fill-current" />}>
              Destacado
            </Badge>
          </span>
        )}
      </Link>

      {/* Columna 2: información */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-xl font-bold text-ink">{p.name}</h3>
          {p.verified && (
            <ShieldCheck className="h-5 w-5 shrink-0 text-accent-600" />
          )}
        </div>
        <p className="mt-0.5 font-medium text-brand-600">
          {p.profession ?? 'Profesional'}
        </p>

        {p.services.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.services.slice(0, 4).map((s) => (
              <Badge key={s} variant="muted">
                {s}
              </Badge>
            ))}
            {p.services.length > 4 && (
              <Badge variant="muted">+{p.services.length - 4}</Badge>
            )}
          </div>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-ink-soft">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-ink-faint" />
            {p.zone}
          </span>
          <span
            className={cn(
              'inline-flex items-center gap-1.5 font-medium',
              p.available ? 'text-accent-700' : 'text-ink-faint',
            )}
          >
            <Circle
              className={cn(
                'h-2 w-2 fill-current',
                p.available ? 'text-accent-500' : 'text-ink-faint',
              )}
            />
            {p.available ? 'Disponible ahora' : 'No disponible'}
          </span>
        </div>
      </div>

      {/* Columna 3: acciones */}
      <div className="flex shrink-0 flex-col gap-2 sm:w-48 sm:justify-center">
        <WhatsAppButton
          phone={p.whatsapp || p.phone}
          message={message}
          fullWidth
        />
        <CallButton phone={p.phone} fullWidth />
        <Link
          to={`/profesional/${p.slug}`}
          className={buttonClasses('ghost', 'md', true)}
        >
          Ver perfil completo
        </Link>
      </div>
    </article>
  )
}
