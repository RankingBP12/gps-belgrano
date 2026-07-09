import { MapPin } from 'lucide-react'
import { cn } from '@/utils/format'

/**
 * Mapa real de General Belgrano (Buenos Aires) con el pin de la localidad.
 * Usa OpenStreetMap embebido (sin API key). Se remarca el área con un borde
 * punteado rojo para dejar claro que la guía es solo para General Belgrano.
 */
export function LocationMap({ className }: { className?: string }) {
  // Coordenadas de General Belgrano, Buenos Aires.
  const lat = -35.7683
  const lon = -58.4842
  // Recuadro (bbox) alrededor del pueblo: minLon,minLat,maxLon,maxLat.
  const bbox = '-58.585,-35.835,-58.383,-35.702'
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl shadow-card ring-1 ring-line',
        className,
      )}
    >
      <iframe
        title="Mapa de General Belgrano, Buenos Aires"
        src={src}
        loading="lazy"
        className="aspect-[4/3] w-full border-0"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Remarcado del área (borde punteado rojo) */}
      <div className="pointer-events-none absolute inset-3 rounded-2xl border-2 border-dashed border-red-500/80" />

      {/* Etiqueta de localidad */}
      <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-sm font-bold text-ink shadow-soft backdrop-blur">
        <MapPin className="h-4 w-4 text-red-500" />
        General Belgrano, Bs. As.
      </div>
    </div>
  )
}
