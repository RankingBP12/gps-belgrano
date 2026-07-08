import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Modal, Input, Textarea, Select, Button } from '@/components/ui'
import { FilterField } from '@/components/filters/FilterField'
import { slugify } from '@/utils/slugify'
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
  categoryId: '',
  zone: '',
  city: 'CABA',
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
        categoryId: professional.categoryId,
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

  const categoryOptions = [
    { value: '', label: 'Sin categoría' },
    ...categories.map((c) => ({ value: c.id, label: c.name })),
  ]

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) return
    setSaving(true)
    setError(null)
    try {
      const data: NewProfessional = {
        name: form.name.trim(),
        slug: professional?.slug ?? slugify(form.name),
        categoryId: form.categoryId,
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

        <FilterField label="Categoría">
          <Select
            options={categoryOptions}
            value={form.categoryId}
            onChange={(e) => set('categoryId', e.target.value)}
          />
        </FilterField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FilterField label="Zona">
            <Input value={form.zone} onChange={(e) => set('zone', e.target.value)} />
          </FilterField>
          <FilterField label="Ciudad">
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
