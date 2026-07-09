import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Check } from 'lucide-react'
import { Modal, Input, Textarea, Button, Icon } from '@/components/ui'
import { FilterField } from '@/components/filters/FilterField'
import { slugify } from '@/utils/slugify'
import { getCategoryIds, MAX_CATEGORIES } from '@/utils/professionalCategories'
import { getColorClasses } from '@/utils/categoryColors'
import type { Category, Professional, NewProfessional } from '@/types'
import { cn } from '@/utils/format'

interface ProfessionalFormModalProps {
  open: boolean
  onClose: () => void
  professional: Professional | null
  categories: Category[]
  onSave: (data: NewProfessional, id?: string) => Promise<void>
}

const empty = {
  name: '',
  profession: '',
  categoryIds: [] as string[],
  zone: '',
  city: 'Belgrano',
  phone: '',
  whatsapp: '',
  email: '',
  photo: '',
  description: '',
  services: '',
  available: true,
  verified: false,
  featured: false,
}

/** Toggle simple reutilizable. */
function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2"
    >
      <span
        className={cn(
          'relative h-6 w-11 rounded-full transition-colors',
          checked ? 'bg-accent-500' : 'bg-line',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
            checked ? 'translate-x-[22px]' : 'translate-x-0.5',
          )}
        />
      </span>
      <span className="text-sm font-medium text-ink">{label}</span>
    </button>
  )
}

export function ProfessionalFormModal({
  open,
  onClose,
  professional,
  categories,
  onSave,
}: ProfessionalFormModalProps) {
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    setError(null)
    if (professional) {
      setForm({
        name: professional.name,
        profession: professional.profession ?? '',
        categoryIds: getCategoryIds(professional),
        zone: professional.zone,
        city: professional.city,
        phone: professional.phone,
        whatsapp: professional.whatsapp,
        email: professional.email,
        photo: professional.photo,
        description: professional.description,
        services: professional.services.join(', '),
        available: professional.available,
        verified: professional.verified,
        featured: professional.featured,
      })
    } else {
      setForm(empty)
    }
  }, [open, professional])

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const toggleCategory = (id: string) => {
    setForm((f) => {
      if (f.categoryIds.includes(id)) {
        return { ...f, categoryIds: f.categoryIds.filter((x) => x !== id) }
      }
      if (f.categoryIds.length >= MAX_CATEGORIES) return f
      return { ...f, categoryIds: [...f.categoryIds, id] }
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) return
    setSaving(true)
    setError(null)
    try {
      const data: NewProfessional = {
        name: form.name.trim(),
        slug: professional?.slug ?? slugify(form.name),
        categoryIds: form.categoryIds,
        profession: form.profession.trim(),
        description: form.description.trim(),
        phone: form.phone.trim(),
        whatsapp: form.whatsapp.trim() || form.phone.trim(),
        email: form.email.trim(),
        photo: form.photo.trim(),
        gallery: professional?.gallery ?? [],
        city: form.city.trim(),
        zone: form.zone.trim(),
        services: form.services
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        schedule: professional?.schedule,
        available: form.available,
        verified: form.verified,
        featured: form.featured,
      }
      await onSave(data, professional?.id)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={professional ? 'Editar profesional' : 'Nuevo profesional'}
    >
      <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <FilterField label="Nombre y apellido">
            <Input
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              required
              autoFocus
            />
          </FilterField>
          <FilterField label="Profesión">
            <Input
              value={form.profession}
              onChange={(e) => set('profession', e.target.value)}
              placeholder="Ej: Electricista matriculado"
            />
          </FilterField>
        </div>

        <FilterField label={`Categorías (hasta ${MAX_CATEGORIES})`}>
          <div className="rounded-xl border border-line p-2">
            <div className="mb-1.5 flex items-center justify-between px-1">
              <span className="text-xs text-ink-soft">
                Seleccioná 1 a {MAX_CATEGORIES} rubros
              </span>
              <span className="text-xs font-semibold text-brand-600">
                {form.categoryIds.length}/{MAX_CATEGORIES}
              </span>
            </div>
            <div className="max-h-44 space-y-1 overflow-y-auto">
              {categories.map((c) => {
                const checked = form.categoryIds.includes(c.id)
                const disabled =
                  !checked && form.categoryIds.length >= MAX_CATEGORIES
                const colors = getColorClasses(c.color)
                return (
                  <button
                    key={c.id}
                    type="button"
                    disabled={disabled}
                    onClick={() => toggleCategory(c.id)}
                    className={cn(
                      'flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-sm transition-colors',
                      checked ? 'bg-brand-50' : 'hover:bg-muted',
                      disabled && 'cursor-not-allowed opacity-40',
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-5 w-5 shrink-0 items-center justify-center rounded border',
                        checked
                          ? 'border-brand-600 bg-brand-600 text-white'
                          : 'border-line',
                      )}
                    >
                      {checked && <Check className="h-3.5 w-3.5" />}
                    </span>
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-white ${colors.solidBg}`}
                    >
                      <Icon name={c.icon} className="h-3.5 w-3.5" />
                    </span>
                    <span className="truncate text-ink">{c.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </FilterField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FilterField label="Localidad">
            <Input
              value={form.zone}
              onChange={(e) => set('zone', e.target.value)}
              placeholder="Ej: Belgrano"
            />
          </FilterField>
          <FilterField label="Ciudad / Partido">
            <Input value={form.city} onChange={(e) => set('city', e.target.value)} />
          </FilterField>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FilterField label="Teléfono">
            <Input
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
              placeholder="541145678900"
            />
          </FilterField>
          <FilterField label="WhatsApp">
            <Input
              value={form.whatsapp}
              onChange={(e) => set('whatsapp', e.target.value)}
              placeholder="5491145678900"
            />
          </FilterField>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FilterField label="Email">
            <Input
              type="email"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
            />
          </FilterField>
          <FilterField label="Foto (URL)">
            <Input
              value={form.photo}
              onChange={(e) => set('photo', e.target.value)}
              placeholder="https://…"
            />
          </FilterField>
        </div>

        <FilterField label="Servicios (separados por coma)">
          <Input
            value={form.services}
            onChange={(e) => set('services', e.target.value)}
            placeholder="Tableros, Cableado, Urgencias 24hs"
          />
        </FilterField>

        <FilterField label="Descripción">
          <Textarea
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            rows={3}
          />
        </FilterField>

        <div className="flex flex-wrap gap-6 rounded-xl bg-muted p-4">
          <Toggle
            label="Disponible"
            checked={form.available}
            onChange={(v) => set('available', v)}
          />
          <Toggle
            label="Verificado"
            checked={form.verified}
            onChange={(v) => set('verified', v)}
          />
          <Toggle
            label="Destacado"
            checked={form.featured}
            onChange={(v) => set('featured', v)}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-end gap-2 border-t border-line pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? 'Guardando…' : professional ? 'Guardar cambios' : 'Crear'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
