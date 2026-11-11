import { notFound } from 'next/navigation';
import { lang } from 'next/root-params';

import { isLocale, type Locale } from './config';
import type { Dictionary } from './dictionaries/en';

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./dictionaries/en').then((module) => module.en),
  de: () => import('./dictionaries/de').then((module) => module.de),
};

/** The locale of the current request, read from the `[lang]` root segment. */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!isLocale(value)) {
    notFound();
  }
  return value;
}

export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()]();
}
