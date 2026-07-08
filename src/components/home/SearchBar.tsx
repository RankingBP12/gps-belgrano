import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Input, Button } from '@/components/ui'
import { slugify } from '@/utils/slugify'

interface SearchBarProps {
  variant?: 'hero' | 'compact'
  defaultValue?: string
  /** Si se pasa, se ejecuta en vez de navegar. */
  onSearch?: (term: string) => void
  placeholder?: string
}

export function SearchBar({
  variant = 'hero',
  defaultValue = '',
  onSearch,
  placeholder = '¿Qué servicio necesitás? Ej: electricista, plomero…',
}: SearchBarProps) {
  const [term, setTerm] = useState(defaultValue)
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const value = term.trim()
    if (onSearch) {
      onSearch(value)
      return
    }
    if (value) navigate(`/${slugify(value)}`)
  }

  const isHero = variant === 'hero'

  return (
    <form
      onSubmit={handleSubmit}
      className={
        isHero
          ? 'flex w-full flex-col gap-2 rounded-2xl bg-white p-2 shadow-hover ring-1 ring-line sm:flex-row sm:items-center'
          : 'flex w-full flex-col gap-2 sm:flex-row'
      }
    >
      <div className="flex-1">
        <Input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder={placeholder}
          sizeVariant={isHero ? 'lg' : 'md'}
          leftIcon={<Search className="h-5 w-5" />}
          className={isHero ? 'border-transparent focus:ring-0' : undefined}
          aria-label="Buscar servicio"
        />
      </div>
      <Button type="submit" size={isHero ? 'lg' : 'md'} className="sm:w-auto">
        <Search className="h-4 w-4" />
        Buscar
      </Button>
    </form>
  )
}
