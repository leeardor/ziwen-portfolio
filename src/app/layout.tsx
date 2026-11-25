import type { Metadata } from "next";
import { Schibsted_Grotesk, EB_Garamond, Nanum_Pen_Script } from "next/font/google";
import "./globals.css";

// Typefaces. Source of truth: Figma > Foundations > Typeface.
const sans = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Accent only: italic words, pull quotes, drop caps.
const serif = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

// Placeholder for my own handwriting. Large sizes only, always in the accent colour.
const hand = Nanum_Pen_Script({
  variable: "--font-nanum",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Ziwen Li",
  description: "Portfolio of Ziwen Li",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${hand.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
