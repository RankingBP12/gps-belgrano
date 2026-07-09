import type { Professional } from '@/types'

/** Máximo de categorías por profesional. */
export const MAX_CATEGORIES = 3

/**
 * Devuelve las categorías de un profesional de forma robusta:
 * usa `categoryIds` (nuevo) y cae en `categoryId` (legacy) si hiciera falta.
 */
export function getCategoryIds(p: Professional): string[] {
  if (p.categoryIds && p.categoryIds.length > 0) return p.categoryIds
  return p.categoryId ? [p.categoryId] : []
}
