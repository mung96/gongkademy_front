/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {},
    colors: {
      primary: {
        50: '#F0F9FF',
        100: '#E0F2FE',
        200: '#BAE6FD',
        300: '#7DD3FC',
        400: '#38BDF8',
        500: '#00B0FF',
        600: '#0290D9',
        700: '#0379BA',
        800: '#086A9E',
        900: '#0F5B87',
        950: '#0B4063'
      },
      secondary: {
        50: '#FFF5ED',
        100: '#FFE9D4',
        200: '#FFCFA8',
        300: '#FFAD70',
        400: '#FF7E37',
        500: '#FF5B0F',
        600: '#F05006',
        700: '#C73D07',
        800: '#9E370E',
        900: '#7F290F',
        950: '#451A05'
      },
      neutral: {
        0: '#FFFFFF',
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
        950: '#030712'
      },
      system: {
        red: {
          100: '#FF5E4D',
          200: '#FA4F34',
          300: '#F52F18',
          400: '#F01700'
        },
        green: {
          100: '#5CE58E',
          200: '#4ADE80',
          300: '#22C55D',
          400: '#16A349'
        }
      }
    }
  },
  plugins: []
};
