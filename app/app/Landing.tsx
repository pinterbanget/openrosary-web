'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import styles from './landing.module.css';

type Theme = 'light' | 'dark';

const DOWNLOAD_HREF = '/app/downloads/openrosary-0.4.apk';
const SOURCE_HREF = 'https://github.com/pinterbanget/openrosary';
const SCREENSHOT_VERSION = '?v=1859';
const navItems = [
  { id: 'features', label: 'Features' },
  { id: 'how-it-works', label: 'How to pray' },
  { id: 'faq', label: 'Questions' },
];

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
  const imageAlt =
    theme === 'dark'
      ? 'OpenRosary prayer screen with Latin prayers in AMOLED dark mode'
      : 'OpenRosary prayer screen with English prayers in light mode';

  return (
    <figure className={styles.phoneFigure}>
      <div className={styles.phoneShell}>
        <div className={styles.phoneSpeaker} aria-hidden="true" />
        <div className={styles.phoneScreen}>
          <img
            className={styles.phoneImage}
            src={screenshotPath(
              theme === 'dark' ? 'prayer-dark.png' : 'prayer-light.png'
            )}
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
      'Tap Download APK, open the downloaded file, and follow the Android installation prompt. If asked, allow your browser or file manager to install the app. Then open OpenRosary and choose a mystery.',
  },
  {
    question: 'Which Android versions are supported?',
    answer: 'The APK supports Android 8.0 and newer.',
  },
  {
    question: 'Can I use OpenRosary on an iPhone?',
    answer:
      'Yes. Open the web version in Safari or another modern browser to pray on your iPhone.',
  },
  {
    question: 'Which languages can I pray in?',
    answer:
      'Choose English or Indonesian, with more languages to come. You can also turn on Latin prayers in the language controls while keeping the mystery readings in English or Indonesian.',
  },
  {
    question: 'Does it cost anything, and what does it collect?',
    answer:
      'OpenRosary is free and open source. The Android app has no accounts, ads, or analytics. Your preferences are stored on your device.',
  },
];

