import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { capitalise, disciplines } from "@/lib/content";

export function generateStaticParams() {
  return Object.keys(disciplines).map((discipline) => ({ discipline }));
}

// Placeholder until each discipline gets its notes and project list.
export default async function DisciplinePage({ params }: PageProps<"/[discipline]">) {
  const { discipline } = await params;
  const d = disciplines[discipline];
  if (!d) notFound();

  return (
    <main className="flex min-h-svh flex-col px-4 pb-8 pt-24 md:px-10 md:pb-10 md:pt-32">
      <p className="text-intro md:text-intro-lg">{capitalise(d.label)}</p>
      <p className="mt-4">Notes and projects for this page are on the way.</p>
      <p className="mt-4">
        <Link href="/" className="underline underline-offset-4 transition-colors duration-150 hover:text-accent">
          Back to home
        </Link>
      </p>
      <Footer />
    </main>
  );
}
