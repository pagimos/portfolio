/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // editor surfaces, darkest to lightest
        abyss: "#07080A",
        editor: "#0B0D11",
        panel: "#10141A",
        elev: "#161B23",
        line: "#1B212B",
        line2: "#2A323F",
        // text
        fg: "#C7D0DD",
        dim: "#8892A4",
        comment: "#55606F",
        // syntax palette, doubles as the whole accent system
        acid: "#4ADE80",
        blue: "#7AA2F7",
        purple: "#BB9AF7",
        orange: "#FFA657",
        rose: "#FF7B72",
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
        sans: ['"Inter Tight"', "system-ui", "sans-serif"],
      },
      maxWidth: {
        page: "82rem",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
