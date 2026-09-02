import { Footer } from "@/components/Footer";
import { About } from "@/components/ledger/About";
import { Contact } from "@/components/ledger/Contact";
import { DotField } from "@/components/ledger/DotField";
import { ExperienceTable } from "@/components/ledger/ExperienceTable";
import { Rail } from "@/components/ledger/Rail";
import { WorkStream } from "@/components/ledger/WorkStream";
import { clientWork, projects } from "@/lib/work";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <DotField />
      <div className="relative z-10 mx-auto grid max-w-[1200px] px-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12">
        <Rail />
        <main className="flex min-w-0 flex-col gap-20 pb-24 lg:pt-10">
          <About />
          <WorkStream entries={projects} heading="Projects" id="projects" />
          <WorkStream
            entries={clientWork}
            heading="Client work"
            id="client-work"
          />
          <ExperienceTable />
          <Contact />
        </main>
      </div>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
