import type { ReactNode } from 'react'
import { cn } from '@/utils/format'

type BadgeVariant =
  | 'default'
  | 'brand'
  | 'success'
  | 'verified'
  | 'muted'
  | 'warning'

interface BadgeProps {
  variant?: BadgeVariant
  icon?: ReactNode
  children: ReactNode
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-ink-soft',
  brand: 'bg-brand-50 text-brand-700',
  success: 'bg-accent-50 text-accent-700',
  verified: 'bg-accent-50 text-accent-700 ring-1 ring-accent-200',
  muted: 'bg-muted text-ink-faint',
  warning: 'bg-amber-50 text-amber-700',
}

export function Badge({
  variant = 'default',
  icon,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium',
        variants[variant],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  )
}
