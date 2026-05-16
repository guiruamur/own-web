import Image from "next/image";

type Props = {
  photos:     string[];
  paragraphs: string[];
  alt:        string;
};

export default function JobPhotoLayout({ photos, paragraphs, alt }: Props) {
  const half  = Math.ceil(paragraphs.length / 2);
  const first = paragraphs.slice(0, half);
  const rest  = paragraphs.slice(half);

  return (
    <>
      <PhotoBlock side="right" src={photos[0]} alt={`${alt} foto 1`} paragraphs={first} />
      <PhotoBlock side="left"  src={photos[1]} alt={`${alt} foto 2`} paragraphs={rest}  />
    </>
  );
}

type BlockProps = {
  side:       "left" | "right";
  src:        string;
  alt:        string;
  paragraphs: string[];
};

function PhotoBlock({ side, src, alt, paragraphs }: BlockProps) {
  const float = side === "right" ? "float-right ml-4" : "float-left mr-4";
  return (
    <div className={`overflow-hidden ${side === "right" ? "mb-3" : ""}`}>
      <div className={`${float} mb-2 w-2/5 relative aspect-[4/3] rounded-lg overflow-hidden border border-outline-variant/40`}>
        <Image src={src} alt={alt} fill sizes="40vw" className="object-cover" />
      </div>
      {paragraphs.map((p, i) => (
        <p key={i} className="text-text-muted text-body-md leading-relaxed mb-3 text-justify">{p}</p>
      ))}
    </div>
  );
}
