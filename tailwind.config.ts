import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      colors: {
        cygne: {
            brown: "#433E37",    // Marron glacé
            gold: "#C4A484",     // Camel / Doré
            cream: "#E6DCCA",    // NOUVEAU : Un vrai beige "Lin" (plus foncé, plus chaud)
            white: "#FFFFFF",
        }
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '36': '9rem',
        '44': '11rem',
      },
      letterSpacing: {
        'widest-xl': '0.3em',
        'ultra-wide': '0.4em',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
};
export default config;