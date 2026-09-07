"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { stack } from "@/lib/stack";
import { cn } from "@/lib/utils";

const STACK_ITEMS = stack.map((item) => ({
  id: item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  name: item.name,
  designation: item.description,
  image: item.icon,
  href: item.url,
}));

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "client-work", label: "Client work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

const RAIL_INTRO_KEY = "lb:rail-intro";
const ONE_LINER =
  "Apps in React Native and Swift, with the backend and web to go with them.";

const FOCUS =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2";

let railIntroChecked = false;
let railIntroShouldEnable = false;

export function Rail() {
  const [activeId, setActiveId] = useState<string>("about");
  const [introEnabled, setIntroEnabled] = useState(false);
  const visibleIds = useRef(new Set<string>());

  useEffect(() => {
    if (!railIntroChecked) {
      railIntroChecked = true;
      railIntroShouldEnable = !sessionStorage.getItem(RAIL_INTRO_KEY);
      if (railIntroShouldEnable) {
        sessionStorage.setItem(RAIL_INTRO_KEY, "1");
      }
    }
    setIntroEnabled(railIntroShouldEnable);
  }, []);

  useEffect(() => {
    const ids = SECTIONS.map((section) => section.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleIds.current.add(entry.target.id);
          } else {
            visibleIds.current.delete(entry.target.id);
          }
        }
        const next = ids.find((id) => visibleIds.current.has(id));
        if (next) {
          setActiveId(next);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="flex flex-col py-10 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
      <Link
        className={cn(
          "w-fit font-bold font-mono text-foreground text-sm tracking-tight transition-opacity hover:opacity-80",
          FOCUS
        )}
        href="/"
      >
        <span className="text-amber-600">{"//"}</span> LB
      </Link>

      <h1 className="mt-6 font-hand text-[46px] text-foreground leading-none">
        Luca Becker
      </h1>

      <p className="mt-4 font-medium font-sans text-foreground">
        Mobile developer, Nuremberg
      </p>

      <p className="mt-3 max-w-[30ch] font-sans text-muted-foreground">
        <TextGenerateEffect enabled={introEnabled} words={ONE_LINER} />
      </p>

      <div className="mt-8">
        <p className="mb-3 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.12em]">
          Stack
        </p>
        <AnimatedTooltip className="max-w-[22rem]" items={STACK_ITEMS} />
      </div>

      <nav aria-label="Sections" className="mt-8 lg:mt-10">
        <ul className="flex flex-row flex-wrap gap-x-5 gap-y-2 lg:flex-col lg:gap-3">
          {SECTIONS.map((section) => {
            const isActive = activeId === section.id;
            return (
              <li key={section.id}>
                <a
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-200",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                    FOCUS
                  )}
                  href={`#${section.id}`}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "hidden h-px shrink-0 transition-[width,background-color] duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] motion-reduce:transition-none lg:block",
                      isActive
                        ? "w-11 bg-amber-600"
                        : "w-[18px] bg-[#5F6B7A] group-hover:w-8 group-hover:bg-amber-600"
                    )}
                  />
                  <span className="transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
                    {section.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-8 flex flex-col gap-3 lg:mt-auto lg:pb-2">
        <div className="flex flex-wrap gap-x-4 gap-y-1 font-sans text-sm">
          <a
            className={cn(
              "text-foreground transition-colors hover:text-amber-600",
              FOCUS
            )}
            href="https://cal.eu/lucabecker"
            rel="noopener noreferrer"
            target="_blank"
          >
            Book a call
          </a>
          <Link
            className={cn(
              "text-foreground transition-colors hover:text-amber-600",
              FOCUS
            )}
            href="/contact"
          >
            Email
          </Link>
        </div>
        <p className="font-mono text-muted-foreground text-xs">
          <a
            className={cn("transition-colors hover:text-foreground", FOCUS)}
            href="https://github.com/itslucadev"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          {" · "}
          <a
            className={cn("transition-colors hover:text-foreground", FOCUS)}
            href="https://x.com/itslucadev"
            rel="noopener noreferrer"
            target="_blank"
          >
            X
          </a>
          {" · "}
          <a
            className={cn("transition-colors hover:text-foreground", FOCUS)}
            href="https://www.linkedin.com/in/luca-becker-10a736231/"
            rel="noopener noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </aside>
  );
}
