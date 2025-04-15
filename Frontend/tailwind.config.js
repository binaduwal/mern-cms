/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true, // centers the container
        screens: {
          md: '768px',  
          lg: '1080px', 
          xl: '1200px', // Keep consistent max-widths
        },
        padding: { 
          DEFAULT: '0', 
        },
      },
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      montserrat: ["Montserrat", "mono"],
      jamjure: ["Bai Jamjuree", "sans-serif"],
      roboto:["Roboto","sans-serif"],
      lato:["Lato","mono"],
      noto_sans:["Noto Sans","sans-serif"],

    }
  },

  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          width: '100%',
          maxWidth: '1200px', 
          paddingTop: '0.5rem',  
          paddingBottom: '0.5rem', 
          paddingLeft: '0.8rem', 
          paddingRight: '0.8rem', 
          
          '@screen md': {
            paddingTop: '0.8rem',  
            paddingBottom: '0.8rem', 
            paddingLeft: '1rem',
            paddingRight: '1rem',
          },
          '@screen lg': {
            paddingTop: '1rem',  
            paddingBottom: '1rem', 
            paddingLeft: '1.3rem',
            paddingRight: '1.3rem',
          },
          '@screen xl': {
            paddingTop: '1.5rem', 
            paddingBottom: '1.5rem', 
            paddingLeft: '2rem',
            paddingRight: '2rem',
          },
        },
      });
    },
  ],
}
