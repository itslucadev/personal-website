import { ContactForm } from "@/components/ContactForm";
import { PageHero, PageSection, PageShell } from "@/components/PageLayout";

export function ContactContent() {
  return (
    <PageShell>
      <PageHero
        description="Have a project in mind or just want to say hi? Reach out below or pick the option that works best for you."
        title={
          <>
            Let's <span className="text-amber-600">connect</span>
          </>
        }
      />

      <PageSection
        delay={0.5}
        description="Fill out the form and I'll get back to you within 24–48 hours."
        title="Send a Message"
      >
        <ContactForm animationDelay={0.56} />
      </PageSection>
    </PageShell>
  );
}
