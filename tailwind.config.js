/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage:{
        "home": "url('/assets/bg.png')" //declara o nome que vai usar e passa o caminho;
      }
    },
  },
  plugins: [],
}

