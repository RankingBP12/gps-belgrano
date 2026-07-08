import { useEffect, useMemo, useState } from 'react'
import { Plus, Search, Trash2, Pencil, Eye, EyeOff } from 'lucide-react'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { CategoryFormModal } from '@/components/admin/CategoryFormModal'
import { Input, Button, Icon, Badge, Skeleton } from '@/components/ui'
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/services/categories.service'
import { getColorClasses } from '@/utils/categoryColors'
import { slugify } from '@/utils/slugify'
import type { Category } from '@/types'

export function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [term, setTerm] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)

  const load = () => {
    setLoading(true)
    getAllCategories()
      .then(setCategories)
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const filtered = useMemo(() => {
    const t = slugify(term)
    if (!t) return categories
    return categories.filter((c) => slugify(c.name).includes(t))
  }, [categories, term])

  const nextOrder = useMemo(
    () => Math.max(0, ...categories.map((c) => c.order ?? 0)) + 1,
    [categories],
  )

  const handleSave = async (data: Omit<Category, 'id'>, id?: string) => {
    if (id) await updateCategory(id, data)
    else await createCategory(data)
    load()
  }

  const handleDelete = async (c: Category) => {
    if (!window.confirm(`¿Eliminar la categoría "${c.name}"?`)) return
    await deleteCategory(c.id)
    load()
  }

  const toggleActive = async (c: Category) => {
    await updateCategory(c.id, { active: !(c.active !== false) })
    load()
  }

  const openNew = () => {
    setEditing(null)
    setModalOpen(true)
  }
  const openEdit = (c: Category) => {
    setEditing(c)
    setModalOpen(true)
  }

  return (
    <>
      <AdminPageHeader
        title="Categorías"
        subtitle={`${categories.length} rubros en el directorio`}
        actions={
          <Button onClick={openNew} leftIcon={<Plus className="h-4 w-4" />}>
            Nueva categoría
          </Button>
        }
      />

      {/* Buscador */}
      <div className="mb-5 max-w-md">
        <Input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Buscar categoría…"
          leftIcon={<Search className="h-4 w-4" />}
        />
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line bg-white p-10 text-center text-sm text-ink-soft">
          No se encontraron categorías.
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
          <ul className="divide-y divide-line">
            {filtered.map((c) => {
              const colors = getColorClasses(c.color)
              const active = c.active !== false
              return (
                <li
                  key={c.id}
                  className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50"
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white ${colors.solidBg}`}
                  >
                    <Icon name={c.icon} className="h-5 w-5" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-semibold text-ink">{c.name}</p>
                      {!active && <Badge variant="muted">Inactiva</Badge>}
                    </div>
                    <p className="truncate text-sm text-ink-soft">
                      /{c.slug}
                      {c.description ? ` · ${c.description}` : ''}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      onClick={() => toggleActive(c)}
                      title={active ? 'Ocultar' : 'Mostrar'}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-soft hover:bg-muted"
                    >
                      {active ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => openEdit(c)}
                      title="Editar"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-brand-600 hover:bg-brand-50"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(c)}
                      title="Eliminar"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      <CategoryFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        category={editing}
        onSave={handleSave}
        nextOrder={nextOrder}
      />
    </>
  )
}
