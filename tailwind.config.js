/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}" // <- esto es vital para que Tailwind analice tus componentes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
