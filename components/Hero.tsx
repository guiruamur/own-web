"use client";

import { ArrowRight, ExternalLink, MapPin, Calendar, Globe } from "lucide-react";
import { personal } from "@/data/personal";
import FlyingName from "./hero/FlyingName";
import ProfilePhoto from "./hero/ProfilePhoto";
import { useFlyingName } from "./hero/useFlyingName";

export default function Hero() {
  const { containerRef, mainRef, subRef, style } = useFlyingName();

  return (
    <section className="min-h-screen flex items-center bg-bg">

      <FlyingName
        firstName={personal.firstName}
        lastName={personal.lastName}
        style={style}
      />

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12 xl:gap-20 items-center">

          {/* Columna izquierda: texto */}
          <div>
            <div className="animate-fade-in mb-10">
              <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 bg-white border border-line rounded-full text-ink-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                {personal.availableText}
              </span>
            </div>

            {/* Nombre original — oculto mientras vuela el clon */}
            <div ref={containerRef} style={{ visibility: style.visible ? "hidden" : "visible" }}>
              <h1 className="animate-fade-up font-display font-extrabold leading-[1.0] tracking-tight mb-6">
                <span ref={mainRef} className="block text-[clamp(3.2rem,8vw,6.5rem)] text-ink">
                  {personal.firstName}
                </span>
                <span ref={subRef} className="block text-[clamp(2rem,5vw,4rem)] text-ink-3 font-bold">
                  {personal.lastName}
                </span>
              </h1>
            </div>

            <div className="animate-fade-up delay-100 flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-blue" />
              <p className="text-base font-semibold text-blue tracking-wide">
                {personal.role}
              </p>
            </div>

            <p className="animate-fade-up delay-200 text-ink-2 text-lg leading-relaxed max-w-lg mb-10">
              {personal.bio}
            </p>

            <div className="animate-fade-up delay-300 flex flex-wrap gap-3 mb-14">
              <a
                href="#contact"
                className="group flex items-center gap-2 px-6 py-3 bg-blue text-white font-semibold text-sm rounded-lg hover:bg-blue-dk transition-colors duration-200"
              >
                Contactar
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white border border-line text-ink-2 font-semibold text-sm rounded-lg hover:border-blue hover:text-blue transition-colors duration-200"
              >
                <ExternalLink size={15} />
                LinkedIn
              </a>
            </div>

            <div className="animate-fade-up delay-400 flex flex-wrap gap-6 pt-8 border-t border-line">
              <span className="flex items-center gap-2 text-sm text-ink-3">
                <MapPin size={14} className="text-blue flex-shrink-0" />
                {personal.location}
              </span>
              <span className="flex items-center gap-2 text-sm text-ink-3">
                <Calendar size={14} className="text-blue flex-shrink-0" />
                Experiencia desde {personal.experienceSince}
              </span>
              <span className="flex items-center gap-2 text-sm text-ink-3">
                <Globe size={14} className="text-blue flex-shrink-0" />
                Inglés {personal.english}
              </span>
            </div>
          </div>

          <ProfilePhoto
            src={personal.profilePhoto}
            alt={`${personal.firstName} ${personal.lastName}`}
          />

        </div>
      </div>
    </section>
  );
}
