'use client';

import { Download } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { locales } from '@/i18n/config';
import { useI18n } from '@/i18n/I18nProvider';
import { stack } from '@/lib/stack';
import { cn } from '@/lib/utils';

const SECTIONS = [
  { id: 'about', key: 'about' },
  { id: 'projects', key: 'projects' },
  { id: 'client-work', key: 'clientWork' },
  { id: 'experience', key: 'experience' },
] as const;

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/itslucadev',
    path: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8',
  },
  {
    label: 'X',
    href: 'https://x.com/itslucadev',
    path: 'M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/luca-becker-10a736231/',
    path: 'M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z',
  },
] as const;

const RAIL_INTRO_KEY = 'lb:rail-intro';

const FOCUS =
  'rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2';

let railIntroChecked = false;
let railIntroShouldEnable = false;

/** The current page in the other locale: swaps the leading `/en` or `/de`. */
function LanguageSwitch() {
  const { dict, lang } = useI18n();
  const pathname = usePathname();
  const rest = pathname.replace(/^\/[^/]+/, '');

  return (
    <nav
      aria-label={dict.languageSwitch.label}
      className="flex items-center gap-1 font-mono text-[11px] tracking-[0.12em]"
    >
      {locales.map((locale, index) => (
        <span className="flex items-center gap-1" key={locale}>
          {index > 0 ? (
            <span aria-hidden className="text-muted-foreground">
              /
            </span>
          ) : null}
          <Link
            aria-current={locale === lang ? 'true' : undefined}
            aria-label={dict.languageSwitch[locale]}
            className={cn(
              'px-0.5 uppercase transition-colors',
              locale === lang ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
              FOCUS,
            )}
            href={`/${locale}${rest}`}
            hrefLang={locale}
            lang={locale}
          >
            {locale}
          </Link>
        </span>
      ))}
    </nav>
  );
}

export function Rail() {
  const { dict, lang } = useI18n();
  const stackItems = useMemo(
    () =>
      stack.map((item) => ({
        id: item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: item.name,
        designation: item.description[lang],
        image: item.icon,
        href: item.url,
      })),
    [lang],
  );
  const [activeId, setActiveId] = useState<string>('about');
  const [introEnabled, setIntroEnabled] = useState(false);
  const visibleIds = useRef(new Set<string>());

  useEffect(() => {
    if (!railIntroChecked) {
      railIntroChecked = true;
      railIntroShouldEnable = !sessionStorage.getItem(RAIL_INTRO_KEY);
      if (railIntroShouldEnable) {
        sessionStorage.setItem(RAIL_INTRO_KEY, '1');
      }
    }
    setIntroEnabled(railIntroShouldEnable);
  }, []);

  useEffect(() => {
    const ids = SECTIONS.map((section) => section.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleIds.current.add(entry.target.id);
          } else {
            visibleIds.current.delete(entry.target.id);
          }
        }
        const next = ids.find((id) => visibleIds.current.has(id));
        if (next) {
          setActiveId(next);
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="flex flex-col py-10 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
      <div className="flex items-center justify-between gap-4">
        <Link
          className={cn(
            'w-fit font-mono text-sm font-bold tracking-tight text-foreground transition-opacity hover:opacity-80',
            FOCUS,
          )}
          href={`/${lang}`}
        >
          <span className="text-amber-600">{'//'}</span> LB
        </Link>
        <LanguageSwitch />
      </div>

      <h1 className="mt-6 font-hand text-[46px] leading-none text-foreground">Luca Becker</h1>

      <p className="mt-4 font-sans font-medium text-foreground">{dict.rail.role}</p>

      <ul aria-label={dict.rail.profiles} className="mt-4 flex items-center gap-1">
        {SOCIALS.map((social) => (
          <li key={social.label}>
            <a
              aria-label={social.label}
              className={cn(
                '-m-1 flex size-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground',
                FOCUS,
              )}
              href={social.href}
              rel="noopener noreferrer"
              target="_blank"
              title={social.label}
            >
              <svg aria-hidden className="size-4" fill="currentColor" viewBox="0 0 16 16">
                <path d={social.path} />
              </svg>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-3 max-w-[30ch] font-sans text-muted-foreground">
        <TextGenerateEffect enabled={introEnabled} words={dict.rail.oneLiner} />
      </p>

      <a
        className={cn(
          'mt-6 inline-flex h-8 w-fit items-center gap-1.5 rounded-sm border border-border bg-background/80 px-3 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground transition-colors hover:border-amber-600 hover:text-amber-600',
          FOCUS,
        )}
        download={dict.rail.resumeFile}
        href={`/${lang}/resume.pdf`}
        hrefLang={lang}
        type="application/pdf"
      >
        <Download aria-hidden className="size-3.5" />
        {dict.rail.resume}
      </a>

      <div className="mt-8">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          {dict.rail.stack}
        </p>
        <AnimatedTooltip className="max-w-[22rem]" items={stackItems} />
      </div>

      <nav aria-label={dict.rail.sectionsLabel} className="mt-8 lg:mt-10">
        <ul className="flex flex-row flex-wrap gap-x-5 gap-y-2 lg:flex-col lg:gap-3">
          {SECTIONS.map((section) => {
            const isActive = activeId === section.id;
            return (
              <li key={section.id}>
                <a
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-200',
                    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                    FOCUS,
                  )}
                  href={`#${section.id}`}
                >
                  <span
                    aria-hidden
                    className={cn(
                      'hidden h-px shrink-0 transition-[width,background-color] duration-300 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] motion-reduce:transition-none lg:block',
                      isActive ? 'w-11 bg-amber-600' : 'w-[18px] bg-[#5F6B7A] group-hover:w-8 group-hover:bg-amber-600',
                    )}
                  />
                  <span className="transition-transform duration-300 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
                    {dict.rail.sections[section.key]}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
