"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";
import { useId, useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Lang = "en" | "de";

const RESUMES: Record<Lang, { file: string; label: string }> = {
  en: { file: "/resume/luca-becker-en.pdf", label: "English" },
  de: { file: "/resume/luca-becker-de.pdf", label: "German" },
};

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

function ResumeSheet({ lang }: { lang: Lang }) {
  const resume = RESUMES[lang];
  return (
    <object
      aria-label={`Resume, ${resume.label}`}
      className="h-full w-full overflow-hidden rounded-[8px] border border-[#DCE2EA] bg-white shadow-[0_18px_40px_-24px_rgba(20,24,31,0.35)]"
      data={`${resume.file}#toolbar=0&view=FitH`}
      type="application/pdf"
    >
      <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center font-sans text-muted-foreground text-sm">
        <p>The PDF could not be shown inline.</p>
        <a
          className={cn("font-medium text-amber-600 hover:underline", FOCUS)}
          href={resume.file}
        >
          Open the {resume.label} resume
        </a>
      </div>
    </object>
  );
}

const TABS = (["en", "de"] as Lang[]).map((lang) => ({
  title: lang.toUpperCase(),
  value: lang,
  content: <ResumeSheet lang={lang} />,
}));

export function ResumePanel() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const reducedMotion = Boolean(useReducedMotion());
  const panelId = useId();

  return (
    <div className="mt-8 border-[#DCE2EA] border-t pt-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          aria-controls={panelId}
          aria-expanded={open}
          className={cn(
            "group inline-flex items-center gap-2 rounded-sm font-medium font-sans text-base text-foreground transition-colors hover:text-amber-600",
            FOCUS
          )}
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          Resume
          <ChevronDown
            aria-hidden
            className={cn(
              "size-4 transition-transform duration-300 motion-reduce:transition-none",
              open ? "rotate-180" : "group-hover:translate-y-0.5"
            )}
          />
        </button>
        <a
          className={cn(
            "inline-flex items-center gap-1.5 rounded-sm font-mono text-[11px] text-amber-600 uppercase tracking-[0.1em] transition-colors hover:text-amber-700",
            FOCUS
          )}
          download
          href={RESUMES[lang].file}
        >
          <Download aria-hidden className="size-3.5" />
          Download PDF
        </a>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            id={panelId}
            initial={reducedMotion ? false : { height: 0, opacity: 0 }}
            transition={
              reducedMotion ? { duration: 0 } : { duration: 0.45, ease: EASE }
            }
          >
            <div className="pt-6">
              <Tabs
                activeTabClassName="bg-amber-600"
                containerClassName="w-fit rounded-full border border-[#DCE2EA] bg-white p-1"
                contentClassName="mt-16 aspect-[210/297] max-h-[760px] [perspective:1000px]"
                label="Resume language"
                onChange={(value) => setLang(value as Lang)}
                tabClassName={cn(
                  "w-14 px-0 py-1.5 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.12em] transition-colors duration-300 hover:text-foreground aria-selected:text-white",
                  FOCUS
                )}
                tabs={TABS}
                value={lang}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
