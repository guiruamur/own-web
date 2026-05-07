import Image from "next/image";

type Props = {
  src: string;
  alt: string;
};

export default function ProfilePhoto({ src, alt }: Props) {
  return (
    <div className="animate-fade-up delay-200 flex justify-center lg:justify-end">
      <div className="relative w-[300px] h-[380px] lg:w-[360px] lg:h-[460px] rounded-2xl overflow-hidden border border-line shadow-sm">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-[20%_top]"
          priority
        />
      </div>
    </div>
  );
}
