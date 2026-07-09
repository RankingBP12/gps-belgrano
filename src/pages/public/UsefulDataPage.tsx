import { useEffect, useMemo, useState } from 'react'
import { Phone, MapPin, Search, Info } from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { Container, Input, Skeleton, buttonClasses } from '@/components/ui'
import { getUsefulContacts } from '@/services/usefulContacts.service'
import { USEFUL_CATEGORIES } from '@/utils/usefulCategories'
import { getColorClasses } from '@/utils/categoryColors'
import { telLink } from '@/utils/whatsapp'
import { slugify } from '@/utils/slugify'
import type { UsefulContact } from '@/types'

function ContactCard({ contact }: { contact: UsefulContact }) {
  return (
    <div className="flex flex-col rounded-2xl border border-line bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-hover">
      <h3 className="font-bold text-ink">{contact.name}</h3>
      {contact.description && (
        <p className="mt-1 text-sm text-ink-soft">{contact.description}</p>
      )}
      {contact.address && (
        <p className="mt-2 flex items-start gap-1.5 text-sm text-ink-soft">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" />
          {contact.address}
        </p>
      )}
      <a
        href={telLink(contact.phone)}
        className={buttonClasses('primary', 'md', true, 'mt-4')}
      >
        <Phone className="h-4 w-4" />
        {contact.phone}
      </a>
    </div>
  )
}

export function UsefulDataPage() {
  const [contacts, setContacts] = useState<UsefulContact[]>([])
  const [loading, setLoading] = useState(true)
  const [term, setTerm] = useState('')

  useEffect(() => {
    let active = true
    getUsefulContacts()
      .then((list) => {
        if (active) {
          setContacts(list.filter((c) => c.active !== false))
          setLoading(false)
        }
      })
      .catch(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  const filtered = useMemo(() => {
    const t = slugify(term)
    if (!t) return contacts
    return contacts.filter(
      (c) =>
        slugify(c.name).includes(t) ||
        slugify(c.description ?? '').includes(t) ||
        c.phone.includes(term.trim()),
    )
  }, [contacts, term])

  // Agrupa por categoría respetando el orden de USEFUL_CATEGORIES.
  const groups = useMemo(() => {
    return USEFUL_CATEGORIES.map((cat) => ({
      def: cat,
      items: filtered.filter((c) => c.category === cat.value),
    })).filter((g) => g.items.length > 0)
  }, [filtered])

  return (
    <>
      <PageHero
        gradient="from-brand-700 to-brand-900"
        icon={<Info className="h-7 w-7" />}
        title="Datos de interés"
        subtitle="Teléfonos útiles del pueblo: emergencias, policía, bomberos, salud y más. Todo a mano cuando lo necesitás."
      />

      <Container className="py-10 md:py-14">
        {/* Buscador */}
        <div className="mx-auto mb-8 max-w-md">
          <Input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Buscar un contacto o teléfono…"
            leftIcon={<Search className="h-4 w-4" />}
          />
        </div>

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-2xl" />
            ))}
          </div>
        ) : groups.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-white p-12 text-center">
            <Info className="mx-auto h-10 w-10 text-ink-faint" />
            <h3 className="mt-4 font-semibold text-ink">
              {contacts.length === 0
                ? 'Todavía no hay datos cargados'
                : 'Sin resultados'}
            </h3>
            <p className="mt-1 text-sm text-ink-soft">
              {contacts.length === 0
                ? 'Pronto vas a encontrar acá los teléfonos útiles del pueblo.'
                : 'Probá con otra palabra o número.'}
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {groups.map(({ def, items }) => {
              const colors = getColorClasses(def.color)
              return (
                <section key={def.value}>
                  <div className="mb-5 flex items-center gap-3">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl text-white ${colors.solidBg}`}
                    >
                      <def.icon className="h-6 w-6" />
                    </span>
                    <h2 className="text-xl font-bold text-ink">{def.label}</h2>
                    <span className="ml-1 rounded-full bg-muted px-2.5 py-0.5 text-sm font-medium text-ink-soft">
                      {items.length}
                    </span>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((c) => (
                      <ContactCard key={c.id} contact={c} />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        )}
      </Container>
    </>
  )
}
