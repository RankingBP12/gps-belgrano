import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Icon } from '@/components/ui'
import { getColorClasses } from '@/utils/categoryColors'
import type { Category } from '@/types'
import { cn } from '@/utils/format'

/** Tarjeta de categoría con color sólido (icono y texto blancos). */
export function CategoryCard({ category }: { category: Category }) {
  const colors = getColorClasses(category.color)

  return (
    <Link
      to={`/${category.slug}`}
      className={cn(
        'group flex flex-col justify-between rounded-2xl p-6 text-white shadow-card transition-all duration-200 ease-out hover:-translate-y-1.5 hover:shadow-hover',
        colors.solidBg,
      )}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 transition-transform duration-200 group-hover:scale-105">
        <Icon name={category.icon} className="h-7 w-7 text-white" />
      </span>

      <div className="mt-6">
        <h3 className="text-lg font-bold">{category.name}</h3>
        {category.description && (
          <p className="mt-1 text-sm text-white/80">{category.description}</p>
        )}
      </div>

      <span className="mt-5 inline-flex w-max items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-sm font-semibold transition-colors group-hover:bg-white/25">
        Ver profesionales
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}
