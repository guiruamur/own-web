"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, ExternalLink, MapPin, Calendar, Globe } from "lucide-react";
import Image from "next/image";
import { personal } from "@/data/personal";

const ANIM_END = 280;
const TARGET_Y = 10;
const END_SCALE = 0.30;

export default function Hero() {
  const [imgOk,    setImgOk]   = useState(true);
  const [scrollY,  setScrollY] = useState(0);
  const [initRect, setInitRect] = useState<{ top: number; left: number } | null>(null);
  const [baseFonts, setBaseFonts] = useState({ main: 104, sub: 64 });

  const nameRef        = useRef<HTMLDivElement>(null);
  const mainSpanRef    = useRef<HTMLSpanElement>(null);
  const subSpanRef     = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const measure = () => {
      if (nameRef.current) {
        const r = nameRef.current.getBoundingClientRect();
        setInitRect({ top: r.top, left: r.left });
      }
      if (mainSpanRef.current && subSpanRef.current) {
        setBaseFonts({
          main: parseFloat(window.getComputedStyle(mainSpanRef.current).fontSize),
          sub:  parseFloat(window.getComputedStyle(subSpanRef.current).fontSize),
        });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const isFlying   = scrollY > 0 && initRect !== null;
  const progress   = initRect ? Math.min(1, scrollY / ANIM_END) : 0;
  const scale      = 1 - (1 - END_SCALE) * progress;

  const flyTop     = initRect ? (initRect.top - scrollY) * (1 - progress) + TARGET_Y * progress : 0;
  const flyLeft    = initRect ? initRect.left : 0;
  const flyFontMain = baseFonts.main * scale;
  const flyFontSub  = baseFonts.sub  * scale;

  return (
    <section className="min-h-screen flex items-center bg-bg">

      {/* ── Nombre volador ── */}
      {isFlying && (
        <div
          style={{
            position:      "fixed",
            top:           flyTop,
            left:          flyLeft,
            zIndex:        60,
            pointerEvents: "none",
          }}
        >
          <span
            className="block font-display font-extrabold leading-[1.0] tracking-tight text-ink"
            style={{ fontSize: flyFontMain }}
          >
            {personal.firstName}
          </span>
          <span
            className="block font-display font-extrabold leading-[1.0] tracking-tight text-ink-3"
            style={{ fontSize: flyFontSub }}
          >
            {personal.lastName}
          </span>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12 xl:gap-20 items-center">

          {/* ── Columna izquierda: texto ── */}
          <div>
            <div className="animate-fade-in mb-10">
              <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 bg-white border border-line rounded-full text-ink-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                {personal.availableText}
              </span>
            </div>

            {/* Original h1 — oculto mientras vuela */}
            <div ref={nameRef} style={{ visibility: isFlying ? "hidden" : "visible" }}>
              <h1 className="animate-fade-up font-display font-extrabold leading-[1.0] tracking-tight mb-6">
                <span ref={mainSpanRef} className="block text-[clamp(3.2rem,8vw,6.5rem)] text-ink">
                  {personal.firstName}
                </span>
                <span ref={subSpanRef} className="block text-[clamp(2rem,5vw,4rem)] text-ink-3 font-bold">
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

          {/* ── Columna derecha: foto ── */}
          <div className="animate-fade-up delay-200 flex justify-center lg:justify-end">
            <div className="relative w-[300px] h-[380px] lg:w-[360px] lg:h-[460px] rounded-2xl overflow-hidden border border-line shadow-sm">
              {imgOk ? (
                <Image
                  src={personal.profilePhoto}
                  alt={`${personal.firstName} ${personal.lastName}`}
                  fill
                  className="object-cover object-[20%_top]"
                  priority
                  onError={() => setImgOk(false)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#ECEAE5] text-ink-3 select-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16 mb-4 opacity-25"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                  <p className="text-xs font-medium opacity-40">Tu foto aquí</p>
                  <p className="text-xs font-mono opacity-30 mt-1">public/profile.jpg</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
