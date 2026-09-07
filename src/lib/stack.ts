export interface StackItem {
  /** What it is and what Luca uses it for, one line. */
  description: string;
  icon: string;
  name: string;
  url: string;
}

export const stack: StackItem[] = [
  {
    name: "TypeScript",
    description:
      "Typed JavaScript. Every app and backend here is written in it.",
    icon: "/tech/logo-typescript.svg",
    url: "https://www.typescriptlang.org",
  },
  {
    name: "JavaScript",
    description:
      "The language under everything on the web and in React Native.",
    icon: "/tech/logo-javascript.svg",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "React",
    description:
      "UI library for the web. The mental model behind all the frontends.",
    icon: "/tech/logo-react.svg",
    url: "https://react.dev",
  },
  {
    name: "React Native",
    description: "Native iOS and Android apps from one React codebase.",
    icon: "/tech/logo-react-native.svg",
    url: "https://reactnative.dev",
  },
  {
    name: "React Native Reusables",
    description: "shadcn-style component primitives for React Native.",
    icon: "/tech/logo-react-native-reusables.svg",
    url: "https://rnr-docs.vercel.app/",
  },
  {
    name: "Uniwind",
    description:
      "Tailwind-style utility classes for React Native, compiled to native styles.",
    icon: "/tech/logo-uniwind.svg",
    url: "https://uniwind.dev/",
  },
  {
    name: "Next.js",
    description:
      "React framework for websites and web apps. This site runs on it.",
    icon: "/tech/logo-nextjs.svg",
    url: "https://nextjs.org",
  },
  {
    name: "Expo",
    description: "Toolchain, builds and updates for React Native apps.",
    icon: "/tech/logo-expo.svg",
    url: "https://expo.dev",
  },
  {
    name: "Tailwind CSS",
    description:
      "Utility-first CSS. Layout and spacing without leaving the markup.",
    icon: "/tech/logo-tailwind.svg",
    url: "https://tailwindcss.com",
  },
  {
    name: "shadcn/ui",
    description: "Copy-in React components on Radix and Tailwind.",
    icon: "/tech/logo-shadcn-ui.svg",
    url: "https://ui.shadcn.com",
  },
  {
    name: "TanStack",
    description:
      "Query, Table and Form: data fetching and state that stays correct.",
    icon: "/tech/logo-tanstack.svg",
    url: "https://tanstack.com",
  },
  {
    name: "Zustand",
    description: "Small client-side state store for React and React Native.",
    icon: "/tech/logo-zustand.svg",
    url: "https://zustand-demo.pmnd.rs/",
  },
  {
    name: "RevenueCat",
    description: "In-app subscriptions and purchases across iOS and Android.",
    icon: "/tech/logo-revenuecat.svg",
    url: "https://www.revenuecat.com",
  },
  {
    name: "Stripe",
    description: "Payments and billing for web products.",
    icon: "/tech/logo-stripe.svg",
    url: "https://stripe.com",
  },
  {
    name: "Convex",
    description: "Reactive backend with database, functions and realtime sync.",
    icon: "/tech/logo-convex.svg",
    url: "https://www.convex.dev",
  },
  {
    name: "Clerk",
    description: "Authentication and user management, drop-in.",
    icon: "/tech/logo-clerk.svg",
    url: "https://clerk.com",
  },
  {
    name: "WorkOS",
    description: "Enterprise auth: SSO, SCIM and organisations.",
    icon: "/tech/logo-workos.svg",
    url: "https://workos.com",
  },
  {
    name: "AI SDK",
    description: "Vercel's toolkit for wiring language models into apps.",
    icon: "/tech/logo-ai-sdk.svg",
    url: "https://sdk.vercel.ai",
  },
  {
    name: "ChatGPT",
    description: "OpenAI's assistant. Daily tool for research and drafts.",
    icon: "/tech/logo-chatgpt.svg",
    url: "https://openai.com/chatgpt",
  },
  {
    name: "Claude",
    description: "Anthropic's models and Claude Code, used for agentic coding.",
    icon: "/tech/logo-claude:claude-code.svg",
    url: "https://claude.ai",
  },
  {
    name: "Turborepo",
    description:
      "Monorepo build system with caching for app plus backend plus web.",
    icon: "/tech/logo-turborepo.svg",
    url: "https://turbo.build",
  },
  {
    name: "Git",
    description: "Version control. Everything ships through pull requests.",
    icon: "/tech/logo-git.svg",
    url: "https://git-scm.com",
  },
  {
    name: "Figma",
    description: "Design and prototyping before anything gets built.",
    icon: "/tech/logo-figma.svg",
    url: "https://www.figma.com",
  },
];
