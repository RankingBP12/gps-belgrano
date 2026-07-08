import { SlidersHorizontal, RotateCcw } from 'lucide-react'
import { Select, Button } from '@/components/ui'
import type { ProfessionalFilters } from './types'
import { DEFAULT_FILTERS } from './types'
import { ZONES, AVAILABILITY_OPTIONS, SORT_OPTIONS } from '@/utils/constants'

interface FiltersBarProps {
  filters: ProfessionalFilters
  onChange: (filters: ProfessionalFilters) => void
  specialties: string[]
}

/** Barra horizontal de filtros tipo select (página de categoría). */
export function FiltersBar({ filters, onChange, specialties }: FiltersBarProps) {
  const set = <K extends keyof ProfessionalFilters>(
    key: K,
    value: ProfessionalFilters[K],
  ) => onChange({ ...filters, [key]: value })

  const zoneOptions = [
    { value: 'all', label: 'Todas las zonas' },
    ...ZONES.map((z) => ({ value: z, label: z })),
  ]
  const specialtyOptions = [
    { value: 'all', label: 'Todas las especialidades' },
    ...specialties.map((s) => ({ value: s, label: s })),
  ]

  const isDirty = JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS)

  return (
    <div className="rounded-2xl border border-line bg-white p-3 shadow-card">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <span className="flex shrink-0 items-center gap-2 px-1 text-sm font-semibold text-ink">
          <SlidersHorizontal className="h-4 w-4 text-brand-600" />
          Filtrar
        </span>

        <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4">
          <Select
            options={SORT_OPTIONS}
            value={filters.sort}
            aria-label="Ordenar"
            onChange={(e) =>
              set('sort', e.target.value as ProfessionalFilters['sort'])
            }
          />
          <Select
            options={AVAILABILITY_OPTIONS}
            value={filters.availability}
            aria-label="Disponibilidad"
            onChange={(e) =>
              set(
                'availability',
                e.target.value as ProfessionalFilters['availability'],
              )
            }
          />
          <Select
            options={zoneOptions}
            value={filters.zone}
            aria-label="Zona"
            onChange={(e) => set('zone', e.target.value)}
          />
          <Select
            options={specialtyOptions}
            value={filters.specialty}
            aria-label="Especialidad"
            onChange={(e) => set('specialty', e.target.value)}
          />
        </div>

        {isDirty && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange(DEFAULT_FILTERS)}
            leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
            className="shrink-0"
          >
            Limpiar
          </Button>
        )}
      </div>
    </div>
  )
}
