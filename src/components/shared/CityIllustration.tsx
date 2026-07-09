import { cn } from '@/utils/format'

/**
 * Ilustración panorámica de ciudad (SVG autocontenido, siempre renderiza).
 * Paleta en tonos de la marca para transmitir limpieza y confianza.
 */
export function CityIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-auto w-full', className)}
      role="img"
      aria-label="Ilustración del pueblo de Belgrano"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eef3fb" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        <clipPath id="round">
          <rect x="0" y="0" width="640" height="460" rx="24" />
        </clipPath>
      </defs>

      <g clipPath="url(#round)">
        {/* Cielo */}
        <rect width="640" height="460" fill="url(#sky)" />

        {/* Sol / halo */}
        <circle cx="520" cy="110" r="46" fill="#d3edd9" opacity="0.7" />
        <circle cx="520" cy="110" r="28" fill="#a9dcb5" opacity="0.8" />

        {/* Edificios de fondo */}
        <g opacity="0.5" fill="#adc4ea">
          <rect x="20" y="200" width="70" height="180" rx="6" />
          <rect x="100" y="160" width="54" height="220" rx="6" />
          <rect x="470" y="180" width="60" height="200" rx="6" />
          <rect x="540" y="210" width="80" height="170" rx="6" />
        </g>

        {/* Edificios medios */}
        <g fill="#7b9fdb">
          <rect x="150" y="230" width="80" height="150" rx="8" />
          <rect x="380" y="210" width="90" height="170" rx="8" />
        </g>

        {/* Edificios frente (marca) */}
        <g fill="#0A3D91">
          <rect x="230" y="180" width="150" height="200" rx="10" />
        </g>
        <g fill="#093374">
          <rect x="80" y="270" width="90" height="110" rx="8" />
          <rect x="450" y="260" width="110" height="120" rx="8" />
        </g>

        {/* Ventanas */}
        <g fill="#ffffff" opacity="0.85">
          <rect x="250" y="200" width="16" height="16" rx="3" />
          <rect x="280" y="200" width="16" height="16" rx="3" />
          <rect x="310" y="200" width="16" height="16" rx="3" />
          <rect x="340" y="200" width="16" height="16" rx="3" />
          <rect x="250" y="232" width="16" height="16" rx="3" />
          <rect x="280" y="232" width="16" height="16" rx="3" />
          <rect x="310" y="232" width="16" height="16" rx="3" />
          <rect x="340" y="232" width="16" height="16" rx="3" />
          <rect x="250" y="264" width="16" height="16" rx="3" />
          <rect x="280" y="264" width="16" height="16" rx="3" />
          <rect x="310" y="264" width="16" height="16" rx="3" />
          <rect x="340" y="264" width="16" height="16" rx="3" />
        </g>
        <g fill="#57c06f" opacity="0.9">
          <rect x="250" y="296" width="16" height="16" rx="3" />
          <rect x="340" y="296" width="16" height="16" rx="3" />
        </g>

        {/* Suelo / vereda */}
        <rect x="0" y="378" width="640" height="82" fill="#d6e2f5" />
        <rect x="0" y="378" width="640" height="6" fill="#adc4ea" />

        {/* Arbolitos */}
        <g>
          <rect x="196" y="356" width="6" height="24" fill="#24763b" />
          <circle cx="199" cy="350" r="16" fill="#33A852" />
          <rect x="426" y="356" width="6" height="24" fill="#24763b" />
          <circle cx="429" cy="350" r="16" fill="#33A852" />
        </g>
      </g>
    </svg>
  )
}

/** Pin grande (azul) con casa (verde) dentro — para superponer sobre la ciudad. */
export function BigPin({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="60" cy="140" rx="26" ry="7" fill="#0A3D91" opacity="0.18" />
      <path
        d="M60 4C32 4 9 26 9 53c0 34 51 82 51 82s51-48 51-82C111 26 88 4 60 4Z"
        fill="#0A3D91"
      />
      <path
        d="M60 4C32 4 9 26 9 53c0 34 51 82 51 82s51-48 51-82C111 26 88 4 60 4Z"
        fill="#093374"
        opacity="0.25"
      />
      {/* Casa verde */}
      <path
        d="M60 26 86 47H80v25a2 2 0 0 1-2 2H66V58H54v16H42a2 2 0 0 1-2-2V47h-6L60 26Z"
        fill="#33A852"
      />
    </svg>
  )
}
