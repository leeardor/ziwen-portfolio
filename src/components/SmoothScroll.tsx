"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";
import { setLenis } from "@/lib/lenis";

// Safari (on a Mac, iPhone or iPad) runs script-driven animation at 60 frames a second while
// its own scrolling runs at the screen's full rate, so a script scroller lags there. Safari
// keeps native scrolling; Chrome, Edge, Arc and Firefox get the smooth scroll.
const isSafari = () => {
  const ua = navigator.userAgent;
  return /Safari/.test(ua) && !/Chrome|Chromium|CriOS|FxiOS|Edg|OPR|Android/.test(ua);
};

// Smooth scrolling on every page (Ziwen's pick): the mouse wheel and trackpad glide and ease
// to a stop instead of jumping. Touch keeps native scrolling. Off in Safari (see above) and
// with reduced motion; paused while the first-visit splash holds the page still.
export default function SmoothScroll() {
  useEffect(() => {
    if (isSafari() || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1.05, syncTouch: false });
    setLenis(lenis);

    let frame = requestAnimationFrame(function raf(t) {
      lenis.raf(t);
      frame = requestAnimationFrame(raf);
    });

    const html = document.documentElement;
    const follow = () => (html.hasAttribute("data-splash") ? lenis.stop() : lenis.start());
    follow();
    const mo = new MutationObserver(follow);
    mo.observe(html, { attributes: true, attributeFilter: ["data-splash"] });

    return () => {
      cancelAnimationFrame(frame);
      mo.disconnect();
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
