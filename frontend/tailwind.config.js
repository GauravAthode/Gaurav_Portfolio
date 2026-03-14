/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
        'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        slate: {
          950: '#020617',
          900: '#0f172a',
        },
        indigo: {
          500: '#6366f1',
          600: '#4f46e5',
        },
        purple: {
          500: '#a855f7',
        },
        cyan: {
          500: '#06b6d4',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(99, 102, 241, 0.5)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
