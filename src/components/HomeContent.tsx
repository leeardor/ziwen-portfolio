"use client";

import Link from "next/link";
import { capitalise, disciplineKeyword, disciplines, indexLine, indexOrder, intro } from "@/lib/content";
import { useMode } from "@/lib/mode";
import KeywordParagraph, { type Part } from "./KeywordParagraph";
import { usePreview } from "./preview";

const grid = "grid grid-cols-4 gap-x-4 md:grid-cols-12 md:gap-x-6";

// No widows: the last two words of a line never split.
const noWidow = (s: string) => s.replace(/ (\S+\s*)$/, "\u00a0$1");

function IndexList() {
  const { show, move, hide, box } = usePreview();
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
                onPointerEnter={() => show(disciplineKeyword(d))}
                onPointerMove={move}
                onPointerLeave={hide}
                className={`${grid} rise-host py-3`}
              >
                <span className="rise tabular col-span-1 justify-self-start">{String(i + 1).padStart(2, "0")}</span>
                <span className="col-span-3 md:col-span-11"><span className="rise">{capitalise(d.label)}</span></span>
              </Link>
            </li>
          );
        })}
      </ul>
      {box}
    </section>
  );
}

const introParts: Part[] = intro.map((p) =>
  typeof p === "object" && "discipline" in p ? { keyword: disciplineKeyword(disciplines[p.discipline]) } : p,
);

export default function HomeContent() {
  const mode = useMode();
  if (mode === "index") return <IndexList />;
  return (
    <section className={grid}>
      <KeywordParagraph parts={introParts} />
    </section>
  );
}
