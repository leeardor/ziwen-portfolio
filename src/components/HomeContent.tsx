"use client";

import Link from "next/link";
import { useRef } from "react";
import { capitalise, type Discipline, disciplines, indexLine, indexOrder, intro } from "@/lib/content";
import { useMode } from "@/lib/mode";

const grid = "grid grid-cols-4 gap-x-4 md:grid-cols-12 md:gap-x-6";

// Light ink wash over images so off-white text stays readable on any photo.
const shade = "linear-gradient(rgb(18 18 18 / 0.35), rgb(18 18 18 / 0.35))";

// No widows: the last two words of a paragraph or line group never split.
const noWidow = (s: string) => s.replace(/ (\S+\s*)$/, "\u00a0$1");

const isKeyword = (p: (typeof intro)[number] | undefined) =>
  typeof p === "object" && p !== null && "discipline" in p;

export default function HomeContent() {
  const mode = useMode();
  const preview = useRef<HTMLDivElement>(null);

  // Pointer position goes straight to the DOM via a ref: no React render per frame.
  const show = (d: Discipline) => {
    const el = preview.current;
    if (!el || !window.matchMedia("(hover: hover)").matches) return;
    el.style.background = `${shade}, url(${d.image}) center / cover, ${d.preview}`;
    const label = capitalise(d.label);
    el.textContent = label;
    el.style.opacity = "1";
  };
  const move = (e: React.PointerEvent) => {
    const el = preview.current;
    if (!el) return;
    // Flip to the other side of the pointer when the box would leave the screen.
    const x = e.clientX + 16 + el.offsetWidth > window.innerWidth ? e.clientX - 16 - el.offsetWidth : e.clientX + 16;
    const y = e.clientY + 16 + el.offsetHeight > window.innerHeight ? e.clientY - 16 - el.offsetHeight : e.clientY + 16;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const hide = () => {
    if (preview.current) preview.current.style.opacity = "0";
  };

  // One preview box shared by both modes.
  const previewBox = (
    <div
      ref={preview}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-40 flex h-[240px] w-[360px] items-end p-2 text-caption text-on-accent opacity-0 transition-opacity duration-150"
    />
  );

  if (mode === "index") {
    return (
      <section>
        <p>{noWidow(indexLine)}</p>
        <ul className="mt-8 border-t border-hairline">
          {indexOrder.map((slug, i) => {
            const d = disciplines[slug];
            return (
              <li key={slug} className="border-b border-hairline">
                <Link
                  href={`/${d.slug}`}
                  onPointerEnter={() => show(d)}
                  onPointerMove={move}
                  onPointerLeave={hide}
                  className={`${grid} py-3 transition-colors duration-150 hover:text-accent`}
                >
                  <span className="tabular col-span-1">{String(i + 1).padStart(2, "0")}</span>
                  <span className="col-span-3 md:col-span-11">{capitalise(d.label)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        {previewBox}
      </section>
    );
  }

  const nodes = intro.map((part, i) => {
    if (typeof part === "string") {
      // Words touching a keyword are rendered with it (see below), so trim them here.
      let s = part;
      if (isKeyword(intro[i - 1])) s = s.replace(/^\S*/, "");
      if (isKeyword(intro[i + 1])) s = s.replace(/\S+\s*$/, "");
      const next = intro[i + 1];
      if (next === undefined || (typeof next === "object" && "break" in next)) s = noWidow(s);
      return s;
    }
    if ("break" in part) return null; // group boundary, see groups below
    const d = disciplines[part.discipline];
    const prev = intro[i - 1];
    const next = intro[i + 1];
    // Glue the word before and the punctuation after to the keyword, so a line
    // never ends on a lone word or starts with a comma.
    const before = typeof prev === "string" ? (prev.match(/(\S+)\s*$/)?.[1] ?? "") : "";
    const after = typeof next === "string" ? (next.match(/^\S*/)?.[0] ?? "") : "";
    return (
      <span key={i} className="whitespace-nowrap">
        {before && `${before} `}
        <Link
          href={`/${d.slug}`}
          onPointerEnter={() => show(d)}
          onPointerMove={move}
          onPointerLeave={hide}
          className="kw rise-host px-[5px] [background:var(--chip)]"
          style={{ "--chip": `${shade}, url(${d.image}) center / cover, ${d.preview}` } as React.CSSProperties}
        >
          {/* On hover rose rises through the text from the bottom (image stays). */}
          <span className="rise">{d.label}</span>
        </Link>
        {after}
      </span>
    );
  });

  // Split at the line breaks into sentence groups.
  const groups: React.ReactNode[][] = [[]];
  intro.forEach((part, i) => {
    if (typeof part === "object" && "break" in part) groups.push([]);
    else groups[groups.length - 1].push(nodes[i]);
  });

  return (
    <section className={grid}>
      {/* Each sentence group is its own balanced block, so lines in a group stay close in length. */}
      <p className="col-span-4 text-intro md:col-span-8 md:text-intro-lg">
        {groups.map((g, gi) => (
          <span key={gi} className="block [text-wrap:balance]">
            {g}
          </span>
        ))}
      </p>
      {previewBox}
    </section>
  );
}
