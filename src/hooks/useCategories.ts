import { useEffect, useState } from 'react'
import { getCategories } from '@/services/categories.service'
import type { Category } from '@/types'

interface State {
  categories: Category[]
  loading: boolean
  error: string | null
}

export function useCategories() {
  const [state, setState] = useState<State>({
    categories: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    let active = true
    getCategories()
      .then((categories) => {
        if (active) setState({ categories, loading: false, error: null })
      })
      .catch((err: unknown) => {
        if (active)
          setState({
            categories: [],
            loading: false,
            error: err instanceof Error ? err.message : 'Error al cargar categorías',
          })
      })
    return () => {
      active = false
    }
  }, [])

  return state
}
