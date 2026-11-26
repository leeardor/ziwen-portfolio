// Project page content. Facts only from docs/content.md; images are temporary frames
// from the demo video until Ziwen's own screens arrive.
// In text, *a few words* become the paragraph's one Garamond italic phrase (1 to 3 words).

import type { Note } from "@/components/MarginNote";

// note: handwritten lines in the margin, an arrow, and optionally a loop on the image.
export type Figure = { src: string; alt: string; note?: Note };
export type Video = { video: string; poster?: string; alt: string; note?: Note };
export type Block = { text: string } | Figure | Video;

export type ProjectPage = {
  context: string;
  skills: string[];
  links: { label: string; href: string }[];
  // The right column from top to bottom. The first text blocks sit above a hairline;
  // after that, text and images alternate so no two images touch.
  intro: string[];
  story: Block[];
};

export const projectPages: Record<string, ProjectPage> = {
  "check-in": {
    context: "NUS",
    skills: ["Research", "Strategy", "UX/UI Design"],
    links: [{ label: "Prototype", href: "https://check-in-prototype-design.vercel.app" }],
    intro: [
      "Created with a team of five for CDE5302 at NUS, Check-in is an AI design tool for industrial design students. It checks whether an idea can *actually be manufactured*, which general AI tools leave out.",
      "Through interviews, immersion and observation we found that 57% of students repeat their prompts because the AI *misreads their intent*.",
    ],
    story: [
      { src: "/projects/check-in.jpg", alt: "The Check-in workspace" },
      { text: "Three problems came up again and again. Intent gets lost between prompts. Students cannot judge whether a design can be made. And polished AI output hides the gaps." },
      { src: "/projects/check-in/frame-2.jpg", alt: "Keep and Explore columns with AI suggestions and the student's own decisions", note: { lines: ["your decision,", "not the AI's"] } },
      { text: "So Check-in starts from intent. On a Keep, Explore and Constraints canvas, students sort what should stay and what could change." },
      { src: "/projects/check-in/frame-3.jpg", alt: "Two concepts and per-component changes for a mushroom lamp", note: { lines: ["pick a concept,", "then change it", "part by part"] } },
      { text: "From there it offers guided alternatives, checks whether each part can be manufactured, and ends with a moment of reflection." },
      { src: "/projects/check-in/frame-5.jpg", alt: "The Check-in assistant suggesting quick ways to build a working model", note: { lines: ["each part,", "and how long", "it takes"] } },
      { text: "We built a working prototype, from Figma to Codex, and tested it with three industrial design students." },
    ],
  },
};
