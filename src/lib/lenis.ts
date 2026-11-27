import type Lenis from "lenis";

// The page's smooth-scroll instance (see components/SmoothScroll), so other parts can scroll
// through it. Null in Safari, with reduced motion, or before it starts.
let current: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  current = l;
};

// Scroll to the top: eased through Lenis when it is running, otherwise the browser's own glide
// (a plain jump with reduced motion).
export function scrollToTop() {
  if (current) return current.scrollTo(0, { duration: 1.1 });
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}
