/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#930018',
        'brand-deep': '#40000F',
        'brand-bright': '#E31F26',
        'bg-primary': '#FFF9EF',
        'bg-light': '#FFDEE5',
        'bg-soft-blue': '#D6E0FF',
        'pink-light': '#FFDEE5',
        'pink-mid': '#FFADB0',
        'blue-light': '#D6E0FF',
        'blue-mid': '#9BB4FF',
        'green-light': '#D0FCA1',
        'green-mid': '#B7EB7F',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '999px',
      },
    },
  },
  plugins: [],
}
