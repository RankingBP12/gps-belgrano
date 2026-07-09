export const APP_NAME = 'GPS Belgrano'
export const APP_TAGLINE = 'Profesionales y servicios en tu barrio'

/** Número de WhatsApp del negocio para la CTA general (formato internacional sin +). */
export const BUSINESS_WHATSAPP = '5491100000000'

export const AVAILABILITY_OPTIONS = [
  { value: 'all', label: 'Todos' },
  { value: 'available', label: 'Disponibles ahora' },
  { value: 'unavailable', label: 'No disponibles' },
] as const

export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevancia' },
  { value: 'name', label: 'Nombre (A-Z)' },
  { value: 'recent', label: 'Más recientes' },
] as const

export const NAV_LINKS = [
  { label: 'Inicio', to: '/' },
  { label: 'Cómo funciona', to: '/como-funciona' },
  { label: 'Publicá tu servicio', to: '/publicar' },
  { label: 'Contacto', to: '/contacto' },
] as const
