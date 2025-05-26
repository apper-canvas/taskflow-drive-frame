/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          light: '#818cf8',
          dark: '#4f46e5'
        },
        secondary: {
          DEFAULT: '#f59e0b',
          light: '#fbbf24',
          dark: '#d97706'
        },
        accent: '#ec4899',
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        },
        emerald: {
          DEFAULT: '#10b981',
          light: '#34d399',
          dark: '#059669'
        },
        red: {
          DEFAULT: '#ef4444',
          light: '#f87171',
          dark: '#dc2626'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'neu-light': '8px 8px 20px #e2e8f0, -8px -8px 20px #ffffff',
        'neu-dark': '8px 8px 20px rgba(0, 0, 0, 0.3), -8px -8px 20px rgba(255, 255, 255, 0.05)',
        'task': '0 2px 8px rgba(99, 102, 241, 0.1)',
        'task-hover': '0 8px 25px rgba(99, 102, 241, 0.15)'
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem'
      },
      backdropBlur: {
        'xs': '2px'
      }
    }
  },
  plugins: [],
  darkMode: 'class',
}