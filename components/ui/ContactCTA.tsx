import Link from "next/link";
import { personal } from "@/data/personal";
import { contactSection } from "@/data/contact";
import Icon from "./Icon";

type Props = { variant: "solid" | "dotted" };

export default function ContactCTA({ variant }: Props) {
  if (variant === "solid") {
    return (
      <section className="py-24 md:py-32 bg-primary-container text-on-primary">
        <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <span className="font-label text-label-md text-primary-fixed-dim uppercase tracking-widest">
            {contactSection.label}
          </span>
          <h2 className="font-headline text-headline-xl-mobile md:text-headline-xl text-on-primary mt-6 mb-8">
            {contactSection.heading}
          </h2>
          <p className="font-body text-body-lg text-on-primary-container max-w-2xl mx-auto mb-12">
            {contactSection.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${personal.email}`}
              className="bg-surface-white text-primary px-8 py-4 rounded-xl font-label text-label-md flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <Icon name="mail" /> {personal.email}
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary/20 backdrop-blur-sm border border-primary-fixed-dim/30 text-on-primary px-8 py-4 rounded-xl font-label text-label-md flex items-center gap-3 hover:bg-primary/40 transition-all"
            >
              <Icon name="link" /> LinkedIn
            </a>
          </div>
        </div>
      </section>
    );
  }

  // dotted variant
  return (
    <section className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop">
      <div className="bg-surface-container-highest rounded-2xl p-8 md:p-12 text-center border border-outline-variant/30 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#00288e 1px, transparent 1px)",
            backgroundSize:  "20px 20px",
          }}
        />
        <h2 className="font-headline text-headline-lg mb-4 relative">¿Hablamos de tu próximo proyecto?</h2>
        <p className="text-text-muted text-body-lg mb-8 max-w-xl mx-auto relative">
          {contactSection.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
          <a
            href={`mailto:${personal.email}`}
            className="bg-primary text-on-primary px-8 py-3 rounded-lg font-label text-label-md flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-transform"
          >
            <Icon name="mail" /> {personal.email}
          </a>
          <Link
            href="/contacto"
            className="bg-surface-white border border-outline-variant text-on-surface px-8 py-3 rounded-lg font-label text-label-md flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors"
          >
            <Icon name="arrow_forward" /> Ir a contacto
          </Link>
        </div>
      </div>
    </section>
  );
}
