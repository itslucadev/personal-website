import { ClientWorkSection } from "@/components/ClientWorkSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Logo } from "@/components/Logo";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { SocialSection } from "@/components/SocialSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Logo />

      <main className="flex-1">
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <ClientWorkSection />
        <SkillsSection />
        <SocialSection />
      </main>

      <Footer />
    </div>
  );
}
