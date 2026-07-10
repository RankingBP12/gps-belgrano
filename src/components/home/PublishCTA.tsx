import { Link } from 'react-router-dom'
import { ArrowRight, Briefcase } from 'lucide-react'
import { Container, buttonClasses } from '@/components/ui'

/** Bloque horizontal azul oscuro con CTA verde para profesionales. */
export function PublishCTA() {
  return (
    <section className="py-8">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-brand-800 px-8 py-10 md:px-14 md:py-12">
          <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/5" />
          <div className="relative flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <div className="flex items-center gap-5">
              <span className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white sm:flex">
                <Briefcase className="h-8 w-8" />
              </span>
              <div>
                <h2 className="text-2xl font-bold text-white md:text-3xl">
                  ¿Sos profesional o brindás un servicio?
                </h2>
                <p className="mt-1.5 text-white/75">
                  Sumate gratis y conseguí más clientes en el barrio.
                </p>
              </div>
            </div>

            <Link
              to="/publicar"
              className={buttonClasses('whatsapp', 'lg', false, 'shrink-0 !px-8')}
            >
              Publicá tu servicio
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
