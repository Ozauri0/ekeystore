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
        gray: {
          950: '#030712',
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(17, 24, 39, 1) 50%, rgba(168, 85, 247, 0.2) 100%)',
        'gradient-text': 'linear-gradient(to right, #a855f7, #8b5cf6)',
        'btn-primary': 'linear-gradient(to right, #9333ea, #8b5cf6)',
        'btn-primary-hover': 'linear-gradient(to right, #7c3aed, #7c3aed)',
        'price-gradient': 'linear-gradient(to right, #10b981, #059669)',
        'category-gradient-1': 'linear-gradient(135deg, #9333ea, #8b5cf6)',
        'category-gradient-2': 'linear-gradient(135deg, #8b5cf6, #9333ea)',
        'category-gradient-3': 'linear-gradient(135deg, #d946ef, #9333ea)',
        'category-gradient-4': 'linear-gradient(135deg, #9333ea, #6366f1)',
        'category-gradient-5': 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
        'category-gradient-6': 'linear-gradient(135deg, #9333ea, #d946ef)',
      },
      backdropBlur: {
        DEFAULT: '12px',
      }
    },
  },
  plugins: [],
};
export default config;
