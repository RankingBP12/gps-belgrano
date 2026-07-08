import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Modal, Input, Button, Icon } from '@/components/ui'
import { FilterField } from '@/components/filters/FilterField'
import { ICON_NAMES } from '@/components/ui/Icon'
import { CATEGORY_COLOR_TOKENS, getColorClasses } from '@/utils/categoryColors'
import { slugify } from '@/utils/slugify'
import type { Category, CategoryColor } from '@/types'
import { cn } from '@/utils/format'

interface CategoryFormModalProps {
  open: boolean
  onClose: () => void
  /** Categoría a editar; null para crear una nueva. */
  category: Category | null
  onSave: (data: Omit<Category, 'id'>, id?: string) => Promise<void>
  nextOrder: number
}

export function CategoryFormModal({
  open,
  onClose,
  category,
  onSave,
  nextOrder,
}: CategoryFormModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('Wrench')
  const [color, setColor] = useState<CategoryColor>('blue')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    setError(null)
    if (category) {
      setName(category.name)
      setDescription(category.description ?? '')
      setIcon(category.icon)
      setColor(category.color)
    } else {
      setName('')
      setDescription('')
      setIcon('Wrench')
      setColor('blue')
    }
  }, [open, category])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setSaving(true)
    setError(null)
    try {
      const data: Omit<Category, 'id'> = {
        name: name.trim(),
        slug: category?.slug ?? slugify(name),
        icon,
        color,
        description: description.trim(),
        order: category?.order ?? nextOrder,
        active: category?.active ?? true,
      }
      await onSave(data, category?.id)
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
      title={category ? 'Editar categoría' : 'Nueva categoría'}
    >
      <form onSubmit={handleSubmit} className="space-y-5 overflow-y-auto p-5">
        {/* Preview */}
        <div className="flex items-center gap-3 rounded-xl bg-muted p-3">
          <span
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-xl text-white',
              getColorClasses(color).solidBg,
            )}
          >
            <Icon name={icon} className="h-6 w-6" />
          </span>
          <div>
            <p className="font-semibold text-ink">{name || 'Nombre del rubro'}</p>
            <p className="text-xs text-ink-soft">
              {description || 'Descripción corta'}
            </p>
          </div>
        </div>

        <FilterField label="Nombre">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Electricistas"
            required
            autoFocus
          />
        </FilterField>

        <FilterField label="Descripción corta">
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ej: Instalaciones y reparaciones"
          />
        </FilterField>

        {/* Color */}
        <FilterField label="Color">
          <div className="flex flex-wrap gap-2">
            {CATEGORY_COLOR_TOKENS.map((token) => (
              <button
                key={token}
                type="button"
                onClick={() => setColor(token)}
                aria-label={token}
                className={cn(
                  'h-9 w-9 rounded-lg ring-offset-2 transition-all',
                  getColorClasses(token).solidBg,
                  color === token
                    ? 'ring-2 ring-ink scale-105'
                    : 'hover:scale-105',
                )}
              />
            ))}
          </div>
        </FilterField>

        {/* Icono */}
        <FilterField label="Ícono">
          <div className="grid max-h-40 grid-cols-8 gap-2 overflow-y-auto rounded-xl border border-line p-2">
            {ICON_NAMES.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setIcon(n)}
                aria-label={n}
                className={cn(
                  'flex h-9 items-center justify-center rounded-lg transition-colors',
                  icon === n
                    ? 'bg-brand-600 text-white'
                    : 'text-ink-soft hover:bg-muted',
                )}
              >
                <Icon name={n} className="h-5 w-5" />
              </button>
            ))}
          </div>
        </FilterField>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-end gap-2 border-t border-line pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? 'Guardando…' : category ? 'Guardar cambios' : 'Crear categoría'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
