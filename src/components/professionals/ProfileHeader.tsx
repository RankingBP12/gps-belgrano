import { MapPin, ShieldCheck, Circle } from 'lucide-react'
import { Avatar, Badge, Container } from '@/components/ui'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'
import { CallButton } from '@/components/shared/CallButton'
import type { Professional } from '@/types'
import { cn } from '@/utils/format'

export function ProfileHeader({ professional: p }: { professional: Professional }) {
  const message = `Hola ${p.name}! Te contacto desde GPS Belgrano.`

  return (
    <div className="border-b border-line bg-gradient-to-b from-brand-50/50 to-white">
      <Container className="py-10 md:py-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <Avatar src={p.photo} name={p.name} size="xl" className="ring-4" />

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-ink">
                {p.name}
              </h1>
              {p.verified && (
                <Badge variant="verified" icon={<ShieldCheck className="h-3.5 w-3.5" />}>
                  Verificado
                </Badge>
              )}
            </div>

            <p className="mt-1 text-lg font-medium text-brand-600">
              {p.profession ?? 'Profesional'}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-soft">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-ink-faint" />
                {p.zone}, {p.city}
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

          {/* Acciones */}
          <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto md:flex-col lg:flex-row">
            <WhatsAppButton
              phone={p.whatsapp || p.phone}
              message={message}
              size="lg"
            />
            <CallButton phone={p.phone} size="lg" />
          </div>
        </div>
      </Container>
    </div>
  )
}
