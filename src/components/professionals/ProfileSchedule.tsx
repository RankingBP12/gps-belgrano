import { Clock } from 'lucide-react'
import type { DaySchedule } from '@/types'
import { cn } from '@/utils/format'

const DAY_LABELS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

export function ProfileSchedule({ schedule }: { schedule?: DaySchedule[] }) {
  // Orden Lunes → Domingo.
  const ordered = [1, 2, 3, 4, 5, 6, 0].map((day) =>
    schedule?.find((s) => s.day === day),
  )
  const todayIdx = new Date().getDay()

  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-card">
      <h3 className="flex items-center gap-2 font-semibold text-ink">
        <Clock className="h-4 w-4 text-brand-600" />
        Horarios de atención
      </h3>

      <ul className="mt-4 space-y-1">
        {[1, 2, 3, 4, 5, 6, 0].map((day, i) => {
          const s = ordered[i]
          const isToday = day === todayIdx
          return (
            <li
              key={day}
              className={cn(
                'flex items-center justify-between rounded-lg px-3 py-2 text-sm',
                isToday ? 'bg-brand-50' : '',
              )}
            >
              <span
                className={cn(
                  'font-medium',
                  isToday ? 'text-brand-700' : 'text-ink',
                )}
              >
                {DAY_LABELS[day]}
                {isToday && <span className="ml-1.5 text-xs">(hoy)</span>}
              </span>
              <span className="text-ink-soft">
                {!s || s.closed ? (
                  <span className="text-ink-faint">Cerrado</span>
                ) : (
                  `${s.open} – ${s.close}`
                )}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
