import Link from 'next/link';

const devotions = [
  {
    type: 'our-father-77',
    title: '77x Bapa Kami',
    detail: 'Sign of the Cross · 77x Our Father · Sign of the Cross',
    href: '/rosary?devotion=our-father-77&lang=id',
  },
  {
    type: 'divine-mercy',
    title: 'Divine Mercy Chaplet',
    detail: 'Five decades on the usual rosary beads',
    href: '/rosary?devotion=divine-mercy',
  },
  {
    type: 'seven-sorrows',
    title: 'Seven Sorrows Rosary',
    detail: 'Seven sorrows · one Our Father and seven Hail Marys each',
    href: '/rosary?devotion=seven-sorrows',
  },
  {
    type: 'franciscan-crown',
    title: 'Franciscan Crown',
    detail: 'Seven joys of Mary · seven decades',
    href: '/rosary?devotion=franciscan-crown',
  },
];

export default function OthersPage() {
  return (
    <main className="hero">
      <div className="container">
        <div className="hero-content">
          <Link href="/" className="back-link">← back</Link>
          <h1 className="others-title">other devotions</h1>
          <p className="tagline">prayer forms that use rosary or chaplet beads.</p>

          <nav className="devotion-list" aria-label="other devotions">
            {devotions.map((devotion) => (
              <Link key={devotion.type} href={devotion.href} className="devotion-btn">
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
