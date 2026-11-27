// Ziwen's hand-drawn marks, one meaning each (a private key; not shown on the page):
// - underline: a finding, something research told us
// - wavy: a doubt, still an open question
// - circle: the key word or decision
// - strike: what we tried and dropped
// - asterisk: a favourite part, a personal aside
// - bracket: a one-line summary of a whole passage (drawn beside the paragraph)
// - arrow: why a screen looks like this (on images, see MarginNote)
// Each mark is an SVG laid over the phrase it marks, w by h pixels, drawn with the shared
// .note-arrow dash animation (pathLength 1) over `ms`.
export type MarkKind = "underline" | "wavy" | "circle" | "strike" | "asterisk" | "bracket";

export const markMeaning: Record<MarkKind | "arrow", string> = {
  underline: "a finding",
  wavy: "a doubt",
  circle: "the key word",
  strike: "tried and dropped",
  asterisk: "a favourite part",
  bracket: "a passage, in one line",
  arrow: "why it looks like this",
};

function paths(kind: MarkKind, w: number, h: number): string[] {
  switch (kind) {
    case "underline":
      return [`M-3 ${h + 2}C${w * 0.3} ${h + 4.5} ${w * 0.62} ${h + 0.5} ${w + 5} ${h + 2.5}`];
    case "wavy": {
      // Small even waves, a quick pen wiggle, about 10px each.
      const n = Math.max(3, Math.round((w + 4) / 10));
      const step = (w + 4) / n;
      let d = `M-2 ${h + 3}`;
      for (let i = 0; i < n; i++) d += `q${step / 4} ${i % 2 ? 3 : -3} ${step / 2} 0t${step / 2} 0`;
      return [d];
    }
    case "circle": {
      // A loose loop around the phrase that overshoots where it started, like a quick pen.
      const x0 = -9, y0 = -6, W = w + 18, H = h + 12;
      const X = (f: number) => x0 + W * f, Y = (f: number) => y0 + H * f;
      return [
        `M${X(0.1)} ${Y(0.6)}C${X(0.04)} ${Y(0.2)} ${X(0.35)} ${Y(0.02)} ${X(0.62)} ${Y(0.06)}` +
          `C${X(0.9)} ${Y(0.1)} ${X(1)} ${Y(0.42)} ${X(0.94)} ${Y(0.66)}` +
          `C${X(0.86)} ${Y(0.94)} ${X(0.5)} ${Y(1)} ${X(0.26)} ${Y(0.92)}` +
          `C${X(0.06)} ${Y(0.84)} ${X(0)} ${Y(0.58)} ${X(0.14)} ${Y(0.36)}` +
          `C${X(0.2)} ${Y(0.24)} ${X(0.32)} ${Y(0.16)} ${X(0.46)} ${Y(0.13)}`,
      ];
    }
    case "strike":
      return [`M-2 ${h * 0.58}C${w * 0.3} ${h * 0.5} ${w * 0.7} ${h * 0.64} ${w + 3} ${h * 0.52}`];
    case "asterisk": {
      // Three strokes just above the end of the phrase.
      const cx = w + 7, cy = 2, r = 4.5;
      return [
        `M${cx} ${cy - r}L${cx} ${cy + r}`,
        `M${cx - r * 0.87} ${cy - r / 2}L${cx + r * 0.87} ${cy + r / 2}`,
        `M${cx + r * 0.87} ${cy - r / 2}L${cx - r * 0.87} ${cy + r / 2}`,
      ];
    }
    case "bracket": {
      // A tall soft "}" just right of the paragraph, the full height of the passage.
      const x = w + 14, m = h / 2;
      return [
        `M${x} 2C${x + 6} 2 ${x + 5} ${m * 0.5} ${x + 5} ${m - 6}C${x + 5} ${m - 2} ${x + 9} ${m} ${x + 10} ${m}` +
          `C${x + 9} ${m} ${x + 5} ${m + 2} ${x + 5} ${m + 6}C${x + 5} ${h - m * 0.5} ${x + 6} ${h - 2} ${x} ${h - 2}`,
      ];
    }
  }
}

export default function Mark({ kind, w, h, ms }: { kind: MarkKind; w: number; h: number; ms: number }) {
  const ps = paths(kind, w, h);
  return (
    <svg
      aria-hidden
      className="note-arrow pointer-events-none absolute left-0 top-0 h-full w-full overflow-visible text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ps.map((d, i) => (
        <path
          key={i}
          pathLength={1}
          style={{ transitionDuration: `${ms / ps.length}ms`, transitionDelay: `${(i * ms) / ps.length}ms` }}
          d={d}
        />
      ))}
    </svg>
  );
}
