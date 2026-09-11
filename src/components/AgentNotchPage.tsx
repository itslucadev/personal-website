"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Download,
  Eye,
  Github,
  KeyRound,
  Laptop,
  MousePointerClick,
  Move,
} from "lucide-react";
import Image from "next/image";
import { CaseStudyLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { ease } from "@/lib/motion";

export const agentNotchDownloadUrl =
  "https://lucabecker.dev/agent-notch/AgentNotch.zip";
export const agentNotchRepoUrl = "https://github.com/itslucadev/AgentNotch";

const meta = [
  { icon: Laptop, label: "macOS 26 or later" },
  { icon: KeyRound, label: "Free, no account" },
];

const stack = ["Swift", "SwiftUI", "AppKit", "Sparkle"];

const heroPoster = "/projects/agent-notch/hero-poster.webp";
const heroVideo = "/projects/agent-notch/hero.mp4";
const heroAlt =
  "Agent Notch on the right edge of a Mac desktop: three usage rings with the Claude tooltip open, showing the current session, all models and Fable with their reset times";

const features = [
  {
    icon: Eye,
    title: "Three rings, one glance",
    body: "Claude, Cursor and Codex limits as rings on the edge of your screen. Green, yellow and red tell you how close you are before a session stalls.",
  },
  {
    icon: MousePointerClick,
    title: "Hover for the full picture",
    body: "Every window with its reset time, plus the Claude Code sessions running right now. Click a ring to refresh it.",
  },
  {
    icon: KeyRound,
    title: "Never signs in",
    body: "Reads the credentials Claude Code, Cursor and Codex already keep on your Mac. Switch accounts in the tool and the notch follows.",
  },
  {
    icon: Move,
    title: "Lives where you want it",
    body: "Right, left, top or bottom edge. Keep it open, collapse it to a pill that opens on hover, or hide it completely.",
  },
];

export function AgentNotchPage() {
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <CaseStudyLayout
      backHref="/#projects"
      backLabel="Back to projects"
      description="A native side notch that shows how much of your Claude, Cursor and Codex limits you have used, so you find out before the rate limit does. It reads the sign-ins those tools already keep on your Mac and never asks for one of its own."
      header={
        <>
          <h1 className="font-bold text-2xl leading-tight tracking-tight sm:text-[28px]">
            Agent <span className="text-amber-600">Notch</span>
          </h1>
          <p className="text-muted-foreground text-xs">
            LLM usage, in your Mac&apos;s notch
          </p>
        </>
      }
      meta={meta}
      stack={stack}
    >
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mb-2 flex flex-wrap items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.4, ease }}
      >
        <Button asChild>
          <a href={agentNotchDownloadUrl}>
            <Download />
            Download for macOS
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href={agentNotchRepoUrl} rel="noopener noreferrer" target="_blank">
            <Github />
            View on GitHub
          </a>
        </Button>
      </motion.div>

      <motion.p
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-muted-foreground text-xs"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.42, ease }}
      >
        Notarized by Apple. Updates itself.
      </motion.p>

      <motion.figure
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-4 aspect-[16/10] overflow-hidden rounded-lg border border-border bg-muted"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.45, ease }}
      >
        {reducedMotion ? (
          <Image
            alt={heroAlt}
            className="object-cover"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 540px"
            src={heroPoster}
          />
        ) : (
          <video
            aria-label={heroAlt}
            autoPlay
            className="absolute inset-0 h-full w-full object-cover"
            loop
            muted
            playsInline
            poster={heroPoster}
            preload="metadata"
            src={heroVideo}
          />
        )}
      </motion.figure>
      <motion.p
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-muted-foreground text-xs"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.5, ease }}
      >
        Recorded on a Mac. The pill widens as the pointer comes close, then each
        ring opens its windows and reset times.
      </motion.p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {features.map(({ icon: Icon, title, body }, index) => (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-border bg-card p-4"
            initial={{ opacity: 0, y: 20 }}
            key={title}
            transition={{
              duration: 0.5,
              delay: 0.55 + index * 0.05,
              ease,
            }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Icon className="h-3.5 w-3.5 text-amber-600" />
              <h2 className="font-medium text-sm">{title}</h2>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {body}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 text-muted-foreground text-xs leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.8, ease }}
      >
        Requires Claude Code, Cursor or Codex to be signed in on this Mac. macOS
        will ask once whether Agent Notch may read Claude Code&apos;s keychain
        item; choose Always Allow and it stays quiet. Rebuilt from{" "}
        <a
          className="link-underline text-foreground"
          href="https://x.com/hivinz_"
          rel="noopener noreferrer"
          target="_blank"
        >
          Codenotch
        </a>{" "}
        by Vinz, whose idea this is.
      </motion.p>
    </CaseStudyLayout>
  );
}
