type Props = {
  children:   React.ReactNode;
  line?:      boolean;
  tone?:      "primary" | "on-dark";
  className?: string;
};

export default function SectionLabel({ children, line = false, tone = "primary", className = "" }: Props) {
  const labelColor = tone === "on-dark" ? "text-primary-fixed-dim" : "text-primary";
  const lineColor  = tone === "on-dark" ? "bg-white/20" : "bg-outline-variant/50";

  const label = (
    <span className={`font-label text-label-md ${labelColor} uppercase tracking-widest`}>
      {children}
    </span>
  );

  if (!line) return <div className={className}>{label}</div>;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {label}
      <div className={`h-px ${lineColor} flex-grow`} />
    </div>
  );
}
