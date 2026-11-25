"use client";

import { useEffect, useRef } from "react";

// First visit only: "Ziwen's archive" writes itself in, then the site appears.
// The head script in layout.tsx decides whether to show it (data-splash on <html>).
const WRITE_MS = 2600;
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
    const timer = window.setTimeout(leave, WRITE_MS);
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
      <span className="splash-word font-hand text-display text-accent md:text-display-lg">
        Ziwen&rsquo;s archive
      </span>
    </div>
  );
}
