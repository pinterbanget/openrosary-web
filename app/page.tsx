'use client';

import Link from 'next/link';
import { getSuggestedMysteryForToday, type MysteryType } from '@/lib/prayers';

export default function Home() {
  const suggestedMystery = getSuggestedMysteryForToday();

  const mysteries: { type: MysteryType; label: string }[] = [
    { type: 'joyful', label: 'joyful' },
    { type: 'luminous', label: 'luminous' },
    { type: 'sorrowful', label: 'sorrowful' },
    { type: 'glorious', label: 'glorious' },
  ];

  return (
    <main className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="site-title"><span className="accent">open</span>rosary</h1>
          <p className="tagline">a simple web-based rosary tool.</p>

          <nav className="mysteries-grid" aria-label="mystery selection">
            {mysteries.map((mystery) => (
              <Link
                key={mystery.type}
                href={`/rosary?mystery=${mystery.type}`}
                className={`mystery-btn ${mystery.type === suggestedMystery ? 'suggested' : ''}`}
              >
                {mystery.label}
              </Link>
            ))}
          </nav>

          <div className="hint">
            today's suggestion: <span className="accent">{suggestedMystery}</span>
          </div>

          <div className="hint">navigate with arrow keys or swipe</div>
        </div>
      </div>
    </main>
  );
}
