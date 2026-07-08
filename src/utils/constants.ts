export const APP_NAME = 'GPS Belgrano'
export const APP_TAGLINE = 'Encontrá profesionales de confianza en tu barrio'

/** Número de WhatsApp del negocio para la CTA general (formato internacional sin +). */
export const BUSINESS_WHATSAPP = '5491100000000'

/** Zonas de cobertura (barrio de Belgrano y alrededores). */
export const ZONES = [
  'Belgrano',
  'Belgrano R',
  'Belgrano C',
  'Colegiales',
  'Núñez',
  'Palermo',
  'Villa Urquiza',
  'Coghlan',
] as const

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
  { label: 'Servicios', to: '/#categorias' },
  { label: 'Cómo funciona', to: '/como-funciona' },
  { label: 'Publicá tu servicio', to: '/publicar' },
  { label: 'Contacto', to: '/contacto' },
] as const
