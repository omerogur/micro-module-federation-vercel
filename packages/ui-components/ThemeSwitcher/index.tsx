import { useState, useEffect } from 'react';

const themes = [
  { value: 'default', label: 'Light', icon: '☀️' },
  { value: 'dark', label: 'Dark', icon: '🌙' },
];

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState('default');

  const changeTheme = (themeName: string) => {
    setCurrentTheme(themeName);
    
    // Document'e tema attribute'unu ekle
    document.documentElement.setAttribute('data-theme', themeName);
    
    // Diğer modüllere tema değişikliğini bildir
    window.dispatchEvent(
      new CustomEvent('themeChange', {
        detail: { theme: themeName }
      })
    );
    
    // LocalStorage'a kaydet
    localStorage.setItem('theme', themeName);
  };

  useEffect(() => {
    // Sayfa yüklendiğinde tema'yı kontrol et
    const savedTheme = localStorage.getItem('theme') || 'default';
    changeTheme(savedTheme);
  }, []);

  return (
    <div className="relative inline-block">
      <select
        value={currentTheme}
        onChange={(e) => changeTheme(e.target.value)}
        className="text-sm py-1.5 px-3 pr-8 bg-background border border-border text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
      >
        {themes.map((theme) => (
          <option key={theme.value} value={theme.value}>
            {theme.icon} {theme.label}
          </option>
        ))}
      </select>
    </div>
  );
}