/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        gold: {
          from: "#F5A623",
          to: "#E8821E",
          DEFAULT: "#E8821E",
        },
        indigo: {
          DEFAULT: "#1B2A6B",
        },
        teal: {
          DEFAULT: "#1DB47A",
        },
        cream: {
          DEFAULT: "#FBF7F1",
        },
        ink: {
          DEFAULT: "#1A2348",
        },
      },
      fontFamily: {
        display: ['"Clash Display"', "Sora", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F5A623 0%, #E8821E 100%)",
      },
    },
  },
  plugins: [],
};
