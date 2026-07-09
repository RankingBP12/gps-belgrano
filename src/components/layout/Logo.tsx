import { Link } from 'react-router-dom'
import { cn } from '@/utils/format'

interface LogoProps {
  /** Usa colores claros (para fondos oscuros). */
  light?: boolean
  /** Muestra el subtítulo gris bajo el nombre. */
  withTagline?: boolean
  className?: string
}

/** Marcador de ubicación azul con una casa blanca dentro. */
function PinHouse({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Pin */}
      <path
        d="M20 0C9 0 0 8.7 0 19.4 0 33 20 48 20 48s20-15 20-28.6C40 8.7 31 0 20 0Z"
        fill="currentColor"
      />
      {/* Casa blanca */}
      <path
        d="M20 9.5 30 18v0h-2.6v9.8a1 1 0 0 1-1 1H23V22h-6v6.8h-3.4a1 1 0 0 1-1-1V18H10L20 9.5Z"
        fill="#fff"
      />
    </svg>
  )
}

export function Logo({ light = false, withTagline = true, className }: LogoProps) {
  return (
    <Link
      to="/"
      className={cn('inline-flex items-center gap-2.5', className)}
      aria-label="GPS Belgrano - Inicio"
    >
      <PinHouse className={cn('h-9 w-auto', light ? 'text-white' : 'text-brand-600')} />
      <span className="flex flex-col leading-none">
        <span className="text-xl font-extrabold tracking-tight">
          <span className={light ? 'text-white' : 'text-brand-600'}>GPS</span>{' '}
          <span className={light ? 'text-accent-300' : 'text-accent-500'}>
            Belgrano
          </span>
        </span>
        {withTagline && (
          <span
            className={cn(
              'mt-0.5 text-[11px] font-medium',
              light ? 'text-white/70' : 'text-ink-faint',
            )}
          >
            Profesionales y servicios en tu barrio
          </span>
        )}
      </span>
    </Link>
  )
}
