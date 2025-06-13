/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  important: true,
  theme: {
    extend: {},
  },
  plugins: [],
  // Disable Tailwind's preflight to prevent conflicts with MUI
  corePlugins: {
    preflight: false,
  },
} 