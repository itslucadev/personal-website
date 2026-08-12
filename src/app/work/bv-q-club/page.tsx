import type { Metadata } from 'next';
import { CaseStudyBVQClub } from '@/components/CaseStudyBVQClub';

const title = 'BV Q-Club e.V. - Case Study | Luca Becker';
const description =
  "Website and Sanity CMS for Fürth's pool billiard club: an editorial Next.js site the board maintains itself, with tournament results syncing automatically from Cuescore.";

export const metadata: Metadata = {
  title,
  description,
  robots: 'index, follow',
  alternates: {
    canonical: '/work/bv-q-club',
  },
  openGraph: {
    type: 'article',
    url: 'https://lucabecker.dev/work/bv-q-club',
    title,
    description,
    images: [
      {
        url: '/clients/bv-q-club-hero.webp',
        width: 1440,
        height: 900,
        alt: 'Homepage of bv-q-club.de',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/clients/bv-q-club-hero.webp'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'BV Q-Club e.V. Website',
  url: 'https://lucabecker.dev/work/bv-q-club',
  description,
  inLanguage: 'en',
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
  keywords: [
    'Next.js',
    'Sanity CMS',
    'TypeScript',
    'Tailwind CSS',
    'Vercel',
    'Web Design',
  ],
};

export default function BVQClubCaseStudyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyBVQClub />
    </>
  );
}
