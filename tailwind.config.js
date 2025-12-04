/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          300: '#B794F6',
          400: '#9F5FE8',
          500: '#790ECB',
        },
        black: {
          900: '#0A0A0A',
        },
        prey: {
          300: '#D1D5DB',
          400: '#9CA3AF',
          700: '#374151',
          750: '#2D3748',
          900: '#1F2937',
        },
      },
    },
  },
  plugins: [],
}
