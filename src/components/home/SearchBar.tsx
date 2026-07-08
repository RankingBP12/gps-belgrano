import { useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowRight, SearchX } from 'lucide-react'
import { Input, Button, Icon } from '@/components/ui'
import { useCategories } from '@/hooks/useCategories'
import { getColorClasses } from '@/utils/categoryColors'
import { slugify } from '@/utils/slugify'
import type { Category } from '@/types'

interface SearchBarProps {
  variant?: 'hero' | 'compact'
  defaultValue?: string
  /** Si se pasa, se usa para filtrar (no navega ni muestra sugerencias). */
  onSearch?: (term: string) => void
  placeholder?: string
}

/** Coincidencia flexible: el término matchea el nombre del rubro o viceversa. */
function matchesCategory(cat: Category, slugTerm: string): boolean {
  const name = slugify(cat.name)
  return name.includes(slugTerm) || slugTerm.includes(name)
}

export function SearchBar({
  variant = 'hero',
  defaultValue = '',
  onSearch,
  placeholder = '¿Qué servicio necesitás? Ej: electricista, plomero…',
}: SearchBarProps) {
  const [term, setTerm] = useState(defaultValue)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { categories } = useCategories()
  const blurTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const isHero = variant === 'hero'
  const suggestMode = !onSearch // en modo filtro no navegamos ni sugerimos

  const slugTerm = slugify(term)
  const suggestions = useMemo(() => {
    if (!suggestMode || !slugTerm) return []
    return categories.filter((c) => matchesCategory(c, slugTerm)).slice(0, 6)
  }, [categories, slugTerm, suggestMode])

  const goTo = (cat: Category) => {
    setOpen(false)
    navigate(`/${cat.slug}`)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const value = term.trim()
    if (onSearch) {
      onSearch(value)
      return
    }
    if (!value) return
    // Navega al mejor rubro que coincida; si no hay, muestra el desplegable.
    const best = categories.find((c) => matchesCategory(c, slugTerm))
    if (best) goTo(best)
    else setOpen(true)
  }

  const showDropdown =
    suggestMode && open && slugTerm.length > 0

  return (
    <div className="relative w-full">
      <form
        onSubmit={handleSubmit}
        className={
          isHero
            ? 'flex w-full flex-col gap-2 rounded-2xl bg-white p-2 shadow-hover ring-1 ring-line sm:flex-row sm:items-center'
            : 'flex w-full flex-col gap-2 sm:flex-row'
        }
      >
        <div className="flex-1">
          <Input
            value={term}
            onChange={(e) => {
              setTerm(e.target.value)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => {
              blurTimer.current = setTimeout(() => setOpen(false), 150)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setOpen(false)
            }}
            placeholder={placeholder}
            sizeVariant={isHero ? 'lg' : 'md'}
            leftIcon={<Search className="h-5 w-5" />}
            className={isHero ? 'border-transparent focus:ring-0' : undefined}
            aria-label="Buscar servicio"
            autoComplete="off"
          />
        </div>
        <Button type="submit" size={isHero ? 'lg' : 'md'} className="sm:w-auto">
          <Search className="h-4 w-4" />
          Buscar
        </Button>
      </form>

      {/* Sugerencias de rubros */}
      {showDropdown && (
        <div
          onMouseDown={(e) => {
            e.preventDefault()
            if (blurTimer.current) clearTimeout(blurTimer.current)
          }}
          className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-hover"
        >
          {suggestions.length > 0 ? (
            <ul className="max-h-72 overflow-y-auto">
              {suggestions.map((c) => {
                const colors = getColorClasses(c.color)
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => goTo(c)}
                      className="group flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-colors hover:bg-muted"
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white ${colors.solidBg}`}
                      >
                        <Icon name={c.icon} className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold text-ink">
                          {c.name}
                        </span>
                        {c.description && (
                          <span className="block truncate text-xs text-ink-soft">
                            {c.description}
                          </span>
                        )}
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-ink-faint transition-all group-hover:translate-x-0.5 group-hover:text-brand-600" />
                    </button>
                  </li>
                )
              })}
            </ul>
          ) : (
            <div className="flex items-center gap-3 p-3 text-sm text-ink-soft">
              <SearchX className="h-5 w-5 text-ink-faint" />
              No encontramos un rubro para “{term.trim()}”. Probá con otra palabra.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
