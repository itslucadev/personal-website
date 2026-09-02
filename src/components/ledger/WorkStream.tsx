"use client";

import type { WorkEntry as WorkEntryModel } from "@/lib/work";
import { WorkEntry } from "./WorkEntry";

export function WorkStream({
  entries,
  heading,
  id,
}: {
  entries: WorkEntryModel[];
  heading: string;
  id: string;
}) {
  return (
    <section aria-labelledby={`${id}-heading`} className="scroll-mt-24" id={id}>
      <h2
        className="mb-8 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.12em]"
        id={`${id}-heading`}
      >
        {heading}
      </h2>
      <div className="divide-y divide-[#DCE2EA]">
        {entries.map((entry) => (
          <div className="py-10 first:pt-0 last:pb-0" key={entry.slug}>
            <WorkEntry entry={entry} />
          </div>
        ))}
      </div>
    </section>
  );
}
