import Image from "next/image";
import Link from "next/link";
import { personal } from "@/data/personal";
import Icon from "@/components/ui/Icon";
import TerminalAnimation from "@/components/home/TerminalAnimation";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0a0f1e]">
      {/* Animated terminal background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center p-4 md:p-8 pointer-events-none">
        <TerminalAnimation className="w-full max-w-5xl h-full max-h-[640px] md:-translate-x-64" />
      </div>
      {/* Scrim: darker on the left (text), lighter on the right so the terminal breathes */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-[#0a0f1e]/80 via-[#0a0f1e]/50 to-[#0a0f1e]/20" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop pt-32 pb-20 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/10 text-primary-fixed-dim rounded-full font-label text-label-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              {personal.availableText}
            </div>

            <div className="relative">
              {/* Feathered, blurred backing only behind role + title + bio */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 md:-inset-8 rounded-[2rem] bg-[#0a0f1e]/40 backdrop-blur"
                style={{
                  WebkitMaskImage: "radial-gradient(ellipse at center, #000 30%, transparent 100%)",
                  maskImage: "radial-gradient(ellipse at center, #000 30%, transparent 100%)",
                }}
              />
              <div className="relative">
                <p className="font-label text-label-md text-primary-fixed-dim mb-4 border-l-4 border-primary-fixed-dim pl-4">
                  {personal.role}
                </p>
                <h1 className="font-headline text-headline-xl-mobile md:text-headline-xl text-white mb-6">
                  Construyendo un futuro a mi alrededor.
                </h1>
                <p className="font-body text-body-lg text-slate-300 max-w-xl">
                  {personal.bio}
                </p>
              </div>
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
                className="border border-white/20 bg-white/5 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-label text-label-md flex items-center gap-2 hover:bg-white/10 transition-all"
              >
                <Icon name="link" className="text-sm" /> LinkedIn
              </a>
            </div>

            <div className="flex flex-wrap gap-6 pt-4 text-slate-300">
              <div className="flex items-center gap-2">
                <Icon name="location_on" className="text-primary-fixed-dim" /> {personal.location}
              </div>
              <div className="flex items-center gap-2">
                <Icon name="work_history" className="text-primary-fixed-dim" /> Experiencia desde {personal.experienceSince}
              </div>
              <div className="flex items-center gap-2">
                <Icon name="translate" className="text-primary-fixed-dim" /> Inglés {personal.english}
              </div>
              <div className="flex items-center gap-2">
                <Icon name="directions_car" className="text-primary-fixed-dim" /> Permiso de conducir {personal.license}
              </div>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-md lg:max-w-none">
            <div className="aspect-[20/23] rounded-2xl overflow-hidden bg-surface-container-high relative z-10 shadow-2xl">
              <Image
                src={personal.profilePhoto}
                alt={`${personal.firstName} ${personal.lastName}`}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 480px"
                className="object-cover"
              />
            </div>
            <div className="hidden lg:block absolute -bottom-6 -right-6 w-full h-full border-2 border-white/15 rounded-2xl -z-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
