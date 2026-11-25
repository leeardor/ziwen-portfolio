# Portfolio site: design brief

Status: direction agreed in conversation (2026-11-25). Visual details are decided in Figma.

## Why
A portfolio to show past projects. Target roles: design engineer, and brand creative / strategy.
The work spans brand & graphic design, photography, creative, production, and strategy.
The risk is looking scattered; the site must read as "one person who takes ideas all the way to the finished thing".

## Guiding rule: 90% familiar, 10% novel
Full design philosophy (frequency vs novelty, first-visit-only moments, 60/30/10 colour, novelty tax):
see docs/design-rules.md section 0, distilled from Rauno Freiberg's "Novelty" essay.

Every page should feel instantly usable: conventions visitors already know (name at the top, a project
list, a project page that reads top to bottom, obvious navigation). The surprise is concentrated in a few
deliberate moments, and each one should be crafted rather than scattered:
- the AI twin entry
- hand-drawn annotations in my own handwriting
- hover previews on the project list
- the grid / list view switch
When adding anything new, ask: is this part of the 90% (should feel invisible) or the 10% (should feel
memorable)? If it is neither, cut it. Novel moments must never make the site harder to use.

## Structure
- **First visit: handwritten splash** "Ziwen's archive", then straight into the home page.
- **AI twin: undecided** whether to include it at all. If added later, only as an opt-in button. Pages are designed without it. A chat box answering in my voice, with preset questions
  (who I am, how I define myself, why I work across so many fields, which fields).
  An "Enter the site" button skips it. Built in phase 2, on the Claude API, with a spend cap,
  per-visitor rate limit, and the key kept server-side.
- **Two modes, site-wide: Notes (default) and Index.** A [Notes] [Index] switch on every page; the choice is remembered.
  Notes is my own short paragraph (3 to 5 sentences, at most 4 to 6 links); Index is a plain list for quick scanning.
- **Home.** Notes: a self-intro whose keywords open the discipline pages, with a rectangular hover preview; contact at the bottom.
  Index: every project as a list (no., name, discipline, client/context, year).
- **Discipline pages.** Notes: a paragraph tying that discipline's main works together; project names preview on hover and open the project page.
  Index: the same list, filtered to that discipline.
- **Portfolio / Miscellanea.** Full projects in Portfolio; photography sets and loose creative work in Miscellanea.
- **Project page.** Fixed left column (discipline, context, skills, links);
  right side large visuals and the story: Context, Approach, Outcome.

## Look
- Restraint and precision at the level of rauno.me: one text typeface, a strict spacing scale,
  carefully tuned motion. Large space for images (brand and photo work need room).
- Colour (decided 2026-11-25): background #FAFAFA, text #121212, hairline #E6E6E6, accent rose #D1245E,
  text on rose #FAFAFA. No grey text and no warm/greige tints; the accent is used in large confident
  shapes (a colour band or a big circle; which one is decided at the layout step).
- Type (decided 2026-11-25): Schibsted Grotesk Regular for everything, including body text. No bold
  anywhere: every font is used at Regular 400. EB Garamond italic only to highlight ONE key phrase of
  1 to 3 words inside body text (e.g. "small roaster"), never a whole sentence; at most one per
  paragraph. Quotes: EB Garamond Regular at body size (not large), in grey #6B6B6B,
  source line in Schibsted grey. Quotes are the only grey text on the site.
  Garamond is never used in headings, the index or UI. No drop caps.
  Accents stay few: at most one handwriting note per screen.
  Handwriting placeholder: Nanum Pen Script (Figma family name "Nanum Pen"), large sizes only, always in rose.
- Hand-drawn accent: my own handwriting (paper → photo → SVG), used only for notes, hover
  annotations and circling key words, possibly with stroke-by-stroke animation.
  Placeholder handwriting font in Figma until then.

## References
- giuliarinaldo.com: structure (AI twin entry, index list, left-info / right-content project page)
- rauno.me: level of polish, one accent + neutrals
- godly.website (now recent.design): big image grid, filter chips

Borrow structure and rhythm, not their look.

## Stack
Figma (design + tokens) → Next.js + Tailwind → GitHub (public) → Vercel.

## Open
- The one-sentence self-definition (also the AI twin's core answer)
- Usage rules for type and colour
- Project list and which projects go first
