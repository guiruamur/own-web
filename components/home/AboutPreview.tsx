import { aboutSection, aboutContent } from "@/data/about";
import { personal } from "@/data/personal";
import SectionLabel from "@/components/ui/SectionLabel";
import Icon from "@/components/ui/Icon";

export default function AboutPreview() {
  return (
    <section id="sobre-mi" className="bg-surface-container-lowest py-24 md:py-32 border-y border-outline-variant/30">
      <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <SectionLabel>{aboutSection.label}</SectionLabel>
            <h2 className="font-headline text-headline-xl-mobile md:text-headline-xl mt-4 mb-8">
              {aboutSection.heading}
            </h2>
            <div className="space-y-6 text-text-muted font-body text-body-md">
              {aboutContent.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-2 text-primary font-label text-label-md hover:underline"
              >
                {personal.email} →
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-fit">
            {aboutContent.traits.map((t) => (
              <div
                key={t.title}
                className="p-6 bg-background rounded-xl border border-outline-variant/30"
              >
                <Icon name={t.icon} fill className="text-primary mb-4" />
                <h4 className="font-headline text-headline-md text-on-surface mb-2">{t.title}</h4>
                <p className="text-text-muted font-body text-body-md">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
