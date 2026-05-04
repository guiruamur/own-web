import { educationSection, edu, idiomasCard, ctaCard } from "@/data/education";

export default function Education() {
  return (
    <section id="education" className="py-28 bg-bg border-t border-line">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue mb-4">
            {educationSection.label}
          </p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-ink">
            {educationSection.heading}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {edu.map((e, i) => (
            <div key={i} className="bg-white border border-line rounded-xl p-7 hover:border-blue/40 hover:shadow-sm transition-all duration-200">
              <p className="text-xs font-bold text-ink-3 uppercase tracking-wider mb-3">{e.period}</p>
              <h3 className="font-display font-bold text-lg text-ink mb-1 leading-snug">{e.title}</h3>
              <p className="text-sm font-semibold text-blue mb-4">{e.center}</p>
              <p className="text-sm text-ink-2 leading-relaxed">{e.desc}</p>
            </div>
          ))}

          {/* Tarjeta idiomas */}
          <div className="bg-white border border-line rounded-xl p-7 hover:border-blue/40 hover:shadow-sm transition-all duration-200">
            <p className="text-xs font-bold text-ink-3 uppercase tracking-wider mb-3">{idiomasCard.period}</p>
            <h3 className="font-display font-bold text-lg text-ink mb-1">{idiomasCard.title}</h3>
            <p className="text-sm font-semibold text-blue mb-4">{idiomasCard.center}</p>
            <p className="text-sm text-ink-2 leading-relaxed">{idiomasCard.desc}</p>
          </div>

          {/* Tarjeta CTA */}
          <div className="bg-blue rounded-xl p-7 flex flex-col justify-between">
            <p className="text-sm font-semibold text-blue-lt/80 mb-4">{ctaCard.eyebrow}</p>
            <div>
              <h3 className="font-display font-bold text-xl text-white mb-3 leading-snug">{ctaCard.title}</h3>
              <p className="text-sm text-blue-lt/80 leading-relaxed">{ctaCard.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
