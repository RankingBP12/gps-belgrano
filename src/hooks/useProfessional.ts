import { useEffect, useState } from 'react'
import { getProfessionalBySlug } from '@/services/professionals.service'
import type { Professional } from '@/types'

export function useProfessional(slug: string | undefined) {
  const [professional, setProfessional] = useState<Professional | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      return
    }
    let active = true
    setLoading(true)
    getProfessionalBySlug(slug)
      .then((p) => {
        if (active) {
          setProfessional(p)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        if (active) {
          setError(err instanceof Error ? err.message : 'Error al cargar el perfil')
          setLoading(false)
        }
      })
    return () => {
      active = false
    }
  }, [slug])

  return { professional, loading, error }
}
