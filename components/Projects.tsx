"use client";

import { useState } from "react";
import { projectsSection, projects } from "@/data/projects";
import ProjectCard from "./projects/ProjectCard";

export default function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="py-28 bg-white border-t border-line">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue mb-4">
            {projectsSection.label}
          </p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-ink">
            {projectsSection.heading}
          </h2>
        </div>

        <div className="space-y-4">
          {projects.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              bodyId={`project-body-${i}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
