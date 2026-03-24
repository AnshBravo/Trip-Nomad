/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#211D2D',
        midnightFade: 'rgba(33, 29, 45, 0.85)',
        obsidian: '#0D0D0D',
        alabaster: '#3D348B',
        blush: '#F2DFD8',
      },
      fontFamily: {
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}