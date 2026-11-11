import type { Metadata } from 'next';

import { AgentNotchPage, agentNotchDownloadUrl, agentNotchRepoUrl } from '@/components/AgentNotchPage';
import { languageAlternates, OG_LOCALE } from '@/i18n/config';
import { getDictionary, getLocale } from '@/i18n/dictionaries';

export async function generateMetadata(): Promise<Metadata> {
  const [dict, lang] = await Promise.all([getDictionary(), getLocale()]);
  const { metaTitle: title, metaDescription: description, ogAlt } = dict.agentNotch;

  return {
    title,
    description,
    robots: 'index, follow',
    alternates: {
      canonical: `/${lang}/agent-notch`,
      languages: languageAlternates('/agent-notch'),
    },
    openGraph: {
      type: 'website',
      url: `https://lucabecker.dev/${lang}/agent-notch`,
      title,
      description,
      siteName: 'Luca Becker',
      locale: OG_LOCALE[lang],
      images: [
        {
          url: '/projects/agent-notch/og.png',
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: ogAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/projects/agent-notch/og.png'],
    },
  };
}

function softwareJsonLd(lang: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Agent Notch',
    url: `https://lucabecker.dev/${lang}/agent-notch`,
    inLanguage: lang,
    description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'macOS 26',
    downloadUrl: agentNotchDownloadUrl,
    softwareHelp: agentNotchRepoUrl,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    author: {
      '@type': 'Person',
      name: 'Luca Becker',
      url: 'https://lucabecker.dev',
    },
    keywords: ['Claude', 'Cursor', 'Codex', 'usage', 'rate limit', 'macOS', 'notch'],
  };
}

export default async function AgentNotchRoute() {
  const [dict, lang] = await Promise.all([getDictionary(), getLocale()]);
  const jsonLd = softwareJsonLd(lang, dict.agentNotch.metaDescription);

  return (
    <>
      <script
        // oxlint-disable-next-line react/no-danger -- JSON-LD is a JSON.stringify of a static object, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <AgentNotchPage />
    </>
  );
}
