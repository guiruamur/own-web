import type { Job } from "@/data/experience";
import JobPhotoLayout from "./JobPhotoLayout";

type Props = {
  job:  Job;
  open: boolean;
  id:   string;
};

/**
 * Expandable body of a job card. Animates open/close with a CSS grid trick
 * (`grid-template-rows: 0fr → 1fr`) so it adapts to the actual content
 * height without magic max-height numbers.
 */
export default function JobBody({ job, open, id }: Props) {
  const hasFloatLayout = job.extra.photos.length === 2;

  return (
    <div
      id={id}
      role="region"
      className={`grid transition-all duration-500 ease-in-out ${
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">
        <div className="px-6 md:px-8 pb-8 border-t border-line pt-6">
          {hasFloatLayout ? (
            <JobPhotoLayout
              photos={job.extra.photos}
              paragraphs={job.extra.paragraphs}
              alt={job.company}
            />
          ) : (
            <div className="space-y-4">
              {job.extra.paragraphs.map((p, i) => (
                <p key={i} className="text-ink-2 text-sm leading-relaxed">{p}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
