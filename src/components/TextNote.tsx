"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { queueNote } from "@/lib/note-queue";
import Copy from "./Copy";
import Mark, { type MarkKind } from "./Mark";

// A paragraph Ziwen marked by hand and a few handwritten lines about it, the way you mark up
// an article you are reading. One phrase (_like this_ in the text) gets the mark (underline,
// wavy line, circle, strike or asterisk; see Mark for what each means); a bracket marks the
// whole paragraph instead. From 1280px the note sits in the right margin at the height of the
// mark; below that it sits under the paragraph. When the paragraph scrolls into view (after
// the first scroll, one note at a time) the mark draws itself, then the note is written out
// line by line. Plays once; with reduced motion it is all there.
export default function TextNote({ text, note, mark = "underline" }: { text: string; note: string[]; mark?: MarkKind }) {
  const box = useRef<HTMLDivElement>(null);
  const phrase = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0, top: 0 });
  const whole = mark === "bracket";

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io.disconnect();
          queueNote(() => setOn(true));
        }
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The marked phrase (or the whole paragraph, for a bracket), kept current on resize.
  useLayoutEffect(() => {
    const b = box.current, m = phrase.current;
    if (!b) return;
    const measure = () => {
      if (whole || !m) return setSize({ w: b.offsetWidth, h: b.offsetHeight, top: 0 });
      setSize({ w: m.offsetWidth, h: m.offsetHeight, top: m.getBoundingClientRect().top - b.getBoundingClientRect().top });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(b);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [whole]);

  const lead = mark === "circle" ? 420 : 320; // ms to draw the mark
  const perLine = 360; // ms to write one line
  const drawn = size.w > 0 && <Mark kind={mark} w={size.w} h={size.h} ms={lead} />;

  return (
    <div ref={box} className={`relative ${on ? "note-on" : ""}`}>
      <Copy text={text} markRef={phrase} underline={whole ? null : drawn} />
      {whole && drawn}
      <p
        aria-hidden
        className={`mt-4 w-fit origin-top-left -rotate-2 font-hand text-[0.9375rem] leading-[1.6] text-accent xl:absolute xl:left-full xl:mt-0 ${whole ? "xl:ml-12" : "xl:ml-8"}`}
        style={{ top: `${size.top - 4}px` }}
      >
        {note.map((l, i) => (
          <span
            key={l}
            className="note-line block w-fit whitespace-nowrap"
            style={{ transitionDuration: `${perLine}ms`, transitionDelay: `${lead + 60 + i * perLine}ms` }}
          >
            {/* An asterisk in the text gets its twin at the start of the note, like a footnote. */}
            {i === 0 && mark === "asterisk" && (
              <svg aria-hidden viewBox="-5 -5 10 10" className="mr-1.5 inline-block size-[0.6em] -translate-y-[0.35em] overflow-visible" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                <path d="M0 -4.5V4.5M-3.9 -2.25L3.9 2.25M3.9 -2.25L-3.9 2.25" vectorEffect="non-scaling-stroke" />
              </svg>
            )}
            {l}
          </span>
        ))}
      </p>
    </div>
  );
}
