import type { Metadata } from 'next';
import Link from 'next/link';
import ThemeToggle from '../../ThemeToggle';
import styles from './privacy.module.css';

export const metadata: Metadata = {
  title: 'Privacy | OpenRosary',
  description: 'How the OpenRosary Android app stores preferences and works offline.',
  alternates: { canonical: 'https://openrosary.ryanson.id/app/privacy' },
  icons: { icon: '/app/icon.svg' },
};

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#privacy">Skip to content</a>
      <ThemeToggle />
      <header><Link className={styles.brand} href="/app">(openrosary)</Link></header>
      <main id="privacy" tabIndex={-1}>
        <p className={styles.eyebrow}>Android app · Updated 8 September 2026</p>
        <h1>Your prayer stays with you.</h1>
        <p className={styles.intro}>OpenRosary is an offline prayer application. The Android app has no account system, advertising SDK, analytics SDK, or in-app network client. Prayer content is included in the app.</p>
        <section>
          <h2>Preferences on your device</h2>
          <p>The app stores your choices, such as language, theme, and Latin prayer preference, in Android app preferences on your device. These preferences are not sent to the OpenRosary project. Uninstalling the app is the normal Android way to remove its local app data.</p>
        </section>
        <section>
          <h2>Permission for haptic feedback</h2>
          <p>OpenRosary requests Android’s vibration permission so that optional haptic cues can accompany prayer navigation. The app does not request location, contacts, camera, microphone, or storage permissions.</p>
        </section>
        <section>
          <h2>About this policy</h2>
          <p>This policy describes the Android app. Android, Google Play, and your device manufacturer may process information independently under their own policies. Visiting this website or downloading the APK also involves the website’s hosting provider.</p>
          <p>If the app’s data behaviour changes, this policy will be reviewed and updated before release.</p>
        </section>
        <section>
          <h2>Questions about privacy</h2>
          <p>You can raise questions through the <a href="https://github.com/pinterbanget/openrosary/issues">project’s public issue tracker</a>. Please avoid including private information in a public issue.</p>
        </section>
        <Link className={styles.back} href="/app">Back to OpenRosary</Link>
      </main>
      <footer><a href="https://ryanson.id">(ryanson.id)</a></footer>
    </div>
  );
}
