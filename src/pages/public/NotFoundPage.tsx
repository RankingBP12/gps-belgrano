import { Link } from 'react-router-dom'
import { MapPinOff, Home } from 'lucide-react'
import { Container, buttonClasses } from '@/components/ui'

export function NotFoundPage() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        <MapPinOff className="h-10 w-10" />
      </span>
      <h1 className="mt-6 text-4xl font-bold tracking-tight text-ink">
        Página no encontrada
      </h1>
      <p className="mt-3 max-w-md text-ink-soft">
        No pudimos encontrar lo que buscabas. Puede que el enlace haya cambiado o
        la categoría no exista.
      </p>
      <Link to="/" className={buttonClasses('primary', 'lg', false, 'mt-8')}>
        <Home className="h-4 w-4" />
        Volver al inicio
      </Link>
    </Container>
  )
}
