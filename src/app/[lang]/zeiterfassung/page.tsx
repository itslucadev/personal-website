import type { Metadata } from 'next';
import Link from 'next/link';

import { getDictionary, getLocale } from '@/i18n/dictionaries';

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: 'Zeiterfassung',
    description: dict.zeiterfassung.description,
    robots: 'noindex, nofollow',
  };
}

export default async function ZeiterfassungPage() {
  const [dict, lang] = await Promise.all([getDictionary(), getLocale()]);
  const t = dict.zeiterfassung;
  const links = [
    { href: `/${lang}/zeiterfassung/privacy-policy`, title: t.privacy, description: t.privacyDescription },
    { href: `/${lang}/zeiterfassung/terms-of-service`, title: t.terms, description: t.termsDescription },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-8 text-3xl font-bold">Zeiterfassung</h1>

        <nav className="space-y-4">
          {links.map((link) => (
            <Link
              className="block rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
              href={link.href}
              key={link.href}
            >
              <h2 className="font-semibold">{link.title}</h2>
              <p className="text-sm text-muted-foreground">{link.description}</p>
            </Link>
          ))}
        </nav>
      </main>
    </div>
  );
}
