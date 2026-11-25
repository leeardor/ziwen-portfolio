import type { Metadata } from "next";
import { Schibsted_Grotesk, EB_Garamond, Nanum_Pen_Script } from "next/font/google";
import RiseDirection from "@/components/RiseDirection";
import Splash from "@/components/Splash";
import "./globals.css";

// Typefaces. Source of truth: Figma > Foundations > Typeface.
const sans = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: "400", // Regular only: no bold anywhere on the site.
});

// Two uses only: italic for a 1-3 word highlight in body text; regular for quotes.
const serif = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: "400",
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
      suppressHydrationWarning
    >
      <head>
        {/* Flag a first visit before paint, so the splash never flashes for returning visitors. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(!localStorage.getItem("zw-visited")&&!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.setAttribute("data-splash","")}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Splash />
        <RiseDirection />
        {children}
      </body>
    </html>
  );
}
