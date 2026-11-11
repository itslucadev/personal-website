import Image from 'next/image';
import type { ReactNode } from 'react';

import type { Localized } from '@/i18n/config';
import { getDictionary, getLocale } from '@/i18n/dictionaries';
import { cn } from '@/lib/utils';

const FOCUS =
  'rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2';

interface Row {
  /** Stable key; the visible text is localized. */
  id: string;
  period: Localized;
  role: Localized<ReactNode>;
  place: Localized;
  /** Small mark shown before the role. Decorative; the name is in the text. */
  logo: { src: string; alt: string };
}

interface Group {
  label: 'work' | 'education';
  rows: Row[];
}

function Employer({ href, name, title }: { href: string; name: string; title: string }) {
  return (
    <>
      {title},{' '}
      <a className={cn('hover:underline', FOCUS)} href={href} rel="noopener noreferrer" target="_blank">
        {name}
      </a>
    </>
  );
}

/** Work and education are listed separately, each newest first. */
const groups: Group[] = [
  {
    label: 'work',
    rows: [
      {
        id: 'freelance',
        period: { en: 'Apr 2025 – now', de: 'Apr. 2025 – heute' },
        role: { en: 'Freelance software engineer', de: 'Freelance-Softwareentwickler' },
        place: { en: 'Remote', de: 'Remote' },
        logo: { src: '/experience/mark-freelance.svg', alt: '' },
      },
      {
        id: 'datev',
        period: { en: 'Jun 2021 – Apr 2025', de: 'Juni 2021 – Apr. 2025' },
        role: {
          en: <Employer href="https://www.datev.de" name="DATEV eG" title="Working student" />,
          de: <Employer href="https://www.datev.de" name="DATEV eG" title="Werkstudent" />,
        },
        place: { en: 'Nuremberg', de: 'Nürnberg' },
        logo: { src: '/experience/logo-datev.svg', alt: '' },
      },
    ],
  },
  {
    label: 'education',
    rows: [
      {
        id: 'fau',
        period: { en: 'Mar 2026', de: 'März 2026' },
        role: {
          en: <Employer href="https://www.fau.de" name="FAU Erlangen-Nürnberg" title="B.Sc. Computer Science" />,
          de: <Employer href="https://www.fau.de" name="FAU Erlangen-Nürnberg" title="B.Sc. Informatik" />,
        },
        place: { en: 'Erlangen', de: 'Erlangen' },
        logo: { src: '/experience/logo-fau.svg', alt: '' },
      },
    ],
  },
];

/**
 * A 20px tile keeps the three marks the same size and gives the coloured
 * logos a white surface in dark mode. In light mode only the hairline shows.
 */
function Mark({ logo }: { logo: Row['logo'] }) {
  return (
    <span className="mt-[3px] inline-flex size-5 shrink-0 items-center justify-center rounded-[4px] border border-[#DCE2EA] bg-white p-[2px] dark:border-white/10">
      <Image alt={logo.alt} className="size-full object-contain" height={16} src={logo.src} unoptimized width={16} />
    </span>
  );
}

export async function ExperienceTable() {
  const [dict, lang] = await Promise.all([getDictionary(), getLocale()]);
  const t = dict.experience;

  return (
    <section aria-labelledby="experience-heading" className="scroll-mt-24" id="experience">
      <h2
        className="mb-6 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
        id="experience-heading"
      >
        {t.heading}
      </h2>
      <table className="w-full table-auto border-collapse text-left">
        <caption className="sr-only">{t.heading}</caption>
        <thead className="sr-only">
          <tr>
            <th>{t.period}</th>
            <th>{t.role}</th>
            <th className="hidden sm:table-cell">{t.place}</th>
          </tr>
        </thead>
        {groups.map((group, index) => (
          <tbody key={group.label}>
            <tr>
              <th
                className={cn(
                  'pb-2 text-left font-mono text-[10px] font-normal uppercase tracking-[0.12em] text-muted-foreground',
                  index > 0 && 'pt-8',
                )}
                colSpan={3}
                scope="colgroup"
              >
                {t[group.label]}
              </th>
            </tr>
            {group.rows.map((row) => (
              <tr className="border-t border-[#DCE2EA]" key={row.id}>
                <td className="w-[7.5rem] py-4 pr-4 align-top font-mono text-sm text-muted-foreground sm:w-auto sm:whitespace-nowrap sm:pr-6">
                  {row.period[lang]}
                </td>
                <td className="py-4 align-top font-sans text-base text-foreground sm:pr-6">
                  <span className="flex items-start gap-2.5">
                    <Mark logo={row.logo} />
                    <span className="min-w-0">
                      {row.role[lang]}
                      {/* Below sm the place column is hidden; it moves under the role so the role keeps its width. */}
                      <span className="mt-1 block text-muted-foreground sm:hidden">{row.place[lang]}</span>
                    </span>
                  </span>
                </td>
                <td className="hidden py-4 align-top font-sans text-base text-muted-foreground sm:table-cell">
                  {row.place[lang]}
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </section>
  );
}
