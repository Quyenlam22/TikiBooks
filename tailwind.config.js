// tailwind.config.js
module.exports = {
  darkMode: 'class', // hoặc 'media'
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
  plugins: [
    require('tailwind-scrollbar'),
  ],

};