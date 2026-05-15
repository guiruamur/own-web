import { languages } from "@/data/skills";
import { languagesCard } from "@/data/education";
import Icon from "@/components/ui/Icon";

export default function LanguagesCard() {
  return (
    <div className="bg-primary text-on-primary p-8 rounded-xl shadow-lg relative overflow-hidden">
      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <h3 className="font-headline text-headline-md mb-6 flex items-center gap-3 relative">
        <Icon name="translate" />
        {languagesCard.heading}
      </h3>
      <ul className="space-y-4 font-label text-label-md relative">
        {languages.map((l, i) => (
          <li
            key={l.name}
            className={`flex justify-between ${i < languages.length - 1 ? "border-b border-white/10 pb-2" : ""}`}
          >
            <span>{l.name}</span>
            <span className="text-primary-fixed-dim">{l.level}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/5 relative">
        <p className="text-body-md italic leading-relaxed">&ldquo;{languagesCard.quote}&rdquo;</p>
      </div>
    </div>
  );
}
