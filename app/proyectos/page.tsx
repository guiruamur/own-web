import type { Metadata } from "next";
import { personal } from "@/data/personal";
import { projectsSection, projects } from "@/data/projects";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactCTA from "@/components/ui/ContactCTA";
import ProjectCard from "@/components/proyectos/ProjectCard";

export const metadata: Metadata = {
  title:       `Proyectos · ${personal.firstName} ${personal.lastName}`,
  description: projectsSection.intro,
};

export default function ProyectosPage() {
  return (
    <main className="pt-32 pb-24">
      <section className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop mb-12 md:mb-20">
        <SectionLabel line className="mb-4">{projectsSection.label}</SectionLabel>
        <h1 className="font-headline text-headline-xl-mobile md:text-headline-xl text-on-surface mb-6">
          {projectsSection.heading}
        </h1>
        <p className="font-body text-body-lg text-text-muted max-w-2xl">
          {projectsSection.intro}
        </p>
      </section>

      <section className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 gap-12">
          {projects.map((p, i) => (
            <Reveal key={p.title}>
              <ProjectCard project={p} reversed={i % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </section>

      <div className="mt-20 md:mt-24">
        <Reveal>
          <ContactCTA variant="dotted" />
        </Reveal>
      </div>
    </main>
  );
}
