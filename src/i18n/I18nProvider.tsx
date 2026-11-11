'use client';

import { createContext, type ReactNode, use, useMemo } from 'react';

import type { Locale } from './config';
import type { Dictionary } from './dictionaries/en';

const I18nContext = createContext<{ dict: Dictionary; lang: Locale } | null>(null);

/** Makes the server-loaded dictionary available to Client Components. */
export function I18nProvider({ children, dict, lang }: { children: ReactNode; dict: Dictionary; lang: Locale }) {
  const value = useMemo(() => ({ dict, lang }), [dict, lang]);
  return <I18nContext value={value}>{children}</I18nContext>;
}

export function useI18n() {
  const value = use(I18nContext);
  if (!value) {
    throw new Error('useI18n must be used inside I18nProvider');
  }
  return value;
}
