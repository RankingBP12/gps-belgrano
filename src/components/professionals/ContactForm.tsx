import { useState } from 'react'
import type { FormEvent } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'
import { Input, Textarea, Button } from '@/components/ui'
import { FilterField } from '@/components/filters/FilterField'
import { createRequest } from '@/services/requests.service'
import type { Professional } from '@/types'

type Status = 'idle' | 'sending' | 'success' | 'error'

export function ContactForm({ professional }: { professional: Professional }) {
  const [form, setForm] = useState({ clientName: '', phone: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const set = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.clientName.trim() || !form.phone.trim()) return

    setStatus('sending')
    try {
      await createRequest({
        professionalId: professional.id,
        clientName: form.clientName.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
      })
      setStatus('success')
      setForm({ clientName: '', phone: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-accent-200 bg-accent-50/60 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-accent-600" />
        <h3 className="mt-4 text-lg font-semibold text-ink">¡Mensaje enviado!</h3>
        <p className="mt-1.5 text-sm text-ink-soft">
          {professional.name} recibirá tu solicitud y se pondrá en contacto pronto.
        </p>
        <Button
          variant="outline"
          className="mt-5"
          onClick={() => setStatus('idle')}
        >
          Enviar otra consulta
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-white p-6 shadow-card"
    >
      <h3 className="text-lg font-semibold text-ink">Enviá una consulta</h3>
      <p className="mt-1 text-sm text-ink-soft">
        Dejá tus datos y {professional.name.split(' ')[0]} te responderá.
      </p>

      <div className="mt-5 space-y-4">
        <FilterField label="Tu nombre">
          <Input
            value={form.clientName}
            onChange={(e) => set('clientName', e.target.value)}
            placeholder="Ej: Juan Pérez"
            required
          />
        </FilterField>

        <FilterField label="Tu teléfono">
          <Input
            type="tel"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            placeholder="Ej: 11 5555 5555"
            required
          />
        </FilterField>

        <FilterField label="Mensaje">
          <Textarea
            value={form.message}
            onChange={(e) => set('message', e.target.value)}
            placeholder="Contale qué necesitás…"
            rows={4}
          />
        </FilterField>

        {status === 'error' && (
          <p className="text-sm text-red-600">
            Hubo un error al enviar. Intentá de nuevo o escribí por WhatsApp.
          </p>
        )}

        <Button
          type="submit"
          fullWidth
          disabled={status === 'sending'}
          leftIcon={<Send className="h-4 w-4" />}
        >
          {status === 'sending' ? 'Enviando…' : 'Enviar consulta'}
        </Button>
      </div>
    </form>
  )
}
