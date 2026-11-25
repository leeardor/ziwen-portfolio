import { notFound } from "next/navigation";
import BackLink from "@/components/BackLink";
import Footer from "@/components/Footer";
import DisciplineContent from "@/components/DisciplineContent";
import { capitalise, disciplineNotes, disciplines } from "@/lib/content";

export function generateStaticParams() {
  return Object.keys(disciplines).map((discipline) => ({ discipline }));
}

export default async function DisciplinePage({ params }: PageProps<"/[discipline]">) {
  const { discipline } = await params;
  const d = disciplines[discipline];
  if (!d) notFound();
  const notes = disciplineNotes[discipline];

  return (
    <main className="relative flex min-h-svh flex-col px-4 pb-8 pt-24 md:px-10 md:pb-10 md:pt-32">
      <BackLink href="/" label="Back to home" />
      {notes ? (
        <DisciplineContent label={d.label} notes={notes} />
      ) : (
        // Placeholder until this discipline gets its notes.
        <>
          <p className="text-intro md:text-intro-lg">{capitalise(d.label)}</p>
          <p className="mt-4">Notes and projects for this page are on the way.</p>
        </>
      )}
      <Footer />
    </main>
  );
}
