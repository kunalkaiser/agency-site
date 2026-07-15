import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f3f6fa",
          100: "#e4ebf3",
          200: "#c6d5e5",
          300: "#9ab5cf",
          400: "#688fb4",
          500: "#47729c",
          600: "#365a82",
          700: "#2d4969",
          800: "#293f58",
          900: "#1b2c40",
          950: "#111d2c",
        },
        sand: {
          50: "#faf8f4",
          100: "#f3efe7",
          200: "#e6ded0",
          300: "#d4c7b1",
          400: "#bfab8d",
          500: "#af9673",
          600: "#a08463",
          700: "#856c53",
          800: "#6d5947",
          900: "#59493b",
        },
      },
      fontFamily: {
        serif: ["Iowan Old Style", "Palatino Linotype", "Palatino", "Georgia", "serif"],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
