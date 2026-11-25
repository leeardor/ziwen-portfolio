"use client";

import { contact } from "@/lib/content";
import { setMode, useMode } from "@/lib/mode";

// Bottom of every page: stacked contacts on the left, the Notes / Index pill on the right.
export default function Footer() {
  const mode = useMode();
  const next = mode === "notes" ? "index" : "notes";

  return (
    <footer className="mt-auto flex items-end justify-between pt-32">
      <ul>
        {contact.map((link, i) => (
          <li key={link.label} className={i === 1 ? "mt-4" : undefined}>
            <a
              href={link.href}
              {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="rise-host"
            >
              <span className="rise">{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
      {/* Pill sits 3px low so its text shares a baseline with "LinkedIn". */}
      <button
        type="button"
        onClick={() => setMode(next)}
        aria-label={`Switch to ${next} view`}
        className="pill rise-host translate-y-[3px] cursor-pointer select-none rounded-full border border-foreground px-3.5 py-0.5"
      >
        <span className="rise">{next === "index" ? "Index" : "Notes"}</span>
      </button>
    </footer>
  );
}
