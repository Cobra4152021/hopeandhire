import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Add ./pages if you use it
  ],
  theme: {
    extend: {}, // Keep extend empty for now
  },
  plugins: [], // Keep plugins empty for now
};
export default config;
