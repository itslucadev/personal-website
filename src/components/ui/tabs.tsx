"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode, useId, useState } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  content: ReactNode;
  title: string;
  value: string;
}

/**
 * Aceternity tabs: a spring-animated pill that slides between tab labels,
 * and the tab contents stacked as cards behind each other. Hovering the tab
 * bar fans the stack out; selecting a tab brings its card to the front with a
 * bounce. Ported to framer-motion, controlled via `value` + `onChange`.
 */
export function Tabs({
  tabs,
  value,
  onChange,
  label,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) {
  const [hovering, setHovering] = useState(false);
  const reducedMotion = Boolean(useReducedMotion());
  const pillId = useId();
  const active = tabs.find((tab) => tab.value === value) ?? tabs[0];
  const ordered = [active, ...tabs.filter((tab) => tab !== active)];

  return (
    <>
      <div
        aria-label={label}
        className={cn(
          "relative flex flex-row items-center [perspective:1000px]",
          containerClassName
        )}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        role="tablist"
      >
        {tabs.map((tab) => {
          const selected = tab.value === active.value;
          return (
            <button
              aria-selected={selected}
              className={cn(
                "relative rounded-full px-4 py-2 [transform-style:preserve-3d]",
                tabClassName
              )}
              key={tab.value}
              onClick={() => onChange(tab.value)}
              role="tab"
              type="button"
            >
              {selected ? (
                <motion.div
                  className={cn(
                    "absolute inset-0 rounded-full bg-gray-200",
                    activeTabClassName
                  )}
                  layoutId={pillId}
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : { type: "spring", bounce: 0.3, duration: 0.6 }
                  }
                />
              ) : null}
              <span className="relative block">{tab.title}</span>
            </button>
          );
        })}
      </div>
      <div className={cn("relative h-full w-full", contentClassName)}>
        {ordered.map((tab, idx) => {
          const front = idx === 0;
          return (
            <motion.div
              animate={{
                y: front && !reducedMotion ? [0, 40, 0] : 0,
                scale: 1 - idx * 0.1,
                top: hovering && !reducedMotion ? idx * -50 : 0,
                opacity: 1 - idx * 0.1,
              }}
              aria-hidden={!front}
              className="absolute top-0 left-0 h-full w-full"
              key={tab.value}
              layoutId={`${pillId}-${tab.value}`}
              style={{ zIndex: tabs.length - idx }}
              transition={reducedMotion ? { duration: 0 } : undefined}
            >
              {tab.content}
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
