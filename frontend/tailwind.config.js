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
          DEFAULT: '#e6225a', // vibrant pink/rose
          dark: '#c4184c',
          light: '#fb3d71'
        },
        secondary: {
          DEFAULT: '#fbc531', // vibrant yellow
          dark: '#e1b12c',
        },
        dark: {
          DEFAULT: '#111827',
          light: '#1f2937'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
