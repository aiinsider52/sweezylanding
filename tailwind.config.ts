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
          950: "#040A06",
          900: "#060D08",
          800: "#0A1610",
          700: "#0F1F17",
          600: "#162B1F",
          500: "#1E3A2A",
        },
        accent: {
          green: "#22C55E",
          emerald: "#10B981",
          lime: "#84CC16",
          teal: "#14B8A6",
          spring: "#4ADE80",
          mint: "#34D399",
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
          "var(--font-inter)",
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
          "linear-gradient(135deg, #22C55E 0%, #10B981 50%, #14B8A6 100%)",
        "cta-gradient":
          "linear-gradient(135deg, #0F2415 0%, #162B1F 30%, #0A1610 70%, #060D08 100%)",
        "card-gradient":
          "linear-gradient(180deg, rgba(34,197,94,0.08) 0%, rgba(16,185,129,0.04) 100%)",
        "green-glow":
          "radial-gradient(circle at center, rgba(34,197,94,0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(34,197,94,0.4)",
        "glow-sm": "0 0 30px -8px rgba(34,197,94,0.3)",
        "glow-lg": "0 0 100px -20px rgba(34,197,94,0.35)",
        "glow-emerald": "0 0 60px -12px rgba(16,185,129,0.3)",
        "glow-teal": "0 0 60px -12px rgba(20,184,166,0.3)",
        "phone-glow": "0 0 120px -20px rgba(34,197,94,0.25), 0 0 60px -10px rgba(16,185,129,0.15)",
      },
      animation: {
        blob: "blob 7s infinite",
        "blob-reverse": "blob 7s infinite reverse",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-delayed": "floatDelayed 7s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "shimmer": "shimmer 2s linear infinite",
        "spin-slow": "spin 12s linear infinite",
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
        floatDelayed: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(1deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
