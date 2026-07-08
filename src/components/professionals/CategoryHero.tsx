import { Link } from 'react-router-dom'
import { ChevronRight, Users } from 'lucide-react'
import { Container, Icon, Skeleton } from '@/components/ui'
import { CityIllustration } from '@/components/shared/CityIllustration'
import { getColorClasses } from '@/utils/categoryColors'
import type { Category } from '@/types'

interface CategoryHeroProps {
  category: Category | null
  count: number
  loading: boolean
}

export function CategoryHero({ category, count, loading }: CategoryHeroProps) {
  const colors = category ? getColorClasses(category.color) : getColorClasses('blue')

  return (
    <div className="border-b border-line bg-muted/60">
      <Container className="py-8 md:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-ink-soft">
          <Link to="/" className="hover:text-brand-700">
            Inicio
          </Link>
          <ChevronRight className="h-4 w-4 text-ink-faint" />
          <Link to="/#categorias" className="hover:text-brand-700">
            Servicios
          </Link>
          <ChevronRight className="h-4 w-4 text-ink-faint" />
          <span className="font-medium text-ink">{category?.name ?? '…'}</span>
        </nav>

        <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          {/* Info */}
          <div className="flex items-center gap-5">
            <span
              className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-white shadow-card ${colors.solidBg}`}
            >
              {category ? (
                <Icon name={category.icon} className="h-9 w-9" />
              ) : (
                <Users className="h-9 w-9" />
              )}
            </span>

            <div className="min-w-0">
              {loading && !category ? (
                <Skeleton className="h-9 w-48" />
              ) : (
                <h1 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
                  {category?.name}
                </h1>
              )}
              <p className="mt-1.5 max-w-lg text-ink-soft">
                {category?.description ??
                  'Profesionales verificados de tu zona, listos para ayudarte.'}
              </p>
              <p className="mt-2 text-sm font-semibold text-brand-600">
                {loading
                  ? 'Buscando…'
                  : `${count} profesional${count === 1 ? '' : 'es'} disponible${
                      count === 1 ? '' : 's'
                    }`}
              </p>
            </div>
          </div>

          {/* Panorámica */}
          <div className="hidden w-80 xl:block">
            <CityIllustration className="rounded-2xl shadow-card ring-1 ring-line" />
          </div>
        </div>
      </Container>
    </div>
  )
}
