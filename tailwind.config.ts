import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dental: {
          cream: '#FAFAFA',      // Warm White Background
          blue: '#E3F2FD',       // Soft Sky Blue (Hero/Sections)
          blueDark: '#BBDEFB',   // Slightly darker blue for borders
          mint: '#4DB6AC',       // Gentle Mint (Buttons/Icons)
          mintDark: '#26A69A',   // Darker Mint (Hover)
          text: '#455A64',       // Soft Blue-Grey Text (Not harsh black)
          heading: '#37474F',    // Darker Blue-Grey for headings
        }
      },
      fontFamily: {
        rounded: ['var(--font-nunito)', 'sans-serif'], // Friendly, rounded headings
        body: ['var(--font-open-sans)', 'sans-serif'], // Clean reading
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem', // Extra rounded corners for friendliness
      }
    },
  },
  plugins: [],
};
export default config;