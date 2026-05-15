import type { Metadata } from "next";
import { personal } from "@/data/personal";
import { contactSection } from "@/data/contact";
import Reveal from "@/components/Reveal";
import ContactMethodCard from "@/components/contacto/ContactMethodCard";
import QuoteCard from "@/components/contacto/QuoteCard";

export const metadata: Metadata = {
  title:       `Contacto · ${personal.firstName} ${personal.lastName}`,
  description: contactSection.pageSubtitle,
};

export default function ContactoPage() {
  return (
    <main className="pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="mb-12 md:mb-16">
          {personal.available && (
            <div className="flex items-center gap-2 text-primary mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-label text-label-md">{personal.availableText}</span>
            </div>
          )}
          <h1 className="font-headline text-headline-xl-mobile md:text-headline-xl mb-6">
            {contactSection.heading}
          </h1>
          <p className="text-text-muted text-body-lg max-w-2xl">
            {contactSection.pageSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <Reveal>
            <ContactMethodCard
              icon="mail"
              label="EMAIL"
              value={personal.email}
              href={`mailto:${personal.email}`}
            />
          </Reveal>
          <Reveal>
            <ContactMethodCard
              icon="link"
              label="LINKEDIN"
              value="Perfil profesional"
              href={personal.linkedin}
              external
            />
          </Reveal>
          <Reveal>
            <ContactMethodCard
              icon="code"
              label="GITHUB"
              value="@guiruamur"
              href={personal.github}
              external
            />
          </Reveal>
          <Reveal>
            <QuoteCard quote={contactSection.quote} />
          </Reveal>
        </div>
      </div>
    </main>
  );
}