export default function Landing() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const saved = window.localStorage.getItem(
      'openrosary-theme'
    ) as Theme | null;
    const initial =
      saved === 'light' || saved === 'dark'
        ? saved
        : window.matchMedia('(prefers-color-scheme: light)').matches
          ? 'light'
          : 'dark';
    document.documentElement.dataset.theme = initial;
    setTheme(initial);
  }, []);

  useEffect(() => {
    let scrollTimer = 0;
    const updateSection = () => {
      const current = navItems
        .filter(({ id }) => {
          const section = document.getElementById(id);
          return section && section.getBoundingClientRect().top <= 180;
        })
        .at(-1);
      setActiveSection(current?.id ?? '');
    };
    const onScroll = () => {
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(updateSection, 100);
    };
    updateSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(scrollTimer);
    };
  }, []);

  const navigateToSection = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    setActiveSection(id);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document
        .getElementById(id)
        ?.querySelector('h2')
        ?.animate(
          [
            { opacity: 0.5, transform: 'translateY(12px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          {
            duration: 800,
            delay: 180,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }
        );
    }
  };

  const toggleTheme = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    const applyTheme = () => {
      document.documentElement.dataset.theme = next;
      setTheme(next);
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
  };

  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>

      <header className={styles.siteHeader}>
        <div className={styles.headerInner}>
          <a className={styles.wordmark} href="/app" aria-current="page">
            OpenRosary
          </a>
          <nav className={styles.nav} aria-label="Primary navigation">
            {navItems.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(event) => navigateToSection(event, id)}
                aria-current={activeSection === id ? 'location' : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className={styles.headerActions}>
            <button
              className={styles.themeButton}
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <span className={styles.themeIcon} key={theme}>
                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
              </span>
            </button>
            <a
              className={styles.navDownload}
              href={DOWNLOAD_HREF}
              download="OpenRosary-0.4.apk"
            >
              Download APK
            </a>
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="hero-heading">
          <div className={styles.heroCopy}>
            <h1 id="hero-heading" className={styles.heroTitle}>
              The Rosary, <span>one prayer at a time.</span>
            </h1>
            <p className={styles.heroIntro}>
              Follow each prayer of the Rosary at your own pace. Pray offline on
              Android or open OpenRosary in your browser.
            </p>
            <p className={styles.languageNote}>
              Choose English or Indonesian, with more languages to come. Latin
              prayers are available too.
            </p>
            <div className={styles.heroActions}>
              <a
                className={`${styles.button} ${styles.buttonPrimary}`}
                href={DOWNLOAD_HREF}
                download="OpenRosary-0.4.apk"
              >
                <DownloadIcon />
                <span>Download APK</span>
              </a>
              <a
                className={`${styles.button} ${styles.buttonSecondary}`}
                href="/"
              >
                <span>Open web version</span>
              </a>
            </div>
            <div
              className={styles.proofLine}
              aria-label="OpenRosary availability"
            >
              <span>Free and open source</span>
              <span>Works offline on Android</span>
              <span>Android 8.0+</span>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <PhoneFrame
              theme={theme}
              caption={
                theme === 'dark'
                  ? 'Latin prayers · AMOLED dark theme'
                  : 'English prayers · light theme'
              }
            />
          </div>
        </section>

        <section
          id="features"
          tabIndex={-1}
          className={styles.contentSection}
          aria-labelledby="features-heading"
        >
          <div className={styles.sectionIntro}>
            <h2 id="features-heading">
              Keep your place.
              <br />
              Take your time.
            </h2>
            <p>
              OpenRosary shows the prayer you’re on and keeps track as you move
              through each decade.
            </p>
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
                <figcaption>
                  English welcome screen · choose a mystery
                </figcaption>
              </figure>
              <figure className={styles.featureScreenshot}>
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
                <h3>Choose your prayers</h3>
                <p>
                  Pray the Joyful, Sorrowful, Glorious, or Luminous Mysteries,
                  with a suggestion for today. You’ll also find the Divine Mercy
                  Chaplet, Seven Sorrows, Franciscan Crown, and 77 Our Father.
                </p>
              </article>
              <article className={styles.featureItem}>
                <h3>Move with a swipe or a press</h3>
                <p>
                  Swipe to the next prayer, or use your Android volume buttons.
                  Optional vibration gives you a cue as you move. In the
                  browser, use swipes or arrow keys.
                </p>
              </article>
              <article className={styles.featureItem}>
                <h3>Make it comfortable to read</h3>
                <p>
                  Use the light theme during the day or AMOLED dark mode in low
                  light. Choose English or Indonesian, or turn on Latin prayers
                  from the language controls.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          tabIndex={-1}
          className={`${styles.contentSection} ${styles.howSection}`}
          aria-labelledby="how-heading"
        >
          <div className={styles.sectionIntro}>
            <h2 id="how-heading">Two ways to pray.</h2>
            <p>
              Install the Android app for offline prayer, or use the web version
              on your phone or computer.
            </p>
          </div>
          <div className={styles.steps}>
            <article className={styles.stepOption}>
              <div className={styles.stepCopy}>
                <h3>Download the Android app</h3>
                <p>
                  Download the APK, open the file, and follow the installation
                  prompt. Requires Android 8.0 or later.
                </p>
              </div>
              <a
                className={styles.inlineAction}
                href={DOWNLOAD_HREF}
                download="OpenRosary-0.4.apk"
              >
                Download APK
              </a>
            </article>
            <article className={styles.stepOption}>
              <div className={styles.stepCopy}>
                <h3>Open the web version</h3>
                <p>
                  Pray on iPhone, Android, or desktop with your browser. Open
                  the page and choose a mystery.
                </p>
              </div>
              <a className={styles.inlineAction} href="/">
                Open web version
              </a>
            </article>
            <p className={styles.stepNote}>
              Once you’ve chosen a mystery, follow the prayer on screen. Move
              forward when you’re ready, or go back whenever you need.
            </p>
          </div>
        </section>

        <section
          id="faq"
          tabIndex={-1}
          className={`${styles.contentSection} ${styles.faqSection}`}
          aria-labelledby="faq-heading"
        >
          <div className={styles.sectionIntro}>
            <h2 id="faq-heading">Before you begin.</h2>
            <p>
              A few answers about installation, languages, and using OpenRosary.
            </p>
          </div>
          <div className={styles.faqList}>
            {faqItems.map((item) => (
              <details key={item.question} className={styles.faqItem}>
                <summary>
                  {item.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.finalCta} aria-labelledby="final-heading">
          <div className={styles.finalCopy}>
            <h2 id="final-heading">Ready to pray?</h2>
            <p>Choose a mystery. Begin at your own pace.</p>
          </div>
          <div className={styles.finalActions}>
            <div className={styles.heroActions}>
              <a
                className={`${styles.button} ${styles.buttonPrimary}`}
                href={DOWNLOAD_HREF}
                download="OpenRosary-0.4.apk"
              >
                <DownloadIcon />
                <span>Download APK</span>
              </a>
              <a
                className={`${styles.button} ${styles.buttonSecondary}`}
                href="/"
              >
                <span>Open web version</span>
              </a>
            </div>
            <p className={styles.finalMeta}>
              Free and open source · Android 8.0+
            </p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <a className={styles.wordmark} href="/app">
              OpenRosary
            </a>
            <p>
              The Rosary and Catholic devotions,
              <br />
              one prayer at a time.
            </p>
          </div>
          <nav className={styles.footerLinks} aria-label="Footer navigation">
            <a href="/">Pray in your browser</a>
            <a href={SOURCE_HREF} target="_blank" rel="noreferrer">
              GitHub source
            </a>
            <a href="/app/privacy">Privacy policy</a>
          </nav>
          <div className={styles.footerBottom}>
            <p>Free and open source.</p>
            <a
              className={styles.footerByline}
              href="https://ryanson.id"
              target="_blank"
              rel="noreferrer"
            >
              Made by <span>Ryanson</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
