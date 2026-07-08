import { useState } from 'react'
import type { FormEvent } from 'react'
import { Send, CheckCircle2, Briefcase } from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { Container, Input, Textarea, Button } from '@/components/ui'
import { FilterField } from '@/components/filters/FilterField'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'
import { RubroCombobox } from '@/components/shared/RubroCombobox'
import { useCategories } from '@/hooks/useCategories'
import { findMatchingCategory } from '@/utils/categoryMatch'
import { BUSINESS_WHATSAPP } from '@/utils/constants'

export function PublishServicePage() {
  const { categories } = useCategories()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: '',
    category: '',
    zone: '',
    phone: '',
    description: '',
  })

  const set = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }))

  // Si el rubro coincide con uno existente, se registra en ese; si no, es nuevo.
  const matchedCategory = findMatchingCategory(categories, form.category)
  const rubroLine = matchedCategory
    ? `Rubro: ${matchedCategory.name} (rubro existente)`
    : `Rubro: ${form.category} (nuevo rubro a revisar)`

  const waMessage =
    `Hola! Quiero publicar mi servicio en GPS Belgrano.\n\n` +
    `Nombre: ${form.name}\n${rubroLine}\nZona: ${form.zone}\n` +
    `Teléfono: ${form.phone}\nDescripción: ${form.description}`

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <PageHero
        gradient="from-accent-600 to-accent-700"
        icon={<Briefcase className="h-7 w-7" />}
        title="Publicá tu servicio"
        subtitle="Sumate gratis al directorio de GPS Belgrano y llegá a miles de vecinos que buscan profesionales de confianza."
      />

      <Container className="py-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          {sent ? (
            <div className="flex flex-col items-center rounded-2xl border border-accent-200 bg-accent-50/60 p-10 text-center">
              <CheckCircle2 className="h-14 w-14 text-accent-600" />
              <h2 className="mt-4 text-2xl font-bold text-ink">
                ¡Casi listo, {form.name.split(' ')[0] || 'crack'}!
              </h2>
              <p className="mt-2 max-w-md text-ink-soft">
                Confirmá tu solicitud enviándonos los datos por WhatsApp. Nuestro
                equipo revisará tu perfil y lo publicará a la brevedad.
              </p>
              <div className="mt-6">
                <WhatsAppButton
                  phone={BUSINESS_WHATSAPP}
                  message={waMessage}
                  size="lg"
                  label="Confirmar por WhatsApp"
                />
              </div>
              <Button
                variant="ghost"
                className="mt-3"
                onClick={() => setSent(false)}
              >
                Editar datos
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-line bg-white p-6 shadow-card md:p-8"
            >
              <h2 className="text-xl font-bold text-ink">Contanos sobre vos</h2>
              <p className="mt-1 text-sm text-ink-soft">
                Completá el formulario y coordinamos la publicación de tu perfil.
              </p>

              <div className="mt-6 space-y-4">
                <FilterField label="Nombre y apellido">
                  <Input
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="Ej: María González"
                    required
                  />
                </FilterField>

                <FilterField label="Rubro / Categoría">
                  <RubroCombobox
                    categories={categories}
                    value={form.category}
                    onChange={(v) => set('category', v)}
                  />
                </FilterField>

                <FilterField label="Zona">
                  <Input
                    value={form.zone}
                    onChange={(e) => set('zone', e.target.value)}
                    placeholder="Ej: Belgrano R"
                    required
                  />
                </FilterField>

                <FilterField label="Teléfono / WhatsApp">
                  <Input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    placeholder="Ej: 11 5555 5555"
                    required
                  />
                </FilterField>

                <FilterField label="Contanos qué servicios ofrecés">
                  <Textarea
                    value={form.description}
                    onChange={(e) => set('description', e.target.value)}
                    placeholder="Ej: Instalaciones eléctricas, reparaciones, urgencias 24hs…"
                    rows={4}
                  />
                </FilterField>

                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  leftIcon={<Send className="h-4 w-4" />}
                >
                  Continuar
                </Button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </>
  )
}
