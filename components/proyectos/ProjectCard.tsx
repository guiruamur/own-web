"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { Project } from "@/data/projects";
import Icon from "@/components/ui/Icon";
import Tag from "@/components/ui/Tag";

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  );
}

type Props = {
  project:  Project;
  reversed: boolean;
};

export default function ProjectCard({ project, reversed }: Props) {
  const [open, setOpen] = useState(false);
  const bodyId = useId();

  return (
    <article
      onClick={() => { if (!open) setOpen(true); }}
      className={`group bg-surface-white border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300 p-6 md:p-12 ${
        !open ? "cursor-pointer" : ""
      }`}
    >
      <div className={`flex flex-col gap-8 items-start ${reversed ? "md:flex-row-reverse" : "md:flex-row"}`}>
        <div className="flex-1 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-headline text-headline-lg text-on-surface">{project.title}</h2>
            {project.current && (
              <span className="bg-surface-container-low text-secondary px-3 py-1 rounded text-label-sm font-label border border-secondary-container/30 uppercase tracking-tighter">
                Actual
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <p className="font-body text-body-md text-text-muted leading-relaxed">{project.objetivo}</p>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
            aria-expanded={open}
            aria-controls={bodyId}
            className="inline-flex items-center gap-2 font-label text-label-md text-primary border border-outline-variant/50 px-6 py-3 rounded hover:bg-primary-container hover:text-on-primary-container hover:border-transparent transition-all"
          >
            {open ? "Cerrar" : "Saber más"}
            <Icon name={open ? "expand_less" : "arrow_outward"} className="text-sm" />
          </button>
        </div>

        <div className="w-full md:w-5/12 aspect-video rounded-lg overflow-hidden bg-surface-container-low border border-outline-variant/20 flex items-center justify-center relative">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <Icon name={project.icon} className="text-6xl text-outline-variant" />
          )}
        </div>
      </div>

      <div
        id={bodyId}
        role="region"
        className={`grid transition-all duration-500 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100 mt-8" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-outline-variant/30 pt-6 space-y-4">
            {project.cuerpo.map((p, i) => (
              <p key={i} className="text-text-muted text-body-md leading-relaxed text-justify">{p}</p>
            ))}
            {(project.links?.live || project.links?.github) && (
              <div className="flex flex-wrap gap-3 pt-4">
                {project.links?.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-surface-white border border-outline-variant/50 text-on-surface font-label text-label-md rounded-lg hover:border-primary hover:text-primary transition-colors"
                  >
                    <Icon name="open_in_new" className="text-sm" />
                    Ver en vivo
                  </a>
                )}
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-surface-white border border-outline-variant/50 text-on-surface font-label text-label-md rounded-lg hover:border-primary hover:text-primary transition-colors"
                  >
                    <GithubIcon size={16} />
                    GitHub
                  </a>
                )}
              </div>
            )}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setOpen(false); }}
                tabIndex={open ? 0 : -1}
                className="inline-flex items-center gap-1.5 font-label text-label-md px-4 py-2 rounded-lg border border-primary/30 text-primary bg-primary-fixed/30 hover:bg-primary hover:text-on-primary hover:border-primary transition-all"
              >
                Cerrar
                <Icon name="expand_less" className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
