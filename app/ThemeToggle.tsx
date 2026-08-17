'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const saved = window.localStorage.getItem('openrosary-theme') as Theme | null;
    const initial = saved ?? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.dataset.theme = initial;
    setTheme(initial);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem('openrosary-theme', next);
    setTheme(next);
  };

  return <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Switch colour mode">{theme === 'light' ? '◐ dark' : '☼ light'}</button>;
}
