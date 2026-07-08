import type { Professional } from '@/types'
import type { ProfessionalFilters } from '@/components/filters/types'

/** Aplica los filtros del sidebar sobre una lista de profesionales (client-side, MVP). */
export function filterProfessionals(
  list: Professional[],
  filters: ProfessionalFilters,
): Professional[] {
  const term = filters.search.trim().toLowerCase()

  const filtered = list.filter((p) => {
    const matchesSearch =
      !term ||
      p.name.toLowerCase().includes(term) ||
      p.services.some((s) => s.toLowerCase().includes(term))

    const matchesZone = filters.zone === 'all' || p.zone === filters.zone

    const matchesAvailability =
      filters.availability === 'all' ||
      (filters.availability === 'available' && p.available) ||
      (filters.availability === 'unavailable' && !p.available)

    const matchesSpecialty =
      filters.specialty === 'all' || p.services.includes(filters.specialty)

    return matchesSearch && matchesZone && matchesAvailability && matchesSpecialty
  })

  switch (filters.sort) {
    case 'name':
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name))
    case 'recent':
      return [...filtered].sort(
        (a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0),
      )
    default:
      // relevancia: destacados y disponibles primero
      return [...filtered].sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          Number(b.available) - Number(a.available),
      )
  }
}

/** Extrae las especialidades únicas de una lista de profesionales. */
export function extractSpecialties(list: Professional[]): string[] {
  const set = new Set<string>()
  list.forEach((p) => p.services.forEach((s) => set.add(s)))
  return Array.from(set).sort()
}
