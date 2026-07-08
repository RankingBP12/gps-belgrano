import { useState } from 'react'
import { ImageIcon } from 'lucide-react'
import { cn } from '@/utils/format'

export function ProfileGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0)

  if (images.length === 0) {
    return (
      <div className="flex h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-muted text-ink-faint">
        <ImageIcon className="h-8 w-8" />
        <p className="mt-2 text-sm">Sin imágenes en la galería</p>
      </div>
    )
  }

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-line bg-muted">
        <img
          src={images[active]}
          alt={`Trabajo ${active + 1}`}
          loading="lazy"
          className="aspect-video w-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              className={cn(
                'overflow-hidden rounded-xl border-2 transition-all',
                i === active
                  ? 'border-brand-500 ring-2 ring-brand-500/20'
                  : 'border-transparent opacity-70 hover:opacity-100',
              )}
            >
              <img
                src={img}
                alt={`Miniatura ${i + 1}`}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
