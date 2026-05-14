"use client";

import { ChevronDown } from "lucide-react";
import type { Project } from "@/data/projects";
import ProjectBody from "./ProjectBody";

type Props = {
  project:  Project;
  open:     boolean;
  onToggle: () => void;
  bodyId:   string;
};

export default function ProjectCard({ project, open, onToggle, bodyId }: Props) {
  return (
    <div
      onClick={() => { if (!open) onToggle(); }}
      className={`bg-white border rounded-xl transition-all duration-200 hover:border-blue/40 hover:shadow-sm ${
        project.current ? "border-blue/50" : "border-line"
      } ${!open ? "cursor-pointer" : ""}`}
    >
      <div className="p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h3 className="font-display font-bold text-xl text-ink">{project.title}</h3>
          {project.current && (
            <span className="text-xs font-semibold px-2.5 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded-full">
              Actual
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {project.technologies.map((t) => (
            <span key={t} className="text-xs font-medium px-2.5 py-1 bg-white border border-line text-ink-3 rounded-lg">
              {t}
            </span>
          ))}
        </div>

        <p className="text-ink-2 text-sm leading-relaxed mb-3 text-justify">{project.objetivo}</p>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            aria-expanded={open}
            aria-controls={bodyId}
            className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg border border-blue/30 text-blue bg-blue-lt hover:bg-blue hover:text-white hover:border-blue transition-all duration-200 flex-shrink-0"
          >
            {open ? "Cerrar" : "Saber más"}
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      <ProjectBody project={project} open={open} id={bodyId} onClose={onToggle} />
    </div>
  );
}
