import { aboutSection, aboutContent } from "@/data/about";
import { personal } from "@/data/personal";

export default function About() {
  return (
    <section id="about" className="py-28 bg-white border-t border-line">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Izquierda */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue mb-4">
              {aboutSection.label}
            </p>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl text-ink leading-tight mb-6">
              {aboutSection.heading}
            </h2>
            {aboutContent.paragraphs.map((p, i) => (
              <p key={i} className="text-ink-2 text-base leading-relaxed mb-4">{p}</p>
            ))}
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue hover:underline underline-offset-4"
            >
              {personal.email} →
            </a>
          </div>

          {/* Derecha: aptitudes */}
          <div className="space-y-4">
            {aboutContent.traits.map((t) => (
              <div key={t.title} className="flex gap-4 p-5 bg-bg border border-line rounded-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-blue mt-2 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm text-ink mb-1">{t.title}</p>
                  <p className="text-sm text-ink-3 leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
