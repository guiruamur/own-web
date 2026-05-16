type Props = { quote: string };

export default function QuoteCard({ quote }: Props) {
  return (
    <div className="p-6 bg-surface-container-low rounded-xl border border-outline-variant/20">
      <p className="text-on-surface font-body text-body-md italic leading-relaxed">
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  );
}
