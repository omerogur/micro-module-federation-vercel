/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Root ve tüm modüllerin dosyalarını dahil et
    '../../apps/root/**/*.{js,ts,jsx,tsx}',
    '../../apps/navigation/**/*.{js,ts,jsx,tsx}',
    '../../apps/content/**/*.{js,ts,jsx,tsx}',
    
    // UI component paketi
    '../ui-components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // CSS değişkenlerini kullan
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)',
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
          950: 'var(--color-primary-950)',
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },
        success: {
          DEFAULT: 'var(--color-success)',
          foreground: 'var(--color-success-foreground)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          foreground: 'var(--color-warning-foreground)',
        },
        error: {
          DEFAULT: 'var(--color-error)',
          foreground: 'var(--color-error-foreground)',
        },
        border: 'var(--color-border)',
        ring: 'var(--color-ring)',
        card: {
          DEFAULT: 'var(--color-card)',
          foreground: 'var(--color-card-foreground)',
        },
        nav: {
          bg: 'var(--color-nav-bg)',
          text: 'var(--color-nav-text)',
          hover: 'var(--color-nav-hover)',
          active: 'var(--color-nav-active)',
          border: 'var(--color-nav-border)',
        },
        header: {
          bg: 'var(--color-header-bg)',
          text: 'var(--color-header-text)',
          border: 'var(--color-header-border)',
        },
        footer: {
          bg: 'var(--color-footer-bg)',
          text: 'var(--color-footer-text)',
          border: 'var(--color-footer-border)',
        },
      },
    },
  },
  plugins: [],
};