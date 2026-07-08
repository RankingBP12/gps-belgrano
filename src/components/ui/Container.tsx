import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/format'

/** Contenedor centrado con ancho máximo y padding horizontal responsive. */
export function Container({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8', className)}
      {...props}
    >
      {children}
    </div>
  )
}
