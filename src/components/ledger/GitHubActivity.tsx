import {
  type ContributionCalendar,
  fetchContributionCalendar,
  GITHUB_LOGIN,
} from "@/lib/github";
import { cn } from "@/lib/utils";

const CELL = 10;
const GAP = 3;
const STEP = CELL + GAP;
const LABEL_W = 28;
const LABEL_H = 16;

const FILL: Record<
  ContributionCalendar["weeks"][number][number]["level"],
  string
> = {
  // GitHub's light-theme contribution colours.
  0: "#EBEDF0",
  1: "#9BE9A8",
  2: "#40C463",
  3: "#30A14E",
  4: "#216E39",
};

const DAY_LABELS: Record<number, string> = { 1: "Mon", 3: "Wed", 5: "Fri" };

const FOCUS =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2";

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
  return new Date(`${date}T00:00:00Z`);
}

function monthLabels(weeks: ContributionCalendar["weeks"]) {
  const labels: { x: number; text: string }[] = [];
  let previous = -1;
  weeks.forEach((week, index) => {
    const first = week[0];
    if (!first) {
      return;
    }
    const month = parse(first.date).getUTCMonth();
    if (month !== previous) {
      // A label that would collide with the previous one replaces it: the
      // earlier month only had a week or two in view, like GitHub does it.
      const last = labels.at(-1);
      if (last && index * STEP - last.x < STEP * 3) {
        labels.pop();
      }
      labels.push({
        x: index * STEP,
        text: monthOf.format(parse(first.date)),
      });
      previous = month;
    }
  });
  return labels;
}

function Calendar({ weeks }: { weeks: ContributionCalendar["weeks"] }) {
  const width = LABEL_W + weeks.length * STEP - GAP;
  const height = LABEL_H + 7 * STEP - GAP;
  return (
    <svg
      aria-label="Contribution calendar, one square per day"
      className="block w-full font-sans"
      role="img"
      viewBox={`0 0 ${width} ${height}`}
    >
      {monthLabels(weeks).map((label) => (
        <text
          className="fill-muted-foreground text-[10px]"
          key={label.x}
          x={LABEL_W + label.x}
          y={10}
        >
          {label.text}
        </text>
      ))}
      {Object.entries(DAY_LABELS).map(([day, text]) => (
        <text
          className="fill-muted-foreground text-[10px]"
          key={day}
          x={0}
          y={LABEL_H + Number(day) * STEP + CELL - 1}
        >
          {text}
        </text>
      ))}
      {weeks.map((week, w) =>
        week.map((day) => {
          const weekday = parse(day.date).getUTCDay();
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
              <title>
                {`${day.count} contribution${day.count === 1 ? "" : "s"} on ${longDate.format(parse(day.date))}`}
              </title>
            </rect>
          );
        })
      )}
    </svg>
  );
}

export async function GitHubActivity() {
  const calendar = await fetchContributionCalendar();

  return (
    <div className="mt-10 max-w-[720px]">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.12em]">
          GitHub activity
        </p>
        <a
          className={cn(
            "font-mono text-[11px] text-amber-600 tracking-[0.04em] transition-colors hover:text-amber-700",
            FOCUS
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
          <Calendar weeks={calendar.weeks} />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 font-sans text-muted-foreground text-xs">
            <p>
              <span className="font-medium text-foreground">
                {calendar.total.toLocaleString("en-US")}
              </span>{" "}
              contributions in the last year
            </p>
            <p aria-hidden className="flex items-center gap-1">
              Less
              {([0, 1, 2, 3, 4] as const).map((level) => (
                <span
                  className="inline-block size-[10px] rounded-[2px]"
                  key={level}
                  style={{ backgroundColor: FILL[level] }}
                />
              ))}
              More
            </p>
          </div>
        </div>
      ) : (
        <p className="font-sans text-muted-foreground text-sm">
          Contribution graph unavailable right now. See the profile on GitHub.
        </p>
      )}
    </div>
  );
}
