import Image from "next/image";
import Link from "next/link";
import { projectsSection, projects } from "@/data/projects";
import SectionLabel from "@/components/ui/SectionLabel";
import Tag from "@/components/ui/Tag";
import Icon from "@/components/ui/Icon";

export default function ProjectsPreview() {
  return (
    <section id="proyectos" className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop">
        <SectionLabel>{projectsSection.label}</SectionLabel>
        <h2 className="font-headline text-headline-xl-mobile md:text-headline-xl mt-4 mb-12 md:mb-16">
          {projectsSection.heading}
        </h2>

        <div className="space-y-12 md:space-y-16">
          {projects.slice(0, 3).map((p, i) => {
            const reversed = i % 2 === 1;
            return (
              <article
                key={p.title}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-headline text-headline-md">{p.title}</h3>
                    {p.current && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded">
                        Actual
                      </span>
                    )}
                  </div>
                  <p className="text-text-muted">{p.objetivo}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.technologies.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg border border-outline-variant/30 aspect-video bg-surface-container-high flex items-center justify-center relative">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 600px"
                      className="object-cover"
                    />
                  ) : (
                    <Icon name={p.icon} className="text-6xl text-outline-variant" />
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/proyectos"
            className="inline-flex items-center gap-2 font-label text-label-md text-primary border border-outline-variant/50 px-6 py-3 rounded hover:bg-primary-container hover:text-on-primary-container hover:border-transparent transition-all"
          >
            Ver todos los proyectos
            <Icon name="arrow_forward" className="text-sm" />
          </Link>
        </div>
      </div>
    </section>
  );
}
