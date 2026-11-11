export const locales = ['en', 'de'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/** Set by the proxy whenever a locale-prefixed page is visited, so the choice sticks. */
export const LOCALE_COOKIE = 'NEXT_LOCALE';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** A piece of content written once per locale; both entries are required. */
export type Localized<T = string> = Record<Locale, T>;

export const OG_LOCALE: Record<Locale, string> = { en: 'en_US', de: 'de_DE' };

/** Prefixes an internal path with the locale: `/agent-notch` -> `/de/agent-notch`. */
export function localePath(lang: Locale, path = '/') {
  return path === '/' ? `/${lang}` : `/${lang}${path}`;
}

/** hreflang alternates for a path that exists in every locale. */
export function languageAlternates(path = '/') {
  return {
    ...Object.fromEntries(locales.map((lang) => [lang, localePath(lang, path)])),
    'x-default': path,
  };
}
