import { forwardRef } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import { cn } from '@/utils/format'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ error, className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full rounded-lg border bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-faint transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-600/20',
          error
            ? 'border-red-400 focus:border-red-500'
            : 'border-line focus:border-brand-500',
          className,
        )}
        {...props}
      />
    )
  },
)
