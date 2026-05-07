"use client";

import { useState } from "react";
import { experienceSection, jobs } from "@/data/experience";
import JobCard from "./experience/JobCard";

export default function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            <JobCard
              key={i}
              job={job}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              bodyId={`job-body-${i}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
