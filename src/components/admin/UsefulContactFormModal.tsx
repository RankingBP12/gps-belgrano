import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Modal, Input, Textarea, Select, Button } from '@/components/ui'
import { FilterField } from '@/components/filters/FilterField'
import { USEFUL_CATEGORIES } from '@/utils/usefulCategories'
import type { UsefulContact, NewUsefulContact } from '@/types'

interface UsefulContactFormModalProps {
  open: boolean
  onClose: () => void
  contact: UsefulContact | null
  onSave: (data: NewUsefulContact, id?: string) => Promise<void>
  nextOrder: number
}

const empty = {
  name: '',
  phone: '',
  category: USEFUL_CATEGORIES[0].value,
  description: '',
  address: '',
}

export function UsefulContactFormModal({
  open,
  onClose,
  contact,
  onSave,
  nextOrder,
}: UsefulContactFormModalProps) {
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    setError(null)
    if (contact) {
      setForm({
        name: contact.name,
        phone: contact.phone,
        category: contact.category,
        description: contact.description ?? '',
        address: contact.address ?? '',
      })
    } else {
      setForm(empty)
    }
  }, [open, contact])

  const set = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }))

  const categoryOptions = USEFUL_CATEGORIES.map((c) => ({
    value: c.value,
    label: c.label,
  }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return
    setSaving(true)
    setError(null)
    try {
      const data: NewUsefulContact = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        category: form.category,
        description: form.description.trim(),
        address: form.address.trim(),
        order: contact?.order ?? nextOrder,
        active: contact?.active ?? true,
      }
      await onSave(data, contact?.id)
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
      title={contact ? 'Editar dato de interés' : 'Nuevo dato de interés'}
    >
      <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto p-5">
        <FilterField label="Nombre">
          <Input
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="Ej: Policía - Comisaría 1ª"
            required
            autoFocus
          />
        </FilterField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FilterField label="Categoría">
            <Select
              options={categoryOptions}
              value={form.category}
              onChange={(e) => set('category', e.target.value)}
            />
          </FilterField>
          <FilterField label="Teléfono">
            <Input
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
              placeholder="Ej: 101 o 2494-123456"
              required
            />
          </FilterField>
        </div>

        <FilterField label="Dirección (opcional)">
          <Input
            value={form.address}
            onChange={(e) => set('address', e.target.value)}
            placeholder="Ej: Av. San Martín 100"
          />
        </FilterField>

        <FilterField label="Descripción (opcional)">
          <Textarea
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            rows={2}
            placeholder="Ej: Atención las 24 horas"
          />
        </FilterField>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-end gap-2 border-t border-line pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? 'Guardando…' : contact ? 'Guardar cambios' : 'Crear'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
