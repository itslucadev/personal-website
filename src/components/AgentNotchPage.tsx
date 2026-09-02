"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  Eye,
  Github,
  KeyRound,
  Laptop,
  MousePointerClick,
  Move,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export const agentNotchDownloadUrl =
  "https://github.com/itslucadev/AgentNotch/releases/latest/download/AgentNotch.zip";
export const agentNotchRepoUrl = "https://github.com/itslucadev/AgentNotch";

const meta = [
  { icon: Laptop, label: "macOS 26 or later" },
  { icon: KeyRound, label: "Free, no account" },
];

const stack = ["Swift", "SwiftUI", "AppKit", "Sparkle"];

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
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Logo />

      <main className="flex-1">
        <section className="px-4 pt-20 pb-16 sm:px-6">
          <div className="mx-auto max-w-3xl">
            {/* Back link */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.15, ease }}
            >
              <Link
                className="group mb-6 inline-flex items-center gap-1.5 text-muted-foreground text-xs transition-colors duration-200 hover:text-foreground"
                href="/#projects"
              >
                <ArrowLeft className="h-3 w-3 transition-transform duration-200 group-hover:-translate-x-0.5" />
                Back to projects
              </Link>
            </motion.div>

            {/* Header */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mb-3"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
            >
              <h1 className="font-bold text-2xl leading-tight tracking-tight sm:text-[28px]">
                Agent <span className="text-amber-600">Notch</span>
              </h1>
              <p className="text-muted-foreground text-xs">
                LLM usage, in your Mac&apos;s notch
              </p>
            </motion.div>

            {/* Meta */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-muted-foreground text-xs"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.25, ease }}
            >
              {meta.map(({ icon: Icon, label }) => (
                <span className="inline-flex items-center gap-1.5" key={label}>
                  <Icon className="h-3 w-3" />
                  {label}
                </span>
              ))}
            </motion.div>

            {/* The one paragraph */}
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 text-foreground text-sm leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
            >
              A native side notch that shows how much of your Claude, Cursor and
              Codex limits you have used, so you find out before the rate limit
              does. It reads the sign-ins those tools already keep on your Mac
              and never asks for one of its own.
            </motion.p>

            {/* Stack */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex flex-wrap gap-1.5"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.35, ease }}
            >
              {stack.map((tech) => (
                <Badge
                  className="h-6 bg-secondary/50 px-2 py-0 font-normal text-[11px]"
                  key={tech}
                  variant="secondary"
                >
                  {tech}
                </Badge>
              ))}
            </motion.div>

            {/* Download */}
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
                <a
                  href={agentNotchRepoUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
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

            {/* Hero: the notch on a mock display */}
            <motion.figure
              animate={{ opacity: 1, y: 0 }}
              className="relative mb-4 aspect-[16/10] overflow-hidden rounded-lg border border-border bg-gradient-to-br from-[#e6e9f2] via-[#d3d9e6] to-[#c1c8d8]"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.45, ease }}
            >
              <Image
                alt="Agent Notch on the right edge of a Mac display: three rings for Claude, Cursor and Codex, with the Claude tooltip open showing the current session at 41%, all models at 23%, and two running Claude Code sessions"
                className="absolute top-1/2 right-0 h-[112%] w-auto -translate-y-1/2"
                height={1365}
                priority
                sizes="(max-width: 768px) 70vw, 540px"
                src="/projects/agent-notch/notch-hover.png"
                width={1041}
              />
            </motion.figure>
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mb-10 text-muted-foreground text-xs"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5, ease }}
            >
              Hovering the Claude ring. The tail points at the ring you are on.
            </motion.p>

            {/* Features */}
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

            {/* Fine print */}
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-muted-foreground text-xs leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.8, ease }}
            >
              Requires Claude Code, Cursor or Codex to be signed in on this Mac.
              macOS will ask once whether Agent Notch may read Claude
              Code&apos;s keychain item; choose Always Allow and it stays quiet.
              Rebuilt from{" "}
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
