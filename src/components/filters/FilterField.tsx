import type { ReactNode } from 'react'

/** Envoltura con label para cada control de filtro. */
export function FilterField({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      {children}
    </div>
  )
}
