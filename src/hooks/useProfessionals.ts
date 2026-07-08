import { useEffect, useState } from 'react'
import {
  getFeaturedProfessionals,
  getProfessionalsByCategory,
} from '@/services/professionals.service'
import type { Professional } from '@/types'

interface State {
  professionals: Professional[]
  loading: boolean
  error: string | null
}

const initial: State = { professionals: [], loading: true, error: null }

/** Destacados para la Home. */
export function useFeaturedProfessionals(max = 6) {
  const [state, setState] = useState<State>(initial)

  useEffect(() => {
    let active = true
    getFeaturedProfessionals(max)
      .then((professionals) => {
        if (active) setState({ professionals, loading: false, error: null })
      })
      .catch((err: unknown) => {
        if (active)
          setState({
            professionals: [],
            loading: false,
            error: err instanceof Error ? err.message : 'Error',
          })
      })
    return () => {
      active = false
    }
  }, [max])

  return state
}

/** Profesionales por categoría. */
export function useProfessionalsByCategory(categoryId: string | undefined) {
  const [state, setState] = useState<State>(initial)

  useEffect(() => {
    if (!categoryId) {
      setState({ professionals: [], loading: false, error: null })
      return
    }
    let active = true
    setState((s) => ({ ...s, loading: true }))
    getProfessionalsByCategory(categoryId)
      .then((professionals) => {
        if (active) setState({ professionals, loading: false, error: null })
      })
      .catch((err: unknown) => {
        if (active)
          setState({
            professionals: [],
            loading: false,
            error: err instanceof Error ? err.message : 'Error',
          })
      })
    return () => {
      active = false
    }
  }, [categoryId])

  return state
}
