import { edu } from "@/data/education";
import Icon from "@/components/ui/Icon";
import EduCard from "./EduCard";

export default function EducationList() {
  return (
    <section>
      <div className="flex items-center gap-4 mb-8">
        <Icon name="school" className="text-secondary bg-secondary-fixed p-2 rounded-full" />
        <h2 className="font-headline text-headline-lg">Educación</h2>
      </div>
      <div className="space-y-6">
        {edu.map((e) => (
          <EduCard key={e.title} entry={e} />
        ))}
      </div>
    </section>
  );
}
