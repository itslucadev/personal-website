import {
  agentNotchDownloadUrl,
  agentNotchRepoUrl,
} from "@/components/AgentNotchPage";

export type WorkKind = "product" | "client" | "in-development" | "private";

export interface WorkEntry {
  actions: {
    label: string;
    href: string;
    external?: boolean;
    primary?: boolean;
  }[];
  dek: string;
  highlight?: string;
  image?: { src: string; alt: string; width: number; height: number };
  kind: WorkKind;
  logo?: string;
  slug: string;
  stack: string[];
  title: string;
  year?: string;
}

export const workEntries: WorkEntry[] = [
  {
    slug: "agent-notch",
    title: "Agent Notch",
    kind: "product",
    year: "2026",
    stack: ["Swift", "AppKit", "Sparkle"],
    dek: "A usage meter that lives where the notch already is. Claude, Cursor and Codex limits as rings, with reset times on hover.",
    highlight: "where the notch already is",
    image: {
      src: "/projects/agent-notch/og.png",
      alt: "Agent Notch showing Claude, Cursor and Codex usage rings on the edge of a Mac display",
      width: 1200,
      height: 630,
    },
    actions: [
      {
        label: "Download for macOS",
        href: agentNotchDownloadUrl,
        primary: true,
      },
      { label: "About the app", href: "/agent-notch" },
      { label: "GitHub", href: agentNotchRepoUrl, external: true },
    ],
  },
  {
    slug: "bv-q-club",
    title: "BV Q-Club e.V.",
    kind: "client",
    year: "2026",
    stack: ["Next.js", "Sanity CMS", "Cuescore API"],
    dek: "The website and CMS for Fürth's pool billiard club. The board publishes updates itself, and tournament results sync in from Cuescore.",
    highlight: "publishes updates itself",
    image: {
      src: "/clients/bv-q-club-hero.webp",
      alt: "Homepage hero of bv-q-club.de: the words Q-CLUB FÜRTH set in a large display serif behind a rendered black 8-ball",
      width: 1440,
      height: 900,
    },
    actions: [
      {
        label: "Visit bv-q-club.de",
        href: "https://bv-q-club.de",
        primary: true,
        external: true,
      },
      { label: "Project notes", href: "/work/bv-q-club" },
    ],
  },
  {
    slug: "minimafinance",
    title: "MinimaFinance",
    kind: "product",
    stack: ["React Native", "Expo"],
    dek: "Track daily spending in a grid, with custom categories and bill reminders. Everything stays on the device.",
    highlight: "Everything stays on the device",
    logo: "/projects/logo-minimafinance.svg",
    actions: [
      {
        label: "Visit minimafinance.app",
        href: "https://minimafinance.app",
        primary: true,
        external: true,
      },
    ],
  },
  {
    slug: "zeiterfassung",
    title: "Zeiterfassung",
    kind: "private",
    stack: ["React Native", "Expo", "TypeScript"],
    dek: "Internal time-tracking app for the on-site teams of a local cleaning business.",
    actions: [],
  },
  {
    slug: "billiardrank",
    title: "BilliardRank",
    kind: "in-development",
    stack: [],
    dek: "Ranking and competition management for billiard players and clubs.",
    logo: "/projects/logo-billiardrank.png",
    actions: [],
  },
  {
    slug: "gridvote-f1",
    title: "GridVote F1",
    kind: "in-development",
    stack: [],
    dek: "Social Formula 1 prediction game built around seasons and friends.",
    actions: [],
  },
];
