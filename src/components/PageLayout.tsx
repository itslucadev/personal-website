"use client";

import { motion } from "framer-motion";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { Badge } from "@/components/ui/badge";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const fadeMotion = {
  animate: { opacity: 1, y: 0 },
  initial: { opacity: 0, y: 20 },
} as const;

function FadeIn({
  as: Tag = "div",
  children,
  className,
  delay = 0,
}: {
  as?: "div" | "p" | "h1" | "h2";
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const Component = motion[Tag];

  return (
    <Component
      animate={fadeMotion.animate}
      className={className}
      initial={fadeMotion.initial}
      transition={{ delay, duration: 0.5, ease }}
    >
      {children}
    </Component>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Logo />
      <main className="flex-1">{children}</main>
      <Footer width="narrow" />
    </div>
  );
}

export function PageHero({
  description,
  title,
}: {
  description: ReactNode;
  title: ReactNode;
}) {
  return (
    <section className="px-4 pt-20 pb-12 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <FadeIn
          as="h1"
          className="mb-4 text-center font-bold text-2xl leading-tight tracking-tight sm:text-[28px]"
          delay={0.2}
        >
          {title}
        </FadeIn>
        <FadeIn
          as="p"
          className="mx-auto mb-6 max-w-lg text-center text-muted-foreground text-sm leading-relaxed"
          delay={0.3}
        >
          {description}
        </FadeIn>
      </div>
    </section>
  );
}

export function PageSection({
  children,
  delay,
  description,
  title,
}: {
  children: ReactNode;
  delay: number;
  description: ReactNode;
  title: string;
}) {
  return (
    <section className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <FadeIn
          as="h2"
          className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-wider"
          delay={delay}
        >
          {title}
        </FadeIn>
        <FadeIn
          as="p"
          className="mb-5 text-foreground text-sm"
          delay={delay + 0.03}
        >
          {description}
        </FadeIn>
        {children}
      </div>
    </section>
  );
}

interface CaseStudyMeta {
  icon: LucideIcon;
  label: string;
}

export function CaseStudyLayout({
  backHref,
  backLabel,
  children,
  description,
  header,
  headerClassName,
  meta,
  stack,
}: {
  backHref: string;
  backLabel: string;
  children: ReactNode;
  description: ReactNode;
  header: ReactNode;
  headerClassName?: string;
  meta: CaseStudyMeta[];
  stack: string[];
}) {
  return (
    <PageShell>
      <section className="px-4 pt-20 pb-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <FadeIn delay={0.15}>
            <Link
              className="group mb-6 inline-flex items-center gap-1.5 text-muted-foreground text-xs transition-colors duration-200 hover:text-foreground"
              href={backHref}
            >
              <ArrowLeft className="h-3 w-3 transition-transform duration-200 group-hover:-translate-x-0.5" />
              {backLabel}
            </Link>
          </FadeIn>

          <FadeIn className={cn("mb-3", headerClassName)} delay={0.2}>
            {header}
          </FadeIn>

          <FadeIn
            className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-muted-foreground text-xs"
            delay={0.25}
          >
            {meta.map(({ icon: Icon, label }) => (
              <span className="inline-flex items-center gap-1.5" key={label}>
                <Icon className="h-3 w-3" />
                {label}
              </span>
            ))}
          </FadeIn>

          <FadeIn
            as="p"
            className="mb-5 text-foreground text-sm leading-relaxed"
            delay={0.3}
          >
            {description}
          </FadeIn>

          <FadeIn className="mb-6 flex flex-wrap gap-1.5" delay={0.35}>
            {stack.map((tech) => (
              <Badge
                className="h-6 bg-secondary/50 px-2 py-0 font-normal text-[11px]"
                key={tech}
                variant="secondary"
              >
                {tech}
              </Badge>
            ))}
          </FadeIn>

          {children}
        </div>
      </section>
    </PageShell>
  );
}
