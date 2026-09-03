'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function OthersContent() {
  const searchParams = useSearchParams();
  const language = searchParams.get('lang') === 'id' ? 'id' : 'en';
  const latinPrayers = searchParams.get('prayers') === 'la';
  const devotionHref = (type: string) => {
    const params = new URLSearchParams({ devotion: type });
    if (language === 'id') params.set('lang', 'id');
    if (latinPrayers) params.set('prayers', 'la');
    return `/rosary?${params.toString()}`;
  };
  const devotions = language === 'id' ? [
    { type: 'our-father-77', title: '77× Bapa Kami', detail: '77 kali Bapa Kami untuk ujud pribadi' },
    { type: 'divine-mercy', title: 'Koronka Kerahiman Ilahi', detail: 'Lima dekade dengan butir rosario biasa' },
    { type: 'seven-sorrows', title: 'Rosario Tujuh Dukacita', detail: 'Tujuh dukacita · satu Bapa Kami dan tujuh Salam Maria setiap peristiwa' },
    { type: 'franciscan-crown', title: 'Mahkota Fransiskan', detail: 'Tujuh sukacita Maria · tujuh dekade' },
  ] : [
    { type: 'our-father-77', title: '77× Our Father', detail: '77 Our Fathers for personal intentions' },
    { type: 'divine-mercy', title: 'Divine Mercy Chaplet', detail: 'Five decades on the usual rosary beads' },
    { type: 'seven-sorrows', title: 'Seven Sorrows Rosary', detail: 'Seven sorrows · one Our Father and seven Hail Marys each' },
    { type: 'franciscan-crown', title: 'Franciscan Crown', detail: 'Seven joys of Mary · seven decades' },
  ];
  return (
    <main className="hero">
      <div className="container">
        <div className="hero-content">
          <Link href={language === 'id' ? '/?lang=id' : '/'} className="back-link">← {language === 'id' ? 'kembali' : 'back'}</Link>
          <h1 className="others-title">{language === 'id' ? 'doa lainnya' : 'other devotions'}</h1>
          <p className="tagline">{language === 'id' ? 'bentuk doa yang menggunakan butir rosario atau koronka.' : 'prayer forms that use rosary or chaplet beads.'}</p>

          <nav className="devotion-list" aria-label="other devotions">
            {devotions.map((devotion) => (
              <Link key={devotion.type} href={devotionHref(devotion.type)} className="devotion-btn">
                <strong>{devotion.title}</strong>
                <span>{devotion.detail}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </main>
  );
}

export default function OthersPage() {
  return <Suspense fallback={<main className="hero"><div className="container"><p className="hint">loading...</p></div></main>}><OthersContent /></Suspense>;
}
