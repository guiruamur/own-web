type Props = {
  children:   React.ReactNode;
  className?: string;
};

export default function Tag({ children, className = "" }: Props) {
  return (
    <span className={`inline-block bg-background-alt text-text-muted px-3 py-1 rounded font-label text-label-sm ${className}`}>
      {children}
    </span>
  );
}
