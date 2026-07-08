import { useEffect, useState } from 'react'
import { getCategoryBySlug } from '@/services/categories.service'
import type { Category } from '@/types'

export function useCategory(slug: string | undefined) {
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      return
    }
    let active = true
    setLoading(true)
    getCategoryBySlug(slug)
      .then((cat) => {
        if (active) {
          setCategory(cat)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        if (active) {
          setError(err instanceof Error ? err.message : 'Error al cargar la categoría')
          setLoading(false)
        }
      })
    return () => {
      active = false
    }
  }, [slug])

  return { category, loading, error }
}
