"use client";

import { useEffect, useState } from "react";

// Project pages only: takes the place of the Notes / Index pill. Same pill, fixed in the
// pill's corner, fades in (200ms) once the page has scrolled half a screen; at the end of
// the page it sits exactly where the pill would be. Off-white fill so images pass under it.
export default function ToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const check = () => setShown(window.scrollY > window.innerHeight / 2);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={shown ? 0 : -1}
      className={`pill rise-host fixed bottom-8 right-4 z-10 translate-y-[3px] cursor-pointer select-none rounded-full border border-foreground bg-background px-3.5 py-0.5 transition-opacity duration-200 md:bottom-10 md:right-10 ${shown ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <span className="rise">Top</span>
    </button>
  );
}
