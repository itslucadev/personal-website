'use client';

import { Home } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Terminal, TypingAnimation } from '@/components/ui/terminal';
import { useI18n } from '@/i18n/I18nProvider';

export default function NotFound() {
  const { dict, lang } = useI18n();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-bold text-foreground">404</h1>
        <p className="text-muted-foreground">{dict.notFound.title}</p>
      </div>

      <Terminal className="h-80 border-zinc-800 bg-zinc-950 text-zinc-100">
        <TypingAnimation className="text-zinc-400" delay={0}>
          lucabecker@localhost ~ %
        </TypingAnimation>

        <TypingAnimation className="text-red-500" delay={1600}>
          {dict.notFound.error}
        </TypingAnimation>
      </Terminal>

      <Button
        asChild
        className="mt-16 flex items-center gap-2 border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100 hover:text-zinc-950"
        variant="outline"
      >
        <Link href={`/${lang}`}>
          <Home className="h-4 w-4" />
          {dict.notFound.home}
        </Link>
      </Button>
    </div>
  );
}
