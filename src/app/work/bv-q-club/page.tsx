import type { Metadata } from "next";
import { ClientPageBvqClub } from "@/components/ClientPageBvqClub";

const title = "BV Q-Club e.V. - Client Work | Luca Becker";
const description =
  "Website and Sanity CMS for Fürth's pool billiard club: an editorial Next.js site the board maintains itself, with tournament results syncing automatically from Cuescore.";

export const metadata: Metadata = {
  title,
  description,
  robots: "index, follow",
  alternates: {
    canonical: "/work/bv-q-club",
  },
  openGraph: {
    type: "article",
    url: "https://lucabecker.dev/work/bv-q-club",
    title,
    description,
    siteName: "Luca Becker",
    locale: "en_US",
    images: [
      {
        url: "/clients/bv-q-club-hero-og.jpg",
        width: 1440,
        height: 900,
        type: "image/jpeg",
        alt: "Homepage of bv-q-club.de",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/clients/bv-q-club-hero-og.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "BV Q-Club e.V. Website",
  url: "https://bv-q-club.de",
  mainEntityOfPage: "https://lucabecker.dev/work/bv-q-club",
  description,
  inLanguage: "de",
  creator: {
    "@type": "Person",
    name: "Luca Becker",
    url: "https://lucabecker.dev",
  },
  about: {
    "@type": "SportsOrganization",
    name: "BV Q-Club e.V.",
    url: "https://bv-q-club.de",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kaiserstraße 177",
      postalCode: "90763",
      addressLocality: "Fürth",
      addressCountry: "DE",
    },
  },
  keywords: [
    "Next.js",
    "Sanity CMS",
    "TypeScript",
    "Tailwind CSS",
    "Vercel",
    "Web Design",
  ],
};

export default function BVQClubPage() {
  return (
    <>
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is emitted this way by convention; the payload is a JSON.stringify of a static object, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <ClientPageBvqClub />
    </>
  );
}
