import type { ReactNode } from 'react'
import { cn } from '@/utils/format'

interface StatCardProps {
  label: string
  value: ReactNode
  icon: ReactNode
  /** Clases del color del ícono (bg + text). */
  accent?: string
  hint?: string
}

export function StatCard({
  label,
  value,
  icon,
  accent = 'bg-brand-50 text-brand-600',
  hint,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-ink-soft">{label}</p>
        <span
          className={cn('flex h-10 w-10 items-center justify-center rounded-xl', accent)}
        >
          {icon}
        </span>
      </div>
      <p className="mt-3 text-3xl font-extrabold tracking-tight text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-ink-faint">{hint}</p>}
    </div>
  )
}
