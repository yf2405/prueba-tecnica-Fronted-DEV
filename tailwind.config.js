/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {colors: {
      'web-color':'#292927',
       'input-color':'#393936',
       'button-post-color':'#1ed760',
        'hover-button-post':'#4fc278',
        'hover-color':'#4a4a49',
        screens: {
          'lg': '992px', // Agrega esta línea si lg no está definido como 992px
        },
        maxWidth: {
          'modal-lg': '800px',
        },
        

    }},
  },
  plugins: [],
}