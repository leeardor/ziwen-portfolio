"use client";

import { useEffect, useRef, useState } from "react";

// A project image (or video) with Ziwen's handwritten note, drawn like pen marks in a margin.
// - circle: an optional loose hand-drawn loop around the part of the image that matters,
//   given as a box in percent of the image.
// - arrow: always the same hand-drawn return key pointing back at the image (one style
//   across the site; mixing styles looked messy).
// - lines: two or three short lines, slightly tilted; lines never wrap, so keep them short.
// When the image scrolls into view the circle and arrow draw themselves, then the lines are
// written out one after another, left to right. Plays once; with reduced motion all is there.
// Below 1024px the margin is too narrow, so the note sits under the image and the arrow
// turns to point up.
export type Note = {
  lines: string[];
  circle?: { x: number; y: number; w: number; h: number };
};

// The return-key arrow, [shaft, head], drawn in a 44 x 30 box, pointing left.
const shaft = "M38 2c.6 5 .3 10 .2 15.5c-.1 2.2-1.6 3.3-4 3.4C25 21.2 15 20.6 5 21.3";
const head = "M11 15.2L4.6 21.2l6.6 5.6";

export default function MarginNote({ note, children }: { note?: Note; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !note) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [note]);

  const circle = note?.circle ? 420 : 0; // ms to draw the loop on the image
  const arrow = 260; // ms to draw the arrow
  const perLine = 360; // ms to write one line

  return (
    <figure ref={ref} className={`lg:grid lg:grid-cols-9 lg:gap-x-6 ${on ? "note-on" : ""}`}>
      <div className="relative lg:col-span-7">
        {children}
        {note?.circle && (
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="note-arrow pointer-events-none absolute overflow-visible text-accent"
            style={{ left: `${note.circle.x}%`, top: `${note.circle.y}%`, width: `${note.circle.w}%`, height: `${note.circle.h}%` }}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          >
            {/* A loose loop that overshoots where it started, as a pen would. No
                non-scaling-stroke: it breaks the dash maths and the loop stops short. */}
            <path
              pathLength={1}
              style={{ transitionDuration: `${circle}ms` }}
              d="M10 56C5 26 38 4 63 8C89 12 99 40 93 62C87 88 52 97 29 91C9 86 1 62 11 40C17 27 30 18 46 15"
            />
          </svg>
        )}
      </div>
      {note && (
        <div aria-hidden className="mt-3 text-accent lg:col-span-2 lg:mt-0 lg:self-center">
          <div className="w-fit origin-top-left -rotate-[5deg]">
            <svg viewBox="0 0 44 30" className="note-arrow h-[1.25rem] w-auto rotate-90 lg:rotate-0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path pathLength={1} style={{ transitionDuration: `${arrow}ms`, transitionDelay: `${circle}ms` }} d={shaft} />
              <path pathLength={1} style={{ transitionDuration: "120ms", transitionDelay: `${circle + arrow}ms` }} d={head} />
            </svg>
            <p className="mt-1 font-hand text-[1.5rem] leading-[1.1]">
              {note.lines.map((l, i) => (
                <span
                  key={l}
                  className="note-line block w-fit whitespace-nowrap"
                  style={{ transitionDuration: `${perLine}ms`, transitionDelay: `${circle + arrow + 60 + i * perLine}ms` }}
                >
                  {l}
                </span>
              ))}
            </p>
          </div>
        </div>
      )}
    </figure>
  );
}
