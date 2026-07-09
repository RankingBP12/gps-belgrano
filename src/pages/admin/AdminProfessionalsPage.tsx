import { useEffect, useMemo, useState } from 'react'
import { Plus, Search, Trash2, Pencil, ShieldCheck, Star } from 'lucide-react'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { ProfessionalFormModal } from '@/components/admin/ProfessionalFormModal'
import { Input, Select, Button, Avatar, Badge, Skeleton } from '@/components/ui'
import {
  getAllProfessionals,
  createProfessional,
  updateProfessional,
  deleteProfessional,
} from '@/services/professionals.service'
import { getAllCategories } from '@/services/categories.service'
import { slugify } from '@/utils/slugify'
import { getCategoryIds } from '@/utils/professionalCategories'
import type { Category, Professional, NewProfessional } from '@/types'

export function AdminProfessionalsPage() {
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [term, setTerm] = useState('')
  const [catFilter, setCatFilter] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Professional | null>(null)

  const load = () => {
    setLoading(true)
    Promise.all([getAllProfessionals(), getAllCategories()])
      .then(([pros, cats]) => {
        setProfessionals(pros)
        setCategories(cats)
      })
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const catNames = useMemo(() => {
    const map = new Map(categories.map((c) => [c.id, c.name]))
    return (p: Professional) =>
      getCategoryIds(p)
        .map((id) => map.get(id))
        .filter(Boolean)
        .join(', ') || '—'
  }, [categories])

  const filtered = useMemo(() => {
    const t = slugify(term)
    return professionals.filter((p) => {
      const matchesTerm =
        !t ||
        slugify(p.name).includes(t) ||
        slugify(p.profession ?? '').includes(t) ||
        p.services.some((s) => slugify(s).includes(t))
      const matchesCat =
        catFilter === 'all' || getCategoryIds(p).includes(catFilter)
      return matchesTerm && matchesCat
    })
  }, [professionals, term, catFilter])

  const categoryOptions = [
    { value: 'all', label: 'Todas las categorías' },
    ...categories.map((c) => ({ value: c.id, label: c.name })),
  ]

  const handleSave = async (data: NewProfessional, id?: string) => {
    if (id) await updateProfessional(id, data)
    else await createProfessional(data)
    load()
  }

  const handleDelete = async (p: Professional) => {
    if (!window.confirm(`¿Eliminar a "${p.name}"?`)) return
    await deleteProfessional(p.id)
    load()
  }

  const openNew = () => {
    setEditing(null)
    setModalOpen(true)
  }
  const openEdit = (p: Professional) => {
    setEditing(p)
    setModalOpen(true)
  }

  return (
    <>
      <AdminPageHeader
        title="Profesionales"
        subtitle={`${professionals.length} registrados`}
        actions={
          <Button onClick={openNew} leftIcon={<Plus className="h-4 w-4" />}>
            Nuevo profesional
          </Button>
        }
      />

      {/* Filtros */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <Input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Buscar por nombre, profesión o servicio…"
            leftIcon={<Search className="h-4 w-4" />}
          />
        </div>
        <div className="sm:w-64">
          <Select
            options={categoryOptions}
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
          <p className="text-sm text-ink-soft">
            {professionals.length === 0
              ? 'Todavía no hay profesionales registrados. Creá el primero con "Nuevo profesional".'
              : 'No se encontraron profesionales con esos filtros.'}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
          <ul className="divide-y divide-line">
            {filtered.map((p) => (
              <li
                key={p.id}
                className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50"
              >
                <Avatar src={p.photo} name={p.name} size="md" />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate font-semibold text-ink">{p.name}</p>
                    {p.verified && (
                      <ShieldCheck className="h-4 w-4 text-accent-600" />
                    )}
                    {p.featured && <Star className="h-4 w-4 text-orange-500" />}
                    {!p.available && <Badge variant="muted">No disponible</Badge>}
                  </div>
                  <p className="truncate text-sm text-ink-soft">
                    {p.profession || '—'} · {catNames(p)} · {p.zone}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => openEdit(p)}
                    title="Editar"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-brand-600 hover:bg-brand-50"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(p)}
                    title="Eliminar"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ProfessionalFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        professional={editing}
        categories={categories}
        onSave={handleSave}
      />
    </>
  )
}
