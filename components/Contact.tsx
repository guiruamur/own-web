import { Mail, ExternalLink } from "lucide-react";
import { personal } from "@/data/personal";
import { contactSection } from "@/data/contact";

export default function Contact() {
  return (
    <section id="contact" className="py-28 bg-white border-t border-line">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue mb-4">
            {contactSection.label}
          </p>
          <h2 className="font-display font-extrabold text-5xl md:text-6xl text-ink leading-tight mb-6">
            {contactSection.heading}
          </h2>
          <p className="text-ink-2 text-lg leading-relaxed mb-10">
            {contactSection.subtitle}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-2 px-6 py-3.5 bg-blue text-white font-semibold text-sm rounded-lg hover:bg-blue-dk transition-colors duration-200"
            >
              <Mail size={15} />
              {personal.email}
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 bg-bg border border-line text-ink-2 font-semibold text-sm rounded-lg hover:border-blue hover:text-blue transition-colors duration-200"
            >
              <ExternalLink size={15} />
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-line">
          <p className="text-sm text-ink-3">
            {personal.firstName} {personal.lastName} · {personal.location} · {personal.year}
          </p>
        </div>
      </div>
    </section>
  );
}
