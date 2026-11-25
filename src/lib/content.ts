// Site copy. Facts only from my CV and portfolios (see docs/content.md).

export type Discipline = {
  slug: string;
  label: string; // the highlighted word in the home intro
  preview: string; // placeholder fill until real image crops exist
};

export const disciplines: Record<string, Discipline> = {
  brand: { slug: "brand", label: "brand identities", preview: "#2E3A33" },
  "art-direction": { slug: "art-direction", label: "campaigns", preview: "#3A2F2B" },
  production: { slug: "production", label: "productions", preview: "#26303D" },
  "products-and-research": {
    slug: "products-and-research",
    label: "products and research",
    preview: "#3B2A35",
  },
};

// Home intro, Notes mode. Strings are plain text; objects are keyword links.
export type IntroPart = string | { discipline: keyof typeof disciplines } | { break: true };

export const intro: IntroPart[] = [
  "Ziwen Li, multidisciplinary designer between Milan and Singapore. I design ",
  { discipline: "brand" },
  ", art-direct ",
  { discipline: "art-direction" },
  " and run ",
  { discipline: "production" },
  " for fashion and hospitality brands. At NUS I work on ",
  { discipline: "products-and-research" },
  ".",
  { break: true }, // the languages sentence always starts on its own line
  "I work in Chinese, Italian and English.",
];

// Home intro, Index mode: one plain line, then the list below.
export const indexLine = "Ziwen Li, multidisciplinary designer";

// Order in the Index list (differs from the intro on purpose).
export const indexOrder: (keyof typeof disciplines)[] = [
  "products-and-research",
  "brand",
  "art-direction",
  "production",
];

// Real links still to come.
export const contact = [
  { label: "Email", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
