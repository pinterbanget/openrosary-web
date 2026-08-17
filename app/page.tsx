'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSuggestedMysteryForToday, type MysteryType } from '@/lib/prayers';
import ThemeToggle from './ThemeToggle';

export default function Home() {
  const [latinPrayers, setLatinPrayers] = useState(false);
  const suggestedMystery = getSuggestedMysteryForToday();

  useEffect(() => {
    setLatinPrayers(window.localStorage.getItem('openrosary-latin-prayers') === 'true');
  }, []);

  const setLatinPreference = (enabled: boolean) => {
    setLatinPrayers(enabled);
    window.localStorage.setItem('openrosary-latin-prayers', String(enabled));
  };

  const mysteries: { type: MysteryType; label: string }[] = [
    { type: 'joyful', label: 'joyful' },
    { type: 'luminous', label: 'luminous' },
    { type: 'sorrowful', label: 'sorrowful' },
    { type: 'glorious', label: 'glorious' },
  ];

  return (
    <main className="hero">
      <ThemeToggle />
      <div className="container">
        <div className="hero-content">
          <h1 className="site-title">(openrosary)</h1>
          <p className="tagline">a simple web-based rosary tool.</p>

          <nav className="mysteries-grid" aria-label="mystery selection">
            {mysteries.map((mystery) => (
              <Link
                key={mystery.type}
                href={latinPrayers ? `/rosary?mystery=${mystery.type}&prayers=la` : `/rosary?mystery=${mystery.type}`}
                className={`mystery-btn ${mystery.type === suggestedMystery ? 'suggested' : ''}`}
              >
                {mystery.label}
              </Link>
            ))}
            <Link href="/others" className="mystery-btn">
              others
            </Link>
          </nav>

          <div className="hint">
            today's suggestion: <span className="accent">{suggestedMystery}</span>
          </div>

          <div className="hint">navigate with arrow keys or swipe</div>

          <label className="latin-toggle" htmlFor="latin-prayers-toggle">
            <input
              id="latin-prayers-toggle"
              type="checkbox"
              checked={latinPrayers}
              onChange={(e) => setLatinPreference(e.target.checked)}
            />
            <span className="latin-toggle-track" aria-hidden="true">
              <span className="latin-toggle-thumb" />
            </span>
            <span className="latin-toggle-copy">latin prayers</span>
          </label>
        </div>
      </div>
    </main>
  );
}
