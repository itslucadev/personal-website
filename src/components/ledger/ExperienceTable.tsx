import { cn } from "@/lib/utils";
import { ResumePanel } from "./ResumePanel";

const FOCUS =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2";

const rows = [
  {
    period: "Apr 2025 – now",
    role: "Freelance software engineer",
    place: "Remote",
  },
  {
    period: "Jun 2021 – Apr 2025",
    role: (
      <>
        Werkstudent,{" "}
        <a
          className={cn("hover:underline", FOCUS)}
          href="https://www.datev.de"
          rel="noopener noreferrer"
          target="_blank"
        >
          DATEV eG
        </a>
      </>
    ),
    place: "Nuremberg",
  },
  {
    period: "Feb 2026",
    role: (
      <>
        B.Sc. Computer Science,{" "}
        <a
          className={cn("hover:underline", FOCUS)}
          href="https://www.fau.de"
          rel="noopener noreferrer"
          target="_blank"
        >
          FAU Erlangen-Nürnberg
        </a>
      </>
    ),
    place: "Erlangen",
  },
];

export function ExperienceTable() {
  return (
    <section
      aria-labelledby="experience-heading"
      className="scroll-mt-24"
      id="experience"
    >
      <h2
        className="mb-6 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.12em]"
        id="experience-heading"
      >
        Experience
      </h2>
      <table className="w-full table-fixed border-collapse text-left sm:table-auto">
        <caption className="sr-only">Experience</caption>
        <thead className="sr-only">
          <tr>
            <th>Period</th>
            <th>Role</th>
            <th>Place</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              className="border-[#DCE2EA] border-b last:border-b-0"
              key={row.period}
            >
              <td className="w-[7.5rem] py-4 pr-4 align-top font-mono text-muted-foreground text-sm sm:w-auto sm:whitespace-nowrap sm:pr-6">
                {row.period}
              </td>
              <td className="py-4 pr-4 align-top font-sans text-base text-foreground sm:pr-6">
                {row.role}
              </td>
              <td className="w-[5.5rem] py-4 align-top font-sans text-base text-muted-foreground sm:w-auto">
                {row.place}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ResumePanel />
    </section>
  );
}
