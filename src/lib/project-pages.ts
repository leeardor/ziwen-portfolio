// Project page content. Facts only from docs/content.md and the project's own Figma screens
// (Check-in: CDE5302 CHECK-IN file, Page 1, user flow frames).
// Notes: PLACEHOLDER designer thoughts written by Claude at Ziwen's request (2026-11-28),
// not facts; Ziwen will replace them with their own.
// In text, *a few words* become the paragraph's one Garamond italic phrase (1 to 3 words);
// _a few words_ is the phrase underlined by hand, which the text block's note talks about.

import type { MarkKind } from "@/components/Mark";
import type { Note } from "@/components/MarginNote";

// note: handwritten lines in the margin, an arrow, and optionally a loop on the image.
export type Figure = { src: string; alt: string; note?: Note };
export type Video = { video: string; poster?: string; alt: string; note?: Note };
// note: handwritten lines in the margin about the _underlined_ phrase.
// mark: how the phrase is marked (default underline; see components/Mark for the meanings).
export type TextBlock = { text: string; note?: string[]; mark?: MarkKind };
export type Block = TextBlock | Figure | Video;

export type ProjectPage = {
  context: string;
  skills: string[];
  links: { label: string; href: string }[];
  // The right column from top to bottom. The first text blocks sit above a hairline;
  // after that, text and images alternate so no two images touch.
  intro: (string | TextBlock)[];
  story: Block[];
};

export const projectPages: Record<string, ProjectPage> = {
  "check-in": {
    context: "NUS",
    skills: ["Research", "Strategy", "UX/UI Design"],
    links: [{ label: "Prototype", href: "https://check-in-prototype-design.vercel.app" }],
    intro: [
      "Created with a team of five for CDE5302 at NUS, Check-in is an AI design tool for industrial design students. It checks whether an idea can *actually be manufactured*, which general AI tools leave out.",
      { text: "Through interviews, immersion and observation we found that _57% of students_ repeat their prompts because the AI *misreads their intent*.", note: ["the number that", "set our brief"] },
    ],
    story: [
      { src: "/projects/check-in/workspace.jpg", alt: "The Check-in workspace: a desk lamp concept with its shade, stem and base" },
      { text: "Three problems came up again and again. Intent gets lost between prompts. Students cannot judge whether a design can be made. And polished AI output _hides the gaps_.", note: ["do we hide", "some too?"], mark: "wavy" },
      { src: "/projects/check-in/intent.jpg", alt: "Express design intent: target user, product, problem and essential features", note: { lines: ["no image until", "you say what", "it is for"], to: { x: 76, y: 14 } } },
      { text: "So Check-in starts from _intent_. On a Keep, Explore and Constraints canvas, students sort what should stay and what could change.", note: ["everything", "hangs on this"], mark: "circle" },
      { src: "/projects/check-in/canvas.jpg", alt: "The Keep, Explore and Constraints canvas beside the lamp's components" },
      { text: "From there it offers guided alternatives to choose from and refine." },
      { src: "/projects/check-in/alternatives.jpg", alt: "A design brief and the generated concept alternatives", note: { lines: ["three, not ten.", "with more, testers", "just froze"], to: { x: 72, y: 20 } } },
      { text: "An AI assistant then shows how each part could be manufactured, and the flow ends with _a moment of reflection_.", note: ["my favourite part,", "it slows you down"], mark: "asterisk" },
      { src: "/projects/check-in/assistant.jpg", alt: "The Check-in AI assistant explaining how each part of the lamp could be made", note: { lines: ["by part, because", "a lamp is made", "part by part"], to: { x: 96, y: 36 } } },
      { text: "We built a working prototype, from Figma to Codex, and tested it with three industrial design students.", note: ["build it, then", "watch people", "use it"], mark: "bracket" },
      { src: "/projects/check-in/flow.jpg", alt: "The whole flow laid out on one canvas" },
    ],
  },
};
