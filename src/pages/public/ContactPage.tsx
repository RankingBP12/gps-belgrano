import { useState } from 'react'
import type { FormEvent } from 'react'
import { Mail, MessageCircle, MapPin, Send, CheckCircle2 } from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { Container, Input, Textarea, Button, buttonClasses } from '@/components/ui'
import { FilterField } from '@/components/filters/FilterField'
import { whatsappLink } from '@/utils/whatsapp'
import { useSettings } from '@/hooks/useSettings'

interface Channel {
  icon: typeof MessageCircle
  title: string
  value: string
  href?: string
  accent: string
}

export function ContactPage() {
  const { whatsapp, email } = useSettings()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }))

  const channels: Channel[] = [
    ...(whatsapp
      ? [
          {
            icon: MessageCircle,
            title: 'WhatsApp',
            value: 'Respondemos al instante',
            href: whatsappLink(whatsapp, 'Hola! Quiero hacer una consulta'),
            accent: 'text-accent-600 bg-accent-50',
          },
        ]
      : []),
    ...(email
      ? [
          {
            icon: Mail,
            title: 'Email',
            value: email,
            href: `mailto:${email}`,
            accent: 'text-brand-600 bg-brand-50',
          },
        ]
      : []),
    {
      icon: MapPin,
      title: 'Ubicación',
      value: 'Belgrano y alrededores',
      href: undefined,
      accent: 'text-purple-600 bg-purple-50',
    },
  ]

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <PageHero
        title="Hablemos"
        subtitle="¿Tenés una duda, sugerencia o querés sumar tu comercio? Estamos para ayudarte."
      />

      <Container className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Canales */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-ink">Canales de contacto</h2>
            <p className="text-sm text-ink-soft">
              Elegí el medio que prefieras. Solemos responder en el día.
            </p>
            <div className="space-y-3 pt-2">
              {channels.map((c) => {
                const content = (
                  <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-card transition-all hover:border-brand-200 hover:shadow-hover">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.accent}`}
                    >
                      <c.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{c.title}</p>
                      <p className="text-sm text-ink-soft">{c.value}</p>
                    </div>
                  </div>
                )
                return c.href ? (
                  <a
                    key={c.title}
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={c.title}>{content}</div>
                )
              })}
            </div>
          </div>

          {/* Formulario */}
          <div>
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-accent-200 bg-accent-50/60 p-10 text-center">
                <CheckCircle2 className="h-14 w-14 text-accent-600" />
                <h3 className="mt-4 text-xl font-bold text-ink">
                  ¡Gracias por escribirnos!
                </h3>
                <p className="mt-2 text-ink-soft">Te responderemos a la brevedad.</p>
                {whatsapp && (
                  <a
                    href={whatsappLink(whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClasses('whatsapp', 'md', false, 'mt-6')}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chatear ahora
                  </a>
                )}
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-line bg-white p-6 shadow-card md:p-8"
              >
                <h2 className="text-xl font-bold text-ink">Envianos un mensaje</h2>
                <div className="mt-6 space-y-4">
                  <FilterField label="Nombre">
                    <Input
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                      placeholder="Tu nombre"
                      required
                    />
                  </FilterField>
                  <FilterField label="Email">
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      placeholder="tu@email.com"
                      required
                    />
                  </FilterField>
                  <FilterField label="Mensaje">
                    <Textarea
                      value={form.message}
                      onChange={(e) => set('message', e.target.value)}
                      placeholder="¿En qué podemos ayudarte?"
                      rows={5}
                      required
                    />
                  </FilterField>
                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    leftIcon={<Send className="h-4 w-4" />}
                  >
                    Enviar mensaje
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </>
  )
}
