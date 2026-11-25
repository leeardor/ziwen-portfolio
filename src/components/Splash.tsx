"use client";

import { useEffect, useRef } from "react";
import { SPLASH_STROKES, SPLASH_TOTAL_MS, SPLASH_VIEWBOX } from "./splash-strokes";

// First visit only: "Ziwen's archive" is written stroke by stroke, then the site appears.
// The head script in layout.tsx decides whether to show it (data-splash on <html>).
const HOLD_MS = 500;
const FADE_MS = 400;

export default function Splash() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (!html.hasAttribute("data-splash")) return;
    try {
      localStorage.setItem("zw-visited", "1");
    } catch {}

    let done = false;
    const leave = () => {
      if (done) return;
      done = true;
      ref.current?.classList.add("splash-leave");
      window.setTimeout(() => html.removeAttribute("data-splash"), FADE_MS);
    };
    const timer = window.setTimeout(leave, SPLASH_TOTAL_MS + HOLD_MS);
    window.addEventListener("pointerdown", leave);
    window.addEventListener("keydown", leave);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointerdown", leave);
      window.removeEventListener("keydown", leave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="splash fixed inset-0 z-50 items-center justify-center bg-background"
    >
      <svg viewBox={SPLASH_VIEWBOX} className="w-[80vw] max-w-[560px] text-accent">
        {SPLASH_STROKES.map((s, i) => (
          <path
            key={i}
            d={s.d}
            pathLength={1}
            className="splash-stroke"
            style={{ animationDelay: `${s.delay}ms`, animationDuration: `${s.dur}ms` }}
          />
        ))}
      </svg>
    </div>
  );
}
