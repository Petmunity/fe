import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Pretendard", "-apple-system", "sans-serif"],
    },
    extend: {
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
      },
      animation: {
        pulse: "pulse 1.7s infinite",
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
