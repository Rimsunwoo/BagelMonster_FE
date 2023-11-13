import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      bold: ["Pretendard-Bold"],
      semiBold: ["Pretendard-SemiBold"],
      medium: ["Pretendard-Medium"],
      regular: ["Pretendard-Regular"],
      light: ["Pretendard-Light"],
    },
    extend: {
      colors: {
        white: "#ffffff",
        black: "#333333",
        gray: "#AAAAAA",
        green: "#55AF45",
        orange: "#FF3D00",
      },
      boxShadow: {
        main: "0px 0px 15px 0px rgba(0, 0, 0, 0.1)",
      },
      dropShadow: {
        navigation: "0px -1px 8px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
