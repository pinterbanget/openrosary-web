'use client';

import { useEffect, useRef, useState } from 'react';
import type { Language } from '@/lib/prayers';

type LanguageMenuProps = {
  language: Language;
  latinPrayers: boolean;
  onLanguageChange: (language: Language) => void;
  onLatinPrayersChange: (enabled: boolean) => void;
};

export default function LanguageMenu({ language, latinPrayers, onLanguageChange, onLatinPrayersChange }: LanguageMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutsidePress);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePress);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  return (
    <div className="language-menu" ref={menuRef}>
      <button
        type="button"
        className="language-menu-trigger"
        aria-label="Language options"
        aria-expanded={open}
        aria-controls="language-menu-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.3 2.3 3.5 5.1 3.5 8.5S14.3 18.2 12 20.5C9.7 18.2 8.5 15.4 8.5 12S9.7 5.8 12 3.5Z" /></svg>
        <span>lang</span>
      </button>
      {open && (
        <div className="language-menu-panel" id="language-menu-panel">
          <div className="language-choices" role="group" aria-label="Display language">
            <button type="button" aria-pressed={language === 'en'} onClick={() => onLanguageChange('en')}>EN</button>
            <button type="button" aria-pressed={language === 'id'} onClick={() => onLanguageChange('id')}>ID</button>
          </div>
          <label className="language-latin-option">
            <span>{language === 'id' ? 'doa Latin' : 'latin prayers'}</span>
            <input type="checkbox" checked={latinPrayers} onChange={(event) => onLatinPrayersChange(event.target.checked)} />
            <span className="language-latin-switch" aria-hidden="true"><span /></span>
          </label>
        </div>
      )}
    </div>
  );
}
