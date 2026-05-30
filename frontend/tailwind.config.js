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
          50: '#f3f0ff',
          100: '#e9e0ff',
          200: '#d9c9ff',
          300: '#c5a8ff',
          400: '#a878ff',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6c63ff',
          800: '#5a3fa0',
          900: '#3d2a6f',
        },
        secondary: {
          50: '#e0f7ff',
          100: '#b3ecff',
          200: '#80e1ff',
          300: '#4dd9ff',
          400: '#26d0ff',
          500: '#00b4d8',
          600: '#0096c7',
          700: '#0077b6',
          800: '#005a96',
          900: '#003d7a',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        background: '#F8FAFC',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        fadeInUp: 'fadeInUp 0.6s ease-out',
        slideIn: 'slideIn 0.3s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(108, 99, 255, 0.3)',
        'glow-lg': '0 0 40px rgba(108, 99, 255, 0.4)',
        'card': '0 4px 6px rgba(0, 0, 0, 0.07), 0 10px 13px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [
    require('tailwindcss/plugin')(function({ addUtilities }) {
      addUtilities({
        '.glass': {
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          '-webkit-backdrop-filter': 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-dark': {
          background: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(20px)',
          '-webkit-backdrop-filter': 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      })
    })
  ],
  darkMode: 'class',
}
