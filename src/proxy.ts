import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { type NextRequest, NextResponse } from 'next/server';

import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale, locales } from '@/i18n/config';

/** Countries where a visitor whose browser asks for neither English nor German most likely reads German. */
const GERMAN_SPEAKING_COUNTRIES = new Set(['DE', 'AT', 'CH', 'LI']);

const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Shareable resume URLs: `/resume.pdf` follows the visitor's locale, `/en/resume.pdf` and `/de/resume.pdf` are
 * fixed, and `/lebenslauf.pdf` is always German.
 */
const RESUME_PATH = /^\/(?:(en|de)\/)?resume\.pdf$/;
const RESUME_FILE: Record<Locale, string> = { en: '/main_en.pdf', de: '/main_de.pdf' };

function preferredLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && isLocale(saved)) {
    return saved;
  }

  const languages = new Negotiator({
    headers: { 'accept-language': request.headers.get('accept-language') ?? '' },
  }).languages();
  const asksForSupported = languages.some((language) => locales.some((locale) => language.startsWith(locale)));
  if (asksForSupported) {
    const matched = match(languages, locales, defaultLocale);
    return isLocale(matched) ? matched : defaultLocale;
  }

  // Set by Vercel's edge from the visitor's IP; absent locally.
  const country = request.headers.get('x-vercel-ip-country');
  return country && GERMAN_SPEAKING_COUNTRIES.has(country) ? 'de' : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/lebenslauf.pdf') {
    return NextResponse.rewrite(new URL(RESUME_FILE.de, request.url));
  }

  const resume = RESUME_PATH.exec(pathname);
  if (resume) {
    const lang = resume[1] && isLocale(resume[1]) ? resume[1] : preferredLocale(request);
    const response = NextResponse.rewrite(new URL(RESUME_FILE[lang], request.url));
    if (!resume[1]) {
      response.headers.set('Vary', 'Accept-Language, Cookie');
    }
    return response;
  }

  const segment = pathname.split('/')[1] ?? '';

  if (isLocale(segment)) {
    const response = NextResponse.next();
    if (request.cookies.get(LOCALE_COOKIE)?.value !== segment) {
      response.cookies.set(LOCALE_COOKIE, segment, { maxAge: ONE_YEAR, path: '/', sameSite: 'lax' });
    }
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === '/' ? '' : pathname}`;
  const response = NextResponse.redirect(url);
  response.headers.set('Vary', 'Accept-Language, Cookie');
  return response;
}

export const config = {
  // Everything except Next internals and files with an extension (public assets,
  // icons, sitemap.xml, robots.txt, the Agent Notch zip), plus the resume URLs.
  matcher: ['/((?!_next/|.*\\..*).*)', '/resume.pdf', '/lebenslauf.pdf', '/:lang(en|de)/resume.pdf'],
};
