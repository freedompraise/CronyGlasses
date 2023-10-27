/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    function ({ addComponents }) {
      addComponents({
        ".custom-container": {
          backgroundColor: "#ffffff",
          textAlign: "center",
          paddingX: "8.5rem",
          marginX: "auto",
          maxWidth: "72rem",
          marginTop: "2rem",
        },
      });
    },
  ],
};
