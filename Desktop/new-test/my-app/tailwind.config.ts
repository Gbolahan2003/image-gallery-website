import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        '3/10': '30%',
        '7/10': '70%'
      },

      colors: {
        "theme-opacity": 'var(--state-theme-opacity)',
        "theme": '#213F7D',
        "button": '#5EB839',
        "mute": "#6b7280",
        'label': '#213F7D',
        'danger': '#a62216',
        'dark': "#242a31",
        'warning': "#ca8a04",
        'suspend': '#ea580c',
        'blue': "#0369a1",
        "amber": "#b45309"
      },
      keyframes: {
        'animate-boing': {
          '0%':{
            transform:'scale(0.75)'

          
          },
          '50%':{
            transform:'scale(1.1)'
          },
          '100%':{
            transform:'scale(1)'

          }
        }
      },
      animation: {
        'animate-boing': 'animate-boing 0.7s ease-in  1 forwards'
      }
      

    },

  },
  plugins: [],
};
export default config;
