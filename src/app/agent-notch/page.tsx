import type { Metadata } from "next";
import {
  AgentNotchPage,
  agentNotchDownloadUrl,
  agentNotchRepoUrl,
} from "@/components/AgentNotchPage";

const title = "Agent Notch - LLM usage in your Mac's notch | Luca Becker";
const description =
  "A native macOS side notch that shows your Claude, Cursor and Codex usage limits as rings, with reset times and live sessions on hover. Free, reads the sign-ins already on your Mac, never asks for its own.";

export const metadata: Metadata = {
  title,
  description,
  robots: "index, follow",
  alternates: {
    canonical: "/agent-notch",
  },
  openGraph: {
    type: "website",
    url: "https://lucabecker.dev/agent-notch",
    title,
    description,
    siteName: "Luca Becker",
    locale: "en_US",
    images: [
      {
        url: "/projects/agent-notch/og.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Agent Notch showing Claude, Cursor and Codex usage rings on the edge of a Mac display",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/projects/agent-notch/og.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Agent Notch",
  url: "https://lucabecker.dev/agent-notch",
  description,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS 26",
  downloadUrl: agentNotchDownloadUrl,
  softwareHelp: agentNotchRepoUrl,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  author: {
    "@type": "Person",
    name: "Luca Becker",
    url: "https://lucabecker.dev",
  },
  keywords: [
    "Claude",
    "Cursor",
    "Codex",
    "usage",
    "rate limit",
    "macOS",
    "notch",
  ],
};

export default function AgentNotchRoute() {
  return (
    <>
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is emitted this way by convention; the payload is a JSON.stringify of a static object, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <AgentNotchPage />
    </>
  );
}
