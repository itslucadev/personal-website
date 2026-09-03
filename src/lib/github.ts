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

const LEVELS: Record<string, ContributionDay["level"]> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

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

interface CalendarResponse {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
              contributionLevel: string;
            }[];
          }[];
        };
      };
    };
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
      return null;
    }
    const json = (await response.json()) as CalendarResponse;
    const calendar =
      json.data?.user?.contributionsCollection.contributionCalendar;
    if (!calendar) {
      return null;
    }
    return {
      total: calendar.totalContributions,
      weeks: calendar.weeks.map((week) =>
        week.contributionDays.map((day) => ({
          count: day.contributionCount,
          date: day.date,
          level: LEVELS[day.contributionLevel] ?? 0,
        }))
      ),
    };
  } catch {
    return null;
  }
}
