import type { Config } from 'tailwindcss';
import { colors, typography, spacing } from '@mubite/shared-theme';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors,
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      spacing,
    },
  },
  darkMode: 'media', // or 'class' for manual toggle
  plugins: [],
};

export default config;
