"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Folder } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  /** Stagger offset so cards slot into the section's place in the page cascade. */
  baseDelay: number;
  description: string;
  index: number;
  link?: string;
  logo?: string;
  status: "In Development" | "Active" | "Ongoing" | "Sold" | "Live";
  title: string;
}

// Shared between statuses that are meant to read identically - keep them in sync.
const emeraldStatus = {
  bg: "bg-gradient-to-r from-emerald-500/20 to-green-400/20",
  text: "text-emerald-700 dark:text-emerald-300",
  border: "border-emerald-400/30",
};

const amberStatus = {
  bg: "bg-gradient-to-r from-amber-500/20 to-orange-400/20",
  text: "text-amber-700 dark:text-amber-300",
  border: "border-amber-400/30",
};

const statusStyles = {
  "In Development": {
    bg: "bg-gradient-to-r from-blue-500/20 to-cyan-400/20",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-400/30",
  },
  Active: emeraldStatus,
  Ongoing: amberStatus,
  Sold: amberStatus,
  Live: emeraldStatus,
};

export function ProjectCard({
  title,
  description,
  status,
  link,
  logo,
  index,
  baseDelay,
}: ProjectCardProps) {
  const statusStyle = statusStyles[status];
  const href = link && link !== "#" ? link : undefined;
  const isInternal = href?.startsWith("/") ?? false;

  const CardContent = (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={`group relative h-full rounded-lg border border-border bg-card p-5 transition-colors duration-200 hover:border-foreground/20 ${href ? "cursor-pointer" : "cursor-default"}`}
      initial={{ opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: baseDelay + index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -2 }}
    >
      <div className="mb-2 flex items-start gap-3">
        {logo ? (
          <Image
            alt=""
            /* Decorative: the title next to it already names the project. */
            className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-md object-contain"
            height={20}
            src={logo}
            width={20}
          />
        ) : (
          <Folder className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-medium text-foreground text-sm">{title}</h3>
            <span
              className={`inline-flex items-center rounded border px-2 py-0.5 font-medium text-[11px] ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
            >
              <span className="flex items-center gap-0 transition-all duration-200 group-hover:gap-1">
                {status.toLowerCase()}
                {href &&
                  (isInternal ? (
                    <ArrowRight className="h-3 w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:w-3 group-hover:opacity-100" />
                  ) : (
                    <ExternalLink className="h-3 w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:w-3 group-hover:opacity-100" />
                  ))}
              </span>
            </span>
          </div>
        </div>
      </div>
      <p className="pl-8 text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );

  if (!href) {
    return CardContent;
  }

  if (isInternal) {
    return (
      <Link className="block h-full" href={href}>
        {CardContent}
      </Link>
    );
  }

  return (
    <a
      className="block h-full"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {CardContent}
    </a>
  );
}
