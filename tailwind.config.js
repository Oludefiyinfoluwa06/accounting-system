/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparentBlack: 'rgba(0, 0, 0, 0.65)',
        textError: '#721c24',
        bgError: '#f8d7da',
        bgSuccess: 'hsl(141, 71%, 48%)',
        textSuccess: 'green',
      }
    },
  },
  plugins: [],
}