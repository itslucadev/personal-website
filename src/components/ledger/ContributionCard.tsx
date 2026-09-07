"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import type { ContributionCalendar } from "@/lib/github";
import { cn } from "@/lib/utils";
import { ContributionScene, type Layout } from "./ContributionScene";
import { FILL, LEVELS } from "./contributions";

const LAYOUTS: { label: string; value: Layout }[] = [
  { label: "Flat", value: "flat" },
  { label: "3D", value: "iso" },
];

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2";

function LayoutSwitch({
  value,
  onChange,
}: {
  value: Layout;
  onChange: (layout: Layout) => void;
}) {
  const reducedMotion = Boolean(useReducedMotion());
  const pillId = useId();

  return (
    <fieldset className="inline-flex items-center rounded-full border border-[#DCE2EA] bg-white p-[3px]">
      <legend className="sr-only">Contribution graph layout</legend>
      {LAYOUTS.map((layout) => {
        const selected = layout.value === value;
        return (
          <button
            aria-pressed={selected}
            className={cn(
              "relative rounded-full px-2.5 py-1 font-mono text-[10px] uppercase leading-none tracking-[0.12em] transition-colors",
              selected
                ? "text-white"
                : "text-muted-foreground hover:text-foreground",
              FOCUS
            )}
            key={layout.value}
            onClick={() => onChange(layout.value)}
            type="button"
          >
            {selected ? (
              <motion.span
                className="absolute inset-0 rounded-full bg-amber-600"
                layoutId={pillId}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { type: "spring", bounce: 0.3, duration: 0.6 }
                }
              />
            ) : null}
            <span className="relative block">{layout.label}</span>
          </button>
        );
      })}
    </fieldset>
  );
}

/** The colour scale, in the same buckets GitHub uses. */
function LevelScale() {
  return (
    <p aria-hidden className="flex items-center gap-1">
      Less
      {LEVELS.map((level) => (
        <span
          className="inline-block size-[10px] rounded-[2px]"
          key={level}
          style={{ backgroundColor: FILL[level] }}
        />
      ))}
      More
    </p>
  );
}

/**
 * The calendar and the row beneath it. Client-side because the layout switch
 * and the scene share one piece of state, which keeps the fetch itself on the
 * server component that renders this one.
 */
export function ContributionCard({
  calendar,
}: {
  calendar: ContributionCalendar;
}) {
  const [layout, setLayout] = useState<Layout>("flat");

  return (
    <div className="rounded-[8px] border border-[#DCE2EA] bg-white p-4">
      <ContributionScene layout={layout} weeks={calendar.weeks} />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 font-sans text-muted-foreground text-xs">
        <p>
          <span className="font-medium text-foreground">
            {calendar.total.toLocaleString("en-US")}
          </span>{" "}
          contributions in the last year
        </p>
        <div className="flex items-center gap-3">
          <LevelScale />
          <LayoutSwitch onChange={setLayout} value={layout} />
        </div>
      </div>
    </div>
  );
}
