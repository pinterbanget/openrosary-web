'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './landing.module.css';

type Theme = 'light' | 'dark';

const DOWNLOAD_HREF = '/app/downloads/openrosary-0.4.apk';
const SOURCE_HREF = 'https://github.com/pinterbanget/openrosary';

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M4 16 16 4M7 4h9v9" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M10 3v9m0 0 3.5-3.5M10 12 6.5 8.5M4 15.5v1h12v-1" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <circle cx="10" cy="10" r="3.2" />
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.3 4.3l1.4 1.4M14.3 14.3l1.4 1.4M15.7 4.3l-1.4 1.4M5.7 14.3l-1.4 1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M15.9 13.5A6.5 6.5 0 0 1 6.5 4.1 7 7 0 1 0 15.9 13.5Z" />
    </svg>
  );
}

function PhoneFrame({
  caption,
  className = '',
  feature = false,
}: {
  caption: string;
  className?: string;
  feature?: boolean;
}) {
  const imageAlt = feature
    ? 'OpenRosary welcome screen with the four prayer mysteries'
    : 'OpenRosary prayer screen showing a mystery and prayer text';

  return (
    <figure className={`${styles.phoneFigure} ${feature ? styles.featurePhone : ''} ${className}`}>
      <div className={styles.phoneShell}>
        <div className={styles.phoneSpeaker} aria-hidden="true" />
        <div className={styles.phoneScreen}>
          <img
            className={`${styles.phoneImage} ${styles.phoneImageLight}`}
            src={feature ? '/app/screenshots/welcome-light.png' : '/app/screenshots/prayer-light.png'}
            width={1080}
            height={1920}
            alt={imageAlt}
          />
          <img
            className={`${styles.phoneImage} ${styles.phoneImageDark}`}
            src={feature ? '/app/screenshots/welcome-light.png' : '/app/screenshots/prayer-dark.png'}
            width={1080}
            height={1920}
            alt={imageAlt}
          />
        </div>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

const faqItems = [
  {
    question: 'Does OpenRosary work offline?',
    answer:
      'Yes. The Android app keeps its prayers and navigation on your device and requests no network permission. The web version is available in a browser, while the APK is the choice for prayer without a connection.',
  },
  {
    question: 'How do I install the Android APK?',
    answer:
      'Tap Download APK, open the file, and follow the Android prompt. Your browser or file manager may ask once if it can install apps. Then open OpenRosary and choose a mystery.',
  },
  {
    question: 'Which Android versions are supported?',
    answer: 'The APK supports Android 8.0 and newer.',
  },
  {
    question: 'Can I use OpenRosary on an iPhone?',
    answer:
      'Yes. Open the web version in Safari or another modern browser. It gives you the same prayer flow without an Android installation.',
  },
  {
    question: 'Are Indonesian and Latin prayers available?',
    answer:
      'English and Indonesian are available in the app. You can also turn on optional Latin prayers from the language controls.',
  },
  {
    question: 'Does it cost anything, and what does it collect?',
    answer:
      'OpenRosary is free and open source. The Android app needs no account and requests no network permission. Read the privacy page and inspect the source if you want to know how it works.',
  },
];

function TaglineReveal() {
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [activeWords, setActiveWords] = useState<Set<number>>(new Set());
  const [motionReady, setMotionReady] = useState(false);
  const words = ['A', 'little', 'less', 'noise.', 'A', 'little', 'more', 'room', 'to', 'pray.'];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActiveWords(new Set(words.map((_, index) => index)));
      return;
    }

    setMotionReady(true);
    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => Number((entry.target as HTMLElement).dataset.wordIndex));
        if (entering.length > 0) {
          setActiveWords((current) => {
            const next = new Set(current);
            entering.forEach((index) => next.add(index));
            return next;
          });
        }
      },
      { threshold: 0.75, rootMargin: '0px 0px -12% 0px' },
    );

    wordRefs.current.forEach((word) => {
      if (word) observer.observe(word);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className={`${styles.taglineSection} ${motionReady ? styles.taglineMotionReady : ''}`} aria-labelledby="tagline-heading">
      <p className={styles.eyebrow}>02 / the feeling</p>
      <h2 id="tagline-heading" className={styles.taglineWords} aria-label="A little less noise. A little more room to pray.">
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            ref={(element) => {
              wordRefs.current[index] = element;
            }}
            data-word-index={index}
            className={`${styles.tagWord} ${activeWords.has(index) ? styles.tagWordActive : ''}`}
            style={{ transitionDelay: `${index * 80}ms` }}
            aria-hidden="true"
          >
            {word}{index === 3 ? <br /> : ' '}
          </span>
        ))}
      </h2>
    </section>
  );
}

