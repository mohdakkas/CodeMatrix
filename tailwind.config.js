/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"],
      },
      colors: {
        forge: {
          bg: "#090d12",
          panel: "#111821",
          soft: "#182231",
          line: "#263241",
          accent: "#f59e0b",
          cyan: "#22d3ee",
        },
      },
      boxShadow: {
        glow: "0 0 35px rgba(34, 211, 238, 0.12)",
      },
    },
  },
  plugins: [],
};
