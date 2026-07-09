import { MessageCircle } from 'lucide-react'
import { buttonClasses } from '@/components/ui'
import { whatsappLink } from '@/utils/whatsapp'
import { useSettings } from '@/hooks/useSettings'

interface WhatsAppCTACardProps {
  title?: string
  description?: string
  message?: string
}

/** Card de ayuda por WhatsApp para sidebars. No se muestra si no hay WhatsApp configurado. */
export function WhatsAppCTACard({
  title = '¿No encontrás lo que buscás?',
  description = 'Escribinos y te ayudamos a encontrar el profesional ideal para tu necesidad.',
  message = 'Hola! Necesito ayuda para encontrar un profesional en GPS Belgrano',
}: WhatsAppCTACardProps) {
  const { whatsapp } = useSettings()
  if (!whatsapp) return null

  return (
    <div className="rounded-2xl border border-accent-200 bg-gradient-to-br from-accent-50 to-white p-6 shadow-card">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-100 text-accent-700">
        <MessageCircle className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-semibold text-ink">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{description}</p>
      <a
        href={whatsappLink(whatsapp, message)}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses('whatsapp', 'md', true, 'mt-4')}
      >
        <MessageCircle className="h-4 w-4" />
        Consultar por WhatsApp
      </a>
    </div>
  )
}
