/** Limpia un número dejando solo dígitos. */
function sanitize(phone: string): string {
  return phone.replace(/\D/g, '')
}

/** Genera un link wa.me con mensaje opcional pre-cargado. */
export function whatsappLink(phone: string, message?: string): string {
  const number = sanitize(phone)
  const base = `https://wa.me/${number}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/** Genera un link tel: para llamadas. */
export function telLink(phone: string): string {
  return `tel:${sanitize(phone)}`
}
