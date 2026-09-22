import Link from 'next/link';
import styles from './app/privacy/privacy.module.css';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <header><Link className={styles.brand} href="/app">(openrosary)</Link></header>
      <main>
        <p className={styles.eyebrow}>404 · Page not found</p>
        <h1>Let’s find your way back.</h1>
        <p className={styles.intro}>This page is no longer here, or the address may be incomplete.</p>
        <p><Link className={styles.back} href="/app">Visit OpenRosary</Link></p>
        <p><Link className={styles.back} href="/">Open web version</Link></p>
      </main>
    </div>
  );
}
