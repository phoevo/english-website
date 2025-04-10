module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,vue}',
    // Add dynamic patterns for colors
    './src/**/*.{ts,tsx}', // Add your React/TypeScript files here if not already included
  ],
  safelist: [
    // Specific color classes for text and background
    'text-pink-500', 'text-red-500', 'text-teal-500', 'text-yellow-500', 'text-purple-500', 'text-blue-500',
    'text-orange-500', 'text-gray-500', 'text-green-500', 'text-lime-500', 'text-violet-500',
    'bg-pink-500', 'bg-red-500', 'bg-teal-500', 'bg-yellow-500', 'bg-purple-500', 'bg-blue-500',
    'bg-orange-500', 'bg-gray-500', 'bg-green-500', 'bg-lime-500', 'bg-violet-500',

    // Include hover classes
    'hover:bg-pink-500', 'hover:bg-red-500', 'hover:bg-teal-500', 'hover:bg-yellow-500',
    'hover:bg-purple-500', 'hover:bg-blue-500', 'hover:bg-orange-500', 'hover:bg-gray-500',
    'hover:bg-green-500', 'hover:bg-lime-500', 'hover:bg-violet-500',
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
    },
  },
  plugins: [],
}
