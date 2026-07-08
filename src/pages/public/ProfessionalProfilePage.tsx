import { useParams, Link } from 'react-router-dom'
import { ChevronRight, MapPin, CheckCircle2, ArrowLeft } from 'lucide-react'
import { Container, Skeleton } from '@/components/ui'
import { ProfileHeader } from '@/components/professionals/ProfileHeader'
import { ProfileGallery } from '@/components/professionals/ProfileGallery'
import { ProfileSchedule } from '@/components/professionals/ProfileSchedule'
import { ContactForm } from '@/components/professionals/ContactForm'
import { WhatsAppCTACard } from '@/components/shared/WhatsAppCTACard'
import { NotFoundPage } from './NotFoundPage'
import { useProfessional } from '@/hooks/useProfessional'

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-6 shadow-card">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

export function ProfessionalProfilePage() {
  const { slug } = useParams<{ slug: string }>()
  const { professional: p, loading } = useProfessional(slug)

  if (loading) {
    return (
      <Container className="py-16">
        <Skeleton className="h-40 w-full rounded-2xl" />
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <Skeleton className="h-96 rounded-2xl lg:col-span-2" />
          <Skeleton className="h-96 rounded-2xl" />
        </div>
      </Container>
    )
  }

  if (!p) return <NotFoundPage />

  return (
    <>
      {/* Breadcrumb */}
      <Container className="pt-6">
        <nav className="flex items-center gap-1.5 text-sm text-ink-soft">
          <Link to="/" className="hover:text-brand-700">
            Inicio
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-ink">{p.name}</span>
        </nav>
      </Container>

      <ProfileHeader professional={p} />

      <Container className="py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contenido principal */}
          <div className="space-y-8 lg:col-span-2">
            <Block title="Sobre mí">
              <p className="whitespace-pre-line leading-relaxed text-ink-soft">
                {p.description || 'Este profesional aún no agregó una descripción.'}
              </p>
            </Block>

            <Block title="Servicios que ofrece">
              {p.services.length > 0 ? (
                <ul className="grid gap-2 sm:grid-cols-2">
                  {p.services.map((s) => (
                    <li
                      key={s}
                      className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2.5 text-sm text-ink"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-600" />
                      {s}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-ink-soft">Sin servicios cargados.</p>
              )}
            </Block>

            <Block title="Galería de trabajos">
              <ProfileGallery images={p.gallery} />
            </Block>

            <Block title="Zona de cobertura">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium text-ink">
                    {p.zone}, {p.city}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    Atiende en {p.zone} y zonas aledañas. Consultá disponibilidad
                    por WhatsApp.
                  </p>
                </div>
              </div>
            </Block>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <ContactForm professional={p} />
            <ProfileSchedule schedule={p.schedule} />
            <WhatsAppCTACard
              title="Contacto rápido"
              description="Escribile directo por WhatsApp y coordiná al instante."
              message={`Hola ${p.name}! Te contacto desde GPS Belgrano.`}
            />
          </div>
        </div>

        <div className="mt-10">
          <Link
            to="/#categorias"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a explorar categorías
          </Link>
        </div>
      </Container>
    </>
  )
}
