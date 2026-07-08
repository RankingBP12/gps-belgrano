import type { ReactNode } from 'react'
import { Container } from '@/components/ui'
import { cn } from '@/utils/format'

interface PageHeroProps {
  title: ReactNode
  subtitle?: ReactNode
  /** Clases de gradiente Tailwind (ej. "from-blue-500 to-blue-700"). */
  gradient?: string
  icon?: ReactNode
  children?: ReactNode
}

/** Hero pequeño reutilizable para páginas internas (categoría, publicar, etc.). */
export function PageHero({
  title,
  subtitle,
  gradient = 'from-brand-600 to-brand-800',
  icon,
  children,
}: PageHeroProps) {
  return (
    <div className={cn('bg-gradient-to-br text-white', gradient)}>
      <Container className="py-14 md:py-20">
        <div className="flex flex-col items-start gap-4">
          {icon && (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              {icon}
            </div>
          )}
          <h1 className="text-balance text-3xl font-bold tracking-tight md:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="max-w-2xl text-lg text-white/85">{subtitle}</p>
          )}
          {children}
        </div>
      </Container>
    </div>
  )
}
