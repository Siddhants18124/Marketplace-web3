/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custom1: '#222831',
        custom2: '#393E46',
        custom3: '#5ad4d4',
        custom4: '#EEEEEE',

      },

      boxShadow: {
        bottomRight: '1px 1px 10px rgba(0, 0, 0, 0.2)', // Shadow at bottom right
      }
    },
  },
  plugins: [],
}

