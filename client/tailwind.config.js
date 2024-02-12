/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-lightblue': '#CFDBD9',
        'custom-orange': '#ED8566',
        'custom-beige': '#F6F6F0',
        'custom-darkblue': '#35545E',
        'custom-mediumblue': '#A7B3B1',
      }
    },
  },
  plugins: [],
}