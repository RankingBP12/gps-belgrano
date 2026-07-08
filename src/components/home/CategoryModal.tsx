import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, SearchX, ArrowRight } from 'lucide-react'
import { Modal, Input, Icon } from '@/components/ui'
import { getColorClasses } from '@/utils/categoryColors'
import { slugify } from '@/utils/slugify'
import type { Category } from '@/types'

interface CategoryModalProps {
  open: boolean
  onClose: () => void
  categories: Category[]
}

export function CategoryModal({ open, onClose, categories }: CategoryModalProps) {
  const [term, setTerm] = useState('')

  const filtered = useMemo(() => {
    const t = slugify(term)
    if (!t) return categories
    return categories.filter((c) => slugify(c.name).includes(t))
  }, [term, categories])

  return (
    <Modal open={open} onClose={onClose} title="Todas las categorías">
      {/* Buscador */}
      <div className="border-b border-line p-5">
        <Input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Buscar categoría… (ej: electricista, plomero)"
          leftIcon={<Search className="h-4 w-4" />}
          autoFocus
        />
        <p className="mt-2 text-xs text-ink-faint">
          {filtered.length} de {categories.length} categorías
        </p>
      </div>

      {/* Listado */}
      <div className="overflow-y-auto p-5">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-center">
            <SearchX className="h-9 w-9 text-ink-faint" />
            <p className="mt-3 text-sm text-ink-soft">
              No encontramos categorías con “{term}”.
            </p>
          </div>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2">
            {filtered.map((category) => {
              const colors = getColorClasses(category.color)
              return (
                <li key={category.id}>
                  <Link
                    to={`/${category.slug}`}
                    onClick={onClose}
                    className="group flex items-center gap-3 rounded-xl border border-line bg-white p-3 transition-all hover:border-brand-200 hover:bg-muted"
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white ${colors.solidBg}`}
                    >
                      <Icon name={category.icon} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-ink">
                        {category.name}
                      </p>
                      {category.description && (
                        <p className="truncate text-xs text-ink-soft">
                          {category.description}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-ink-faint transition-all group-hover:translate-x-0.5 group-hover:text-brand-600" />
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </Modal>
  )
}
