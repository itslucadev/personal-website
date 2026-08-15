import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import { ToastProvider } from "@/components/ToastProvider";
import "./globals.css";

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lucabecker.dev"),
  title: "Luca Becker - React Native Developer & Freelancer | Germany",
  description:
    "Freelance React Native developer from Germany. Building modern mobile and web apps with TypeScript, Expo, and Next.js. Available for projects.",
  authors: [{ name: "Luca Becker" }],
  robots: "index, follow",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://lucabecker.dev/",
    title: "Luca Becker - React Native Developer & Freelancer | Germany",
    description:
      "Freelance React Native developer from Germany. Building modern mobile and web apps with TypeScript, Expo, and Next.js. Available for projects.",
    siteName: "Luca Becker",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Luca Becker - React Native Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luca Becker - React Native Developer & Freelancer | Germany",
    description:
      "Freelance React Native developer from Germany. Building modern mobile and web apps with TypeScript, Expo, and Next.js. Available for projects.",
    images: ["/og-image.png"],
  },
  other: {
    "geo.region": "DE",
    "geo.placename": "Germany",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Luca Becker",
  url: "https://lucabecker.dev",
  image: "https://lucabecker.dev/avatar.png",
  jobTitle: "React Native Developer",
  description:
    "Freelance React Native developer from Germany specializing in mobile and web applications",
  email: "luca.dev@outlook.de",
  sameAs: [
    "https://github.com/phoenix-error",
    "https://twitter.com/phoenixdevluca",
    "https://www.linkedin.com/in/luca-becker-10a736231/",
  ],
  knowsAbout: [
    "React Native",
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Expo",
    "Mobile App Development",
    "iOS Development",
    "Android Development",
    "Tailwind CSS",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "FAU Universität Erlangen-Nürnberg",
    url: "https://www.fau.de",
  },
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "DE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is emitted this way by convention; the payload is a JSON.stringify of a static object, not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
      </head>
      <body
        className={`${firaCode.variable} font-mono antialiased`}
        suppressHydrationWarning
      >
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
