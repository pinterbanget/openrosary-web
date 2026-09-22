'use client';

import { useEffect, useState } from 'react';
import styles from './landing.module.css';

type Theme = 'light' | 'dark';

const DOWNLOAD_HREF = '/app/downloads/openrosary-0.4.apk';
const SOURCE_HREF = 'https://github.com/pinterbanget/openrosary';
const SCREENSHOT_VERSION = '?v=1859';

function screenshotPath(filename: string) {
  return `/app/screenshots/${filename}${SCREENSHOT_VERSION}`;
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

function PhoneFrame({ caption, theme }: { caption: string; theme: Theme }) {
  const imageAlt = theme === 'dark'
    ? 'OpenRosary prayer screen with Latin prayers in AMOLED dark mode'
    : 'OpenRosary prayer screen with English prayers in light mode';

  return (
    <figure className={styles.phoneFigure}>
      <div className={styles.phoneShell}>
        <div className={styles.phoneSpeaker} aria-hidden="true" />
        <div className={styles.phoneScreen}>
          <img
            className={styles.phoneImage}
            src={screenshotPath(theme === 'dark' ? 'prayer-dark.png' : 'prayer-light.png')}
            width={1080}
            height={2220}
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
      'Yes. The Android app includes its prayer texts and works without an internet connection after installation.',
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
      'OpenRosary is free and open source. The Android app has no accounts, ads, or analytics. Your preferences are stored on your device.',
  },
];

export default function Landing() {
  const [theme, setTheme] = useState<Theme>('dark');

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
    <div className={styles.page}>
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
        <section className={styles.hero} aria-labelledby="hero-heading">
          <div className={styles.heroCopy}>
            <h1 id="hero-heading" className={styles.heroTitle}>
              The Rosary,{' '}
              <span>one prayer at a time.</span>
            </h1>
            <p className={styles.heroIntro}>
              Pray the Rosary and other Catholic devotions with guidance for each prayer. Choose English or Indonesian, add Latin prayers if you prefer, and use the Android app offline.
            </p>
            <div className={styles.heroActions}>
              <a className={`${styles.button} ${styles.buttonPrimary}`} href={DOWNLOAD_HREF} download="OpenRosary-0.4.apk">
                <DownloadIcon />
                <span>Download APK</span>
              </a>
              <a className={`${styles.button} ${styles.buttonSecondary}`} href="/">
                <span>Open web version</span>
              </a>
            </div>
            <div className={styles.proofLine} aria-label="OpenRosary availability">
              <span>free and open source</span>
              <span>offline Android app</span>
              <span>Android 8.0+</span>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <PhoneFrame
              theme={theme}
              caption={theme === 'dark' ? 'Latin prayers · AMOLED dark theme' : 'English prayers · light theme'}
            />
          </div>
        </section>

        <section id="features" className={styles.contentSection} aria-labelledby="features-heading">
          <div className={styles.sectionIntro}>
            <h2 id="features-heading">Prayer, at your pace.</h2>
            <p>The four mysteries, other devotions, and the prayers you need, together in one place.</p>
          </div>

          <div className={styles.featureShowcase}>
            <div className={styles.featureVisuals}>
              <figure className={styles.featureScreenshot}>
                <div className={styles.screenshotFrame}>
                  <img
                    src={screenshotPath('welcome-light.png')}
                    width={1080}
                    height={2220}
                    alt="OpenRosary welcome screen in English with four prayer mysteries"
                    loading="lazy"
                  />
                </div>
                <figcaption>English welcome screen · choose a mystery</figcaption>
              </figure>
              <figure className={`${styles.featureScreenshot} ${styles.featureScreenshotOffset}`}>
                <div className={styles.screenshotFrame}>
                  <img
                    src={screenshotPath('prayer-dark.png')}
                    width={1080}
                    height={2220}
                    alt="OpenRosary prayer screen with Latin prayers in AMOLED dark mode"
                    loading="lazy"
                  />
                </div>
                <figcaption>Latin prayers · AMOLED dark theme</figcaption>
              </figure>
            </div>

            <div className={styles.featureList}>
              <article className={styles.featureItem}>
                <h3>Every mystery, ready to pray.</h3>
                <p>The welcome screen keeps all four mysteries within reach and suggests one for today. Other devotions include 77 Our Father, Divine Mercy, Seven Sorrows, and Franciscan Crown.</p>
              </article>
              <article className={styles.featureItem}>
                <h3>Follow each prayer by touch.</h3>
                <p>Swipe between prayers or use the volume keys on Android. Haptic feedback marks each move. In the web version, arrow keys and swipe gestures keep the page moving with you.</p>
              </article>
              <article className={styles.featureItem}>
                <h3>Readable in any light.</h3>
                <p>Switch between the light theme and AMOLED dark mode. English and Indonesian are built in, and the language controls include optional Latin prayers.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="how-it-works" className={`${styles.contentSection} ${styles.howSection}`} aria-labelledby="how-heading">
          <div className={styles.sectionIntro}>
            <h2 id="how-heading">From download to prayer.</h2>
            <p>Download the APK for Android, or pray in your browser on any device.</p>
          </div>
          <div className={styles.steps}>
            <article className={styles.stepOption}>
              <div className={styles.stepCopy}>
                <h3>Download the Android app</h3>
                <p>On Android 8.0 or later, download the APK and follow the install prompt.</p>
              </div>
              <a className={styles.inlineAction} href={DOWNLOAD_HREF} download="OpenRosary-0.4.apk">Download APK</a>
            </article>
            <article className={styles.stepOption}>
              <div className={styles.stepCopy}>
                <h3>Open the web version</h3>
                <p>On iPhone or desktop, open OpenRosary in your browser. The prayer flow is ready without an Android install.</p>
              </div>
              <a className={styles.inlineAction} href="/">Open web version</a>
            </article>
            <p className={styles.stepNote}>Choose a mystery, then use swipe gestures on either version. Android also supports volume keys, while the web version responds to arrow keys.</p>
          </div>
        </section>

        <section id="faq" className={`${styles.contentSection} ${styles.faqSection}`} aria-labelledby="faq-heading">
          <div className={styles.sectionIntro}>
            <h2 id="faq-heading">Before you begin.</h2>
            <p>Practical details about the Android app, the web version, and the prayers inside.</p>
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

        <section className={styles.finalCta} aria-labelledby="final-heading">
          <h2 id="final-heading">Start with one prayer.</h2>
          <p>Download the Android app or open OpenRosary in your browser.</p>
          <div className={styles.heroActions}>
            <a className={`${styles.button} ${styles.buttonPrimary}`} href={DOWNLOAD_HREF} download="OpenRosary-0.4.apk">
              <DownloadIcon />
              <span>Download APK</span>
            </a>
            <a className={`${styles.button} ${styles.buttonSecondary}`} href="/">
              <span>Open web version</span>
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
        </div>
      </footer>
    </div>
  );
}
