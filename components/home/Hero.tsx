import Image from "next/image";
import Link from "next/link";
import { personal } from "@/data/personal";
import Icon from "@/components/ui/Icon";

export default function Hero() {
  return (
    <section className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop pt-32 pb-20 lg:py-32">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-highest text-primary rounded-full font-label text-label-sm">
            <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
            {personal.availableText}
          </div>

          <div>
            <p className="font-label text-label-md text-primary mb-4 border-l-4 border-primary pl-4">
              {personal.role}
            </p>
            <h1 className="font-headline text-headline-xl-mobile md:text-headline-xl text-on-surface mb-6">
              Construyendo un futuro a mi alrededor.
            </h1>
            <p className="font-body text-body-lg text-text-muted max-w-xl">
              {personal.bio}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contacto"
              className="group bg-primary text-on-primary px-8 py-4 rounded-xl font-label text-label-md flex items-center gap-2 hover:shadow-lg transition-all"
            >
              Contactar
              <Icon name="arrow_forward" className="text-sm group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-outline-variant bg-surface-white text-on-surface px-8 py-4 rounded-xl font-label text-label-md flex items-center gap-2 hover:bg-surface-container-low transition-all"
            >
              <Icon name="link" className="text-sm" /> LinkedIn
            </a>
          </div>

          <div className="flex flex-wrap gap-6 pt-4 text-text-muted">
            <div className="flex items-center gap-2">
              <Icon name="location_on" className="text-primary" /> {personal.location}
            </div>
            <div className="flex items-center gap-2">
              <Icon name="work_history" className="text-primary" /> Experiencia desde {personal.experienceSince}
            </div>
            <div className="flex items-center gap-2">
              <Icon name="translate" className="text-primary" /> Inglés {personal.english}
            </div>
            <div className="flex items-center gap-2">
              <Icon name="directions_car" className="text-primary" /> Permiso de conducir {personal.license}
            </div>
          </div>
        </div>

        <div className="flex-1 relative w-full max-w-md lg:max-w-none">
          <div className="aspect-[20/23] rounded-2xl overflow-hidden bg-surface-container-high relative z-10">
            <Image
              src={personal.profilePhoto}
              alt={`${personal.firstName} ${personal.lastName}`}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 480px"
              className="object-cover"
            />
          </div>
          <div className="hidden lg:block absolute -bottom-6 -right-6 w-full h-full border-2 border-primary-container/20 rounded-2xl -z-0" />
        </div>
      </div>
    </section>
  );
}
