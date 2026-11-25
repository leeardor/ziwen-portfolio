import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { capitalise, disciplines, projects } from "@/lib/content";

export function generateStaticParams() {
  return Object.values(projects).map((p) => ({ discipline: p.discipline, project: p.slug }));
}

// Placeholder until each project gets its own page.
export default async function ProjectPage({ params }: PageProps<"/[discipline]/[project]">) {
  const { discipline, project } = await params;
  const p = projects[project];
  if (!p || p.discipline !== discipline) notFound();
  const d = disciplines[discipline];

  return (
    <main className="flex min-h-svh flex-col px-4 pb-8 pt-24 md:px-10 md:pb-10 md:pt-32">
      <p className="text-intro md:text-intro-lg">{capitalise(p.title)}</p>
      <p className="mt-4">This project page is on the way.</p>
      <p className="mt-4">
        <Link href={`/${d.slug}`} className="rise-host underline underline-offset-4">
          <span className="rise">Back to {d.label}</span>
        </Link>
      </p>
      <Footer />
    </main>
  );
}
