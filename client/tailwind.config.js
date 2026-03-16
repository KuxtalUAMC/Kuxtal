/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Colores definidos por Daniel
        primary: "#2260FF",
        secondary: "#D8E9F3",
        textos: "#000000",
        blanco: "#FFFFFF",
        negro: "#000000",
        // Variación para hover
        'primary-dark': "#1a4ccc",
      },
      borderRadius: {
        'kuxtal': '1.25rem', // Bordes redondeados consistentes (20px)
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)', // Sombra sutil para tarjetas
      }
    },
  },
  plugins: [],
}