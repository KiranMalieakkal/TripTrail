/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        map: "url('/Users/salt-dev/Desktop/Personal/hackweekdemo/src/assets/mapImage2.jpg')",
      },
    },
  },
  plugins: [],
};

// https://png.pngtree.com/thumb_back/fh260/background/20200205/pngtree-3d-world-map-with-shadow-light-image_329158.jpg
// https://st2.depositphotos.com/6396642/12259/v/950/depositphotos_122595008-stock-illustration-world-map-abstract-vector-background.jpg
