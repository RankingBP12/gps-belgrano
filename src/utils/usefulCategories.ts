import {
  Siren,
  Shield,
  Flame,
  Ambulance,
  Landmark,
  Plug,
  Info,
  type LucideProps,
} from 'lucide-react'
import type { ComponentType } from 'react'
import type { CategoryColor } from '@/types'

export interface UsefulCategoryDef {
  value: string
  label: string
  icon: ComponentType<LucideProps>
  color: CategoryColor
}

/** Categorías de datos de interés (orden = orden de aparición en la vista). */
export const USEFUL_CATEGORIES: UsefulCategoryDef[] = [
  { value: 'emergencias', label: 'Emergencias', icon: Siren, color: 'red' },
  { value: 'policia', label: 'Policía', icon: Shield, color: 'blue' },
  { value: 'bomberos', label: 'Bomberos', icon: Flame, color: 'orange' },
  { value: 'salud', label: 'Salud', icon: Ambulance, color: 'green' },
  { value: 'municipio', label: 'Municipio', icon: Landmark, color: 'purple' },
  {
    value: 'servicios',
    label: 'Servicios (luz, agua, gas)',
    icon: Plug,
    color: 'cyan',
  },
  { value: 'otros', label: 'Otros', icon: Info, color: 'teal' },
]

export function getUsefulCategory(value: string): UsefulCategoryDef {
  return (
    USEFUL_CATEGORIES.find((c) => c.value === value) ??
    USEFUL_CATEGORIES[USEFUL_CATEGORIES.length - 1]
  )
}
