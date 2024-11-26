const animate = require("tailwindcss-animate");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx,vue}",
    "./components/**/*.{ts,tsx,vue}",
    "./app/**/*.{ts,tsx,vue}",
    "./src/**/*.{ts,tsx,vue}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        "primary-dark": "#303030",
        blue: {
          active: "#3B97CB",
          alice: "#E7F5FD",
          pattens: "#CAECFF",
          summersky: "#2D9CDB",
          dodger: "#0099EE",
        },
        aquamarine: "#56E4A0",
        bittersweet: "#F36868",
      },
      screens: {
        xs: "376px",
      },
      fontFamily: {
        roboto: "Roboto",
      },
    },
  },
  plugins: [animate],
};
