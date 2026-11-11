'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

import { useI18n } from '@/i18n/I18nProvider';
import { ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * Each frame mirrors the content wrapper of its shell so the footer lines up
 * with the text above it: the homepage keeps its padding inside the shell cap,
 * the inner pages put it outside the `max-w-3xl` column. Without a frame the
 * footer is a flex item in `PageShell` and collapses to its content width.
 */
const FRAME = {
  wide: { outer: 'mx-auto max-w-shell px-6', inner: '' },
  narrow: { outer: 'px-4 sm:px-6', inner: 'mx-auto max-w-3xl' },
} as const;

export function Footer({ width = 'wide' }: { width?: keyof typeof FRAME }) {
  const frame = FRAME[width];
  const { dict } = useI18n();

  return (
    <motion.footer
      animate={{ opacity: 1 }}
      className={cn('w-full py-8', frame.outer)}
      initial={{ opacity: 0 }}
      transition={{
        duration: 0.5,
        delay: 1.1,
        ease,
      }}
    >
      <div className={frame.inner}>
        <div className="flex flex-col gap-1">
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            © {new Date().getFullYear()} {dict.footer.builtWith}{' '}
            <Heart aria-hidden className="h-3 w-3 fill-red-500 text-red-500" /> {dict.footer.by}
          </p>
          <a
            className="text-xs text-muted-foreground transition-colors duration-200 hover:text-foreground"
            href="https://github.com/itslucadev/personal-website"
            rel="noopener noreferrer"
            target="_blank"
          >
            {dict.footer.openSource}
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
