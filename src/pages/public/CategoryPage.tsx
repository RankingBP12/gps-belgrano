import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '@/components/ui'
import { SearchBar } from '@/components/home/SearchBar'
import { CategoryHero } from '@/components/professionals/CategoryHero'
import { FiltersBar } from '@/components/filters/FiltersBar'
import { DEFAULT_FILTERS, type ProfessionalFilters } from '@/components/filters/types'
import { ProfessionalList } from '@/components/professionals/ProfessionalList'
import { CategorySidebar } from '@/components/professionals/CategorySidebar'
import { FloatingHelpBar } from '@/components/shared/FloatingHelpBar'
import { NotFoundPage } from './NotFoundPage'
import { useCategory } from '@/hooks/useCategory'
import { useProfessionalsByCategory } from '@/hooks/useProfessionals'
import {
  filterProfessionals,
  extractSpecialties,
} from '@/utils/filterProfessionals'

export function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>()
  const { category, loading: catLoading } = useCategory(categorySlug)
  const { professionals, loading: proLoading } = useProfessionalsByCategory(
    category?.id,
  )
  const [filters, setFilters] = useState<ProfessionalFilters>(DEFAULT_FILTERS)

  const specialties = useMemo(
    () => extractSpecialties(professionals),
    [professionals],
  )
  const filtered = useMemo(
    () => filterProfessionals(professionals, filters),
    [professionals, filters],
  )

  if (!catLoading && !category) {
    return <NotFoundPage />
  }

  const loading = catLoading || proLoading
  const singular = category ? category.name.toLowerCase().replace(/s$/, '') : 'profesional'

  return (
    <>
      <CategoryHero
        category={category}
        count={filtered.length}
        loading={loading}
      />

      <Container className="py-8 md:py-10">
        {/* Buscador ancho */}
        <div className="mb-4">
          <SearchBar
            variant="hero"
            placeholder={`Buscá un ${singular} por nombre o especialidad…`}
            onSearch={(term) => setFilters((f) => ({ ...f, search: term }))}
          />
        </div>

        {/* Barra de filtros */}
        <FiltersBar
          filters={filters}
          onChange={setFilters}
          specialties={specialties}
        />

        {/* Layout 70 / 30 */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Listado */}
          <div>
            <ProfessionalList professionals={filtered} loading={proLoading} />
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <CategorySidebar categoryName={category?.name} />
          </aside>
        </div>
      </Container>

      <FloatingHelpBar
        question={`¿Necesitás un ${singular}?`}
        message={`Hola! Estoy buscando un ${singular} en Belgrano. ¿Me pueden ayudar?`}
      />
    </>
  )
}
