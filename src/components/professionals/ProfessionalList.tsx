import { SearchX } from 'lucide-react'
import { Skeleton } from '@/components/ui'
import { ProfessionalRow } from './ProfessionalRow'
import type { Professional } from '@/types'

interface ProfessionalListProps {
  professionals: Professional[]
  loading?: boolean
  skeletonCount?: number
}

function RowSkeleton() {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-line bg-white p-5 shadow-card sm:flex-row">
      <Skeleton className="h-40 w-full rounded-xl sm:w-44" />
      <div className="flex-1 space-y-3 py-1">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-6 w-56" />
        <Skeleton className="h-4 w-40" />
      </div>
      <div className="w-full space-y-2 sm:w-48">
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-11 w-full" />
      </div>
    </div>
  )
}

export function ProfessionalList({
  professionals,
  loading = false,
  skeletonCount = 4,
}: ProfessionalListProps) {
  if (loading) {
    return (
      <div className="space-y-5">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <RowSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (professionals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-muted/50 py-16 text-center">
        <SearchX className="h-10 w-10 text-ink-faint" />
        <h3 className="mt-4 font-semibold text-ink">Sin resultados</h3>
        <p className="mt-1 max-w-sm text-sm text-ink-soft">
          No encontramos profesionales con esos criterios. Probá ajustando los
          filtros o la búsqueda.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {professionals.map((p) => (
        <ProfessionalRow key={p.id} professional={p} />
      ))}
    </div>
  )
}
