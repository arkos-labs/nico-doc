import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        overlay: {
          bg: 'rgba(10, 10, 20, 0.85)',
          border: 'rgba(99, 102, 241, 0.4)',
          accent: '#6366f1',
        },
      },
      animation: {
        pulse_slow: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        fadeIn: 'fadeIn 0.3s ease-in-out',
        shimmer: 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        }
      },
    },
  },
  plugins: [],
}

export default config
