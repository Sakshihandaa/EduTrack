/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f1f8f4',
          100: '#e0f1e8',
          200: '#b7e1cb',
          300: '#8eccac',
          400: '#52b788',
          500: '#40916c',
          600: '#2d6a4f',
          700: '#1b4332',
          800: '#133527',
          900: '#081c15',
        },
        warm: {
          50: '#fcfbf8',
          100: '#f6f3eb',
          200: '#ede7db',
          300: '#ded4c1',
          400: '#c5b59b',
          500: '#a89475',
          600: '#867253',
          700: '#68573e',
          800: '#4c3f2d',
          900: '#2c2419',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
