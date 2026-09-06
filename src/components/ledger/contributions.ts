import type { ContributionCalendar, ContributionDay } from "@/lib/github";

export type Level = ContributionDay["level"];

export const LEVELS = [0, 1, 2, 3, 4] as const;

/** GitHub's light-theme contribution colours. */
export const FILL: Record<Level, string> = {
  0: "#EBEDF0",
  1: "#9BE9A8",
  2: "#40C463",
  3: "#30A14E",
  4: "#216E39",
};

/** GitHub labels every other row, which keeps the axis readable at 10px. */
export const DAY_LABELS: Record<number, string> = {
  1: "Mon",
  3: "Wed",
  5: "Fri",
};

const monthOf = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});
const longDate = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function parse(date: string) {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  return parsed;
}

/** Row the day sits on, 0 (Sunday) to 6, matching GitHub's grid. */
export function weekdayOf(day: ContributionDay) {
  return parse(day.date)?.getUTCDay() ?? 0;
}

/** The per-day tooltip, e.g. "7 contributions on July 4, 2026". */
export function dayTitle(day: ContributionDay) {
  const date = parse(day.date);
  const suffix = day.count === 1 ? "" : "s";
  const countLabel = `${day.count} contribution${suffix}`;
  return date ? `${countLabel} on ${longDate.format(date)}` : countLabel;
}

interface MonthLabel {
  index: number;
  text: string;
}

/** The month a week's first day falls in, or null when the week is empty. */
function monthOfWeek(week: ContributionDay[]) {
  const first = week[0];
  const date = first ? parse(first.date) : null;
  return date
    ? { month: date.getUTCMonth(), text: monthOf.format(date) }
    : null;
}

/**
 * A label that would collide with the previous one replaces it: the earlier
 * month only had a week or two in view, like GitHub does it.
 */
function pushMonthLabel(labels: MonthLabel[], label: MonthLabel) {
  const last = labels.at(-1);
  if (last && label.index - last.index < 3) {
    labels.pop();
  }
  labels.push(label);
}

/** One label per month, at the index of the week that month starts in. */
export function monthLabels(weeks: ContributionCalendar["weeks"]) {
  const labels: MonthLabel[] = [];
  let previous = -1;
  weeks.forEach((week, index) => {
    const started = monthOfWeek(week);
    if (!started || started.month === previous) {
      return;
    }
    pushMonthLabel(labels, { index, text: started.text });
    previous = started.month;
  });
  return labels;
}
