import { cn } from '@/utils/format'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'whatsapp'
export type ButtonSize = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-600 text-white hover:bg-brand-700 shadow-soft hover:shadow-hover focus-visible:ring-brand-600',
  secondary:
    'bg-brand-50 text-brand-700 hover:bg-brand-100 focus-visible:ring-brand-600',
  ghost: 'text-ink-soft hover:bg-muted hover:text-ink focus-visible:ring-brand-600',
  outline:
    'border border-line bg-white text-ink hover:border-brand-300 hover:text-brand-700 focus-visible:ring-brand-600',
  whatsapp:
    'bg-accent-600 text-white hover:bg-accent-700 shadow-soft hover:shadow-hover focus-visible:ring-accent-600',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'text-sm px-3.5 py-2',
  md: 'text-sm px-5 py-2.5',
  lg: 'text-base px-6 py-3.5',
}

/** Devuelve las clases de botón — reutilizable en <button> y <a>. */
export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  fullWidth = false,
  extra?: string,
): string {
  return cn(base, variants[variant], sizes[size], fullWidth && 'w-full', extra)
}
