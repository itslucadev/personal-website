import { fetchContributionCalendar } from "@/lib/github";
import { ContributionCard } from "./ContributionCard";

/**
 * A year of GitHub contributions. Fetches its own calendar, so nothing above
 * it has to know where the data comes from; the card below is the only part
 * that has to run on the client, because the layout switch holds state.
 */
export async function GitHubContribution() {
  const calendar = await fetchContributionCalendar();

  return (
    <div className="mt-10 max-w-[720px]">
      <p className="mb-3 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.12em]">
        GitHub activity
      </p>
      {calendar ? (
        <ContributionCard calendar={calendar} />
      ) : (
        <p className="font-sans text-muted-foreground text-sm">
          Contribution graph unavailable right now. See the profile on GitHub.
        </p>
      )}
    </div>
  );
}
