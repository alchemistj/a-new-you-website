// Copy strings are plain text. Two inline forms are allowed so copy can carry internal links and
// light emphasis without a markup language: [label](/path/) links and <strong>/<em>/<a href> tags.
// Everything else is HTML-escaped. Returns an HTML string for set:html.
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const safeHref = (h: string) => /^(\/|https?:\/\/|mailto:|tel:\+14176052153$|#)/.test(h);

export function rich(input: string): string {
  if (!/[<[]/.test(input)) return esc(input);
  // Tokenise the allowed forms, escape the rest.
  const re = /<a\s+href="([^"]+)"[^>]*>(.*?)<\/a>|<(strong|em)>(.*?)<\/\3>|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let out = '';
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(input))) {
    out += esc(input.slice(last, m.index));
    if (m[1] !== undefined) {
      out += safeHref(m[1]) ? `<a href="${esc(m[1])}">${esc(m[2]!)}</a>` : esc(m[0]);
    } else if (m[3] !== undefined) {
      out += `<${m[3]}>${esc(m[4]!)}</${m[3]}>`;
    } else {
      out += safeHref(m[6]!) ? `<a href="${esc(m[6]!)}">${esc(m[5]!)}</a>` : esc(m[0]);
    }
    last = m.index + m[0].length;
  }
  return out + esc(input.slice(last));
}
