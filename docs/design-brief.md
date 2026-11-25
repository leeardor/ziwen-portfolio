# Portfolio site: design brief

Status: direction agreed in conversation (2026-11-25). Visual details are decided in Figma.

## Why
A portfolio to show past projects. Target roles: design engineer, and brand creative / strategy.
The work spans brand & graphic design, photography, creative, production, and strategy.
The risk is looking scattered; the site must read as "one person who takes ideas all the way to the finished thing".

## Structure
- **Entry: AI twin.** A chat box answering in my voice, with preset questions
  (who I am, how I define myself, why I work across so many fields, which fields).
  An "Enter the site" button skips it. Built in phase 2, on the Claude API, with a spend cap,
  per-visitor rate limit, and the key kept server-side.
- **Home.** Name + one sentence that defines me. Discipline filter
  (All / Brand / Photography / Creative / Production / Strategy).
  Two views: large image grid, and an index list (no., name, discipline, client/context, year)
  where hovering a row previews the work.
- **Portfolio / Miscellanea.** Full projects in Portfolio; photography sets and loose creative work in Miscellanea.
- **Project page.** Fixed left column (discipline, context, skills, links, ask-the-AI button);
  right side large visuals and the story: Context, Approach, Outcome.

## Look
- Restraint and precision at the level of rauno.me: one text typeface, a strict spacing scale,
  carefully tuned motion. Large space for images (brand and photo work need room).
- One bright accent colour; everything else neutral. Tuned off-white / off-black, never pure #FFF / #000.
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
- Accent colour, typefaces
- Project list and which projects go first
