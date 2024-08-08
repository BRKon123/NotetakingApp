/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      boxShadow: {
        "vertical-slate-300": "0 4px 0 0 rgba(203, 213, 225, 1)", // Custom vertical shadow
      },
      content: {
        bullet: "\u2022", // Unicode for bullet character
      },
    },
  },
  plugins: [],
};
