import type { Metadata } from 'next';
import Landing from './Landing';

export const metadata: Metadata = {
  metadataBase: new URL('https://openrosary.ryanson.id'),
  icons: {
    icon: '/app/icon.svg',
  },
  title: 'OpenRosary | The Rosary, one prayer at a time',
  description:
    'Pray the Rosary with guided prayers, volume button navigation, and offline access on Android. Free and open source, with a web version too.',
  alternates: {
    canonical: '/app',
  },
  openGraph: {
    title: 'OpenRosary | The Rosary, one prayer at a time',
    description:
      'Pray the Rosary in English or Indonesian, with optional Latin prayers. Available offline on Android and in your browser.',
    url: '/app',
    siteName: 'OpenRosary',
    type: 'website',
    images: [
      {
        url: '/app/social.png?v=2',
        width: 1200,
        height: 630,
        alt: 'OpenRosary: the Rosary, one prayer at a time',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenRosary | The Rosary, one prayer at a time',
    description:
      'Pray the Rosary in English or Indonesian, with optional Latin prayers. Available offline on Android and in your browser.',
    images: ['/app/social.png?v=2'],
  },
};

export default function AppLandingPage() {
  return <Landing />;
}
