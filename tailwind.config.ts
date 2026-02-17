import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: "#0B0F19",
          800: "#0E1225",
          700: "#131830",
          600: "#1A2040",
        },
        neon: {
          purple: "#8B5CF6",
          blue: "#3B82F6",
          pink: "#EC4899",
          cyan: "#06B6D4",
          magenta: "#D946EF",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "SF Pro Display",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient":
          "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #EC4899 100%)",
        "cta-gradient":
          "linear-gradient(135deg, #6D28D9 0%, #7C3AED 30%, #3B82F6 70%, #EC4899 100%)",
        "card-gradient":
          "linear-gradient(180deg, rgba(139,92,246,0.08) 0%, rgba(59,130,246,0.04) 100%)",
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(139,92,246,0.4)",
        "glow-sm": "0 0 30px -8px rgba(139,92,246,0.3)",
        "glow-cyan": "0 0 60px -12px rgba(6,182,212,0.3)",
        "glow-pink": "0 0 60px -12px rgba(236,72,153,0.3)",
      },
      animation: {
        "blob": "blob 7s infinite",
        "blob-reverse": "blob 7s infinite reverse",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
