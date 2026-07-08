import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/format'
import { Container } from './Container'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  muted?: boolean
  /** Renderiza el contenido dentro de un Container. */
  contained?: boolean
}

export function Section({
  muted = false,
  contained = true,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn('py-16 md:py-24', muted && 'bg-muted', className)}
      {...props}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  )
}

interface SectionHeaderProps {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12 max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
      )}
    >
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600">
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance text-3xl font-bold tracking-tight text-ink md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{subtitle}</p>
      )}
    </div>
  )
}
