import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import {
  MessageCircle,
  Mail,
  Save,
  Trash2,
  CheckCircle2,
} from 'lucide-react'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { Input, Button } from '@/components/ui'
import { FilterField } from '@/components/filters/FilterField'
import { useSettings } from '@/hooks/useSettings'
import { saveSettings } from '@/services/settings.service'

export function AdminSettingsPage() {
  const { whatsapp, email, loading, refresh } = useSettings()
  const [form, setForm] = useState({ whatsapp: '', email: '' })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Precarga con los valores actuales.
  useEffect(() => {
    if (!loading) setForm({ whatsapp, email })
  }, [loading, whatsapp, email])

  const persist = async (values: { whatsapp: string; email: string }) => {
    setSaving(true)
    setError(null)
    setSaved(false)
    try {
      await saveSettings({
        whatsapp: values.whatsapp.trim(),
        email: values.email.trim(),
      })
      await refresh()
      setForm(values)
      setSaved(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar')
    } finally {
      setSaving(false)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    void persist(form)
  }

  const clearField = (field: 'whatsapp' | 'email') => {
    const next = { ...form, [field]: '' }
    setForm(next)
    void persist(next)
  }

  return (
    <>
      <AdminPageHeader
        title="Configuración"
        subtitle="Datos de contacto que se muestran en toda la página"
      />

      <div className="max-w-xl rounded-2xl border border-line bg-white p-6 shadow-card">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* WhatsApp */}
          <div>
            <FilterField label="WhatsApp del negocio">
              <Input
                value={form.whatsapp}
                onChange={(e) =>
                  setForm((f) => ({ ...f, whatsapp: e.target.value }))
                }
                placeholder="Ej: 5492494123456 (con código de país, sin +)"
                leftIcon={<MessageCircle className="h-4 w-4" />}
              />
            </FilterField>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-xs text-ink-faint">
                Se usa en todos los botones de WhatsApp. Vacío = se ocultan.
              </p>
              {form.whatsapp && (
                <button
                  type="button"
                  onClick={() => clearField('whatsapp')}
                  className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:underline"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Borrar
                </button>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <FilterField label="Email de contacto">
              <Input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                placeholder="Ej: contacto@gpsbelgrano.com"
                leftIcon={<Mail className="h-4 w-4" />}
              />
            </FilterField>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-xs text-ink-faint">
                Se muestra en el footer y en Contacto. Vacío = se oculta.
              </p>
              {form.email && (
                <button
                  type="button"
                  onClick={() => clearField('email')}
                  className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:underline"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Borrar
                </button>
              )}
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {saved && !saving && (
            <p className="flex items-center gap-1.5 text-sm text-accent-700">
              <CheckCircle2 className="h-4 w-4" />
              Cambios guardados.
            </p>
          )}

          <div className="border-t border-line pt-4">
            <Button
              type="submit"
              disabled={saving || loading}
              leftIcon={<Save className="h-4 w-4" />}
            >
              {saving ? 'Guardando…' : 'Guardar cambios'}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
