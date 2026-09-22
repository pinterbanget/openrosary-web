import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://openrosary.ryanson.id/app', changeFrequency: 'monthly', priority: 1 },
    { url: 'https://openrosary.ryanson.id/', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://openrosary.ryanson.id/app/privacy', changeFrequency: 'yearly', priority: 0.3 },
  ];
}
