// tailwind.config.js
/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

const tailwindConfig = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindcssAnimate, function ({ addVariant }) {
      // Defines a new 'dark' variant using the :is selector
      addVariant('dark', '&:is(.dark &)');
      
      // If you are trying to match the exact dark mode setup, 
      // the following may be more direct for Next.js App Router:
      // addVariant('dark', '.dark &');
    }],
};

export default tailwindConfig;