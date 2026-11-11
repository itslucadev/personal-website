import type { Metadata } from 'next';

import { ClientPageBvqClub } from '@/components/ClientPageBvqClub';
import { languageAlternates, OG_LOCALE } from '@/i18n/config';
import { getDictionary, getLocale } from '@/i18n/dictionaries';

export async function generateMetadata(): Promise<Metadata> {
  const [dict, lang] = await Promise.all([getDictionary(), getLocale()]);
  const { metaTitle: title, metaDescription: description, ogAlt } = dict.bvq;

  return {
    title,
    description,
    robots: 'index, follow',
    alternates: {
      canonical: `/${lang}/work/bv-q-club`,
      languages: languageAlternates('/work/bv-q-club'),
    },
    openGraph: {
      type: 'article',
      url: `https://lucabecker.dev/${lang}/work/bv-q-club`,
      title,
      description,
      siteName: 'Luca Becker',
      locale: OG_LOCALE[lang],
      images: [
        {
          url: '/clients/bv-q-club-hero-og.jpg',
          width: 1440,
          height: 900,
          type: 'image/jpeg',
          alt: ogAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/clients/bv-q-club-hero-og.jpg'],
    },
  };
}

function creativeWorkJsonLd(lang: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'BV Q-Club e.V. Website',
    url: 'https://bv-q-club.de',
    mainEntityOfPage: `https://lucabecker.dev/${lang}/work/bv-q-club`,
    description,
    inLanguage: 'de',
    creator: {
      '@type': 'Person',
      name: 'Luca Becker',
      url: 'https://lucabecker.dev',
    },
    about: {
      '@type': 'SportsOrganization',
      name: 'BV Q-Club e.V.',
      url: 'https://bv-q-club.de',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kaiserstraße 177',
        postalCode: '90763',
        addressLocality: 'Fürth',
        addressCountry: 'DE',
      },
    },
    keywords: ['Next.js', 'Sanity CMS', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Web Design'],
  };
}

export default async function BVQClubPage() {
  const [dict, lang] = await Promise.all([getDictionary(), getLocale()]);
  const jsonLd = creativeWorkJsonLd(lang, dict.bvq.metaDescription);

  return (
    <>
      <script
        // oxlint-disable-next-line react/no-danger -- JSON-LD is a JSON.stringify of a static object, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <ClientPageBvqClub />
    </>
  );
}
