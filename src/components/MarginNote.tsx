"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { queueNote } from "@/lib/note-queue";

// A project image (or video) with Ziwen's handwritten note, like quick pen notes in a margin
// (after Studio Ethos on Pinterest; a long leader line across the image was too loud). The
// note is a few short lines in a connected pen hand, sitting at about the height of what
// it talks about (`to.y`, percent of the image); a short curved flick with a small open
// arrowhead points from the note to the image's edge.
// - circle: an optional loose hand-drawn loop on the image (built, not in use for now).
// When the image scrolls into view the arrow draws itself, then the note is written out line
// by line, left to right. Plays once; with reduced motion everything is simply there.
// From 1280px the note sits in the margin at about the height of its target; below that the
// margin is too narrow, so the note sits under the image and the arrow flicks up to it.
export type Note = {
  lines: string[];
  to: { x: number; y: number };
  circle?: { x: number; y: number; w: number; h: number };
};

type Geo = { line: string; head: string };

export default function MarginNote({ note, children }: { note?: Note; children: React.ReactNode }) {
  const fig = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLParagraphElement>(null);
  const [on, setOn] = useState(false);
  const [geo, setGeo] = useState<Geo | null>(null);

  // Play once when scrolled into view.
  useEffect(() => {
    const el = fig.current;
    if (!el || !note) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io.disconnect();
          queueNote(() => setOn(true)); // after the first scroll, one note at a time
        }
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [note]);

  // The arrow, measured in the figure's own coordinates, redrawn whenever the layout changes.
  useLayoutEffect(() => {
    const f = fig.current, m = media.current, t = text.current;
    if (!note || !f || !m || !t) return;
    const draw = () => {
      const fr = f.getBoundingClientRect(), mr = m.getBoundingClientRect(), tr = t.getBoundingClientRect();
      const beside = tr.left >= mr.right - 1;
      let sx: number, sy: number, ex: number, ey: number, c1: [number, number], c2: [number, number];
      if (beside) {
        // A short quick hook from just left of the first line to the image's edge,
        // like a pen flick in a margin; it points at the image, not across it.
        sx = tr.left - fr.left - 6;
        sy = tr.top - fr.top + 12;
        ex = mr.right - fr.left + 8;
        ey = sy - 30;
        c1 = [sx - 4, sy - 22];
        c2 = [ex + 16, ey + 2];
      } else {
        // Note under the image: a short flick up to the image's bottom edge.
        sx = tr.left - fr.left + 4;
        sy = tr.top - fr.top - 6;
        ex = sx + 26;
        ey = mr.bottom - fr.top + 6;
        c1 = [sx - 6, sy - 16];
        c2 = [ex - 16, ey + 8];
      }
      // Small open arrowhead along the direction the line arrives in.
      const a = Math.atan2(ey - c2[1], ex - c2[0]);
      const h = 6, s = 0.55;
      const p = (k: number) => `${ex - h * Math.cos(a + k)} ${ey - h * Math.sin(a + k)}`;
      setGeo({
        line: `M${sx} ${sy}C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${ex} ${ey}`,
        head: `M${p(s)}L${ex} ${ey}L${p(-s)}`,
      });
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(f);
    document.fonts?.ready.then(draw);
    return () => ro.disconnect();
  }, [note]);

  const circle = note?.circle ? 420 : 0; // ms to draw the loop on the image
  const lead = 240; // ms to draw the arrow
  const perLine = 360; // ms to write one line

  return (
    <figure ref={fig} className={`relative ${on ? "note-on" : ""}`}>
      <div ref={media} className="relative">
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
            {/* No non-scaling-stroke: it breaks the dash maths and the loop stops short. */}
            <path pathLength={1} style={{ transitionDuration: `${circle}ms` }} d="M10 56C5 26 38 4 63 8C89 12 99 40 93 62C87 88 52 97 29 91C9 86 1 62 11 40C17 27 30 18 46 15" />
          </svg>
        )}
      </div>
      {note && (
        <>
          <div aria-hidden className="relative mt-10 text-accent xl:absolute xl:inset-y-0 xl:left-full xl:mt-0 xl:w-64">
            {/* In the margin the note sits a little below its target, so the line curves up to it. */}
            <p
              ref={text}
              className="w-fit origin-top-left -rotate-2 font-hand text-[0.9375rem] leading-[1.6] xl:absolute xl:left-8"
              style={{ top: `calc(${Math.min(note.to.y, 78)}% + 20px)` }}
            >
              {note.lines.map((l, i) => (
                <span
                  key={l}
                  className="note-line block w-fit whitespace-nowrap"
                  style={{ transitionDuration: `${perLine}ms`, transitionDelay: `${circle + lead + 40 + i * perLine}ms` }}
                >
                  {l}
                </span>
              ))}
            </p>
          </div>
          {geo && (
            <svg aria-hidden className="note-arrow pointer-events-none absolute inset-0 h-full w-full overflow-visible text-accent" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path pathLength={1} style={{ transitionDuration: `${lead}ms`, transitionDelay: `${circle}ms` }} d={geo.line} />
              <path pathLength={1} style={{ transitionDuration: "120ms", transitionDelay: `${circle + lead}ms` }} d={geo.head} />
            </svg>
          )}
        </>
      )}
    </figure>
  );
}
