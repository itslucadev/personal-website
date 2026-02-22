import type { Metadata } from 'next';
import Link from 'next/link';
import { readFile } from 'fs/promises';
import { join } from 'path';
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
      <main className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/zeiterfassung"
          className="text-muted-foreground hover:text-foreground mb-8 inline-block"
        >
          &larr; Back
        </Link>

        <article className="prose prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-foreground prose-strong:text-foreground prose-hr:border-border max-w-none [&>p]:mb-6 [&>h2]:mt-10 [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:mb-8 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:mb-4">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </main>
    </div>
  );
}
