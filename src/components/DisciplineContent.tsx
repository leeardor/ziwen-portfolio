"use client";

import Link from "next/link";
import { capitalise, projects as allProjects } from "@/lib/content";
import { useMode } from "@/lib/mode";
import KeywordParagraph, { type Part } from "./KeywordParagraph";
import { type Keyword, usePreview } from "./preview";

const grid = "grid grid-cols-4 gap-x-4 md:grid-cols-12 md:gap-x-6";
// Index rows on a phone: a narrow number column, the text, the year; desktop uses the 12-column grid.
// On a phone the text cell runs under the year too, so the second line gets the full width.
const row = "grid grid-cols-[2rem_1fr_auto] gap-x-4 md:grid-cols-12 md:gap-x-6";

// Index view of a discipline page: the same projects as the paragraph, in the order they
// appear there. Desktop: number, project, what Ziwen did, who with or where, year.
// Phone: number, project and year on one line; what and where on a smaller second line,
// same ink, what and where always on their own lines (no "·" separators, no grey text).
// Hover shows the image.
function ProjectIndex({ label, projects }: { label: string; projects: Keyword[] }) {
  const { show, move, hide, box } = usePreview();
  return (
    <section>
      <p>{capitalise(label)}</p>
      <ul className="mt-8 border-t border-hairline">
        {projects.map((k, i) => {
          const p = allProjects[k.href.split("/").pop() ?? ""];
          return (
            <li key={k.href} className="border-b border-hairline">
              <Link
                href={k.href}
                onPointerEnter={() => show(k)}
                onPointerMove={move}
                onPointerLeave={hide}
                className={`${row} rise-host py-3`}
              >
                <span className="rise tabular col-start-1 row-start-1 justify-self-start">{String(i + 1).padStart(2, "0")}</span>
                <span className="col-[2/4] row-start-1 md:col-[2/5]">
                  <span className="rise">{capitalise(k.label)}</span>
                  {p && (
                    <span className="mt-0.5 flex flex-col text-small md:hidden">
                      <span className="rise">{p.type}</span>
                      <span className="rise">{p.context}</span>
                    </span>
                  )}
                </span>
                <span className="hidden md:col-[5/8] md:row-start-1 md:block"><span className="rise">{p?.type}</span></span>
                <span className="hidden md:col-[8/11] md:row-start-1 md:block"><span className="rise">{p?.context}</span></span>
                <span className="rise tabular col-start-3 row-start-1 self-start justify-self-end whitespace-nowrap md:col-[11/13]">{p?.year}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      {box}
    </section>
  );
}

export default function DisciplineContent({ label, notes }: { label: string; notes: Part[] }) {
  const mode = useMode();
  const projects = notes.flatMap((p) => (typeof p === "object" && "keyword" in p ? [p.keyword] : []));
  if (mode === "index") return <ProjectIndex label={label} projects={projects} />;
  return (
    <section className={grid}>
      <KeywordParagraph parts={notes} />
    </section>
  );
}
