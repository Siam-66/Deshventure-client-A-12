/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',  // Add this line here, at the top level
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        glow: {
          "0%, 100%": { textShadow: "0 0 10px #fbbf24, 0 0 20px #fbbf24, 0 0 30px #f59e0b" },
          "50%": { textShadow: "0 0 20px #fbbf24, 0 0 40px #fbbf24, 0 0 60px #f59e0b" },
        },
      },
      animation: {
        glow: "glow 2s infinite",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
}