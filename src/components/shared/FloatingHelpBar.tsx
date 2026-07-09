import { MessageCircle } from 'lucide-react'
import { Container, buttonClasses } from '@/components/ui'
import { whatsappLink } from '@/utils/whatsapp'
import { useSettings } from '@/hooks/useSettings'

interface FloatingHelpBarProps {
  question?: string
  buttonLabel?: string
  message?: string
}

/**
 * Barra inferior fija (azul) con botón verde de WhatsApp.
 * Incluye un spacer para que no tape el contenido de la página.
 * Si no hay WhatsApp configurado, no se muestra.
 */
export function FloatingHelpBar({
  question = '¿Necesitás ayuda para encontrar un profesional?',
  buttonLabel = 'Escribir por WhatsApp',
  message = 'Hola! Necesito ayuda para encontrar un profesional en GPS Belgrano',
}: FloatingHelpBarProps) {
  const { whatsapp } = useSettings()
  if (!whatsapp) return null

  return (
    <>
      {/* Spacer para compensar la barra fija */}
      <div className="h-20 md:h-24" aria-hidden="true" />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-800 bg-brand-700 shadow-hover">
        <Container>
          <div className="flex items-center justify-between gap-4 py-3.5">
            <p className="text-sm font-semibold text-white sm:text-base">
              {question}
            </p>
            <a
              href={whatsappLink(whatsapp, message)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses('whatsapp', 'lg', false, 'shrink-0')}
            >
              <MessageCircle className="h-5 w-5" />
              <span className="hidden sm:inline">{buttonLabel}</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>
        </Container>
      </div>
    </>
  )
}
