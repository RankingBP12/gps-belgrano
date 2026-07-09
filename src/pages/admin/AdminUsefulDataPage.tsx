import { useEffect, useMemo, useState } from 'react'
import { Plus, Search, Trash2, Pencil, Phone } from 'lucide-react'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { UsefulContactFormModal } from '@/components/admin/UsefulContactFormModal'
import { Input, Select, Button, Badge, Skeleton } from '@/components/ui'
import {
  getUsefulContacts,
  createUsefulContact,
  updateUsefulContact,
  deleteUsefulContact,
} from '@/services/usefulContacts.service'
import { USEFUL_CATEGORIES, getUsefulCategory } from '@/utils/usefulCategories'
import { getColorClasses } from '@/utils/categoryColors'
import { slugify } from '@/utils/slugify'
import type { UsefulContact, NewUsefulContact } from '@/types'

export function AdminUsefulDataPage() {
  const [contacts, setContacts] = useState<UsefulContact[]>([])
  const [loading, setLoading] = useState(true)
  const [term, setTerm] = useState('')
  const [catFilter, setCatFilter] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<UsefulContact | null>(null)

  const load = () => {
    setLoading(true)
    getUsefulContacts()
      .then(setContacts)
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const filtered = useMemo(() => {
    const t = slugify(term)
    return contacts.filter((c) => {
      const matchesTerm =
        !t ||
        slugify(c.name).includes(t) ||
        c.phone.includes(term.trim()) ||
        slugify(c.description ?? '').includes(t)
      const matchesCat = catFilter === 'all' || c.category === catFilter
      return matchesTerm && matchesCat
    })
  }, [contacts, term, catFilter])

  const nextOrder = useMemo(
    () => Math.max(0, ...contacts.map((c) => c.order ?? 0)) + 1,
    [contacts],
  )

  const categoryOptions = [
    { value: 'all', label: 'Todas las categorías' },
    ...USEFUL_CATEGORIES.map((c) => ({ value: c.value, label: c.label })),
  ]

  const handleSave = async (data: NewUsefulContact, id?: string) => {
    if (id) await updateUsefulContact(id, data)
    else await createUsefulContact(data)
    load()
  }

  const handleDelete = async (c: UsefulContact) => {
    if (!window.confirm(`¿Eliminar "${c.name}"?`)) return
    await deleteUsefulContact(c.id)
    load()
  }

  const openNew = () => {
    setEditing(null)
    setModalOpen(true)
  }
  const openEdit = (c: UsefulContact) => {
    setEditing(c)
    setModalOpen(true)
  }

  return (
    <>
      <AdminPageHeader
        title="Datos de interés"
        subtitle={`${contacts.length} contactos útiles cargados`}
        actions={
          <Button onClick={openNew} leftIcon={<Plus className="h-4 w-4" />}>
            Nuevo dato
          </Button>
        }
      />

      {/* Filtros */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <Input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Buscar por nombre, teléfono o descripción…"
            leftIcon={<Search className="h-4 w-4" />}
          />
        </div>
        <div className="sm:w-60">
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
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
          <p className="text-sm text-ink-soft">
            {contacts.length === 0
              ? 'Todavía no cargaste datos de interés. Empezá con "Nuevo dato".'
              : 'No se encontraron contactos con esos filtros.'}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
          <ul className="divide-y divide-line">
            {filtered.map((c) => {
              const def = getUsefulCategory(c.category)
              const colors = getColorClasses(def.color)
              return (
                <li
                  key={c.id}
                  className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50"
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white ${colors.solidBg}`}
                  >
                    <def.icon className="h-5 w-5" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate font-semibold text-ink">{c.name}</p>
                      <Badge variant="muted">{def.label}</Badge>
                      {c.active === false && (
                        <Badge variant="muted">Oculto</Badge>
                      )}
                    </div>
                    <p className="mt-0.5 flex items-center gap-1.5 text-sm text-ink-soft">
                      <Phone className="h-3.5 w-3.5" />
                      {c.phone}
                      {c.description ? ` · ${c.description}` : ''}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
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

      <UsefulContactFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        contact={editing}
        onSave={handleSave}
        nextOrder={nextOrder}
      />
    </>
  )
}
