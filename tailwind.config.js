/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#1a0533',
          primary: '#3d1a78',
          accent: '#7c3aed',
          success: '#00C853',
        },
      },
      maxWidth: {
        phone: '430px',
      },
    },
  },
  plugins: [],
};
