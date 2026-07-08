import { forwardRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/format'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode
  rightSlot?: ReactNode
  error?: boolean
  sizeVariant?: 'md' | 'lg'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { leftIcon, rightSlot, error, sizeVariant = 'md', className, ...props },
  ref,
) {
  const height = sizeVariant === 'lg' ? 'h-14 text-base' : 'h-11 text-sm'
  return (
    <div className="relative flex items-center">
      {leftIcon && (
        <span className="pointer-events-none absolute left-4 text-ink-faint">
          {leftIcon}
        </span>
      )}
      <input
        ref={ref}
        className={cn(
          'w-full rounded-lg border bg-white text-ink placeholder:text-ink-faint transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-600/20',
          height,
          leftIcon ? 'pl-11' : 'pl-4',
          rightSlot ? 'pr-28' : 'pr-4',
          error
            ? 'border-red-400 focus:border-red-500'
            : 'border-line focus:border-brand-500',
          className,
        )}
        {...props}
      />
      {rightSlot && <div className="absolute right-1.5">{rightSlot}</div>}
    </div>
  )
})
