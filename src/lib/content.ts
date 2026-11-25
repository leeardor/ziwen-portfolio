// Site copy. Facts only from my CV and portfolios (see docs/content.md).

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

// Home intro, Notes mode. Strings are plain text; objects are keyword links.
export type IntroPart = string | { discipline: keyof typeof disciplines } | { break: true };

export const intro: IntroPart[] = [
  "Ziwen Li, multidisciplinary designer between Milan and Singapore.",
  { break: true }, // each sentence group starts on its own line
  "I design ",
  { discipline: "brand" },
  ", art-direct ",
  { discipline: "art-direction" },
  " and run ",
  { discipline: "production" },
  " for fashion and hospitality brands. At NUS I work on ",
  { discipline: "products-and-research" },
  ".",
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
