"use client";

import { Download } from "lucide-react";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { ConfidentialFolder } from "@/components/ui/confidential-folder";
import pages from "@/lib/resume-pages.json";
import { cn } from "@/lib/utils";

type Lang = "en" | "de";

const RESUMES: Record<Lang, { file: string; label: string; download: string }> =
  {
    en: {
      file: "/main_en.pdf",
      label: "English",
      download: "Luca Becker - Resume.pdf",
    },
    de: {
      file: "/main_de.pdf",
      label: "German",
      download: "Luca Becker - Lebenslauf.pdf",
    },
  };

const FOCUS =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2";

/** The folder's own design size. It stays an object, not a full-column panel. */
const FOLDER_WIDTH = 280;
const FOLDER_RATIO = 400 / 320;

function ResumeSheets({ lang }: { lang: Lang }) {
  const resume = RESUMES[lang];

  return (
    <div className="h-full overflow-y-auto overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {pages[lang].map((page, index) => (
        <Image
          alt={`${resume.label} resume, page ${index + 1} of ${pages[lang].length}`}
          className={cn(
            "block h-auto w-full",
            index > 0 && "border-border border-t"
          )}
          height={page.height}
          key={page.src}
          loading="eager"
          sizes="280px"
          src={page.src}
          width={page.width}
        />
      ))}
    </div>
  );
}

export function Resume() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(320);
  const [lang, setLang] = useState<Lang>("en");
  const resume = RESUMES[lang];

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) {
      return;
    }

    const measure = () => {
      const next = Math.min(FOLDER_WIDTH, Math.round(frame.clientWidth));
      if (next > 0) {
        setWidth(next);
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="resume-heading"
      className="scroll-mt-24"
      id="resume"
    >
      <h2
        className="mb-6 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.12em]"
        id="resume-heading"
      >
        Resume
      </h2>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {(Object.keys(RESUMES) as Lang[]).map((value) => {
          const selected = value === lang;
          return (
            <button
              aria-pressed={selected}
              className={cn(
                "font-mono text-[11px] uppercase tracking-[0.12em] transition-colors",
                selected
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
                FOCUS
              )}
              key={value}
              onClick={() => setLang(value)}
              type="button"
            >
              {RESUMES[value].label}
            </button>
          );
        })}
        <a
          className={cn(
            "inline-flex items-center gap-1.5 font-mono text-[11px] text-amber-600 uppercase tracking-[0.1em] transition-colors hover:text-amber-700",
            FOCUS
          )}
          download={resume.download}
          href={resume.file}
        >
          <Download aria-hidden className="size-3.5" />
          Download PDF
        </a>
      </div>
      <div className="mt-8 w-full max-w-[280px]" ref={frameRef}>
        <ConfidentialFolder
          badge={lang.toUpperCase()}
          className="w-full items-start"
          height={Math.round(width * FOLDER_RATIO)}
          letterBack={<ResumeSheets lang={lang} />}
          letterFront={<ResumeSheets lang={lang} />}
          stage={false}
          subtitle="Luca Becker"
          title="Resume"
          width={width}
        />
      </div>
    </section>
  );
}
