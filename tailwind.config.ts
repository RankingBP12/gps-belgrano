import type { Config } from 'tailwindcss'

/**
 * GPS Belgrano — Design System
 * Paleta: azul (confianza) + verde (acción/WhatsApp) + blancos y grises muy suaves.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef3fb',
          100: '#d6e2f5',
          200: '#adc4ea',
          300: '#7b9fdb',
          400: '#4a76c7',
          500: '#1e52ab',
          600: '#0A3D91', // primario (azul intenso)
          700: '#093374', // hover
          800: '#0a2a5c', // azul oscuro (CTA / navy)
          900: '#0b234a',
        },
        accent: {
          50: '#eef8f0',
          100: '#d3edd9',
          200: '#a9dcb5',
          300: '#7bcb8e',
          400: '#57c06f',
          500: '#33A852', // verde principal
          600: '#2b9147', // whatsapp
          700: '#24763b', // hover
        },
        ink: {
          DEFAULT: '#0f172a',
          soft: '#475569',
          faint: '#94a3b8',
        },
        surface: '#ffffff',
        muted: '#f8fafc',
        line: '#e2e8f0',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        soft: '0 1px 3px 0 rgb(15 23 42 / 0.04), 0 1px 2px -1px rgb(15 23 42 / 0.06)',
        card: '0 4px 12px -2px rgb(15 23 42 / 0.06), 0 2px 6px -2px rgb(15 23 42 / 0.04)',
        hover: '0 12px 28px -6px rgb(15 23 42 / 0.12), 0 6px 12px -4px rgb(15 23 42 / 0.06)',
      },
      maxWidth: {
        content: '80rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'fade-in': 'fade-in 0.4s ease-out both',
      },
    },
  },
  plugins: [],
}

export default config
