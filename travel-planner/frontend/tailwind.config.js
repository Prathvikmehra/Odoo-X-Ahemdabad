/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfcf9',
          100: '#fcf9f3',
          200: '#f7f2e7',
          300: '#eee6d4',
          400: '#e3d7bf',
        },
        ink: {
          DEFAULT: '#1c1c18',
          secondary: '#46464c',
          muted: '#76777d',
          faint: '#c6c6cc',
        },
        teal: {
          DEFAULT: '#00696d',
          accent: '#00696d',
          light: '#9af1f5',
          soft: '#e6f7f8',
          dark: '#004f52',
        },
        sand: {
          DEFAULT: '#dbc3a8',
          soft: '#f5ede4',
          dark: '#261908',
        }
      },
      fontFamily: {
        sans: ['Geist', 'Plus Jakarta Sans', 'Outfit', 'sans-serif'],
        display: ['Geist', 'Outfit', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
        '5xl': '48px',
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'float': '0 20px 40px -15px rgba(28, 28, 24, 0.08)',
        'modal': '0 25px 50px -12px rgba(28, 28, 24, 0.25)',
      },
      letterSpacing: {
        'eyebrow': '0.12em',
        'tight-display': '-0.035em',
      }
    },
  },
  plugins: [],
}
