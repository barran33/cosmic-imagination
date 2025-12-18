// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', 
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-space': '#0A0A0A',
        'neon-cyan': '#00FFFF',
        'cosmic-gray': '#AAAAAA',
      },
      dropShadow: {
        'neon-light': '0 0 5px rgba(0, 255, 255, 0.7), 0 0 15px rgba(0, 255, 255, 0.5)',
      },
      boxShadow: {
        'neon-light': '0 0 10px rgba(0, 255, 255, 0.8)',
      },
    },
  },
  plugins: [],
}