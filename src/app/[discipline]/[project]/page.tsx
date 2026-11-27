import Image from "next/image";
import { notFound } from "next/navigation";
import BackLink from "@/components/BackLink";
import Facts from "@/components/Facts";
import Footer from "@/components/Footer";
import Copy from "@/components/Copy";
import MarginNote from "@/components/MarginNote";
import TextNote from "@/components/TextNote";
import { capitalise, disciplines, projects } from "@/lib/content";
import {
  type Figure,
  type TextBlock,
  type Video,
  projectPages,
} from "@/lib/project-pages";

export function generateStaticParams() {
  return Object.values(projects).map((p) => ({
    discipline: p.discipline,
    project: p.slug,
  }));
}

// One image or video, the full width of the article column (about 668px at a 1440 window);
// Ziwen's handwritten note sits in the right margin (from 1280px) or under it.
// Videos play muted on a loop.
function Shot({ f, priority }: { f: Figure | Video; priority?: boolean }) {
  return (
    <MarginNote note={f.note}>
      {"video" in f ? (
        <video
          src={f.video}
          poster={f.poster}
          aria-label={f.alt}
          autoPlay
          muted
          loop
          playsInline
          className="h-auto w-full"
        />
      ) : (
        <Image
          src={f.src}
          alt={f.alt}
          width={1512}
          height={982}
          priority={priority}
          // All load up front (a handful per page), so Safari does not stop to fetch and
          // decode an image mid-scroll, which made scrolling stutter.
          loading={priority ? undefined : "eager"}
          sizes="(min-width: 1280px) 50vw, (min-width: 768px) 85vw, 100vw"
          className="h-auto w-full"
        />
      )}
    </MarginNote>
  );
}

// A text block, as wide as the images so edges line up. With a note, one phrase is
// underlined by hand and the note sits in the margin beside it.
function Text({ b }: { b: TextBlock }) {
  return b.note ? (
    <TextNote text={b.text} note={b.note} mark={b.mark} />
  ) : (
    <Copy text={b.text} />
  );
}

// Project page, read like an article in one centred column (see Facts): title, facts, a
// hairline, a short intro, then text and images taking turns.
export default async function ProjectPage({
  params,
}: PageProps<"/[discipline]/[project]">) {
  const { discipline, project } = await params;
  const p = projects[project];
  if (!p || p.discipline !== discipline) notFound();
  const d = disciplines[discipline];
  const page = projectPages[project];
  const title = (
    <p>
      {capitalise(p.title)}
      {p.year && <span className="tabular"> / {p.year}</span>}
    </p>
  );

  return (
    <main className="relative flex min-h-svh flex-col px-4 pb-8 pt-24 md:px-10 md:pb-10 md:pt-32">
      <BackLink href={`/${d.slug}`} label={`Back to ${d.label}`} />
      {page ? (
        <Facts
          title={title}
          facts={[
            { label: "Discipline", value: capitalise(d.label) },
            { label: "Context", value: page.context },
            {
              label: "Skills",
              value: (
                <ul>
                  {page.skills.map((k) => (
                    <li key={k}>{k}</li>
                  ))}
                </ul>
              ),
            },
            {
              label: "Links",
              value: (
                <ul>
                  {page.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rise-host"
                      >
                        <span className="rise">{l.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ),
            },
          ]}
        >
          <div className="space-y-6">
            {page.intro.map((b, i) => (
              <Text key={i} b={typeof b === "string" ? { text: b } : b} />
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-12 md:gap-16">
            {page.story.map((b, i) =>
              "text" in b ? (
                <Text key={i} b={b} />
              ) : (
                <Shot key={i} f={b} priority={i === 0} />
              ),
            )}
          </div>
        </Facts>
      ) : (
        <>
          {title}
          <p className="mt-4">This project page is on the way.</p>
        </>
      )}
      <Footer toTop />
    </main>
  );
}
