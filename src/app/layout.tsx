import type { Metadata } from "next";
import { Schibsted_Grotesk, EB_Garamond } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Ziwen Li",
  description: "Portfolio of Ziwen Li",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
