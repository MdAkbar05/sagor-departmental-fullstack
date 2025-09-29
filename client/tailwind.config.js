/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    colors: {
      primary: "#E8740E",
      secondary: "rgba(232, 116, 14, 0.6)",
      coffe: "#FFF5EB",
      background: "#DDF2FD",
      hightlight: "#2EA100",
      dashNav: "#ffffff41",
      dashText: "#5e7d8b",
      dashBorder: "#CFD8DC",
      dashActive: "#383838",
    },
    fontFamily: {
      body: ["Poppins", "Arial", "sans-serif"],
      default: ["Poppins", "sans-serif"],
    },
    screens: {
      sm: "354px",
      md: "768px",
      lg: "924px",
      xl: "1280px",
    },
    // fontSize: {
    //   xs: "0.75rem",
    //   sm: "0.875rem",
    //   base: "1rem",
    //   lg: "1.125rem",
    //   xl: "1.25rem",
    // },
  },
};
export const plugins = [];
