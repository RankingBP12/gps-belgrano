/** Color token que define el acento visual de la categoría. */
export type CategoryColor =
  | 'blue'
  | 'green'
  | 'amber'
  | 'red'
  | 'purple'
  | 'cyan'
  | 'orange'
  | 'pink'
  | 'teal'
  | 'indigo'

export interface Category {
  id: string
  name: string
  slug: string
  /** Nombre del icono de lucide-react (ej. "Zap", "Wrench"). */
  icon: string
  color: CategoryColor
  order: number
  active: boolean
  /** Texto corto opcional para la card. */
  description?: string
}
