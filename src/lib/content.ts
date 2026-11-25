// Site copy. Facts only from my CV and portfolios (see docs/content.md).

import type { Part } from "@/components/KeywordParagraph";
import type { Keyword } from "@/components/preview";

export type Discipline = {
  slug: string;
  label: string; // the highlighted word in the home intro
  preview: string; // fallback colour while the image loads
  image: string; // keyword fill and hover preview (temporary crops from the 2026 PDFs)
};

export const disciplines: Record<string, Discipline> = {
  brand: { slug: "brand", label: "brand identities", preview: "#2E3A33", image: "/keywords/brand.jpg" },
  "art-direction": { slug: "art-direction", label: "campaigns", preview: "#3A2F2B", image: "/keywords/art-direction.jpg" },
  production: { slug: "production", label: "productions", preview: "#26303D", image: "/keywords/production.jpg" },
  "products-and-research": {
    slug: "products-and-research",
    label: "products and research",
    preview: "#3B2A35", image: "/keywords/products-and-research.jpg",
  },
};

export const disciplineKeyword = (d: Discipline): Keyword => ({
  label: d.label, href: `/${d.slug}`, preview: d.preview, image: d.image,
});

// Projects. A project is listed under one discipline page. Images are temporary frames
// from the project videos and renders; the paper has none yet.
export type Project = { slug: string; title: string; discipline: string; preview: string; image?: string; wash?: number };

export const projects: Record<string, Project> = {
  farmily: { slug: "farmily", title: "Farmily", discipline: "products-and-research", preview: "#2F3A2C", image: "/projects/farmily.jpg", wash: 0.6 },
  "check-in": { slug: "check-in", title: "Check-in", discipline: "products-and-research", preview: "#2C3340", image: "/projects/check-in.jpg", wash: 0.6 },
  "within-reach": { slug: "within-reach", title: "Within Reach", discipline: "products-and-research", preview: "#263A4A", image: "/projects/within-reach.jpg" },
  oceanfeel: { slug: "oceanfeel", title: "OceanFeel", discipline: "products-and-research", preview: "#1F2F3D", image: "/projects/oceanfeel.jpg" },
  mediatek: { slug: "mediatek", title: "MediaTek", discipline: "products-and-research", preview: "#3A3328", image: "/projects/mediatek.jpg" },
  "enigma-paper": { slug: "enigma-paper", title: "paper", discipline: "products-and-research", preview: "#3B2A35" },
};

const project = (slug: string): { keyword: Keyword } => {
  const p = projects[slug];
  return { keyword: { label: p.title, href: `/${p.discipline}/${p.slug}`, preview: p.preview, image: p.image, wash: p.wash } };
};

// Discipline pages, Notes mode: one paragraph like the home intro; project names are the keywords.
// Plain, short sentences (references: rauno.me, emilkowal.ski).
export const disciplineNotes: Record<string, Part[]> = {
  "products-and-research": [
    "In Fukuoka I helped research an Op art illusion, which became a ",
    project("enigma-paper"),
    ". At NUS I work with people: interviews, field visits, tests. I look for the pain point ",
    { em: "no one has named" },
    ". ",
    project("farmily"),
    " is an app where small farms design their packaging with AI and sell to shoppers nearby. ",
    project("check-in"),
    " is an AI design tool that checks whether an idea can actually be manufactured, which general AI tools leave out. ",
    project("within-reach"),
    " is a wristband for older adults who live alone. If they fall, their family knows right away. ",
    project("oceanfeel"),
    " is an exhibit we made with OceanX. Visually impaired visitors can touch deep-sea creatures and hear what they are. For ",
    project("mediatek"),
    " we found a new market for its chips on mining trucks.",
  ],
};

// Home intro, Notes mode. Strings are plain text; objects are keyword links.
export type IntroPart = string | { discipline: keyof typeof disciplines } | { break: true };

export const intro: IntroPart[] = [
  "Ziwen Li, multidisciplinary designer between Milan and Singapore.",
  { break: true }, // each sentence group starts on its own line
  "At NUS I work on ",
  { discipline: "products-and-research" },
  ".",
  { break: true },
  "I design ",
  { discipline: "brand" },
  ", art-direct ",
  { discipline: "art-direction" },
  " and run ",
  { discipline: "production" },
  " for fashion and hospitality brands.",
  { break: true },
  "I work in Chinese, Italian and English.",
];

// Home intro, Index mode: one plain line, then the list below.
export const indexLine = "Ziwen Li, multidisciplinary designer between Milan and Singapore.";

// Order in the Index list (differs from the intro on purpose).
export const indexOrder: (keyof typeof disciplines)[] = [
  "products-and-research",
  "brand",
  "art-direction",
  "production",
];

export const contact = [
  { label: "Email", href: "mailto:li.ziwen.5201@gmail.com" },
  { label: "Instagram", href: "https://www.instagram.com/l.ziwen/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ziwen-li" },
];

export const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
