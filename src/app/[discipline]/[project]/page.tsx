import Image from "next/image";
import { notFound } from "next/navigation";
import BackLink from "@/components/BackLink";
import Footer from "@/components/Footer";
import MarginNote from "@/components/MarginNote";
import { capitalise, disciplines, projects } from "@/lib/content";
import { type Figure, type Video, projectPages } from "@/lib/project-pages";

export function generateStaticParams() {
  return Object.values(projects).map((p) => ({
    discipline: p.discipline,
    project: p.slug,
  }));
}

const grid = "grid grid-cols-4 gap-x-4 md:grid-cols-12 md:gap-x-6";

// One image or video on the first 6 of the right column's 8 columns (about 668px wide at a
// 1440 window); the last 2 are the margin where Ziwen's handwritten note sits, pointing back
// at it, sometimes with a hand-drawn loop on the image. Phone: full width, note underneath. Videos play muted on a loop, like a moving image.
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
          width={1920}
          height={1080}
          priority={priority}
          sizes="(min-width: 1024px) 50vw, (min-width: 768px) 66vw, 100vw"
          className="h-auto w-full"
        />
      )}
    </MarginNote>
  );
}

// A text block in the story: the same 6 columns as the images, so edges line up.
function Text({ text }: { text: string }) {
  return (
    <div className="lg:grid lg:grid-cols-8 lg:gap-x-6">
      <div className="lg:col-span-6">
        <Copy text={text} />
      </div>
    </div>
  );
}

// *a few words* in the copy become the one Garamond italic phrase of that paragraph.
// Garamond runs small next to Schibsted, so it is set 1.14 times larger (as in the Notes paragraphs).
function Copy({ text }: { text: string }) {
  return (
    <p>
      {text.split(/\*(.+?)\*/).map((t, i) =>
        i % 2 ? (
          <em
            key={i}
            className="whitespace-nowrap font-serif italic [font-size:1.14em] [line-height:1]"
          >
            {t}
          </em>
        ) : (
          t
        ),
      )}
    </p>
  );
}

// Label in the small size, same ink (no grey text), value below in body size.
function Meta({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-small">{label}</p>
      <div className="mt-1">{children}</div>
    </div>
  );
}

// Project page, after Giulia's: one title line over a hairline; left third holds the facts
// and stays put while scrolling; right two thirds: a short intro, a hairline, then text and
// images taking turns.
export default async function ProjectPage({
  params,
}: PageProps<"/[discipline]/[project]">) {
  const { discipline, project } = await params;
  const p = projects[project];
  if (!p || p.discipline !== discipline) notFound();
  const d = disciplines[discipline];
  const page = projectPages[project];

  return (
    <main className="relative flex min-h-svh flex-col px-4 pb-8 pt-24 md:px-10 md:pb-10 md:pt-32">
      <BackLink href={`/${d.slug}`} label={`Back to ${d.label}`} />
      <p>
        {capitalise(p.title)}
        {p.year && <span className="tabular"> / {p.year}</span>}
      </p>
      {page ? (
        <div className={`${grid} mt-8 border-t border-hairline pt-8`}>
          <aside className="col-span-4 flex flex-col gap-6 md:sticky md:top-10 md:self-start">
            <Meta label="Discipline">{capitalise(d.label)}</Meta>
            <Meta label="Context">{page.context}</Meta>
            <Meta label="Skills">{page.skills.join(", ")}</Meta>
            <Meta label="Links">
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
            </Meta>
          </aside>

          <div className="col-span-4 mt-12 md:col-span-8 md:mt-0">
            <div className="lg:grid lg:grid-cols-8 lg:gap-x-6">
              <div className="space-y-6 lg:col-span-6">
                {page.intro.map((t) => (
                  <Copy key={t} text={t} />
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-12 md:gap-16">
              {page.story.map((b, i) =>
                "text" in b ? (
                  <Text key={i} text={b.text} />
                ) : (
                  <Shot key={i} f={b} priority={i === 0} />
                ),
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-4">This project page is on the way.</p>
      )}
      <Footer toTop />
    </main>
  );
}
