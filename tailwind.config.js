/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Segoe UI"',
          'sans-serif',
        ],
      },
      boxShadow: {
        glass: '0 24px 80px rgba(15, 23, 42, 0.18)',
        'glass-soft': '0 16px 42px rgba(15, 23, 42, 0.12)',
      },
    },
  },
  plugins: [],
};
