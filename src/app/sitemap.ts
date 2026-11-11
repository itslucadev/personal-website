import type { MetadataRoute } from 'next';

import { locales, localePath } from '@/i18n/config';

const SITE = 'https://lucabecker.dev';

const PAGES: { path: string; changeFrequency: 'monthly' | 'yearly'; priority: number }[] = [
  { path: '/', changeFrequency: 'monthly', priority: 1 },
  { path: '/work/bv-q-club', changeFrequency: 'yearly', priority: 0.7 },
  { path: '/agent-notch', changeFrequency: 'monthly', priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((lang) => ({
      url: `${SITE}${localePath(lang, path)}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(locales.map((other) => [other, `${SITE}${localePath(other, path)}`])),
      },
    })),
  );
}
