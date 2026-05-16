type Props = {
  children:   React.ReactNode;
  line?:      boolean;
  className?: string;
};

export default function SectionLabel({ children, line = false, className = "" }: Props) {
  const label = (
    <span className="font-label text-label-md text-primary uppercase tracking-widest">
      {children}
    </span>
  );

  if (!line) return <div className={className}>{label}</div>;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {label}
      <div className="h-px bg-outline-variant/50 flex-grow" />
    </div>
  );
}
