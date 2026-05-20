import { skillsSection, skillGroups, languages, extras } from "@/data/skills";
import SectionLabel from "@/components/ui/SectionLabel";

export default function StackPreview() {
  return (
    <section id="stack" className="py-24 md:py-32 bg-background-alt">
      <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center">
          <SectionLabel className="inline-block">{skillsSection.label}</SectionLabel>
          <h2 className="font-headline text-headline-xl-mobile md:text-headline-xl mt-4 mb-12 md:mb-16">
            {skillsSection.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {skillGroups.map((g) => (
            <div
              key={g.category}
              className="p-6 md:p-8 bg-surface-white rounded-2xl shadow-sm border border-outline-variant/20"
            >
              <h4 className="font-label text-label-md text-primary mb-6">{g.category}</h4>
              <div className="flex flex-wrap gap-3">
                {g.skills.map((s) => (
                  <span
                    key={s}
                    className="px-4 py-2 bg-background rounded-lg font-label text-label-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="p-6 md:p-8 bg-surface-white rounded-2xl shadow-sm border border-outline-variant/20">
            <h4 className="font-label text-label-md text-primary mb-6">Idiomas</h4>
            <div className="space-y-3">
              {[...languages, ...extras].map((l) => (
                <div key={l.name} className="flex justify-between items-center">
                  <span className="font-label text-label-sm">{l.name}</span>
                  <span className="text-xs text-primary font-bold px-2 py-1 bg-primary-fixed rounded">
                    {l.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
