import { MapPin } from 'lucide-react'
import { cn } from '@/utils/format'

/**
 * Mapa real de General Belgrano (Buenos Aires) con un pin central animado.
 * Usa OpenStreetMap embebido (sin API key). El iframe es no interactivo
 * (no captura el scroll táctil en mobile) y se superpone un pin propio
 * más un recuadro punteado rojo para remarcar el área de la guía.
 */
export function LocationMap({ className }: { className?: string }) {
  // Recuadro (bbox) centrado en General Belgrano: minLon,minLat,maxLon,maxLat.
  const bbox = '-58.585,-35.835,-58.383,-35.702'
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik`

  return (
    <div
      className={cn(
        'group relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-brand-50 shadow-card ring-1 ring-line sm:aspect-[16/11]',
        className,
      )}
    >
      {/* Mapa (no interactivo para no robar el scroll en mobile) */}
      <iframe
        title="Mapa de General Belgrano, Buenos Aires"
        src={src}
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full border-0"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Velo sutil para dar profundidad y legibilidad */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-900/25 via-transparent to-transparent" />

      {/* Recuadro del área (borde punteado rojo) */}
      <div className="pointer-events-none absolute inset-3 rounded-2xl border-2 border-dashed border-red-500/80" />

      {/* Pin central animado */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="relative flex items-center justify-center">
          <span className="absolute h-12 w-12 animate-ping rounded-full bg-red-500/30" />
          <span className="absolute h-8 w-8 rounded-full bg-red-500/20" />
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-red-500 text-white shadow-lg ring-4 ring-white">
            <MapPin className="h-5 w-5" />
          </span>
        </span>
      </div>

      {/* Etiqueta de localidad */}
      <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-sm font-bold text-ink shadow-soft backdrop-blur">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
        </span>
        General Belgrano, Bs. As.
      </div>

      {/* Aclaración inferior (en desktop se usa la tarjeta flotante de WhatsApp) */}
      <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-xl bg-brand-800/90 px-3 py-2 text-center text-xs font-semibold text-white backdrop-blur lg:hidden">
        Guía exclusiva de General Belgrano
      </div>
    </div>
  )
}
