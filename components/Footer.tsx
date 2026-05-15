import { personal } from "@/data/personal";

export default function Footer() {
  return (
    <footer className="w-full py-12 bg-background border-t border-outline-variant/50">
      <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-headline text-headline-md font-bold text-on-surface">
            Guillermo Ruano
          </span>
          <p className="font-label text-label-sm text-text-muted">
            © {new Date().getFullYear()} {personal.firstName} {personal.lastName}. {personal.location}.
          </p>
        </div>
        <div className="flex gap-8">
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-label-sm text-text-muted hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="font-label text-label-sm text-text-muted hover:text-primary transition-colors"
          >
            Email
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-label-sm text-text-muted hover:text-primary transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
