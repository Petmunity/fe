import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-scdream)"],
    },
    extend: {
      colors: {
        ...colors,
        primary: {
          current: "current",
          DEFAULT: "#7839EE",
          100: "#d7d8ff",
          300: "#9E77ED",
          900: "#875BF726",
        },
        gray: {
          DEFAULT: "#9AA4B2",
          100: "#F8F8F8",
          150: "#EEF2F6",
          200: "#E9E9E9",
          250: "#E2E2E2",
          300: "#D9D9D9",
          400: "#BFBFBF",
          500: "#A6A6A6",
          600: "#8C8C8C",
          650: "#848484",
          700: "#737373",
          800: "#595959",
          900: "#404040",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        sm: "640px", // 휴대폰 크기
        md: "768px", // 태블릿 크기
        lg: "1024px", // 데스크탑 크기
        xl: "1280px", // 대형 디스플레이 크기
      },
      keyframes: {
        pulse: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.4",
          },
        },
        shake: {
          "10%, 90%": { transform: "translate3d(-0.5px, 0, 0)" },
          "20%, 80%": { transform: "translate3d(1px, 0, 0)" },
          "30%, 50%, 70%": { transform: "translate3d(-2px, 0, 0)" },
          "40%, 60%": { transform: "translate3d(2px, 0, 0)" },
        },
      },
      animation: {
        pulse: "pulse 1.7s infinite",
        shake: "shake 0.82s cubic-bezier(.36,.07,.19,.97) infinite both",
      },
      fontSize: {
        "2xs": ["0.625rem", "0.75rem"],
      },
    },
  },
  variants: {
    extend: {
      maxWidth: ["responsive", "desktop"],
    },
  },
  plugins: [],
};
export default config;
