import type { Metadata } from "next";
import { ContactContent } from "@/components/ContactContent";

export const metadata: Metadata = {
  title: "Contact - Luca Becker",
  description:
    "Get in touch with Luca Becker. Reach out for freelance projects, collaborations, or just to say hello.",
  robots: "index, follow",
};

export default function ContactPage() {
  return <ContactContent />;
}
