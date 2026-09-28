import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import type { Metadata } from 'next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export const metadata: Metadata = {
  title: 'Privacy Policy | Zeiterfassung',
  description: 'Privacy Policy for the Zeiterfassung app',
  robots: 'noindex, nofollow',
};

async function getPrivacyPolicy() {
  const filePath = join(process.cwd(), 'src/app/zeiterfassung/content/privacy-policy.md');
  const content = await readFile(filePath, 'utf-8');
  return content;
}

export default async function PrivacyPolicyPage() {
  const content = await getPrivacyPolicy();

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Link className="mb-8 inline-block text-muted-foreground hover:text-foreground" href="/zeiterfassung">
          &larr; Back
        </Link>

        <article className="prose prose-invert prose-hr:border-border prose-a:text-foreground prose-headings:text-foreground prose-li:text-muted-foreground prose-p:text-muted-foreground prose-strong:text-foreground max-w-none [&>h1]:mb-8 [&>h1]:text-4xl [&>h1]:font-bold [&>h2]:mb-4 [&>h2]:mt-10 [&>h2]:text-xl [&>h2]:font-semibold [&>p]:mb-6">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </main>
    </div>
  );
}
