"use client";

import { useForm } from "@tanstack/react-form";
import { motion } from "framer-motion";
import { gooeyToast } from "goey-toast";
import { Loader2, Send } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ease } from "@/lib/motion";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(3, "Subject must be at least 3 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

interface ContactFormProps {
  animationDelay?: number;
}

interface FailureToast {
  description: string;
  title: string;
}

/** Statuses the API returns before reading the body, with fixed copy. */
const BLOCKED_TOASTS: Record<number, FailureToast> = {
  403: {
    description: "This request was not allowed.",
    title: "Request blocked",
  },
  429: {
    description: "Please wait a moment before trying again.",
    title: "Too many requests",
  },
};

async function describeFailure(res: Response): Promise<FailureToast> {
  const blocked = BLOCKED_TOASTS[res.status];
  if (blocked) {
    return blocked;
  }
  const data = await res.json().catch(() => null);
  return {
    description: data?.error || "Please try again later.",
    title: "Failed to send",
  };
}

export function ContactForm({ animationDelay = 0.2 }: ContactFormProps) {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validators: {
      onBlur: contactSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });

      if (!res.ok) {
        const { title, description } = await describeFailure(res);
        gooeyToast.error(title, { description });
        return;
      }

      gooeyToast.success("Message sent!", {
        description: "I'll get back to you within 24–48 hours.",
      });
      form.reset();
    },
  });

  const isSubmitting = form.state.isSubmitting;

  return (
    <motion.form
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 rounded-lg border border-border bg-card p-4"
      initial={{ opacity: 0, y: 20 }}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      transition={{ duration: 0.5, delay: animationDelay, ease }}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  autoComplete="name"
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Your name"
                  value={field.state.value}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  autoComplete="email"
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="you@example.com"
                  type="email"
                  value={field.state.value}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
      </div>

      <form.Field name="subject">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Subject</FieldLabel>
              <Input
                aria-invalid={isInvalid}
                autoComplete="off"
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="What's this about?"
                value={field.state.value}
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      </form.Field>

      <form.Field name="message">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Message</FieldLabel>
              <Textarea
                aria-invalid={isInvalid}
                className="resize-none"
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Describe how I can help you..."
                rows={4}
                value={field.state.value}
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      </form.Field>

      <motion.div
        className="w-fit"
        transition={{ duration: 0.2 }}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          className="flex items-center gap-2 rounded-md bg-foreground px-4 py-2 font-medium text-background text-sm hover:bg-foreground/90 disabled:opacity-50"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {isSubmitting ? "Sending..." : "Send message"}
        </Button>
      </motion.div>
    </motion.form>
  );
}
