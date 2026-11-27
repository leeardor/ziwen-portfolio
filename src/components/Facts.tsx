"use client";

import { useEffect, useRef, useState } from "react";

export type Fact = { label: string; value: React.ReactNode };

// Project page frame, read like an article: one centred column (columns 4 to 9 on wide
// screens, 2 to 11 on tablets, full width on phones) holding the title, the facts in one row,
// a hairline, then the story. Once the facts row has scrolled away, the same facts fade in
// (200ms) in the empty left margin and stay there while you read (wide screens only).
export default function Facts({
  title,
  facts,
  children,
}: {
  title: React.ReactNode;
  facts: Fact[];
  children: React.ReactNode;
}) {
  const row = useRef<HTMLDivElement>(null);
  const [side, setSide] = useState(false);

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSide(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const item = (f: Fact) => (
    <div key={f.label}>
      <p className="text-small">{f.label}</p>
      <div className="mt-1">{f.value}</div>
    </div>
  );

  return (
    <div className="grid grid-cols-4 gap-x-4 md:grid-cols-12 md:gap-x-6">
      <aside
        aria-hidden={!side}
        inert={!side}
        className={`hidden flex-col gap-6 transition-opacity duration-200 xl:sticky xl:top-10 xl:col-span-3 xl:row-start-1 xl:flex xl:self-start ${side ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        {facts.map(item)}
      </aside>
      <article className="col-span-4 md:col-span-10 md:col-start-2 xl:col-span-6 xl:col-start-4 xl:row-start-1">
        {title}
        <div ref={row} className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 md:gap-x-6">
          {facts.map(item)}
        </div>
        <div className="mt-8 border-t border-hairline pt-8">{children}</div>
      </article>
    </div>
  );
}
