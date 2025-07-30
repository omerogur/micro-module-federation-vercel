const sharedConfig = require('../../packages/shared-styles/tailwind.config');

module.exports = {
  ...sharedConfig,
  content: [
    ...sharedConfig.content,
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
};