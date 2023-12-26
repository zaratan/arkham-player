import type { Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        seeker: '#ec8426',
        survivor: '#cc3038',
        guardian: '#2b80c5',
        rogue: '#107116',
        mystic: '#4331b9',
        neutral: '#606060',
      },
      fontFamily: {
        sans: ['var(--inter)', ...defaultTheme.fontFamily.sans],
        arkham: ['var(--arkham)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config;
