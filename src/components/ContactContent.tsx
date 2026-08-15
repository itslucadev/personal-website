"use client";

import { motion } from "framer-motion";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export function ContactContent() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Logo />

      <main className="flex-1">
        {/* Hero */}
        <section className="px-4 pt-20 pb-12 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 text-center font-bold text-2xl leading-tight tracking-tight sm:text-[28px]"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
            >
              Let's <span className="text-amber-600">connect</span>
            </motion.h1>

            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mb-6 max-w-lg text-center text-muted-foreground text-sm leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
            >
              Have a project in mind or just want to say hi? Reach out below or
              pick the option that works best for you.
            </motion.p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <motion.h2
              animate={{ opacity: 1, y: 0 }}
              className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5, ease }}
            >
              Send a Message
            </motion.h2>

            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 text-foreground text-sm"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.53, ease }}
            >
              Fill out the form and I'll get back to you within 24–48 hours.
            </motion.p>

            <ContactForm animationDelay={0.56} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
