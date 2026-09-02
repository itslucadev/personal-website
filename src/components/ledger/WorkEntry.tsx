"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { type PointerEvent, type ReactNode, useState } from "react";
import { DotBloom } from "@/components/ui/dot-bloom";
import { Lens } from "@/components/ui/lens";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { cn } from "@/lib/utils";
import type { WorkEntry as WorkEntryModel, WorkKind } from "@/lib/work";

const FOCUS =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2";

const KIND_LABEL: Record<WorkKind, string> = {
  product: "Product",
  client: "Client",
  "in-development": "In development",
  private: "Private",
};

const KIND_CHIP: Record<WorkKind, string> = {
  product: "bg-[#DBEAFE] text-[#1E40AF]",
  client: "bg-[#DCFCE7] text-[#166534]",
  "in-development": "bg-[#FEF3C7] text-[#92400E]",
  private: "bg-[#EEF0F3] text-[#5F6B7A]",
};

function Dek({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight) {
    return text;
  }
  const index = text.indexOf(highlight);
  if (index === -1) {
    return text;
  }
  return (
    <>
      {text.slice(0, index)}
      <PointerHighlight label="Luca">{highlight}</PointerHighlight>
      {text.slice(index + highlight.length)}
    </>
  );
}

function WorkMat({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);

  function updateOrigin(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setOrigin({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  }

  return (
    <div
      className="relative rounded-[6px] border border-[#DCE2EA] p-7 sm:p-9"
      onPointerEnter={(event) => {
        if (reduceMotion) {
          return;
        }
        updateOrigin(event);
        setActive(true);
      }}
      onPointerLeave={() => setActive(false)}
      onPointerMove={reduceMotion ? undefined : updateOrigin}
      style={{
        backgroundColor: "#F3F5F8",
        backgroundImage: "radial-gradient(#C9D0DA 1.1px, transparent 1.3px)",
        backgroundSize: "12px 12px",
      }}
    >
      <DotBloom
        active={!reduceMotion && active}
        className="absolute inset-0"
        origin={origin}
      />
      <div className="relative z-10 flex justify-center">{children}</div>
    </div>
  );
}

function ActionLink({ action }: { action: WorkEntryModel["actions"][number] }) {
  const className = cn(
    "font-mono text-[11px] text-amber-600 uppercase tracking-[0.1em] transition-colors hover:text-amber-700",
    FOCUS
  );
  const label = `${action.label} →`;

  if (action.external) {
    return (
      <a
        className={className}
        href={action.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {label}
      </a>
    );
  }

  return (
    <Link className={className} href={action.href}>
      {label}
    </Link>
  );
}

function WorkVisual({ entry }: { entry: WorkEntryModel }) {
  if (entry.image) {
    return (
      <div className="mt-6">
        <WorkMat>
          <Lens>
            <Image
              alt={entry.image.alt}
              className="h-auto w-full rounded-[4px] shadow-md"
              height={entry.image.height}
              src={entry.image.src}
              width={entry.image.width}
            />
          </Lens>
        </WorkMat>
      </div>
    );
  }
  if (entry.logo) {
    return (
      <div className="mt-6">
        <WorkMat>
          <Lens>
            <Image
              alt={`${entry.title} logo`}
              className="size-16"
              height={64}
              src={entry.logo}
              width={64}
            />
          </Lens>
        </WorkMat>
      </div>
    );
  }
  return null;
}

export function WorkEntry({ entry }: { entry: WorkEntryModel }) {
  const reduceMotion = useReducedMotion();
  const metaParts = [entry.year, ...entry.stack].filter(Boolean);
  const actions = [...entry.actions].sort(
    (a, b) => Number(b.primary) - Number(a.primary)
  );

  return (
    <motion.article
      className="scroll-mt-24"
      id={entry.slug}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span
          className={cn(
            "inline-flex items-center rounded-[2px] px-1.5 py-0.5 font-mono text-[11px]",
            KIND_CHIP[entry.kind]
          )}
        >
          {KIND_LABEL[entry.kind]}
        </span>
        {metaParts.length > 0 ? (
          <span className="font-mono text-[11px] text-muted-foreground">
            {metaParts.join(" · ")}
          </span>
        ) : null}
      </div>

      <h3 className="mt-3 font-serif text-[30px] text-foreground leading-tight">
        {entry.title}
      </h3>

      <p className="mt-3 max-w-[48ch] font-serif text-[17px] text-muted-foreground italic">
        <Dek highlight={entry.highlight} text={entry.dek} />
      </p>

      <WorkVisual entry={entry} />

      {actions.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
          {actions.map((action) => (
            <ActionLink action={action} key={action.label} />
          ))}
        </div>
      ) : null}
      {actions.length === 0 && entry.kind === "private" ? (
        <p className="mt-5 font-mono text-[11px] text-muted-foreground">
          Private client work, no public link.
        </p>
      ) : null}
    </motion.article>
  );
}
