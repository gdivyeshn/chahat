/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        footerImg: "url('/src/images/footer.png')",
        MasalaPng: "url('/src/images/masala.png')",
        FlowerPng: "url('/src/images/flower.png')",
        AboutBannerPng: "url('/src/images/about-banner.png')",
      },
    },
    colors: {
      ...colors,
      primaryColor: "#EB0029",
      lightColor: "#FF4A4A",
      grayColor: "#A5A5A5",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
