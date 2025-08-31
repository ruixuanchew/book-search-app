/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        // Define global colors
        brand:{
          primary: "#a0856b", 
          secondary: "#4e2917ff", 
          accent: "#7a9e7e",
          hover: "#9bbfa0"
        }
      },
      fontFamily:{
        sans: ["Saira", "system-ui", "sans-serif"]
      }
    },
  },
  plugins: [],
}

