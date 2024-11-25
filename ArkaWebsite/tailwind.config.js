/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
      extend: {
        fontFamily: {
        inter: ['"Inter"', "sans-serif"],
        nunito: ['"Nunito"', "sans-serif"],
      },
      },
      screens: {
        'xs': '350px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      }
  },
  plugins: [],
}
