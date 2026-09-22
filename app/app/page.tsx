import type { Metadata } from 'next';
import Landing from './Landing';

export const metadata: Metadata = {
  metadataBase: new URL('https://openrosary.ryanson.id'),
  icons: {
    icon: '/app/icon.svg',
  },
  title: 'OpenRosary | A quiet companion for your daily Rosary',
  description:
    'OpenRosary is a free, open source rosary app for quiet daily prayer. Use it offline on Android or open the web version anywhere.',
  alternates: {
    canonical: '/app',
  },
  openGraph: {
    title: 'OpenRosary | A quiet companion for your daily Rosary',
    description:
      'A free, open source rosary app for quiet daily prayer, available offline on Android and on the web.',
    url: '/app',
    siteName: 'OpenRosary',
    type: 'website',
    images: [
      {
        url: '/app/social.png',
        width: 1200,
        height: 630,
        alt: 'OpenRosary, a quiet companion for daily prayer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenRosary | A quiet companion for your daily Rosary',
    description:
      'A free, open source rosary app for quiet daily prayer, available offline on Android and on the web.',
    images: ['/app/social.png'],
  },
};

export default function AppLandingPage() {
  return <Landing />;
}
