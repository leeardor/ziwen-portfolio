"use client";

import Link from "next/link";
import { type Keyword, usePreview } from "./preview";

// Plain text, a highlighted keyword link, or { em } for the one Garamond italic phrase a
// paragraph may have (1 to 3 words, docs/design-rules.md). { break: true } only separates
// groups in the data; the paragraph itself runs on with no forced line breaks.
export type Part = string | { keyword: Keyword } | { em: string } | { break: true };

// Light ink wash over images so off-white text stays readable on any photo.
const shade = (a = 0.35) => `linear-gradient(rgb(18 18 18 / ${a}), rgb(18 18 18 / ${a}))`;

// No widows: the last two words of a paragraph never split.
const noWidow = (s: string) => s.replace(/ (\S+\s*)$/, "\u00a0$1");

const isKeyword = (p: Part | undefined): p is { keyword: Keyword } =>
  typeof p === "object" && p !== null && "keyword" in p;

// The Notes-mode paragraph used on the home page and the discipline pages.
export default function KeywordParagraph({ parts }: { parts: Part[] }) {
  const { show, move, hide, box } = usePreview();

  // The word before a keyword is glued to it, unless it ends a sentence: a keyword that
  // starts a sentence may begin a line on its own.
  const glueBefore = (p: Part | undefined) => {
    if (typeof p !== "string") return "";
    const w = p.match(/(\S+)\s*$/)?.[1] ?? "";
    return /[.!?:]$/.test(w) ? "" : w;
  };

  const nodes = parts.map((part, i) => {
    if (typeof part === "string") {
      // Words touching a keyword are rendered with it (see below), so trim them here.
      let s = part;
      if (isKeyword(parts[i - 1])) s = s.replace(/^\S*/, "");
      if (isKeyword(parts[i + 1]) && glueBefore(part)) s = s.replace(/\S+\s*$/, "");
      // One- and two-letter words ("I", "At", "on") stay with the next word, never alone at a line end.
      s = s.replace(/(^|\s)(\S{1,2}) /g, "$1$2\u00a0");
      const next = parts[i + 1];
      if (next === undefined || (typeof next === "object" && "break" in next)) s = noWidow(s);
      return s;
    }
    if ("break" in part) return null;
    if ("em" in part) {
      // Garamond runs small next to Schibsted, so it is set 1.14 times larger.
      return (
        <em key={i} className="whitespace-nowrap font-serif italic [font-size:1.14em] [line-height:1]">
          {part.em}
        </em>
      );
    }
    const k = part.keyword;
    const prev = parts[i - 1];
    const next = parts[i + 1];
    // Glue the word before and the punctuation after to the keyword, so a line
    // never ends on a lone word or starts with a comma.
    const before = glueBefore(prev);
    const after = typeof next === "string" ? (next.match(/^\S*/)?.[0] ?? "") : "";
    const fill = k.image ? `${shade(k.wash)}, url(${k.image}) center / cover, ${k.preview}` : k.preview;
    return (
      <span key={i} className="whitespace-nowrap">
        {before && `${before} `}
        <Link
          href={k.href}
          onPointerEnter={() => show(k)}
          onPointerMove={move}
          onPointerLeave={hide}
          className="kw rise-host px-[5px] [background:var(--chip)]"
          style={{ "--chip": fill } as React.CSSProperties}
        >
          {/* On hover rose rises through the text (image stays). */}
          <span className="rise">{k.label}</span>
        </Link>
        {after}
      </span>
    );
  });

  // Groups run on as one paragraph, separated by a space.
  const groups: React.ReactNode[][] = [[]];
  parts.forEach((part, i) => {
    if (typeof part === "object" && "break" in part) groups.push([]);
    else groups[groups.length - 1].push(nodes[i]);
  });

  return (
    <>
      {/* One continuous balanced paragraph: lines stay close in length, no forced breaks. */}
      <p className="col-span-4 text-intro [text-wrap:balance] md:col-span-8 md:text-intro-lg">
        {groups.map((g, gi) => (
          <span key={gi}>
            {gi > 0 && " "}
            {g}
          </span>
        ))}
      </p>
      {box}
    </>
  );
}
