'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AVAILABLE_LANGUAGES, getSuggestedMysteryForToday, type Language, type MysteryType } from '@/lib/prayers';
import ThemeToggle from './ThemeToggle';
import LanguageMenu from './LanguageMenu';

export default function Home() {
  const [latinPrayers, setLatinPrayers] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const suggestedMystery = getSuggestedMysteryForToday();
  const [animateKey, setAnimateKey] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLatinPrayers(window.localStorage.getItem('openrosary-latin-prayers') === 'true');
    const savedLanguage = window.localStorage.getItem('openrosary-language');
    if (savedLanguage === 'id') setLanguage('id');
  }, []);

  useEffect(() => { document.documentElement.lang = language; }, [language]);

  useEffect(() => {
    setAnimateKey((k) => k + 1);
  }, [language]);

  const setLatinPreference = (enabled: boolean) => {
    setLatinPrayers(enabled);
    window.localStorage.setItem('openrosary-latin-prayers', String(enabled));
  };

  const setLanguagePreference = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem('openrosary-language', nextLanguage);
  };

  const mysteries: { type: MysteryType; label: string; labelId: string }[] = [
    { type: 'joyful', label: 'joyful', labelId: 'gembira' },
    { type: 'luminous', label: 'luminous', labelId: 'terang' },
    { type: 'sorrowful', label: 'sorrowful', labelId: 'sedih' },
    { type: 'glorious', label: 'glorious', labelId: 'mulia' },
  ];

  const rosaryHref = (mystery: MysteryType) => {
    const params = new URLSearchParams({ mystery });
    if (language === 'id') params.set('lang', 'id');
    if (latinPrayers) params.set('prayers', 'la');
    return `/rosary?${params.toString()}`;
  };

  const othersHref = () => {
    const params = new URLSearchParams();
    if (language === 'id') params.set('lang', 'id');
    if (latinPrayers) params.set('prayers', 'la');
    const query = params.toString();
    return query ? `/others?${query}` : '/others';
  };

  return (
    <main className="hero">
      <ThemeToggle />
      <LanguageMenu language={language} latinPrayers={latinPrayers} onLanguageChange={setLanguagePreference} onLatinPrayersChange={setLatinPreference} />
      <div className="container">
        <div
          className="hero-content lang-animate"
          key={animateKey}
          ref={contentRef}
        >
          <h1 className="site-title">(openrosary)</h1>
          <p className="tagline">{language === 'id' ? 'alat doa rosario sederhana berbasis web.' : 'a simple web-based rosary tool.'}</p>

          <nav className="mysteries-grid" aria-label="mystery selection">
            {mysteries.map((mystery) => (
              <Link
                key={mystery.type}
                href={rosaryHref(mystery.type)}
                className={`mystery-btn ${mystery.type === suggestedMystery ? 'suggested' : ''}`}
              >
                {language === 'id' ? mystery.labelId : mystery.label}
              </Link>
            ))}
            <Link href={othersHref()} className="mystery-btn">
              {language === 'id' ? 'doa lainnya' : 'others'}
            </Link>
          </nav>

          <div className="hint">
            {language === 'id' ? 'saran hari ini: ' : "today's suggestion: "}<span className="accent">{language === 'id' ? mysteries.find((mystery) => mystery.type === suggestedMystery)?.labelId : suggestedMystery}</span>
          </div>

          <div className="hint">{language === 'id' ? 'navigasi dengan tombol panah atau geser' : 'navigate with arrow keys or swipe'}</div>
        </div>
      </div>
    </main>
  );
}
