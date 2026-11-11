import type { Metadata } from 'next';
import { Fira_Code, Inter, Kalam, Newsreader } from 'next/font/google';

import { languageAlternates, locales, OG_LOCALE } from '@/i18n/config';
import { getDictionary, getLocale } from '@/i18n/dictionaries';
import { I18nProvider } from '@/i18n/I18nProvider';

import '../globals.css';

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: 'variable',
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-newsreader',
});

const kalam = Kalam({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-kalam',
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const [dict, lang] = await Promise.all([getDictionary(), getLocale()]);
  const { title, description, ogAlt } = dict.meta;

  return {
    metadataBase: new URL('https://lucabecker.dev'),
    title,
    description,
    authors: [{ name: 'Luca Becker' }],
    robots: 'index, follow',
    alternates: {
      canonical: `/${lang}`,
      languages: languageAlternates(),
    },
    openGraph: {
      type: 'website',
      url: `https://lucabecker.dev/${lang}`,
      title,
      description,
      siteName: 'Luca Becker',
      locale: OG_LOCALE[lang],
      alternateLocale: locales.filter((other) => other !== lang).map((other) => OG_LOCALE[other]),
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: ogAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
    other: {
      'geo.region': 'DE',
      'geo.placename': 'Germany',
    },
  };
}

function personJsonLd(meta: { jobTitle: string; personDescription: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Luca Becker',
    url: 'https://lucabecker.dev',
    image: 'https://lucabecker.dev/avatar.png',
    jobTitle: meta.jobTitle,
    description: meta.personDescription,
    email: 'mail@lucabecker.dev',
    sameAs: [
      'https://github.com/itslucadev',
      'https://x.com/itslucadev',
      'https://www.linkedin.com/in/luca-becker-10a736231/',
    ],
    knowsAbout: [
      'React Native',
      'TypeScript',
      'JavaScript',
      'React',
      'Next.js',
      'Expo',
      'Mobile App Development',
      'iOS Development',
      'Android Development',
      'Tailwind CSS',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'FAU Universität Erlangen-Nürnberg',
      url: 'https://www.fau.de',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DE',
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [dict, lang] = await Promise.all([getDictionary(), getLocale()]);

  return (
    <html data-scroll-behavior="smooth" lang={lang} suppressHydrationWarning>
      <head>
        <script
          // oxlint-disable-next-line react/no-danger -- JSON-LD is a JSON.stringify of a static object, not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(dict.meta)) }}
          type="application/ld+json"
        />
      </head>
      <body
        className={`${firaCode.variable} ${inter.variable} ${newsreader.variable} ${kalam.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <I18nProvider dict={dict} lang={lang}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
