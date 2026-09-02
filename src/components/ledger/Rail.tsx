"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

const RAIL_INTRO_KEY = "lb:rail-intro";
const ONE_LINER = "Native Mac tools and web apps for small teams.";

const FOCUS =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2";

let railIntroChecked = false;
let railIntroShouldEnable = false;

export function Rail() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>("work");
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
          "font-mono text-muted-foreground text-xs transition-colors hover:text-foreground",
          FOCUS
        )}
        href="/"
      >
        {"// LB"}
      </Link>

      <h1 className="mt-6 font-serif text-[40px] text-foreground leading-none">
        Luca Becker
      </h1>

      <p className="mt-4 font-medium font-sans text-foreground">
        Fullstack developer, Fürth
      </p>

      <p className="mt-3 max-w-[28ch] font-sans text-muted-foreground">
        <TextGenerateEffect enabled={introEnabled} words={ONE_LINER} />
      </p>

      <div className="mt-5 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute -inset-2 animate-pulse-glow rounded-full bg-green-400/20 blur-sm" />
          <span className="absolute -inset-1 animate-pulse-glow rounded-full bg-green-400/30 blur-[2px] delay-75" />
          <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-green-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
        </span>
        <span className="font-sans text-muted-foreground text-xs">
          Available for freelance and projects
        </span>
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
                    "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                    FOCUS
                  )}
                  href={`#${section.id}`}
                >
                  <motion.span
                    animate={{ width: isActive ? 44 : 18 }}
                    aria-hidden
                    className={cn(
                      "hidden h-px shrink-0 lg:block",
                      isActive ? "bg-amber-600" : "bg-[#5F6B7A]"
                    )}
                    initial={false}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                    }
                  />
                  {section.label}
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
