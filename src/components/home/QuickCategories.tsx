import { Link } from 'react-router-dom'
import { LayoutGrid } from 'lucide-react'
import { Icon, Skeleton } from '@/components/ui'
import { useCategories } from '@/hooks/useCategories'
import { getColorClasses } from '@/utils/categoryColors'

/**
 * Chips de acceso rápido a las categorías más buscadas.
 * Hace visibles los rubros apenas se entra a la página (dentro del hero).
 */
export function QuickCategories({ limit = 8 }: { limit?: number }) {
  const { categories, loading } = useCategories()
  const items = categories.slice(0, limit)

  return (
    <div className="mt-8">
      <p className="mb-3 text-sm font-semibold text-ink-soft">Más buscados</p>

      <div className="flex flex-wrap gap-2">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-32 rounded-full" />
          ))
        ) : (
          <>
            {items.map((c) => {
              const colors = getColorClasses(c.color)
              return (
                <Link
                  key={c.id}
                  to={`/${c.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-line bg-white py-2 pl-2 pr-4 text-sm font-medium text-ink shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card"
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-white ${colors.solidBg}`}
                  >
                    <Icon name={c.icon} className="h-4 w-4" />
                  </span>
                  {c.name}
                </Link>
              )
            })}

            <a
              href="#categorias"
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              <LayoutGrid className="h-4 w-4" />
              Ver todas
            </a>
          </>
        )}
      </div>
    </div>
  )
}
