import Image from 'next/image';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

const FOCUS =
  'rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2';

interface Row {
  period: string;
  role: ReactNode;
  place: string;
  /** Small mark shown before the role. Decorative; the name is in the text. */
  logo: { src: string; alt: string };
}

interface Group {
  label: string;
  rows: Row[];
}

/** Work and education are listed separately, each newest first. */
const groups: Group[] = [
  {
    label: 'Work',
    rows: [
      {
        period: 'Apr 2025 – now',
        role: 'Freelance software engineer',
        place: 'Remote',
        logo: { src: '/experience/mark-freelance.svg', alt: '' },
      },
      {
        period: 'Jun 2021 – Apr 2025',
        role: (
          <>
            Werkstudent,{' '}
            <a
              className={cn('hover:underline', FOCUS)}
              href="https://www.datev.de"
              rel="noopener noreferrer"
              target="_blank"
            >
              DATEV eG
            </a>
          </>
        ),
        place: 'Nuremberg',
        logo: { src: '/experience/logo-datev.svg', alt: '' },
      },
    ],
  },
  {
    label: 'Education',
    rows: [
      {
        period: 'Mar 2026',
        role: (
          <>
            B.Sc. Computer Science,{' '}
            <a
              className={cn('hover:underline', FOCUS)}
              href="https://www.fau.de"
              rel="noopener noreferrer"
              target="_blank"
            >
              FAU Erlangen-Nürnberg
            </a>
          </>
        ),
        place: 'Erlangen',
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

export function ExperienceTable() {
  return (
    <section aria-labelledby="experience-heading" className="scroll-mt-24" id="experience">
      <h2
        className="mb-6 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
        id="experience-heading"
      >
        Experience
      </h2>
      <table className="w-full table-auto border-collapse text-left">
        <caption className="sr-only">Experience</caption>
        <thead className="sr-only">
          <tr>
            <th>Period</th>
            <th>Role</th>
            <th className="hidden sm:table-cell">Place</th>
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
                {group.label}
              </th>
            </tr>
            {group.rows.map((row) => (
              <tr className="border-t border-[#DCE2EA]" key={row.period}>
                <td className="w-[7.5rem] py-4 pr-4 align-top font-mono text-sm text-muted-foreground sm:w-auto sm:whitespace-nowrap sm:pr-6">
                  {row.period}
                </td>
                <td className="py-4 align-top font-sans text-base text-foreground sm:pr-6">
                  <span className="flex items-start gap-2.5">
                    <Mark logo={row.logo} />
                    <span className="min-w-0">
                      {row.role}
                      {/* Below sm the place column is hidden; it moves under the role so the role keeps its width. */}
                      <span className="mt-1 block text-muted-foreground sm:hidden">{row.place}</span>
                    </span>
                  </span>
                </td>
                <td className="hidden py-4 align-top font-sans text-base text-muted-foreground sm:table-cell">
                  {row.place}
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </section>
  );
}
