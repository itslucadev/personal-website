import type { Locale } from '@/i18n/config';
import { getDictionary, getLocale } from '@/i18n/dictionaries';
import type { Dictionary } from '@/i18n/dictionaries/en';
import { format } from '@/i18n/format';
import { type ContributionCalendar, fetchContributionCalendar, GITHUB_LOGIN } from '@/lib/github';
import { cn } from '@/lib/utils';

const CELL = 10;
const GAP = 3;
const STEP = CELL + GAP;
const LABEL_W = 28;
const LABEL_H = 16;

const FILL: Record<ContributionCalendar['weeks'][number][number]['level'], string> = {
  // GitHub's light-theme contribution colours.
  0: '#EBEDF0',
  1: '#9BE9A8',
  2: '#40C463',
  3: '#30A14E',
  4: '#216E39',
};

const DAY_LABELS = { 1: 'mon', 3: 'wed', 5: 'fri' } as const;

const INTL_LOCALE: Record<Locale, string> = { en: 'en-US', de: 'de-DE' };

const FOCUS =
  'rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2';

function formatters(lang: Locale) {
  const locale = INTL_LOCALE[lang];
  return {
    month: new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' }),
    longDate: new Intl.DateTimeFormat(locale, { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }),
    number: new Intl.NumberFormat(locale),
  };
}

type Formatters = ReturnType<typeof formatters>;

function parse(date: string) {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  return parsed;
}

interface MonthLabel {
  text: string;
  x: number;
}

/**
 * A label that would collide with the previous one replaces it: the earlier
 * month only had a week or two in view, like GitHub does it.
 */
function pushMonthLabel(labels: MonthLabel[], label: MonthLabel) {
  const last = labels.at(-1);
  if (last && label.x - last.x < STEP * 3) {
    labels.pop();
  }
  labels.push(label);
}

function weekStart(week: ContributionCalendar['weeks'][number]) {
  const first = week[0];
  return first ? parse(first.date) : null;
}

function monthLabels(weeks: ContributionCalendar['weeks'], monthOf: Intl.DateTimeFormat) {
  const labels: MonthLabel[] = [];
  let previous = -1;
  weeks.forEach((week, index) => {
    const date = weekStart(week);
    if (!date) {
      return;
    }
    const month = date.getUTCMonth();
    if (month === previous) {
      return;
    }
    previous = month;
    pushMonthLabel(labels, { x: index * STEP, text: monthOf.format(date) });
  });
  return labels;
}

function Calendar({
  weeks,
  t,
  fmt,
}: {
  weeks: ContributionCalendar['weeks'];
  t: Dictionary['github'];
  fmt: Formatters;
}) {
  const width = LABEL_W + weeks.length * STEP - GAP;
  const height = LABEL_H + 7 * STEP - GAP;
  return (
    <svg
      aria-label={t.calendarLabel}
      className="block w-full font-sans"
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- inline SVG graphic, not a replaced image
      role="img"
      viewBox={`0 0 ${width} ${height}`}
    >
      {monthLabels(weeks, fmt.month).map((label) => (
        <text className="fill-muted-foreground text-[10px]" key={label.x} x={LABEL_W + label.x} y={10}>
          {label.text}
        </text>
      ))}
      {Object.entries(DAY_LABELS).map(([day, key]) => (
        <text className="fill-muted-foreground text-[10px]" key={day} x={0} y={LABEL_H + Number(day) * STEP + CELL - 1}>
          {t[key]}
        </text>
      ))}
      {weeks.map((week, w) =>
        week.map((day) => {
          const date = parse(day.date);
          const weekday = date ? date.getUTCDay() : 0;
          const template = day.count === 1 ? t.dayOne : t.dayOther;
          const title = format(template, {
            count: fmt.number.format(day.count),
            date: date ? fmt.longDate.format(date) : '',
          }).trim();
          return (
            <rect
              fill={FILL[day.level]}
              height={CELL}
              key={day.date}
              rx={2}
              width={CELL}
              x={LABEL_W + w * STEP}
              y={LABEL_H + weekday * STEP}
            >
              <title>{title}</title>
            </rect>
          );
        }),
      )}
    </svg>
  );
}

export async function GitHubActivity() {
  const [calendar, dict, lang] = await Promise.all([fetchContributionCalendar(), getDictionary(), getLocale()]);
  const t = dict.github;
  const fmt = formatters(lang);

  return (
    <div className="mt-10 max-w-[720px]">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{t.heading}</p>
        <a
          className={cn(
            'font-mono text-[11px] tracking-[0.04em] text-amber-600 transition-colors hover:text-amber-700',
            FOCUS,
          )}
          href={`https://github.com/${GITHUB_LOGIN}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          @{GITHUB_LOGIN}
        </a>
      </div>
      {calendar ? (
        <div className="rounded-[8px] border border-[#DCE2EA] bg-white p-4">
          <Calendar fmt={fmt} t={t} weeks={calendar.weeks} />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 font-sans text-xs text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">{fmt.number.format(calendar.total)}</span> {t.total}
            </p>
            <p aria-hidden className="flex items-center gap-1">
              {t.less}
              {([0, 1, 2, 3, 4] as const).map((level) => (
                <span
                  className="inline-block size-[10px] rounded-[2px]"
                  key={level}
                  style={{ backgroundColor: FILL[level] }}
                />
              ))}
              {t.more}
            </p>
          </div>
        </div>
      ) : (
        <p className="font-sans text-sm text-muted-foreground">{t.unavailable}</p>
      )}
    </div>
  );
}
