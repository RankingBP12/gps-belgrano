import { useState } from 'react'
import { Grid2x2, ArrowRight } from 'lucide-react'
import { Section, SectionHeader, Skeleton } from '@/components/ui'
import { CategoryCard } from './CategoryCard'
import { CategoryModal } from './CategoryModal'
import { useCategories } from '@/hooks/useCategories'

const VISIBLE_COUNT = 7

/** Card "Ver más" que abre el modal con todas las categorías. */
function ViewMoreCard({ total, onClick }: { total: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col justify-between rounded-2xl bg-brand-800 p-6 text-left text-white shadow-card transition-all duration-200 ease-out hover:-translate-y-1.5 hover:shadow-hover"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 transition-transform duration-200 group-hover:scale-105">
        <Grid2x2 className="h-7 w-7" />
      </span>
      <div className="mt-6">
        <h3 className="text-lg font-bold">Ver más</h3>
        <p className="mt-1 text-sm text-white/80">{total} categorías en total</p>
      </div>
      <span className="mt-5 inline-flex w-max items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-sm font-semibold transition-colors group-hover:bg-white/25">
        Ver todas
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </button>
  )
}

export function CategoriesGrid() {
  const { categories, loading, error } = useCategories()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Section id="categorias">
      <SectionHeader
        eyebrow="Categorías"
        title="Explorá nuestras categorías"
        subtitle="Elegí el tipo de servicio que necesitás y encontrá profesionales verificados de tu zona."
      />

      {error && (
        <p className="text-center text-sm text-ink-soft">
          No pudimos cargar las categorías. Verificá tu conexión con Firebase.
        </p>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-2xl" />
          ))
        ) : (
          <>
            {categories.slice(0, VISIBLE_COUNT).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
            {categories.length > 0 && (
              <ViewMoreCard
                total={categories.length}
                onClick={() => setModalOpen(true)}
              />
            )}
          </>
        )}
      </div>

      {!loading && !error && categories.length === 0 && (
        <p className="mt-6 text-center text-sm text-ink-soft">
          Todavía no hay categorías cargadas. Ejecutá el seed:{' '}
          <code className="rounded bg-muted px-1.5 py-0.5">npm run seed</code>
        </p>
      )}

      <CategoryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        categories={categories}
      />
    </Section>
  )
}
