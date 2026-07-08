import { slugify } from './slugify'
import type { Category } from '@/types'

/**
 * Busca una categoría existente que coincida con el texto ingresado.
 * La comparación es insensible a acentos, mayúsculas y espacios (vía slug).
 * Devuelve la categoría si hay coincidencia exacta, o null si es un rubro nuevo.
 */
export function findMatchingCategory(
  categories: Category[],
  value: string,
): Category | null {
  const s = slugify(value)
  if (!s) return null
  return categories.find((c) => slugify(c.name) === s) ?? null
}
