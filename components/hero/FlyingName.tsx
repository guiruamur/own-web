"use client";

import type { FlyingNameStyle } from "./useFlyingName";

type Props = {
  firstName: string;
  lastName:  string;
  style:     FlyingNameStyle;
};

export default function FlyingName({ firstName, lastName, style }: Props) {
  if (!style.visible) return null;

  return (
    <div
      aria-hidden
      style={{
        position:      "fixed",
        top:           style.top,
        left:          style.left,
        zIndex:        60,
        pointerEvents: "none",
      }}
    >
      <span
        className="block font-display font-extrabold leading-[1.0] tracking-tight text-ink"
        style={{ fontSize: style.fontMain }}
      >
        {firstName}
      </span>
      <span
        className="block font-display font-extrabold leading-[1.0] tracking-tight text-ink-3"
        style={{ fontSize: style.fontSub }}
      >
        {lastName}
      </span>
    </div>
  );
}
