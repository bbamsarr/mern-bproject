/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-lightblueold': '#CFDBD9',
        'custom-lightblue': '#ffffff',
        'custom-orange': '#023e8a',
        'custom-beige': '#F6F6F0',
        'custom-darkblue': '#73605A',
        'custom-darkblueold': '#35545E',
        'custom-mediumblue': '#A7B3B1',
      }
    },
  },
  plugins: [],
}