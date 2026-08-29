"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { homeCascade } from "@/lib/home-cascade";

const cascade = homeCascade("clientWork");

interface ClientProject {
  description: string;
  /** Internal detail page; omitted when the work itself is not public. */
  href?: string;
  /** Screenshot column; omitted when there are no shots to publish. */
  image?: { src: string; alt: string; width: number; height: number };
  logo?: string;
  stack: string[];
  title: string;
}

const clientWork: ClientProject[] = [
  {
    title: "BV Q-Club e.V.",
    description:
      "Designed and built the website and Sanity CMS for Fürth's pool billiard club - the board publishes updates itself, and tournament results sync in from Cuescore.",
    href: "/work/bv-q-club",
    logo: "/clients/logo-bv-q-club.png",
    stack: ["Next.js", "Sanity CMS", "Cuescore API"],
    image: {
      src: "/clients/bv-q-club-hero.webp",
      alt: "Homepage hero of bv-q-club.de: the words Q-CLUB FÜRTH set in a large display serif behind a rendered black 8-ball",
      width: 1440,
      height: 900,
    },
  },
  {
    title: "Zeiterfassung",
    description:
      "Built the internal time-tracking app for the on-site teams of a local cleaning business with React Native and Expo.",
    stack: ["React Native", "Expo", "TypeScript"],
  },
];

// Mirrors the "Live" status style in ProjectCard - keep them in sync.
const livePill =
  "bg-gradient-to-r from-emerald-500/20 to-green-400/20 text-emerald-700 dark:text-emerald-300 border-emerald-400/30";

function ClientCard({
  project,
  index,
}: {
  project: ClientProject;
  index: number;
}) {
  const card = (
    <motion.article
      animate={{ opacity: 1, y: 0 }}
      className={`group relative h-full overflow-hidden rounded-lg border border-border bg-card transition-colors duration-200 hover:border-foreground/20 ${project.href ? "cursor-pointer" : "cursor-default"}`}
      initial={{ opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: cascade.body + index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={project.href ? { y: -2 } : undefined}
    >
      <div className="flex h-full flex-col sm:flex-row">
        <div className="flex-1 p-5">
          <div className="mb-2 flex items-start gap-3">
            {project.logo ? (
              <Image
                alt=""
                /* Decorative: the title next to it already names the client. */
                className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-md object-contain"
                height={20}
                src={project.logo}
                width={20}
              />
            ) : (
              <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
            )}
            <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
              <h3 className="font-medium text-foreground text-sm">
                {project.title}
              </h3>
              <span
                className={`inline-flex items-center rounded border px-2 py-0.5 font-medium text-[11px] ${livePill}`}
              >
                <span className="flex items-center gap-0 transition-all duration-200 group-hover:gap-1">
                  live
                  {project.href && (
                    <ArrowRight className="h-3 w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:w-3 group-hover:opacity-100" />
                  )}
                </span>
              </span>
            </div>
          </div>
          <p className="pl-8 text-muted-foreground text-sm leading-relaxed">
            {project.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5 pl-8">
            {project.stack.map((tech) => (
              <Badge
                className="h-5 bg-secondary/50 px-1.5 py-0 font-normal text-[10px]"
                key={tech}
                variant="secondary"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
        {project.image && (
          <div className="border-border border-t sm:w-60 sm:border-t-0 sm:border-l">
            <Image
              alt={project.image.alt}
              className="h-full w-full object-cover object-top"
              height={project.image.height}
              sizes="(max-width: 640px) 100vw, 240px"
              src={project.image.src}
              width={project.image.width}
            />
          </div>
        )}
      </div>
    </motion.article>
  );

  if (!project.href) {
    return card;
  }

  return (
    <Link className="block" href={project.href}>
      {card}
    </Link>
  );
}

export function ClientWorkSection() {
  return (
    <section className="scroll-mt-6 px-4 py-10 sm:px-6" id="client-work">
      <div className="mx-auto max-w-3xl">
        {/* Section Header */}
        <motion.h2
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          transition={{
            duration: 0.5,
            delay: cascade.header,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          Client Work
        </motion.h2>

        {/* Description */}
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 text-foreground text-sm"
          initial={{ opacity: 0, y: 20 }}
          transition={{
            duration: 0.5,
            delay: cascade.description,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          Selected projects I&apos;ve built for clients:
        </motion.p>

        {/* Client cards - full width; private work renders without link or shots */}
        <div className="grid grid-cols-1 gap-4">
          {clientWork.map((project, index) => (
            <ClientCard index={index} key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
