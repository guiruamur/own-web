import type { Metadata } from "next";
import { personal } from "@/data/personal";
import { experienceSection } from "@/data/experience";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactCTA from "@/components/ui/ContactCTA";
import ExperienceTimeline from "@/components/experiencia/ExperienceTimeline";
import EducationList from "@/components/experiencia/EducationList";
import LanguagesCard from "@/components/experiencia/LanguagesCard";

export const metadata: Metadata = {
  title:       `Experiencia · ${personal.firstName} ${personal.lastName}`,
  description: experienceSection.pageIntro,
};

export default function ExperienciaPage() {
  return (
    <main className="pt-32 pb-24">
      <section className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop mb-12 md:mb-16">
        <div className="flex flex-col gap-4">
          <SectionLabel>{experienceSection.pageEyebrow}</SectionLabel>
          <h1 className="font-headline text-headline-xl-mobile md:text-headline-xl text-on-surface max-w-2xl">
            {experienceSection.pageHeading}
          </h1>
          <p className="text-text-muted text-body-lg max-w-xl">
            {experienceSection.pageIntro}
          </p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-12">
        <Reveal className="lg:col-span-7">
          <ExperienceTimeline />
        </Reveal>
        <div className="lg:col-span-5 space-y-12">
          <Reveal>
            <EducationList />
          </Reveal>
          <Reveal>
            <LanguagesCard />
          </Reveal>
        </div>
      </div>

      <div className="mt-20 md:mt-24">
        <Reveal>
          <ContactCTA variant="dotted" />
        </Reveal>
      </div>
    </main>
  );
}
