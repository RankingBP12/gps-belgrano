import { MessageCircle } from 'lucide-react'
import { buttonClasses, type ButtonSize } from '@/components/ui/buttonStyles'
import { whatsappLink } from '@/utils/whatsapp'

interface WhatsAppButtonProps {
  phone: string
  message?: string
  size?: ButtonSize
  fullWidth?: boolean
  label?: string
}

export function WhatsAppButton({
  phone,
  message,
  size = 'md',
  fullWidth = false,
  label = 'WhatsApp',
}: WhatsAppButtonProps) {
  return (
    <a
      href={whatsappLink(phone, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClasses('whatsapp', size, fullWidth)}
    >
      <MessageCircle className="h-4 w-4" />
      {label}
    </a>
  )
}
