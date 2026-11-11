/**
 * UI strings for English. Every value is a plain string so the dictionary can
 * be handed to Client Components; `{name}` placeholders are filled by `format`.
 * The German dictionary is typed against this one, so a missing key fails the build.
 */
export const en = {
  meta: {
    title: 'Luca Becker - React Native Developer & Freelancer | Germany',
    description:
      'Freelance React Native developer from Germany. Building modern mobile and web apps with TypeScript, Expo, and Next.js. Available for projects.',
    ogAlt: 'Luca Becker - React Native Developer',
    jobTitle: 'React Native Developer',
    personDescription: 'Freelance React Native developer from Germany specializing in mobile and web applications',
  },
  rail: {
    role: 'Mobile developer',
    oneLiner: 'Apps in React Native and Swift, with the backend and web to go with them.',
    profiles: 'Profiles',
    resume: 'Download resume',
    resumeFile: 'Luca Becker - Resume.pdf',
    stack: 'Stack',
    sectionsLabel: 'Sections',
    sections: {
      about: 'About',
      projects: 'Projects',
      clientWork: 'Client work',
      experience: 'Experience',
    },
  },
  languageSwitch: {
    label: 'Language',
    en: 'English',
    de: 'Deutsch',
  },
  github: {
    heading: 'GitHub activity',
    calendarLabel: 'Contribution calendar, one square per day',
    total: 'contributions in the last year',
    less: 'Less',
    more: 'More',
    unavailable: 'Contribution graph unavailable right now. See the profile on GitHub.',
    dayOne: '1 contribution on {date}',
    dayOther: '{count} contributions on {date}',
    mon: 'Mon',
    wed: 'Wed',
    fri: 'Fri',
  },
  work: {
    kinds: {
      product: 'Product',
      client: 'Client',
      'in-development': 'In development',
      private: 'Private',
    },
    privateNote: 'Private client work, no public link.',
    appStore: 'Download {title} on the App Store',
  },
  experience: {
    heading: 'Experience',
    period: 'Period',
    role: 'Role',
    place: 'Place',
    work: 'Work',
    education: 'Education',
  },
  footer: {
    builtWith: 'Built with',
    by: 'by Luca',
    openSource: 'This website is open source',
  },
  notFound: {
    title: 'Page not found',
    error: 'Error: Route not found',
    home: 'Go home',
  },
  caseStudy: {
    backToProjects: 'Back to projects',
    backToClientWork: 'Back to client work',
  },
  agentNotch: {
    metaTitle: "Agent Notch - LLM usage in your Mac's notch | Luca Becker",
    metaDescription:
      'A native macOS side notch that shows your Claude, Cursor and Codex usage limits as rings, with reset times and live sessions on hover. Free, reads the sign-ins already on your Mac, never asks for its own.',
    ogAlt: 'Agent Notch showing Claude, Cursor and Codex usage rings on the edge of a Mac display',
    tagline: "LLM usage, in your Mac's notch",
    requirement: 'macOS 26 or later',
    free: 'Free, no account',
    description:
      'A native side notch that shows how much of your Claude, Cursor and Codex limits you have used, so you find out before the rate limit does. It reads the sign-ins those tools already keep on your Mac and never asks for one of its own.',
    download: 'Download for macOS',
    github: 'View on GitHub',
    notarized: 'Notarized by Apple. Updates itself.',
    heroAlt:
      'Agent Notch on the right edge of a Mac desktop: three usage rings with the Claude tooltip open, showing the current session, all models and Fable with their reset times',
    heroCaption:
      'Recorded on a Mac. The pill widens as the pointer comes close, then each ring opens its windows and reset times.',
    features: {
      rings: {
        title: 'Three rings, one glance',
        body: 'Claude, Cursor and Codex limits as rings on the edge of your screen. Green, yellow and red tell you how close you are before a session stalls.',
      },
      hover: {
        title: 'Hover for the full picture',
        body: 'Every window with its reset time, plus the Claude Code sessions running right now. Click a ring to refresh it.',
      },
      signIn: {
        title: 'Never signs in',
        body: 'Reads the credentials Claude Code, Cursor and Codex already keep on your Mac. Switch accounts in the tool and the notch follows.',
      },
      position: {
        title: 'Lives where you want it',
        body: 'Right, left, top or bottom edge. Keep it open, collapse it to a pill that opens on hover, or hide it completely.',
      },
    },
    note: "Requires Claude Code, Cursor or Codex to be signed in on this Mac. macOS will ask once whether Agent Notch may read Claude Code's keychain item; choose Always Allow and it stays quiet. Rebuilt from",
    credit: 'by Vinz, whose idea this is.',
  },
  bvq: {
    metaTitle: 'BV Q-Club e.V. - Client Work | Luca Becker',
    metaDescription:
      "Website and Sanity CMS for Fürth's pool billiard club: an editorial Next.js site the board maintains itself, with tournament results syncing automatically from Cuescore.",
    ogAlt: 'Homepage of bv-q-club.de',
    role: 'Design & Development',
    location: 'Fürth, Germany',
    description:
      "Designed and built the website and Sanity CMS for Fürth's pool billiard club - the board publishes updates itself, and tournament results sync in from Cuescore.",
    crestAlt: 'BV Q-Club e.V. crest',
    visit: 'Visit bv-q-club.de',
    heroAlt:
      'Homepage hero of bv-q-club.de: the words Q-CLUB FÜRTH set in a large display serif behind a rendered black 8-ball',
    tournamentsAlt:
      'Tournament results section of bv-q-club.de, listing recent tournaments with podium placements pulled from Cuescore',
    tournamentsCaption: 'Results sync from Cuescore - no manual entry.',
    membershipAlt: 'Membership section of bv-q-club.de showing four pricing tiers on a light background',
    membershipCaption: 'Membership tiers the board edits in Sanity.',
  },
  zeiterfassung: {
    description: 'Legal information for the Zeiterfassung app',
    privacy: 'Privacy policy',
    privacyDescription: 'How your data is handled and what your rights are',
    terms: 'Terms of service',
    termsDescription: 'Terms of use for the app',
    back: 'Back',
    englishOnly: 'This document is only available in English.',
  },
};

export type Dictionary = typeof en;
