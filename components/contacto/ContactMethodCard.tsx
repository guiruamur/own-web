import Icon from "@/components/ui/Icon";

type Props = {
  href:      string;
  label:     string;
  value:     string;
  icon:      string;
  external?: boolean;
};

export default function ContactMethodCard({ href, label, value, icon, external }: Props) {
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" as const } : {};
  return (
    <a
      href={href}
      {...externalProps}
      className="group flex items-center p-6 bg-surface-white border border-outline-variant/50 rounded-xl hover:border-primary hover:shadow-md transition-all"
    >
      <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
        <Icon name={icon} />
      </div>
      <div className="ml-4">
        <p className="font-label text-label-sm text-text-muted">{label}</p>
        <p className="font-headline text-headline-md text-primary">{value}</p>
      </div>
    </a>
  );
}
