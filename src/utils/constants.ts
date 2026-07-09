export const APP_NAME = 'GPS Belgrano'
export const APP_TAGLINE = 'Guía de profesionales y servicios'

/** Valores de contacto por defecto (se pueden editar/borrar desde el panel admin). */
export const DEFAULT_WHATSAPP = '5491100000000'
export const DEFAULT_EMAIL = 'hola@gpsbelgrano.com'

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
  { label: 'Datos de interés', to: '/datos-de-interes' },
  { label: 'Cómo funciona', to: '/como-funciona' },
  { label: 'Publicá tu servicio', to: '/publicar' },
  { label: 'Contacto', to: '/contacto' },
] as const
