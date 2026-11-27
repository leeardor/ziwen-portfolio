"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Rose follows the pointer: entering from the top fills the text from the top,
// entering from the bottom fills it from the bottom; leaving works the same way.
// The .rise gradient is five times the text height: rest, soft edge, rose, soft edge, rest.
// 0 0 and 0 100% show only rest colour, 0 50% only rose; the soft edges pass in between. Mouse and trackpad only.
const CENTER = "0 50%";

function setRise(host: Element, position: string, jumpFrom?: string) {
  host.querySelectorAll<HTMLElement>(".rise").forEach((el) => {
    if (jumpFrom) {
      el.style.transition = "none";
      el.style.backgroundPosition = jumpFrom;
      void el.offsetWidth; // apply the jump before animating
      el.style.transition = "";
    }
    el.style.backgroundPosition = position;
  });
}

const fromTop = (host: Element, y: number) => {
  const r = host.getBoundingClientRect();
  return y < r.top + r.height / 2;
};

export default function RiseDirection() {
  // Clicking a link navigates without a pointerout, and Next keeps the page as it was
  // (cacheComponents), so coming back showed the clicked word still rose. On every page
  // change, every word jumps back to its rest colour (no animation).
  const pathname = usePathname();
  useEffect(() => {
    document.querySelectorAll<HTMLElement>(".rise").forEach((el) => {
      if (!el.style.backgroundPosition) return;
      el.style.transition = "none";
      el.style.backgroundPosition = "";
      void el.offsetWidth;
      el.style.transition = "";
    });
  }, [pathname]);

  useEffect(() => {
    const over = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const host = (e.target as Element).closest?.(".rise-host");
      if (!host || host.contains(e.relatedTarget as Node)) return;
      setRise(host, CENTER, fromTop(host, e.clientY) ? "0 100%" : "0 0");
    };
    const out = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const host = (e.target as Element).closest?.(".rise-host");
      if (!host || host.contains(e.relatedTarget as Node)) return;
      setRise(host, fromTop(host, e.clientY) ? "0 100%" : "0 0");
    };
    // Touch screens have no hover: a tap always fills from the bottom, then the rose
    // carries on upward and out.
    const down = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      const host = (e.target as Element).closest?.(".rise-host");
      if (!host) return;
      setRise(host, CENTER, "0 0");
      window.setTimeout(() => setRise(host, "0 100%"), 600);
    };
    document.addEventListener("pointerdown", down);
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);
    return () => {
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
    };
  }, []);
  return null;
}
