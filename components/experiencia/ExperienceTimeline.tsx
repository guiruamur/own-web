import { jobs } from "@/data/experience";
import Icon from "@/components/ui/Icon";
import JobCard from "./JobCard";

export default function ExperienceTimeline() {
  return (
    <section>
      <div className="flex items-center gap-4 mb-8">
        <Icon name="work" className="text-primary bg-primary-fixed p-2 rounded-full" />
        <h2 className="font-headline text-headline-lg">Experiencia</h2>
      </div>
      <div className="space-y-8 relative before:content-[''] before:absolute before:left-4 md:before:left-6 before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/30">
        {jobs.map((job) => (
          <JobCard key={`${job.company}-${job.date}`} job={job} />
        ))}
      </div>
    </section>
  );
}
