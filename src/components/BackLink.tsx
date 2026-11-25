import Link from "next/link";

// Top-left back button on inner pages: only the return-key arrow, no text. The aria-label
// says where it goes. Turns rose on hover, like the rising colour on text links.
// Sized like the footer text: the viewBox is cropped to the glyph, which is set at cap
// height (0.75em) with a stroke close to the letter stems, left edge on the text column.
export default function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="back absolute left-4 top-8 -m-2 p-2 md:left-10 md:top-10"
    >
      <svg
        viewBox="3 3 18 18"
        aria-hidden
        className="size-[0.75em]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 10l-5 5 5 5" />
        <path d="M20 4v7a4 4 0 0 1-4 4H4" />
      </svg>
    </Link>
  );
}
