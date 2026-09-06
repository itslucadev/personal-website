import { fetchContributionCalendar, GITHUB_LOGIN } from "@/lib/github";
import { ContributionGraph } from "./ContributionGraph";

export async function GitHubActivity() {
  const calendar = await fetchContributionCalendar();

  return (
    <div className="mt-10 max-w-[720px]">
      <ContributionGraph calendar={calendar} login={GITHUB_LOGIN} />
    </div>
  );
}
