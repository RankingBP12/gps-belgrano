/** Configuración de contacto del sitio, editable desde el panel admin. */
export interface SiteSettings {
  /** WhatsApp del negocio (formato internacional sin +). Vacío = oculto. */
  whatsapp: string
  /** Email de contacto. Vacío = oculto. */
  email: string
}
