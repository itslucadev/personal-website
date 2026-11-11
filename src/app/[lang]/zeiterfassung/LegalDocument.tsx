import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import { getDictionary, getLocale } from '@/i18n/dictionaries';

/** The legal texts exist only in English; the page around them follows the visitor's locale. */
export async function LegalDocument({ file }: { file: 'privacy-policy' | 'terms-of-service' }) {
  const [content, dict, lang] = await Promise.all([
    readFile(join(process.cwd(), 'src/app/[lang]/zeiterfassung/content', `${file}.md`), 'utf-8'),
    getDictionary(),
    getLocale(),
  ]);
  const t = dict.zeiterfassung;

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Link className="mb-8 inline-block text-muted-foreground hover:text-foreground" href={`/${lang}/zeiterfassung`}>
          &larr; {t.back}
        </Link>

        {lang === 'en' ? null : <p className="mb-8 text-sm text-muted-foreground">{t.englishOnly}</p>}

        <article
          className="prose prose-invert prose-hr:border-border prose-a:text-foreground prose-headings:text-foreground prose-li:text-muted-foreground prose-p:text-muted-foreground prose-strong:text-foreground max-w-none [&>h1]:mb-8 [&>h1]:text-4xl [&>h1]:font-bold [&>h2]:mb-4 [&>h2]:mt-10 [&>h2]:text-xl [&>h2]:font-semibold [&>p]:mb-6"
          lang="en"
        >
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </main>
    </div>
  );
}
