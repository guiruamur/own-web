"use client";

import { useId, useState } from "react";
import type { Job } from "@/data/experience";
import Icon from "@/components/ui/Icon";
import Tag from "@/components/ui/Tag";
import JobPhotoLayout from "./JobPhotoLayout";

type Props = { job: Job };

export default function JobCard({ job }: Props) {
  const [open, setOpen] = useState(false);
  const bodyId = useId();
  const hasFloatLayout = job.extra.photos.length === 2;

  return (
    <div className="relative pl-12 md:pl-16 group">
      <div
        className={`absolute left-2.5 md:left-4.5 top-1.5 w-3 h-3 md:w-4 md:h-4 border-4 border-surface rounded-full z-10 group-hover:scale-125 transition-transform shadow-sm ${
          job.current ? "bg-primary" : "bg-outline-variant"
        }`}
      />
      <div
        onClick={() => { if (!open) setOpen(true); }}
        className={`bg-surface-white border border-outline-variant/30 p-6 rounded-xl shadow-sm hover:shadow-md hover:border-primary transition-all duration-300 ${
          !open ? "cursor-pointer" : ""
        }`}
      >
        <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
          <div>
            <h3 className="font-headline text-headline-md">{job.role}</h3>
            <p className="text-primary font-semibold">
              {job.company}
              {job.current && (
                <span className="ml-2 px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed text-[10px] rounded uppercase">
                  Actual
                </span>
              )}
            </p>
          </div>
          <span className="text-label-sm font-label text-text-muted bg-surface-container-low px-3 py-1 rounded-full">
            {job.date}
          </span>
        </div>

        <p className="text-text-muted text-body-md mb-6 leading-relaxed">{job.desc}</p>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {job.tags.map((t) => (
              <Tag key={t} className="uppercase tracking-tighter">{t}</Tag>
            ))}
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
            aria-expanded={open}
            aria-controls={bodyId}
            className="flex items-center gap-1.5 font-label text-label-md px-4 py-2 rounded-lg border border-primary/30 text-primary bg-primary-fixed/30 hover:bg-primary hover:text-on-primary hover:border-primary transition-all"
          >
            {open ? "Cerrar" : "Saber más"}
            <Icon name="expand_more" className={`text-sm transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        </div>

        <div
          id={bodyId}
          role="region"
          className={`grid transition-all duration-500 ease-in-out ${
            open ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-outline-variant/30 pt-6">
              {hasFloatLayout ? (
                <JobPhotoLayout
                  photos={job.extra.photos}
                  paragraphs={job.extra.paragraphs}
                  alt={job.company}
                />
              ) : (
                <div className="space-y-4">
                  {job.extra.paragraphs.map((p, i) => (
                    <p key={i} className="text-text-muted text-body-md leading-relaxed text-justify">{p}</p>
                  ))}
                </div>
              )}
              <div className="clear-both flex justify-end mt-6">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setOpen(false); }}
                  tabIndex={open ? 0 : -1}
                  className="flex items-center gap-1.5 font-label text-label-md px-4 py-2 rounded-lg border border-primary/30 text-primary bg-primary-fixed/30 hover:bg-primary hover:text-on-primary hover:border-primary transition-all"
                >
                  Cerrar
                  <Icon name="expand_less" className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
