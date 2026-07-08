export interface ProfessionalFilters {
  search: string
  zone: string
  availability: 'all' | 'available' | 'unavailable'
  specialty: string
  sort: 'relevance' | 'name' | 'recent'
}

export const DEFAULT_FILTERS: ProfessionalFilters = {
  search: '',
  zone: 'all',
  availability: 'all',
  specialty: 'all',
  sort: 'relevance',
}
