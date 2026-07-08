import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/format'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
  padded?: boolean
}

export function Card({
  hoverable = false,
  padded = true,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-line bg-white shadow-card',
        padded && 'p-6',
        hoverable &&
          'transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-hover hover:border-brand-200',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
