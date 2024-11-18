/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        map: "url('src/assets/mapImage2.jpg')",
        journal: "url('src/assets/mapImage3.jpg')",
      },
      fontFamily: {
        merriweather: ["Merriweather"],
      },
      colors: {
        custom: {
          primary: "#CCCCCC",
          secondary: "#8f8f8f",
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
