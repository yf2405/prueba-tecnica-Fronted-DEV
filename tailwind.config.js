/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {colors: {
      'web-color':'#292927',
       'input-color':'#393936'
    }},
  },
  plugins: [],
}