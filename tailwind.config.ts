import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        'hs-base': '#E4C59E', 
        'hs-secondary': '#AF8260', 
        'hs-third': '#803D3B',
        'hs-fourth': '#322C2B ', 
        'hs-background': '#9AA7AD'
      },
    },
  },
  plugins: [],
};
export default config;
