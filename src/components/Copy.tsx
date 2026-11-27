// A paragraph of project copy. Two marks in the text:
// - *a few words*: the paragraph's one Garamond italic phrase. Garamond runs small next to
//   Schibsted, so it is set 1.14 times larger (as in the Notes paragraphs).
// - _a few words_: the phrase Ziwen underlined by hand; its note sits in the margin (TextNote).
export default function Copy({
  text,
  markRef,
  underline,
}: {
  text: string;
  markRef?: React.Ref<HTMLSpanElement>;
  underline?: React.ReactNode;
}) {
  return (
    <p>
      {text.split(/(\*.+?\*|_.+?_)/).map((t, i) => {
        if (t.startsWith("*") && t.endsWith("*") && t.length > 2)
          return (
            <em key={i} className="whitespace-nowrap font-serif italic [font-size:1.14em] [line-height:1]">
              {t.slice(1, -1)}
            </em>
          );
        if (t.startsWith("_") && t.endsWith("_") && t.length > 2)
          return (
            <span key={i} ref={markRef} className="relative whitespace-nowrap">
              {t.slice(1, -1)}
              {underline}
            </span>
          );
        return t;
      })}
    </p>
  );
}
