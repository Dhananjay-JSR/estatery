/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      'colors':{
        'purpled':'#6f66ef',
        'purplew':'#eae7fa'
      }
    },
  },
  plugins: [],
}
