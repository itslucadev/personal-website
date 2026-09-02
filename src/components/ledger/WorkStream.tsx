"use client";

import { workEntries } from "@/lib/work";
import { WorkEntry } from "./WorkEntry";

export function WorkStream() {
  return (
    <section aria-labelledby="work-heading" className="scroll-mt-24" id="work">
      <h2
        className="mb-8 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.12em]"
        id="work-heading"
      >
        Selected work
      </h2>
      <div className="divide-y divide-[#DCE2EA]">
        {workEntries.map((entry) => (
          <div className="py-10 first:pt-0 last:pb-0" key={entry.slug}>
            <WorkEntry entry={entry} />
          </div>
        ))}
      </div>
    </section>
  );
}
