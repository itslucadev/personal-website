"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export function ContactContent() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Logo />

      <main className="flex-1">
        {/* Hero */}
        <section className="pt-20 pb-12 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="text-2xl sm:text-[28px] font-bold text-center mb-4 leading-tight tracking-tight"
            >
              Let's <span className="text-amber-500">connect</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="text-sm text-muted-foreground text-center mb-6 leading-relaxed max-w-lg mx-auto"
            >
              Have a project in mind or just want to say hi? Reach out below or
              pick the option that works best for you.
            </motion.p>

          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-10 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease }}
              className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2"
            >
              Send a Message
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.53, ease }}
              className="text-sm text-foreground mb-5"
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
