/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          '900': '#3d2c20',
          '800': '#5d4037',
        },
        red: {
          '700': '#a23e2e',
          '800': '#8b2e22',
          '900': '#6f1f18',
        },
        yellow: {
          '600': '#b8812e',
        },
        'quecos-orange-light': '#e67300',
        primary: {
          '500': '#b8812e',
          '600': '#a27829',
        },
        accent: {
          '500': '#e67300',
        },
        success: '#10b981',
        error: '#ef4444',
      },
      fontFamily: {
        // sans: ['Your-Brand-Font', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
