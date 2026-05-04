import { skillsSection, skillGroups, languages } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="py-28 bg-white border-t border-line">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue mb-4">
            {skillsSection.label}
          </p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-ink">
            {skillsSection.heading}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((g) => (
            <div key={g.category} className="bg-bg border border-line rounded-xl p-6 hover:border-blue/40 hover:shadow-sm transition-all duration-200">
              <h3 className="font-display font-bold text-sm text-ink mb-4">{g.category}</h3>
              <div className="flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <span key={s} className="text-xs font-medium px-3 py-1.5 bg-white border border-line text-ink-2 rounded-lg">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-bg border border-line rounded-xl p-6 hover:border-blue/40 hover:shadow-sm transition-all duration-200">
            <h3 className="font-display font-bold text-sm text-ink mb-4">Idiomas</h3>
            <div className="space-y-3">
              {languages.map((l) => (
                <div key={l.name} className="flex items-center justify-between">
                  <span className="text-sm text-ink-2">{l.name}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 border rounded-lg ${l.style}`}>
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
