// src/tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,vue}',
  ],
  safelist: [
    'hover:bg-pink-500',
    'hover:bg-red-500',
    'hover:bg-teal-500',
    'hover:bg-yellow-500',
    'hover:bg-purple-500',
    'hover:bg-blue-500',
    'hover:bg-orange-500',
    'hover:bg-gray-500',
    'hover:bg-gray-700',
    'hover:bg-green-500',
    'hover:bg-lime-500',
    'hover:bg-violet-500',
  ],
  theme: {
    extend: {
      colors: {
        pink: { 500: '#f472b6' },
        red: { 500: '#f87171' },
        teal: { 500: '#5eead4' },
        yellow: { 500: '#facc15' },
        purple: { 500: '#8b5cf6' },
        blue: { 500: '#3b82f6' },
        orange: { 500: '#fb923c' },
        gray: { 500: '#9ca3af', 700: '#374151' },
        green: { 500: '#34d399' },
        lime: { 500: '#84cc16' },
        violet: { 500: '#8b5cf6' },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
