"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { experienceSection, jobs } from "@/data/experience";

export default function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="experience" className="py-28 bg-bg border-t border-line">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue mb-4">
            {experienceSection.label}
          </p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-ink">
            {experienceSection.heading}
          </h2>
        </div>

        <div className="space-y-4">
          {jobs.map((job, i) => (
            <div
              key={i}
              className={`bg-white border rounded-xl transition-all duration-200 hover:border-blue/40 hover:shadow-sm ${
                job.current ? "border-blue/50" : "border-line"
              }`}
            >
              {/* Cabecera */}
              <div className="p-4 md:p-5">
                <div className="flex flex-wrap gap-4 justify-between items-start mb-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-display font-bold text-xl text-ink">{job.role}</h3>
                      {job.current && (
                        <span className="text-xs font-semibold px-2.5 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded-full">
                          Actual
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-blue">{job.company}</p>
                  </div>
                  <span className="text-sm text-ink-3 bg-white border border-line px-3 py-1 rounded-lg flex-shrink-0">
                    {job.date}
                  </span>
                </div>

                <p className="text-ink-2 text-sm leading-relaxed mb-3 text-justify">{job.desc}</p>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((t) => (
                      <span key={t} className="text-xs font-medium px-2.5 py-1 bg-white border border-line text-ink-3 rounded-lg">
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => toggle(i)}
                    className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg border border-blue/30 text-blue bg-blue-lt hover:bg-blue hover:text-white hover:border-blue transition-all duration-200 flex-shrink-0"
                  >
                    {openIndex === i ? "Cerrar" : "Saber más"}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
              </div>

              {/* Contenido expandible */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === i ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 md:px-8 pb-8 border-t border-line pt-6">
                  {job.extra.photos.length === 2 ? (
                    <>
                      <div className="overflow-hidden mb-3">
                        <div className="float-right ml-4 mb-2 w-2/5 relative aspect-[4/3] rounded-lg overflow-hidden border border-line">
                          <Image src={job.extra.photos[0]} alt={`${job.company} foto 1`} fill className="object-cover" />
                        </div>
                        {job.extra.paragraphs.slice(0, Math.ceil(job.extra.paragraphs.length / 2)).map((p, j) => (
                          <p key={j} className="text-ink-2 text-sm leading-relaxed mb-3 text-justify">{p}</p>
                        ))}
                      </div>
                      <div className="overflow-hidden">
                        <div className="float-left mr-4 mb-2 w-2/5 relative aspect-[4/3] rounded-lg overflow-hidden border border-line">
                          <Image src={job.extra.photos[1]} alt={`${job.company} foto 2`} fill className="object-cover" />
                        </div>
                        {job.extra.paragraphs.slice(Math.ceil(job.extra.paragraphs.length / 2)).map((p, j) => (
                          <p key={j} className="text-ink-2 text-sm leading-relaxed mb-3 text-justify">{p}</p>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      {job.extra.paragraphs.map((p, j) => (
                        <p key={j} className="text-ink-2 text-sm leading-relaxed">{p}</p>
                      ))}
                      {!job.extra.hidePhotos && job.extra.photos.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                          {job.extra.photos.map((src, j) => (
                            <div key={j} className="relative aspect-video rounded-lg overflow-hidden border border-line">
                              <Image src={src} alt={`${job.company} foto ${j + 1}`} fill className="object-cover" />
                            </div>
                          ))}
                        </div>
                      ) : !job.extra.hidePhotos ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                          {[1, 2, 3].map((n) => (
                            <div key={n} className="aspect-video rounded-lg border border-dashed border-line bg-white flex flex-col items-center justify-center text-ink-3">
                              <svg className="w-6 h-6 mb-1 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <p className="text-[10px] opacity-40">Foto {n}</p>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
