import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: "#08080a",
          900: "#0f0f11",
          850: "#131316",
          800: "#161619",
          700: "#1f1f24",
          600: "#2a2a32",
          500: "#3d3d47",
        },
        gold: {
          50: "#fbf8ec",
          100: "#f6efcd",
          200: "#eddba0",
          300: "#e3c26d",
          400: "#e5b842",
          500: "#c59b27",
          600: "#a97f1e",
          700: "#866019",
          800: "#6e4d1a",
          900: "#5b4019",
        },
        emeraldGlow: {
          DEFAULT: "#0f2e22",
          light: "#1a4d3a",
        },
        crimsonGlow: {
          DEFAULT: "#381116",
          light: "#5c1b24",
        },
        ivory: {
          50: "#ffffff",
          100: "#faf9f6",
          200: "#f4f2ea",
          300: "#eae6d8",
          400: "#dcd6c2",
        },
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #f3cf65 0%, #c59b27 50%, #9a7318 100%)",
        "gold-shimmer": "linear-gradient(90deg, transparent, rgba(229,184,66,0.25), transparent)",
        "radial-glow": "radial-gradient(circle at 50% 0%, rgba(197, 155, 39, 0.15), transparent 70%)",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.5s infinite",
        "pulse-slow": "pulseSlow 4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
