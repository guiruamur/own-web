import Link from "next/link";
import { experienceSection, jobs } from "@/data/experience";
import SectionLabel from "@/components/ui/SectionLabel";
import Tag from "@/components/ui/Tag";
import Icon from "@/components/ui/Icon";

export default function ExperiencePreview() {
  return (
    <section id="experiencia" className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop">
        <SectionLabel>{experienceSection.label}</SectionLabel>
        <h2 className="font-headline text-headline-xl-mobile md:text-headline-xl mt-4 mb-12 md:mb-16">
          {experienceSection.heading}
        </h2>

        <div className="space-y-6">
          {jobs.map((job) => (
            <article
              key={`${job.company}-${job.date}`}
              className="p-6 md:p-8 bg-surface-white border border-outline-variant/50 rounded-2xl flex flex-col md:flex-row justify-between gap-6 hover:border-primary hover:shadow-sm transition-all"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-headline text-headline-md">{job.role}</h3>
                  {job.current && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded">
                      Actual
                    </span>
                  )}
                </div>
                <p className="text-primary font-semibold">{job.company}</p>
                <p className="text-text-muted max-w-2xl">{job.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {job.tags.slice(0, 4).map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
              <div className="md:text-right flex-shrink-0">
                <span className="font-label text-label-md text-text-muted">{job.date}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/experiencia"
            className="inline-flex items-center gap-2 font-label text-label-md text-primary border border-outline-variant/50 px-6 py-3 rounded hover:bg-primary-container hover:text-on-primary-container hover:border-transparent transition-all"
          >
            Ver experiencia completa
            <Icon name="arrow_forward" className="text-sm" />
          </Link>
        </div>
      </div>
    </section>
  );
}
