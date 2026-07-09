/**
 * Configuración del panel de administración.
 *
 * ⚠️ Nota de seguridad: esta es una autenticación simple del lado del cliente
 * (localStorage) pensada para un MVP interno. No es seguridad de nivel
 * producción. Cuando se necesite proteger de verdad, se debe migrar a
 * Firebase Authentication + reglas de Firestore con `request.auth`.
 */
export const ADMIN_CREDENTIALS = {
  user: import.meta.env.VITE_ADMIN_USER ?? 'admin',
  password: import.meta.env.VITE_ADMIN_PASSWORD ?? 'belgrano2026',
}

/** Clave del registro de sesión en localStorage. */
export const ADMIN_SESSION_KEY = 'gps_belgrano_admin_session'

/** Rutas del panel (ocultas: no se enlazan desde el sitio público). */
export const ADMIN_ROUTES = {
  login: '/admin/login',
  dashboard: '/admin',
  categories: '/admin/categorias',
  professionals: '/admin/profesionales',
  usefulData: '/admin/datos',
  settings: '/admin/configuracion',
}
