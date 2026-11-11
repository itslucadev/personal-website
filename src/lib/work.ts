import { agentNotchDownloadUrl, agentNotchRepoUrl } from '@/components/AgentNotchPage';
import type { Localized } from '@/i18n/config';

export type WorkKind = 'product' | 'client' | 'in-development' | 'private';

export interface WorkEntry {
  actions: {
    label: Localized;
    /** Internal paths are written without the locale prefix; it is added when rendered. */
    href: string;
    external?: boolean;
    /** Rendered as a filled button instead of a text link. */
    primary?: boolean;
  }[];
  /** App Store product page; renders Apple's badge as the first action. */
  appStore?: string;
  dek: Localized;
  image?: { src: string; alt: Localized; width: number; height: number };
  kind: WorkKind;
  /** Small mark shown before the title. */
  logo?: string;
  slug: string;
  stack: string[];
  title: string;
  year?: string;
}

export const projects: WorkEntry[] = [
  {
    slug: 'agent-notch',
    title: 'Agent Notch',
    kind: 'product',
    year: '2026',
    stack: ['Swift', 'AppKit', 'Sparkle'],
    dek: {
      en: 'A usage meter that lives where the notch already is. Claude, Cursor and Codex limits as rings, with reset times on hover.',
      de: 'Ein Nutzungsmesser, der dort sitzt, wo die Notch ohnehin ist. Die Limits von Claude, Cursor und Codex als Ringe, mit Reset-Zeiten beim Hovern.',
    },
    image: {
      src: '/projects/agent-notch/desktop.webp',
      alt: {
        en: 'Agent Notch on the right edge of a Mac desktop, showing Claude, Cursor and Codex usage rings at 0%, 52% and 1%',
        de: 'Agent Notch am rechten Rand eines Mac-Desktops mit den Nutzungsringen von Claude, Cursor und Codex bei 0 %, 52 % und 1 %',
      },
      width: 1600,
      height: 1000,
    },
    actions: [
      {
        label: { en: 'Download for macOS', de: 'Für macOS laden' },
        href: agentNotchDownloadUrl,
        primary: true,
      },
      { label: { en: 'About the app', de: 'Über die App' }, href: '/agent-notch' },
      { label: { en: 'GitHub', de: 'GitHub' }, href: agentNotchRepoUrl, external: true },
    ],
  },
  {
    slug: 'minimafinance',
    title: 'MinimaFinance',
    kind: 'product',
    stack: ['React Native', 'Expo'],
    dek: {
      en: 'Track daily spending in a grid, with custom categories and bill reminders. Everything stays on the device.',
      de: 'Tägliche Ausgaben in einem Raster erfassen, mit eigenen Kategorien und Erinnerungen an Rechnungen. Alles bleibt auf dem Gerät.',
    },
    logo: '/projects/logo-minimafinance.svg',
    image: {
      src: '/projects/minimafinance-og.webp',
      alt: {
        en: 'Minima Finance, simple expense tracking app for iPhone',
        de: 'Minima Finance, eine einfache App zum Erfassen von Ausgaben für das iPhone',
      },
      width: 1200,
      height: 630,
    },
    appStore: 'https://apps.apple.com/app/minima-finance/id6504699094',
    actions: [
      {
        label: { en: 'minimafinance.app', de: 'minimafinance.app' },
        href: 'https://minimafinance.app',
        external: true,
      },
    ],
  },
];

export const clientWork: WorkEntry[] = [
  {
    slug: 'bv-q-club',
    title: 'BV Q-Club e.V.',
    kind: 'client',
    year: '2026',
    stack: ['Next.js', 'Sanity CMS', 'Cuescore API'],
    dek: {
      en: "The website and CMS for Fürth's pool billiard club. The board publishes updates itself, and tournament results sync in from Cuescore.",
      de: 'Website und CMS für den Poolbillard-Verein in Fürth. Der Vorstand veröffentlicht Neuigkeiten selbst, und die Turnierergebnisse kommen automatisch aus Cuescore.',
    },
    logo: '/clients/logo-bv-q-club.png',
    image: {
      src: '/clients/bv-q-club-hero.webp',
      alt: {
        en: 'Homepage hero of bv-q-club.de: the words Q-CLUB FÜRTH set in a large display serif behind a rendered black 8-ball',
        de: 'Startseite von bv-q-club.de: der Schriftzug Q-CLUB FÜRTH in einer großen Serifenschrift hinter einer gerenderten schwarzen 8er-Kugel',
      },
      width: 1440,
      height: 900,
    },
    actions: [
      {
        label: { en: 'Visit bv-q-club.de', de: 'bv-q-club.de besuchen' },
        href: 'https://bv-q-club.de',
        primary: true,
        external: true,
      },
      { label: { en: 'Project notes', de: 'Projektnotizen' }, href: '/work/bv-q-club' },
    ],
  },
  {
    slug: 'zeiterfassung',
    title: 'Zeiterfassung',
    kind: 'private',
    stack: ['React Native', 'Expo', 'TypeScript'],
    dek: {
      en: 'Internal time-tracking app for the on-site teams of a local cleaning business.',
      de: 'Interne Zeiterfassungs-App für die Teams eines regionalen Reinigungsunternehmens.',
    },
    actions: [],
  },
];
