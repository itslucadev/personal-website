import { readFile } from "fs/promises";
import type { Metadata } from "next";
import Link from "next/link";
import { join } from "path";
import ReactMarkdown from "react-markdown";

export const metadata: Metadata = {
  title: "Terms & Conditions | Zeiterfassung",
  description: "Terms and Conditions for the Zeiterfassung app",
  robots: "noindex, nofollow",
};

async function getTermsOfService() {
  const filePath = join(
    process.cwd(),
    "src/app/zeiterfassung/content/terms-of-service.md"
  );
  const content = await readFile(filePath, "utf-8");
  return content;
}

export default async function TermsOfServicePage() {
  const content = await getTermsOfService();

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Link
          className="mb-8 inline-block text-muted-foreground hover:text-foreground"
          href="/zeiterfassung"
        >
          &larr; Back
        </Link>

        <article className="prose prose-invert max-w-none prose-hr:border-border prose-a:text-foreground prose-headings:text-foreground prose-li:text-muted-foreground prose-p:text-muted-foreground prose-strong:text-foreground [&>h1]:mb-8 [&>h1]:font-bold [&>h1]:text-4xl [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:font-semibold [&>h2]:text-xl [&>p]:mb-6">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </main>
    </div>
  );
}
