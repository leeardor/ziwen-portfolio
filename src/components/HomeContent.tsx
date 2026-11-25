"use client";

import Link from "next/link";
import { useRef } from "react";
import { capitalise, disciplines, indexLine, indexOrder, intro } from "@/lib/content";
import { useMode } from "@/lib/mode";

const grid = "grid grid-cols-4 gap-x-4 md:grid-cols-12 md:gap-x-6";

export default function HomeContent() {
  const mode = useMode();
  const preview = useRef<HTMLDivElement>(null);

  // Pointer position goes straight to the DOM via a ref: no React render per frame.
  const show = (colour: string, label: string) => {
    const el = preview.current;
    if (!el || !window.matchMedia("(hover: hover)").matches) return;
    el.style.background = colour;
    el.textContent = label;
    el.style.opacity = "1";
  };
  const move = (e: React.PointerEvent) => {
    const el = preview.current;
    if (el) el.style.transform = `translate(${e.clientX + 16}px, ${e.clientY + 16}px)`;
  };
  const hide = () => {
    if (preview.current) preview.current.style.opacity = "0";
  };

  if (mode === "index") {
    return (
      <section>
        <p>{indexLine}</p>
        <ul className="mt-8 border-t border-hairline">
          {indexOrder.map((slug, i) => {
            const d = disciplines[slug];
            return (
              <li key={slug} className="border-b border-hairline">
                <Link
                  href={`/${d.slug}`}
                  className={`${grid} py-3 transition-colors duration-150 hover:text-accent`}
                >
                  <span className="tabular col-span-1">{String(i + 1).padStart(2, "0")}</span>
                  <span className="col-span-3 md:col-span-11">{capitalise(d.label)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }

  return (
    <section className={grid}>
      <p className="col-span-4 text-intro md:col-span-8 md:text-intro-lg">
        {intro.map((part, i) => {
          if (typeof part === "string") return part;
          if ("break" in part) return <br key={i} />;
          const d = disciplines[part.discipline];
          return (
            <Link
              key={i}
              href={`/${d.slug}`}
              onPointerEnter={() => show(d.preview, capitalise(d.label))}
              onPointerMove={move}
              onPointerLeave={hide}
              className="px-[5px] text-on-accent [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
              style={{ background: d.preview }}
            >
              {d.label}
            </Link>
          );
        })}
      </p>
      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 flex h-[160px] w-[240px] items-end p-2 text-caption text-on-accent opacity-0 transition-opacity duration-150"
      />
    </section>
  );
}
