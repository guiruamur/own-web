import type { EduEntry } from "@/data/education";

type Props = { entry: EduEntry };

export default function EduCard({ entry }: Props) {
  return (
    <div className="bg-surface-container-low border border-outline-variant/20 p-6 rounded-xl">
      <span className="text-label-sm font-label text-text-muted block mb-2">{entry.period}</span>
      <h4 className="font-headline text-headline-md mb-1 leading-tight">{entry.title}</h4>
      <p className="text-secondary font-semibold text-body-md mb-3">{entry.center}</p>
      <p className="text-text-muted text-body-md">{entry.desc}</p>
    </div>
  );
}
