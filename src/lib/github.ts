import "server-only";

import { z } from "zod";

export const GITHUB_LOGIN = "itslucadev";

export interface ContributionDay {
  count: number;
  date: string;
  /** 0 (none) to 4 (top quartile), as GitHub buckets it. */
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionCalendar {
  total: number;
  /** 53 weeks of up to seven days each, oldest first, Sunday first. */
  weeks: ContributionDay[][];
}

const contributionLevelSchema = z.enum([
  "NONE",
  "FIRST_QUARTILE",
  "SECOND_QUARTILE",
  "THIRD_QUARTILE",
  "FOURTH_QUARTILE",
]);

type ContributionLevel = z.infer<typeof contributionLevelSchema>;

const LEVELS: Record<ContributionLevel, 0 | 1 | 2 | 3 | 4> = {
  FIRST_QUARTILE: 1,
  FOURTH_QUARTILE: 4,
  NONE: 0,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
};

const calendarResponseSchema = z.object({
  data: z.object({
    user: z.object({
      contributionsCollection: z.object({
        contributionCalendar: z.object({
          totalContributions: z.number().int().nonnegative(),
          weeks: z.array(
            z.object({
              contributionDays: z.array(
                z.object({
                  contributionCount: z.number().int().nonnegative(),
                  contributionLevel: contributionLevelSchema,
                  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
                })
              ),
            })
          ),
        }),
      }),
    }),
  }),
});

type CalendarResponse = z.infer<typeof calendarResponseSchema>;

const QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays { date contributionCount contributionLevel }
          }
        }
      }
    }
  }
`;

function mapCalendar(payload: CalendarResponse): ContributionCalendar {
  const calendar =
    payload.data.user.contributionsCollection.contributionCalendar;
  return {
    total: calendar.totalContributions,
    weeks: calendar.weeks.map((week) =>
      week.contributionDays.map((day) => ({
        count: day.contributionCount,
        date: day.date,
        level: LEVELS[day.contributionLevel],
      }))
    ),
  };
}

/**
 * Last year of contributions from GitHub's GraphQL API. Needs `GITHUB_TOKEN`
 * (any token works, the calendar is public data). Returns null when the token
 * is missing or the request fails, so the section can degrade to a link.
 */
export async function fetchContributionCalendar(): Promise<ContributionCalendar | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return null;
  }
  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { login: GITHUB_LOGIN },
      }),
      next: { revalidate: 60 * 60 * 6 },
    });
    if (!response.ok) {
      console.error("GitHub contributions request failed", response.status);
      return null;
    }
    const json: unknown = await response.json();
    if (
      typeof json === "object" &&
      json !== null &&
      "errors" in json &&
      Array.isArray(json.errors) &&
      json.errors.length > 0
    ) {
      console.error("GitHub contributions GraphQL errors", json.errors.length);
      return null;
    }
    const parsed = calendarResponseSchema.safeParse(json);
    if (!parsed.success) {
      console.error("GitHub contributions payload invalid");
      return null;
    }
    return mapCalendar(parsed.data);
  } catch (error) {
    console.error("GitHub contributions request failed", error);
    return null;
  }
}
