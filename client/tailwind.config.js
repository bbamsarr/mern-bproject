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
        'custom-green':'#31614D',
        'custom-dark-beige': '#F0EBE1',


        'custom-header-color': '#FFFFFF',
        'custom-footer-color': '#73605A',
        'custom-contrast-color': '#023E8A',
        'custom-text-color': '#023E8A',
        'custom-bg-color': '#F6F5F2',
        'custom-light-beige': '#F6F6F0',
      },
    },
  },
  plugins: [],
}