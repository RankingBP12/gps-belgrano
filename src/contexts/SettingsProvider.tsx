import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { SettingsContext, type SettingsContextValue } from './SettingsContext'
import { getSettings } from '@/services/settings.service'
import { DEFAULT_WHATSAPP, DEFAULT_EMAIL } from '@/utils/constants'

/**
 * Provee la configuración de contacto (WhatsApp/email) a toda la app.
 * Si no hay documento guardado aún, usa los valores por defecto;
 * una vez guardado desde el admin, respeta lo cargado (incluido vacío = oculto).
 */
export function SettingsProvider({ children }: { children: ReactNode }) {
  const [whatsapp, setWhatsapp] = useState(DEFAULT_WHATSAPP)
  const [email, setEmail] = useState(DEFAULT_EMAIL)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    try {
      const s = await getSettings()
      if (s) {
        setWhatsapp(s.whatsapp ?? '')
        setEmail(s.email ?? '')
      }
    } catch {
      // Ante error dejamos los valores por defecto.
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const value = useMemo<SettingsContextValue>(
    () => ({ whatsapp, email, loading, refresh: load }),
    [whatsapp, email, loading, load],
  )

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}
