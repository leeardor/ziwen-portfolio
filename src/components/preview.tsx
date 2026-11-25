"use client";

import { useRef } from "react";

// A highlighted word that links somewhere and shows an image on hover.
export type Keyword = {
  label: string;
  href: string;
  preview: string; // fallback colour while the image loads (or when there is none yet)
  image?: string;
  caption?: string; // text in the hover preview; defaults to the label
};

const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// One hover preview box shared by every keyword on a page (desktop only).
// Pointer position goes straight to the DOM via a ref: no React render per frame.
export function usePreview() {
  const ref = useRef<HTMLDivElement>(null);

  const show = (k: Keyword) => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover)").matches) return;
    // No grey wash on the preview: only a soft shadow at the bottom behind the caption.
    const img = k.image ? `url(${k.image}) center / cover, ` : "";
    el.style.background = `linear-gradient(to top, rgb(18 18 18 / 0.45), transparent 35%), ${img}${k.preview}`;
    el.textContent = k.caption ?? capitalise(k.label);
    el.style.opacity = "1";
  };
  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    // Right of the pointer first: near the right edge the box slides left just enough to fit
    // (it sits below the pointer, so it never covers it). Only vertically does it flip above.
    const cx = Math.max(8, Math.min(e.clientX + 16, window.innerWidth - el.offsetWidth - 8));
    const below = e.clientY + 16 + el.offsetHeight <= window.innerHeight - 8;
    const cy = Math.max(8, below ? e.clientY + 16 : e.clientY - 16 - el.offsetHeight);
    el.style.transform = `translate(${cx}px, ${cy}px)`;
  };
  const hide = () => {
    if (ref.current) ref.current.style.opacity = "0";
  };

  const box = (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-40 flex h-[240px] w-[360px] items-end p-2 text-caption text-on-accent opacity-0 transition-opacity duration-150"
    />
  );

  return { show, move, hide, box };
}
