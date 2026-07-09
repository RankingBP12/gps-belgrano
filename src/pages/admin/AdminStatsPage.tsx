import { useEffect, useMemo, useState } from 'react'
import {
  FolderTree,
  Users,
  ShieldCheck,
  CircleDot,
  Star,
  Inbox,
} from 'lucide-react'
import { StatCard } from '@/components/admin/StatCard'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { Icon, Skeleton } from '@/components/ui'
import { getAllCategories } from '@/services/categories.service'
import { getAllProfessionals } from '@/services/professionals.service'
import { getAllRequests } from '@/services/requests.service'
import { getColorClasses } from '@/utils/categoryColors'
import { getCategoryIds } from '@/utils/professionalCategories'
import type { Category, Professional, ServiceRequest } from '@/types'

export function AdminStatsPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [requests, setRequests] = useState<ServiceRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    Promise.all([
      getAllCategories(),
      getAllProfessionals(),
      getAllRequests().catch(() => [] as ServiceRequest[]),
    ])
      .then(([cats, pros, reqs]) => {
        if (!active) return
        setCategories(cats)
        setProfessionals(pros)
        setRequests(reqs)
        setLoading(false)
      })
      .catch(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  const stats = useMemo(() => {
    const verified = professionals.filter((p) => p.verified).length
    const available = professionals.filter((p) => p.available).length
    const featured = professionals.filter((p) => p.featured).length

    // Profesionales por categoría (cuenta en cada una de sus categorías).
    const countByCat = new Map<string, number>()
    professionals.forEach((p) =>
      getCategoryIds(p).forEach((cid) =>
        countByCat.set(cid, (countByCat.get(cid) ?? 0) + 1),
      ),
    )
    const perCategory = categories
      .map((c) => ({ category: c, count: countByCat.get(c.id) ?? 0 }))
      .sort((a, b) => b.count - a.count)

    const max = Math.max(1, ...perCategory.map((x) => x.count))

    return { verified, available, featured, perCategory, max }
  }, [categories, professionals])

  if (loading) {
    return (
      <>
        <AdminPageHeader title="Estadísticas" subtitle="Resumen general del directorio" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
      </>
    )
  }

  const withPros = stats.perCategory.filter((x) => x.count > 0)

  return (
    <>
      <AdminPageHeader
        title="Estadísticas"
        subtitle="Resumen general del directorio GPS Belgrano"
      />

      {/* Tiles */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Profesionales registrados"
          value={professionals.length}
          icon={<Users className="h-5 w-5" />}
          accent="bg-brand-50 text-brand-600"
        />
        <StatCard
          label="Categorías"
          value={categories.length}
          icon={<FolderTree className="h-5 w-5" />}
          accent="bg-purple-50 text-purple-600"
          hint={`${categories.filter((c) => c.active !== false).length} activas`}
        />
        <StatCard
          label="Solicitudes recibidas"
          value={requests.length}
          icon={<Inbox className="h-5 w-5" />}
          accent="bg-amber-50 text-amber-600"
        />
        <StatCard
          label="Verificados"
          value={stats.verified}
          icon={<ShieldCheck className="h-5 w-5" />}
          accent="bg-accent-50 text-accent-600"
        />
        <StatCard
          label="Disponibles"
          value={stats.available}
          icon={<CircleDot className="h-5 w-5" />}
          accent="bg-teal-50 text-teal-600"
        />
        <StatCard
          label="Destacados"
          value={stats.featured}
          icon={<Star className="h-5 w-5" />}
          accent="bg-orange-50 text-orange-600"
        />
      </div>

      {/* Profesionales por categoría */}
      <div className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-card">
        <h2 className="font-bold text-ink">Profesionales por categoría</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Distribución de los profesionales registrados entre los rubros.
        </p>

        {withPros.length === 0 ? (
          <p className="mt-6 rounded-xl bg-muted p-6 text-center text-sm text-ink-soft">
            Todavía no hay profesionales registrados en ninguna categoría.
          </p>
        ) : (
          <ul className="mt-6 space-y-3">
            {withPros.map(({ category, count }) => {
              const colors = getColorClasses(category.color)
              const pct = Math.round((count / stats.max) * 100)
              return (
                <li key={category.id} className="flex items-center gap-3">
                  <div className="flex w-40 shrink-0 items-center gap-2">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-lg text-white ${colors.solidBg}`}
                    >
                      <Icon name={category.icon} className="h-4 w-4" />
                    </span>
                    <span className="truncate text-sm font-medium text-ink">
                      {category.name}
                    </span>
                  </div>
                  <div className="h-6 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`flex h-full items-center justify-end rounded-full px-2 ${colors.solidBg}`}
                      style={{ width: `${Math.max(pct, 8)}%` }}
                    >
                      <span className="text-xs font-bold text-white">{count}</span>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </>
  )
}
