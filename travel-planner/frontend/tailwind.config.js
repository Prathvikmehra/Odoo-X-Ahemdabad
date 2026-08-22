/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F5EF',
        'on-background': '#101522',
        primary: '#FF6847',
        'on-primary': '#FFFFFF',
        secondary: '#16817D',
        'on-secondary': '#FFFFFF',
        surface: '#F7F5EF',
        'surface-container': '#E8E0D0',
        'surface-container-low': '#F7F5EF',
        'surface-container-high': '#E8E0D0',
        'surface-container-lowest': '#FFFFFF',
        outline: '#6B6B6B',
        'outline-variant': '#D0C8B8',
        muted: '#6B6B6B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
