'use client';

import { Download } from 'lucide-react';
import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';

import { ConfidentialFolder } from '@/components/ui/confidential-folder';
import pages from '@/lib/resume-pages.json';
import { cn } from '@/lib/utils';

type Lang = 'en' | 'de';

const RESUMES: Record<Lang, { file: string; label: string; download: string }> = {
  en: {
    file: '/main_en.pdf',
    label: 'English',
    download: 'Luca Becker - Resume.pdf',
  },
  de: {
    file: '/main_de.pdf',
    label: 'German',
    download: 'Luca Becker - Lebenslauf.pdf',
  },
};

const FOCUS =
  'rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2';

/** Card size. Larger than the tucked 280px version, still an object in the column. */
const FOLDER_WIDTH = 460;
const FOLDER_RATIO = 400 / 320;

function pageFromScroll(element: HTMLElement, total: number) {
  const pageHeight = element.scrollHeight / total;
  if (pageHeight <= 0) {
    return 1;
  }
  const index = Math.floor((element.scrollTop + pageHeight * 0.25) / pageHeight);
  return Math.min(total, Math.max(1, index + 1));
}

function LetterCover() {
  return (
    <div className="flex h-full flex-col overflow-hidden px-6 py-7 text-[oklch(0.32_0.02_95)]">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em]">Resume</p>
      <p className="mt-4 font-sans text-xl tracking-[-0.03em]">Luca Becker</p>
      <p className="mt-2 font-sans text-sm text-[oklch(0.45_0.02_95)]">Mobile developer</p>
      <p className="mt-auto font-mono text-[10px] uppercase tracking-[0.12em]">English · German</p>
    </div>
  );
}

function ResumeSheets({
  lang,
  open,
  onClose,
  width,
}: {
  lang: Lang;
  open: boolean;
  onClose: () => void;
  width: number;
}) {
  const resume = RESUMES[lang];
  const sheets = pages[lang];
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);

  const onScroll = () => {
    const element = scrollerRef.current;
    if (!element || !open) {
      return;
    }
    setPage(pageFromScroll(element, sheets.length));
  };

  return (
    <div className="relative h-full">
      {open ? (
        <button
          className={cn(
            'absolute right-2 top-2 z-10 bg-background/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground',
            FOCUS,
          )}
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          type="button"
        >
          Close
        </button>
      ) : null}
      <div
        aria-hidden={!open}
        aria-label={open ? `${resume.label} resume, page ${page} of ${sheets.length}` : undefined}
        className={cn(
          'h-full overscroll-contain',
          open
            ? 'overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
            : 'overflow-hidden',
        )}
        onScroll={open ? onScroll : undefined}
        ref={scrollerRef}
        role={open ? 'region' : undefined}
      >
        {sheets.map((sheet, index) => (
          <Image
            alt={`${resume.label} resume, page ${index + 1} of ${sheets.length}`}
            className={cn('block h-auto w-full', index > 0 && 'border-t border-border')}
            height={sheet.height}
            key={sheet.src}
            loading={index === 0 ? 'eager' : 'lazy'}
            sizes={`${width}px`}
            src={sheet.src}
            width={sheet.width}
          />
        ))}
      </div>
      {open ? (
        <p
          aria-hidden
          className="pointer-events-none absolute bottom-2 right-2 rounded-sm bg-background/90 px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-muted-foreground"
        >
          {page} / {sheets.length}
        </p>
      ) : null}
    </div>
  );
}

export function Resume() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(FOLDER_WIDTH);
  const [lang, setLang] = useState<Lang>('en');
  const [open, setOpen] = useState(false);
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
    <section aria-labelledby="resume-heading" className="scroll-mt-24 overflow-x-clip" id="resume">
      <h2 className="mb-6 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground" id="resume-heading">
        Resume
      </h2>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {(Object.keys(RESUMES) as Lang[]).map((value) => {
          const selected = value === lang;
          return (
            <button
              aria-pressed={selected}
              className={cn(
                'font-mono text-[11px] uppercase tracking-[0.12em] transition-colors',
                selected ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                FOCUS,
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
            'inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-amber-600 transition-colors hover:text-amber-700',
            FOCUS,
          )}
          download={resume.download}
          href={resume.file}
        >
          <Download aria-hidden className="size-3.5" />
          Download PDF
        </a>
      </div>
      <div className="mx-auto mt-8 w-full max-w-[460px] px-1 py-6" ref={frameRef}>
        <ConfidentialFolder
          badge={lang.toUpperCase()}
          className="w-full"
          height={Math.round(width * FOLDER_RATIO)}
          letterBack={<ResumeSheets key={lang} lang={lang} onClose={() => setOpen(false)} open={open} width={width} />}
          letterFront={<LetterCover />}
          onOpenChange={setOpen}
          open={open}
          stage={false}
          subtitle="Luca Becker"
          title="Resume"
          width={width}
        />
      </div>
    </section>
  );
}
