"use client";

import { useEffect, useRef, useState } from "react";

const ANIM_END  = 280;
const TARGET_Y  = 10;
const END_SCALE = 0.30;

type Rect = { top: number; left: number };

export type FlyingNameStyle = {
  visible:  boolean;
  top:      number;
  left:     number;
  fontMain: number;
  fontSub:  number;
};

/**
 * Tracks scroll position via rAF and computes the position/size of a
 * "flying" copy of the hero name as it shrinks toward the top-left corner.
 *
 * Returns refs to attach to the original name container and its two text
 * spans (used to measure starting position and font sizes), plus the
 * computed style for the flying overlay.
 */
export function useFlyingName() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef      = useRef<HTMLSpanElement>(null);
  const subRef       = useRef<HTMLSpanElement>(null);

  const [style, setStyle] = useState<FlyingNameStyle>({
    visible: false, top: 0, left: 0, fontMain: 104, fontSub: 64,
  });

  const baseRef = useRef<{ rect: Rect; main: number; sub: number } | null>(null);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current || !mainRef.current || !subRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      baseRef.current = {
        rect: { top: r.top + window.scrollY, left: r.left },
        main: parseFloat(window.getComputedStyle(mainRef.current).fontSize),
        sub:  parseFloat(window.getComputedStyle(subRef.current).fontSize),
      };
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const base = baseRef.current;
      if (!base) return;

      const scrollY  = window.scrollY;
      const progress = Math.min(1, scrollY / ANIM_END);
      const scale    = 1 - (1 - END_SCALE) * progress;
      const naturalY = base.rect.top - scrollY;

      setStyle({
        visible:  scrollY > 0,
        top:      naturalY * (1 - progress) + TARGET_Y * progress,
        left:     base.rect.left,
        fontMain: base.main * scale,
        fontSub:  base.sub  * scale,
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return { containerRef, mainRef, subRef, style };
}
