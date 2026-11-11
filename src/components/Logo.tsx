'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { useI18n } from '@/i18n/I18nProvider';
import { ease } from '@/lib/motion';

export function Logo() {
  const { lang } = useI18n();
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="absolute left-6 top-6 z-50"
      initial={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.5,
        ease,
      }}
    >
      <Link
        className="text-sm font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
        href={`/${lang}`}
      >
        <span className="text-amber-600">{'//'}</span> LB
      </Link>
    </motion.div>
  );
}
