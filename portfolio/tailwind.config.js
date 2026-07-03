/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070708",
        surface: "#0e0f11",
        line: "rgba(244, 243, 238, 0.09)",
        cream: "#f4f3ee",
        fog: "#8f9089",
        acid: {
          DEFAULT: "#d6f250",
          bright: "#e4ff5e",
          dim: "#9db33a",
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        serif: ['"Instrument Serif"', "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
