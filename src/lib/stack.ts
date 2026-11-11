import type { Localized } from '@/i18n/config';

export interface StackItem {
  /** What it is and what Luca uses it for, one line. */
  description: Localized;
  icon: string;
  name: string;
  url: string;
}

export const stack: StackItem[] = [
  {
    name: 'TypeScript',
    description: {
      en: 'Typed JavaScript. Every app and backend here is written in it.',
      de: 'JavaScript mit Typen. Jede App und jedes Backend hier ist darin geschrieben.',
    },
    icon: '/tech/logo-typescript.svg',
    url: 'https://www.typescriptlang.org',
  },
  {
    name: 'JavaScript',
    description: {
      en: 'The language under everything on the web and in React Native.',
      de: 'Die Sprache unter allem im Web und in React Native.',
    },
    icon: '/tech/logo-javascript.svg',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  {
    name: 'React',
    description: {
      en: 'UI library for the web. The mental model behind all the frontends.',
      de: 'UI-Bibliothek für das Web. Das Denkmodell hinter allen Frontends.',
    },
    icon: '/tech/logo-react.svg',
    url: 'https://react.dev',
  },
  {
    name: 'React Native',
    description: {
      en: 'Native iOS and Android apps from one React codebase.',
      de: 'Native iOS- und Android-Apps aus einer React-Codebasis.',
    },
    icon: '/tech/logo-react-native.svg',
    url: 'https://reactnative.dev',
  },
  {
    name: 'Next.js',
    description: {
      en: 'React framework for websites and web apps. This site runs on it.',
      de: 'React-Framework für Websites und Web-Apps. Diese Seite läuft darauf.',
    },
    icon: '/tech/logo-nextjs.svg',
    url: 'https://nextjs.org',
  },
  {
    name: 'Expo',
    description: {
      en: 'Toolchain, builds and updates for React Native apps.',
      de: 'Toolchain, Builds und Updates für React-Native-Apps.',
    },
    icon: '/tech/logo-expo.svg',
    url: 'https://expo.dev',
  },
  {
    name: 'Tailwind CSS',
    description: {
      en: 'Utility-first CSS. Layout and spacing without leaving the markup.',
      de: 'Utility-first CSS. Layout und Abstände, ohne das Markup zu verlassen.',
    },
    icon: '/tech/logo-tailwind.svg',
    url: 'https://tailwindcss.com',
  },
  {
    name: 'shadcn/ui',
    description: {
      en: 'Copy-in React components on Radix and Tailwind.',
      de: 'React-Komponenten zum Reinkopieren, auf Radix und Tailwind.',
    },
    icon: '/tech/logo-shadcn-ui.svg',
    url: 'https://ui.shadcn.com',
  },
  {
    name: 'TanStack',
    description: {
      en: 'Query, Table and Form: data fetching and state that stays correct.',
      de: 'Query, Table und Form: Datenabruf und State, der korrekt bleibt.',
    },
    icon: '/tech/logo-tanstack.svg',
    url: 'https://tanstack.com',
  },
  {
    name: 'Zustand',
    description: {
      en: 'Small client-side state store for React and React Native.',
      de: 'Kleiner clientseitiger State-Store für React und React Native.',
    },
    icon: '/tech/logo-zustand.svg',
    url: 'https://zustand-demo.pmnd.rs/',
  },
  {
    name: 'RevenueCat',
    description: {
      en: 'In-app subscriptions and purchases across iOS and Android.',
      de: 'In-App-Abos und -Käufe auf iOS und Android.',
    },
    icon: '/tech/logo-revenuecat.svg',
    url: 'https://www.revenuecat.com',
  },
  {
    name: 'Convex',
    description: {
      en: 'Reactive backend with database, functions and realtime sync.',
      de: 'Reaktives Backend mit Datenbank, Functions und Echtzeit-Sync.',
    },
    icon: '/tech/logo-convex.svg',
    url: 'https://www.convex.dev',
  },
  {
    name: 'Clerk',
    description: {
      en: 'Authentication and user management, drop-in.',
      de: 'Authentifizierung und Nutzerverwaltung, fertig zum Einbauen.',
    },
    icon: '/tech/logo-clerk.svg',
    url: 'https://clerk.com',
  },
  {
    name: 'Better Auth',
    description: {
      en: 'Self-hosted TypeScript auth that lives in your own database.',
      de: 'Selbst gehostete TypeScript-Auth, die in deiner eigenen Datenbank lebt.',
    },
    icon: '/tech/logo-better-auth.svg',
    url: 'https://www.better-auth.com',
  },
  {
    name: 'AI SDK',
    description: {
      en: "Vercel's toolkit for wiring language models into apps.",
      de: 'Das Toolkit von Vercel, um Sprachmodelle in Apps einzubinden.',
    },
    icon: '/tech/logo-ai-sdk.svg',
    url: 'https://sdk.vercel.ai',
  },
  {
    name: 'ChatGPT',
    description: {
      en: "OpenAI's assistant. Daily tool for research and drafts.",
      de: 'Der Assistent von OpenAI. Tägliches Werkzeug für Recherche und Entwürfe.',
    },
    icon: '/tech/logo-chatgpt.svg',
    url: 'https://openai.com/chatgpt',
  },
  {
    name: 'Claude',
    description: {
      en: "Anthropic's models and Claude Code, used for agentic coding.",
      de: 'Die Modelle von Anthropic und Claude Code, für agentisches Programmieren.',
    },
    icon: '/tech/logo-claude:claude-code.svg',
    url: 'https://claude.ai',
  },
  {
    name: 'Turborepo',
    description: {
      en: 'Monorepo build system with caching for app plus backend plus web.',
      de: 'Monorepo-Buildsystem mit Caching für App, Backend und Web.',
    },
    icon: '/tech/logo-turborepo.svg',
    url: 'https://turbo.build',
  },
  {
    name: 'Git',
    description: {
      en: 'Version control. Everything ships through pull requests.',
      de: 'Versionskontrolle. Alles geht über Pull Requests raus.',
    },
    icon: '/tech/logo-git.svg',
    url: 'https://git-scm.com',
  },
  {
    name: 'Figma',
    description: {
      en: 'Design and prototyping before anything gets built.',
      de: 'Design und Prototyping, bevor etwas gebaut wird.',
    },
    icon: '/tech/logo-figma.svg',
    url: 'https://www.figma.com',
  },
];
