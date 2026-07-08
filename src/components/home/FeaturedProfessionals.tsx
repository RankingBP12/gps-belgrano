import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Container, Skeleton, buttonClasses } from '@/components/ui'
import { ProfessionalCompactCard } from '@/components/professionals/ProfessionalCompactCard'
import { useFeaturedProfessionals } from '@/hooks/useProfessionals'

export function FeaturedProfessionals() {
  const { professionals, loading } = useFeaturedProfessionals(8)

  if (!loading && professionals.length === 0) return null

  return (
    <section className="py-16 md:py-24">
      <Container>
        {/* Header: título izquierda + Ver todos derecha */}
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-accent-600">
              Destacados
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Servicios destacados
            </h2>
          </div>
          <Link
            to="/#categorias"
            className={buttonClasses('outline', 'md', false, 'shrink-0')}
          >
            Ver todos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-72 rounded-2xl" />
              ))
            : professionals
                .slice(0, 4)
                .map((p) => (
                  <ProfessionalCompactCard key={p.id} professional={p} />
                ))}
        </div>
      </Container>
    </section>
  )
}
