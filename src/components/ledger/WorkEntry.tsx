"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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

type Action = WorkEntryModel["actions"][number];

function anchorProps(action: Action) {
  return action.external
    ? { rel: "noopener noreferrer", target: "_blank" }
    : {};
}

/** Filled pill, sized to sit beside Apple's 40px badge. */
function PrimaryAction({ action }: { action: Action }) {
  const className = cn(
    "inline-flex h-10 items-center rounded-full bg-foreground px-5 font-medium font-sans text-background text-sm transition-colors hover:bg-amber-600",
    FOCUS
  );
  if (action.external) {
    return (
      <a className={className} href={action.href} {...anchorProps(action)}>
        {action.label}
      </a>
    );
  }
  return (
    <Link className={className} href={action.href}>
      {action.label}
    </Link>
  );
}

function TextAction({ action }: { action: Action }) {
  const className = cn(
    "font-mono text-[11px] text-amber-600 uppercase tracking-[0.1em] transition-colors hover:text-amber-700",
    FOCUS
  );
  const label = `${action.label} →`;
  if (action.external) {
    return (
      <a className={className} href={action.href} {...anchorProps(action)}>
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

/**
 * Apple's badge, used only for links that lead to the App Store, at the 40px
 * minimum height and with the quarter-height clear space the guidelines ask
 * for. Never animated.
 */
function AppStoreBadge({ href, title }: { href: string; title: string }) {
  return (
    <a
      aria-label={`Download ${title} on the App Store`}
      className={cn("inline-flex p-2.5", FOCUS)}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Image
        alt=""
        height={40}
        src="/badges/app-store-badge.svg"
        unoptimized
        width={120}
      />
    </a>
  );
}

function Actions({ entry }: { entry: WorkEntryModel }) {
  const primary = entry.actions.filter((action) => action.primary);
  const secondary = entry.actions.filter((action) => !action.primary);
  const hasButtons = Boolean(entry.appStore) || primary.length > 0;

  if (!(hasButtons || secondary.length > 0)) {
    return entry.kind === "private" ? (
      <p className="mt-5 font-mono text-[11px] text-muted-foreground">
        Private client work, no public link.
      </p>
    ) : null;
  }

  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
      {entry.appStore ? (
        <span className="-m-2.5">
          <AppStoreBadge href={entry.appStore} title={entry.title} />
        </span>
      ) : null}
      {primary.map((action) => (
        <PrimaryAction action={action} key={action.label} />
      ))}
      {secondary.map((action) => (
        <TextAction action={action} key={action.label} />
      ))}
    </div>
  );
}

export function WorkEntry({ entry }: { entry: WorkEntryModel }) {
  const reduceMotion = useReducedMotion();
  const metaParts = [entry.year, ...entry.stack].filter(Boolean);

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

      <h3 className="mt-3 flex items-center gap-3 font-serif text-[30px] text-foreground leading-tight">
        {entry.logo ? (
          <Image
            alt=""
            className="size-7 shrink-0 rounded-[6px] object-contain"
            height={28}
            src={entry.logo}
            width={28}
          />
        ) : null}
        {entry.title}
      </h3>

      <p className="mt-3 max-w-[48ch] font-serif text-[17px] text-muted-foreground italic">
        {entry.dek}
      </p>

      {entry.image ? (
        <div className="mt-6 overflow-hidden rounded-[8px] border border-[#DCE2EA] bg-[#F3F5F8]">
          <Image
            alt={entry.image.alt}
            className="block h-auto w-full"
            height={entry.image.height}
            sizes="(min-width: 1024px) 700px, 100vw"
            src={entry.image.src}
            width={entry.image.width}
          />
        </div>
      ) : null}

      <Actions entry={entry} />
    </motion.article>
  );
}
