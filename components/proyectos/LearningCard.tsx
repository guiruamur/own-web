import { learningCard } from "@/data/projects";
import Icon from "@/components/ui/Icon";

export default function LearningCard() {
  return (
    <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-8 md:p-12 text-center">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-fixed text-primary mb-6">
        <Icon name={learningCard.icon} fill className="text-2xl" />
      </div>
      <h2 className="font-headline text-headline-md md:text-headline-lg text-on-surface mb-4 max-w-2xl mx-auto">
        {learningCard.title}
      </h2>
      <p className="font-body text-body-lg text-text-muted max-w-2xl mx-auto">
        {learningCard.text}
      </p>
    </div>
  );
}
