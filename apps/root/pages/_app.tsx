import '../../../packages/shared-styles/globals.css';
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState('default');

  useEffect(() => {
    // LocalStorage'dan tema'yı al
    const savedTheme = localStorage.getItem('theme') || 'default';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Tema değişikliğini dinle
    const handleThemeChange = (event: CustomEvent) => {
      setTheme(event.detail.theme);
      document.documentElement.setAttribute('data-theme', event.detail.theme);
    };

    window.addEventListener('themeChange', handleThemeChange as EventListener);
    
    return () => {
      window.removeEventListener('themeChange', handleThemeChange as EventListener);
    };
  }, []);

  return (
    <div data-theme={theme}>
      <Component {...pageProps} />
    </div>
  );
}
