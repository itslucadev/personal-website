"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

type Lang = "en" | "de";

const RESUMES: Record<Lang, { file: string; label: string }> = {
  en: { file: "/resume/luca-becker-en.pdf", label: "English" },
  de: { file: "/resume/luca-becker-de.pdf", label: "German" },
};

const LANGS: Lang[] = ["en", "de"];

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

function LanguageSwitch({
  value,
  onChange,
  reducedMotion,
}: {
  value: Lang;
  onChange: (lang: Lang) => void;
  reducedMotion: boolean;
}) {
  const filterId = useId();
  const groupName = useId();

  return (
    <fieldset className="relative inline-flex h-9 rounded-full border border-[#DCE2EA] bg-white p-1">
      <legend className="sr-only">Resume language</legend>
      {reducedMotion ? null : (
        <svg aria-hidden="true" className="absolute h-0 w-0">
          <defs>
            <filter id={filterId}>
              <feGaussianBlur
                in="SourceGraphic"
                result="blur"
                stdDeviation="4"
              />
              <feColorMatrix
                in="blur"
                result="goo"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-1 grid grid-cols-2"
        style={reducedMotion ? undefined : { filter: `url(#${filterId})` }}
      >
        {/* Lead blob: moves first. Trail blob: follows, so the goo filter
            stretches the two into one liquid pill mid-transition. */}
        <motion.span
          animate={{ x: value === "en" ? "0%" : "100%" }}
          className="col-start-1 row-start-1 rounded-full bg-amber-600"
          initial={false}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 420, damping: 28 }
          }
        />
        <motion.span
          animate={{ x: value === "en" ? "0%" : "100%" }}
          className="col-start-1 row-start-1 rounded-full bg-amber-600"
          initial={false}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 140, damping: 20 }
          }
        />
      </div>
      <motion.span
        animate={{
          boxShadow: [
            "0 0 0px 0px rgba(217,119,6,0)",
            "0 0 22px 4px rgba(217,119,6,0.45)",
            "0 0 0px 0px rgba(217,119,6,0)",
          ],
        }}
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        initial={false}
        key={value}
        transition={
          reducedMotion ? { duration: 0 } : { duration: 0.7, ease: EASE }
        }
      />

      {LANGS.map((lang) => {
        const checked = lang === value;
        return (
          <label
            className={cn(
              "relative z-10 flex w-14 cursor-pointer items-center justify-center rounded-full font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-amber-600 has-[:focus-visible]:ring-offset-2",
              checked
                ? "text-white"
                : "text-muted-foreground hover:text-foreground"
            )}
            key={lang}
          >
            <input
              checked={checked}
              className="sr-only"
              name={groupName}
              onChange={() => onChange(lang)}
              type="radio"
              value={lang}
            />
            {lang}
          </label>
        );
      })}
    </fieldset>
  );
}

export function ResumePanel() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const reducedMotion = Boolean(useReducedMotion());
  const panelId = useId();
  const resume = RESUMES[lang];

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
        <div className="flex items-center gap-4">
          <LanguageSwitch
            onChange={setLang}
            reducedMotion={reducedMotion}
            value={lang}
          />
          <a
            className={cn(
              "inline-flex items-center gap-1.5 rounded-sm font-mono text-[11px] text-amber-600 uppercase tracking-[0.1em] transition-colors hover:text-amber-700",
              FOCUS
            )}
            download
            href={resume.file}
          >
            <Download aria-hidden className="size-3.5" />
            Download PDF
          </a>
        </div>
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
            <div className="relative mt-6 aspect-[210/297] max-h-[760px] w-full overflow-hidden rounded-[8px] border border-[#DCE2EA] bg-[#F3F5F8]">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  className="absolute inset-0"
                  exit={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, filter: "blur(14px)", scale: 0.985 }
                  }
                  initial={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, filter: "blur(14px)", scale: 1.015 }
                  }
                  key={lang}
                  transition={
                    reducedMotion
                      ? { duration: 0.15 }
                      : { duration: 0.35, ease: EASE }
                  }
                >
                  <object
                    aria-label={`Resume, ${resume.label}`}
                    className="h-full w-full"
                    data={`${resume.file}#toolbar=0&view=FitH`}
                    type="application/pdf"
                  >
                    <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center font-sans text-muted-foreground text-sm">
                      <p>The PDF could not be shown inline.</p>
                      <a
                        className={cn(
                          "font-medium text-amber-600 hover:underline",
                          FOCUS
                        )}
                        href={resume.file}
                      >
                        Open the {resume.label} resume
                      </a>
                    </div>
                  </object>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
