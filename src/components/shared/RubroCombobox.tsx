import { useMemo, useRef, useState } from 'react'
import { Search, Plus, Check } from 'lucide-react'
import { Input, Icon } from '@/components/ui'
import { getColorClasses } from '@/utils/categoryColors'
import { findMatchingCategory } from '@/utils/categoryMatch'
import { slugify } from '@/utils/slugify'
import type { Category } from '@/types'

interface RubroComboboxProps {
  categories: Category[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

/**
 * Campo de rubro con autocompletado:
 * - El usuario escribe libremente.
 * - Ve sugerencias existentes ordenadas alfabéticamente (insensible a acentos).
 * - Si el texto coincide con un rubro existente, se usa ese (no crea uno nuevo).
 * - Si no existe, se propone como nuevo rubro.
 */
export function RubroCombobox({
  categories,
  value,
  onChange,
  placeholder,
}: RubroComboboxProps) {
  const [open, setOpen] = useState(false)
  const blurTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const sorted = useMemo(
    () => [...categories].sort((a, b) => a.name.localeCompare(b.name, 'es')),
    [categories],
  )

  const q = slugify(value)
  const matches = useMemo(
    () => (q ? sorted.filter((c) => slugify(c.name).includes(q)) : sorted),
    [sorted, q],
  )
  const exact = findMatchingCategory(categories, value)
  const showCreate = value.trim().length > 0 && !exact

  const select = (name: string) => {
    onChange(name)
    setOpen(false)
  }

  return (
    <div className="relative">
      <Input
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          blurTimer.current = setTimeout(() => setOpen(false), 150)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(false)
        }}
        placeholder={placeholder ?? 'Escribí tu rubro… (ej: Electricista)'}
        leftIcon={<Search className="h-4 w-4" />}
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
      />

      {open && (matches.length > 0 || showCreate) && (
        <div
          // Evita que el blur del input cierre el panel antes del click.
          onMouseDown={(e) => {
            e.preventDefault()
            if (blurTimer.current) clearTimeout(blurTimer.current)
          }}
          className="absolute z-20 mt-1.5 max-h-64 w-full overflow-y-auto rounded-xl border border-line bg-white p-1.5 shadow-hover"
        >
          {matches.map((c) => {
            const colors = getColorClasses(c.color)
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => select(c.name)}
                className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-muted"
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white ${colors.solidBg}`}
                >
                  <Icon name={c.icon} className="h-4 w-4" />
                </span>
                <span className="truncate text-sm font-medium text-ink">
                  {c.name}
                </span>
              </button>
            )
          })}

          {showCreate && (
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-muted"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Plus className="h-4 w-4" />
              </span>
              <span className="truncate text-sm text-ink">
                Usar “<span className="font-semibold">{value.trim()}</span>” como
                nuevo rubro
              </span>
            </button>
          )}
        </div>
      )}

      {/* Estado de coincidencia */}
      {value.trim() && (
        <p
          className={`mt-1.5 flex items-center gap-1 text-xs ${
            exact ? 'text-accent-700' : 'text-brand-600'
          }`}
        >
          {exact ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Coincide con un rubro existente: te registrás en{' '}
              <span className="font-semibold">{exact.name}</span>
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" />
              Rubro nuevo: lo revisaremos y lo agregaremos al directorio
            </>
          )}
        </p>
      )}
    </div>
  )
}
