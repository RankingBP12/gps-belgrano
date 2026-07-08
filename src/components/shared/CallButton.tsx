import { Phone } from 'lucide-react'
import { buttonClasses, type ButtonSize, type ButtonVariant } from '@/components/ui/buttonStyles'
import { telLink } from '@/utils/whatsapp'

interface CallButtonProps {
  phone: string
  size?: ButtonSize
  variant?: ButtonVariant
  fullWidth?: boolean
  label?: string
}

export function CallButton({
  phone,
  size = 'md',
  variant = 'outline',
  fullWidth = false,
  label = 'Llamar',
}: CallButtonProps) {
  return (
    <a href={telLink(phone)} className={buttonClasses(variant, size, fullWidth)}>
      <Phone className="h-4 w-4" />
      {label}
    </a>
  )
}
