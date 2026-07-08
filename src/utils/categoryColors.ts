import type { CategoryColor } from '@/types'

export interface ColorClasses {
  /** Fondo sólido de la tarjeta / círculo del icono (color pleno, sin degradado). */
  solidBg: string
  /** Fondo suave (tints) para chips o acentos claros. */
  softBg: string
  /** Texto/icono sobre fondo claro. */
  text: string
  /** Botón claro sobre fondo sólido (texto del color). */
  onSolidText: string
}

/**
 * Colores sólidos por categoría (una sola tonalidad, sin degradados).
 * Clases Tailwind literales para que no se purguen.
 */
export const CATEGORY_COLORS: Record<CategoryColor, ColorClasses> = {
  blue: { solidBg: 'bg-blue-600', softBg: 'bg-blue-50', text: 'text-blue-600', onSolidText: 'text-blue-700' },
  amber: { solidBg: 'bg-amber-500', softBg: 'bg-amber-50', text: 'text-amber-600', onSolidText: 'text-amber-700' },
  orange: { solidBg: 'bg-orange-500', softBg: 'bg-orange-50', text: 'text-orange-600', onSolidText: 'text-orange-700' },
  red: { solidBg: 'bg-red-600', softBg: 'bg-red-50', text: 'text-red-600', onSolidText: 'text-red-700' },
  purple: { solidBg: 'bg-purple-600', softBg: 'bg-purple-50', text: 'text-purple-600', onSolidText: 'text-purple-700' },
  cyan: { solidBg: 'bg-cyan-600', softBg: 'bg-cyan-50', text: 'text-cyan-600', onSolidText: 'text-cyan-700' },
  teal: { solidBg: 'bg-teal-600', softBg: 'bg-teal-50', text: 'text-teal-600', onSolidText: 'text-teal-700' },
  green: { solidBg: 'bg-accent-500', softBg: 'bg-accent-50', text: 'text-accent-600', onSolidText: 'text-accent-700' },
  pink: { solidBg: 'bg-pink-600', softBg: 'bg-pink-50', text: 'text-pink-600', onSolidText: 'text-pink-700' },
  indigo: { solidBg: 'bg-brand-800', softBg: 'bg-brand-50', text: 'text-brand-700', onSolidText: 'text-brand-800' },
}

export function getColorClasses(color: CategoryColor): ColorClasses {
  return CATEGORY_COLORS[color] ?? CATEGORY_COLORS.blue
}

/** Lista de tokens de color disponibles (para selectores del panel admin). */
export const CATEGORY_COLOR_TOKENS = Object.keys(
  CATEGORY_COLORS,
) as CategoryColor[]
