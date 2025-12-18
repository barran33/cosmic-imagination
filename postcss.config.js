module.exports = {
  plugins: [
    // La versión 3.x requiere que se liste el plugin de Tailwind primero
    require('tailwindcss'),
    // Y luego el Autoprefixer
    require('autoprefixer'),
  ],
}