export default function Landing() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<Theme>('dark');
  const [motionReady, setMotionReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('openrosary-theme') as Theme | null;
    const initial = saved === 'light' || saved === 'dark'
      ? saved
      : window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark';
    document.documentElement.dataset.theme = initial;
    setTheme(initial);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setMotionReady(true);
    const root = pageRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealed);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: '0px 0px -32px 0px' },
    );

    root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    const applyTheme = () => {
      document.documentElement.dataset.theme = next;
    };
    const transitionDocument = document as Document & {
      startViewTransition?: (callback: () => void) => void;
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      applyTheme();
    } else if (transitionDocument.startViewTransition) {
      transitionDocument.startViewTransition(applyTheme);
    } else {
      applyTheme();
    }

    window.localStorage.setItem('openrosary-theme', next);
    setTheme(next);
  };

  return (
    <div ref={pageRef} className={`${styles.page} ${motionReady ? styles.motionReady : ''}`}>
      <a className={styles.skipLink} href="#main-content">Skip to content</a>

      <header className={styles.siteHeader}>
        <div className={styles.headerInner}>
          <div className={styles.headerTop}>
            <a className={styles.wordmark} href="/app" aria-current="page">(openrosary)</a>
            <button className={styles.themeButton} type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
              <span>{theme === 'light' ? 'dark mode' : 'light mode'}</span>
            </button>
          </div>
          <nav className={styles.nav} aria-label="Primary navigation">
            <a href="#features">features</a>
            <a href="#how-it-works">how it works</a>
            <a href="#faq">questions</a>
            <a className={styles.navDownload} href={DOWNLOAD_HREF} download="OpenRosary-0.4.apk">
              download APK
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className={`${styles.hero} ${styles.reveal}`} data-reveal aria-labelledby="hero-heading">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>openrosary / a daily practice</p>
            <h1 id="hero-heading" className={styles.heroTitle}>
              A quiet companion
              <span>for your daily Rosary.</span>
            </h1>
            <p className={styles.heroIntro}>
              A free, open source rosary app for unhurried prayer. Choose today&apos;s mystery, move at your pace, and keep every prayer close when you are offline.
            </p>
            <div className={styles.heroActions}>
              <a className={`${styles.button} ${styles.buttonPrimary}`} href={DOWNLOAD_HREF} download="OpenRosary-0.4.apk">
                <DownloadIcon />
                <span>Download APK</span>
              </a>
              <a className={`${styles.button} ${styles.buttonSecondary}`} href="/">
                <span>Open web version</span>
                <ArrowUpRightIcon />
              </a>
            </div>
            <div className={styles.proofLine} aria-label="OpenRosary availability">
              <span>free and open source</span>
              <span>offline by design</span>
              <span>Android 8.0+</span>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <PhoneFrame caption="prayer / light and dark" />
          </div>
        </section>

        <TaglineReveal />

        <section id="features" className={`${styles.contentSection} ${styles.reveal}`} data-reveal aria-labelledby="features-heading">
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>03 / what stays with you</p>
            <h2 id="features-heading">Prayer, at your pace.</h2>
            <p>The four mysteries, other devotions, and the prayers you need, together in one place.</p>
          </div>

          <div className={styles.featureList}>
            <article className={styles.featureRow}>
              <PhoneFrame feature caption="welcome / choose a mystery" />
              <div className={styles.featureCopy}>
                <p className={styles.featureNumber}>01</p>
                <h3>Every mystery, ready to pray.</h3>
                <p>The opening screen keeps all four mysteries within reach and suggests one for today. Other devotions include 77 Our Father, Divine Mercy, Seven Sorrows, and Franciscan Crown.</p>
              </div>
            </article>

            <article className={styles.featureRow}>
              <PhoneFrame caption="prayer / keep your rhythm" className={styles.prayerFeaturePhone} />
              <div className={styles.featureCopy}>
                <p className={styles.featureNumber}>02</p>
                <h3>Follow the prayers by touch.</h3>
                <p>Swipe between prayers or use the volume keys when your hands are full. Haptic feedback marks each move without asking you to look up.</p>
              </div>
            </article>

            <article className={styles.featureRow}>
              <div className={styles.featureMediaDark}>
                <img src="/app/screenshots/prayer-dark.png" alt="OpenRosary prayer screen in AMOLED dark mode" width={1080} height={1920} loading="lazy" />
                <span>dark mode / low light</span>
              </div>
              <div className={styles.featureCopy}>
                <p className={styles.featureNumber}>03</p>
                <h3>Readable in any light.</h3>
                <p>Light mode and an AMOLED dark mode make the same quiet flow feel at home in the morning or after the room goes still. English and Indonesian are built in, with optional Latin prayers.</p>
              </div>
            </article>
          </div>
        </section>

        <section id="how-it-works" className={`${styles.contentSection} ${styles.howSection} ${styles.reveal}`} data-reveal aria-labelledby="how-heading">
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>04 / begin simply</p>
            <h2 id="how-heading">Three small steps to a quieter screen.</h2>
          </div>
          <ol className={styles.steps}>
            <li>
              <span className={styles.stepNumber}>01</span>
              <div>
                <h3>Download or open</h3>
                <p>Get the Android APK, or open the web version if you are on iPhone or desktop.</p>
              </div>
            </li>
            <li>
              <span className={styles.stepNumber}>02</span>
              <div>
                <h3>Choose your mystery</h3>
                <p>Follow today&apos;s suggestion or choose the mystery that fits this moment.</p>
              </div>
            </li>
            <li>
              <span className={styles.stepNumber}>03</span>
              <div>
                <h3>Move at your pace</h3>
                <p>On Android, swipe or use the volume keys to continue. On the web, swipe or use the arrow keys. The next prayer is always close.</p>
              </div>
            </li>
          </ol>
        </section>

        <section id="faq" className={`${styles.contentSection} ${styles.faqSection} ${styles.reveal}`} data-reveal aria-labelledby="faq-heading">
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>05 / useful details</p>
            <h2 id="faq-heading">Before you begin.</h2>
          </div>
          <div className={styles.faqList}>
            {faqItems.map((item) => (
              <details key={item.question} className={styles.faqItem}>
                <summary>{item.question}<span aria-hidden="true">+</span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={`${styles.finalCta} ${styles.reveal}`} data-reveal aria-labelledby="final-heading">
          <p className={styles.eyebrow}>06 / make room</p>
          <h2 id="final-heading">Keep a little quiet close.</h2>
          <p>Start with the app on Android, or open the web version wherever you are.</p>
          <div className={styles.heroActions}>
            <a className={`${styles.button} ${styles.buttonPrimary}`} href={DOWNLOAD_HREF} download="OpenRosary-0.4.apk">
              <DownloadIcon />
              <span>Download APK</span>
            </a>
            <a className={`${styles.button} ${styles.buttonSecondary}`} href="/">
              <span>Open web version</span>
              <ArrowUpRightIcon />
            </a>
          </div>
          <p className={styles.finalMeta}>Free and open source · Android 8.0+</p>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <a className={styles.wordmark} href="/app">(openrosary)</a>
            <a className={styles.footerByline} href="https://ryanson.id" target="_blank" rel="noreferrer">(ryanson.id)</a>
          </div>
          <nav className={styles.footerLinks} aria-label="Footer navigation">
            <a href={SOURCE_HREF} target="_blank" rel="noreferrer">GitHub source</a>
            <a href="/app/privacy">Privacy</a>
            <a href="/">Web version</a>
          </nav>
          <p className={styles.footerNote}>A small place to pray, made with care.</p>
        </div>
      </footer>
    </div>
  );
}
